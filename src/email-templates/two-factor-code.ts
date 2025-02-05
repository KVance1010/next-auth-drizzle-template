import "server-only";
import transporter from "@/utils/email-transporter";
import env from "@/validations/env";

export const sendTwoFactorAuth = async (email: string, token: string) => {
  await transporter.sendMail({
    from: env.MAILER_EMAIL,
    to: email,
    subject: "Confirm your email",
    text: `Your two factor authentication code is: ${token}`,
    html: `<p>Your two factor authentication code is: ${token}</P>`
  });
};
