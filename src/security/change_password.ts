import {
  badData,
  badRequest,
  internal,
  notAcceptable,
  notFound,
} from "@hapi/boom";
import { ResponseToolkit, Request, RouteOptionsValidate } from "@hapi/hapi";
import { compareSync, genSaltSync, hash, hashSync } from "bcryptjs";
import Joi from "joi";
import { userModel } from "../auth";
import { ValidateUser } from "../middlewares";

export interface changePasswordRequestType {
  old_password: string;
  new_password: string;
}

export const changePasswordRequestValidator: RouteOptionsValidate = {
  payload: Joi.object({
    old_password: Joi.string().required(),
    new_password: Joi.string().required(),
  }),
  failAction: (_r, _h, err) => {
    return badRequest(`Unsupported format, Error: ${err}`);
  },
};

export const changePasswordHandler = async (
  req: Request,
  h: ResponseToolkit
) => {
  try {
    const { old_password, new_password } =
      req.payload as changePasswordRequestType;

    const validateAuth = await ValidateUser(req);
    if (!validateAuth.isValid) {
      return notAcceptable(validateAuth.reason);
    }
    let user = await userModel.findById(validateAuth.credentials);
    if (!user) {
      return notFound("Student not found.");
    }
    let confirmedPassword = compareSync(old_password, user.password);
    if (!confirmedPassword) {
      return badData("Incorrect password");
    }
    let password = hashSync(new_password, genSaltSync(5));
    await userModel.updateOne({ _id: user._id }, { password });
    return h.response({ message: "successful" });
  } catch (error) {
    return internal();
  }
};
