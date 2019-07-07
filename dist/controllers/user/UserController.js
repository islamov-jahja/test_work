"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsoa_1 = require("tsoa");
const User_1 = require("./User");
const auth_1 = require("../../middleware/auth");
let UserController = class UserController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.user = new User_1.User();
    }
    registrationOfUser(email, userName, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.user.registration(email, userName, password);
                this.setStatus(200);
            }
            catch (e) {
                this.setStatus(400);
                console.log(e.message);
            }
        });
    }
    setImage(tokenArg, path_to_file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                auth_1.checkAuth(tokenArg);
                yield this.user.setImage(tokenArg, path_to_file);
                this.setStatus(200);
            }
            catch (e) {
                this.setStatus(400);
                console.log(e.message);
            }
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.user.login(email, password);
                this.setStatus(200);
                return result;
            }
            catch (e) {
                this.setStatus(400);
                console.log(e.message);
            }
        });
    }
    refreshTokens(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.user.refreshTokens(refreshToken);
                this.setStatus(200);
                return result;
            }
            catch (e) {
                this.setStatus(400);
                console.log(e.message);
            }
        });
    }
    changeUserName(tokenArg, newUserName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                auth_1.checkAuth(tokenArg);
                yield this.user.changeUserName(tokenArg, newUserName);
                this.setStatus(200);
            }
            catch (e) {
                this.setStatus(400);
                console.log(e.message);
            }
        });
    }
    sendCodeForPasswordRecovery(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.user.senMailWithRecoveryCode(email);
                this.setStatus(200);
            }
            catch (e) {
                this.setStatus(400);
                console.log(e.message);
            }
        });
    }
    recoveryPassword(email, newPassword, codeForRecovery) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.user.recoveryPassword(email, newPassword, codeForRecovery);
                this.setStatus(200);
            }
            catch (e) {
                this.setStatus(400);
                console.log(e.message);
            }
        });
    }
};
__decorate([
    tsoa_1.Post('/user'),
    __param(0, tsoa_1.BodyProp()), __param(1, tsoa_1.BodyProp()), __param(2, tsoa_1.BodyProp())
], UserController.prototype, "registrationOfUser", null);
__decorate([
    tsoa_1.Post('/user/image'),
    __param(0, tsoa_1.BodyProp()), __param(1, tsoa_1.BodyProp())
], UserController.prototype, "setImage", null);
__decorate([
    tsoa_1.Post('/user/login'),
    __param(0, tsoa_1.BodyProp()), __param(1, tsoa_1.BodyProp())
], UserController.prototype, "login", null);
__decorate([
    tsoa_1.Post('/user/refresh'),
    __param(0, tsoa_1.BodyProp())
], UserController.prototype, "refreshTokens", null);
__decorate([
    tsoa_1.Put('/user/username'),
    __param(0, tsoa_1.BodyProp()), __param(1, tsoa_1.BodyProp())
], UserController.prototype, "changeUserName", null);
__decorate([
    tsoa_1.Post('user/recovery'),
    __param(0, tsoa_1.BodyProp())
], UserController.prototype, "sendCodeForPasswordRecovery", null);
__decorate([
    tsoa_1.Put('user/recovery'),
    __param(0, tsoa_1.BodyProp()), __param(1, tsoa_1.BodyProp()), __param(2, tsoa_1.BodyProp())
], UserController.prototype, "recoveryPassword", null);
UserController = __decorate([
    tsoa_1.Route('/todo')
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map