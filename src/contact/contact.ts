import { badRequest, internal, notAcceptable, notFound } from "@hapi/boom";
import { Request, ResponseToolkit, RouteOptionsValidate } from "@hapi/hapi";
import Joi from "joi";
import { mailTo } from "../function/mail";
import { ValidateUser } from "../middlewares";
import { userModel } from "../user";

export interface contactRequestType {
  first_name: string;
  last_name: string;
  subject: string;
  message: string;
}

export const contactRequestValidator: RouteOptionsValidate = {
  payload: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    subject: Joi.string().required(),
    message: Joi.string().required(),
  }),
  failAction: (_r, _h, error) => {
    return badRequest(JSON.stringify(error));
  },
};

export const contactRequestHandler = async (
  req: Request,
  h: ResponseToolkit
) => {
  try {
    const { first_name, last_name, subject, message } =
      req.payload as contactRequestType;

    const validateAuth = await ValidateUser(req);
    if (!validateAuth.isValid) {
      return notAcceptable(validateAuth.reason);
    }
    let user = await userModel.findById(validateAuth.credentials);
    if (!user) {
      return notFound("Student not found.");
    }
    mailTo({
      subject,
      mail: "admin@dipromedic.com",
      msg: `New message<br><br>First Name: ${first_name},<br>Last Name: ${last_name}<br>Registration Number ${user.registrationNumber}<br>Message: ${message}`,
    });
    return h.response({ message: "sent" });
  } catch (error) {
    return internal(JSON.stringify(error));
  }
};
