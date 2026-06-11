import { Hono } from "hono";
import { verifyToken } from "@portify/api/auth/jwt";
import { uploadFile } from "@portify/api/lib/storage";
import { parseTikTokCsv } from "@portify/api/lib/tiktok-csv";
import { db } from "@portify/db";
import { aggregateMetrics } from "@portify/db/schema/metrics";
import { and, eq, inArray } from "drizzle-orm";

const app = new Hono();

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};

const MAX_SIZE = 5 * 1024 * 1024;

app.post("/uploads/thumbnail", async (c) => {
  const authHeader = c.req.header("Authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token || !(await verifyToken(token))) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  let formData: FormData;
  try {
    formData = await c.req.formData();
  } catch {
    return c.json({ error: "Invalid form data" }, 400);
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return c.json({ error: "No file provided" }, 400);
  }

  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    return c.json({ error: "Only image files are allowed" }, 400);
  }

  if (file.size > MAX_SIZE) {
    return c.json({ error: "File exceeds 5 MB limit" }, 400);
  }

  try {
    const key = `thumbnails/${crypto.randomUUID()}.${ext}`;
    const url = await uploadFile(key, await file.arrayBuffer(), file.type);
    return c.json({ url });
  } catch (err) {
    console.error("Thumbnail upload failed:", err);
    return c.json({ error: "Upload failed" }, 500);
  }
});

const TIKTOK_METRIC_FIELDS = [
  "video_views",
  "profile_views",
  "net_followers",
  "likes",
  "comments",
  "shares",
] as const;

app.post("/uploads/tiktok-csv", async (c) => {
  const authHeader = c.req.header("Authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token || !(await verifyToken(token))) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  let formData: FormData;
  try {
    formData = await c.req.formData();
  } catch {
    return c.json({ error: "Invalid form data" }, 400);
  }

  const file = formData.get("file");
  if (!(file instanceof File)) return c.json({ error: "No file provided" }, 400);
  if (!file.name.endsWith(".csv") && file.type !== "text/csv") {
    return c.json({ error: "Only CSV files are accepted" }, 400);
  }

  const text = await file.text();
  const startYearRaw = formData.get("startYear");
  const startYear = startYearRaw ? Number(startYearRaw) : undefined;
  const { rows, unknownColumns, errors } = parseTikTokCsv(text, { startYear });

  if (rows.length === 0) {
    return c.json({ inserted: 0, skipped: 0, unknownColumns, errors });
  }

  // Find dates already imported to avoid duplicate rows
  const dates = [...new Set(rows.map(r => r.date))];
  const existing = await db
    .select({ dimensionValue: aggregateMetrics.dimensionValue })
    .from(aggregateMetrics)
    .where(
      and(
        eq(aggregateMetrics.dimension, "period"),
        inArray(aggregateMetrics.metricType, [...TIKTOK_METRIC_FIELDS]),
        inArray(aggregateMetrics.dimensionValue, dates)
      )
    );
  const existingDates = new Set(existing.map(r => r.dimensionValue).filter(Boolean) as string[]);

  const toInsert: (typeof aggregateMetrics.$inferInsert)[] = [];
  const now = new Date();

  for (const row of rows) {
    if (existingDates.has(row.date)) continue;
    toInsert.push(
      { metricType: "video_views",   value: row.videoViews,   dimension: "period", dimensionValue: row.date, calculatedAt: now },
      { metricType: "profile_views", value: row.profileViews, dimension: "period", dimensionValue: row.date, calculatedAt: now },
      { metricType: "net_followers", value: row.netFollowers,  dimension: "period", dimensionValue: row.date, calculatedAt: now },
      { metricType: "likes",         value: row.likes,         dimension: "period", dimensionValue: row.date, calculatedAt: now },
      { metricType: "comments",      value: row.comments,      dimension: "period", dimensionValue: row.date, calculatedAt: now },
      { metricType: "shares",        value: row.shares,        dimension: "period", dimensionValue: row.date, calculatedAt: now },
    );
  }

  if (toInsert.length > 0) {
    await db.insert(aggregateMetrics).values(toInsert);
  }

  const inserted = toInsert.length / TIKTOK_METRIC_FIELDS.length;
  const skipped = rows.length - inserted;
  const sortedDates = [...dates].sort();

  return c.json({
    inserted,
    skipped,
    dateRange: sortedDates.length > 0
      ? { from: sortedDates[0], to: sortedDates[sortedDates.length - 1] }
      : null,
    unknownColumns,
    errors,
  });
});

export default app;
