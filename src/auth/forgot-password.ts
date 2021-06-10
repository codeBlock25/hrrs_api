import { badRequest, internal } from "@hapi/boom";
import { ResponseToolkit, RouteOptionsValidate, Request } from "@hapi/hapi";
import { genSaltSync, hashSync } from "bcryptjs";
import Joi from "joi";
import { generate } from "randomstring";
import { mailTo } from "../function/mail";
import { userModel } from "./model";

export const forgotPasswordRequestValidator: RouteOptionsValidate = {
  payload: Joi.object({
    email: Joi.string().email().required(),
  }),
  failAction: (_r, _h, err) => {
    return badRequest(`Unsupported format, Error: ${err}`);
  },
};

export const forgotPasswordHandler = async (
  req: Request,
  h: ResponseToolkit
) => {
  try {
    const { email } = req.payload as { email: string };
    let code = generate({ length: 9 });
    let password = hashSync(code, genSaltSync(4));
    await userModel.updateOne({ email }, { password });

    mailTo({
      subject: "Account recovery",
      mail: email,
      msg: `Your new password is <b>${code}</b>`,
    });
    return h.response({ message: "account recovery was successful." });
  } catch (error) {
    return internal(JSON.stringify(error));
  }
};
