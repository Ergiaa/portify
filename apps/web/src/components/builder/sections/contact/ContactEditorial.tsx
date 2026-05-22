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

export function ContactEditorial({ config }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%", background: "#f1ebdd", color: "#1a1410",
      fontFamily: "Newsreader, serif", padding: "44px 56px", boxSizing: "border-box",
      textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center",
      position: "relative",
    }}>
      <p style={{
        fontFamily: "Geist Mono, monospace", fontSize: 10,
        letterSpacing: "0.25em", textTransform: "uppercase", color: "#8a7256", margin: 0,
      }}>
        ─── Correspondence ───
      </p>
      <h2 style={{
        fontFamily: "Instrument Serif, serif", fontWeight: 400, fontStyle: "italic",
        fontSize: 78, lineHeight: 1, margin: "10px 0 0", letterSpacing: "-0.02em",
      }}>
        {config.title}.
      </h2>
      {config.description && (
        <p style={{
          fontSize: 16, lineHeight: 1.55, color: "#3a2e22", maxWidth: 520,
          margin: "20px auto 0",
        }}>{config.description}</p>
      )}

      <a href={`mailto:${config.email}`} style={{
        fontFamily: "Instrument Serif, serif", fontStyle: "italic",
        fontSize: 36, color: "#8a4a2a", marginTop: 26, display: "inline-block",
        textDecoration: "underline", textUnderlineOffset: 6,
        textDecorationStyle: "dotted",
      }}>{config.email}</a>

      <div style={{
        marginTop: 20, display: "flex", gap: 18, justifyContent: "center",
        fontFamily: "Newsreader, serif", fontSize: 15, color: "#5a4830",
      }}>
        {config.phone && <span>{config.phone}</span>}
        {config.phone && config.availability && <span>·</span>}
        {config.availability && <span style={{ fontStyle: "italic" }}>{config.availability}</span>}
      </div>

      {config.socials.length > 0 && (
        <div style={{
          marginTop: 24, display: "flex", gap: 22, justifyContent: "center",
          fontFamily: "Instrument Serif, serif", fontStyle: "italic", fontSize: 18,
        }}>
          {config.socials.map((s, i) => (
            <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" style={{
              color: "#1a1410", textDecoration: "underline",
              textUnderlineOffset: 4, textDecorationStyle: "dotted",
            }}>{s.platform}</a>
          ))}
        </div>
      )}

      <span style={{
        position: "absolute", top: 16, left: 24,
        fontFamily: "Instrument Serif, serif", fontStyle: "italic", color: "#8a7256", fontSize: 14,
      }}>
        — fin —
      </span>
      <span style={{
        position: "absolute", bottom: 16, right: 24,
        fontFamily: "Geist Mono, monospace", fontSize: 10, color: "#8a7256",
        letterSpacing: "0.15em", textTransform: "uppercase",
      }}>
        Issue ends here
      </span>
    </div>
  );
}
