import { encrypt, decrypt } from "./crypto"
import { db } from "@portify/db"
import { platforms } from "@portify/db/schema/platforms"
import { eq } from "drizzle-orm"

type PlatformRow = typeof platforms.$inferSelect

export async function refreshInstagramToken(platform: PlatformRow): Promise<PlatformRow> {
  const token = decrypt(platform.accessToken!)
  const url = `https://graph.facebook.com/v18.0/oauth/access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(token)}`

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`Instagram token refresh failed with status ${res.status}`)
  }

  const json = (await res.json()) as { access_token: string; expires_in: number }

  await db
    .update(platforms)
    .set({
      accessToken: encrypt(json.access_token),
      tokenExpiresAt: new Date(Date.now() + json.expires_in * 1000),
    })
    .where(eq(platforms.id, platform.id))

  const [updated] = await db
    .select()
    .from(platforms)
    .where(eq(platforms.id, platform.id))

  if (!updated) {
    throw new Error("Failed to re-select Instagram platform row after token refresh")
  }

  return updated
}

export function extractInstagramShortcode(url: string): string | null {
  try {
    const parsed = new URL(url)
    const match = parsed.pathname.match(/\/p\/([A-Za-z0-9_-]+)/)
    return match ? match[1] ?? null : null
  } catch {
    return null
  }
}

export async function fetchInstagramMediaMap(accessToken: string): Promise<Map<string, string>> {
  const map = new Map<string, string>()

  let nextUrl: string | null =
    `https://graph.facebook.com/v18.0/me/media?fields=id,shortcode&access_token=${encodeURIComponent(accessToken)}&limit=100`

  while (nextUrl) {
    const res = await fetch(nextUrl)

    if (!res.ok) {
      throw new Error(`Instagram media list failed with status ${res.status}`)
    }

    const json = (await res.json()) as {
      data: Array<{ id: string; shortcode: string }>
      paging?: { next?: string }
    }

    for (const item of json.data) {
      map.set(item.shortcode, item.id)
    }

    nextUrl = json.paging?.next ?? null
  }

  return map
}

export async function fetchInstagramMediaInsights(
  accessToken: string,
  mediaId: string
): Promise<Record<string, unknown>> {
  const url = `https://graph.facebook.com/v18.0/${mediaId}/insights?metric=impressions,reach,likes,comments,shares,saved,video_views&access_token=${encodeURIComponent(accessToken)}`

  const res = await fetch(url)

  if (res.status === 400) {
    // Metric not available for this post type (e.g. no video_views on a photo)
    return {}
  }

  if (!res.ok) {
    throw new Error(`Instagram media insights failed with status ${res.status}`)
  }

  const json = (await res.json()) as {
    data: Array<{ name: string; values: Array<{ value: number }> }>
  }

  const result: Record<string, unknown> = {}
  for (const metric of json.data) {
    result[metric.name] = metric.values[0]?.value ?? 0
  }

  return result
}
