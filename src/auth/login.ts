import {
  badRequest,
  internal,
  notAcceptable,
  notFound,
  forbidden,
} from "@hapi/boom";
import { Request, ResponseToolkit, RouteOptionsValidate } from "@hapi/hapi";
import { compareSync } from "bcryptjs";
import Joi from "joi";
import { sign } from "jsonwebtoken";
import { userModel } from "./model";
import config from "../config";
import { generate } from "randomstring";
import { mailTo } from "../function/mail";

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
    if (!user.isVerified) {
      let code = generate({ length: 6, charset: "numeric" });
      await userModel.updateOne({ _id: user._id }, { verificationCode: code });
      mailTo({
        subject: "Verify your account",
        mail: user.email,
        msg: `Your verification code is <b>${code}</b>`,
      });
      return forbidden("User must verify their accounts.");
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
