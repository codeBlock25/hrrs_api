"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentDetailsHandler = void 0;
var boom_1 = require("@hapi/boom");
var auth_1 = require("../auth");
var middlewares_1 = require("../middlewares");
var reservations_1 = require("../reservations");
var model_1 = require("./model");
var studentDetailsHandler = function (req, h) { return __awaiter(void 0, void 0, void 0, function () {
    var auth, student, reservations, user, error_1;
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 5, , 6]);
                return [4, middlewares_1.ValidateUser(req)];
            case 1:
                auth = _e.sent();
                if (!auth.isValid) {
                    return [2, boom_1.badGateway("Failed Credential with Error: " + ((_a = auth.reason) !== null && _a !== void 0 ? _a : "JWT"))];
                }
                return [4, model_1.studentModel.findOne({
                        userID: (_b = auth.credentials) !== null && _b !== void 0 ? _b : "",
                    })];
            case 2:
                student = _e.sent();
                return [4, reservations_1.ReservationModel.find({
                        userID: (_c = auth.credentials) !== null && _c !== void 0 ? _c : "",
                    })];
            case 3:
                reservations = _e.sent();
                return [4, auth_1.userModel.findOne({ _id: (_d = auth.credentials) !== null && _d !== void 0 ? _d : "" })];
            case 4:
                user = _e.sent();
                if (!user || !student) {
                    return [2, boom_1.notFound("student not found")];
                }
                return [2, h.response({
                        details: {
                            first_name: user.first_name,
                            last_name: user.last_name,
                            email: user.email,
                            gender: user.gender,
                            registrationNumber: user.registrationNumber,
                            phone_number: user.phone_number,
                            isVerified: user.isVerified,
                            date: user.date,
                            dateOfBirth: student.dateOfBirth,
                            yearOfStudy: student.yearOfStudy,
                            department: student.department,
                            nationality: student.nationality,
                            state: student.state,
                            lga: student.lga,
                            address: student.address,
                            guardian_firstName: student.guardian_firstName,
                            guardian_lastName: student.guardian_lastName,
                            guardian_relationship: student.guardian_relationship,
                            guardian_phoneNumber: student.guardian_phoneNumber,
                            userID: student.userID,
                        },
                        reservations: reservations,
                    })];
            case 5:
                error_1 = _e.sent();
                return [2, boom_1.internal(JSON.stringify(error_1))];
            case 6: return [2];
        }
    });
}); };
exports.studentDetailsHandler = studentDetailsHandler;
