import { Icons } from "../../shared/Icons";

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

export function ContactGlass({ config }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%", position: "relative", overflow: "hidden",
      background: "linear-gradient(135deg,#d4eaff,#e6d4ff 50%,#ffd9e8)",
      fontFamily: "Plus Jakarta Sans, sans-serif", color: "#241a3a",
      padding: 36, boxSizing: "border-box",
      display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, alignItems: "center",
    }}>
      <div style={{
        position: "absolute", width: 360, height: 360, borderRadius: "50%",
        background: "radial-gradient(circle,#a78bff,transparent 70%)", top: -80, left: -60, filter: "blur(40px)",
      }} />
      <div style={{
        position: "absolute", width: 320, height: 320, borderRadius: "50%",
        background: "radial-gradient(circle,#ff9ec8,transparent 70%)", bottom: -80, right: -40, filter: "blur(40px)",
      }} />

      <div style={{ position: "relative", zIndex: 2 }}>
        {config.availability && (
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 14px", borderRadius: 999,
            background: "rgba(255,255,255,0.5)", backdropFilter: "blur(14px)",
            border: "1px solid rgba(255,255,255,0.7)", marginBottom: 14,
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: "50%", background: "#4dd884",
              boxShadow: "0 0 0 4px rgba(77,216,132,0.25)",
            }} />
            <span style={{ fontSize: 12, fontWeight: 600 }}>{config.availability}</span>
          </div>
        )}
        <h2 style={{
          margin: 0, fontSize: 48, fontWeight: 800, letterSpacing: "-0.02em",
          lineHeight: 1.02,
        }}>{config.title}.</h2>
        {config.description && (
          <p style={{ marginTop: 14, color: "#3d2f5c", fontSize: 15, lineHeight: 1.55, maxWidth: 360 }}>
            {config.description}
          </p>
        )}
      </div>

      <div style={{
        position: "relative", zIndex: 2,
        background: "rgba(255,255,255,0.4)", backdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.65)", borderRadius: 28, padding: 26,
        boxShadow: "0 30px 60px -20px rgba(80,40,140,0.2)",
      }}>
        <a href={`mailto:${config.email}`} style={{
          display: "flex", alignItems: "center", gap: 12, padding: "14px 16px",
          borderRadius: 16, background: "#241a3a", color: "#fff", textDecoration: "none",
          fontSize: 14, fontWeight: 600, marginBottom: 10,
        }}>
          <Icons.mail />
          <span style={{ flex: 1 }}>{config.email}</span>
          <Icons.arrowR />
        </a>
        {config.phone && (
          <a href={`tel:${config.phone}`} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "14px 16px",
            borderRadius: 16, background: "rgba(255,255,255,0.55)", color: "#241a3a",
            textDecoration: "none", fontSize: 14, fontWeight: 600,
            border: "1px solid rgba(255,255,255,0.7)",
          }}>
            <Icons.phone />
            <span style={{ flex: 1 }}>{config.phone}</span>
            <Icons.arrowR />
          </a>
        )}
        {config.socials.length > 0 && (
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8,
            marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.6)",
          }}>
            {config.socials.map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" style={{
                padding: "10px 6px", borderRadius: 12,
                background: "rgba(255,255,255,0.5)",
                border: "1px solid rgba(255,255,255,0.6)",
                fontSize: 12, fontWeight: 600, textAlign: "center", color: "#241a3a",
                textDecoration: "none",
              }}>{s.platform}</a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
