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
const app_1 = require("../../core/app");
const jwt = require("jsonwebtoken");
const models_1 = require("../../models/models");
const bson_1 = require("bson");
const EmailServices_1 = require("../services/EmailServices");
class Theme {
    constructor() {
        this.COUNT_OF_THEMES_ON_PAGE = 5;
    }
    getEmailFromToken(tokenArg) {
        const payload = jwt.verify(tokenArg, app_1.token.secret);
        return payload.email;
    }
    createNewTheme(tokenArg, nameOfTheme) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = this.getEmailFromToken(tokenArg);
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
            const email = this.getEmailFromToken(tokenArg);
            const theme = yield models_1.models.ThemeModel.findOne({ _id: themeId });
            this.ValidateUserTheme(theme, email);
            yield models_1.models.ThemeModel.findOneAndRemove({ email: email });
        });
    }
    getThemes(numberOfPage) {
        return __awaiter(this, void 0, void 0, function* () {
            if (numberOfPage <= 0) {
                throw new TypeError('номер странички не может быть меньше 0');
            }
            let items = yield models_1.models.ThemeModel.find({}).skip((numberOfPage - 1) * this.COUNT_OF_THEMES_ON_PAGE).limit(5);
            items = items.map((item) => { return { id: item._id, description: item.description }; });
            const email = new EmailServices_1.EmailServices();
            return items;
        });
    }
    refreshTheme(tokenArg, themeId, newNameOfTheme) {
        return __awaiter(this, void 0, void 0, function* () {
            if (newNameOfTheme.length <= 0)
                throw new TypeError("название темы не может быть пустым");
            const email = this.getEmailFromToken(tokenArg);
            const theme = yield models_1.models.ThemeModel.findOne({ _id: themeId });
            this.ValidateUserTheme(theme, email);
            yield models_1.models.ThemeModel.findOneAndUpdate({ _id: themeId }, { theme_name: newNameOfTheme });
        });
    }
    ValidateUserTheme(themeModel, email) {
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