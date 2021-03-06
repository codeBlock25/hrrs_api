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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userVerificationHandler = exports.userVerificationValidator = void 0;
var boom_1 = require("@hapi/boom");
var joi_1 = __importDefault(require("joi"));
var jsonwebtoken_1 = require("jsonwebtoken");
var config_1 = __importDefault(require("../config"));
var model_1 = require("../user/model");
var model_2 = require("./model");
exports.userVerificationValidator = {
    payload: joi_1.default.object({
        registrationNumber: joi_1.default.string().required(),
        verificationCode: joi_1.default.string().required(),
    }),
    failAction: function (_r, _h, err) {
        return boom_1.badRequest("Unsupported format, Error " + err);
    },
};
var userVerificationHandler = function (req, h) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, registrationNumber, verificationCode, user, token, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.payload, registrationNumber = _a.registrationNumber, verificationCode = _a.verificationCode;
                return [4, model_2.userModel.findOne({
                        verificationCode: verificationCode.trim(),
                        registrationNumber: registrationNumber,
                    })];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2, boom_1.notFound("Student account not found.")];
                }
                return [4, model_2.userModel.updateOne({
                        registrationNumber: registrationNumber,
                    }, { isVerified: true })];
            case 2:
                _b.sent();
                return [4, new model_1.studentModel({ userID: user._id }).save()];
            case 3:
                _b.sent();
                token = jsonwebtoken_1.sign({ id: user._id }, config_1.default.secret, { expiresIn: "30 day" });
                return [2, h.response({
                        token: token,
                        message: user.isVerified
                            ? "Your account is already verified, you can proceed to use."
                            : "Your has been created successfully!.",
                    })];
            case 4:
                error_1 = _b.sent();
                console.log(error_1);
                return [2, boom_1.internal(JSON.stringify(error_1))];
            case 5: return [2];
        }
    });
}); };
exports.userVerificationHandler = userVerificationHandler;
