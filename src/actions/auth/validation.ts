"use server";

import { NeonDbError } from "@neondatabase/serverless";
import {
  deleteVerificationToken,
  getVerificationTokenByToken
} from "@/db/queries/auth/verification-tokens";
import { getUserByEmail, updateUserEmailVerified } from "@/db/queries/users";

export const verifyToken = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) return { error: true, message: "Token not found" };
  const hasExpired = new Date() > new Date(existingToken.expires);
  if (hasExpired) return { error: true, message: "Token has expired" };
  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return { error: true, message: "Email not found" };
  try {
    const [userUpdated] = await Promise.all([
      updateUserEmailVerified(existingToken.email),
      deleteVerificationToken(existingToken.id)
    ]);

    if (!userUpdated) {
      return { error: true, message: "Failed to validate email" };
    }
    return { success: "Email verified" };
  } catch (e) {
    return {
      error: true,
      message: (e as NeonDbError).message || "An error occurred"
    };
  }
};
