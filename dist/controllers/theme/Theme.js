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
const bson_1 = require("bson");
const auth_1 = require("../../middleware/auth");
class Theme {
    constructor() {
        this.COUNT_OF_THEMES_ON_PAGE = 5;
    }
    createNewTheme(tokenArg, nameOfTheme) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = auth_1.getEmailFromToken(tokenArg);
            if (nameOfTheme.length <= 0)
                throw new TypeError("название темы не может быть пустым");
            yield models_1.models.ThemeModel.create({
                _id: new bson_1.ObjectID(),
                email: email,
                theme_name: nameOfTheme
            });
        });
    }
    deleteTheme(tokenArg, themeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = auth_1.getEmailFromToken(tokenArg);
            const theme = yield models_1.models.ThemeModel.findOne({ _id: themeId });
            this.validateUserTheme(theme, email);
            yield models_1.models.ThemeModel.findOneAndRemove({ _id: themeId });
            const messages = yield models_1.models.MessageModel.find({ theme_id: themeId });
            yield messages.map((message) => { models_1.models.LikeModel.remove({ message_id: message._id }); });
            yield models_1.models.MessageModel.remove({ theme_id: themeId });
        });
    }
    getThemes(numberOfPage) {
        return __awaiter(this, void 0, void 0, function* () {
            if (numberOfPage <= 0) {
                throw new TypeError('номер странички не может быть меньше 0');
            }
            let items = yield models_1.models.ThemeModel.find({}).skip((numberOfPage - 1) * this.COUNT_OF_THEMES_ON_PAGE).limit(5);
            items = items.map((item) => { return { _id: item._id, email: item.email, theme_name: item.theme_name }; });
            return items;
        });
    }
    refreshTheme(tokenArg, themeId, newNameOfTheme) {
        return __awaiter(this, void 0, void 0, function* () {
            if (newNameOfTheme.length <= 0)
                throw new TypeError("название темы не может быть пустым");
            const email = auth_1.getEmailFromToken(tokenArg);
            const theme = yield models_1.models.ThemeModel.findOne({ _id: themeId });
            this.validateUserTheme(theme, email);
            yield models_1.models.ThemeModel.findOneAndUpdate({ _id: themeId }, { theme_name: newNameOfTheme });
        });
    }
    validateUserTheme(themeModel, email) {
        if (themeModel === null) {
            throw new TypeError("такой темы не существует");
        }
        if (themeModel.email != email) {
            throw new TypeError("невозможно удалить чужую тему");
        }
    }
}
exports.Theme = Theme;
//# sourceMappingURL=Theme.js.map