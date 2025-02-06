import transporter from "@/utils/email-transporter";
import env from "@/validations/env";
import "server-only";

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const baseURL = env.AUTH_URL;
  const resetLink = `${baseURL}/new-password?token=${token}`;
  await transporter.sendMail({
    from: env.MAILER_EMAIL,
    to: email,
    subject: "Reset your password",
    text: `click here to reset your password ${resetLink}`,
    html: `<p> <a href=${resetLink}>click here </a> to reset your password</p>`
  });
};
