"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const Message_1 = require("./Message");
class MessageController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.message = new Message_1.Message();
    }
    createMessage(tokenArg, theme_id, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.setStatus(200);
                return yield this.message.createNewMessage(tokenArg, theme_id, message);
            }
            catch (e) {
                this.setStatus(400);
                console.log(e.message);
            }
        });
    }
    deleteMessage(tokenArg, message_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.setStatus(200);
                return yield this.message.deleteMessage(tokenArg, message_id);
            }
            catch (e) {
                this.setStatus(400);
                console.log(e.message);
            }
        });
    }
    refreshMessage(tokenArg, message_id, updateMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.setStatus(200);
                return yield this.message.refreshMessage(tokenArg, message_id, updateMessage);
            }
            catch (e) {
                this.setStatus(400);
                console.log(e.message);
            }
        });
    }
    getMessageFromTheme(theme_id, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.setStatus(200);
                return yield this.message.getMessagesInTheme(theme_id, page);
            }
            catch (e) {
                this.setStatus(400);
                console.log(e.message);
            }
        });
    }
}
__decorate([
    tsoa_1.Post('/message')
], MessageController.prototype, "createMessage", null);
__decorate([
    tsoa_1.Delete('/message')
], MessageController.prototype, "deleteMessage", null);
__decorate([
    tsoa_1.Put('/message')
], MessageController.prototype, "refreshMessage", null);
__decorate([
    tsoa_1.Get('/message')
], MessageController.prototype, "getMessageFromTheme", null);
exports.MessageController = MessageController;
//# sourceMappingURL=MessageController.js.map