import { model, Schema, Document } from "mongoose";
import { UserType } from "../auth";

export interface studentType extends Document {
  dateOfBirth: string;
  yearOfStudy: string;
  department: string;
  nationality: string;
  state: string;
  lga: string;
  address: string;
  guardian_firstName: string;
  guardian_lastName: string;
  guardian_relationship: string;
  guardian_phoneNumber: string;
  user: UserType;
  userID: string;
}

const studentSchema = new Schema({
  dateOfBirth: {
    type: Date,
  },
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: "user",
  },
  yearOfStudy: {
    type: String,
    default: "",
  },
  department: {
    type: String,
    default: "",
  },
  nationality: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  lga: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  guardian_firstName: {
    type: String,
    default: "",
  },
  guardian_lastName: {
    type: String,
    default: "",
  },
  guardian_relationship: {
    type: String,
    default: "",
  },
  guardian_phoneNumber: {
    type: String,
    default: "",
  },
});

export const studentModel = model<studentType>("student", studentSchema);
