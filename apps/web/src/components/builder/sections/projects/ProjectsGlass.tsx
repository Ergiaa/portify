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

const skin = {
  bg: "#eef0f7", panel: "rgba(255,255,255,0.55)", ink: "#241d3a", sub: "#534c70", mute: "#837da0",
  accent: "#6d5cf5", line: "rgba(109,92,245,0.18)", soft: "rgba(255,255,255,0.4)",
  fontBody: "'Plus Jakarta Sans', sans-serif", fontHead: "'Plus Jakarta Sans', sans-serif", fontMono: "'Geist Mono', monospace",
  radius: 20,
  blobA: "rgba(167,139,255,0.45)", blobB: "rgba(120,182,255,0.40)",
};

const TYPE_COLOR: Record<string, string> = {
  video: "#e85a5a", article: "#5a8ae8", podcast: "#5ae89a", design: "#e8c25a",
};

export function ProjectsGlass({ config, items }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%", position: "relative", overflow: "hidden",
      background: skin.bg,
      fontFamily: skin.fontBody, color: skin.ink,
      padding: 36, boxSizing: "border-box",
    }}>
      <style>{`.proj-glass-card:hover{transform:translateY(-4px);box-shadow:0 24px 50px -16px rgba(36,29,58,0.2)}.proj-glass-card:hover .proj-glass-overlay{opacity:1}`}</style>
      <div style={{
        position: "absolute", width: 360, height: 360, borderRadius: "50%",
        background: `radial-gradient(circle, ${skin.blobA} 0%, transparent 70%)`,
        top: -90, right: -60, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", width: 280, height: 280, borderRadius: "50%",
        background: `radial-gradient(circle, ${skin.blobB} 0%, transparent 70%)`,
        bottom: -80, left: -40, pointerEvents: "none",
      }} />

      <div style={{
        position: "relative", zIndex: 2, display: "flex",
        justifyContent: "space-between", alignItems: "flex-end", marginBottom: 22,
        flexWrap: "wrap", gap: 16,
      }}>
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 8,
            padding: "6px 14px", borderRadius: 999,
            background: "rgba(255,255,255,0.55)", backdropFilter: "blur(14px)",
            border: "1px solid rgba(255,255,255,0.75)",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4dd884" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: skin.ink, letterSpacing: "0.08em", textTransform: "uppercase" }}>Projects</span>
          </div>
          <h2 style={{ margin: 0, fontSize: 32, fontWeight: 800, letterSpacing: "-0.02em", color: skin.ink }}>{config.title}</h2>
        </div>
        <a href={config.viewAllHref ?? "#"} style={{
          fontSize: 13, fontWeight: 600, color: skin.ink,
          padding: "8px 16px", borderRadius: 999,
          background: "rgba(255,255,255,0.55)", backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.75)", textDecoration: "none",
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
            background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.75)", borderRadius: 22,
            padding: 12, boxShadow: "0 16px 40px -16px rgba(36,29,58,0.1)",
            cursor: "pointer", textDecoration: "none", color: skin.ink,
            display: "block", transition: "transform 250ms, box-shadow 250ms",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "relative" }}>
              <div style={{ aspectRatio: "4/3", borderRadius: 14, overflow: "hidden" }}>
                {item.thumbnailUrl
                  ? <img src={item.thumbnailUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <div style={{ width: "100%", height: "100%", background: skin.soft, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 10, color: skin.mute }}>{item.type}</span></div>
                }
              </div>
              <span style={{
                position: "absolute", top: 8, left: 8, padding: "4px 10px", borderRadius: 999,
                background: "rgba(255,255,255,0.8)", backdropFilter: "blur(8px)",
                fontSize: 10, fontWeight: 700, color: TYPE_COLOR[item.type] ?? skin.mute,
                textTransform: "uppercase", letterSpacing: "0.08em",
              }}>{item.type}</span>
              <div className="proj-glass-overlay" style={{
                position: "absolute", inset: 0, borderRadius: 14,
                background: "rgba(36,29,58,0.45)", backdropFilter: "blur(6px)",
                display: "grid", placeItems: "center",
                opacity: 0, transition: "opacity 200ms",
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: "rgba(255,255,255,0.95)", display: "grid", placeItems: "center",
                  color: skin.ink,
                }}>
                  <Icons.play />
                </div>
              </div>
            </div>
            <p style={{ margin: "12px 4px 4px", fontSize: 14, fontWeight: 700, lineHeight: 1.25, color: skin.ink }}>
              {item.title}
            </p>
            <p style={{ margin: "0 4px 4px", fontSize: 11, color: skin.mute }}>
              {item.platform ?? item.type} · {item.duration ?? "—"}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
