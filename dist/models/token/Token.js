"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const TokenSchema = new mongoose.Schema({
    _id: String,
    email: String,
});
const TokenModel = mongoose.model('Token', TokenSchema);
exports.TokenModel = TokenModel;
//# sourceMappingURL=Token.js.map