import { badRequest, internal } from "@hapi/boom";
import { ResponseToolkit, RouteOptionsValidate, Request } from "@hapi/hapi";
import Joi from "joi";
import { userModel, UserType } from "./model";
import { generate } from "randomstring";
import { mailTo } from "../function/mail";
import { genSaltSync, hashSync } from "bcryptjs";

export const userRegistrationValidator: RouteOptionsValidate = {
  payload: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    gender: Joi.number().min(0).max(1).required(),
    registrationNumber: Joi.string().required(),
    phone_number: Joi.string().required(),
  }),
  failAction: (_r, _h, err) => {
    return badRequest(`Unsupported format, Error: ${err}`);
  },
};

export const userRegistrationHandler = async (
  req: Request,
  h: ResponseToolkit
) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      gender,
      registrationNumber,
      phone_number,
    } = req.payload as UserType;
    let code = generate({ length: 6, charset: "numeric" });
    let hashedPassword = hashSync(password, genSaltSync(4));
    await new userModel({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      gender,
      registrationNumber,
      phone_number,
      verificationCode: code,
    }).save();
    mailTo({
      subject: "Verify your account",
      mail: email,
      msg: `Your verification code is <b>${code}</b>`,
    });
    return h.response({
      message:
        "verification code has been sent successfully and account created.",
    });
  } catch (error) {
    return internal(JSON.stringify(error));
  }
};
