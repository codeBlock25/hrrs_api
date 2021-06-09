"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentModel = void 0;
var mongoose_1 = require("mongoose");
var studentSchema = new mongoose_1.Schema({
    dateOfBirth: {
        type: Date,
    },
    userID: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    yearOfStudy: {
        type: String,
        default: "",
        required: true,
    },
    department: {
        type: String,
        default: "",
        required: true,
    },
    nationality: {
        type: String,
        default: "",
        required: true,
    },
    state: {
        type: String,
        default: "",
        required: true,
    },
    lga: {
        type: String,
        default: "",
        required: true,
    },
    address: {
        type: String,
        default: "",
        required: true,
    },
    guardian_firstName: {
        type: String,
        default: "",
        required: true,
    },
    guardian_lastName: {
        type: String,
        default: "",
        required: true,
    },
    guardian_relationship: {
        type: String,
        default: "",
        required: true,
    },
    guardian_phoneNumber: {
        type: String,
        default: "",
        required: true,
    },
});
exports.studentModel = mongoose_1.model("student", studentSchema);
