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
  bg: "#f1f0ea", panel: "#ffffff", ink: "#16161a", sub: "#54545c", mute: "#8a8a90",
  accent: "#16161a", line: "#e5e3db", soft: "#e9e8e1",
  fontBody: "'Geist', sans-serif", fontHead: "'Geist', sans-serif", fontMono: "'JetBrains Mono', monospace",
  radius: 20,
};

const TYPE_COLOR: Record<string, string> = {
  video: "#e85a5a", article: "#5a8ae8", podcast: "#5ae89a", design: "#e8c25a",
};

export function ProjectsBento({ config, items }: Props) {
  const feat = items[0];

  return (
    <div style={{
      width: "100%", height: "100%", background: skin.bg, color: skin.ink,
      fontFamily: skin.fontBody, padding: 22, boxSizing: "border-box",
      display: "grid",
      gridTemplateColumns: "1.8fr 1fr 1fr",
      gridTemplateRows: "auto 1fr 1fr",
      gap: 12,
    }}>
      <style>{`.proj-bento-feat:hover .proj-bento-overlay{opacity:1}.proj-bento-tile:hover{background:${skin.soft};border-color:${skin.line}}.proj-bento-tile:hover .proj-bento-tile-bar{width:100%}`}</style>

      <div style={{
        gridColumn: "1 / -1", display: "flex", justifyContent: "space-between",
        alignItems: "center",
      }}>
        <div>
          <p style={{
            margin: 0, fontFamily: skin.fontMono, fontSize: 11,
            color: skin.mute, textTransform: "uppercase", letterSpacing: "0.1em",
          }}>{`> /projects`}</p>
          <h2 style={{ margin: "2px 0 0", fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em", color: skin.ink }}>
            {config.title}
          </h2>
        </div>
        <a href={config.viewAllHref ?? "#"} style={{
          padding: "8px 16px", borderRadius: 12, border: `1px solid ${skin.line}`,
          fontSize: 12, color: skin.ink, textDecoration: "none", display: "inline-flex",
          alignItems: "center", gap: 8, background: skin.panel,
        }}>
          {config.viewAllLabel ?? "Browse archive"} <Icons.arrowR />
        </a>
      </div>

      {feat && (
        <a className="proj-bento-feat" style={{
          gridColumn: "1", gridRow: "2 / 4",
          background: skin.panel, border: `1px solid ${skin.line}`, borderRadius: skin.radius,
          overflow: "hidden", textDecoration: "none", color: skin.ink, display: "flex",
          flexDirection: "column", cursor: "pointer",
        }}>
          <div style={{ flex: 1, position: "relative" }}>
            <div style={{ width: "100%", height: "100%" }}>
              {feat.thumbnailUrl
                ? <img src={feat.thumbnailUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <div style={{ width: "100%", height: "100%", background: skin.soft, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 10, color: skin.mute }}>{feat.type}</span></div>
              }
            </div>
            <span style={{
              position: "absolute", top: 12, left: 12, padding: "5px 10px",
              borderRadius: 999, background: "rgba(255,255,255,0.85)", backdropFilter: "blur(6px)",
              fontSize: 10, fontWeight: 700, color: TYPE_COLOR[feat.type] ?? skin.mute,
              textTransform: "uppercase", letterSpacing: "0.08em",
            }}>★ Featured · {feat.type}</span>
            <div className="proj-bento-overlay" style={{
              position: "absolute", inset: 0,
              background: "rgba(22,22,26,0.35)", display: "grid", placeItems: "center",
              opacity: 0, transition: "opacity 200ms",
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%", background: "#fff",
                color: skin.ink, display: "grid", placeItems: "center",
              }}><Icons.play /></div>
            </div>
          </div>
          <div style={{ padding: "16px 18px" }}>
            <p style={{ margin: 0, fontSize: 18, fontWeight: 700, lineHeight: 1.2, color: skin.ink }}>{feat.title}</p>
            <p style={{ margin: "4px 0 0", fontSize: 12, color: skin.mute }}>
              {feat.platform ?? feat.type} · {feat.duration ?? "—"} · {feat.publishedAt ? new Date(feat.publishedAt).getFullYear() : "—"}
            </p>
          </div>
        </a>
      )}

      {items.slice(1, 5).map((item) => {
        const accent = TYPE_COLOR[item.type] ?? skin.mute;
        return (
          <a key={item.id} className="proj-bento-tile" style={{
            background: skin.panel, border: `1px solid ${skin.line}`, borderRadius: 18,
            padding: 14, cursor: "pointer", textDecoration: "none", color: skin.ink,
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            transition: "background 180ms, border-color 180ms", position: "relative", overflow: "hidden",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{
                fontSize: 10, fontWeight: 700, color: accent,
                fontFamily: skin.fontMono, textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}>● {item.type}</span>
              <Icons.arrowUR style={{ color: skin.mute }} />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 600, lineHeight: 1.25, color: skin.ink }}>{item.title}</p>
              <p style={{ margin: "4px 0 0", fontSize: 11, color: skin.mute, fontFamily: skin.fontMono }}>
                {item.duration ?? "—"}
              </p>
            </div>
            <div className="proj-bento-tile-bar" style={{
              position: "absolute", left: 0, bottom: 0,
              height: 3, background: accent, width: 0, transition: "width 250ms",
            }} />
          </a>
        );
      })}
    </div>
  );
}
