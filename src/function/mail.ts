import nodemailer from "nodemailer";
import config from "../config";

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: config.appMail.address ?? "",
    pass: config.appMail.password ?? "",
  },
});

export const mailTo = async ({
  subject,
  mail,
  msg,
}: {
  subject: string;
  msg: string;
  mail: string | null;
}) => {
  return await transporter.sendMail({
    from: `NoReply <${config.appMail.address}>`,
    to: mail || "",
    subject,
    html: msg,
  });
};
