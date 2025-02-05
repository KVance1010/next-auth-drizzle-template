import "server-only";
import transporter from "@/utils/email-transporter";
import env from "@/validations/env";

export const sendVerificationEmail = async (email: string, token: string) => {
  const baseURL = env.AUTH_URL;
  const confirmationLink = `${baseURL}/verification?token=${token}`;
  await transporter.sendMail({
    from: env.MAILER_EMAIL,
    to: email,
    subject: "Confirm your email",
    text: `Please confirm your email to login. ${confirmationLink}`,
    html: `<p>Please confirm your email to login. <a href=${confirmationLink}> click here </a> to confirm </P>`
  });
};
