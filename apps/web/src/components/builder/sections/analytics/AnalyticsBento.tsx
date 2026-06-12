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
  if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
  return Math.round(n).toLocaleString();
}

const skin = {
  bg: "#f1f0ea", panel: "#ffffff", ink: "#16161a", sub: "#54545c", mute: "#8a8a90",
  accent: "#16161a", line: "#e5e3db", soft: "#e9e8e1",
  fontBody: "'Geist', sans-serif",
  fontHead: "'Geist', sans-serif",
  fontMono: "'JetBrains Mono', monospace",
  radius: 20,
  tiles: [
    "linear-gradient(155deg,#ff9a52,#e0476b)",
    "#16161a",
    "linear-gradient(155deg,#54cf78,#1e8f4a)",
  ],
  tileInk: ["#fff", "#fff", "#0a2410"],
};

export function AnalyticsBento({ config, data, loading }: Props) {
  const metricLabel = METRIC_LABELS[config.metric ?? "videoViews"] ?? "Value";
  const total = data.reduce((s, d) => s + d.value, 0);
  const peak  = data.reduce((m, d) => (d.value > m.value ? d : m), { date: "", value: 0 });
  const avg   = data.length > 0 ? Math.round(total / data.length) : 0;

  const statCards = [
    { label: "Total",     value: fmtNum(total),     bg: skin.tiles[0], color: skin.tileInk[0] },
    { label: "Daily Avg", value: fmtNum(avg),         bg: skin.tiles[1], color: skin.tileInk[1] },
    { label: "Peak Day",  value: fmtNum(peak.value),  bg: skin.tiles[2], color: skin.tileInk[2] },
  ];

  const sparkPoints = (chartData: DataPoint[]) => {
    const pts = chartData.slice(-12);
    const maxV = Math.max(...pts.map((d) => d.value), 1);
    const minV = Math.min(...pts.map((d) => d.value));
    return pts
      .map((d, i) => `${(i / Math.max(pts.length - 1, 1)) * 80},${12 - ((d.value - minV) / (maxV - minV + 1)) * 10}`)
      .join(" ");
  };

  return (
    <div style={{
      background: skin.bg, color: skin.ink,
      fontFamily: skin.fontBody, padding: 22,
    }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 14 }}>
        <div>
          <p style={{ fontFamily: skin.fontMono, fontSize: 11, color: skin.mute, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 4px" }}>
            {"> analytics.live"}
          </p>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: skin.ink, letterSpacing: "-0.02em", margin: 0 }}>
            {config.title ?? "My Growth"}
          </h2>
        </div>
        <span style={{ fontFamily: skin.fontMono, fontSize: 11, color: skin.mute }}>
          {config.period ?? "30d"} · {metricLabel}
        </span>
      </div>

      {/* Chart card */}
      <div style={{
        background: skin.panel, border: `1px solid ${skin.line}`,
        borderRadius: skin.radius, padding: "16px 14px 8px", marginBottom: 12,
      }}>
        <p style={{
          fontFamily: skin.fontMono, fontSize: 10, color: skin.mute,
          textTransform: "uppercase", letterSpacing: "0.1em",
          marginLeft: 42, marginBottom: 6,
        }}>
          {metricLabel}
        </p>
        {loading ? (
          <div style={{ height: 176, display: "flex", alignItems: "center", justifyContent: "center", color: skin.mute, fontFamily: skin.fontMono, fontSize: 13 }}>
            Loading data…
          </div>
        ) : data.length === 0 ? (
          <div style={{ height: 176, display: "flex", alignItems: "center", justifyContent: "center", color: skin.mute, fontFamily: skin.fontMono, fontSize: 13 }}>
            No data for this period
          </div>
        ) : (
          <AnalyticsChart data={data} color="#1e8f4a" height={176} gridColor={skin.line} labelColor={skin.mute} />
        )}
      </div>

      {/* Stat tiles */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: config.showTable ? 12 : 0 }}>
        {statCards.map((c) => (
          <div key={c.label} style={{
            background: c.bg,
            border: c.bg === "#16161a" ? "1px solid #232328" : "none",
            borderRadius: 16, padding: "15px 16px 12px",
            color: c.color, minHeight: 104,
            display: "flex", flexDirection: "column", justifyContent: "space-between",
          }}>
            <span style={{ fontSize: 10, fontFamily: skin.fontMono, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.85 }}>
              {c.label}
            </span>
            <div>
              <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>
                {loading ? "—" : c.value}
              </div>
              {data.length > 0 && (
                <svg viewBox="0 0 80 14" preserveAspectRatio="none" style={{ width: "100%", height: 14, marginTop: 5, opacity: 0.5 }}>
                  <polyline points={sparkPoints(data)} fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      {config.showTable && data.length > 0 && (
        <div style={{ border: `1px solid ${skin.line}`, borderRadius: 12, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: skin.fontBody, fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${skin.line}`, background: skin.soft }}>
                <th style={{ padding: "8px 16px", textAlign: "left", color: skin.mute, fontWeight: 500, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>Date</th>
                <th style={{ padding: "8px 16px", textAlign: "right", color: skin.mute, fontWeight: 500, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>{metricLabel}</th>
              </tr>
            </thead>
            <tbody>
              {[...data].reverse().slice(0, 7).map((row, i, arr) => (
                <tr key={row.date} style={{ borderBottom: i < arr.length - 1 ? `1px solid ${skin.line}` : "none" }}>
                  <td style={{ padding: "7px 16px", color: skin.sub }}>{row.date}</td>
                  <td style={{ padding: "7px 16px", textAlign: "right", color: "#1e8f4a", fontWeight: 600 }}>{fmtNum(row.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
