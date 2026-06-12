import { useState } from "react";
import { PUBLIC_SERVER_URL } from "astro:env/client";
import type { SectionConfig } from "./types";

interface Props {
  section: SectionConfig;
  onUpdate: (id: string, partialConfig: Record<string, unknown>) => void;
  onClose: () => void;
}

const inp = "w-full px-3 py-2 text-sm bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500";
const lbl = "block text-xs font-medium text-neutral-400 mb-1";
const fld = "mb-4";

function getToken() {
  return (
    document.cookie
      .split("; ")
      .find((c) => c.startsWith("auth_token="))
      ?.split("=")[1] ?? ""
  );
}

function ImageUploadField({
  label,
  value,
  onChange,
  aspect = "square",
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  aspect?: "square" | "portrait";
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch(`${PUBLIC_SERVER_URL}/uploads/thumbnail`, {
        method: "POST",
        headers: { Authorization: `Bearer ${getToken()}` },
        body: fd,
      });
      const data = await res.json() as { url?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      onChange(data.url!);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className={fld}>
      <label className={lbl}>{label}</label>
      {value && (
        <div className={`w-full mb-2 bg-neutral-800 rounded-lg overflow-hidden ${aspect === "portrait" ? "aspect-[3/4]" : "aspect-square"}`}>
          <img src={value} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex gap-2">
        <input
          className={inp}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste URL or upload…"
        />
        <label className={`shrink-0 flex items-center justify-center w-10 h-[38px] rounded-lg border border-neutral-700 cursor-pointer transition-colors text-sm ${uploading ? "bg-neutral-800 text-neutral-500 cursor-not-allowed" : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"}`}>
          {uploading ? (
            <span className="animate-spin text-xs">⟳</span>
          ) : (
            <span>↑</span>
          )}
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
        </label>
      </div>
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
}

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
          <div className={fld}><label className={lbl}>Visual style</label>
            <select className={inp} value={section.config.variant ?? "swiss"} onChange={(e) => u({ variant: e.target.value })}>
              {["swiss", "editorial", "glass", "y2k", "bento"].map((v) => <option key={v} value={v}>{v}</option>)}
            </select></div>
          <div className={fld}><label className={lbl}>Heading</label>
            <input className={inp} value={section.config.heading} onChange={(e) => u({ heading: e.target.value })} /></div>
          <div className={fld}><label className={lbl}>Subheading</label>
            <input className={inp} value={section.config.subheading} onChange={(e) => u({ subheading: e.target.value })} /></div>
          <div className={fld}><label className={lbl}>CTA Label</label>
            <input className={inp} value={section.config.ctaLabel} onChange={(e) => u({ ctaLabel: e.target.value })} /></div>
          <div className={fld}><label className={lbl}>CTA Link</label>
            <input className={inp} value={section.config.ctaHref} onChange={(e) => u({ ctaHref: e.target.value })} /></div>
          <div className={fld}><label className={lbl}>Tagline (above heading)</label>
            <input className={inp} value={section.config.tagline ?? ""} onChange={(e) => u({ tagline: e.target.value })} /></div>
          <ImageUploadField
            label="Avatar"
            value={section.config.avatarUrl ?? ""}
            onChange={(url) => u({ avatarUrl: url })}
            aspect="square"
          />
          <div className={fld}><label className={lbl}>Secondary CTA Label</label>
            <input className={inp} value={section.config.cta2Label ?? ""} onChange={(e) => u({ cta2Label: e.target.value })} /></div>
          <div className={fld}><label className={lbl}>Secondary CTA Link</label>
            <input className={inp} value={section.config.cta2Href ?? ""} onChange={(e) => u({ cta2Href: e.target.value })} /></div>
          {(section.config.variant ?? "swiss") === "editorial" && (
            <div className={fld}><label className={lbl}>Badge label</label>
              <input className={inp} value={section.config.badge ?? ""} placeholder="e.g. Filmmaker" onChange={(e) => u({ badge: e.target.value })} /></div>
          )}
        </>}

        {section.type === "about" && <>
          <div className={fld}><label className={lbl}>Visual style</label>
            <select className={inp} value={section.config.variant ?? "swiss"} onChange={(e) => u({ variant: e.target.value })}>
              {["swiss", "editorial", "glass", "y2k", "bento"].map((v) => <option key={v} value={v}>{v}</option>)}
            </select></div>
          <div className={fld}><label className={lbl}>Section Title</label>
            <input className={inp} value={section.config.title ?? "About me"} onChange={(e) => u({ title: e.target.value })} /></div>
          <div className={fld}><label className={lbl}>Name</label>
            <input className={inp} value={section.config.name ?? ""} onChange={(e) => u({ name: e.target.value })} /></div>
          <div className={fld}><label className={lbl}>Role / Title</label>
            <input className={inp} value={section.config.role ?? ""} onChange={(e) => u({ role: e.target.value })} /></div>
          <div className={fld}><label className={lbl}>Bio</label>
            <textarea className={`${inp} min-h-[120px] resize-y`} value={section.config.bio}
              onChange={(e) => u({ bio: e.target.value })} /></div>
          <ImageUploadField
            label="Photo"
            value={section.config.photoUrl}
            onChange={(url) => u({ photoUrl: url })}
            aspect="portrait"
          />
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
          <div className={fld}><label className={lbl}>Visual style</label>
            <select className={inp} value={section.config.variant ?? "swiss"} onChange={(e) => u({ variant: e.target.value })}>
              {["swiss", "editorial", "glass", "y2k", "bento"].map((v) => <option key={v} value={v}>{v}</option>)}
            </select></div>
          <div className={fld}><label className={lbl}>Section Title</label>
            <input className={inp} value={section.config.title} onChange={(e) => u({ title: e.target.value })} /></div>
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
          <div className={fld}><label className={lbl}>Visual style</label>
            <select className={inp} value={section.config.variant ?? "swiss"} onChange={(e) => u({ variant: e.target.value })}>
              {["swiss", "editorial", "glass", "y2k", "bento"].map((v) => <option key={v} value={v}>{v}</option>)}
            </select></div>
          <div className={fld}><label className={lbl}>Section Title</label>
            <input className={inp} value={section.config.title} onChange={(e) => u({ title: e.target.value })} /></div>
          <div className={fld}><label className={lbl}>Description</label>
            <input className={inp} value={section.config.description ?? ""} onChange={(e) => u({ description: e.target.value })} /></div>
          <div className={fld}><label className={lbl}>Data source</label>
            <SegmentedControl
              options={["manual", "analytics"]}
              value={section.config.statsSource ?? "manual"}
              onChange={(v) => u({ statsSource: v })}
            /></div>
          {(section.config.statsSource ?? "manual") === "analytics" ? (
            <div className="mb-4 space-y-3">
              <div className={fld}>
                <label className={lbl}>Time period</label>
                <SegmentedControl
                  options={["7d", "30d", "90d", "all"]}
                  value={section.config.statsPeriod ?? "30d"}
                  onChange={(v) => u({ statsPeriod: v })}
                />
              </div>
              <div className={fld}>
                <label className={lbl}>Visible metrics</label>
                <div className="space-y-2">
                  {(["videoViews", "likes", "shares", "comments"] as const).map((key) => {
                    const labels: Record<string, string> = { videoViews: "Video Views", likes: "Likes", shares: "Shares", comments: "Comments" };
                    const visible = section.config.visibleStats ?? ["videoViews", "likes", "shares", "comments"];
                    const checked = visible.includes(key);
                    return (
                      <label key={key} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {
                            const next = checked
                              ? visible.filter((v) => v !== key)
                              : [...visible, key];
                            if (next.length > 0) u({ visibleStats: next });
                          }}
                          className="accent-indigo-500"
                        />
                        <span className="text-sm text-neutral-300">{labels[key]}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
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
          )}
        </>}

        {section.type === "projects" && <>
          <div className={fld}><label className={lbl}>Visual style</label>
            <select className={inp} value={section.config.variant ?? "swiss"} onChange={(e) => u({ variant: e.target.value })}>
              {["swiss", "editorial", "glass", "y2k", "bento"].map((v) => <option key={v} value={v}>{v}</option>)}
            </select></div>
          <div className={fld}><label className={lbl}>Section Title</label>
            <input className={inp} value={section.config.title} onChange={(e) => u({ title: e.target.value })} /></div>
          <div className={fld}><label className={lbl}>Max items</label>
            <input type="number" min={1} max={24} className={inp} value={section.config.limit}
              onChange={(e) => u({ limit: parseInt(e.target.value, 10) || 6 })} /></div>
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
          <div className={fld}><label className={lbl}>Visual style</label>
            <select className={inp} value={section.config.variant ?? "swiss"} onChange={(e) => u({ variant: e.target.value })}>
              {["swiss", "editorial", "glass", "y2k", "bento"].map((v) => <option key={v} value={v}>{v}</option>)}
            </select></div>
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
        {section.type === "analytics" && <>
          <div className={fld}><label className={lbl}>Visual style</label>
            <select className={inp} value={section.config.variant ?? "swiss"} onChange={(e) => u({ variant: e.target.value })}>
              {["swiss", "editorial", "glass", "y2k", "bento"].map((v) => <option key={v} value={v}>{v}</option>)}
            </select></div>
          <div className={fld}><label className={lbl}>Section Title</label>
            <input className={inp} value={section.config.title ?? "My Growth"} onChange={(e) => u({ title: e.target.value })} /></div>
          <div className={fld}><label className={lbl}>Metric</label>
            <select className={inp} value={section.config.metric ?? "videoViews"} onChange={(e) => u({ metric: e.target.value })}>
              <option value="videoViews">Video Views</option>
              <option value="likes">Likes</option>
              <option value="shares">Shares</option>
              <option value="comments">Comments</option>
            </select></div>
          <div className={fld}><label className={lbl}>Time period</label>
            <SegmentedControl
              options={["7d", "30d", "90d", "all"]}
              value={section.config.period ?? "30d"}
              onChange={(v) => u({ period: v })}
            /></div>
          <div className={fld}>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={section.config.showTable ?? false}
                onChange={(e) => u({ showTable: e.target.checked })}
                className="accent-indigo-500"
              />
              <span className="text-sm text-neutral-300">Show daily data table</span>
            </label>
          </div>
        </>}
      </div>
    </div>
  );
}
