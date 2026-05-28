import type { ComponentType } from "react";
import { ProjectsSwiss } from "./projects/ProjectsSwiss";
import { ProjectsEditorial } from "./projects/ProjectsEditorial";
import { ProjectsGlass } from "./projects/ProjectsGlass";
import { ProjectsY2K } from "./projects/ProjectsY2K";
import { ProjectsBento } from "./projects/ProjectsBento";

type Variant = "swiss" | "editorial" | "glass" | "y2k" | "bento";

interface ContentItem {
  id: string;
  title: string;
  type: string;
  platform?: string | null;
  publishedAt?: Date | null;
  thumbnailUrl?: string | null;
  duration?: string | null;
}

interface Props {
  config: {
    title: string;
    limit: number;
    layout?: "grid" | "list";
    filterType?: string;
    viewAllLabel?: string;
    viewAllHref?: string;
    variant?: Variant;
  };
  items: ContentItem[];
}

const VARIANTS: Record<Variant, ComponentType<{ config: any; items: any[] }>> = {
  swiss: ProjectsSwiss,
  editorial: ProjectsEditorial,
  glass: ProjectsGlass,
  y2k: ProjectsY2K,
  bento: ProjectsBento,
};

export function ProjectsSectionStatic({ config, items }: Props) {
  const V = VARIANTS[config.variant ?? "swiss"];
  return <V config={config} items={items} />;
}
