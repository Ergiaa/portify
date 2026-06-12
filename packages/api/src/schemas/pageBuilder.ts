import { z } from "zod";

const envelope = {
  id: z.string(),
  enabled: z.boolean(),
  position: z.number(),
};

const VARIANT = z.enum(["swiss", "editorial", "glass", "y2k", "bento"]).optional().default("swiss");

const HeroSection = z.object({
  ...envelope,
  type: z.literal("hero"),
  config: z.object({
    heading: z.string(),
    subheading: z.string(),
    tagline: z.string().optional().default(""),
    avatarUrl: z.string().optional().default(""),
    ctaLabel: z.string(),
    ctaHref: z.string(),
    cta2Label: z.string().optional().default(""),
    cta2Href: z.string().optional().default(""),
    badge: z.string().optional().default(""),
    variant: VARIANT,
  }),
});

const AboutSection = z.object({
  ...envelope,
  type: z.literal("about"),
  config: z.object({
    title: z.string().optional().default("About me"),
    name: z.string().optional().default(""),
    role: z.string().optional().default(""),
    bio: z.string(),
    photoUrl: z.string(),
    highlights: z
      .array(z.object({ label: z.string(), value: z.string() }))
      .optional()
      .default([]),
    ctaLabel: z.string().optional().default(""),
    ctaHref: z.string().optional().default(""),
    variant: VARIANT,
  }),
});

const SkillsSection = z.object({
  ...envelope,
  type: z.literal("skills"),
  config: z.object({
    title: z.string(),
    description: z.string().optional().default(""),
    skills: z.array(
      z.object({
        name: z.string(),
        level: z.number().min(0).max(100).default(80),
      })
    ),
    variant: VARIANT,
  }),
});

const StatsSection = z.object({
  ...envelope,
  type: z.literal("stats"),
  config: z.object({
    title: z.string(),
    description: z.string().optional().default(""),
    statsSource: z.enum(["manual", "analytics"]).optional().default("manual"),
    statsPeriod: z.enum(["7d", "30d", "90d", "all"]).optional().default("30d"),
    visibleStats: z
      .array(z.enum(["videoViews", "likes", "shares", "comments"]))
      .optional()
      .default(["videoViews", "likes", "shares", "comments"]),
    stats: z.array(
      z.object({
        number: z.string(),
        label: z.string(),
        icon: z.string().optional().default(""),
      })
    ),
    variant: VARIANT,
  }),
});

const ProjectsSection = z.object({
  ...envelope,
  type: z.literal("projects"),
  config: z.object({
    title: z.string(),
    limit: z.number().int().default(6),
    filterType: z
      .enum(["", "video", "article", "podcast", "design"])
      .optional()
      .default(""),
    viewAllLabel: z.string().optional().default(""),
    viewAllHref: z.string().optional().default(""),
    variant: VARIANT,
  }),
});

const ContactSection = z.object({
  ...envelope,
  type: z.literal("contact"),
  config: z.object({
    title: z.string(),
    description: z.string().optional().default(""),
    availability: z.string().optional().default(""),
    email: z.string(),
    phone: z.string().optional().default(""),
    socials: z.array(z.object({ platform: z.string(), url: z.string() })),
    variant: VARIANT,
  }),
});

const AnalyticsSection = z.object({
  ...envelope,
  type: z.literal("analytics"),
  config: z.object({
    title: z.string().optional().default("My Growth"),
    metric: z.enum(["videoViews", "likes", "shares", "comments"]).optional().default("videoViews"),
    period: z.enum(["7d", "30d", "90d", "all"]).optional().default("30d"),
    showTable: z.boolean().optional().default(false),
    variant: VARIANT,
  }),
});

export const SectionSchema = z.discriminatedUnion("type", [
  HeroSection,
  AboutSection,
  SkillsSection,
  StatsSection,
  ProjectsSection,
  ContactSection,
  AnalyticsSection,
]);

export const PageConfigSchema = z.array(SectionSchema);
export type SectionConfig = z.infer<typeof SectionSchema>;
export type PageConfig = z.infer<typeof PageConfigSchema>;
