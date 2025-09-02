import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/card";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

interface CustomAreaChartProps {
  title: string;
  config: Record<
    string,
    { label: string; color: string; fill?: boolean; addLabel?: boolean }
  >;
  data: any[];
  xKey: string;
  shape?: "monotone" | "linear" | "step" | "basis";
  height?: string;
  yKey?: string;
}

export default function CustomAreaChart({
  title,
  config,
  data,
  xKey,
  shape = "monotone",
  height = "h-[300px]",
}: CustomAreaChartProps) {
  const getYAxisDomain = () => {
    const allValues = data.flatMap((item) =>
      Object.keys(config).map((key) => item[key] || 0)
    );

    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);
    const padding = (maxValue - minValue) * 0.1;

    // Helper to round to 2 decimals
    const round2 = (num: number) => Math.round(num * 100) / 100;

    return [
      round2(Math.max(0, minValue - padding)),
      round2(maxValue + padding),
    ];
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-sm  text-gray-900">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`w-full ${height}`}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey={xKey}
                axisLine={{ stroke: "#e2e8f0", strokeWidth: 1 }}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
              />
              <YAxis
                domain={getYAxisDomain()}
                axisLine={{ stroke: "#e2e8f0", strokeWidth: 1 }}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
                width={60}
              />

              {Object.keys(config).map((key) => (
                <Area
                  key={key}
                  type={shape}
                  dataKey={key}
                  stroke={config[key].color}
                  fill={config[key].fill ? config[key].color : "transparent"}
                  fillOpacity={0.1}
                  strokeWidth={2}
                  dot={({ cx, cy, value }) => (
                    <g key={cx}>
                      <circle cx={cx} cy={cy} r={4} fill={config[key].color} />
                      {config[key]?.addLabel && (
                        <text
                          x={cx}
                          y={cy - 8}
                          textAnchor="middle"
                          fontSize={10}
                          fill={config[key].color}
                          fontWeight="normal"
                        >
                          {value}
                        </text>
                      )}
                    </g>
                  )}
                  activeDot={{
                    r: 6,
                    fill: config[key].color,
                    strokeWidth: 1,
                    stroke: "#000",
                  }}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
