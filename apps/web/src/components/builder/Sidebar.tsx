import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import type { Dispatch, SetStateAction } from "react";
import type { SectionConfig } from "./types";
import { SectionItem } from "./SectionItem";

const SECTION_TYPES = [
  { type: "hero", label: "Hero", icon: "⊞" },
  { type: "about", label: "About", icon: "◎" },
  { type: "skills", label: "Skills", icon: "◈" },
  { type: "stats", label: "Stats", icon: "▦" },
  { type: "projects", label: "Projects", icon: "⊟" },
  { type: "contact", label: "Contact", icon: "◉" },
] as const;

const DEFAULTS: Record<string, object> = {
  hero: {
    heading: "I'm Nasrudin",
    subheading: "I review films and tell stories.",
    tagline: "Hey there, I'm",
    avatarUrl: "",
    layout: "centered",
    ctaLabel: "Hire me",
    ctaHref: "/hire-me",
    cta2Label: "See my work",
    cta2Href: "#projects",
    badge: "",
  },
  about: {
    title: "About me",
    name: "",
    role: "",
    bio: "Write something about yourself.",
    photoUrl: "",
    photoPosition: "left",
    highlights: [],
    ctaLabel: "",
    ctaHref: "",
  },
  skills: {
    title: "Skills",
    description: "",
    layout: "tags",
    skills: [
      { name: "Design", level: 85 },
      { name: "Development", level: 70 },
    ],
  },
  stats: {
    title: "By the numbers",
    description: "",
    layout: "inline",
    stats: [{ number: "50+", label: "Projects", icon: "🚀" }],
  },
  projects: {
    title: "My Work",
    limit: 6,
    layout: "grid",
    filterType: "",
    viewAllLabel: "",
    viewAllHref: "",
  },
  contact: {
    title: "Get in Touch",
    description: "I'm open to freelance work and collaborations.",
    availability: "",
    email: "",
    phone: "",
    socials: [],
  },
};

interface Props {
  sections: SectionConfig[];
  setSections: Dispatch<SetStateAction<SectionConfig[]>>;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
}

export function Sidebar({ sections, setSections, selectedId, setSelectedId }: Props) {
  const addSection = (type: string) => {
    const newSection = {
      id: crypto.randomUUID(),
      type,
      enabled: true,
      position: sections.length,
      config: DEFAULTS[type] ?? {},
    } as SectionConfig;
    setSections((prev) => [...prev, newSection]);
    setSelectedId(newSection.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setSections((prev) => {
      const oldIndex = prev.findIndex((s) => s.id === active.id);
      const newIndex = prev.findIndex((s) => s.id === over.id);
      return arrayMove(prev, oldIndex, newIndex).map((s, i) => ({ ...s, position: i }));
    });
  };

  const deleteSection = (id: string) => {
    setSections((prev) => prev.filter((s) => s.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  return (
    <aside className="w-72 shrink-0 border-r border-neutral-800 bg-neutral-900 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-neutral-800">
        <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Add Section</p>
        <div className="grid grid-cols-2 gap-2">
          {SECTION_TYPES.map(({ type, label, icon }) => (
            <button key={type} onClick={() => addSection(type)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-300 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors text-left">
              <span className="text-base leading-none">{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 px-1">Sections</p>
        {sections.length === 0 && (
          <p className="text-xs text-neutral-600 px-1 mt-2">No sections yet. Add one above.</p>
        )}
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
            {sections.map((section) => (
              <SectionItem key={section.id} section={section}
                isSelected={section.id === selectedId}
                onSelect={() => setSelectedId(section.id)}
                onDelete={() => deleteSection(section.id)} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </aside>
  );
}
