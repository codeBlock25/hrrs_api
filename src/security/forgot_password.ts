import {
  badData,
  badRequest,
  internal,
  notAcceptable,
  notFound,
} from "@hapi/boom";
import { ResponseToolkit, Request } from "@hapi/hapi";
import Joi from "joi";
import { userModel } from "../auth";
import { mailTo } from "../function/mail";
import { ValidateUser } from "../middlewares";

export const requestForgotPasswordHandler = async (
  req: Request,
  h: ResponseToolkit
) => {
  try {
    const validateAuth = await ValidateUser(req);
    if (!validateAuth.isValid) {
      return notAcceptable(validateAuth.reason);
    }
    let user = await userModel.findById(validateAuth.credentials);
    if (!user) {
      return notFound("Student not found.");
    }
    mailTo({
      subject: "Forgot Password Request",
      mail: user.email,
      msg: `follow this link to reset your account password: <a href="https://dipromedics.com/forgot_password?registrationNumber=${user.registrationNumber}" target="_blank" rel="noopener noreferrer">https://dipromedics.com/forgot_password?registrationNumber=${user.registrationNumber}</a>`,
    });
    return h.response({ message: "request sent" });
  } catch (error) {
    return internal();
  }
};
