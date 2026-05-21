import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { SectionConfig } from "./types";

const LABELS: Record<string, string> = {
  hero: "Hero", about: "About", skills: "Skills",
  stats: "Stats", projects: "Projects", contact: "Contact",
};

interface Props {
  section: SectionConfig;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export function SectionItem({ section, isSelected, onSelect, onDelete }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: section.id });

  return (
    <div ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }}
      className={`flex items-center gap-2 px-3 py-2 mb-1 rounded-lg border transition-colors ${
        isSelected ? "bg-indigo-600/20 border-indigo-500/40" : "border-transparent hover:bg-neutral-800"
      }`}>
      <span {...listeners} {...attributes}
        className="text-neutral-600 hover:text-neutral-400 cursor-grab active:cursor-grabbing text-sm select-none shrink-0">≡</span>
      <button onClick={onSelect} className="flex-1 text-sm text-left text-neutral-200">
        {LABELS[section.type] ?? section.type}
      </button>
      <button onClick={(e) => { e.stopPropagation(); onDelete(); }}
        className="text-neutral-600 hover:text-red-400 text-sm transition-colors shrink-0">×</button>
    </div>
  );
}
