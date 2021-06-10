import { badRequest, internal, notAcceptable, notFound } from "@hapi/boom";
import { ResponseToolkit, RouteOptionsValidate, Request } from "@hapi/hapi";
import Joi from "joi";
import { mailTo } from "../function/mail";
import { ValidateUser } from "../middlewares";
import { userModel } from "../auth";
import { ReservationModel, ReservationType } from "./";

export const reservationRequestValidator: RouteOptionsValidate = {
  payload: Joi.object({
    hostel_name: Joi.string().required(),
    floor: Joi.string().required(),
    room_name: Joi.string().required(),
    bed_space: Joi.number().min(0).max(3).required(),
  }),
  failAction: (_r, _h, err) => {
    return badRequest(`Unsupported format, Error: ${err}`);
  },
};

export const reservationRequestHandler = async (
  req: Request,
  h: ResponseToolkit
) => {
  try {
    const { hostel_name, floor, room_name, bed_space } =
      req.payload as ReservationType;

    const validateAuth = await ValidateUser(req);
    if (!validateAuth.isValid) {
      return notAcceptable(validateAuth.reason);
    }
    let user = await userModel.findById(validateAuth.credentials);
    if (!user) {
      return notFound("Student not found.");
    }
    let reservation = await ReservationModel.updateOne(
      {
        hostel_name,
        floor,
        room_name,
        bed_space,
      },
      {
        userID: user._id,
      }
    );
    mailTo({
      subject: "Reservation successful",
      mail: user.email,
      msg: `you have reserved a spot at room ${room_name} at ${hostel_name} hotel`,
    });
    return h.response({
      reservation,
      message: "Reservation successful",
    });
  } catch (error) {
    return internal(JSON.stringify(error));
  }
};
