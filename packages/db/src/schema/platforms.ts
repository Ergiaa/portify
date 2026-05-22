import { pgTable, text, timestamp, boolean, uuid } from "drizzle-orm/pg-core";

import { platformName } from "./enums";
import { users } from "./users";

export const platforms = pgTable("platforms", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: platformName("name").notNull().unique(),
  // Tokens stored encrypted at the application layer before write
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  tokenExpiresAt: timestamp("token_expires_at", { withTimezone: true }),
  accountId: text("account_id"),
  accountName: text("account_name"),
  scopes: text("scopes").array(),
  syncEnabled: boolean("sync_enabled").notNull().default(true),
  lastSyncedAt: timestamp("last_synced_at", { withTimezone: true }),
  lastSyncStatus: text("last_sync_status"),  // 'success' | 'error' | 'in_progress'
  lastSyncError: text("last_sync_error"),
  connectedAt: timestamp("connected_at", { withTimezone: true }).defaultNow(),
  connectedBy: uuid("connected_by").references(() => users.id),
});
