import { ServerRoute, Request, ResponseToolkit } from "@hapi/hapi";
import {
  userLoginHandler,
  userLoginValidator,
  userRegistrationHandler,
  userRegistrationValidator,
  userVerificationHandler,
  userVerificationValidator,
} from "./auth";

const authRoute: ServerRoute[] = [
  {
    method: "POST",
    path: "/api/auth/register",
    handler: userRegistrationHandler,
    options: {
      validate: userRegistrationValidator,
    },
  },
  {
    method: "GET",
    path: "/api/auth/login",
    handler: userLoginHandler,
    options: {
      validate: userLoginValidator,
    },
  },
  {
    method: "PUT",
    path: "/api/auth/verify",
    handler: userVerificationHandler,
    options: {
      validate: userVerificationValidator,
    },
  },
];

const AppRoute: ServerRoute[] = [
  {
    method: "GET",
    path: "/api",
    handler: (_req: Request, h: ResponseToolkit) => {
      return h.response({ greeting: "Welcome to HRRS PORTAL API" });
    },
  },
  ...authRoute,
];

export default AppRoute;
