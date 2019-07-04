import { Document } from 'mongoose';

export interface IUserModel extends Document{
    _id: string | null;
    email: string | null;
    user_name: string | null;
    password: string | null;
    path_to_image: string | null;
    code_for_recovery: string | null;
}
