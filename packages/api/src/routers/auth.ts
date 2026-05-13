import { ORPCError } from "@orpc/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "@portify/db";
import { users } from "@portify/db/schema/users";
import { publicProcedure, protectedProcedure } from "../index";
import { signToken } from "../auth/jwt";

export const authRouter = {
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string().min(1) }))
    .output(z.object({ token: z.string() }))
    .handler(async ({ input }) => {
      const result = await db
        .select()
        .from(users)
        .where(eq(users.email, input.email))
        .limit(1);

      const user = result[0];
      if (!user || !(await Bun.password.verify(input.password, user.passwordHash))) {
        throw new ORPCError("UNAUTHORIZED", { message: "Invalid credentials" });
      }

      const token = await signToken({ sub: user.id, role: user.role });
      return { token };
    }),

  me: protectedProcedure
    .output(z.object({ id: z.string(), email: z.string(), role: z.enum(["owner", "editor", "viewer"]) }))
    .handler(({ context }) => context.auth),
};
