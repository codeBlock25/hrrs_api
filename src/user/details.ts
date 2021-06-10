import { internal, badGateway, notFound } from "@hapi/boom";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { userModel } from "../auth";
import { ValidateUser } from "../middlewares";
import { ReservationModel } from "../reservations";
import { studentModel } from "./model";

export const studentDetailsHandler = async (
  req: Request,
  h: ResponseToolkit
) => {
  try {
    let auth = await ValidateUser(req);
    if (!auth.isValid) {
      return badGateway(
        `Failed Credential with Error: ${auth.reason ?? "JWT"}`
      );
    }
    let student = await studentModel.findOne({
      userID: auth.credentials ?? "",
    });
    let reservations = await ReservationModel.find({
      userID: auth.credentials ?? "",
    });

    let user = await userModel.findOne({ _id: auth.credentials ?? "" });
    if (!user || !student) {
      return notFound("student not found");
    }
    return h.response({
      details: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        gender: user.gender,
        registrationNumber: user.registrationNumber,
        phone_number: user.phone_number,
        isVerified: user.isVerified,
        date: user.date,
        dateOfBirth: student.dateOfBirth,
        yearOfStudy: student.yearOfStudy,
        department: student.department,
        nationality: student.nationality,
        state: student.state,
        lga: student.lga,
        address: student.address,
        guardian_firstName: student.guardian_firstName,
        guardian_lastName: student.guardian_lastName,
        guardian_relationship: student.guardian_relationship,
        guardian_phoneNumber: student.guardian_phoneNumber,
        userID: student.userID,
      },
      reservations,
    });
  } catch (error) {
    return internal(JSON.stringify(error));
  }
};
