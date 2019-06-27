import { token} from "../../core/app";
import * as jwt from "jsonwebtoken";
import * as uuid from 'uuid/v4';
import {models} from "../../models/models";
import {ITokenData} from "./ITokenData";

export class Token{
    public generateAcсessToken(email: string, username: string, path_to_image: string) : string {
        const tokenData = {
            userName: username,
            path_to_image: path_to_image,
            email: email,
            type: token.tokens.access.type
        };

        const option = {expiresIn : token.tokens.access.expiresIn};

        return jwt.sign(tokenData, token.secret,  option);
    }

    public generateRefreshToken(): ITokenData {
        const tokenData = {
            id: uuid(),
            type: token.tokens.refresh.type
        };

        const option = {expiresIn : token.tokens.refresh.expiresIn};

        return {
            id: tokenData.id,
            token: jwt.sign(tokenData, token.secret, option)
        };
    }

    public async updateRefreshTokenOnDB(tokenId: string, email: string): Promise<void> {
        models.TokenModel.findOneAndRemove( {email: email});
        await models.TokenModel.create({
            _id: tokenId,
            email: email
        })
    }
}
