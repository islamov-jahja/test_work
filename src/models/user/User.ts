import * as mongoose from 'mongoose';
import {IUserModel} from "./IUserModel";

const UserSchema = new mongoose.Schema({
    _id: String,
    email: String,
    username: String,
    password: String,
    path_to_image: String,
    code_for_recovery: String
});

const UserModel = mongoose.model<IUserModel>('User', UserSchema);

export { UserModel }
