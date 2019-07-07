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
const models_1 = require("../../models/models");
const jwt = require("jsonwebtoken");
const md5 = require("md5");
const bson_1 = require("bson");
const AuthHelper_1 = require("./AuthHelper");
const app_1 = require("../../core/app");
const EmailServices_1 = require("../services/EmailServices");
const auth_1 = require("../../middleware/auth");
class User {
    updateTokens(email, username, pathToImage) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = new AuthHelper_1.Token();
            const accessToken = token.generateAcсessToken(email, username, pathToImage);
            const refreshToken = token.generateRefreshToken();
            yield token.updateRefreshTokenOnDB(refreshToken.id, email);
            return {
                accessToken: accessToken,
                refreshToken: refreshToken.token
            };
        });
    }
    setImage(tokenArg, file) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = auth_1.getEmailFromToken(tokenArg);
            yield models_1.models.UserModel.findOneAndUpdate({ email: email }, { path_to_image: "uploads/" + file });
        });
    }
    registration(email, userName, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.models.UserModel.findOne({ email: email });
            if (user !== null) {
                throw new TypeError("такой пользователь уже существует");
            }
            const regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!regex.test(email)) {
                throw new TypeError("некорректный email");
            }
            if (password.length < 8) {
                throw new TypeError("слшиком короткий пароль");
            }
            yield models_1.models.UserModel.create({
                _id: new bson_1.ObjectID(),
                email: email,
                username: userName,
                password: md5(password),
                path_to_image: null,
                code_for_recovery: null
            });
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.models.UserModel.findOne({ email: email });
            if (user === null) {
                throw new TypeError("Такого пользователя не существует");
            }
            if (md5(password) !== user.password) {
                throw new TypeError("пароли не совпадают");
            }
            return yield this.updateTokens(email, user.user_name, user.path_to_image);
        });
    }
    refreshTokens(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = jwt.verify(refreshToken, app_1.token.secret);
            }
            catch (e) {
                if (e instanceof jwt.TokenExpiredError) {
                    throw new TypeError("токен просрочен");
                }
            }
            const payload = jwt.verify(refreshToken, app_1.token.secret);
            const tokenInDB = yield models_1.models.TokenModel.findOne({ _id: payload.id });
            if (tokenInDB === null) {
                throw new TypeError("невалидный токен");
            }
            const user = yield models_1.models.UserModel.findOne({ email: tokenInDB.email });
            return this.updateTokens(tokenInDB.email, user.user_name, user.path_to_image);
        });
    }
    changeUserName(tokenArg, newUserName) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = jwt.verify(tokenArg, app_1.token.secret);
            yield models_1.models.UserModel.findOneAndUpdate({ email: payload.email }, { username: newUserName });
        });
    }
    senMailWithRecoveryCode(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.models.UserModel.findOne({ email: email });
            if (user === null) {
                throw new TypeError("Такого пользователя не существует");
            }
            const codeForRecovery = new bson_1.ObjectID().toHexString();
            yield models_1.models.UserModel.findOneAndUpdate({ email: email }, { code_for_recovery: codeForRecovery });
            const emailServices = new EmailServices_1.EmailServices();
            yield emailServices.sendCode(email, codeForRecovery);
        });
    }
    recoveryPassword(email, newPassword, codeForRecovery) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.models.UserModel.findOne({ email: email });
            if (user === null) {
                throw new TypeError("Такого пользователя не существует");
            }
            if (codeForRecovery != user.code_for_recovery) {
                throw new TypeError("Код восстановления неверен");
            }
            if (newPassword.length < 8) {
                throw new TypeError("слишком короткий пароль");
            }
            yield models_1.models.UserModel.findOneAndUpdate({ email: email }, { password: md5(newPassword), code_for_recovery: null });
        });
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map