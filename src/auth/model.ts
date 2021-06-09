import { Schema, Document, model } from "mongoose";

export enum Gender {
  male,
  female,
}

export interface UserType extends Document {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  gender: Gender;
  registrationNumber: string;
  phone_number: string;
  verificationCode: string;
  isVerified: boolean;
}

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    lowercase: true,
  },
  last_name: {
    type: String,
    required: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  verificationCode: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: Gender,
    required: true,
    default: Gender.male,
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  phone_number: {
    type: String,
    required: true,
    unique: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export const userModel = model<UserType>("user", userSchema);
