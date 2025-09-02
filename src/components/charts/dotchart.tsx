import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/card";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  ScatterChart,
  Scatter,
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

export default function CustomLineChart({
  title,
  config,
  data,
  xKey,
  height = "h-[300px]",
}: CustomAreaChartProps) {
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
            <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey={xKey} type="number" name="Hour" />
              <YAxis type="number" name="Orders" />

              {Object.keys(config).map((key) => (
                <Scatter
                  key={key}
                  name={config[key].label}
                  data={data}
                  fill={config[key].color}
                  line={false}
                  dataKey={key} // ✅ This tells Scatter which field to use for Y
                />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
