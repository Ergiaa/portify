import type { ComponentType } from "react";
import { AboutSwiss } from "./about/AboutSwiss";
import { AboutEditorial } from "./about/AboutEditorial";
import { AboutGlass } from "./about/AboutGlass";
import { AboutY2K } from "./about/AboutY2K";
import { AboutBento } from "./about/AboutBento";

type Variant = "swiss" | "editorial" | "glass" | "y2k" | "bento";

interface Props {
  config: {
    title?: string;
    name?: string;
    role?: string;
    bio: string;
    photoUrl: string;
    highlights?: { label: string; value: string }[];
    ctaLabel?: string;
    ctaHref?: string;
    variant?: Variant;
  };
}

const VARIANTS: Record<Variant, ComponentType<{ config: Props["config"] }>> = {
  swiss: AboutSwiss,
  editorial: AboutEditorial,
  glass: AboutGlass,
  y2k: AboutY2K,
  bento: AboutBento,
};

export function AboutSection({ config }: Props) {
  const V = VARIANTS[config.variant ?? "swiss"];
  return <V config={config} />;
}
