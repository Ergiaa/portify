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

export function AnalyticsEditorial({ config, data, loading }: Props) {
  const metricLabel = METRIC_LABELS[config.metric ?? "videoViews"] ?? "Value";
  const total = data.reduce((s, d) => s + d.value, 0);
  const peak  = data.reduce((m, d) => (d.value > m.value ? d : m), { date: "", value: 0 });
  const avg   = data.length > 0 ? Math.round(total / data.length) : 0;

  const statRows = [
    { label: "Total",     value: fmtNum(total),        accent: false },
    { label: "Daily Avg", value: fmtNum(avg),            accent: true  },
    { label: "Peak Day",  value: fmtNum(peak.value),    accent: false },
  ];

  const mono = "JetBrains Mono, ui-monospace, monospace";

  return (
    <div style={{ background: "#f3ecdd", color: "#211a12", fontFamily: "Newsreader, Georgia, serif", padding: "34px 50px" }}>
      {/* Masthead */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "2px solid #211a12", paddingBottom: 8 }}>
        <div style={{ fontFamily: "Instrument Serif, Georgia, serif", fontSize: 21, fontStyle: "italic" }}>
          Growth Report
        </div>
        <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#8a7a5e" }}>
          {metricLabel} · {(config.period ?? "30d").toUpperCase()} · {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </div>
      </div>

      {/* Decorative section divider */}
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8a7a5e", padding: "3px 0 0", borderBottom: "1px solid #211a12", marginBottom: 26 }}>
        {["Volume", "Engagement", "Growth", "Audience", "Reach"].map((lbl) => (
          <span key={lbl}>{lbl}</span>
        ))}
      </div>

      {/* 2-column body */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.65fr", gap: 36, alignItems: "start" }}>
        {/* Left: title + stats */}
        <div>
          <p style={{ fontFamily: "Instrument Serif, Georgia, serif", fontStyle: "italic", fontSize: 14, margin: "0 0 8px", color: "#9a4a26" }}>
            A {config.period ?? "30d"} summary—
          </p>
          <h2 style={{ fontFamily: "Instrument Serif, Georgia, serif", fontWeight: 400, fontSize: 58, lineHeight: 0.93, letterSpacing: "-0.02em", margin: "0 0 6px" }}>
            {config.title ?? "My Growth"}
          </h2>
          <div style={{ width: 28, height: 2, background: "#211a12", margin: "14px 0" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {statRows.map((s) => (
              <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid #d8cdb9", paddingBottom: 9 }}>
                <span style={{ fontFamily: mono, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8a7256" }}>
                  {s.label}
                </span>
                <span style={{ fontFamily: "Instrument Serif, Georgia, serif", fontSize: 34, letterSpacing: "-0.03em", color: s.accent ? "#9a4a26" : "#211a12" }}>
                  {loading ? "—" : s.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: chart */}
        <div>
          <div style={{ border: "1px solid #d8cdb9", padding: "14px 10px 6px", marginBottom: 6 }}>
            {loading ? (
              <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center", color: "#8a7256", fontFamily: "Instrument Serif, Georgia, serif", fontStyle: "italic", fontSize: 14 }}>
                Loading data…
              </div>
            ) : data.length === 0 ? (
              <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center", color: "#8a7256", fontFamily: "Instrument Serif, Georgia, serif", fontStyle: "italic", fontSize: 14 }}>
                No data for this period
              </div>
            ) : (
              <AnalyticsChart data={data} color="#9a4a26" height={200} gridColor="#d8cdb9" labelColor="#c0aa8a" />
            )}
          </div>
          <p style={{ fontFamily: "Instrument Serif, Georgia, serif", fontStyle: "italic", fontSize: 11, color: "#8a7256", textAlign: "center", margin: 0 }}>
            Fig. 1 — {metricLabel} over {config.period ?? "30d"}, {new Date().getFullYear()}
          </p>
        </div>
      </div>

      {/* Table */}
      {config.showTable && data.length > 0 && (
        <div style={{ marginTop: 26, borderTop: "2px solid #211a12", paddingTop: 14 }}>
          <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#8a7256", marginBottom: 8 }}>
            — Daily Record —
          </p>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Newsreader, Georgia, serif", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #211a12" }}>
                <th style={{ padding: "5px 0", textAlign: "left", fontStyle: "italic", fontWeight: 400, color: "#8a7a5e" }}>Date</th>
                <th style={{ padding: "5px 0", textAlign: "right", fontStyle: "italic", fontWeight: 400, color: "#8a7a5e" }}>{metricLabel}</th>
              </tr>
            </thead>
            <tbody>
              {[...data].reverse().map((row, i) => (
                <tr key={row.date} style={{ borderBottom: i < data.length - 1 ? "1px solid #d8cdb9" : "none" }}>
                  <td style={{ padding: "5px 0", color: "#3a2e22" }}>{row.date}</td>
                  <td style={{ padding: "5px 0", textAlign: "right", color: i % 2 ? "#9a4a26" : "#211a12" }}>
                    {fmtNum(row.value)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
