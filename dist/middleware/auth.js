"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const app_1 = require("../core/app");
function checkAuth(tokenB) {
    if (tokenB === '')
        throw new TypeError('токен не передан');
    try {
        const payload = jwt.verify(tokenB, app_1.token.secret);
    }
    catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            throw new TypeError('токен просрочен');
        }
        if (e instanceof jwt.JsonWebTokenError) {
            throw new TypeError('невалидный токен');
        }
    }
    const payload = jwt.verify(tokenB, app_1.token.secret);
    if (payload.type !== 'access') {
        throw new TypeError('невалидный токен');
    }
}
exports.checkAuth = checkAuth;
;
function getEmailFromToken(tokenArg) {
    const payload = jwt.verify(tokenArg, app_1.token.secret);
    return payload.email;
}
exports.getEmailFromToken = getEmailFromToken;
//# sourceMappingURL=auth.js.map