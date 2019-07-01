import {Controller, Delete, Post} from "tsoa";
import {checkAuth} from "../../middleware/auth";
import {IMessage} from "../message/IMessage";
import {Message} from "../message/Message";
import {Like} from "./Like";
import {ILike} from "./ILike";

export class LikeController extends Controller {
    private like: ILike = new Like();

    @Post('/like')
    public async likeMessage(tokenArg: string, message_id: string):Promise<void>{
        try{
            checkAuth(tokenArg);
            this.setStatus(200);
            return await this.like.likeMessage(tokenArg, message_id);
        }catch (e) {
            this.setStatus(400);
            console.log(e.message);
        }
    }

    @Delete('/like')
    public async removeLike(tokenArg: string, message_id: string):Promise<void>{
        try{
            checkAuth(tokenArg);
            this.setStatus(200);
            return await this.like.removeLikeFromMessage(tokenArg, message_id);
        }catch (e) {
            this.setStatus(400);
            console.log(e.message);
        }
    }
}
