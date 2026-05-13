import { SignJWT, jwtVerify } from "jose";
import { env } from "@portify/env/server";

const secret = new TextEncoder().encode(env.JWT_SECRET);
const alg = "HS256";

type TokenPayload = { sub: string; role: "owner" | "editor" | "viewer" };

export async function signToken(payload: TokenPayload): Promise<string> {
  return new SignJWT({ role: payload.role })
    .setProtectedHeader({ alg })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    if (typeof payload.sub !== "string" || typeof payload["role"] !== "string") return null;
    return { sub: payload.sub, role: payload["role"] as TokenPayload["role"] };
  } catch {
    return null;
  }
}
