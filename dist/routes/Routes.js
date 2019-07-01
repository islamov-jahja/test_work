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
const tsoa_1 = require("tsoa");
const controllers_1 = require("../controllers/controllers");
const models = {
    "ITodo": {
        "properties": {
            "_id": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
        },
    }
};
const validationService = new tsoa_1.ValidationService(models);
function RegisterRoutes(app) {
    app.post('/user', function (request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                email: { "in": "body-prop", "name": "email", "required": true, "dataType": "string" },
                userName: { "in": "body-prop", "name": "user_name", "required": true, "dataType": "string" },
                password: { "in": "body-prop", "name": "password", "required": true, "dataType": "string" }
            };
            let validatedArgs = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            }
            catch (err) {
                return next();
            }
            const controller = new controllers_1.controllers.UserController();
            const promise = yield controller.registrationOfUser.apply(controller, validatedArgs);
            yield promiseHandler(controller, promise, response, next);
        });
    });
    app.post('/user/recovery', function (request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                email: { "in": "body-prop", "name": "email", "required": true, "dataType": "string" }
            };
            let validatedArgs = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            }
            catch (err) {
                return next(err);
            }
            const controller = new controllers_1.controllers.UserController();
            const promise = yield controller.sendCodeForPasswordRecovery.apply(controller, validatedArgs);
            yield promiseHandler(controller, promise, response, next);
        });
    });
    app.put('/user/recovery', function (request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                email: { "in": "body-prop", "name": "email", "required": true, "dataType": "string" },
                newPassword: { "in": "body-prop", "name": "password", "required": true, "dataType": "string" },
                codeForRecovery: { "in": "body-prop", "name": "code", "required": true, "dataType": "string" }
            };
            let validatedArgs = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            }
            catch (err) {
                return next();
            }
            const controller = new controllers_1.controllers.UserController();
            const promise = yield controller.recoveryPassword.apply(controller, validatedArgs);
            yield promiseHandler(controller, promise, response, next);
        });
    });
    app.post('/user/login', function (request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                email: { "in": "body-prop", "name": "email", "required": true, "dataType": "string" },
                password: { "in": "body-prop", "name": "password", "required": true, "dataType": "string" }
            };
            let validatedArgs = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            }
            catch (err) {
                return next();
            }
            const controller = new controllers_1.controllers.UserController();
            const promise = yield controller.login.apply(controller, validatedArgs);
            yield promiseHandler(controller, promise, response, next);
        });
    });
    app.post('/user/refresh', function (request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                token: { "in": "body-prop", "name": "refreshToken", "required": true, "dataType": "string" },
            };
            let validatedArgs = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            }
            catch (err) {
                return next();
            }
            const controller = new controllers_1.controllers.UserController();
            const promise = yield controller.refreshTokens.apply(controller, validatedArgs);
            yield promiseHandler(controller, promise, response, next);
        });
    });
    app.put('/user/username', function (request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                token: { "in": "header", "name": "Authorization", "required": true, "dataType": "string" },
                userName: { "in": "body-prop", "name": "userName", "required": true, "dataType": "string" }
            };
            let validatedArgs = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            }
            catch (err) {
                return next();
            }
            const controller = yield new controllers_1.controllers.UserController();
            const promise = yield controller.changeUserName.apply(controller, validatedArgs);
            yield promiseHandler(controller, promise, response, next);
        });
    });
    app.post('/theme', function (request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                token: { "in": "header", "name": "Authorization", "required": true, "dataType": "string" },
                nameOfTheme: { "in": "body-prop", "name": "nameOfTheme", "required": true, "dataType": "string" }
            };
            let validatedArgs = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            }
            catch (err) {
                return next();
            }
            const controller = new controllers_1.controllers.ThemeController();
            const promise = yield controller.createTheme.apply(controller, validatedArgs);
            yield promiseHandler(controller, promise, response, next);
        });
    });
    app.delete('/theme/:id', function (request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                token: { "in": "header", "name": "Authorization", "required": true, "dataType": "string" },
                themeId: { "in": "path", "name": "id", "required": true, "dataType": "string" }
            };
            let validatedArgs = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            }
            catch (err) {
                return next();
            }
            const controller = new controllers_1.controllers.ThemeController();
            const promise = yield controller.deleteTheme.apply(controller, validatedArgs);
            yield promiseHandler(controller, promise, response, next);
        });
    });
    app.put('/theme/:id', function (request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                token: { "in": "header", "name": "Authorization", "required": true, "dataType": "string" },
                themeId: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                nameOfTheme: { "in": "body-prop", "name": "nameOfTheme", "required": true, "dataType": "string" }
            };
            let validatedArgs = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            }
            catch (err) {
                return next();
            }
            const controller = new controllers_1.controllers.ThemeController();
            const promise = yield controller.refreshTheme.apply(controller, validatedArgs);
            yield promiseHandler(controller, promise, response, next);
        });
    });
    app.get('/theme/:id', function (request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                page: { "in": "path", "name": "id", "required": true, "dataType": "string" }
            };
            let validatedArgs = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            }
            catch (err) {
                return next();
            }
            const controller = new controllers_1.controllers.ThemeController();
            const promise = yield controller.getThemes.apply(controller, validatedArgs);
            yield promiseHandler(controller, promise, response, next);
        });
    });
    app.post('/message', function (request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                token: { "in": "header", "name": "Authorization", "required": true, "dataType": "string" },
                theme_id: { "in": "body-prop", "name": "theme_id", "required": true, "dataType": "string" },
                text: { "in": "body-prop", "name": "message", "required": true, "dataType": "string" }
            };
            let validatedArgs = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            }
            catch (err) {
                return next();
            }
            const controller = new controllers_1.controllers.MessageController();
            const promise = yield controller.createMessage.apply(controller, validatedArgs);
            yield promiseHandler(controller, promise, response, next);
        });
    });
    app.delete('/message', function (request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                token: { "in": "header", "name": "Authorization", "required": true, "dataType": "string" },
                message_id: { "in": "body-prop", "name": "message_id", "required": true, "dataType": "string" }
            };
            let validatedArgs = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            }
            catch (err) {
                return next();
            }
            const controller = new controllers_1.controllers.MessageController();
            const promise = yield controller.deleteMessage.apply(controller, validatedArgs);
            yield promiseHandler(controller, promise, response, next);
        });
    });
    app.put('/message', function (request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                token: { "in": "header", "name": "Authorization", "required": true, "dataType": "string" },
                message_id: { "in": "body-prop", "name": "message_id", "required": true, "dataType": "string" },
                newMessage: { "in": "body-prop", "name": "message", "required": true, "dataType": "string" }
            };
            let validatedArgs = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            }
            catch (err) {
                return next();
            }
            const controller = new controllers_1.controllers.MessageController();
            const promise = yield controller.refreshMessage.apply(controller, validatedArgs);
            yield promiseHandler(controller, promise, response, next);
        });
    });
    app.get('/message', function (request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                theme_id: { "in": "body-prop", "name": "theme_id", "required": true, "dataType": "string" },
                page: { "in": "body-prop", "name": "page", "required": true, "dataType": "string" }
            };
            let validatedArgs = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            }
            catch (err) {
                return next();
            }
            const controller = new controllers_1.controllers.MessageController();
            const promise = yield controller.getMessageFromTheme.apply(controller, validatedArgs);
            yield promiseHandler(controller, promise, response, next);
        });
    });
    function isController(object) {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }
    function promiseHandler(controllerObj, promise, response, next) {
        return Promise.resolve(promise)
            .then((data) => {
            let statusCode;
            if (isController(controllerObj)) {
                const headers = controllerObj.getHeaders();
                Object.keys(headers).forEach((name) => {
                    response.set(name, headers[name]);
                });
                statusCode = controllerObj.getStatus();
            }
            if (data || data === false) {
                response.status(statusCode || 200).json(data);
            }
            else {
                response.status(statusCode || 204).end();
            }
        })
            .catch((error) => next(error));
    }
    function getValidatedArgs(args, request) {
        const fieldErrors = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors);
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors);
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors);
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, name + '.');
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.');
            }
        });
        if (Object.keys(fieldErrors).length > 0) {
            throw new tsoa_1.ValidateError(fieldErrors, '');
        }
        return values;
    }
}
exports.RegisterRoutes = RegisterRoutes;
//# sourceMappingURL=Routes.js.map