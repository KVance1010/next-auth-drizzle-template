import nodemailer from "nodemailer";
import "server-only";
import env from "@/validations/env";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.MAILER_EMAIL,
    pass: env.MAILER_PASSWORD
  }
});

export default transporter;
