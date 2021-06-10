import {
  badData,
  badRequest,
  conflict,
  internal,
  notAcceptable,
  notFound,
} from "@hapi/boom";
import { ResponseToolkit, Request, RouteOptionsValidate } from "@hapi/hapi";
import Joi from "joi";
import { userModel } from "../auth";
import { ValidateUser } from "../middlewares";

export interface changeEmailRequestType {
  old_email: string;
  new_email: string;
}

export const changeEmailRequestValidator: RouteOptionsValidate = {
  payload: Joi.object({
    old_email: Joi.string().required(),
    new_email: Joi.string().required(),
  }),
  failAction: (_r, _h, err) => {
    return badRequest(`Unsupported format, Error: ${err}`);
  },
};

export const changeEmailHandler = async (req: Request, h: ResponseToolkit) => {
  try {
    const { old_email, new_email } = req.payload as changeEmailRequestType;

    const validateAuth = await ValidateUser(req);
    if (!validateAuth.isValid) {
      return notAcceptable(validateAuth.reason);
    }
    let user = await userModel.findById(validateAuth.credentials);
    if (!user) {
      return notFound("Student not found.");
    }
    let confirmedEmail = old_email.trim() === user.email;
    if (!confirmedEmail) {
      return badData("Incorrect email");
    }
    await userModel.updateOne({ _id: user._id }, { email: new_email });
    return h.response({ message: "successful" });
  } catch (error: any) {
    if (error?.keyPattern?.email) {
      return conflict("This email is already tired to another account.");
    }
    return internal(JSON.stringify(error));
  }
};
