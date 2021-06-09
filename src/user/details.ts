import { internal, notAcceptable, badGateway, notFound } from "@hapi/boom";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { ValidateUser } from "../middlewares";
import { studentModel } from "./model";

const userDetailsHandler = async (req: Request, h: ResponseToolkit) => {
  try {
    let auth = await ValidateUser(req);
    if (!auth.isValid) {
      return badGateway(
        `Failed Credential with Error: ${auth.reason ?? "JWT"}`
      );
    }
    let userDetails = await studentModel
      .findOne({ userID: auth.credentials ?? "" })
      .populate("user");
    if (!userDetails) {
      return notFound("student not found");
    }
    return h.response({ details: userDetails });
  } catch (error) {
    return internal(JSON.stringify(error));
  }
};
