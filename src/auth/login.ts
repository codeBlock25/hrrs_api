import { badRequest, internal, notAcceptable, notFound } from "@hapi/boom";
import { Request, ResponseToolkit, RouteOptionsValidate } from "@hapi/hapi";
import { compareSync } from "bcryptjs";
import Joi from "joi";
import { sign } from "jsonwebtoken";
import { userModel } from "./model";
import config from "../config";

export interface userLoginType {
  registrationNumber: string;
  password: string;
}

export const userLoginValidator: RouteOptionsValidate = {
  query: Joi.object({
    registrationNumber: Joi.string().required(),
    password: Joi.string().required(),
  }),
  failAction: (_r, _h, err) => {
    return badRequest(`Unsupported format, Error: ${err}`);
  },
};

export const userLoginHandler = async (req: Request, h: ResponseToolkit) => {
  try {
    const { registrationNumber, password } = req.query as userLoginType;
    let user = await userModel.findOne({
      registrationNumber: registrationNumber.trim(),
    });
    if (!user) {
      return notFound("Student account not found.");
    }
    let passwordConfirmed = compareSync(password, user.password);

    if (!passwordConfirmed) {
      return notAcceptable("incorrect password.");
    }
    let token = sign({ id: user._id }, config.secret, { expiresIn: "30 day" });
    return h.response({ token });
  } catch (error) {
    return internal(JSON.stringify(error));
  }
};
