"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var APP_CONFIG = process.env;
dotenv_1.config();
var config = {
    get db() {
        return APP_CONFIG.DATABASE || "mongodb://localhost:27017/hrrs";
    },
    get port() {
        return APP_CONFIG.PORT || 4455;
    },
    get secret() {
        return APP_CONFIG.SECRET || "NO SECRET YET";
    },
    get adminEmail() {
        return APP_CONFIG.ADMIN_EMAIL || "amosdaniel252@gmail.com";
    },
    get appMail() {
        return {
            address: "noreply@dipromedics.com ",
            password: "Dev@2021",
        };
    },
};
exports.default = config;
