import { Table, getTableName, sql } from "drizzle-orm";
import type { DB } from "@/db";
import db from "@/db";
import * as schema from "@/db/schemas";
import * as seeds from "@/db/seeds";

async function resetTable(db: DB, table: Table) {
  return db.execute(sql.raw(`TRUNCATE TABLE ${getTableName(table)} CASCADE;`));
}

async function seedDatabase() {
  try {
    // First drop all tables
    for (const table of [
      // TODO: create more seed data and add here
      schema.users
    ]) {
      await resetTable(db, table);
    }

    // TODO: add seeds data into database
    // eslint-disable-next-line no-console
    console.log("Seeding Started");
    await seeds.users(db);
    // eslint-disable-next-line no-console
    console.log("Users Seed Completed");
  } catch (error) {
    console.error("Error during seeding:", error);
    throw error;
  }
}

seedDatabase()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("Seeding complete");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    // eslint-disable-next-line no-console
    console.log("closing db connection");
    process.exit(0);
  });
