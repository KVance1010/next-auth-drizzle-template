import env from "@/validations/env";
import nodemailer from "nodemailer";
import "server-only";

const transporter = nodemailer.createTransport({
   /*if the service is on the list of nodemailer services, use it instead of host, port, secure. If you specify a service (e.g., 'gmail', 'outlook', 'yahoo'), Nodemailer automatically configures the host and port for you. */
  service: env.MAILER_SERVICE,

  /*
  Alternatively use host, port, secure. 
  secure – if true the connection will use TLS when connecting to server. If false (the default) then TLS is used if server supports the STARTTLS extension. In most cases set this value to true if you are connecting to port 465. For port 587 or 25 keep it false
   */
  // host: env.MAILER_HOST,
  // port: env.MAILER_PORT,
  // secure: false,
  auth: {
    user: env.MAILER_EMAIL,
    pass: env.MAILER_PASSWORD
  }
});

export default transporter;
