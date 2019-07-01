"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../core/app");
const jwt = require("jsonwebtoken");
const uuid = require("uuid/v4");
const models_1 = require("../../models/models");
class Token {
    generateAcсessToken(email, username, path_to_image) {
        const tokenData = {
            userName: username,
            path_to_image: path_to_image,
            email: email,
            type: app_1.token.tokens.access.type
        };
        const option = { expiresIn: app_1.token.tokens.access.expiresIn };
        return jwt.sign(tokenData, app_1.token.secret, option);
    }
    generateRefreshToken() {
        const tokenData = {
            id: uuid(),
            type: app_1.token.tokens.refresh.type
        };
        const option = { expiresIn: app_1.token.tokens.refresh.expiresIn };
        return {
            id: tokenData.id,
            token: jwt.sign(tokenData, app_1.token.secret, option)
        };
    }
    updateRefreshTokenOnDB(tokenId, email) {
        return __awaiter(this, void 0, void 0, function* () {
            models_1.models.TokenModel.findOneAndRemove({ email: email });
            yield models_1.models.TokenModel.create({
                _id: tokenId,
                email: email
            });
        });
    }
}
exports.Token = Token;
//# sourceMappingURL=AuthHelper.js.map