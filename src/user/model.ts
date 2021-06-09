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
  },
  yearOfStudy: {
    type: String,
    default: "",
    required: true,
  },
  department: {
    type: String,
    default: "",
    required: true,
  },
  nationality: {
    type: String,
    default: "",
    required: true,
  },
  state: {
    type: String,
    default: "",
    required: true,
  },
  lga: {
    type: String,
    default: "",
    required: true,
  },
  address: {
    type: String,
    default: "",
    required: true,
  },
  guardian_firstName: {
    type: String,
    default: "",
    required: true,
  },
  guardian_lastName: {
    type: String,
    default: "",
    required: true,
  },
  guardian_relationship: {
    type: String,
    default: "",
    required: true,
  },
  guardian_phoneNumber: {
    type: String,
    default: "",
    required: true,
  },
});

export const studentModel = model<studentType>("student", studentSchema);
