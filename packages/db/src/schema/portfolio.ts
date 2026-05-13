import { boolean, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { users } from "./users";

// Single-row table — the public portfolio module layout.
// modules: ordered array of { id, type, enabled, position, config }
export const portfolioConfig = pgTable("portfolio_config", {
  id: uuid("id").primaryKey().defaultRandom(),
  // Ordered array of module descriptors (type, enabled, position, config blob)
  modules: jsonb("modules").notNull().default([]),
  // Separates draft layout edits from the live published layout
  isDraft: boolean("is_draft").notNull().default(false),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedBy: uuid("updated_by").references(() => users.id, {
    onDelete: "set null",
  }),
});

// Per-metric boolean flags controlling what the public portfolio page shows
export const publicMetricsConfig = pgTable("public_metrics_config", {
  id: uuid("id").primaryKey().defaultRandom(),
  metricKey: text("metric_key").notNull().unique(),
  isPublic: boolean("is_public").notNull().default(false),
  displayLabel: text("display_label").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
