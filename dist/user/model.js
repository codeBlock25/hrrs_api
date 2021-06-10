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
        ref: "user",
    },
    yearOfStudy: {
        type: String,
        default: "",
    },
    department: {
        type: String,
        default: "",
    },
    nationality: {
        type: String,
        default: "",
    },
    state: {
        type: String,
        default: "",
    },
    lga: {
        type: String,
        default: "",
    },
    address: {
        type: String,
        default: "",
    },
    guardian_firstName: {
        type: String,
        default: "",
    },
    guardian_lastName: {
        type: String,
        default: "",
    },
    guardian_relationship: {
        type: String,
        default: "",
    },
    guardian_phoneNumber: {
        type: String,
        default: "",
    },
});
exports.studentModel = mongoose_1.model("student", studentSchema);
