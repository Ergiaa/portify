import { useEffect, useState } from "react";
import { adminOrpc } from "../../../lib/admin-orpc";
import { StatsSection } from "./StatsSection";

type StatItem = { number: string; label: string; icon?: string };

interface Props {
  config: {
    title: string;
    description?: string;
    layout?: string;
    statsSource?: "manual" | "analytics";
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

  useEffect(() => {
    if (config.statsSource !== "analytics") return;
    adminOrpc.metrics.summary().then((data) => {
      setAnalyticsStats([
        { number: fmtNum(data.videoViews), label: "Video Views", icon: "📺" },
        { number: fmtNum(data.likes), label: "Likes", icon: "❤️" },
        { number: fmtNum(data.shares), label: "Shares", icon: "🔄" },
        { number: fmtNum(data.comments), label: "Comments", icon: "💬" },
      ]);
    }).catch(() => {});
  }, [config.statsSource]);

  return (
    <StatsSection
      config={config}
      analyticsStats={analyticsStats ?? undefined}
    />
  );
}
