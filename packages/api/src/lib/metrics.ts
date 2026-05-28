export type NormalizedMetrics = {
  views: number
  likes: number
  comments: number
  shares: number
  saves: number
  reach: number
  impressions: number
}

export function normalizeTikTokMetrics(raw: Record<string, unknown>): NormalizedMetrics {
  return {
    views: Number(raw.view_count ?? 0),
    likes: Number(raw.like_count ?? 0),
    comments: Number(raw.comment_count ?? 0),
    shares: Number(raw.share_count ?? 0),
    saves: Number(raw.bookmark_count ?? raw.collect_count ?? 0),
    reach: 0,
    impressions: 0,
  }
}

export function normalizeInstagramMetrics(raw: Record<string, unknown>): NormalizedMetrics {
  return {
    views: Number(raw.video_views ?? 0),
    likes: Number(raw.likes ?? 0),
    comments: Number(raw.comments ?? 0),
    shares: Number(raw.shares ?? 0),
    saves: Number(raw.saved ?? 0),
    reach: Number(raw.reach ?? 0),
    impressions: Number(raw.impressions ?? 0),
  }
}
