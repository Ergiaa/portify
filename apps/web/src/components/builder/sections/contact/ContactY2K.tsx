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

const chromeText = {
  background: "linear-gradient(180deg,#fff,#c9d4ff,#6e8fff)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

export function ContactY2K({ config }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#0a0a16",
      color: "#fff", fontFamily: "Space Grotesk, sans-serif", padding: 36,
      boxSizing: "border-box", position: "relative", overflow: "hidden",
      borderBottom: "1px solid rgba(110,143,255,0.2)",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(circle at 30% 70%, rgba(255,138,225,0.3), transparent 60%), radial-gradient(circle at 80% 20%, rgba(110,255,255,0.2), transparent 60%)",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.2) 0, rgba(0,0,0,0.2) 1px, transparent 1px, transparent 4px)",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <p style={{ fontFamily: "VT323, monospace", fontSize: 24, color: "#ffce5b", margin: 0 }}>
          ★ ─── CONTACT.EXE ─── ★
        </p>
        <h2 style={{
          ...chromeText,
          fontFamily: "Major Mono Display, monospace", fontSize: 64, lineHeight: 1,
          margin: "6px 0 0", textTransform: "lowercase", letterSpacing: "-0.02em",
        }}>
          {config.title}
        </h2>
        {config.description && (
          <p style={{
            fontFamily: "VT323, monospace", fontSize: 18, color: "#c7d3ff",
            maxWidth: 520, margin: "12px auto 0",
          }}>
            &gt;&gt; {config.description}
          </p>
        )}

        {config.availability && (
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, marginTop: 18,
            padding: "6px 14px", border: "2px solid #76e07a", color: "#76e07a",
            fontFamily: "VT323, monospace", fontSize: 18,
          }}>
            <span style={{ width: 8, height: 8, background: "#76e07a", borderRadius: 0 }} />
            STATUS: {config.availability.toUpperCase()}
          </div>
        )}

        <div style={{ marginTop: 26, display: "flex", justifyContent: "center", gap: 12 }}>
          <a href={`mailto:${config.email}`} style={{
            padding: "12px 22px",
            background: "linear-gradient(180deg,#fff,#c9d4ff,#6e8fff)", color: "#0a0a16",
            fontWeight: 700, fontSize: 14, textDecoration: "none", border: "2px solid #fff",
            boxShadow: "4px 4px 0 #ff7af2", letterSpacing: "0.04em",
          }}>
            ▶ EMAIL: {config.email.toUpperCase()}
          </a>
          {config.phone && (
            <a href={`tel:${config.phone}`} style={{
              padding: "12px 22px", color: "#fff", border: "2px solid #fff",
              fontFamily: "VT323, monospace", fontSize: 18, textDecoration: "none",
              boxShadow: "4px 4px 0 #6effff",
            }}>
              ☏ {config.phone}
            </a>
          )}
        </div>

        {config.socials.length > 0 && (
          <div style={{ marginTop: 22, display: "flex", justifyContent: "center", gap: 10 }}>
            {config.socials.map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" style={{
                width: 80, padding: "8px 0", border: "2px solid #fff",
                color: "#fff", textDecoration: "none", fontFamily: "VT323, monospace",
                fontSize: 16, textAlign: "center",
                background: (["rgba(255,138,225,0.2)", "rgba(110,255,255,0.2)", "rgba(255,206,91,0.2)", "rgba(138,123,255,0.2)"] as const)[i % 4],
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
