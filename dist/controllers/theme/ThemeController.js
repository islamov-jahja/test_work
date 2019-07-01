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
const auth_1 = require("../../middleware/auth");
const Theme_1 = require("./Theme");
class ThemeController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.theme = new Theme_1.Theme();
    }
    createTheme(tokenArg, nameOfTheme) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                auth_1.checkAuth(tokenArg);
                yield this.theme.createNewTheme(tokenArg, nameOfTheme);
                this.setStatus(200);
            }
            catch (e) {
                this.setStatus(400);
                console.log(e.message);
            }
        });
    }
    deleteTheme(tokenArg, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                auth_1.checkAuth(tokenArg);
                yield this.theme.deleteTheme(tokenArg, id);
                this.setStatus(200);
            }
            catch (e) {
                this.setStatus(400);
                console.log(e.message);
            }
        });
    }
    refreshTheme(tokenArg, id, newNameOfTheme) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                auth_1.checkAuth(tokenArg);
                yield this.theme.refreshTheme(tokenArg, id, newNameOfTheme);
                this.setStatus(200);
            }
            catch (e) {
                this.setStatus(400);
                console.log(e.message);
            }
        });
    }
    getThemes(page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.setStatus(200);
                return yield this.theme.getThemes(page);
            }
            catch (e) {
                this.setStatus(400);
                console.log(e.message);
            }
        });
    }
}
__decorate([
    tsoa_1.Post('/theme'),
    __param(0, tsoa_1.BodyProp()), __param(1, tsoa_1.BodyProp())
], ThemeController.prototype, "createTheme", null);
__decorate([
    tsoa_1.Delete('/theme/:id'),
    __param(0, tsoa_1.BodyProp()), __param(1, tsoa_1.BodyProp())
], ThemeController.prototype, "deleteTheme", null);
__decorate([
    tsoa_1.Put('/theme/:id'),
    __param(0, tsoa_1.BodyProp()), __param(1, tsoa_1.BodyProp()), __param(2, tsoa_1.BodyProp())
], ThemeController.prototype, "refreshTheme", null);
__decorate([
    tsoa_1.Get('/theme/:id'),
    __param(0, tsoa_1.BodyProp())
], ThemeController.prototype, "getThemes", null);
exports.ThemeController = ThemeController;
//# sourceMappingURL=ThemeController.js.map