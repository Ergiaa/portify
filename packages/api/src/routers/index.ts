import type { RouterClient } from "@orpc/server";
import { publicProcedure } from "../index";
import { authRouter } from "./auth";
import { contentRouter } from "./content";
import { pageBuilderRouter } from "./pageBuilder";

export const appRouter = {
  healthCheck: publicProcedure.handler(() => "OK"),
  auth: authRouter,
  content: contentRouter,
  pageBuilder: pageBuilderRouter,
};

export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
