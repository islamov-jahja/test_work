import * as mongoose from 'mongoose';
import {IThemeModel} from "./IThemeModel";

const ThemeSchema = new mongoose.Schema({
    _id: String,
    email: String,
    theme_name: String
});

const ThemeModel = mongoose.model<IThemeModel>('Theme', ThemeSchema);

export { ThemeModel }
