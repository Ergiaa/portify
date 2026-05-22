import type { ComponentType } from "react";
import { ContactSwiss } from "./contact/ContactSwiss";
import { ContactEditorial } from "./contact/ContactEditorial";
import { ContactGlass } from "./contact/ContactGlass";
import { ContactY2K } from "./contact/ContactY2K";
import { ContactBento } from "./contact/ContactBento";

type Variant = "swiss" | "editorial" | "glass" | "y2k" | "bento";

interface Props {
  config: {
    title: string;
    description?: string;
    availability?: string;
    email: string;
    phone?: string;
    socials: { platform: string; url: string }[];
    variant?: Variant;
  };
}

const VARIANTS: Record<Variant, ComponentType<{ config: any }>> = {
  swiss: ContactSwiss,
  editorial: ContactEditorial,
  glass: ContactGlass,
  y2k: ContactY2K,
  bento: ContactBento,
};

export function ContactSection({ config }: Props) {
  const V = VARIANTS[config.variant ?? "swiss"];
  return <V config={config} />;
}
