import { useEffect, useState } from "react";
import { adminOrpc } from "../../../lib/admin-orpc";

interface Props {
  config: { title: string; limit: number };
}

interface Item {
  id: string;
  title: string;
  type: string;
  status: string;
}

export function ProjectsSection({ config }: Props) {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    adminOrpc.content.list({ status: "published", limit: config.limit }).then((res) => {
      setItems(res.items);
    }).catch(() => {});
  }, [config.limit]);

  return (
    <section className="px-12 py-14 bg-neutral-950">
      <h2 className="text-2xl font-bold text-white mb-8 text-center">{config.title || "My Work"}</h2>
      {items.length === 0 ? (
        <p className="text-center text-neutral-600 text-sm">No published content yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 max-w-3xl mx-auto">
          {items.map((item) => (
            <div key={item.id} className="p-4 bg-neutral-800 rounded-xl border border-neutral-700">
              <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">{item.type}</p>
              <p className="text-sm font-medium text-white">{item.title}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
