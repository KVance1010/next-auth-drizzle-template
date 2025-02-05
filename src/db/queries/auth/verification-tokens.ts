import { eq } from "drizzle-orm";
import "server-only";
import { v4 as uuid } from "uuid";
import db from "@/db";
import { verificationTokens } from "@/db/schemas";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.query.verificationTokens.findFirst({
      where: eq(verificationTokens.email, email)
    });
    return verificationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.query.verificationTokens.findFirst({
      where: eq(verificationTokens.token, token)
    });
    return verificationToken;
  } catch {
    return null;
  }
};

export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await deleteVerificationToken(existingToken.id);
  }

  const [verificationToken] = await db
    .insert(verificationTokens)
    .values({
      email,
      token,
      expires
    })
    .returning();

  return verificationToken;
};

export const deleteVerificationToken = async (id: string) => {
  await db.delete(verificationTokens).where(eq(verificationTokens.id, id));
};
