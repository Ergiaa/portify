import { Icons } from "../../shared/Icons";

interface Props {
  config: {
    title?: string;
    name?: string;
    role?: string;
    bio: string;
    photoUrl: string;
    photoPosition?: "left" | "right";
    highlights?: { label: string; value: string }[];
    ctaLabel?: string;
    ctaHref?: string;
    variant?: string;
  };
}

const skin = {
  bg: "#f1f0ea", panel: "#ffffff", ink: "#16161a", sub: "#54545c", mute: "#8a8a90",
  accent: "#16161a", line: "#e5e3db", soft: "#e9e8e1",
  fontBody: "'Geist', sans-serif", fontHead: "'Geist', sans-serif", fontMono: "'JetBrains Mono', monospace",
  radius: 20,
};

const gradientTiles = [
  "linear-gradient(155deg,#ff9a52,#e0476b)",
  "#16161a",
  "linear-gradient(155deg,#54cf78,#1e8f4a)",
  "linear-gradient(155deg,#7eb6ff,#3a4fd6)",
];
const tileInk = ["#fff", "#fff", "#0a2410", "#fff"];

export function AboutBento({ config }: Props) {
  const highlights = config.highlights ?? [];

  return (
    <div style={{
      width: "100%", height: "100%", background: skin.bg, color: skin.ink,
      fontFamily: skin.fontBody, padding: 24, boxSizing: "border-box",
      display: "grid",
      gridTemplateColumns: "1.6fr 1fr 1fr",
      gridTemplateRows: "auto 1fr",
      gap: 14,
    }}>
      {/* Main bio card */}
      <div style={{
        gridColumn: "1", gridRow: "1 / 3",
        background: skin.panel, borderRadius: skin.radius, padding: 28, border: `1px solid ${skin.line}`,
        display: "flex", flexDirection: "column", gap: 18,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, overflow: "hidden", flexShrink: 0 }}>
            {config.photoUrl
              ? <img src={config.photoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <div style={{ width: "100%", height: "100%", background: "#d8d4c8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: skin.mute }}>Photo</div>
            }
          </div>
          <div>
            <div style={{ fontSize: 11, color: skin.mute, fontFamily: skin.fontMono, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {config.title || "About me"}
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.01em", color: skin.ink }}>{config.name}</div>
            <div style={{ fontSize: 12, color: skin.sub }}>{config.role}</div>
          </div>
        </div>
        <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: skin.sub }}>{config.bio}</p>
        {config.ctaLabel && (
          <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: skin.soft, borderRadius: 14 }}>
            <a href={config.ctaHref} style={{ fontSize: 13, fontWeight: 500, color: skin.ink, textDecoration: "none" }}>{config.ctaLabel}</a>
            <Icons.arrowUR />
          </div>
        )}
      </div>

      {/* Highlight tiles */}
      {highlights.slice(0, 4).map((h, i) => {
        const bg = gradientTiles[i] ?? skin.soft;
        const fg = tileInk[i] ?? skin.ink;
        return (
          <div key={i} style={{
            background: bg, color: fg, borderRadius: skin.radius, padding: 20,
            display: "flex", flexDirection: "column", justifyContent: "space-between",
          }}>
            <div style={{ fontSize: 11, opacity: 0.75, fontFamily: skin.fontMono, textTransform: "uppercase", letterSpacing: "0.1em" }}>{h.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.01em", lineHeight: 1.1 }}>{h.value}</div>
          </div>
        );
      })}
    </div>
  );
}
