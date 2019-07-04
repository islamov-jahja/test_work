import * as mongoose from 'mongoose';
import {ITokenModel} from "./ITokenModel";

const TokenSchema = new mongoose.Schema({
    _id: String,
    email: String,
});

const TokenModel = mongoose.model<ITokenModel>('Token', TokenSchema);

export { TokenModel }
