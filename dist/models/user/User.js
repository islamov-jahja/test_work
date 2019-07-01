"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    _id: String,
    email: String,
    username: String,
    password: String,
    path_to_image: String,
    code_for_recovery: String
});
const UserModel = mongoose.model('User', UserSchema);
exports.UserModel = UserModel;
//# sourceMappingURL=User.js.map