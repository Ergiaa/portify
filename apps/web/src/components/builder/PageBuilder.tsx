import { useEffect, useState } from "react";
import { adminOrpc } from "../../lib/admin-orpc";
import type { SectionConfig } from "./types";
import { PageConfigSchema } from "@portify/api/schemas/pageBuilder";
import { Sidebar } from "./Sidebar";
import { Preview } from "./Preview";
import { SectionEditor } from "./SectionEditor";

export function PageBuilder() {
  const [sections, setSections] = useState<SectionConfig[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");

  useEffect(() => {
    adminOrpc.pageBuilder.getConfig().then((data) => {
      if (!data) return;
      const parsed = PageConfigSchema.safeParse(data.modules);
      if (parsed.success) setSections(parsed.data);
    });
  }, []);

  const selectedSection = sections.find((s) => s.id === selectedId) ?? null;

  const handleUpdate = (id: string, partialConfig: Record<string, unknown>) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === id
          ? ({ ...s, config: { ...s.config, ...partialConfig } } as SectionConfig)
          : s
      )
    );
  };

  const handleSave = async (isDraft: boolean) => {
    setSaving(true);
    try {
      if (isDraft) await adminOrpc.pageBuilder.saveConfig(sections);
      else await adminOrpc.pageBuilder.publish(sections);
      setStatus("saved");
    } catch {
      setStatus("error");
    } finally {
      setSaving(false);
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-neutral-950 text-white">
      <div className="flex items-center justify-between px-6 py-3 border-b border-neutral-800 bg-neutral-950 shrink-0">
        <div className="flex items-center gap-4">
          <a href="/admin" className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors">← Admin</a>
          <span className="text-sm font-semibold text-white">Page Builder</span>
        </div>
        <div className="flex items-center gap-2">
          {status === "saved" && <span className="text-xs text-green-400">Saved</span>}
          {status === "error" && <span className="text-xs text-red-400">Error saving</span>}
          <button onClick={() => handleSave(true)} disabled={saving}
            className="px-4 py-2 text-sm bg-neutral-800 text-white border border-neutral-700 rounded-lg hover:bg-neutral-700 transition-colors disabled:opacity-50">
            Save Draft
          </button>
          <button onClick={() => handleSave(false)} disabled={saving}
            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors disabled:opacity-50">
            Publish
          </button>
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar sections={sections} setSections={setSections} selectedId={selectedId} setSelectedId={setSelectedId} />
        <div className="flex flex-1 overflow-hidden">
          {selectedSection && (
            <SectionEditor section={selectedSection} onUpdate={handleUpdate} onClose={() => setSelectedId(null)} />
          )}
          <Preview sections={sections} selectedId={selectedId} onSelect={setSelectedId} />
        </div>
      </div>
    </div>
  );
}
