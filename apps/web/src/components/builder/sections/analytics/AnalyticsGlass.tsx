import { AnalyticsChart } from "./AnalyticsChart";

interface DataPoint {
  date: string;
  value: number;
}

interface Props {
  config: {
    title?: string;
    description?: string;
    metric?: string;
    period?: string;
    showTable?: boolean;
  };
  data: DataPoint[];
  loading?: boolean;
}

const METRIC_LABELS: Record<string, string> = {
  videoViews: "Video Views",
  likes: "Likes",
  shares: "Shares",
  comments: "Comments",
};

function fmtNum(n: number): string {
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return n.toLocaleString();
}

const STAT_ICONS = ["◈", "◉", "◆"];

export function AnalyticsGlass({ config, data, loading }: Props) {
  const metricLabel = METRIC_LABELS[config.metric ?? "videoViews"] ?? "Value";
  const total = data.reduce((s, d) => s + d.value, 0);
  const peak  = data.reduce((m, d) => (d.value > m.value ? d : m), { date: "", value: 0 });
  const avg   = data.length > 0 ? Math.round(total / data.length) : 0;

  const statCards = [
    { label: "Total",     value: fmtNum(total) },
    { label: "Daily Avg", value: fmtNum(avg)    },
    { label: "Peak Day",  value: fmtNum(peak.value) },
  ];

  return (
    <div style={{
      background: "#eef0f7",
      padding: 34,
      fontFamily: "Plus Jakarta Sans, system-ui, sans-serif",
      color: "#241d3a",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Blobs */}
      <div style={{ position: "absolute", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,rgba(167,139,255,0.45) 0%,transparent 70%)", top: -120, left: -70, filter: "blur(34px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle,rgba(120,182,255,0.40) 0%,transparent 70%)", bottom: -120, right: -60, filter: "blur(34px)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Live badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.5)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.7)", borderRadius: 999, padding: "7px 16px", marginBottom: 20 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4dd884", boxShadow: "0 0 0 3px rgba(77,216,132,0.25)", flexShrink: 0, display: "block" }} />
          <span style={{ fontSize: 12, fontWeight: 600 }}>Live Analytics · {config.period ?? "30d"} · {metricLabel}</span>
        </div>

        {/* Title */}
        <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 20 }}>
          {config.title ?? "My Growth"}
        </h2>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 16 }}>
          {statCards.map((s, i) => (
            <div key={s.label} style={{ background: "rgba(255,255,255,0.45)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.7)", borderRadius: 18, padding: "16px 18px", boxShadow: "0 10px 28px -10px rgba(80,40,140,0.15)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg,#a78bff,#ff7ac0)", display: "grid", placeItems: "center", color: "#fff", fontSize: 10, flexShrink: 0 }}>
                  {STAT_ICONS[i]}
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#6b5495" }}>{s.label}</span>
              </div>
              <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>
                {loading ? "—" : s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Chart card */}
        <div style={{ background: "rgba(255,255,255,0.45)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.7)", borderRadius: 20, padding: "18px 14px 8px", boxShadow: "0 18px 44px -14px rgba(80,40,140,0.18)" }}>
          {loading ? (
            <div style={{ height: 190, display: "flex", alignItems: "center", justifyContent: "center", color: "#6b5495", fontSize: 13 }}>
              Loading data…
            </div>
          ) : data.length === 0 ? (
            <div style={{ height: 190, display: "flex", alignItems: "center", justifyContent: "center", color: "#6b5495", fontSize: 13 }}>
              No data for this period
            </div>
          ) : (
            <AnalyticsChart data={data} color="#a78bff" height={190} gridColor="rgba(167,139,255,0.15)" labelColor="#c0a8e0" />
          )}
        </div>

        {/* Table */}
        {config.showTable && data.length > 0 && (
          <div style={{ marginTop: 16, background: "rgba(255,255,255,0.4)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.65)", borderRadius: 14, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Plus Jakarta Sans, system-ui, sans-serif", fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(167,139,255,0.2)" }}>
                  <th style={{ padding: "9px 16px", textAlign: "left", color: "#6b5495", fontWeight: 600 }}>Date</th>
                  <th style={{ padding: "9px 16px", textAlign: "right", color: "#6b5495", fontWeight: 600 }}>{metricLabel}</th>
                </tr>
              </thead>
              <tbody>
                {[...data].reverse().map((row, i) => (
                  <tr key={row.date} style={{ borderBottom: i < data.length - 1 ? "1px solid rgba(167,139,255,0.1)" : "none" }}>
                    <td style={{ padding: "7px 16px", color: "#3d2f5c" }}>{row.date}</td>
                    <td style={{ padding: "7px 16px", textAlign: "right", color: "#241a3a", fontWeight: 700 }}>{fmtNum(row.value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
