import {Controller, Delete, Get, Post, Put} from "tsoa";
import {IMessage} from "./IMessage";
import {Message} from "./Message";
import {checkAuth} from "../../middleware/auth";
import {IMessageModel} from "../../models/message/IMessageModel";

export class MessageController extends Controller {
    private message: IMessage = new Message();

    @Post('/message')
    async createMessage(tokenArg: string, theme_id: string, message: string):Promise<void>{
        try{
            checkAuth(tokenArg);
            this.setStatus(200);
            return await this.message.createNewMessage(tokenArg, theme_id, message);
        }catch (e) {
            this.setStatus(400);
            console.log(e.message);
        }
    }

    @Delete('/message')
    async deleteMessage(tokenArg: string, message_id: string):Promise<void>{
        try{
            checkAuth(tokenArg);
            this.setStatus(200);
            return await this.message.deleteMessage(tokenArg, message_id);
        }catch (e) {
            this.setStatus(400);
            console.log(e.message);
        }
    }

    @Put('/message')
    async refreshMessage(tokenArg: string, message_id: string, updateMessage: string):Promise<void>{
        try{
            checkAuth(tokenArg);
            this.setStatus(200);
            return await this.message.refreshMessage(tokenArg, message_id, updateMessage);
        }catch (e) {
            this.setStatus(400);
            console.log(e.message);
        }
    }

    @Get('/message/:page/:theme_id')
    async getMessageFromTheme(theme_id: string, page: number):Promise<IMessageModel[]>{
        try{
            this.setStatus(200);
            return await this.message.getMessagesInTheme(theme_id, page);
        }catch (e) {
            this.setStatus(400);
            console.log(e.message);
        }
    }
}
