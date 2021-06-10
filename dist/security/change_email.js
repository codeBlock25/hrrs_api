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
exports.changeEmailHandler = exports.changeEmailRequestValidator = void 0;
var boom_1 = require("@hapi/boom");
var joi_1 = __importDefault(require("joi"));
var auth_1 = require("../auth");
var middlewares_1 = require("../middlewares");
exports.changeEmailRequestValidator = {
    payload: joi_1.default.object({
        old_email: joi_1.default.string().required(),
        new_email: joi_1.default.string().required(),
    }),
    failAction: function (_r, _h, err) {
        return boom_1.badRequest("Unsupported format, Error: " + err);
    },
};
var changeEmailHandler = function (req, h) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, old_email, new_email, validateAuth, user, confirmedEmail, error_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 4, , 5]);
                _a = req.payload, old_email = _a.old_email, new_email = _a.new_email;
                return [4, middlewares_1.ValidateUser(req)];
            case 1:
                validateAuth = _c.sent();
                if (!validateAuth.isValid) {
                    return [2, boom_1.notAcceptable(validateAuth.reason)];
                }
                return [4, auth_1.userModel.findById(validateAuth.credentials)];
            case 2:
                user = _c.sent();
                if (!user) {
                    return [2, boom_1.notFound("Student not found.")];
                }
                confirmedEmail = old_email.trim() === user.email;
                if (!confirmedEmail) {
                    return [2, boom_1.badData("Incorrect email")];
                }
                return [4, auth_1.userModel.updateOne({ _id: user._id }, { email: new_email })];
            case 3:
                _c.sent();
                return [2, h.response({ message: "successful" })];
            case 4:
                error_1 = _c.sent();
                if ((_b = error_1 === null || error_1 === void 0 ? void 0 : error_1.keyPattern) === null || _b === void 0 ? void 0 : _b.email) {
                    return [2, boom_1.conflict("This email is already tired to another account.")];
                }
                return [2, boom_1.internal(JSON.stringify(error_1))];
            case 5: return [2];
        }
    });
}); };
exports.changeEmailHandler = changeEmailHandler;