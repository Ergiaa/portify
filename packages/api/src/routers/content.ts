import { ORPCError } from "@orpc/server";
import { z } from "zod";
import { and, desc, eq } from "drizzle-orm";
import { db } from "@portify/db";
import { contentItems } from "@portify/db/schema/content";
import { publicProcedure, editorProcedure, protectedProcedure } from "../index";

const contentTypeEnum = z.enum(["video", "article", "podcast", "design"]);
const platformEnum = z.enum(["tiktok", "instagram", "youtube"]);
const statusEnum = z.enum(["draft", "published", "archived"]);

const contentItemShape = z.object({
  id: z.string(),
  title: z.string(),
  type: contentTypeEnum,
  description: z.string().nullable(),
  thumbnailUrl: z.string().nullable(),
  platform: platformEnum.nullable(),
  externalUrl: z.string().nullable(),
  status: statusEnum,
  personalRating: z.number().nullable(),
  createdAt: z.date(),
  publishedAt: z.date().nullable(),
});

export const contentRouter = {
  list: publicProcedure
    .input(
      z.object({
        status: statusEnum.optional(),
        type: contentTypeEnum.optional(),
        platform: platformEnum.optional(),
        limit: z.number().int().min(1).max(100).default(50),
        offset: z.number().int().min(0).default(0),
      })
    )
    .output(z.object({ items: z.array(contentItemShape), total: z.number() }))
    .handler(async ({ input, context }) => {
      // Unauthenticated callers can only see published items
      const effectiveStatus = context.auth ? input.status : "published";

      const conditions = [];
      if (effectiveStatus) conditions.push(eq(contentItems.status, effectiveStatus));
      if (input.type) conditions.push(eq(contentItems.type, input.type));
      if (input.platform) conditions.push(eq(contentItems.platform, input.platform));

      const where = conditions.length > 0 ? and(...conditions) : undefined;

      const [items, countResult] = await Promise.all([
        db
          .select()
          .from(contentItems)
          .where(where)
          .orderBy(desc(contentItems.publishedAt))
          .limit(input.limit)
          .offset(input.offset),
        db.$count(contentItems, where),
      ]);

      return { items, total: Number(countResult) };
    }),

  get: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .output(contentItemShape)
    .handler(async ({ input }) => {
      const result = await db
        .select()
        .from(contentItems)
        .where(eq(contentItems.id, input.id))
        .limit(1);
      if (!result[0]) throw new ORPCError("NOT_FOUND");
      return result[0];
    }),

  create: editorProcedure
    .input(
      z.object({
        title: z.string().min(1).max(255),
        type: contentTypeEnum,
        description: z.string().optional(),
        thumbnailUrl: z.string().url().optional(),
        platform: platformEnum.optional(),
        externalUrl: z.string().url().optional(),
        personalRating: z.number().int().min(1).max(5).optional(),
      })
    )
    .output(contentItemShape)
    .handler(async ({ input }) => {
      const result = await db
        .insert(contentItems)
        .values({ ...input, status: "draft" })
        .returning();
      return result[0]!;
    }),

  update: editorProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        title: z.string().min(1).max(255).optional(),
        type: contentTypeEnum.optional(),
        description: z.string().optional(),
        thumbnailUrl: z.string().url().optional(),
        platform: platformEnum.optional(),
        externalUrl: z.string().url().optional(),
        personalRating: z.number().int().min(1).max(5).optional(),
      })
    )
    .output(contentItemShape)
    .handler(async ({ input }) => {
      const { id, ...updates } = input;
      const [existing] = await db
        .select({ id: contentItems.id })
        .from(contentItems)
        .where(eq(contentItems.id, id))
        .limit(1);
      if (!existing) throw new ORPCError("NOT_FOUND");

      const result = await db
        .update(contentItems)
        .set(updates)
        .where(eq(contentItems.id, id))
        .returning();
      return result[0]!;
    }),

  delete: editorProcedure
    .input(z.object({ id: z.string().uuid() }))
    .output(z.object({ success: z.boolean() }))
    .handler(async ({ input }) => {
      const [existing] = await db
        .select({ id: contentItems.id })
        .from(contentItems)
        .where(eq(contentItems.id, input.id))
        .limit(1);
      if (!existing) throw new ORPCError("NOT_FOUND");

      await db.delete(contentItems).where(eq(contentItems.id, input.id));
      return { success: true };
    }),

  setStatus: editorProcedure
    .input(z.object({ id: z.string().uuid(), status: statusEnum }))
    .output(contentItemShape)
    .handler(async ({ input }) => {
      const [existing] = await db
        .select()
        .from(contentItems)
        .where(eq(contentItems.id, input.id))
        .limit(1);
      if (!existing) throw new ORPCError("NOT_FOUND");

      const updates: Partial<typeof existing> = { status: input.status };
      if (input.status === "published" && !existing.publishedAt) {
        updates.publishedAt = new Date();
      }

      const result = await db
        .update(contentItems)
        .set(updates)
        .where(eq(contentItems.id, input.id))
        .returning();
      return result[0]!;
    }),
};
