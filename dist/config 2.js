"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var APP_CONFIG = process.env;
dotenv_1.config();
var config = {
    get db() {
        return APP_CONFIG.DATABASE || "mongodb://localhost:27017/zenabis";
    },
    get port() {
        return APP_CONFIG.PORT || 6677;
    },
    get secret() {
        return APP_CONFIG.SECRET || "NO SECRET YET";
    },
    get adminEmail() {
        return APP_CONFIG.ADMIN_EMAIL || "amosdaniel252@gmail.com";
    },
    get appMail() {
        return {
            address: APP_CONFIG.APP_MAIL,
            password: APP_CONFIG.APP_MAIL_PASSWORD,
        };
    },
};
exports.default = config;
