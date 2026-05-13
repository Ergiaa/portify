import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { users } from "./users";

// Append-only event log. Viewable in admin by owner only.
export const auditLog = pgTable("audit_log", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
  // e.g. 'content_published', 'content_deleted', 'layout_changed', 'platform_synced'
  action: text("action").notNull(),
  // e.g. 'content_item', 'portfolio_config', 'platform'
  entityType: text("entity_type"),
  entityId: uuid("entity_id"),
  // Additional context captured at the time of the event
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
