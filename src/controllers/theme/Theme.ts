import {ITheme} from "./ITheme";
import {IThemeModel} from "../../models/theme/IThemeModel";
import {token} from "../../core/app";
import * as jwt from "jsonwebtoken";
import {IAccessTokenData} from "./IAccessTokenData";
import {models} from "../../models/models";
import {ObjectID} from "bson";
import {UserModel} from "../../models/user/User";

export class Theme implements ITheme{
    private COUNT_OF_THEMES_ON_PAGE: number = 5;

    private getEmailFromToken(tokenArg: string): string {
        const payload: IAccessTokenData = jwt.verify(tokenArg, token.secret);
        return payload.email;
    }

    async createNewTheme(tokenArg: string, nameOfTheme: string): Promise<void> {
        const email: string = this.getEmailFromToken(tokenArg);
        if (nameOfTheme.length  <= 0)
            throw new TypeError("название темы не может быть пустым");

        await models.ThemeModel.create({
            _id: new ObjectID(),
            email: email,
            theme_name: nameOfTheme
        });
    }

    async deleteTheme(tokenArg: string, themeId: string): Promise<void> {
        const email: string = this.getEmailFromToken(tokenArg);
        const theme: any = await models.ThemeModel.findOne({_id: themeId});
        this.ValidateUserTheme(theme, email);

        await models.ThemeModel.findOneAndRemove({email: email});
    }

    async getThemes(numberOfPage: number): Promise<IThemeModel[]> {

        if (numberOfPage <= 0){
            throw new TypeError('номер странички не может быть меньше 0');
        }

        let items: any = await models.ThemeModel.find({}).skip((numberOfPage-1) * this.COUNT_OF_THEMES_ON_PAGE).limit(5);
        items = items.map((item) => { return {id: item._id, description: item.description}});
        return items;
    }

    async refreshTheme(tokenArg: string, themeId: string, newNameOfTheme: string): Promise<any> {
        if (newNameOfTheme.length  <= 0)
            throw new TypeError("название темы не может быть пустым");

        const email: string = this.getEmailFromToken(tokenArg);
        const theme: any = await models.ThemeModel.findOne({_id: themeId});
        this.ValidateUserTheme(theme, email);

        await models.ThemeModel.findOneAndUpdate({_id: themeId}, {theme_name: newNameOfTheme});
    }

    ValidateUserTheme(themeModel: any, email: string) : void {
        if (themeModel === null){
            throw new TypeError("такой темы не существует");
        }

        if (themeModel.email != email){
            throw new TypeError("невозможно удалить чужую тему");
        }
    }
}
