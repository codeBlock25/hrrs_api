import { Schema, Document, model } from "mongoose";

export enum BedSpaceType {
  secA,
  secB,
  secC,
  secD,
}
export interface ReservationType extends Document {
  hostel_name: string;
  floor: string;
  room_name: string;
  bed_space: BedSpaceType;
  userID: string;
  date: Date;
}

const reservationSchema = new Schema({
  hostel_name: {
    type: String,
    required: true,
  },
  floor: {
    type: String,
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
