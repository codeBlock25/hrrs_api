import { badRequest, internal, notFound } from "@hapi/boom";
import { ResponseToolkit, RouteOptionsValidate, Request } from "@hapi/hapi";
import Joi from "joi";
import { sign } from "jsonwebtoken";
import config from "../config";
import { userModel } from "./model";

export interface userVerificationRequestType {
  registrationNumber: string;
  verificationCode: string;
}

export const userVerificationValidator: RouteOptionsValidate = {
  payload: Joi.object({
    registrationNumber: Joi.string().required(),
    verificationCode: Joi.string().required(),
  }),
  failAction: (_r, _h, err) => {
    return badRequest(`Unsupported format, Error ${err}`);
  },
};

export const userVerificationHandler = async (
  req: Request,
  h: ResponseToolkit
) => {
  try {
    const { registrationNumber, verificationCode } =
      req.payload as userVerificationRequestType;
    let user = await userModel.findOne({
      verificationCode: verificationCode.trim(),
      registrationNumber: registrationNumber,
    });

    if (!user) {
      return notFound("Student account not found.");
    }
    await userModel.updateOne(
      {
        registrationNumber: registrationNumber,
      },
      { isVerified: true }
    );
    let token = sign({ id: user._id }, config.secret, { expiresIn: "30 day" });
    return h.response({
      token,
      message: user.isVerified
        ? "Your account is already verified, you can proceed to use."
        : "Your has been created successfully!.",
    });
  } catch (error) {
    return internal(JSON.stringify(error));
  }
};
