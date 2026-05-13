import {
  bigint,
  doublePrecision,
  index,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { platformName } from "./enums";
import { contentItems } from "./content";

// Raw time-series metrics fetched from platform APIs after each sync
export const platformMetrics = pgTable(
  "platform_metrics",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    contentItemId: uuid("content_item_id")
      .notNull()
      .references(() => contentItems.id, { onDelete: "cascade" }),
    platform: platformName("platform").notNull(),
    // Normalized field names — TikTok play_count and Instagram impressions both map to views
    views: bigint("views", { mode: "number" }).notNull().default(0),
    likes: bigint("likes", { mode: "number" }).notNull().default(0),
    comments: bigint("comments", { mode: "number" }).notNull().default(0),
    shares: bigint("shares", { mode: "number" }).notNull().default(0),
    fetchedAt: timestamp("fetched_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("platform_metrics_content_item_idx").on(t.contentItemId),
    index("platform_metrics_fetched_at_idx").on(t.fetchedAt),
  ]
);

// Pre-aggregated results written by the background cron job after each sync.
// Dashboard reads exclusively from this table for performance.
export const aggregateMetrics = pgTable(
  "aggregate_metrics",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    // e.g. 'engagement_rate', 'growth_trend', 'type_breakdown', 'cross_platform'
    metricType: text("metric_type").notNull(),
    value: doublePrecision("value").notNull(),
    // Segmentation axis: 'platform' | 'content_type' | 'period'
    dimension: text("dimension"),
    // Segmentation value: 'tiktok', 'video', '2025-01'
    dimensionValue: text("dimension_value"),
    calculatedAt: timestamp("calculated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("aggregate_metrics_type_idx").on(t.metricType),
    index("aggregate_metrics_calculated_at_idx").on(t.calculatedAt),
  ]
);
