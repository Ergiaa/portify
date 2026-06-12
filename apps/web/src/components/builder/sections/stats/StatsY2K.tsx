import { Counter } from "../shared/Counter";

interface Props {
  config: {
    title: string;
    description?: string;
    layout?: string;
    stats: { number: string; label: string; icon?: string }[];
    variant?: string;
  };
}

function parseStat(s: { number: string; to?: number; suffix?: string }) {
  if (typeof (s as any).to === "number") return { to: (s as any).to as number, suffix: s.suffix ?? "" };
  const m = String(s.number).match(/^(\d+(?:\.\d+)?)(\D*)$/);
  if (!m) return { to: 0, suffix: s.number };
  return { to: parseFloat(m[1]), suffix: m[2] };
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

const hardShadowColors = [skin.altPink, skin.altCyan, skin.altGold, skin.accent];

export function StatsY2K({ config }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: skin.bg,
      color: skin.ink, fontFamily: skin.fontBody,
      padding: 28, boxSizing: "border-box", position: "relative", overflow: "hidden",
    }}>
      <style>{`@keyframes sysBlink { 50% { opacity: 0; } }`}</style>

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

      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Terminal header */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          borderBottom: `1px solid ${skin.accent}`, paddingBottom: 8, marginBottom: 20,
          fontFamily: skin.fontMono, fontSize: 18, color: skin.sub,
        }}>
          <span style={{ color: skin.accent }}>★ STATS.SYS</span>
          <span>{new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</span>
          <span style={{ color: skin.altPink, animation: "sysBlink 1.1s step-end infinite" }}>■</span>
        </div>
        <h2 style={{
          ...chromeStyle,
          fontFamily: skin.fontHead, fontSize: 44, lineHeight: 1,
          margin: "0 0 20px", textTransform: "lowercase", letterSpacing: "-0.02em",
        }}>{config.title}</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${config.stats.length}, 1fr)`, gap: 12,
        }}>
          {config.stats.map((s, i) => {
            const { to, suffix } = parseStat(s);
            const shadowColor = hardShadowColors[i % hardShadowColors.length];
            return (
              <div key={i} style={{
                border: `2px solid ${skin.accent}`, padding: "18px 12px",
                background: skin.panel,
                boxShadow: `4px 4px 0 ${shadowColor}`, textAlign: "center", position: "relative",
              }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
                <div style={{
                  ...chromeStyle,
                  fontFamily: skin.fontHead, fontSize: 52, lineHeight: 1,
                  fontWeight: 700,
                }}>
                  <Counter to={to} suffix={suffix} />
                </div>
                <div style={{
                  marginTop: 8, fontFamily: skin.fontMono, fontSize: 16,
                  color: skin.sub, textTransform: "uppercase", letterSpacing: "0.08em",
                }}>
                  ► {s.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
