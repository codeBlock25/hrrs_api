import { internal, notAcceptable, notFound } from "@hapi/boom";
import { ResponseToolkit, Request } from "@hapi/hapi";
import { ValidateUser } from "../middlewares";
import { userModel } from "../auth";
import { ReservationModel } from ".";

export const reservationRequestHandler = async (
  req: Request,
  h: ResponseToolkit
) => {
  try {
    const validateAuth = await ValidateUser(req);
    if (!validateAuth.isValid) {
      return notAcceptable(validateAuth.reason);
    }
    let user = await userModel.findById(validateAuth.credentials);
    if (!user) {
      return notFound("Student not found.");
    }
    let reservations = await ReservationModel.find({ userID: user._id });

    return h.response({
      reservations,
    });
  } catch (error) {
    return internal(JSON.stringify(error));
  }
};
