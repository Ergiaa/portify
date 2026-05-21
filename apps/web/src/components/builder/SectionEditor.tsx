import type { SectionConfig } from "./types";

interface Props {
  section: SectionConfig;
  onUpdate: (id: string, partialConfig: Record<string, unknown>) => void;
  onClose: () => void;
}

const inp = "w-full px-3 py-2 text-sm bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500";
const lbl = "block text-xs font-medium text-neutral-400 mb-1";
const fld = "mb-4";

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
        </>}
        {section.type === "about" && <>
          <div className={fld}><label className={lbl}>Bio</label>
            <textarea className={`${inp} min-h-[120px] resize-y`} value={section.config.bio}
              onChange={(e) => u({ bio: e.target.value })} /></div>
          <div className={fld}><label className={lbl}>Photo URL</label>
            <input className={inp} value={section.config.photoUrl} onChange={(e) => u({ photoUrl: e.target.value })} /></div>
        </>}
        {section.type === "skills" && <>
          <div className={fld}><label className={lbl}>Section Title</label>
            <input className={inp} value={section.config.title} onChange={(e) => u({ title: e.target.value })} /></div>
          <div className={fld}><label className={lbl}>Skills (one per line)</label>
            <textarea className={`${inp} min-h-[100px] resize-y`}
              value={section.config.skills.join("\n")}
              onChange={(e) => u({ skills: e.target.value.split("\n").filter(Boolean) })} /></div>
        </>}
        {section.type === "stats" && <>
          <div className={fld}><label className={lbl}>Section Title</label>
            <input className={inp} value={section.config.title} onChange={(e) => u({ title: e.target.value })} /></div>
          <div className={fld}>
            <label className={lbl}>Stats</label>
            {section.config.stats.map((stat, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input className={inp} placeholder="50+" value={stat.number}
                  onChange={(e) => { const s = [...section.config.stats]; s[i] = { ...s[i], number: e.target.value }; u({ stats: s }); }} />
                <input className={inp} placeholder="Label" value={stat.label}
                  onChange={(e) => { const s = [...section.config.stats]; s[i] = { ...s[i], label: e.target.value }; u({ stats: s }); }} />
                <button className="text-neutral-500 hover:text-red-400 shrink-0"
                  onClick={() => u({ stats: section.config.stats.filter((_, j) => j !== i) })}>×</button>
              </div>
            ))}
            <button className="text-xs text-indigo-400 hover:text-indigo-300"
              onClick={() => u({ stats: [...section.config.stats, { number: "", label: "" }] })}>+ Add stat</button>
          </div>
        </>}
        {section.type === "projects" && <>
          <div className={fld}><label className={lbl}>Section Title</label>
            <input className={inp} value={section.config.title} onChange={(e) => u({ title: e.target.value })} /></div>
          <div className={fld}><label className={lbl}>Max items</label>
            <input type="number" min={1} max={24} className={inp} value={section.config.limit}
              onChange={(e) => u({ limit: parseInt(e.target.value, 10) || 6 })} /></div>
        </>}
        {section.type === "contact" && <>
          <div className={fld}><label className={lbl}>Section Title</label>
            <input className={inp} value={section.config.title} onChange={(e) => u({ title: e.target.value })} /></div>
          <div className={fld}><label className={lbl}>Email</label>
            <input type="email" className={inp} value={section.config.email}
              onChange={(e) => u({ email: e.target.value })} /></div>
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
