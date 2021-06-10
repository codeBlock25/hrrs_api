import { ServerRoute, Request, ResponseToolkit } from "@hapi/hapi";
import {
  userLoginHandler,
  userLoginValidator,
  userRegistrationHandler,
  userRegistrationValidator,
  userVerificationHandler,
  userVerificationValidator,
} from "./auth";
import {
  contactRequestHandler,
  contactRequestValidator,
} from "./contact/contact";
import {
  createReservationsHandler,
  createReservationsRequestValidator,
  getAvailableRequestValidator,
  getAvailableReservations,
  getCurrentReservation,
  reservationRequestHandler,
  reservationRequestValidator,
} from "./reservations";
import {
  changeEmailHandler,
  changeEmailRequestValidator,
  changePasswordHandler,
  changePasswordRequestValidator,
  requestForgotPasswordHandler,
} from "./security";
import { studentDetailsHandler } from "./user";

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

const userRoute: ServerRoute[] = [
  {
    method: "GET",
    path: "/api/student/me",
    handler: studentDetailsHandler,
  },
];

const contactRoute: ServerRoute[] = [
  {
    method: "PUT",
    path: "/api/contact/message",
    handler: contactRequestHandler,
    options: {
      validate: contactRequestValidator,
    },
  },
];

const securityRoute: ServerRoute[] = [
  {
    method: "PUT",
    path: "/api/security/change-email",
    handler: changeEmailHandler,
    options: {
      validate: changeEmailRequestValidator,
    },
  },
  {
    method: "PUT",
    path: "/api/security/change-password",
    handler: changePasswordHandler,
    options: {
      validate: changePasswordRequestValidator,
    },
  },
  {
    method: "GET",
    path: "/api/security/forgot-password",
    handler: requestForgotPasswordHandler,
  },
];

const reservationRoute: ServerRoute[] = [
  {
    method: "POST",
    path: "/api/reservation/create",
    handler: createReservationsHandler,
    options: {
      validate: createReservationsRequestValidator,
    },
  },
  {
    method: "GET",
    path: "/api/reservation/mine",
    handler: getCurrentReservation,
  },
  {
    method: "GET",
    path: "/api/reservation/available",
    handler: getAvailableReservations,
    options: {
      validate: getAvailableRequestValidator,
    },
  },
  {
    method: "POST",
    path: "/api/reservation/reserve",
    handler: reservationRequestHandler,
    options: {
      validate: reservationRequestValidator,
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
  ...userRoute,
  ...contactRoute,
  ...securityRoute,
  ...reservationRoute,
];

export default AppRoute;
