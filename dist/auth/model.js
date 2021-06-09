"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = exports.Gender = void 0;
var mongoose_1 = require("mongoose");
var Gender;
(function (Gender) {
    Gender[Gender["male"] = 0] = "male";
    Gender[Gender["female"] = 1] = "female";
})(Gender = exports.Gender || (exports.Gender = {}));
var userSchema = new mongoose_1.Schema({
    first_name: {
        type: String,
        required: true,
        lowercase: true,
    },
    last_name: {
        type: String,
        required: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    verificationCode: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: Gender,
        required: true,
        default: Gender.male,
    },
    registrationNumber: {
        type: String,
        required: true,
        unique: true,
    },
    phone_number: {
        type: String,
        required: true,
        unique: true,
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false,
    },
    date: {
        type: Date,
        required: true,
        default: new Date(),
    },
});
exports.userModel = mongoose_1.model("user", userSchema);
