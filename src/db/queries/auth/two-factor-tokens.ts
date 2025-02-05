import crypto from "crypto";
import { eq } from "drizzle-orm";
import "server-only";
import "server-only";
import db from "@/db";
import { twoFactorConfirmations, twoFactorTokens } from "@/db/schemas";

export const generateTwoFactorToken = async (email: string) => {
  try {
    const token = crypto.randomInt(100_000, 1_000_000).toString();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getTwoFactorTokenByEmail(email);

    if (existingToken) {
      await db
        .delete(twoFactorTokens)
        .where(eq(twoFactorTokens.id, existingToken.id));
    }

    const [twoFactorToken] = await db
      .insert(twoFactorTokens)
      .values({
        email,
        token,
        expires
      })
      .returning();

    return twoFactorToken;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getTwoFactorConfirmationById = async (userId: string) => {
  try {
    const twoFactorConfirmation =
      await db.query.twoFactorConfirmations.findFirst({
        where: eq(twoFactorConfirmations.userId, userId)
      });
    return twoFactorConfirmation;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await db.query.twoFactorTokens.findFirst({
      where: eq(twoFactorTokens.token, token)
    });
    return twoFactorToken;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.query.twoFactorTokens.findFirst({
      where: eq(twoFactorTokens.email, email)
    });
    return twoFactorToken;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const createTwoFactorConfirmation = async (userId: string) => {
  try {
    db.insert(twoFactorConfirmations).values({ userId });
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const deleteTwoFactorToken = async (id: string) => {
  try {
    await db.delete(twoFactorTokens).where(eq(twoFactorTokens.id, id));
  } catch (e) {
    console.error(e);
    return null;
  }
};
