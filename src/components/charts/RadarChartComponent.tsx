import {
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  ResponsiveContainer,
  RadarChart,
  Radar,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../common/card";
import { useTranslation } from "@/translations/client";

interface radarChartProps {
  title: string;
  data: unknown[];
  radars:
    | { dataKey: string; name?: string | { en: string; ar: string } }[]
    | undefined;
}

const RadarChartComponent = ({ title, data, radars }: radarChartProps) => {
  const { lang } = useTranslation();
  const chartColorPalette = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b"];

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Multi-dimensional analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            {radars?.map((rad, index) => {
              <Radar
                name={
                  typeof rad.name === "object"
                    ? rad.name[lang as "en" | "ar"]
                    : rad.name || rad.dataKey
                }
                dataKey={rad.dataKey}
                stroke={chartColorPalette[index]}
                fill={chartColorPalette[index]}
                fillOpacity={0.6}
              />;
            })}

            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RadarChartComponent;
