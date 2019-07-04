import {IMessage} from "./IMessage";
import {getEmailFromToken} from "../../middleware/auth";
import {models} from "../../models/models";
import {ObjectID} from "bson";
import {IMessageModel} from "../../models/message/IMessageModel";
import {IThemeModel} from "../../models/theme/IThemeModel";

export class Message implements IMessage{
    private COUNT_OF_MESSAGE_ON_PAGE: number = 5;
    async createNewMessage(tokenArg: string, theme_id: string, message: string): Promise<void> {
        const email: string = getEmailFromToken(tokenArg);
        const theme: IThemeModel = await models.ThemeModel.findOne({_id: theme_id});

        if (theme === null){
            throw new TypeError("такой темы нет");
        }

        if (message.length < 1){
            throw new TypeError("пусого сообщения не может быть");
        }

        await models.MessageModel.create({
            _id: new ObjectID(),
            email: email,
            theme_id: theme_id,
            description: message
        });
    }

    async deleteMessage(tokenArg: string, message_id: string): Promise<void> {
        const email: string = getEmailFromToken(tokenArg);
        const message: IMessageModel = await models.MessageModel.findOne({_id: message_id});
        this.validateUserMessage(message, email);

        await models.MessageModel.findOneAndRemove({_id: message_id});
        await models.LikeModel.remove({message_id: message_id});
    }

    async getMessagesInTheme(theme_id: string, page: number): Promise<IMessageModel[]> {
        if (page <= 0){
            throw new TypeError('номер странички не может быть меньше 0');
        }

        let items: any = await models.MessageModel.find({theme_id: theme_id}).skip((page-1) * this.COUNT_OF_MESSAGE_ON_PAGE).limit(5);
        items = items.map((item) => { return {_id: item._id, email:item.email, theme_id:item.theme_id, description:item.description}});
        return items;
    }

    async refreshMessage(tokenArg: string, message_id: string, updateMessage: string): Promise<void> {
        if (updateMessage.length  <= 0)
            throw new TypeError("содержимое сообщения не может быть пустым");

        const email: string = getEmailFromToken(tokenArg);
        const message: IMessageModel = await models.MessageModel.findOne({_id: message_id});
        this.validateUserMessage(message, email);
        await models.MessageModel.findOneAndUpdate({_id: message_id}, {description: updateMessage});
    }

    private validateUserMessage(messageModel: IMessageModel, email: string) : void {
        if (messageModel === null){
            throw new TypeError("такого сообщения не существует");
        }

        if (messageModel.email != email){
            throw new TypeError("невозможно удалить чужое сообщение");
        }
    }

}
