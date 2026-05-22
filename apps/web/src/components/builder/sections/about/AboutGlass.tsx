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

export function AboutGlass({ config }: Props) {
  const availabilityHighlight = config.highlights?.find(h => h.label.toLowerCase().includes("available"));

  return (
    <div style={{
      width: "100%", height: "100%", position: "relative", overflow: "hidden",
      background: "linear-gradient(135deg,#ecdeff 0%,#fde4f5 50%,#d8efff 100%)",
      fontFamily: "Plus Jakarta Sans, sans-serif", color: "#2a1e4d",
      padding: 40, boxSizing: "border-box", borderBottom: "1px solid rgba(255,255,255,0.55)",
    }}>
      <div style={{
        position: "absolute", width: 300, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle,#a78bff 0%, transparent 70%)",
        top: -50, left: -40, filter: "blur(40px)",
      }} />
      <div style={{
        position: "absolute", width: 280, height: 280, borderRadius: "50%",
        background: "radial-gradient(circle,#ff9ec8 0%, transparent 70%)",
        bottom: -80, right: 30, filter: "blur(40px)",
      }} />

      <div style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "300px 1fr", gap: 32, height: "100%", alignItems: "stretch" }}>
        <div style={{
          background: "rgba(255,255,255,0.45)", backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.6)", borderRadius: 24, padding: 16,
          boxShadow: "0 20px 40px -20px rgba(80,40,140,0.25)",
          display: "flex", flexDirection: "column", gap: 12,
        }}>
          <div style={{ flex: 1, borderRadius: 16, overflow: "hidden" }}>
            {config.photoUrl
              ? <img src={config.photoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <div style={{ width: "100%", height: "100%", background: "#d8d4c8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#888" }}>Photo</div>
            }
          </div>
          <div style={{ background: "rgba(255,255,255,0.5)", borderRadius: 12, padding: "10px 12px", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4dd884", boxShadow: "0 0 0 4px rgba(77,216,132,0.25)", flexShrink: 0 }} />
            <span style={{ fontSize: 12, fontWeight: 500 }}>{availabilityHighlight?.value ?? "Available"}</span>
          </div>
        </div>

        <div style={{
          background: "rgba(255,255,255,0.4)", backdropFilter: "blur(28px)",
          border: "1px solid rgba(255,255,255,0.55)", borderRadius: 28, padding: 32,
          boxShadow: "0 30px 60px -20px rgba(80,40,140,0.2), inset 0 1px 0 rgba(255,255,255,0.8)",
        }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#7e5aa3", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            {config.title || "About me"}
          </p>
          <h2 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.05, margin: "10px 0 6px", letterSpacing: "-0.02em" }}>
            {config.name}
          </h2>
          <p style={{ margin: 0, fontSize: 14, color: "#6b5495" }}>{config.role}</p>
          <p style={{ fontSize: 15, lineHeight: 1.55, color: "#3d2f5c", marginTop: 18 }}>{config.bio}</p>

          {config.highlights && config.highlights.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 22 }}>
              {config.highlights.map((h, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.55)", borderRadius: 14, padding: "10px 14px", border: "1px solid rgba(255,255,255,0.7)" }}>
                  <div style={{ fontSize: 10, color: "#7e5aa3", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>{h.label}</div>
                  <div style={{ fontSize: 14, color: "#2a1e4d", fontWeight: 600, marginTop: 2 }}>{h.value}</div>
                </div>
              ))}
            </div>
          )}

          {config.ctaLabel && (
            <a href={config.ctaHref} style={{ marginTop: 22, display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 999, background: "rgba(42,30,77,0.9)", color: "#fff", textDecoration: "none", fontSize: 13, fontWeight: 600, backdropFilter: "blur(10px)" }}>
              {config.ctaLabel} <Icons.arrowR />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
