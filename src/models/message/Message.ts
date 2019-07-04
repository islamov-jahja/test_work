import * as mongoose from 'mongoose';
import {IMessageModel} from "./IMessageModel";

const MessageSchema = new mongoose.Schema({
    _id: String,
    email: String,
    theme_id: String,
    description: String
});

const MessageModel = mongoose.model<IMessageModel>('Message', MessageSchema);

export { MessageModel }
