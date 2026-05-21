import { z } from "zod";

const envelope = {
  id: z.string(),
  enabled: z.boolean(),
  position: z.number(),
};

const HeroSection = z.object({
  ...envelope,
  type: z.literal("hero"),
  config: z.object({
    heading: z.string(),
    subheading: z.string(),
    ctaLabel: z.string(),
    ctaHref: z.string(),
  }),
});

const AboutSection = z.object({
  ...envelope,
  type: z.literal("about"),
  config: z.object({
    bio: z.string(),
    photoUrl: z.string(),
  }),
});

const SkillsSection = z.object({
  ...envelope,
  type: z.literal("skills"),
  config: z.object({
    title: z.string(),
    skills: z.array(z.string()),
  }),
});

const StatsSection = z.object({
  ...envelope,
  type: z.literal("stats"),
  config: z.object({
    title: z.string(),
    stats: z.array(z.object({ number: z.string(), label: z.string() })),
  }),
});

const ProjectsSection = z.object({
  ...envelope,
  type: z.literal("projects"),
  config: z.object({
    title: z.string(),
    limit: z.number().int().default(6),
  }),
});

const ContactSection = z.object({
  ...envelope,
  type: z.literal("contact"),
  config: z.object({
    title: z.string(),
    email: z.string(),
    socials: z.array(z.object({ platform: z.string(), url: z.string() })),
  }),
});

export const SectionSchema = z.discriminatedUnion("type", [
  HeroSection,
  AboutSection,
  SkillsSection,
  StatsSection,
  ProjectsSection,
  ContactSection,
]);

export const PageConfigSchema = z.array(SectionSchema);
export type SectionConfig = z.infer<typeof SectionSchema>;
export type PageConfig = z.infer<typeof PageConfigSchema>;
