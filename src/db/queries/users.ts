import { eq } from "drizzle-orm";
import "server-only";
import db from "@/db";
import { accounts, users } from "@/db/schemas";
import { emailToLowercase } from "@/db/schemas/users";

export const getUserByEmail = async (
  email: string
): Promise<typeof users.$inferSelect | null> => {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(emailToLowercase(users.email), email.toLowerCase()));
    return user;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id)
    });
    return user;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getAccountById = async (userId: string) => {
  try {
    const account = await db.query.accounts.findFirst({
      where: eq(accounts.userId, userId)
    });

    return account;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const createUser = async ({
  email,
  password,
  username
}: {
  email: string;
  password: string;
  username: string;
}) => {
  try {
    const [user] = await db
      .insert(users)
      .values({ email, password, username })
      .returning();
    return user;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const linkAccountToUser = async (userId: string) => {
  try {
    const date = new Date();
    const [linked] = await db
      .update(users)
      .set({ emailVerified: date })
      .where(eq(users.id, userId))
      .returning();
    return linked;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const updateUserEmailVerified = async (email: string) => {
  try {
    const date = new Date();
    const updated = await db
      .update(users)
      .set({ emailVerified: date })
      .where(eq(users.email, email));
    return updated;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const updateUserPassword = async (id: string, password: string) => {
  try {
    const updated = await db
      .update(users)
      .set({ password })
      .where(eq(users.id, id));
    return updated;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const updateUser = async (
  id: string,
  values: Partial<typeof users.$inferSelect>
) => {
  try {
    const updated = await db.update(users).set(values).where(eq(users.id, id));
    return updated;
  } catch (e) {
    console.error(e);
    return null;
  }
};
