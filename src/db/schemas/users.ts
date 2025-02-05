import { sql } from "drizzle-orm";
import {
  type AnyPgColumn,
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex
} from "drizzle-orm/pg-core";
import { timestamps } from "./timestamps";

export const UserRoles = pgEnum("role", ["USER", "ADMIN", "MODERATOR"]);

export function emailToLowercase(email: AnyPgColumn) {
  return sql`lower(${email})`;
}

export const users = pgTable(
  "users",
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text().unique(),
    username: text(),
    password: text(),
    emailVerified: timestamp("email_verified", { mode: "date" }),
    image: text(),
    role: UserRoles().default("USER").notNull(),
    isTwoFactorEnabled: boolean("is_two_factor_enabled").default(false),
    ...timestamps
  },
  (table) => [
    uniqueIndex("email_unique_index").on(emailToLowercase(table.email))
  ]
);
