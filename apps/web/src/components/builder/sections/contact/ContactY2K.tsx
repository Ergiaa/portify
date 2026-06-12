interface Props {
  config: {
    title: string;
    description?: string;
    availability?: string;
    email: string;
    phone?: string;
    socials: { platform: string; url: string }[];
    variant?: string;
  };
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

const socialBgColors = [
  `rgba(255,69,191,0.12)`,
  `rgba(0,182,199,0.12)`,
  `rgba(232,164,0,0.12)`,
  `rgba(91,75,255,0.12)`,
];

export function ContactY2K({ config }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: skin.bg,
      color: skin.ink, fontFamily: skin.fontBody, padding: 36,
      boxSizing: "border-box", position: "relative", overflow: "hidden",
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

      <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        {/* Terminal eyebrow */}
        <p style={{ fontFamily: skin.fontMono, fontSize: 24, color: skin.accent, margin: 0 }}>
          ★ ─── CONTACT.EXE ─── ★
        </p>

        {/* Chrome heading */}
        <h2 style={{
          ...chromeStyle,
          fontFamily: skin.fontHead, fontSize: 64, lineHeight: 1,
          margin: "6px 0 0", textTransform: "lowercase", letterSpacing: "-0.02em",
        }}>
          {config.title}
        </h2>

        {config.description && (
          <p style={{
            fontFamily: skin.fontMono, fontSize: 18, color: skin.sub,
            maxWidth: 520, margin: "12px auto 0",
          }}>
            &gt;&gt; {config.description}
          </p>
        )}

        {/* Availability status box */}
        {config.availability && (
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, marginTop: 18,
            padding: "6px 14px", border: `2px solid ${skin.altCyan}`, color: skin.altCyan,
            fontFamily: skin.fontMono, fontSize: 18, background: `rgba(0,182,199,0.08)`,
          }}>
            <span style={{ width: 8, height: 8, background: skin.altCyan, borderRadius: 0 }} />
            STATUS: {config.availability.toUpperCase()}
          </div>
        )}

        {/* CTA buttons */}
        <div style={{ marginTop: 26, display: "flex", justifyContent: "center", gap: 12 }}>
          <a href={`mailto:${config.email}`} style={{
            padding: "12px 22px",
            background: skin.accent, color: "#fff",
            fontWeight: 700, fontSize: 14, textDecoration: "none",
            border: `2px solid ${skin.accent}`,
            boxShadow: `4px 4px 0 ${skin.altPink}`, letterSpacing: "0.04em",
            fontFamily: skin.fontBody,
          }}>
            ▶ EMAIL: {config.email.toUpperCase()}
          </a>
          {config.phone && (
            <a href={`tel:${config.phone}`} style={{
              padding: "12px 22px", color: skin.ink, border: `2px solid ${skin.ink}`,
              fontFamily: skin.fontMono, fontSize: 18, textDecoration: "none",
              boxShadow: `4px 4px 0 ${skin.altCyan}`, background: skin.soft,
            }}>
              ☏ {config.phone}
            </a>
          )}
        </div>

        {/* Social boxes */}
        {config.socials.length > 0 && (
          <div style={{ marginTop: 22, display: "flex", justifyContent: "center", gap: 10 }}>
            {config.socials.map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" style={{
                width: 80, padding: "8px 0", border: `2px solid ${skin.accent}`,
                color: skin.ink, textDecoration: "none", fontFamily: skin.fontMono,
                fontSize: 16, textAlign: "center",
                background: socialBgColors[i % socialBgColors.length],
              }}>
                ★ {s.platform}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
