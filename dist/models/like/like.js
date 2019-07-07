"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const LikeSchema = new mongoose.Schema({
    _id: String,
    message_id: String,
    email: String
});
const LikeModel = mongoose.model('Like', LikeSchema);
exports.LikeModel = LikeModel;
//# sourceMappingURL=like.js.map