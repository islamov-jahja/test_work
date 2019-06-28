import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
import { TodoController } from '../todo.controller';
import * as express from 'express';
import {controllers} from "../controllers/controllers";

const models: TsoaRoute.Models = {
    "ITodo": {
        "properties": {
            "_id": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
        },
    }

    /*"IUser": {
        "properties": {
            "_id": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true },
            "username": { "dataType": "string", "required": true },
            "path_to_image": { "dataType": "string", "required": false }
        }
    }*/
};
const validationService = new ValidationService(models);

export function RegisterRoutes(app: express.Express) {
    app.post('/user', async function (request: any, response: any, next: any) {
        const args = {
            email: { "in": "body-prop", "name": "email", "required": true, "dataType": "string" },
            userName: { "in": "body-prop", "name": "user_name", "required": true, "dataType": "string" },
            password: { "in": "body-prop", "name": "password", "required": true, "dataType": "string" }
        };

        let validatedArgs: any[] = [];

        try {
            validatedArgs = getValidatedArgs(args, request);
        } catch (err) {
            return next(err);
        }

        const controller = new controllers.UserController();
        const promise = await controller.registrationOfUser.apply(controller, validatedArgs as any);
        await promiseHandler(controller, promise, response, next);
    });

    app.post('/user/login', async function (request: any, response: any, next: any) {
        const args = {
            email: { "in": "body-prop", "name": "email", "required": true, "dataType": "string" },
            password: { "in": "body-prop", "name": "password", "required": true, "dataType": "string" }
        };

        let validatedArgs: any[] = [];

        try {
            validatedArgs = getValidatedArgs(args, request);
        } catch (err) {
            return next(err);
        }

        const controller = new controllers.UserController();
        const promise = await controller.login.apply(controller, validatedArgs as any);
        await promiseHandler(controller, promise, response, next);
    });

    app.post('/user/refresh', async function (request: any, response: any, next: any) {
        const args = {
            token: { "in": "body-prop", "name": "refreshToken", "required": true, "dataType": "string" },
        };

        let validatedArgs: any[] = [];

        try {
            validatedArgs = getValidatedArgs(args, request);
        } catch (err) {
            return next(err);
        }

        const controller = new controllers.UserController();
        const promise = await controller.refreshTokens.apply(controller, validatedArgs as any);
        await promiseHandler(controller, promise, response, next);
    });

    app.post('/theme', async function (request: any, response: any, next: any) {
        const args = {
            token: { "in": "header", "name": "Authorization", "required": true, "dataType": "string" },
            nameOfTheme: { "in": "body-prop", "name": "nameOfTheme", "required": true, "dataType": "string" }
        };

        let validatedArgs: any[] = [];

        try {
            validatedArgs = getValidatedArgs(args, request);
        } catch (err) {
            return next(err);
        }

        const controller = new controllers.ThemeController();
        const promise = await controller.createTheme.apply(controller, validatedArgs as any);
        await promiseHandler(controller, promise, response, next);
    });

    app.delete('/theme/:id', async function (request: any, response: any, next: any) {
        const args = {
            token: { "in": "header", "name": "Authorization", "required": true, "dataType": "string" },
            themeId: { "in": "path", "name": "id", "required": true, "dataType": "string" }
        };

        let validatedArgs: any[] = [];

        try {
            validatedArgs = getValidatedArgs(args, request);
        } catch (err) {
            return next(err);
        }

        const controller = new controllers.ThemeController();
        const promise = await controller.deleteTheme.apply(controller, validatedArgs as any);
        await promiseHandler(controller, promise, response, next);
    });

    app.put('/theme/:id', async function (request: any, response: any, next: any) {
        const args = {
            token: { "in": "header", "name": "Authorization", "required": true, "dataType": "string" },
            themeId: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            nameOfTheme: { "in": "body-prop", "name": "nameOfTheme", "required": true, "dataType": "string" }
        };

        let validatedArgs: any[] = [];

        try {
            validatedArgs = getValidatedArgs(args, request);
        } catch (err) {
            return next(err);
        }

        const controller = new controllers.ThemeController();
        const promise = await controller.refreshTheme.apply(controller, validatedArgs as any);
        await promiseHandler(controller, promise, response, next);
    });

    app.put('/user/username', async function (request: any, response: any, next: any) {
        const args = {
            token: { "in": "header", "name": "Authorization", "required": true, "dataType": "string" },
            userName: { "in": "body-prop", "name": "userName", "required": true, "dataType": "string" }
        };

        let validatedArgs: any[] = [];

        try {
            validatedArgs = getValidatedArgs(args, request);
        } catch (err) {
            return next(err);
        }

        const controller = await new controllers.UserController();
        const promise = await controller.changeUserName.apply(controller, validatedArgs as any);
        await promiseHandler(controller, promise, response, next);
    });

    app.get('/todo',
        async function(request: any, response: any, next: any) {
            const args = {
                token: { "in": "header", "name": "Authorization", "required": true, "dataType": "string" }
            };
            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new TodoController();
            const promise = await controller.getAll.apply(controller, validatedArgs as any);
            await promiseHandler(controller, promise, response, next);
        });
    app.post('/todo',
        async function(request: any, response: any, next: any) {
            const args = {
                description: { "in": "body-prop", "name": "description", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new TodoController();
            const promise = await controller.create.apply(controller, validatedArgs as any);
            await promiseHandler(controller, promise, response, next);
        });
    app.put('/todo/:id',
        async function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                description: { "in": "body-prop", "name": "description", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new TodoController();


            const promise = await controller.update.apply(controller, validatedArgs as any);
            await promiseHandler(controller, promise, response, next);
        });
    app.delete('/todo/:id',
        async function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new TodoController();
            const promise = await controller.remove.apply(controller, validatedArgs as any);
            await promiseHandler(controller, promise, response, next);
        });


    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode;
                if (isController(controllerObj)) {
                    const headers = controllerObj.getHeaders();
                    Object.keys(headers).forEach((name: string) => {
                        response.set(name, headers[name]);
                    });

                    statusCode = controllerObj.getStatus();
                }

                if (data || data === false) { // === false allows boolean result
                    response.status(statusCode || 200).json(data);
                } else {
                    response.status(statusCode || 204).end();
                }
            })
            .catch((error: any) => next(error));
    }

    function getValidatedArgs(args: any, request: any): any[] {
        const fieldErrors: FieldErrors = {};
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
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }
}
