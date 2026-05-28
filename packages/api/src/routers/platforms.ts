import { ORPCError } from "@orpc/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "@portify/db";
import { platforms } from "@portify/db/schema/platforms";
import { ownerProcedure } from "../index";
import { getSyncFn } from "../lib/sync-registry";

const platformNameEnum = z.enum(["tiktok", "instagram", "youtube"]);

const platformShape = z.object({
  id: z.string(),
  name: platformNameEnum,
  accountId: z.string().nullable(),
  accountName: z.string().nullable(),
  scopes: z.array(z.string()).nullable(),
  syncEnabled: z.boolean(),
  lastSyncedAt: z.date().nullable(),
  lastSyncStatus: z.string().nullable(),
  lastSyncError: z.string().nullable(),
  connectedAt: z.date().nullable(),
  tokenExpiresAt: z.date().nullable(),
});

export const platformsRouter = {
  list: ownerProcedure
    .output(z.array(platformShape))
    .handler(async () => {
      const rows = await db
        .select({
          id: platforms.id,
          name: platforms.name,
          accountId: platforms.accountId,
          accountName: platforms.accountName,
          scopes: platforms.scopes,
          syncEnabled: platforms.syncEnabled,
          lastSyncedAt: platforms.lastSyncedAt,
          lastSyncStatus: platforms.lastSyncStatus,
          lastSyncError: platforms.lastSyncError,
          connectedAt: platforms.connectedAt,
          tokenExpiresAt: platforms.tokenExpiresAt,
        })
        .from(platforms);
      return rows;
    }),

  syncStatus: ownerProcedure
    .input(z.object({ name: platformNameEnum }))
    .output(
      z.object({
        connected: z.boolean(),
        lastSyncedAt: z.date().nullable(),
        lastSyncStatus: z.string().nullable(),
        lastSyncError: z.string().nullable(),
      })
    )
    .handler(async ({ input }) => {
      const [row] = await db
        .select({
          lastSyncedAt: platforms.lastSyncedAt,
          lastSyncStatus: platforms.lastSyncStatus,
          lastSyncError: platforms.lastSyncError,
        })
        .from(platforms)
        .where(eq(platforms.name, input.name));

      if (!row) {
        return { connected: false, lastSyncedAt: null, lastSyncStatus: null, lastSyncError: null };
      }
      return { connected: true, ...row };
    }),

  disconnect: ownerProcedure
    .input(z.object({ name: platformNameEnum }))
    .output(z.object({ success: z.boolean() }))
    .handler(async ({ input }) => {
      const deleted = await db
        .delete(platforms)
        .where(eq(platforms.name, input.name))
        .returning({ id: platforms.id });

      if (deleted.length === 0) {
        throw new ORPCError("NOT_FOUND", { message: "Platform not connected" });
      }
      return { success: true };
    }),

  triggerSync: ownerProcedure
    .input(z.object({ name: platformNameEnum }))
    .output(z.object({ queued: z.boolean() }))
    .handler(async ({ input }) => {
      const [row] = await db
        .select({ id: platforms.id })
        .from(platforms)
        .where(eq(platforms.name, input.name));

      if (!row) throw new ORPCError("NOT_FOUND", { message: "Platform not connected" });

      const syncFn = getSyncFn();
      if (syncFn) {
        syncFn(input.name).catch(console.error); // fire-and-forget
      }
      return { queued: true };
    }),
};
