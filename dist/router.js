"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_1 = require("./auth");
var contact_1 = require("./contact/contact");
var reservations_1 = require("./reservations");
var security_1 = require("./security");
var user_1 = require("./user");
var authRoute = [
    {
        method: "POST",
        path: "/api/auth/register",
        handler: auth_1.userRegistrationHandler,
        options: {
            validate: auth_1.userRegistrationValidator,
        },
    },
    {
        method: "GET",
        path: "/api/auth/login",
        handler: auth_1.userLoginHandler,
        options: {
            validate: auth_1.userLoginValidator,
        },
    },
    {
        method: "PUT",
        path: "/api/auth/verify",
        handler: auth_1.userVerificationHandler,
        options: {
            validate: auth_1.userVerificationValidator,
        },
    },
];
var userRoute = [
    {
        method: "GET",
        path: "/api/student/me",
        handler: user_1.studentDetailsHandler,
    },
];
var contactRoute = [
    {
        method: "PUT",
        path: "/api/contact/message",
        handler: contact_1.contactRequestHandler,
        options: {
            validate: contact_1.contactRequestValidator,
        },
    },
];
var securityRoute = [
    {
        method: "PUT",
        path: "/api/security/change-email",
        handler: security_1.changeEmailHandler,
        options: {
            validate: security_1.changeEmailRequestValidator,
        },
    },
    {
        method: "PUT",
        path: "/api/security/change-password",
        handler: security_1.changePasswordHandler,
        options: {
            validate: security_1.changePasswordRequestValidator,
        },
    },
    {
        method: "GET",
        path: "/api/security/forgot-password",
        handler: security_1.requestForgotPasswordHandler,
    },
];
var reservationRoute = [
    {
        method: "POST",
        path: "/api/reservation/create",
        handler: reservations_1.createReservationsHandler,
        options: {
            validate: reservations_1.createReservationsRequestValidator,
        },
    },
    {
        method: "GET",
        path: "/api/reservation/mine",
        handler: reservations_1.getCurrentReservation,
    },
    {
        method: "GET",
        path: "/api/reservation/available",
        handler: reservations_1.getAvailableReservations,
        options: {
            validate: reservations_1.getAvailableRequestValidator,
        },
    },
    {
        method: "POST",
        path: "/api/reservation/reserve",
        handler: reservations_1.reservationRequestHandler,
        options: {
            validate: reservations_1.reservationRequestValidator,
        },
    },
];
var AppRoute = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([
    {
        method: "GET",
        path: "/api",
        handler: function (_req, h) {
            return h.response({ greeting: "Welcome to HRRS PORTAL API" });
        },
    }
], authRoute), userRoute), contactRoute), securityRoute), reservationRoute);
exports.default = AppRoute;
