import { verifyToken } from "@portify/api/auth/jwt";
import { encrypt } from "@portify/api/lib/crypto";
import { db } from "@portify/db";
import { platforms } from "@portify/db/schema/platforms";
import { env } from "@portify/env/server";
import { SignJWT, jwtVerify } from "jose";
import { Hono } from "hono";

const app = new Hono();

const secret = new TextEncoder().encode(env.JWT_SECRET);

async function makeState(platform: string): Promise<string> {
  const nonce = crypto.randomUUID();
  return new SignJWT({ platform, nonce })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("5m")
    .sign(secret);
}

async function verifyState(state: string, expectedPlatform: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(state, secret);
    return payload["platform"] === expectedPlatform;
  } catch {
    return false;
  }
}

// GET /api/platforms/:name/connect
app.get("/api/platforms/:name/connect", async (c) => {
  // Auth check
  const authHeader = c.req.header("Authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return c.json({ error: "Unauthorized" }, 401);

  const payload = await verifyToken(token);
  if (!payload) return c.json({ error: "Unauthorized" }, 401);
  if (payload.role !== "owner") return c.json({ error: "Forbidden" }, 403);

  const name = c.req.param("name");

  if (name === "tiktok") {
    if (!env.TIKTOK_CLIENT_KEY || !env.TIKTOK_CLIENT_SECRET || !env.TIKTOK_REDIRECT_URI) {
      return c.json({ error: "TikTok is not configured" }, 500);
    }
    const state = await makeState("tiktok");
    const params = new URLSearchParams({
      client_key: env.TIKTOK_CLIENT_KEY,
      scope: "user.info.basic,user.info.stats,video.list",
      response_type: "code",
      redirect_uri: env.TIKTOK_REDIRECT_URI,
      state,
    });
    return c.json({ url: `https://www.tiktok.com/v2/auth/authorize?${params.toString()}` });
  }

  if (name === "instagram") {
    if (!env.META_APP_ID || !env.META_APP_SECRET || !env.INSTAGRAM_REDIRECT_URI) {
      return c.json({ error: "Instagram is not configured" }, 500);
    }
    const state = await makeState("instagram");
    const params = new URLSearchParams({
      client_id: env.META_APP_ID,
      scope: "instagram_basic,instagram_manage_insights,pages_show_list,pages_read_engagement",
      response_type: "code",
      redirect_uri: env.INSTAGRAM_REDIRECT_URI,
      state,
    });
    return c.json({ url: `https://www.facebook.com/v18.0/dialog/oauth?${params.toString()}` });
  }

  return c.json({ error: "Unknown platform" }, 400);
});

// GET /api/auth/callback/:name
app.get("/api/auth/callback/:name", async (c) => {
  const name = c.req.param("name");
  const errorParam = c.req.query("error");
  const code = c.req.query("code");
  const state = c.req.query("state");
  const redirectBase = `${env.CORS_ORIGIN}/admin/settings/platforms`;

  if (errorParam) {
    return c.redirect(`${redirectBase}?error=access_denied`);
  }

  if (!code || !state) {
    return c.redirect(`${redirectBase}?error=invalid_callback`);
  }

  const stateValid = await verifyState(state, name);
  if (!stateValid) {
    return c.redirect(`${redirectBase}?error=invalid_state`);
  }

  try {
    if (name === "tiktok") {
      await handleTikTok(code);
    } else if (name === "instagram") {
      await handleInstagram(code);
    } else {
      return c.redirect(`${redirectBase}?error=invalid_callback`);
    }
  } catch (err) {
    console.error(`OAuth callback failed for ${name}:`, err);
    return c.redirect(`${redirectBase}?error=callback_failed`);
  }

  return c.redirect(`${redirectBase}?connected=true`);
});

async function handleTikTok(code: string): Promise<void> {
  if (!env.TIKTOK_CLIENT_KEY || !env.TIKTOK_CLIENT_SECRET || !env.TIKTOK_REDIRECT_URI) {
    throw new Error("TikTok credentials not configured");
  }

  // Exchange code for tokens
  const tokenRes = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_key: env.TIKTOK_CLIENT_KEY,
      client_secret: env.TIKTOK_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
      redirect_uri: env.TIKTOK_REDIRECT_URI,
    }),
  });

  if (!tokenRes.ok) throw new Error(`TikTok token exchange failed: ${tokenRes.status}`);

  const tokenData = (await tokenRes.json()) as {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    open_id: string;
    scope: string;
  };

  // Fetch user info
  const userRes = await fetch(
    "https://open.tiktokapis.com/v2/user/info/?fields=open_id,display_name",
    {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    },
  );

  if (!userRes.ok) throw new Error(`TikTok user info failed: ${userRes.status}`);

  const userData = (await userRes.json()) as {
    data: { user: { open_id: string; display_name: string } };
  };

  const displayName = userData.data.user.display_name;
  const openId = userData.data.user.open_id;
  const tokenExpiresAt = new Date(Date.now() + tokenData.expires_in * 1000);
  const scopes = tokenData.scope.split(",").map((s) => s.trim());

  await db
    .insert(platforms)
    .values({
      name: "tiktok",
      accessToken: encrypt(tokenData.access_token),
      refreshToken: encrypt(tokenData.refresh_token),
      tokenExpiresAt,
      accountId: openId,
      accountName: displayName,
      scopes,
      connectedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: platforms.name,
      set: {
        accessToken: encrypt(tokenData.access_token),
        refreshToken: encrypt(tokenData.refresh_token),
        tokenExpiresAt,
        accountId: openId,
        accountName: displayName,
        scopes,
        connectedAt: new Date(),
      },
    });
}

async function handleInstagram(code: string): Promise<void> {
  if (!env.META_APP_ID || !env.META_APP_SECRET || !env.INSTAGRAM_REDIRECT_URI) {
    throw new Error("Instagram credentials not configured");
  }

  // Exchange code for short-lived token
  const shortRes = await fetch("https://graph.facebook.com/v18.0/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: env.META_APP_ID,
      client_secret: env.META_APP_SECRET,
      code,
      redirect_uri: env.INSTAGRAM_REDIRECT_URI,
      grant_type: "authorization_code",
    }),
  });

  if (!shortRes.ok) throw new Error(`Instagram short token exchange failed: ${shortRes.status}`);

  const shortData = (await shortRes.json()) as { access_token: string };
  const shortToken = shortData.access_token;

  // Exchange for long-lived token
  const longUrl = new URL("https://graph.facebook.com/v18.0/oauth/access_token");
  longUrl.searchParams.set("grant_type", "fb_exchange_token");
  longUrl.searchParams.set("client_id", env.META_APP_ID);
  longUrl.searchParams.set("client_secret", env.META_APP_SECRET);
  longUrl.searchParams.set("fb_exchange_token", shortToken);

  const longRes = await fetch(longUrl.toString());
  if (!longRes.ok) throw new Error(`Instagram long token exchange failed: ${longRes.status}`);

  const longData = (await longRes.json()) as { access_token: string; expires_in?: number };
  const longToken = longData.access_token;
  const expiresIn = longData.expires_in ?? 5184000; // default 60 days

  // Fetch account info
  const meUrl = new URL("https://graph.facebook.com/v18.0/me");
  meUrl.searchParams.set("fields", "id,name");
  meUrl.searchParams.set("access_token", longToken);

  const meRes = await fetch(meUrl.toString());
  if (!meRes.ok) throw new Error(`Instagram me fetch failed: ${meRes.status}`);

  const meData = (await meRes.json()) as { id: string; name: string };
  const tokenExpiresAt = new Date(Date.now() + expiresIn * 1000);

  await db
    .insert(platforms)
    .values({
      name: "instagram",
      accessToken: encrypt(longToken),
      refreshToken: null,
      tokenExpiresAt,
      accountId: meData.id,
      accountName: meData.name,
      scopes: [
        "instagram_basic",
        "instagram_manage_insights",
        "pages_show_list",
        "pages_read_engagement",
      ],
      connectedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: platforms.name,
      set: {
        accessToken: encrypt(longToken),
        refreshToken: null,
        tokenExpiresAt,
        accountId: meData.id,
        accountName: meData.name,
        scopes: [
          "instagram_basic",
          "instagram_manage_insights",
          "pages_show_list",
          "pages_read_engagement",
        ],
        connectedAt: new Date(),
      },
    });
}

export default app;
