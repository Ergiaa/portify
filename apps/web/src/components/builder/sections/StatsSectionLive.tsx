import { useEffect, useState } from "react";
import { adminOrpc } from "../../../lib/admin-orpc";
import { StatsSection } from "./StatsSection";

type StatItem = { number: string; label: string; icon?: string };

type MetricKey = "videoViews" | "likes" | "shares" | "comments";

const METRIC_META: Record<MetricKey, { label: string; icon: string }> = {
  videoViews: { label: "Video Views", icon: "📺" },
  likes: { label: "Likes", icon: "❤️" },
  shares: { label: "Shares", icon: "🔄" },
  comments: { label: "Comments", icon: "💬" },
};

interface Props {
  config: {
    title: string;
    description?: string;
    layout?: string;
    statsSource?: "manual" | "analytics";
    statsPeriod?: "7d" | "30d" | "90d" | "all";
    visibleStats?: MetricKey[];
    stats: StatItem[];
    variant?: "swiss" | "editorial" | "glass" | "y2k" | "bento";
  };
}

function fmtNum(n: number): string {
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return n.toLocaleString();
}

export function StatsSectionLive({ config }: Props) {
  const [analyticsStats, setAnalyticsStats] = useState<StatItem[] | null>(null);

  const period = config.statsPeriod ?? "30d";
  const visible = config.visibleStats ?? (["videoViews", "likes", "shares", "comments"] as MetricKey[]);

  useEffect(() => {
    if (config.statsSource !== "analytics") return;
    adminOrpc.metrics.summary({ period }).then((data) => {
      const all: Record<MetricKey, number> = {
        videoViews: data.videoViews,
        likes: data.likes,
        shares: data.shares,
        comments: data.comments,
      };
      const items = (Object.keys(all) as MetricKey[])
        .filter((k) => visible.includes(k))
        .map((k) => ({
          number: fmtNum(all[k]),
          label: METRIC_META[k].label,
          icon: METRIC_META[k].icon,
        }));
      setAnalyticsStats(items);
    }).catch(() => {});
  }, [config.statsSource, period, visible.join(",")]);

  return (
    <StatsSection
      config={config}
      analyticsStats={analyticsStats ?? undefined}
    />
  );
}
