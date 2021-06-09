"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_1 = require("./auth");
var authRoute = [
    {
        method: "POST",
        path: "/api/auth/register",
        handler: auth_1.userRegistrationHandler,
        options: {
            validate: auth_1.userRegistrationValidator,
        },
    },
    {
        method: "GET",
        path: "/api/auth/login",
        handler: auth_1.userLoginHandler,
        options: {
            validate: auth_1.userLoginValidator,
        },
    },
    {
        method: "PUT",
        path: "/api/auth/verify",
        handler: auth_1.userVerificationHandler,
        options: {
            validate: auth_1.userVerificationValidator,
        },
    },
];
var AppRoute = __spreadArray([
    {
        method: "GET",
        path: "/api",
        handler: function (_req, h) {
            return h.response({ greeting: "Welcome to HRRS PORTAL API" });
        },
    }
], authRoute);
exports.default = AppRoute;
