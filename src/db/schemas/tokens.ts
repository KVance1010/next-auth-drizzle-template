import {
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid
} from "drizzle-orm/pg-core";
import { users } from "@/db/schemas";

export const verificationTokens = pgTable(
  "verificationTokens",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull()
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.email, verificationToken.token]
      })
    }
  ]
);

export const passwordResetTokens = pgTable("passwordResetTokens", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull(),
  token: text("token").notNull().unique(),
  expires: timestamp("expires", { mode: "date" }).notNull()
});

export const twoFactorTokens = pgTable("twoFactorTokens", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull(),
  token: text("token").notNull().unique(),
  expires: timestamp("expires", { mode: "date" }).notNull()
});

export const twoFactorConfirmations = pgTable("twoFactorConfirmations", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
});
