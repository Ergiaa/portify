import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import { adminOrpc } from "../../../lib/admin-orpc";
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
    filterType?: string;
    viewAllLabel?: string;
    viewAllHref?: string;
    variant?: Variant;
  };
}

interface Item {
  id: string; title: string; type: string; status: string;
  thumbnailUrl: string | null; description: string | null;
  externalUrl: string | null; platform: string | null;
  publishedAt: Date | null;
}

const VARIANTS: Record<Variant, ComponentType<{ config: any; items: any[] }>> = {
  swiss: ProjectsSwiss,
  editorial: ProjectsEditorial,
  glass: ProjectsGlass,
  y2k: ProjectsY2K,
  bento: ProjectsBento,
};

export function ProjectsSection({ config }: Props) {
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    const input: Record<string, unknown> = { status: "published", limit: config.limit };
    if (config.filterType) input.type = config.filterType;
    adminOrpc.content.list(input as Parameters<typeof adminOrpc.content.list>[0])
      .then((res) => setItems(res.items as Item[]))
      .catch(() => {});
  }, [config.limit, config.filterType]);

  const contentItems: ContentItem[] = items.map((item) => ({
    id: item.id,
    title: item.title,
    type: item.type,
    platform: item.platform,
    publishedAt: item.publishedAt ?? null,
    thumbnailUrl: item.thumbnailUrl,
    duration: null,
  }));

  const V = VARIANTS[config.variant ?? "swiss"];
  return <V config={config} items={contentItems} />;
}
