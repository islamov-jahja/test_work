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
class Like {
    likeMessage(tokenArg, message_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = auth_1.getEmailFromToken(tokenArg);
            const like = yield models_1.models.LikeModel.findOne({ message_id: message_id, email: email });
            if (like !== null) {
                throw new TypeError("вы уже ставили этому сообщению лайк");
            }
            yield models_1.models.LikeModel.create({
                _id: new bson_1.ObjectID(),
                message_id: message_id,
                email: email
            });
        });
    }
    removeLikeFromMessage(tokenArg, message_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = auth_1.getEmailFromToken(tokenArg);
            const like = yield models_1.models.LikeModel.findOne({ message_id: message_id, email: email });
            if (like === null) {
                throw new TypeError("вы не ставили этому сообщению лайк");
            }
            yield models_1.models.LikeModel.findOneAndRemove({ message_id: message_id, email: email });
        });
    }
}
exports.Like = Like;
//# sourceMappingURL=Like.js.map