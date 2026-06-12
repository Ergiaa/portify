import type { ComponentType } from "react";
import { StatsSwiss } from "./stats/StatsSwiss";
import { StatsEditorial } from "./stats/StatsEditorial";
import { StatsGlass } from "./stats/StatsGlass";
import { StatsY2K } from "./stats/StatsY2K";
import { StatsBento } from "./stats/StatsBento";

type Variant = "swiss" | "editorial" | "glass" | "y2k" | "bento";
type StatItem = { number: string; label: string; icon?: string };

interface Props {
  config: {
    title: string;
    description?: string;
    statsSource?: "manual" | "analytics";
    stats: StatItem[];
    variant?: Variant;
  };
  // Pre-fetched analytics stats passed from SSR callers
  analyticsStats?: StatItem[];
}

const VARIANTS: Record<Variant, ComponentType<{ config: any }>> = {
  swiss: StatsSwiss,
  editorial: StatsEditorial,
  glass: StatsGlass,
  y2k: StatsY2K,
  bento: StatsBento,
};

export function StatsSection({ config, analyticsStats }: Props) {
  const effectiveStats =
    config.statsSource === "analytics" && analyticsStats
      ? analyticsStats
      : config.stats;

  const V = VARIANTS[config.variant ?? "swiss"];
  return <V config={{ ...config, stats: effectiveStats }} />;
}
