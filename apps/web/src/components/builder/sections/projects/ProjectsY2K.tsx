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
  bg: "#edeef6", panel: "#ffffff", ink: "#18182a", sub: "#4a4a66", mute: "#86869e",
  accent: "#5b4bff", line: "#18182a", soft: "#e3e4f1",
  altPink: "#ff45bf", altCyan: "#00b6c7", altGold: "#e8a400",
  fontBody: "'Space Grotesk', sans-serif", fontHead: "'Major Mono Display', monospace", fontMono: "'VT323', monospace",
  radius: 4,
};

const chromeStyle = {
  background: "linear-gradient(162deg,#2a2a45 0%,#9398d8 24%,#3a3a5c 44%,#cf94da 64%,#3a3a5c 86%)",
  WebkitBackgroundClip: "text" as const,
  backgroundClip: "text" as const,
  color: "transparent",
  WebkitTextFillColor: "transparent" as const,
};

export function ProjectsY2K({ config, items }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: skin.bg,
      color: skin.ink, fontFamily: skin.fontBody, padding: 30,
      boxSizing: "border-box", position: "relative", overflow: "hidden",
    }}>
      <style>{`.proj-y2k-card:hover{transform:translate(-2px,-2px);box-shadow:6px 6px 0 ${skin.altPink}}.proj-y2k-card:hover .proj-y2k-overlay{opacity:1}`}</style>

      {/* Grid background */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(rgba(91,75,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(91,75,255,0.05) 1px, transparent 1px)`,
        backgroundSize: "34px 34px", pointerEvents: "none",
      }} />
      {/* Scanlines */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `repeating-linear-gradient(0deg, rgba(24,24,42,0.035) 0px, rgba(24,24,42,0.035) 1px, transparent 1px, transparent 3px)`,
        pointerEvents: "none",
      }} />

      <div style={{
        position: "relative", zIndex: 2, display: "flex", justifyContent: "space-between",
        alignItems: "flex-end", marginBottom: 18,
        borderBottom: `1px solid ${skin.accent}`, paddingBottom: 8,
      }}>
        <div>
          <p style={{ fontFamily: skin.fontMono, fontSize: 22, color: skin.mute, margin: 0 }}>
            ★ projects.dir
          </p>
          <h2 style={{
            ...chromeStyle,
            fontFamily: skin.fontHead, fontSize: 38, lineHeight: 1, margin: 0,
            textTransform: "lowercase",
          }}>{config.title}</h2>
        </div>
        <a href={config.viewAllHref ?? "#"} style={{
          padding: "8px 14px", color: skin.ink, border: `2px solid ${skin.accent}`,
          fontFamily: skin.fontMono, fontSize: 16, textDecoration: "none",
          boxShadow: `3px 3px 0 ${skin.altPink}`, background: skin.panel,
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
            border: `2px solid ${skin.accent}`, padding: 8, position: "relative", cursor: "pointer",
            background: skin.panel, textDecoration: "none", color: skin.ink,
            display: "block", transition: "transform 200ms, box-shadow 200ms",
            boxShadow: `4px 4px 0 ${skin.altPink}`,
          }}>
            <div style={{ position: "relative" }}>
              <div style={{
                aspectRatio: "4/3", display: "grid", placeItems: "center",
                background: `linear-gradient(135deg,${skin.accent} 0%,${skin.altCyan} 50%,${skin.altPink} 100%)`,
                overflow: "hidden",
              }}>
                {item.thumbnailUrl
                  ? <img src={item.thumbnailUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <span style={{ fontFamily: skin.fontMono, fontSize: 22, color: "#fff" }}>★ {item.type.toUpperCase()}</span>
                }
              </div>
              <div className="proj-y2k-overlay" style={{
                position: "absolute", inset: 0, background: "rgba(24,24,42,0.75)",
                display: "grid", placeItems: "center", opacity: 0, transition: "opacity 200ms",
              }}>
                <div style={{ ...chromeStyle, fontFamily: skin.fontHead, fontSize: 28 }}>▶ play</div>
              </div>
            </div>
            <p style={{ fontFamily: skin.fontMono, fontSize: 14, color: skin.mute, margin: "6px 4px 2px" }}>
              {item.type.toUpperCase()}
            </p>
            <p style={{
              margin: "0 4px 4px", fontSize: 13, fontWeight: 700, lineHeight: 1.25, color: skin.ink,
            }}>{item.title}</p>
            <p style={{ margin: "0 4px", fontFamily: skin.fontMono, fontSize: 14, color: skin.mute }}>
              ► {item.duration ?? "—"} :: {item.publishedAt ? new Date(item.publishedAt).getFullYear() : "—"}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
