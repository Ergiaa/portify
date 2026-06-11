import { z } from "zod";
import { db } from "@portify/db";
import { aggregateMetrics } from "@portify/db/schema/metrics";
import { eq, sql } from "drizzle-orm";
import { publicProcedure } from "../index";

export const metricsRouter = {
  summary: publicProcedure
    .output(
      z.object({
        videoViews: z.number(),
        likes: z.number(),
        shares: z.number(),
        comments: z.number(),
      })
    )
    .handler(async () => {
      const rows = await db
        .select({
          metricType: aggregateMetrics.metricType,
          total: sql<number>`coalesce(sum(${aggregateMetrics.value}), 0)`,
        })
        .from(aggregateMetrics)
        .where(eq(aggregateMetrics.dimension, "period"))
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
};
