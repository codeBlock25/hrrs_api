"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppRoute = [
    {
        method: "GET",
        path: "/api",
        handler: function (_req, h) {
            return h.response({ greeting: "Welcome to HRRS PORTAL API" });
        },
    },
];
exports.default = AppRoute;
