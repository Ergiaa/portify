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
  bg: "#f6f5f1", panel: "#ffffff", ink: "#16150f", sub: "#56544b", mute: "#94917f",
  accent: "#16150f", line: "#deded4", soft: "#edece4",
  fontBody: "'Geist', sans-serif", fontHead: "'Geist', sans-serif", fontMono: "'Geist Mono', monospace",
  radius: 0,
};

export function ProjectsSwiss({ config, items }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%", background: skin.bg, color: skin.ink,
      fontFamily: skin.fontBody, padding: "44px 56px", boxSizing: "border-box",
      overflow: "hidden",
    }}>
      <style>{`.proj-swiss-row:hover{background:${skin.ink};color:#fff;padding-left:12px!important}.proj-swiss-row:hover span,.proj-swiss-row:hover svg{color:#fff!important}`}</style>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        borderBottom: `1px solid ${skin.ink}`, paddingBottom: 14, marginBottom: 18,
      }}>
        <div>
          <p style={{ margin: "0 0 8px", fontFamily: skin.fontMono, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: skin.mute }}>
            § 05 — Projects
          </p>
          <h2 style={{ fontSize: 36, fontWeight: 500, letterSpacing: "-0.02em", margin: 0 }}>{config.title}</h2>
        </div>
        <a href={config.viewAllHref ?? "#"} style={{ fontSize: 14, color: skin.ink, textDecoration: "underline", textUnderlineOffset: 4 }}>
          {config.viewAllLabel ?? "Browse archive"} →
        </a>
      </div>

      <div>
        <div style={{
          display: "grid", gridTemplateColumns: "40px 1.6fr 1fr 100px 100px 24px",
          padding: "8px 0", fontFamily: skin.fontMono, fontSize: 10,
          color: skin.mute, letterSpacing: "0.12em", textTransform: "uppercase",
          borderBottom: `1px solid ${skin.line}`,
        }}>
          <span>#</span><span>Title</span><span>Type</span><span>Year</span><span>Time</span><span></span>
        </div>
        {items.map((item, i) => (
          <a key={item.id} className="proj-swiss-row" style={{
            display: "grid", gridTemplateColumns: "40px 1.6fr 1fr 100px 100px 24px",
            padding: "16px 0", borderBottom: `1px solid ${skin.soft}`,
            fontSize: 14, alignItems: "center", color: skin.ink, textDecoration: "none",
            transition: "background 200ms, padding 200ms",
          }}>
            <span style={{ fontFamily: skin.fontMono, fontSize: 11, color: skin.mute }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span style={{ fontWeight: 500, fontSize: 15 }}>{item.title}</span>
            <span style={{
              fontFamily: skin.fontMono, fontSize: 11, color: skin.sub,
              letterSpacing: "0.05em", textTransform: "uppercase",
            }}>{item.type}{item.platform ? ` · ${item.platform}` : ""}</span>
            <span style={{ fontFamily: skin.fontMono, fontSize: 11, color: skin.sub }}>
              {item.publishedAt ? new Date(item.publishedAt).getFullYear() : "—"}
            </span>
            <span style={{ fontFamily: skin.fontMono, fontSize: 11, color: skin.sub }}>{item.duration ?? "—"}</span>
            <Icons.arrowUR style={{ color: skin.mute }} />
          </a>
        ))}
      </div>
    </div>
  );
}
