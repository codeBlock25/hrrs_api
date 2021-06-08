"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var account_update_1 = __importStar(require("./admin/account_update"));
var check_1 = __importDefault(require("./admin/check"));
var login_1 = __importStar(require("./admin/login"));
var register_1 = __importStar(require("./admin/register"));
var auth_1 = require("./auth");
var deposit_1 = require("./deposit");
var withdraw_1 = require("./withdraw");
var user_1 = __importDefault(require("./user"));
var boom_1 = require("@hapi/boom");
var fetchUsers_1 = require("./user/fetchUsers");
var investment_1 = require("./investment");
var adminUserFetch_1 = require("./user/adminUserFetch");
var authRoute = [
    {
        method: "POST",
        path: "/api/auth/register",
        handler: auth_1.handleRegister,
        options: {
            validate: auth_1.validateRegistrationRequest,
        },
    },
    {
        method: "GET",
        path: "/api/auth/login",
        handler: auth_1.handleLogin,
        options: {
            validate: auth_1.validateUserLogin,
        },
    },
];
var investmentRoute = [
    {
        method: "GET",
        path: "/api/investment/all",
        handler: investment_1.fetchInvestmentsHandler,
    },
];
var depositRoute = [
    {
        method: "POST",
        path: "/api/deposit/create",
        handler: deposit_1.createDepositHandle,
        options: {
            validate: deposit_1.CreateDepositRequestValidator,
        },
    },
    {
        method: "PUT",
        path: "/api/deposit/approve",
        handler: deposit_1.approveDepositHandler,
        options: {
            validate: deposit_1.ApproveDepositRequestValidator,
        },
    },
    {
        method: "GET",
        path: "/api/deposit/all",
        handler: deposit_1.fetchDepositsHandler,
    },
    {
        method: "GET",
        path: "/api/deposit/user/all",
        handler: deposit_1.fetchUserDepositsHandler,
        options: {
            validate: deposit_1.fetchUserDepositsRequestValidator,
        },
    },
];
var withdrawalRoute = [
    {
        method: "POST",
        path: "/api/withdraw/create",
        handler: withdraw_1.createWithdrawHandler,
        options: {
            validate: withdraw_1.CreateWithdrawRequestValidator,
        },
    },
    {
        method: "PUT",
        path: "/api/withdraw/approve",
        handler: withdraw_1.approveWithdrawHandler,
        options: {
            validate: withdraw_1.ApproveWithdrawRequestValidator,
        },
    },
    {
        method: "GET",
        path: "/api/withdraw/all",
        handler: withdraw_1.fetchWithdrawsHandler,
    },
    {
        method: "GET",
        path: "/api/withdraw/user/all",
        handler: withdraw_1.fetchUserWithdrawalsHandler,
        options: {
            validate: withdraw_1.fetchUserWithdrawalsRequestValidator,
        },
    },
];
var adminRoute = [
    {
        method: "GET",
        path: "/api/admin/user-account/all",
        handler: fetchUsers_1.fetchUsersHandler,
    },
    {
        method: "GET",
        path: "/api/admin/user-account",
        handler: adminUserFetch_1.adminUserFetchHandler,
        options: {
            validate: adminUserFetch_1.adminUserFetchValidator,
        },
    },
];
var adminAccountRoute = [
    {
        method: "POST",
        path: "/api/admin/login",
        handler: login_1.default,
        options: {
            validate: login_1.adminLoginRequestValidator,
        },
    },
    {
        method: "POST",
        path: "/api/admin/register",
        handler: register_1.default,
        options: {
            validate: register_1.adminRegistrationRequestValidator,
        },
    },
    {
        method: "GET",
        path: "/api/admin/check",
        handler: check_1.default,
    },
    {
        method: "POST",
        path: "/api/admin/account_update",
        handler: account_update_1.default,
        options: {
            validate: account_update_1.adminAccountUpdateRequestValidator,
        },
    },
];
var accountRoute = [
    {
        method: "GET",
        path: "/api/account/user",
        handler: user_1.default,
    },
];
var AppRoute = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([
    {
        method: "GET",
        path: "/api",
        handler: function (_req, h) {
            return h.response({ greeting: "Welcome to Zenabis Investment API" });
        },
    },
    {
        method: "GET",
        path: "/recent",
        handler: function (_req, h) { return __awaiter(void 0, void 0, void 0, function () {
            var recentWithdraws, recentDeposits, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, withdraw_1.withdrawModel
                                .find({ isPaid: true })
                                .sort({ date: -1 })
                                .limit(6)];
                    case 1:
                        recentWithdraws = _a.sent();
                        return [4, deposit_1.depositModel
                                .find({ isPaid: true })
                                .sort({ date: -1 })
                                .limit(6)];
                    case 2:
                        recentDeposits = _a.sent();
                        return [2, h.response({
                                withdrawal: recentWithdraws,
                                deposits: recentDeposits,
                            })];
                    case 3:
                        error_1 = _a.sent();
                        return [2, boom_1.internal(JSON.stringify(error_1))];
                    case 4: return [2];
                }
            });
        }); },
    }
], authRoute), accountRoute), withdrawalRoute), adminAccountRoute), depositRoute), adminRoute), investmentRoute);
exports.default = AppRoute;
