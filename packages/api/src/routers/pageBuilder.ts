import { desc, eq } from "drizzle-orm";
import { db } from "@portify/db";
import { portfolioConfig } from "@portify/db/schema/portfolio";
import { editorProcedure, protectedProcedure } from "../index";
import { PageConfigSchema } from "../schemas/pageBuilder";

async function getExistingRow() {
  const [row] = await db
    .select()
    .from(portfolioConfig)
    .orderBy(desc(portfolioConfig.updatedAt))
    .limit(1);
  return row ?? null;
}

async function upsertConfig(modules: unknown, isDraft: boolean, userId: string) {
  const existing = await getExistingRow();
  if (existing) {
    await db
      .update(portfolioConfig)
      .set({ modules, isDraft, updatedAt: new Date(), updatedBy: userId })
      .where(eq(portfolioConfig.id, existing.id));
  } else {
    await db.insert(portfolioConfig).values({ modules, isDraft, updatedBy: userId });
  }
}

export const pageBuilderRouter = {
  getConfig: protectedProcedure.handler(async () => {
    const row = await getExistingRow();
    if (!row) return null;
    return { modules: row.modules, isDraft: row.isDraft };
  }),

  saveConfig: editorProcedure
    .input(PageConfigSchema)
    .handler(async ({ input, context }) => {
      await upsertConfig(input, true, context.auth.id);
      return { ok: true };
    }),

  publish: editorProcedure
    .input(PageConfigSchema)
    .handler(async ({ input, context }) => {
      await upsertConfig(input, false, context.auth.id);
      return { ok: true };
    }),
};
