import { timestamp } from "drizzle-orm/pg-core";

export const timestamps = {
  updatedAt: timestamp("updated_at", { mode: "date" })
    .defaultNow()
    .$onUpdate(() => new Date()),
  createdAt: timestamp("create_at", { mode: "date" }).defaultNow().notNull()
};
