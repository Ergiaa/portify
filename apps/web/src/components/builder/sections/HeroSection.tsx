import type { ComponentType } from "react";
import { HeroSwiss } from "./hero/HeroSwiss";
import { HeroEditorial } from "./hero/HeroEditorial";
import { HeroGlass } from "./hero/HeroGlass";
import { HeroY2K } from "./hero/HeroY2K";
import { HeroBento } from "./hero/HeroBento";

type Variant = "swiss" | "editorial" | "glass" | "y2k" | "bento";

interface Props {
  config: {
    heading: string;
    subheading: string;
    tagline?: string;
    avatarUrl?: string;
    layout?: "centered" | "split";
    ctaLabel: string;
    ctaHref: string;
    cta2Label?: string;
    cta2Href?: string;
    variant?: Variant;
  };
}

const VARIANTS: Record<Variant, ComponentType<{ config: Props["config"] }>> = {
  swiss: HeroSwiss,
  editorial: HeroEditorial,
  glass: HeroGlass,
  y2k: HeroY2K,
  bento: HeroBento,
};

export function HeroSection({ config }: Props) {
  const V = VARIANTS[config.variant ?? "swiss"];
  return <V config={config} />;
}
