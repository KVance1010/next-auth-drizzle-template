"use server";

import { generateVerificationToken } from "@/db/queries/auth/verification-tokens";
import { getUserByEmail, getUserById, updateUser } from "@/db/queries/users";
import { sendVerificationEmail } from "@/email-templates/welcome-verification";
import { currentUser } from "@/utils/auth-session";
import { comparePassword, hashPassword } from "@/utils/password";
import { UpdateUserType, UpdateUserValidation } from "@/validations";

export const setting = async (values: UpdateUserType) => {
  const validatedFields = UpdateUserValidation.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const user = await currentUser();
  if (!user) {
    return {
      error: "You are not authorized to access this page."
    };
  }

  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    return {
      error: "User not found."
    };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.confirmPassword = undefined;
    values.password = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use" };
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Verification email sent" };
  }

  if (
    dbUser.password &&
    values.password &&
    values.newPassword &&
    values.confirmPassword
  ) {
    const passwordsMatch = await comparePassword(
      values.password,
      dbUser.password
    );
    if (!passwordsMatch) {
      return { error: "Incorrect password" };
    }
    if (values.newPassword !== values.confirmPassword) {
      return { error: "Passwords do not match" };
    }
    const hashedPassword = await hashPassword(values.newPassword);
    values.password = hashedPassword;
    values.newPassword = undefined;
    values.confirmPassword = undefined;
  }
  await updateUser(dbUser.id, { ...validatedFields.data });
  return { success: "Setting Updated" };
};
