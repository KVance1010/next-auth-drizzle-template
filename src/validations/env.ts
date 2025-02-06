import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { ZodError, z } from "zod";

config({ path: ".env" });

const envSchema = z.object({
  DATABASE_URL: z.string().min(10),
  AUTH_SECRET: z.string().min(10),
  AUTH_URL: z.string().min(10),
  AUTH_GOOGLE_ID: z.string().min(1),
  AUTH_GOOGLE_SECRET: z.string().min(1),
  MAILER_EMAIL: z.string().min(8),
  MAILER_PASSWORD: z.string().min(8),
  // if the service is on the list of nodemailer services, use it instead of host, port, secure
  MAILER_SERVICE: z.string().min(2),

  // Alternatively use host, port, secure
  // MAILER_PORT: z.string().min(2),
  // MAILER_HOST: z.string().min(2)
});

expand(config());

try {
  envSchema.parse(process.env);
} catch (e) {
  if (e instanceof ZodError) {
    console.error("Environment validation error:", e.errors);
  }
}

export default envSchema.parse(process.env);
