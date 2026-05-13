import {
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

import { contentStatus, contentType, platformName } from "./enums";

export const contentItems = pgTable(
  "content_items",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    type: contentType("type").notNull(),
    description: text("description"),
    thumbnailUrl: text("thumbnail_url"),
    platform: platformName("platform"),
    externalUrl: text("external_url"),
    status: contentStatus("status").notNull().default("draft"),
    // 1–5 personal rating used for the correlation matrix analytic
    personalRating: integer("personal_rating"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    publishedAt: timestamp("published_at", { withTimezone: true }),
  },
  (t) => [
    index("content_items_status_idx").on(t.status),
    index("content_items_type_idx").on(t.type),
    // GIN trgm index for fuzzy search — requires pg_trgm extension
    index("content_items_search_idx").using(
      "gin",
      sql`(${t.title} || ' ' || coalesce(${t.description}, '')) gin_trgm_ops`
    ),
  ]
);

export const contentMetadata = pgTable("content_metadata", {
  id: uuid("id").primaryKey().defaultRandom(),
  contentItemId: uuid("content_item_id")
    .notNull()
    .unique()
    .references(() => contentItems.id, { onDelete: "cascade" }),
  // Flexible type-specific fields: duration, word_count, genre tags, etc.
  metadata: jsonb("metadata").notNull().default({}),
});
