import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/card";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
} from "recharts";

interface SegmentConfig {
  label: string;
  color: string;
}

interface BarChartComponentProps {
  data: any[];
  config: Record<string, SegmentConfig>; // Dynamic keys
  height?: string;
  title?: string;
}

export default function BarChartComponent({
  data,
  config,
  height = "h-[300px]",
  title,
}: BarChartComponentProps) {
  const seriesKeys = Object.keys(config); // Dynamically get keys

  return (
    <Card className="bg-white relative">
      <CardHeader>
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>

      <CardContent className="w-full">
        <div className={`w-full ${height}`}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              maxBarSize={15}
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#00000" />
              <XAxis
                dataKey={Object.keys(data[0])[0]} // First key for X axis
                axisLine={{ stroke: "#00000", strokeWidth: 1 }}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#00000" }}
              />
              <YAxis
                axisLine={{ stroke: "#00000", strokeWidth: 1 }}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#00000" }}
              />

              {seriesKeys.map((key) => (
                <Bar
                  key={key}
                  stackId="a"
                  dataKey={key}
                  fill={config[key].color}
                  radius={[2, 2, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
