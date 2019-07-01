import {ILike} from "./ILike";
import {getEmailFromToken} from "../../middleware/auth";
import {models} from "../../models/models";
import {Schema} from "mongoose";
import {ObjectID} from "bson";

export class Like implements ILike{
    async likeMessage(tokenArg: string, message_id: string): Promise<void> {
        const email:string = getEmailFromToken(tokenArg);
        const like:any = await models.LikeModel.findOne({message_id:message_id, email:email});

        if (like !== null){
            throw new TypeError("вы уже ставили этому сообщению лайк");
        }

        await models.LikeModel.create({
            _id: new ObjectID(),
            message_id: message_id,
            email: email
        });
    }

    async  removeLikeFromMessage(tokenArg: string, message_id): Promise<void> {
        const email: string = getEmailFromToken(tokenArg);
        const like:any = await models.LikeModel.findOne({message_id:message_id, email:email});

        if (like === null){
            throw new TypeError("вы не ставили этому сообщению лайк");
        }

        await models.LikeModel.findOneAndRemove({message_id:message_id, email:email});
    }
}
