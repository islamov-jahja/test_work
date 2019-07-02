import { UserModel } from './user/User';
import { ThemeModel } from './theme/Theme';
import {MessageModel} from "./message/Message";
import {LikeModel} from "./like/like";
import {TokenModel} from "./token/Token";
import {TsoaRoute} from "tsoa";

const modelsTsoa: TsoaRoute.Models = {
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

export const models = {
    UserModel,
    ThemeModel,
    MessageModel,
    LikeModel,
    TokenModel,
    modelsTsoa
};
