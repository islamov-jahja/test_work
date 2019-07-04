import { Document } from 'mongoose';

export interface ITokenModel extends Document{
    _id: string | null;
    email: string | null;
}
