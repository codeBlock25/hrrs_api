import { Request } from "@hapi/hapi";
import { verify } from "jsonwebtoken";
import config from "../config";

export const ValidateUser = async (
  request: Request
): Promise<{ credentials: string | null; isValid: boolean; reason: any }> => {
  try {
    let auth: string = request.headers.authorization as string;
    if (!auth) {
      return { credentials: null, isValid: false, reason: "invalid auth" };
    }
    let token = auth.replace("Bearer ", "");
    if (!token) {
      return { credentials: null, isValid: false, reason: "invalid token" };
    }
    let error = false;
    let dec: { id: string } = { id: "" };
    verify(token, config.secret, (err: any, decoded: unknown) => {
      dec = decoded as { id: string };
      if (err) {
        error = true;
      } else {
        error = false;
      }
    });
    if (error) {
      return { credentials: null, isValid: false, reason: "failed token" };
    } else {
      return { credentials: dec.id, isValid: true, reason: "all good" };
    }
  } catch (error) {
    return { credentials: null, isValid: false, reason: error };
  }
};
