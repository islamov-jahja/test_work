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
const auth_1 = require("../../middleware/auth");
const models_1 = require("../../models/models");
const bson_1 = require("bson");
class Message {
    constructor() {
        this.COUNT_OF_MESSAGE_ON_PAGE = 5;
    }
    createNewMessage(tokenArg, theme_id, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = auth_1.getEmailFromToken(tokenArg);
            const theme = yield models_1.models.ThemeModel.findOne({ _id: theme_id });
            if (theme === null) {
                throw new TypeError("такой темы нет");
            }
            if (message.length < 1) {
                throw new TypeError("пусого сообщения не может быть");
            }
            yield models_1.models.MessageModel.create({
                _id: new bson_1.ObjectID(),
                email: email,
                theme_id: theme_id,
                description: message
            });
        });
    }
    deleteMessage(tokenArg, message_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = auth_1.getEmailFromToken(tokenArg);
            const message = yield models_1.models.MessageModel.findOne({ _id: message_id });
            this.validateUserMessage(message, email);
            yield models_1.models.MessageModel.findOneAndRemove({ _id: message_id });
            yield models_1.models.LikeModel.remove({ message_id: message_id });
        });
    }
    getMessagesInTheme(theme_id, page) {
        return __awaiter(this, void 0, void 0, function* () {
            if (page <= 0) {
                throw new TypeError('номер странички не может быть меньше 0');
            }
            let items = yield models_1.models.MessageModel.find({ theme_id: theme_id }).skip((page - 1) * this.COUNT_OF_MESSAGE_ON_PAGE).limit(5);
            items = items.map((item) => { return { _id: item._id, email: item.email, theme_id: item.theme_id, description: item.description }; });
            return items;
        });
    }
    refreshMessage(tokenArg, message_id, updateMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            if (updateMessage.length <= 0)
                throw new TypeError("содержимое сообщения не может быть пустым");
            const email = auth_1.getEmailFromToken(tokenArg);
            const message = yield models_1.models.MessageModel.findOne({ _id: message_id });
            this.validateUserMessage(message, email);
            yield models_1.models.MessageModel.findOneAndUpdate({ _id: message_id }, { description: updateMessage });
        });
    }
    validateUserMessage(messageModel, email) {
        if (messageModel === null) {
            throw new TypeError("такого сообщения не существует");
        }
        if (messageModel.email != email) {
            throw new TypeError("невозможно удалить чужое сообщение");
        }
    }
}
exports.Message = Message;
//# sourceMappingURL=Message.js.map