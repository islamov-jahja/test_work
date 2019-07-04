import { Document } from 'mongoose';

export interface IThemeModel extends Document{
    _id: string;
    email: string;
    theme_name: string;
}
