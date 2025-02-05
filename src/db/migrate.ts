// import { migrate } from "drizzle-orm/node-postgres/migrator";
import { migrate } from "drizzle-orm/neon-http/migrator";
import db from "@/db";
import config from "../../drizzle.config";

await migrate(db, { migrationsFolder: config.out! });
