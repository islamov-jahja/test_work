import * as mongoose from 'mongoose';
import {ILikeModel} from "./ILikeModel";
const LikeSchema = new mongoose.Schema({
    _id: String,
    message_id: String,
    email: String
});

const LikeModel = mongoose.model<ILikeModel>('Like', LikeSchema);

export { LikeModel }
