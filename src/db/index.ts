import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schemas from "@/db/schemas";
import env from "@/validations/env";

const sql = neon(env.DATABASE_URL!);

const db = drizzle(sql, {
  schema: schemas
  //  logger: true
});

export type DB = typeof db;

export default db;

/**
 * This is a sample of how to use the drizzle-orm with the node-postgres driver.
 * to get this to work, you need to add the enums back to the export list in the schemas/index.ts file
 */

// import { drizzle } from "drizzle-orm/node-postgres";
// import * as schemas from "@/db/schemas";
// import env from "@/utils/env";
// const db = drizzle({
//   connection: env.DATABASE_URL!,
//   // logger: true,
//   schema: schemas,
//   // casing: "snake_case",
// });
// export type DB = typeof db;
// export default db;
