import { pgTable, text, timestamp, boolean, uuid } from "drizzle-orm/pg-core";

import { platformName } from "./enums";

export const platforms = pgTable("platforms", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: platformName("name").notNull().unique(),
  // Tokens stored encrypted at the application layer before write
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  tokenExpiresAt: timestamp("token_expires_at", { withTimezone: true }),
  lastSyncedAt: timestamp("last_synced_at", { withTimezone: true }),
  syncEnabled: boolean("sync_enabled").notNull().default(true),
});
