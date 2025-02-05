import { eq } from "drizzle-orm";
import "server-only";
import { v4 as uuid } from "uuid";
import db from "@/db";
import { sessions } from "@/db/schemas";

export const createSession = async (userId: string) => {
  try {
    const sessionToken = uuid();
    const expires = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000);
    const [session] = await db
      .insert(sessions)
      .values({
        userId,
        sessionToken,
        expires
      })
      .returning();

    return session;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const removeSession = async (userId: string) => {
  try {
    await db.delete(sessions).where(eq(sessions.userId, userId));
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
