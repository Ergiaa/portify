import { pgEnum } from "drizzle-orm/pg-core";

export const userRole = pgEnum("user_role", ["owner", "editor", "viewer"]);

export const contentType = pgEnum("content_type", [
  "video",
  "article",
  "podcast",
  "design",
]);

export const contentStatus = pgEnum("content_status", [
  "draft",
  "published",
  "archived",
]);

export const platformName = pgEnum("platform_name", [
  "tiktok",
  "instagram",
  "youtube",
]);
