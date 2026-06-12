import type { SectionConfig } from "./types";
import { HeroSection } from "./sections/HeroSection";
import { AboutSection } from "./sections/AboutSection";
import { SkillsSection } from "./sections/SkillsSection";
import { StatsSectionLive } from "./sections/StatsSectionLive";
import { ProjectsSection } from "./sections/ProjectsSection";
import { ContactSection } from "./sections/ContactSection";
import { AnalyticsSectionLive } from "./sections/AnalyticsSectionLive";

interface Props {
  sections: SectionConfig[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function Preview({ sections, selectedId, onSelect }: Props) {
  const sorted = [...sections].filter((s) => s.enabled).sort((a, b) => a.position - b.position);

  if (sorted.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-neutral-600 text-sm">
        Add sections from the sidebar to preview your page.
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-neutral-950">
      <div className="max-w-4xl mx-auto">
        {sorted.map((section) => (
          <div key={section.id} onClick={() => onSelect(section.id)}
            className={`cursor-pointer transition-all ${
              section.id === selectedId
                ? "ring-2 ring-inset ring-indigo-500"
                : "hover:ring-1 hover:ring-inset hover:ring-neutral-700"
            }`}>
            {section.type === "hero" && <HeroSection config={section.config} />}
            {section.type === "about" && <AboutSection config={section.config} />}
            {section.type === "skills" && <SkillsSection config={section.config} />}
            {section.type === "stats" && <StatsSectionLive config={section.config} />}
            {section.type === "projects" && <ProjectsSection config={section.config} />}
            {section.type === "contact" && <ContactSection config={section.config} />}
            {section.type === "analytics" && <AnalyticsSectionLive config={section.config} />}
          </div>
        ))}
      </div>
    </div>
  );
}
