import { Schema, Document, model } from "mongoose";
import { UserType } from "../user";

export enum BedSpaceType {
  secA,
  secB,
  secC,
  secD,
}
export interface ReservationType extends Document {
  hotel_name: string;
  floor: number;
  room_name: string;
  bed_space: BedSpaceType;
  user: UserType;
  userID: string;
  date: Date;
}

const reservationSchema = new Schema({
  hostel_name: {
    type: String,
    required: true,
  },
  floor: {
    type: Number,
    required: true,
  },
  room_name: {
    type: String,
    required: true,
  },
  bed_space: {
    type: BedSpaceType,
    required: true,
  },
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  date: {
    type: Date,
    default: new Date(),
    required: true,
  },
});

export const ReservationModel = model<ReservationType>(
  "reservation",
  reservationSchema
);
