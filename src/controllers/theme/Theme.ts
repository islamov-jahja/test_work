import {ITheme} from "./ITheme";
import {IThemeModel} from "../../models/theme/IThemeModel";
import {models} from "../../models/models";
import {ObjectID} from "bson";
import {getEmailFromToken} from "../../middleware/auth";
import {IMessageModel} from "../../models/message/IMessageModel";

export class Theme implements ITheme{
    private COUNT_OF_THEMES_ON_PAGE: number = 5;

    async createNewTheme(tokenArg: string, nameOfTheme: string): Promise<void> {
        const email: string = getEmailFromToken(tokenArg);
        if (nameOfTheme.length  <= 0)
            throw new TypeError("название темы не может быть пустым");

        await models.ThemeModel.create({
            _id: new ObjectID(),
            email: email,
            theme_name: nameOfTheme
        });
    }

    async deleteTheme(tokenArg: string, themeId: string): Promise<void> {
        const email: string = getEmailFromToken(tokenArg);
        const theme: IThemeModel = await models.ThemeModel.findOne({_id: themeId});
        this.validateUserTheme(theme, email);

        await models.ThemeModel.findOneAndRemove({_id: themeId});
        const messages: IMessageModel[] = await models.MessageModel.find({theme_id: themeId});

        await messages.map((message) => {models.LikeModel.remove({message_id: message._id})});
        await models.MessageModel.remove({theme_id: themeId});
    }

    async getThemes(numberOfPage: number): Promise<IThemeModel[]> {

        if (numberOfPage <= 0){
            throw new TypeError('номер странички не может быть меньше 0');
        }

        let items: any = await models.ThemeModel.find({}).skip((numberOfPage-1) * this.COUNT_OF_THEMES_ON_PAGE).limit(5);
        items = items.map((item) => {return {_id: item._id, email:item.email, theme_name:item.theme_name}});
        return items;
    }

    async refreshTheme(tokenArg: string, themeId: string, newNameOfTheme: string): Promise<void> {
        if (newNameOfTheme.length  <= 0)
            throw new TypeError("название темы не может быть пустым");

        const email: string = getEmailFromToken(tokenArg);
        const theme: IThemeModel = await models.ThemeModel.findOne({_id: themeId});
        this.validateUserTheme(theme, email);

        await models.ThemeModel.findOneAndUpdate({_id: themeId}, {theme_name: newNameOfTheme});
    }

    private validateUserTheme(themeModel: IThemeModel, email: string) : void {
        if (themeModel === null){
            throw new TypeError("такой темы не существует");
        }

        if (themeModel.email != email){
            throw new TypeError("невозможно удалить чужую тему");
        }
    }
}
