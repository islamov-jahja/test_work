import { Document } from 'mongoose';

export interface IMessageModel extends Document{
    _id: string;
    email: string;
    theme_id: string;
    description: string;
}
