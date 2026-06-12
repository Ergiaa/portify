import { Counter } from "../../shared/Counter";
import { Icons } from "../../shared/Icons";

interface Props {
  config: {
    heading: string;
    subheading: string;
    tagline?: string;
    avatarUrl?: string;
    ctaLabel: string;
    ctaHref: string;
    cta2Label?: string;
    cta2Href?: string;
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

export function HeroBento({ config }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%", background: skin.bg, color: skin.ink,
      fontFamily: skin.fontBody, padding: 24, boxSizing: "border-box",
      display: "grid",
      gridTemplateColumns: "1.4fr 1fr 1fr",
      gridTemplateRows: "auto 1fr 1fr",
      gap: 16,
    }}>
      {/* Main card */}
      <div style={{
        gridColumn: "1 / 3", gridRow: "1 / 3",
        background: skin.panel, border: `1px solid ${skin.line}`,
        borderRadius: skin.radius, padding: 32, position: "relative", overflow: "hidden",
      }}>
        <span style={{ fontFamily: skin.fontMono, fontSize: 11, color: "#4dd884", letterSpacing: "0.1em" }}>
          ● ONLINE
        </span>
        <p style={{ margin: "16px 0 4px", color: skin.mute, fontSize: 14 }}>{config.tagline}</p>
        <h1 style={{ margin: 0, fontSize: 64, fontWeight: 800, lineHeight: 1.02, letterSpacing: "-0.03em", color: skin.ink }}>
          {config.heading}
        </h1>
        <p style={{ color: skin.sub, fontSize: 14, maxWidth: 380, marginTop: 14, lineHeight: 1.5 }}>
          {config.subheading}
        </p>
        <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
          <a href={config.ctaHref} style={{
            padding: "11px 20px", borderRadius: 12, background: skin.ink, color: "#fff",
            fontSize: 13, fontWeight: 600, textDecoration: "none",
          }}>{config.ctaLabel} ↗</a>
          <a href={config.cta2Href} style={{
            padding: "11px 20px", borderRadius: 12, background: "transparent",
            border: `1px solid ${skin.line}`, color: skin.ink, fontSize: 13, fontWeight: 500, textDecoration: "none",
          }}>
            {config.cta2Label}
          </a>
        </div>
        <div style={{
          position: "absolute", right: -10, bottom: -10, width: 180, height: 180,
          backgroundImage: `radial-gradient(${skin.line} 1.5px, transparent 1.5px)`,
          backgroundSize: "16px 16px", pointerEvents: "none",
        }} />
      </div>

      {/* Role tile — orange gradient */}
      <div style={{
        gridRow: "1 / 2",
        background: gradientTiles[0], color: tileInk[0],
        borderRadius: skin.radius, padding: 18, display: "flex", alignItems: "center", gap: 14,
      }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.7)", overflow: "hidden", flexShrink: 0 }}>
          {config.avatarUrl
            ? <img src={config.avatarUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
            : <div style={{ width: "100%", height: "100%", background: "#d8d4c8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#888" }}>Photo</div>
          }
        </div>
        <div>
          <div style={{ fontSize: 12, opacity: 0.85, fontFamily: skin.fontMono }}>Currently</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>{config.subheading.split(" ").slice(0, 4).join(" ")}</div>
        </div>
      </div>

      {/* Latest video card */}
      <div style={{
        gridRow: "2 / 3",
        background: skin.panel, border: `1px solid ${skin.line}`, borderRadius: skin.radius, padding: 18,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <Icons.play style={{ color: "#4dd884" }} />
          <span style={{ fontSize: 11, color: "#4dd884", fontFamily: skin.fontMono, textTransform: "uppercase", letterSpacing: "0.1em" }}>Latest</span>
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.25, color: skin.ink }}>Portfolio showcase — new work</div>
        <div style={{ fontSize: 11, color: skin.mute, marginTop: 6 }}>Featured project</div>
      </div>

      {/* Stats row */}
      <div style={{
        gridColumn: "1 / 2", gridRow: "3 / 4",
        background: skin.panel, border: `1px solid ${skin.line}`, borderRadius: skin.radius, padding: 18,
        display: "flex", gap: 18,
      }}>
        <div>
          <div style={{ fontSize: 28, fontWeight: 700, color: skin.ink }}><Counter to={127} suffix="+" /></div>
          <div style={{ fontSize: 11, color: skin.mute, fontFamily: skin.fontMono }}>Projects</div>
        </div>
        <div style={{ width: 1, background: skin.line }} />
        <div>
          <div style={{ fontSize: 28, fontWeight: 700, color: skin.ink }}><Counter to={42} suffix="k" /></div>
          <div style={{ fontSize: 11, color: skin.mute, fontFamily: skin.fontMono }}>Followers</div>
        </div>
        <div style={{ width: 1, background: skin.line }} />
        <div>
          <div style={{ fontSize: 28, fontWeight: 700, color: skin.ink }}><Counter to={6} suffix="y" /></div>
          <div style={{ fontSize: 11, color: skin.mute, fontFamily: skin.fontMono }}>Experience</div>
        </div>
      </div>

      {/* Find me card */}
      <div style={{
        gridColumn: "2 / 3", gridRow: "3 / 4",
        background: skin.panel, border: `1px solid ${skin.line}`, borderRadius: skin.radius, padding: 18,
        display: "flex", flexDirection: "column", justifyContent: "space-between",
      }}>
        <div style={{ fontSize: 11, color: skin.mute, fontFamily: skin.fontMono, textTransform: "uppercase", letterSpacing: "0.1em" }}>Find me</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["YT", "IG", "X", "in"].map((s) => (
            <div key={s} style={{
              width: 34, height: 34, borderRadius: 10,
              background: skin.soft, display: "grid", placeItems: "center",
              fontFamily: skin.fontMono, fontSize: 11, color: skin.ink,
            }}>{s}</div>
          ))}
        </div>
      </div>

      {/* Open slots — dark accent tile */}
      <div style={{
        gridColumn: "3 / 4", gridRow: "1 / 4",
        background: skin.ink, color: "#fff",
        borderRadius: skin.radius, padding: 22,
        display: "flex", flexDirection: "column", justifyContent: "space-between",
      }}>
        <div>
          <div style={{ fontSize: 11, color: skin.mute, fontFamily: skin.fontMono, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>This week</div>
          <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.05 }}>
            <Counter to={3} /><span style={{ color: "#4dd884" }}> open</span> <br />slots
          </div>
          <p style={{ fontSize: 12, color: "#a8a8b3", marginTop: 12, lineHeight: 1.5 }}>
            For client work
          </p>
        </div>
        <div>
          <div style={{ width: "100%", aspectRatio: "1/1", background: "#0d0d0f", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#555" }}>Map</div>
          <div style={{ marginTop: 8, fontSize: 12, color: "#a8a8b3", display: "flex", alignItems: "center", gap: 6 }}>
            <Icons.dot style={{ color: "#4dd884" }} /> Available remotely
          </div>
        </div>
      </div>
    </div>
  );
}
