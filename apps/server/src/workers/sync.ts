import { db } from "@portify/db"
import { platforms } from "@portify/db/schema/platforms"
import { contentItems } from "@portify/db/schema/content"
import { platformMetrics } from "@portify/db/schema/metrics"
import { eq, and, isNotNull } from "drizzle-orm"
import { decrypt } from "@portify/api/lib/crypto"
import {
  refreshTikTokToken,
  resolveTikTokUrl,
  extractTikTokVideoId,
  fetchTikTokVideoStats,
} from "@portify/api/lib/tiktok"
import {
  refreshInstagramToken,
  extractInstagramShortcode,
  fetchInstagramMediaMap,
  fetchInstagramMediaInsights,
} from "@portify/api/lib/instagram"
import {
  normalizeTikTokMetrics,
  normalizeInstagramMetrics,
} from "@portify/api/lib/metrics"

async function withBackoff<T>(fn: () => Promise<T>, maxRetries = 3): Promise<T> {
  let lastError: unknown
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (err) {
      lastError = err
      const message = err instanceof Error ? err.message : String(err)
      if (message.includes("429") && attempt < maxRetries) {
        const delayMs = Math.pow(2, attempt) * 1000
        await new Promise((resolve) => setTimeout(resolve, delayMs))
        continue
      }
      throw err
    }
  }
  throw lastError
}

export async function syncPlatform(name: "tiktok" | "instagram" | "youtube"): Promise<void> {
  // 1. SELECT platform row
  const [platformRow] = await db
    .select()
    .from(platforms)
    .where(eq(platforms.name, name))

  if (!platformRow) {
    console.log(`Sync skipped: platform "${name}" not found`)
    return
  }

  // 2. Dedup check
  if (platformRow.lastSyncStatus === "in_progress") {
    console.log(`Sync skipped: platform "${name}" is already in_progress`)
    return
  }

  // 3. Mark as in_progress
  await db
    .update(platforms)
    .set({ lastSyncStatus: "in_progress" })
    .where(eq(platforms.name, name))

  try {
    let platform = platformRow

    // a. Check token expiry (refresh if within 60 minutes)
    const sixtyMinutesFromNow = new Date(Date.now() + 60 * 60 * 1000)
    if (platform.tokenExpiresAt && platform.tokenExpiresAt <= sixtyMinutesFromNow) {
      if (name === "tiktok") {
        platform = await refreshTikTokToken(platform)
      } else if (name === "instagram") {
        platform = await refreshInstagramToken(platform)
      }
    }

    // b. Decrypt access token
    const accessToken = decrypt(platform.accessToken!)

    // c. Load content items
    const items = await db
      .select()
      .from(contentItems)
      .where(
        and(
          eq(contentItems.platform, name),
          isNotNull(contentItems.externalUrl)
        )
      )

    console.log(`[sync:${name}] found ${items.length} linked content item(s)`)

    if (items.length === 0) {
      await db
        .update(platforms)
        .set({ lastSyncedAt: new Date(), lastSyncStatus: "success", lastSyncError: null })
        .where(eq(platforms.name, name))
      return
    }

    type MetricInsert = typeof platformMetrics.$inferInsert
    const metricsToInsert: MetricInsert[] = []

    if (name === "tiktok") {
      // d. TikTok path
      const videoIdMap = new Map<string, string>() // videoId → contentItem.id
      const videoIds: string[] = []

      for (const item of items) {
        const resolvedUrl = await resolveTikTokUrl(item.externalUrl!)
        if (resolvedUrl !== item.externalUrl) {
          console.log(`[sync:tiktok] resolved short URL: ${item.externalUrl} → ${resolvedUrl}`)
          await db
            .update(contentItems)
            .set({ externalUrl: resolvedUrl })
            .where(eq(contentItems.id, item.id))
          item.externalUrl = resolvedUrl
        }
        const videoId = extractTikTokVideoId(resolvedUrl)
        if (videoId) {
          videoIds.push(videoId)
          videoIdMap.set(videoId, item.id)
        } else {
          console.warn(`[sync:tiktok] could not extract video ID from: ${resolvedUrl}`)
        }
      }

      console.log(`[sync:tiktok] extracted ${videoIds.length} video ID(s):`, videoIds)

      const statsMap = await withBackoff(() => fetchTikTokVideoStats(accessToken, videoIds))

      console.log(`[sync:tiktok] API returned stats for ${statsMap.size} video(s)`)

      for (const item of items) {
        const videoId = extractTikTokVideoId(item.externalUrl!)
        if (!videoId) continue
        const rawStats = statsMap.get(videoId)
        if (!rawStats) {
          console.warn(`[sync:tiktok] no stats returned for video ID ${videoId} (url: ${item.externalUrl})`)
          continue
        }
        const normalized = normalizeTikTokMetrics(rawStats)
        console.log(`[sync:tiktok] video ${videoId} →`, normalized)
        metricsToInsert.push({
          contentItemId: item.id,
          platform: name,
          ...normalized,
          rawData: rawStats,
          fetchedAt: new Date(),
        })
      }
    } else if (name === "instagram") {
      // e. Instagram path
      const shortcodeMap = await fetchInstagramMediaMap(accessToken)

      for (const item of items) {
        const shortcode = extractInstagramShortcode(item.externalUrl!)
        if (!shortcode) continue

        const mediaId = shortcodeMap.get(shortcode)
        if (!mediaId) {
          console.warn(`Instagram sync: no media ID found for shortcode "${shortcode}" (url: ${item.externalUrl})`)
          continue
        }

        const rawInsights = await withBackoff(() =>
          fetchInstagramMediaInsights(accessToken, mediaId)
        )

        const normalized = normalizeInstagramMetrics(rawInsights)
        metricsToInsert.push({
          contentItemId: item.id,
          platform: name,
          ...normalized,
          rawData: rawInsights,
          fetchedAt: new Date(),
        })
      }
    }
    // youtube: not yet implemented — no-op

    // f. Batch insert metrics
    if (metricsToInsert.length > 0) {
      await db.insert(platformMetrics).values(metricsToInsert)
    }

    // g. Mark success
    await db
      .update(platforms)
      .set({ lastSyncedAt: new Date(), lastSyncStatus: "success", lastSyncError: null })
      .where(eq(platforms.name, name))
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    await db
      .update(platforms)
      .set({ lastSyncStatus: "error", lastSyncError: message })
      .where(eq(platforms.name, name))
    console.error(`Sync failed for ${name}:`, err)
  }
}

export function scheduleSyncAll(intervalHours: number): void {
  setInterval(() => {
    syncPlatform("tiktok").catch(console.error)
    syncPlatform("instagram").catch(console.error)
  }, intervalHours * 60 * 60 * 1000)
}
