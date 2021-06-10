import { badRequest, internal } from "@hapi/boom";
import { ResponseToolkit, RouteOptionsValidate, Request } from "@hapi/hapi";
import Joi from "joi";
import { BedSpaceType, ReservationModel, ReservationType } from "./model";

export const createReservationsRequestValidator: RouteOptionsValidate = {
  payload: Joi.object({
    hostel_name: Joi.string().required(),
    floor: Joi.number().required(),
    room_name: Joi.string().required(),
    bed_space: Joi.number().min(0).max(3).required(),
  }),
  failAction: (_r, _h, error) => {
    return badRequest(JSON.stringify(error));
  },
};

export const createReservationsHandler = async (
  req: Request,
  h: ResponseToolkit
) => {
  try {
    const { hostel_name, floor, room_name, bed_space } =
      req.payload as ReservationType;
    await new ReservationModel({
      hostel_name,
      floor,
      room_name,
      bed_space,
    }).save();
    return h.response({ message: "done" });
  } catch (error) {
    console.log({ error });
    return internal(JSON.stringify(error));
  }
};
