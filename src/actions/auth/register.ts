"use server";

import { generateVerificationToken } from "@/db/queries/auth/verification-tokens";
import { createUser } from "@/db/queries/users";
import { sendVerificationEmail } from "@/email-templates/welcome-verification";
import { hashPassword } from "@/utils/password";
import { RegistrationType, RegistrationValidation } from "@/validations/users";
import { NeonDbError } from "@neondatabase/serverless";

export const register = async (value: RegistrationType) => {
  try {
    const validatedFields = RegistrationValidation.safeParse(value);
    if (
      !validatedFields.success ||
      !validatedFields.data.email ||
      !validatedFields.data.password ||
      !validatedFields.data.username
    ) {
      return {
        error: true,
        message:
          validatedFields?.error?.issues[0]?.message ?? "an error occurred "
      };
    }

    const { email, password, username } = validatedFields.data;
    const hashedPassword = await hashPassword(password);

    const newUser = await createUser({
      email,
      password: hashedPassword,
      username
    });

    if (!newUser?.email || !newUser) {
      return {
        error: true,
        message: "An account is already registered with that email address."
      };
    }
    const verificationToken = await generateVerificationToken(newUser.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return {
      success: "Verification Email Sent. Please follow the link in your email."
    };
  } catch (e) {
    return {
      error: true,
      message:
        (e as NeonDbError)?.code === "23505"
          ? "An account is already registered with that email address."
          : "An error occurred please try again later."
    };
  }
};
