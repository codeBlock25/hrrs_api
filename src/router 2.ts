import { ServerRoute, Request, ResponseToolkit } from "@hapi/hapi";
import adminAccountUpdateHandler, {
  adminAccountUpdateRequestValidator,
} from "./admin/account_update";
import adminCheckHandler from "./admin/check";
import adminLoginHandler, { adminLoginRequestValidator } from "./admin/login";
import adminRegistrationHandler, {
  adminRegistrationRequestValidator,
} from "./admin/register";
import {
  handleLogin,
  validateUserLogin,
  handleRegister,
  validateRegistrationRequest,
} from "./auth";
import {
  approveDepositHandler,
  CreateDepositRequestValidator,
  ApproveDepositRequestValidator,
  fetchDepositsHandler,
  createDepositHandle,
  fetchUserDepositsRequestValidator,
  depositModel,
  fetchUserDepositsHandler,
} from "./deposit";
import {
  approveWithdrawHandler,
  ApproveWithdrawRequestValidator,
  createWithdrawHandler,
  CreateWithdrawRequestValidator,
  fetchUserWithdrawalsHandler,
  fetchUserWithdrawalsRequestValidator,
  fetchWithdrawsHandler,
  withdrawModel,
} from "./withdraw";
import getUser from "./user";
import { internal } from "@hapi/boom";
import { fetchUsersHandler } from "./user/fetchUsers";
import { fetchInvestmentsHandler } from "./investment";
import {
  adminUserFetchHandler,
  adminUserFetchValidator,
} from "./user/adminUserFetch";

const authRoute: ServerRoute[] = [
  {
    method: "POST",
    path: "/api/auth/register",
    handler: handleRegister,
    options: {
      validate: validateRegistrationRequest,
    },
  },
  {
    method: "GET",
    path: "/api/auth/login",
    handler: handleLogin,
    options: {
      validate: validateUserLogin,
    },
  },
];

const investmentRoute: ServerRoute[] = [
  {
    method: "GET",
    path: "/api/investment/all",
    handler: fetchInvestmentsHandler,
  },
];

const depositRoute: ServerRoute[] = [
  {
    method: "POST",
    path: "/api/deposit/create",
    handler: createDepositHandle,
    options: {
      validate: CreateDepositRequestValidator,
    },
  },

  {
    method: "PUT",
    path: "/api/deposit/approve",
    handler: approveDepositHandler,
    options: {
      validate: ApproveDepositRequestValidator,
    },
  },

  {
    method: "GET",
    path: "/api/deposit/all",
    handler: fetchDepositsHandler,
  },
  {
    method: "GET",
    path: "/api/deposit/user/all",
    handler: fetchUserDepositsHandler,
    options: {
      validate: fetchUserDepositsRequestValidator,
    },
  },
];

const withdrawalRoute: ServerRoute[] = [
  {
    method: "POST",
    path: "/api/withdraw/create",
    handler: createWithdrawHandler,
    options: {
      validate: CreateWithdrawRequestValidator,
    },
  },

  {
    method: "PUT",
    path: "/api/withdraw/approve",
    handler: approveWithdrawHandler,
    options: {
      validate: ApproveWithdrawRequestValidator,
    },
  },

  {
    method: "GET",
    path: "/api/withdraw/all",
    handler: fetchWithdrawsHandler,
  },
  {
    method: "GET",
    path: "/api/withdraw/user/all",
    handler: fetchUserWithdrawalsHandler,
    options: {
      validate: fetchUserWithdrawalsRequestValidator,
    },
  },
];

const adminRoute: ServerRoute[] = [
  {
    method: "GET",
    path: "/api/admin/user-account/all",
    handler: fetchUsersHandler,
  },
  {
    method: "GET",
    path: "/api/admin/user-account",
    handler: adminUserFetchHandler,
    options: {
      validate: adminUserFetchValidator,
    },
  },
];

const adminAccountRoute: ServerRoute[] = [
  {
    method: "POST",
    path: "/api/admin/login",
    handler: adminLoginHandler,
    options: {
      validate: adminLoginRequestValidator,
    },
  },

  {
    method: "POST",
    path: "/api/admin/register",
    handler: adminRegistrationHandler,
    options: {
      validate: adminRegistrationRequestValidator,
    },
  },
  {
    method: "GET",
    path: "/api/admin/check",
    handler: adminCheckHandler,
  },
  {
    method: "POST",
    path: "/api/admin/account_update",
    handler: adminAccountUpdateHandler,
    options: {
      validate: adminAccountUpdateRequestValidator,
    },
  },
];

const accountRoute: ServerRoute[] = [
  {
    method: "GET",
    path: "/api/account/user",
    handler: getUser,
  },
];

const AppRoute: ServerRoute[] = [
  {
    method: "GET",
    path: "/api",
    handler: (_req: Request, h: ResponseToolkit) => {
      return h.response({ greeting: "Welcome to Zenabis Investment API" });
    },
  },
  {
    method: "GET",
    path: "/recent",
    handler: async (_req: Request, h: ResponseToolkit) => {
      try {
        let recentWithdraws = await withdrawModel
          .find({ isPaid: true })
          .sort({ date: -1 })
          .limit(6);
        let recentDeposits = await depositModel
          .find({ isPaid: true })
          .sort({ date: -1 })
          .limit(6);
        return h.response({
          withdrawal: recentWithdraws,
          deposits: recentDeposits,
        });
      } catch (error) {
        return internal(JSON.stringify(error));
      }
    },
  },
  ...authRoute,
  ...accountRoute,
  ...withdrawalRoute,
  ...adminAccountRoute,
  ...depositRoute,
  ...adminRoute,
  ...investmentRoute,
];

export default AppRoute;
