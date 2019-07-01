"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema({
    _id: String,
    creator_id: String,
    theme_id: String,
    description: String
});
const MessageModel = mongoose.model('Message', MessageSchema);
exports.MessageModel = MessageModel;
//# sourceMappingURL=Message.js.map