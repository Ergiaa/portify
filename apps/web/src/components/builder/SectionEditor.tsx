import type { SectionConfig } from "./types";

interface Props {
  section: SectionConfig;
  onUpdate: (id: string, partialConfig: Record<string, unknown>) => void;
  onClose: () => void;
}

const inp = "w-full px-3 py-2 text-sm bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500";
const lbl = "block text-xs font-medium text-neutral-400 mb-1";
const fld = "mb-4";

function SegmentedControl({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-1 p-1 bg-neutral-800 rounded-lg">
      {options.map((v) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          className={`flex-1 py-1.5 text-xs rounded-md transition-colors capitalize ${
            value === v
              ? "bg-neutral-600 text-white"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          {v}
        </button>
      ))}
    </div>
  );
}

export function SectionEditor({ section, onUpdate, onClose }: Props) {
  const u = (patch: Record<string, unknown>) => onUpdate(section.id, patch);

  return (
    <div className="w-80 shrink-0 border-l border-neutral-800 bg-neutral-900 overflow-y-auto">
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800 sticky top-0 bg-neutral-900 z-10">
        <p className="text-sm font-semibold text-white capitalize">{section.type} Settings</p>
        <button onClick={onClose} className="text-neutral-500 hover:text-white text-xl leading-none">×</button>
      </div>
      <div className="p-4">
        {section.type === "hero" && <>
          <div className={fld}><label className={lbl}>Heading</label>
            <input className={inp} value={section.config.heading} onChange={(e) => u({ heading: e.target.value })} /></div>
          <div className={fld}><label className={lbl}>Subheading</label>
            <input className={inp} value={section.config.subheading} onChange={(e) => u({ subheading: e.target.value })} /></div>
          <div className={fld}><label className={lbl}>CTA Label</label>
            <input className={inp} value={section.config.ctaLabel} onChange={(e) => u({ ctaLabel: e.target.value })} /></div>
          <div className={fld}><label className={lbl}>CTA Link</label>
            <input className={inp} value={section.config.ctaHref} onChange={(e) => u({ ctaHref: e.target.value })} /></div>
          <div className={fld}><label className={lbl}>Layout</label>
            <SegmentedControl
              options={["centered", "split"]}
              value={section.config.layout ?? "centered"}
              onChange={(v) => u({ layout: v })}
            /></div>
          <div className={fld}><label className={lbl}>Tagline (above heading)</label>
            <input className={inp} value={section.config.tagline ?? ""} onChange={(e) => u({ tagline: e.target.value })} /></div>
          <div className={fld}><label className={lbl}>Avatar URL</label>
            <input className={inp} value={section.config.avatarUrl ?? ""} onChange={(e) => u({ avatarUrl: e.target.value })} /></div>
          <div className={fld}><label className={lbl}>Secondary CTA Label</label>
            <input className={inp} value={section.config.cta2Label ?? ""} onChange={(e) => u({ cta2Label: e.target.value })} /></div>
          <div className={fld}><label className={lbl}>Secondary CTA Link</label>
            <input className={inp} value={section.config.cta2Href ?? ""} onChange={(e) => u({ cta2Href: e.target.value })} /></div>
        </>}

        {section.type === "about" && <>
          <div className={fld}><label className={lbl}>Section Title</label>
            <input className={inp} value={section.config.title ?? "About me"} onChange={(e) => u({ title: e.target.value })} /></div>
          <div className={fld}><label className={lbl}>Name</label>
            <input className={inp} value={section.config.name ?? ""} onChange={(e) => u({ name: e.target.value })} /></div>
          <div className={fld}><label className={lbl}>Role / Title</label>
            <input className={inp} value={section.config.role ?? ""} onChange={(e) => u({ role: e.target.value })} /></div>
          <div className={fld}><label className={lbl}>Bio</label>
            <textarea className={`${inp} min-h-[120px] resize-y`} value={section.config.bio}
              onChange={(e) => u({ bio: e.target.value })} /></div>
          <div className={fld}><label className={lbl}>Photo URL</label>
            <input className={inp} value={section.config.photoUrl} onChange={(e) => u({ photoUrl: e.target.value })} /></div>
          <div className={fld}><label className={lbl}>Photo Position</label>
            <SegmentedControl
              options={["left", "right"]}
              value={section.config.photoPosition ?? "left"}
              onChange={(v) => u({ photoPosition: v })}
            /></div>
          <div className={fld}><label className={lbl}>CTA Label</label>
            <input className={inp} value={section.config.ctaLabel ?? ""} onChange={(e) => u({ ctaLabel: e.target.value })} /></div>
          <div className={fld}><label className={lbl}>CTA Link</label>
            <input className={inp} value={section.config.ctaHref ?? ""} onChange={(e) => u({ ctaHref: e.target.value })} /></div>
          <div className={fld}>
            <label className={lbl}>Highlights</label>
            {(section.config.highlights ?? []).map((h, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input className={inp} placeholder="Label" value={h.label}
                  onChange={(e) => {
                    const arr = [...(section.config.highlights ?? [])];
                    arr[i] = { ...arr[i], label: e.target.value };
                    u({ highlights: arr });
                  }} />
                <input className={inp} placeholder="Value" value={h.value}
                  onChange={(e) => {
                    const arr = [...(section.config.highlights ?? [])];
                    arr[i] = { ...arr[i], value: e.target.value };
                    u({ highlights: arr });
                  }} />
                <button className="text-neutral-500 hover:text-red-400 shrink-0"
                  onClick={() => u({ highlights: (section.config.highlights ?? []).filter((_, j) => j !== i) })}>×</button>
              </div>
            ))}
            <button className="text-xs text-indigo-400 hover:text-indigo-300"
              onClick={() => u({ highlights: [...(section.config.highlights ?? []), { label: "", value: "" }] })}>+ Add highlight</button>
          </div>
        </>}

        {section.type === "skills" && <>
          <div className={fld}><label className={lbl}>Section Title</label>
            <input className={inp} value={section.config.title} onChange={(e) => u({ title: e.target.value })} /></div>
          <div className={fld}><label className={lbl}>Layout</label>
            <SegmentedControl
              options={["tags", "bars"]}
              value={section.config.layout ?? "tags"}
              onChange={(v) => u({ layout: v })}
            /></div>
          <div className={fld}><label className={lbl}>Description</label>
            <input className={inp} value={section.config.description ?? ""} onChange={(e) => u({ description: e.target.value })} /></div>
          <div className={fld}>
            <label className={lbl}>Skills</label>
            {section.config.skills.map((skill, i) => (
              <div key={i} className="flex gap-2 mb-2 items-center">
                <input className={inp} placeholder="Skill name" value={skill.name}
                  onChange={(e) => {
                    const arr = [...section.config.skills];
                    arr[i] = { ...arr[i], name: e.target.value };
                    u({ skills: arr });
                  }} />
                <input
                  type="number" min={0} max={100}
                  className="w-20 shrink-0 px-3 py-2 text-sm bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  placeholder="0–100" value={skill.level}
                  onChange={(e) => {
                    const arr = [...section.config.skills];
                    arr[i] = { ...arr[i], level: parseInt(e.target.value, 10) || 0 };
                    u({ skills: arr });
                  }} />
                <button className="text-neutral-500 hover:text-red-400 shrink-0"
                  onClick={() => u({ skills: section.config.skills.filter((_, j) => j !== i) })}>×</button>
              </div>
            ))}
            <button className="text-xs text-indigo-400 hover:text-indigo-300"
              onClick={() => u({ skills: [...section.config.skills, { name: "", level: 80 }] })}>+ Add skill</button>
          </div>
        </>}

        {section.type === "stats" && <>
          <div className={fld}><label className={lbl}>Section Title</label>
            <input className={inp} value={section.config.title} onChange={(e) => u({ title: e.target.value })} /></div>
          <div className={fld}><label className={lbl}>Layout</label>
            <SegmentedControl
              options={["inline", "cards"]}
              value={section.config.layout ?? "inline"}
              onChange={(v) => u({ layout: v })}
            /></div>
          <div className={fld}><label className={lbl}>Description</label>
            <input className={inp} value={section.config.description ?? ""} onChange={(e) => u({ description: e.target.value })} /></div>
          <div className={fld}>
            <label className={lbl}>Stats</label>
            {section.config.stats.map((stat, i) => (
              <div key={i} className="flex gap-2 mb-2 items-center">
                <input className="w-12 shrink-0 px-2 py-2 text-sm bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 text-center"
                  placeholder="🚀" value={stat.icon ?? ""}
                  onChange={(e) => { const s = [...section.config.stats]; s[i] = { ...s[i], icon: e.target.value }; u({ stats: s }); }} />
                <input className={inp} placeholder="50+" value={stat.number}
                  onChange={(e) => { const s = [...section.config.stats]; s[i] = { ...s[i], number: e.target.value }; u({ stats: s }); }} />
                <input className={inp} placeholder="Label" value={stat.label}
                  onChange={(e) => { const s = [...section.config.stats]; s[i] = { ...s[i], label: e.target.value }; u({ stats: s }); }} />
                <button className="text-neutral-500 hover:text-red-400 shrink-0"
                  onClick={() => u({ stats: section.config.stats.filter((_, j) => j !== i) })}>×</button>
              </div>
            ))}
            <button className="text-xs text-indigo-400 hover:text-indigo-300"
              onClick={() => u({ stats: [...section.config.stats, { number: "", label: "", icon: "" }] })}>+ Add stat</button>
          </div>
        </>}

        {section.type === "projects" && <>
          <div className={fld}><label className={lbl}>Section Title</label>
            <input className={inp} value={section.config.title} onChange={(e) => u({ title: e.target.value })} /></div>
          <div className={fld}><label className={lbl}>Max items</label>
            <input type="number" min={1} max={24} className={inp} value={section.config.limit}
              onChange={(e) => u({ limit: parseInt(e.target.value, 10) || 6 })} /></div>
          <div className={fld}><label className={lbl}>Layout</label>
            <SegmentedControl
              options={["grid", "list"]}
              value={section.config.layout ?? "grid"}
              onChange={(v) => u({ layout: v })}
            /></div>
          <div className={fld}><label className={lbl}>Filter by type</label>
            <select className={inp} value={section.config.filterType ?? ""} onChange={(e) => u({ filterType: e.target.value })}>
              <option value="">All types</option>
              <option value="video">Video</option>
              <option value="article">Article</option>
              <option value="podcast">Podcast</option>
              <option value="design">Design</option>
            </select></div>
          <div className={fld}><label className={lbl}>"View All" Label</label>
            <input className={inp} value={section.config.viewAllLabel ?? ""} onChange={(e) => u({ viewAllLabel: e.target.value })} /></div>
          <div className={fld}><label className={lbl}>"View All" Link</label>
            <input className={inp} value={section.config.viewAllHref ?? ""} onChange={(e) => u({ viewAllHref: e.target.value })} /></div>
        </>}

        {section.type === "contact" && <>
          <div className={fld}><label className={lbl}>Section Title</label>
            <input className={inp} value={section.config.title} onChange={(e) => u({ title: e.target.value })} /></div>
          <div className={fld}><label className={lbl}>Description</label>
            <textarea className={`${inp} min-h-[80px] resize-y`} value={section.config.description ?? ""}
              onChange={(e) => u({ description: e.target.value })} /></div>
          <div className={fld}><label className={lbl}>Availability</label>
            <input className={inp} value={section.config.availability ?? ""} placeholder="e.g. Open to freelance" onChange={(e) => u({ availability: e.target.value })} /></div>
          <div className={fld}><label className={lbl}>Email</label>
            <input type="email" className={inp} value={section.config.email}
              onChange={(e) => u({ email: e.target.value })} /></div>
          <div className={fld}><label className={lbl}>Phone</label>
            <input type="tel" className={inp} value={section.config.phone ?? ""} onChange={(e) => u({ phone: e.target.value })} /></div>
          <div className={fld}>
            <label className={lbl}>Social Links</label>
            {section.config.socials.map((s, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input className={inp} placeholder="Platform" value={s.platform}
                  onChange={(e) => { const arr = [...section.config.socials]; arr[i] = { ...arr[i], platform: e.target.value }; u({ socials: arr }); }} />
                <input className={inp} placeholder="URL" value={s.url}
                  onChange={(e) => { const arr = [...section.config.socials]; arr[i] = { ...arr[i], url: e.target.value }; u({ socials: arr }); }} />
                <button className="text-neutral-500 hover:text-red-400 shrink-0"
                  onClick={() => u({ socials: section.config.socials.filter((_, j) => j !== i) })}>×</button>
              </div>
            ))}
            <button className="text-xs text-indigo-400 hover:text-indigo-300"
              onClick={() => u({ socials: [...section.config.socials, { platform: "", url: "" }] })}>+ Add social</button>
          </div>
        </>}
      </div>
    </div>
  );
}
