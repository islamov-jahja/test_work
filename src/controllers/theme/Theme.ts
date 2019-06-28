import {ITheme} from "./ITheme";
import {IThemeModel} from "../../models/theme/IThemeModel";
import {token} from "../../core/app";
import * as jwt from "jsonwebtoken";
import {IAccessTokenData} from "./IAccessTokenData";
import {models} from "../../models/models";
import {ObjectID} from "bson";

export class Theme implements ITheme{

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

        if (theme === null){
            throw new TypeError("такой темы не существует");
        }

        if (theme.email != email){
            throw new TypeError("невозможно удалить чужую тему");
        }

        await models.ThemeModel.findOneAndRemove({email: email});
    }

    getThemes(numberOfPage: number): Promise<IThemeModel[]> {
        return undefined;
    }

    refreshTheme(tokenArg: string, themeId: string, newNameOfTheme: string): Promise<any> {
        return undefined;
    }
}
