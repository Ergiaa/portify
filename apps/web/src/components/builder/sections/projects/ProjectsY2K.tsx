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

const chromeText = {
  background: "linear-gradient(180deg,#fff,#c9d4ff,#6e8fff)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

export function ProjectsY2K({ config, items }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: "linear-gradient(135deg,#0a0a16 0%,#12122a 40%,#0a0a16 100%)",
      color: "#fff", fontFamily: "Space Grotesk, sans-serif", padding: 30,
      boxSizing: "border-box", position: "relative", overflow: "hidden",
    }}>
      <style>{`.proj-y2k-card:hover{transform:translate(-2px,-2px);box-shadow:6px 6px 0 #ff7af2,0 0 30px rgba(110,143,255,0.5)}.proj-y2k-card:hover .proj-y2k-overlay{opacity:1}`}</style>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(rgba(110,143,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(110,143,255,0.08) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }} />

      <div style={{
        position: "relative", zIndex: 2, display: "flex", justifyContent: "space-between",
        alignItems: "baseline", marginBottom: 18,
      }}>
        <div>
          <p style={{ fontFamily: "VT323, monospace", fontSize: 22, color: "#ffce5b", margin: 0 }}>
            ★ projects.dir
          </p>
          <h2 style={{
            ...chromeText,
            fontFamily: "Major Mono Display, monospace", fontSize: 38, lineHeight: 1, margin: 0,
            textTransform: "lowercase",
          }}>{config.title}</h2>
        </div>
        <a href={config.viewAllHref ?? "#"} style={{
          padding: "8px 14px", color: "#fff", border: "2px solid #fff",
          fontFamily: "VT323, monospace", fontSize: 16, textDecoration: "none",
          boxShadow: "3px 3px 0 #ff7af2",
        }}>
          ▶ {(config.viewAllLabel ?? "Browse archive").toUpperCase()}
        </a>
      </div>

      <div style={{
        position: "relative", zIndex: 2, display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)", gap: 12,
      }}>
        {items.slice(0, 6).map((item) => (
          <a key={item.id} className="proj-y2k-card" style={{
            border: "2px solid #fff", padding: 8, position: "relative", cursor: "pointer",
            background: "rgba(255,255,255,0.04)", textDecoration: "none", color: "#fff",
            display: "block", transition: "transform 200ms, box-shadow 200ms",
            boxShadow: "4px 4px 0 #ff7af2",
          }}>
            <div style={{ position: "relative" }}>
              <div style={{
                aspectRatio: "4/3", display: "grid", placeItems: "center", color: "#0a0a16",
                background: "linear-gradient(135deg,#ff7af2 0%,#6effff 50%,#ffce5b 100%)",
              }}>
                {item.thumbnailUrl
                  ? <img src={item.thumbnailUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <span style={{ fontFamily: "VT323, monospace", fontSize: 22 }}>★ {item.type.toUpperCase()}</span>
                }
              </div>
              <div className="proj-y2k-overlay" style={{
                position: "absolute", inset: 0, background: "rgba(10,10,22,0.8)",
                display: "grid", placeItems: "center", opacity: 0, transition: "opacity 200ms",
              }}>
                <div style={{ ...chromeText, fontFamily: "Major Mono Display, monospace", fontSize: 28 }}>▶ play</div>
              </div>
            </div>
            <p style={{
              margin: "10px 4px 2px", fontSize: 13, fontWeight: 700, lineHeight: 1.25, color: "#fff",
            }}>{item.title}</p>
            <p style={{ margin: "0 4px", fontFamily: "VT323, monospace", fontSize: 14, color: "#c7d3ff" }}>
              ► {item.duration ?? "—"} :: {item.publishedAt ? new Date(item.publishedAt).getFullYear() : "—"}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
