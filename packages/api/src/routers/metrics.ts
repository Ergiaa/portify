import { z } from "zod";
import { db } from "@portify/db";
import { aggregateMetrics, platformMetrics } from "@portify/db/schema/metrics";
import { and, eq, gte, sql } from "drizzle-orm";
import { publicProcedure } from "../index";

const PERIOD_SCHEMA = z.enum(["7d", "30d", "90d", "all"]).optional().default("all");

function periodCutoff(period: string): Date | null {
  if (period === "all") return null;
  const days = period === "7d" ? 7 : period === "30d" ? 30 : 90;
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
}

const METRIC_COL_NAME: Record<string, string> = {
  videoViews: "views",
  likes: "likes",
  shares: "shares",
  comments: "comments",
};

export const metricsRouter = {
  summary: publicProcedure
    .input(z.object({ period: PERIOD_SCHEMA }).optional())
    .output(
      z.object({
        videoViews: z.number(),
        likes: z.number(),
        shares: z.number(),
        comments: z.number(),
      })
    )
    .handler(async ({ input }) => {
      const cutoff = periodCutoff(input?.period ?? "all");
      const conditions = [eq(aggregateMetrics.dimension, "period")];
      if (cutoff) conditions.push(gte(aggregateMetrics.calculatedAt, cutoff));

      const rows = await db
        .select({
          metricType: aggregateMetrics.metricType,
          total: sql<number>`coalesce(sum(${aggregateMetrics.value}), 0)`,
        })
        .from(aggregateMetrics)
        .where(and(...conditions))
        .groupBy(aggregateMetrics.metricType);

      const totals: Record<string, number> = {};
      for (const row of rows) {
        totals[row.metricType] = Number(row.total);
      }

      return {
        videoViews: totals["video_views"] ?? 0,
        likes: totals["likes"] ?? 0,
        shares: totals["shares"] ?? 0,
        comments: totals["comments"] ?? 0,
      };
    }),

  timeSeries: publicProcedure
    .input(
      z.object({
        metric: z.enum(["videoViews", "likes", "shares", "comments"]).default("videoViews"),
        period: PERIOD_SCHEMA,
      })
    )
    .output(z.array(z.object({ date: z.string(), value: z.number() })))
    .handler(async ({ input }) => {
      const colName = METRIC_COL_NAME[input.metric] ?? "views";
      const cutoff = periodCutoff(input.period);
      const conditions = cutoff ? [gte(platformMetrics.fetchedAt, cutoff)] : [];

      const rows = await db
        .select({
          date: sql<string>`DATE(${platformMetrics.fetchedAt})::text`,
          value: sql<number>`coalesce(sum(${sql.raw(colName)}), 0)`,
        })
        .from(platformMetrics)
        .where(conditions.length ? and(...conditions) : undefined)
        .groupBy(sql`DATE(${platformMetrics.fetchedAt})`)
        .orderBy(sql`DATE(${platformMetrics.fetchedAt}) ASC`);

      return rows.map((r) => ({ date: r.date, value: Number(r.value) }));
    }),
};
