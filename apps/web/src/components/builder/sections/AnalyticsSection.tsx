import { AnalyticsSwiss }     from "./analytics/AnalyticsSwiss";
import { AnalyticsBento }     from "./analytics/AnalyticsBento";
import { AnalyticsGlass }     from "./analytics/AnalyticsGlass";
import { AnalyticsEditorial } from "./analytics/AnalyticsEditorial";
import { AnalyticsY2K }       from "./analytics/AnalyticsY2K";

interface DataPoint {
  date: string;
  value: number;
}

interface Props {
  config: {
    title?: string;
    metric?: string;
    period?: string;
    showTable?: boolean;
    variant?: "swiss" | "bento" | "glass" | "editorial" | "y2k";
  };
  data: DataPoint[];
  loading?: boolean;
}

const VARIANTS = {
  swiss:     AnalyticsSwiss,
  bento:     AnalyticsBento,
  glass:     AnalyticsGlass,
  editorial: AnalyticsEditorial,
  y2k:       AnalyticsY2K,
} as const;

export function AnalyticsSection({ config, data, loading }: Props) {
  const Component = VARIANTS[config.variant ?? "swiss"] ?? AnalyticsSwiss;
  return <Component config={config} data={data} loading={loading} />;
}
