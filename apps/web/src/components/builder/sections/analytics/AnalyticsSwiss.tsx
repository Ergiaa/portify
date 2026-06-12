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

export function AnalyticsSwiss({ config, data, loading }: Props) {
  const metricLabel = METRIC_LABELS[config.metric ?? "videoViews"] ?? "Value";
  const total = data.reduce((s, d) => s + d.value, 0);
  const peak = data.reduce((max, d) => (d.value > max.value ? d : max), { date: "", value: 0 });
  const avg = data.length > 0 ? Math.round(total / data.length) : 0;

  return (
    <section style={{ background: "#f6f5f1", padding: "64px 48px", fontFamily: "inherit" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, borderBottom: "2px solid #000", paddingBottom: 16 }}>
          <div>
            <p style={{ fontSize: 11, fontFamily: "ui-monospace, monospace", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: 8 }}>
              Analytics — {config.period ?? "30d"}
            </p>
            <h2 style={{ fontSize: 32, fontWeight: 700, color: "#111", margin: 0 }}>
              {config.title ?? "My Growth"}
            </h2>
            {config.description && (
              <p style={{ fontSize: 14, color: "#555", marginTop: 8 }}>{config.description}</p>
            )}
          </div>
          <p style={{ fontSize: 11, fontFamily: "ui-monospace, monospace", color: "#999", textTransform: "uppercase" }}>
            {metricLabel}
          </p>
        </div>

        {/* Summary stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, marginBottom: 40, borderBottom: "1px solid #ddd" }}>
          {[
            { label: "Total", value: fmtNum(total) },
            { label: "Daily Avg", value: fmtNum(avg) },
            { label: "Peak Day", value: fmtNum(peak.value) },
          ].map((s, i) => (
            <div key={s.label} style={{ padding: "24px 0", borderRight: i < 2 ? "1px solid #ddd" : "none", paddingRight: i < 2 ? 32 : 0, paddingLeft: i > 0 ? 32 : 0 }}>
              <p style={{ fontSize: 11, fontFamily: "ui-monospace, monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#999", marginBottom: 8 }}>
                {s.label}
              </p>
              <p style={{ fontSize: 36, fontWeight: 700, fontFamily: "ui-monospace, monospace", color: "#111", margin: 0 }}>
                {loading ? "—" : s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: 4, padding: "24px 16px 8px" }}>
          {loading ? (
            <div style={{ height: 220, display: "flex", alignItems: "center", justifyContent: "center", color: "#999", fontFamily: "ui-monospace, monospace", fontSize: 13 }}>
              Loading data…
            </div>
          ) : data.length === 0 ? (
            <div style={{ height: 220, display: "flex", alignItems: "center", justifyContent: "center", color: "#999", fontFamily: "ui-monospace, monospace", fontSize: 13 }}>
              No data for this period
            </div>
          ) : (
            <AnalyticsChart data={data} color="#111111" height={220} />
          )}
        </div>

        {/* Table */}
        {config.showTable && data.length > 0 && (
          <div style={{ marginTop: 32 }}>
            <p style={{ fontSize: 11, fontFamily: "ui-monospace, monospace", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: 12 }}>
              Daily Breakdown
            </p>
            <div style={{ border: "1px solid #e5e5e5", borderRadius: 4, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: "ui-monospace, monospace" }}>
                <thead>
                  <tr style={{ background: "#f5f5f0", borderBottom: "1px solid #e5e5e5" }}>
                    <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 600, color: "#555", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>Date</th>
                    <th style={{ padding: "10px 16px", textAlign: "right", fontWeight: 600, color: "#555", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>{metricLabel}</th>
                  </tr>
                </thead>
                <tbody>
                  {[...data].reverse().map((row, i) => (
                    <tr key={row.date} style={{ borderBottom: i < data.length - 1 ? "1px solid #f0f0f0" : "none" }}>
                      <td style={{ padding: "9px 16px", color: "#444" }}>{row.date}</td>
                      <td style={{ padding: "9px 16px", textAlign: "right", color: "#111", fontWeight: 600 }}>{fmtNum(row.value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
