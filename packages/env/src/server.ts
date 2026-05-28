import "dotenv/config";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    CORS_ORIGIN: z.url(),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    JWT_SECRET: z.string().min(32),
    TIKTOK_CLIENT_KEY: z.string().min(1).optional(),
    TIKTOK_CLIENT_SECRET: z.string().min(1).optional(),
    TIKTOK_REDIRECT_URI: z.string().url().optional(),
    META_APP_ID: z.string().min(1).optional(),
    META_APP_SECRET: z.string().min(1).optional(),
    INSTAGRAM_REDIRECT_URI: z.string().url().optional(),
    ENCRYPTION_KEY: z.string().length(64).optional(),
    SYNC_INTERVAL_HOURS: z.coerce.number().default(6),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
