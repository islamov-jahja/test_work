"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.token = {
    type: "object",
    properties: {
        accessToken: {
            type: "string"
        },
        refreshToken: {
            type: "string"
        },
    },
    required: ["accessToken", "refreshToken"]
};
//# sourceMappingURL=tokenSchema.js.map