import type { ComponentType } from "react";
import { StatsSwiss } from "./stats/StatsSwiss";
import { StatsEditorial } from "./stats/StatsEditorial";
import { StatsGlass } from "./stats/StatsGlass";
import { StatsY2K } from "./stats/StatsY2K";
import { StatsBento } from "./stats/StatsBento";

type Variant = "swiss" | "editorial" | "glass" | "y2k" | "bento";

interface Props {
  config: {
    title: string;
    description?: string;
    layout?: string;
    stats: { number: string; label: string; icon?: string }[];
    variant?: Variant;
  };
}

const VARIANTS: Record<Variant, ComponentType<{ config: Props["config"] }>> = {
  swiss: StatsSwiss,
  editorial: StatsEditorial,
  glass: StatsGlass,
  y2k: StatsY2K,
  bento: StatsBento,
};

export function StatsSection({ config }: Props) {
  const V = VARIANTS[config.variant ?? "swiss"];
  return <V config={config} />;
}
