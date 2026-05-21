import { useEffect, useState } from "react";
import { adminOrpc } from "../../../lib/admin-orpc";

interface Props {
  config: {
    title: string; limit: number; layout?: "grid" | "list";
    filterType?: string; viewAllLabel?: string; viewAllHref?: string;
  };
}
interface Item {
  id: string; title: string; type: string; status: string;
  thumbnailUrl: string | null; description: string | null;
  externalUrl: string | null; platform: string | null;
}

const TYPE_COLORS: Record<string, string> = {
  video: "text-red-400", article: "text-blue-400",
  podcast: "text-green-400", design: "text-yellow-400",
};

export function ProjectsSection({ config }: Props) {
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    const input: Record<string, unknown> = { status: "published", limit: config.limit };
    if (config.filterType) input.type = config.filterType;
    adminOrpc.content.list(input as Parameters<typeof adminOrpc.content.list>[0])
      .then((res) => setItems(res.items as Item[]))
      .catch(() => {});
  }, [config.limit, config.filterType]);

  const isList = config.layout === "list";

  return (
    <section className="px-12 py-14 bg-neutral-950">
      <h2 className="text-2xl font-bold text-white mb-8 text-center">{config.title || "My Work"}</h2>
      {items.length === 0 ? (
        <p className="text-center text-neutral-600 text-sm">No published content yet.</p>
      ) : isList ? (
        <div className="max-w-3xl mx-auto space-y-3">
          {items.map((item) => (
            <a key={item.id} href={item.externalUrl ?? "#"} target="_blank" rel="noopener noreferrer"
              className="flex gap-4 p-4 bg-neutral-800 rounded-xl border border-neutral-700 hover:border-neutral-500 transition-colors group">
              <div className="w-24 h-16 rounded-lg bg-neutral-700 shrink-0 overflow-hidden">
                {item.thumbnailUrl
                  ? <img src={item.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center text-neutral-500 text-xs uppercase">{item.type[0]}</div>}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${TYPE_COLORS[item.type] ?? "text-neutral-500"}`}>{item.type}</p>
                <p className="text-sm font-medium text-white truncate">{item.title}</p>
                {item.description && <p className="text-xs text-neutral-500 mt-1 line-clamp-1">{item.description}</p>}
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 max-w-3xl mx-auto">
          {items.map((item) => (
            <a key={item.id} href={item.externalUrl ?? "#"} target="_blank" rel="noopener noreferrer"
              className="bg-neutral-800 rounded-xl border border-neutral-700 hover:border-neutral-500 transition-colors overflow-hidden group block">
              <div className="aspect-video bg-neutral-700 overflow-hidden">
                {item.thumbnailUrl
                  ? <img src={item.thumbnailUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  : <div className="w-full h-full flex items-center justify-center text-4xl text-neutral-600 uppercase">{item.type[0]}</div>}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className={`text-xs font-semibold uppercase tracking-wider ${TYPE_COLORS[item.type] ?? "text-neutral-500"}`}>{item.type}</p>
                  {item.platform && <span className="text-xs text-neutral-600 capitalize">{item.platform}</span>}
                </div>
                <p className="text-sm font-semibold text-white">{item.title}</p>
                {item.description && <p className="text-xs text-neutral-500 mt-1 line-clamp-2">{item.description}</p>}
              </div>
            </a>
          ))}
        </div>
      )}
      {config.viewAllLabel && config.viewAllHref && (
        <div className="text-center mt-8">
          <a href={config.viewAllHref} className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors">
            {config.viewAllLabel} →
          </a>
        </div>
      )}
    </section>
  );
}
