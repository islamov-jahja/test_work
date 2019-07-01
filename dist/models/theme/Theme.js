"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const ThemeSchema = new mongoose.Schema({
    _id: String,
    email: String,
    theme_name: String
});
const ThemeModel = mongoose.model('Theme', ThemeSchema);
exports.ThemeModel = ThemeModel;
//# sourceMappingURL=Theme.js.map