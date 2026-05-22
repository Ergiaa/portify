import { ORPCError, os } from "@orpc/server";
import type { Context } from "./context";

export const o = os.$context<Context>();

export const publicProcedure = o;

export const protectedProcedure = o.use(({ context, next }) => {
  if (!context.auth) {
    throw new ORPCError("UNAUTHORIZED");
  }
  return next({ context: { ...context, auth: context.auth } });
});

export const editorProcedure = protectedProcedure.use(({ context, next }) => {
  if (context.auth.role === "viewer") {
    throw new ORPCError("FORBIDDEN");
  }
  return next({ context });
});

export const ownerProcedure = protectedProcedure.use(({ context, next }) => {
  if (context.auth.role !== "owner") {
    throw new ORPCError("FORBIDDEN");
  }
  return next({ context });
});
