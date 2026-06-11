import { Hono } from "hono";
import { createS3Client } from "@portify/api/lib/storage";
import { env } from "@portify/env/server";

const app = new Hono();

const MIME_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  avif: "image/avif",
};

app.get("/media/*", async (c) => {
  if (!env.STORAGE_ENDPOINT) return c.notFound();

  const key = c.req.path.slice("/media/".length);
  if (!key) return c.notFound();

  try {
    const client = createS3Client();
    const data = await client.file(key).arrayBuffer();
    const ext = key.split(".").pop()?.toLowerCase() ?? "";
    const contentType = MIME_TYPES[ext] ?? "application/octet-stream";
    return new Response(data, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return c.notFound();
  }
});

export default app;
