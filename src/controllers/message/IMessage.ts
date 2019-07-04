import {IMessageModel} from "../../models/message/IMessageModel";

export interface IMessage {
    createNewMessage(tokenArg: string, theme_id: string, message: string):Promise<void>;
    deleteMessage(tokenArg: string, message_id: string):Promise<void>;
    refreshMessage(tokenArg: string, message_id: string, updateMessage: string):Promise<void>;
    getMessagesInTheme(theme_id: string, page: number):Promise<IMessageModel[]>;
}
