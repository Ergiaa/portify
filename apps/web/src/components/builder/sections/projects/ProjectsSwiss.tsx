import { Icons } from "../../shared/Icons";

interface ContentItem {
  id: string;
  title: string;
  type: string;
  platform?: string | null;
  publishedAt?: Date | null;
  thumbnailUrl?: string | null;
  duration?: string | null;
}

interface Props {
  config: {
    title: string;
    limit: number;
    layout?: string;
    filterType?: string;
    viewAllLabel?: string;
    viewAllHref?: string;
    variant?: string;
  };
  items: ContentItem[];
}

const TYPE_COLOR: Record<string, string> = {
  video: "#e85a5a", article: "#5a8ae8", podcast: "#5ae89a", design: "#e8c25a",
};

export function ProjectsSwiss({ config, items }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%", background: "#fafaf7", color: "#111",
      fontFamily: "Geist, sans-serif", padding: "44px 56px", boxSizing: "border-box",
      overflow: "hidden",
    }}>
      <style>{`.proj-swiss-row:hover{background:#111;color:#fff;padding-left:12px!important}.proj-swiss-row:hover span,.proj-swiss-row:hover svg{color:#fff!important}`}</style>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "baseline",
        borderBottom: "1px solid #111", paddingBottom: 14, marginBottom: 18,
      }}>
        <h2 style={{ fontSize: 34, fontWeight: 500, letterSpacing: "-0.02em", margin: 0 }}>{config.title}</h2>
        <a href={config.viewAllHref ?? "#"} style={{ fontSize: 14, color: "#111", textDecoration: "underline", textUnderlineOffset: 4 }}>
          {config.viewAllLabel ?? "Browse archive"} →
        </a>
      </div>

      <div>
        <div style={{
          display: "grid", gridTemplateColumns: "40px 1.6fr 1fr 100px 100px 24px",
          padding: "8px 0", fontFamily: "Geist Mono, monospace", fontSize: 10,
          color: "#888", letterSpacing: "0.12em", textTransform: "uppercase",
          borderBottom: "1px solid #d8d4c8",
        }}>
          <span>#</span><span>Title</span><span>Type</span><span>Year</span><span>Time</span><span></span>
        </div>
        {items.map((item, i) => (
          <a key={item.id} className="proj-swiss-row" style={{
            display: "grid", gridTemplateColumns: "40px 1.6fr 1fr 100px 100px 24px",
            padding: "16px 0", borderBottom: "1px solid #e6e2d8",
            fontSize: 14, alignItems: "center", color: "#111", textDecoration: "none",
            transition: "background 200ms, transform 200ms",
          }}>
            <span style={{ fontFamily: "Geist Mono, monospace", fontSize: 11, color: "#888" }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span style={{ fontWeight: 500, fontSize: 15 }}>{item.title}</span>
            <span style={{
              fontFamily: "Geist Mono, monospace", fontSize: 11, color: "#666",
              letterSpacing: "0.05em", textTransform: "uppercase",
            }}>{item.type}{item.platform ? ` · ${item.platform}` : ""}</span>
            <span style={{ fontFamily: "Geist Mono, monospace", fontSize: 11, color: "#666" }}>
              {item.publishedAt ? new Date(item.publishedAt).getFullYear() : "—"}
            </span>
            <span style={{ fontFamily: "Geist Mono, monospace", fontSize: 11, color: "#666" }}>{item.duration ?? "—"}</span>
            <Icons.arrowUR style={{ color: "#888" }} />
          </a>
        ))}
      </div>
    </div>
  );
}
