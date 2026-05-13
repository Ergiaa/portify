import type { Context as HonoContext } from "hono";
import { eq } from "drizzle-orm";
import { db } from "@portify/db";
import { users } from "@portify/db/schema/users";
import { verifyToken } from "./auth/jwt";

export type AuthUser = {
  id: string;
  email: string;
  role: "owner" | "editor" | "viewer";
};

export type CreateContextOptions = {
  context: HonoContext;
};

export async function createContext({ context }: CreateContextOptions) {
  const authHeader = context.req.header("Authorization");
  let auth: AuthUser | null = null;

  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.slice(7);
    const payload = await verifyToken(token);
    if (payload) {
      const [user] = await db
        .select({ id: users.id, email: users.email, role: users.role })
        .from(users)
        .where(eq(users.id, payload.sub))
        .limit(1);
      auth = user ?? null;
    }
  }

  return { auth };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
