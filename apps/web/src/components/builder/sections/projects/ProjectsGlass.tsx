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

export function ProjectsGlass({ config, items }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%", position: "relative", overflow: "hidden",
      background: "linear-gradient(135deg,#ffe3d4,#e6d4ff 60%,#d4eaff)",
      fontFamily: "Plus Jakarta Sans, sans-serif", color: "#241a3a",
      padding: 36, boxSizing: "border-box",
    }}>
      <style>{`.proj-glass-card:hover{transform:translateY(-4px);box-shadow:0 24px 50px -16px rgba(80,40,140,0.3)}.proj-glass-card:hover .proj-glass-overlay{opacity:1}`}</style>
      <div style={{
        position: "absolute", width: 360, height: 360, borderRadius: "50%",
        background: "radial-gradient(circle,#ff9ec8,transparent 70%)", top: -90, right: -60, filter: "blur(40px)",
      }} />

      <div style={{
        position: "relative", zIndex: 2, display: "flex",
        justifyContent: "space-between", alignItems: "baseline", marginBottom: 22,
      }}>
        <h2 style={{ margin: 0, fontSize: 32, fontWeight: 800, letterSpacing: "-0.02em" }}>{config.title}</h2>
        <a href={config.viewAllHref ?? "#"} style={{
          fontSize: 13, fontWeight: 600, color: "#241a3a",
          padding: "8px 16px", borderRadius: 999,
          background: "rgba(255,255,255,0.5)", backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.7)", textDecoration: "none",
        }}>
          {config.viewAllLabel ?? "Browse archive"} →
        </a>
      </div>

      <div style={{
        position: "relative", zIndex: 2, display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)", gap: 14,
      }}>
        {items.slice(0, 6).map((item) => (
          <a key={item.id} className="proj-glass-card" style={{
            background: "rgba(255,255,255,0.4)", backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.65)", borderRadius: 22,
            padding: 12, boxShadow: "0 16px 40px -16px rgba(80,40,140,0.2)",
            cursor: "pointer", textDecoration: "none", color: "#241a3a",
            display: "block", transition: "transform 250ms, box-shadow 250ms",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "relative" }}>
              <div style={{ aspectRatio: "4/3", borderRadius: 14, overflow: "hidden" }}>
                {item.thumbnailUrl
                  ? <img src={item.thumbnailUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <div style={{ width: "100%", height: "100%", background: "#1e1e24", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 10, color: "#666" }}>{item.type}</span></div>
                }
              </div>
              <span style={{
                position: "absolute", top: 8, left: 8, padding: "4px 10px", borderRadius: 999,
                background: "rgba(255,255,255,0.75)", backdropFilter: "blur(8px)",
                fontSize: 10, fontWeight: 700, color: TYPE_COLOR[item.type] ?? "#888",
                textTransform: "uppercase", letterSpacing: "0.08em",
              }}>{item.type}</span>
              <div className="proj-glass-overlay" style={{
                position: "absolute", inset: 0, borderRadius: 14,
                background: "rgba(36,26,58,0.55)", backdropFilter: "blur(6px)",
                display: "grid", placeItems: "center",
                opacity: 0, transition: "opacity 200ms",
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: "rgba(255,255,255,0.95)", display: "grid", placeItems: "center",
                  color: "#241a3a",
                }}>
                  <Icons.play />
                </div>
              </div>
            </div>
            <p style={{ margin: "12px 4px 4px", fontSize: 14, fontWeight: 700, lineHeight: 1.25 }}>
              {item.title}
            </p>
            <p style={{ margin: "0 4px 4px", fontSize: 11, color: "#6b5495" }}>
              {item.platform ?? item.type} · {item.duration ?? "—"}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
