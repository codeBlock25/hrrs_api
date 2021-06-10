import { badRequest, internal } from "@hapi/boom";
import { ResponseToolkit, Request, RouteOptionsValidate } from "@hapi/hapi";
import Joi from "joi";
import { filter, find } from "lodash";
import { BedSpaceType, ReservationModel } from "./model";

export const getAvailableRequestValidator: RouteOptionsValidate = {
  query: Joi.object({
    hostel_name: Joi.string().required(),
  }),
  failAction: (_r, _h, error) => {
    return badRequest(`Unsupported format, Error: ${error}`);
  },
};

export const getAvailableReservations = async (
  req: Request,
  h: ResponseToolkit
) => {
  try {
    const { hostel_name } = req.query as { hostel_name: string };
    const reservations = await ReservationModel.find({
      hostel_name,
      userID: { $exists: false },
    });
    let _reservations: {
      floor: string;
      rooms: { name: string; bed_space: BedSpaceType[] }[];
    }[] = [];
    reservations.map((reservation) => {
      let currentReservation = find(_reservations, {
        floor: reservation.floor,
      });
      if (!currentReservation) {
        _reservations.push({ floor: reservation.floor, rooms: [] });
        currentReservation = { floor: reservation.floor, rooms: [] };
      }
      let currentReservationByRoom = find(currentReservation.rooms, {
        name: reservation.room_name,
      });
      if (!currentReservationByRoom) {
        currentReservation.rooms.push({
          name: reservation.room_name,
          bed_space: [],
        });
        currentReservationByRoom = {
          name: reservation.room_name,
          bed_space: [],
        };
      }
      currentReservationByRoom.bed_space.push(reservation.bed_space);
    });
    return h.response({ reservations: _reservations });
  } catch (error) {
    console.log({ error });
    return internal(JSON.stringify(error));
  }
};
