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
  bg: "#f3ecdd", panel: "#faf5ea", ink: "#211a12", sub: "#5c4e3a", mute: "#8a7a5e",
  accent: "#9a4a26", line: "#dccfb6", soft: "#ece2cd",
  fontBody: "'Newsreader', serif", fontHead: "'Instrument Serif', serif", fontMono: "'Geist Mono', monospace",
  radius: 2,
};

export function ContactEditorial({ config }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%", background: skin.bg, color: skin.ink,
      fontFamily: skin.fontBody, padding: "44px 56px", boxSizing: "border-box",
      textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center",
      position: "relative",
    }}>
      <p style={{
        fontFamily: skin.fontMono, fontSize: 10,
        letterSpacing: "0.25em", textTransform: "uppercase", color: skin.mute, margin: 0,
      }}>
        ─── Correspondence ───
      </p>
      <h2 style={{
        fontFamily: skin.fontHead, fontWeight: 400, fontStyle: "italic",
        fontSize: 78, lineHeight: 1, margin: "10px 0 0", letterSpacing: "-0.02em", color: skin.ink,
      }}>
        {config.title}.
      </h2>
      {config.description && (
        <p style={{
          fontSize: 16, lineHeight: 1.55, color: skin.sub, maxWidth: 520,
          margin: "20px auto 0",
        }}>{config.description}</p>
      )}

      <a href={`mailto:${config.email}`} style={{
        fontFamily: skin.fontHead, fontStyle: "italic",
        fontSize: 36, color: skin.accent, marginTop: 26, display: "inline-block",
        textDecoration: "underline", textUnderlineOffset: 6,
        textDecorationStyle: "dotted",
      }}>{config.email}</a>

      <div style={{
        marginTop: 20, display: "flex", gap: 18, justifyContent: "center",
        fontFamily: skin.fontBody, fontSize: 15, color: skin.sub,
      }}>
        {config.phone && <span>{config.phone}</span>}
        {config.phone && config.availability && <span>·</span>}
        {config.availability && <span style={{ fontStyle: "italic" }}>{config.availability}</span>}
      </div>

      {config.socials.length > 0 && (
        <div style={{
          marginTop: 24, display: "flex", gap: 22, justifyContent: "center",
          fontFamily: skin.fontHead, fontStyle: "italic", fontSize: 18,
        }}>
          {config.socials.map((s, i) => (
            <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" style={{
              color: skin.ink, textDecoration: "underline",
              textUnderlineOffset: 4, textDecorationStyle: "dotted",
            }}>{s.platform}</a>
          ))}
        </div>
      )}

      <span style={{
        position: "absolute", top: 16, left: 24,
        fontFamily: skin.fontHead, fontStyle: "italic", color: skin.mute, fontSize: 14,
      }}>
        — fin —
      </span>
      <span style={{
        position: "absolute", bottom: 16, right: 24,
        fontFamily: skin.fontMono, fontSize: 10, color: skin.mute,
        letterSpacing: "0.15em", textTransform: "uppercase",
      }}>
        Issue ends here
      </span>
    </div>
  );
}
