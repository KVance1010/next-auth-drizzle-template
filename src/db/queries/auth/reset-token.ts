import { eq } from "drizzle-orm";
import "server-only";
import { v4 as uuidv4 } from "uuid";
import db from "@/db";
import { passwordResetTokens } from "@/db/schemas";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.query.passwordResetTokens.findFirst({
      where: eq(passwordResetTokens.token, token)
    });
    return passwordResetToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.query.passwordResetTokens.findFirst({
      where: eq(passwordResetTokens.email, email)
    });
    return passwordResetToken;
  } catch {
    return null;
  }
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await deletePasswordResetToken(existingToken.id);
  }

  const [passwordResetToken] = await db
    .insert(passwordResetTokens)
    .values({
      email,
      token,
      expires
    })
    .returning();

  return passwordResetToken;
};

export const deletePasswordResetToken = async (id: string) => {
  await db.delete(passwordResetTokens).where(eq(passwordResetTokens.id, id));
};
