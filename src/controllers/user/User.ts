import {IUser} from "./IUser";
import {models} from "../../models/models";
import * as jwt from "jsonwebtoken";
import * as md5 from "md5";
import {ObjectID} from "bson";
import {Token} from "./AuthHelper";
import {token} from "../../core/app";
import {ITokens} from "./ITokens";
import {EmailServices} from "../services/EmailServices";
import {getEmailFromToken} from "../../middleware/auth";
import {IUserModel} from "../../models/user/IUserModel";
import {ITokenModel} from "../../models/token/ITokenModel";
import {IAccessTokenData} from "../theme/IAccessTokenData";
import {ITokenData} from "./ITokenData";

export class User implements IUser{
    private async updateTokens(email: string, username: string, pathToImage: string): Promise<ITokens>{
        const token = new Token();
        const accessToken = token.generateAcсessToken(email, username, pathToImage);
        const refreshToken = token.generateRefreshToken();
        await token.updateRefreshTokenOnDB(refreshToken.id, email);

        return {
            accessToken: accessToken,
            refreshToken: refreshToken.token
        }
    }

    async setImage(tokenArg: string, file: string):Promise<void> {
        const email: string = getEmailFromToken(tokenArg);
        await models.UserModel.findOneAndUpdate({email: email}, {path_to_image: "uploads/"+ file});
    }

    async registration(email: string, userName: string, password: string): Promise<void> {
        const user: IUserModel = await models.UserModel.findOne({ email: email });

        if (user !== null) {
            throw new TypeError("такой пользователь уже существует");
        }

        const regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!regex.test(email)){
            throw new TypeError("некорректный email");
        }

        if (password.length < 8)
        {
            throw new TypeError("слшиком короткий пароль");
        }

        await models.UserModel.create({
            _id: new ObjectID(),
            email: email,
            username: userName,
            password: md5(password),
            path_to_image: null,
            code_for_recovery: null
        });
    }

    async login(email: string, password: string): Promise<ITokens> {
        const user: IUserModel = await models.UserModel.findOne({ email: email });

        if (user === null)
        {
            throw new TypeError("Такого пользователя не существует");
        }

        if (md5(password) !== user.password) {
            throw new TypeError("пароли не совпадают");
        }
        return await this.updateTokens(email, user.user_name, user.path_to_image);
    }

    async refreshTokens(refreshToken: string) : Promise<ITokens> {
        try {
            const payload: ITokenData = jwt.verify(refreshToken, token.secret);
        }catch (e) {
            if (e instanceof jwt.TokenExpiredError){
                throw new TypeError("токен просрочен");
            }
        }

        const payload: ITokenData = jwt.verify(refreshToken, token.secret);


        const tokenInDB:ITokenModel = await models.TokenModel.findOne({_id: payload.id});

        if (tokenInDB === null){
            throw new TypeError("невалидный токен");
        }

        const user: IUserModel = await models.UserModel.findOne({email: tokenInDB.email});
        return this.updateTokens(tokenInDB.email, user.user_name, user.path_to_image)
    }

    async changeUserName(tokenArg : string, newUserName: string): Promise<void> {
        const payload : IAccessTokenData = jwt.verify(tokenArg, token.secret);
        await models.UserModel.findOneAndUpdate({email: payload.email}, {username: newUserName});
    }

    async senMailWithRecoveryCode(email: string): Promise<void> {
        const user: IUserModel = await models.UserModel.findOne({ email: email });

        if (user === null)
        {
            throw new TypeError("Такого пользователя не существует");
        }

        const codeForRecovery: string = new ObjectID().toHexString();
        await models.UserModel.findOneAndUpdate({ email: email }, {code_for_recovery: codeForRecovery});
        const emailServices: EmailServices = new EmailServices();
        await emailServices.sendCode(email, codeForRecovery);
    }

    async recoveryPassword(email: string, newPassword: string, codeForRecovery: string): Promise<void> {
        const user: IUserModel = await models.UserModel.findOne({ email: email });

        if (user === null) {
            throw new TypeError("Такого пользователя не существует");
        }

        if (codeForRecovery != user.code_for_recovery){
            throw new TypeError("Код восстановления неверен");
        }

        if (newPassword.length < 8){
            throw new TypeError("слишком короткий пароль");
        }

        await models.UserModel.findOneAndUpdate({ email: email }, {password: md5(newPassword), code_for_recovery: null});
    }
}
