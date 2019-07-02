"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const request_logger_middleware_1 = require("./request.logger.middleware");
require("./../controllers/user/UserController");
const Routes_1 = require("../routes/Routes");
const swaggerUi = require("swagger-ui-express");
const app = express();
exports.app = app;
app.use(cors());
app.use(bodyparser.json());
app.use(request_logger_middleware_1.requestLoggerMiddleware);
Routes_1.RegisterRoutes(app);
try {
    const swaggerDocument = require('../../src/docs/swagger.json');
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
catch (err) {
    console.error('Unable to read swagger.json', err);
}
exports.token = {
    secret: 'you do not know secret',
    tokens: {
        access: {
            type: 'access',
            expiresIn: '45m'
        },
        refresh: {
            type: 'refresh',
            expiresIn: '60m'
        },
    }
};
//# sourceMappingURL=app.js.map
