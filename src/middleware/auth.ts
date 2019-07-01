import * as jwt from "jsonwebtoken";
import {token} from "../core/app";
import {IAccessTokenData} from "../controllers/theme/IAccessTokenData";

export function checkAuth(tokenB: string){
    if (tokenB === '')
        throw new TypeError('токен не передан');
    try {
        const payload = jwt.verify(tokenB, token.secret);
    }catch (e) {
        if (e instanceof jwt.TokenExpiredError){
            throw new TypeError('токен просрочен');
        }

        if (e instanceof  jwt.JsonWebTokenError){
            throw new TypeError('невалидный токен');
        }
    }

    const payload = jwt.verify(tokenB, token.secret);

    if (payload.type !== 'access') {
        throw new TypeError('невалидный токен');
    }
};

export function getEmailFromToken(tokenArg: string): string {
    const payload: IAccessTokenData = jwt.verify(tokenArg, token.secret);
    return payload.email;
}
