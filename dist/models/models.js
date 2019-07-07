"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./user/User");
const Theme_1 = require("./theme/Theme");
const Message_1 = require("./message/Message");
const like_1 = require("./like/like");
const Token_1 = require("./token/Token");
const modelsTsoa = {
    "IUserModel": {
        "properties": {
            "_id": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true },
            "username": { "dataType": "string", "required": true },
            "path_to_image": { "dataType": "string", "required": false }
        }
    },
    "ITokenModel": {
        "properties": {
            "_id": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true }
        }
    },
    "IThemeModel": {
        "properties": {
            "_id": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
            "theme_name": { "dataType": "string", "required": false }
        },
    },
    "IMessageModel": {
        "properties": {
            "_id": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
            "theme_id": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true }
        }
    },
    "ILikeModel": {
        "properties": {
            "_id": { "dataType": "string", "required": true },
            "message_id": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true }
        }
    }
};
exports.models = {
    UserModel: User_1.UserModel,
    ThemeModel: Theme_1.ThemeModel,
    MessageModel: Message_1.MessageModel,
    LikeModel: like_1.LikeModel,
    TokenModel: Token_1.TokenModel,
    modelsTsoa
};
//# sourceMappingURL=models.js.map