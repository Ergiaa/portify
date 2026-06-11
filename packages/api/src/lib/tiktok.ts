import { encrypt, decrypt } from "./crypto"
import { db } from "@portify/db"
import { platforms } from "@portify/db/schema/platforms"
import { env } from "@portify/env/server"
import { eq } from "drizzle-orm"

type PlatformRow = typeof platforms.$inferSelect

export async function refreshTikTokToken(platform: PlatformRow): Promise<PlatformRow> {
  if (!platform.refreshToken) {
    throw new Error("TikTok refresh token is missing — cannot refresh access token")
  }

  const body = new URLSearchParams({
    client_key: env.TIKTOK_CLIENT_KEY ?? "",
    client_secret: env.TIKTOK_CLIENT_SECRET ?? "",
    grant_type: "refresh_token",
    refresh_token: decrypt(platform.refreshToken),
  })

  const res = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  })

  if (!res.ok) {
    throw new Error(`TikTok token refresh failed with status ${res.status}`)
  }

  const json = (await res.json()) as {
    access_token?: string
    refresh_token?: string
    expires_in?: number
    error?: { code: string; message: string }
  }

  if (!json.access_token || !json.refresh_token || !json.expires_in) {
    throw new Error(
      `TikTok token refresh returned unexpected shape: ${JSON.stringify(json.error ?? json)}`
    )
  }

  const { access_token, refresh_token, expires_in } = json

  await db
    .update(platforms)
    .set({
      accessToken: encrypt(access_token),
      refreshToken: encrypt(refresh_token),
      tokenExpiresAt: new Date(Date.now() + expires_in * 1000),
    })
    .where(eq(platforms.id, platform.id))

  const [updated] = await db
    .select()
    .from(platforms)
    .where(eq(platforms.id, platform.id))

  if (!updated) {
    throw new Error("Failed to re-select TikTok platform row after token refresh")
  }

  return updated
}

// Resolve vt.tiktok.com / vm.tiktok.com short URLs to full URLs
export async function resolveTikTokUrl(url: string): Promise<string> {
  try {
    const host = new URL(url).hostname
    if (!host.includes("vt.tiktok.com") && !host.includes("vm.tiktok.com")) {
      return url
    }
    const res = await fetch(url, { redirect: "follow" })
    return res.url || url
  } catch {
    return url
  }
}

export function extractTikTokVideoId(url: string): string | null {
  try {
    const parsed = new URL(url)
    const match = parsed.pathname.match(/\/(?:video|photo)\/(\d+)/)
    return match ? match[1] ?? null : null
  } catch {
    return null
  }
}

export async function fetchTikTokVideoStats(
  accessToken: string,
  videoIds: string[]
): Promise<Map<string, Record<string, unknown>>> {
  if (videoIds.length === 0) {
    return new Map()
  }

  const url = "https://open.tiktokapis.com/v2/video/query/?fields=id,view_count,like_count,comment_count,share_count"
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filters: { video_ids: videoIds },
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`TikTok video query failed with status ${res.status}: ${body}`)
  }

  const json = (await res.json()) as {
    data?: { videos?: Array<{ id: string; play_count: number; like_count: number; comment_count: number; share_count: number; collect_count: number }> }
    error?: { code: string; message: string }
  }

  console.log("[sync:tiktok] raw API response:", JSON.stringify(json, null, 2))

  const map = new Map<string, Record<string, unknown>>()
  for (const video of json.data?.videos ?? []) {
    map.set(video.id, video as Record<string, unknown>)
  }

  return map
}
