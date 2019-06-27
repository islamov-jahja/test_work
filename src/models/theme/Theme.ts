import * as mongoose from 'mongoose';

const ThemeSchema = new mongoose.Schema({
    _id: String,
    email: String,
    theme_name: String
});

const ThemeModel = mongoose.model('Theme', ThemeSchema);

export { ThemeModel }
