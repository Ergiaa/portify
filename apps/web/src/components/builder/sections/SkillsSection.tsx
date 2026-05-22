import type { ComponentType } from "react";
import { SkillsSwiss } from "./skills/SkillsSwiss";
import { SkillsEditorial } from "./skills/SkillsEditorial";
import { SkillsGlass } from "./skills/SkillsGlass";
import { SkillsY2K } from "./skills/SkillsY2K";
import { SkillsBento } from "./skills/SkillsBento";

type Variant = "swiss" | "editorial" | "glass" | "y2k" | "bento";

interface Props {
  config: {
    title: string;
    description?: string;
    layout?: string;
    skills: { name: string; level: number }[];
    variant?: Variant;
  };
}

const VARIANTS: Record<Variant, ComponentType<{ config: Props["config"] }>> = {
  swiss: SkillsSwiss,
  editorial: SkillsEditorial,
  glass: SkillsGlass,
  y2k: SkillsY2K,
  bento: SkillsBento,
};

export function SkillsSection({ config }: Props) {
  const V = VARIANTS[config.variant ?? "swiss"];
  return <V config={config} />;
}
