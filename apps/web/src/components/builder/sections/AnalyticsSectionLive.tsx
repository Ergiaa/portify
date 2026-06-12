import { useEffect, useState } from "react";
import { adminOrpc } from "../../../lib/admin-orpc";
import { AnalyticsSection } from "./AnalyticsSection";

interface DataPoint {
  date: string;
  value: number;
}

interface Props {
  config: {
    title?: string;
    metric?: "videoViews" | "likes" | "shares" | "comments";
    period?: "7d" | "30d" | "90d" | "all";
    showTable?: boolean;
    variant?: "swiss" | "editorial" | "glass" | "y2k" | "bento";
  };
}

export function AnalyticsSectionLive({ config }: Props) {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  const metric = config.metric ?? "videoViews";
  const period = config.period ?? "30d";

  useEffect(() => {
    setLoading(true);
    adminOrpc.metrics.timeSeries({ metric, period })
      .then((rows) => { setData(rows); setLoading(false); })
      .catch(() => setLoading(false));
  }, [metric, period]);

  return <AnalyticsSection config={config} data={data} loading={loading} />;
}
