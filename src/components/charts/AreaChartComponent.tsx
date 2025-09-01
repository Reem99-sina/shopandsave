import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../common/card";
import { useTranslation } from "@/translations/client";


interface AreaChartCardProps {
  title: string;
  data: unknown[];
  area: {name: string | {en: string; ar: string}; dataKey: string}[]| undefined;
}

export function AreaChartCard({title, data, area}: AreaChartCardProps) {
  const {lang} = useTranslation();
  const chartColorPalette = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b"];

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Quarterly data</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            {area?.map((metric, index) => (
              <Area
                key={index}
                type="monotone"
                dataKey={metric.dataKey}
                stroke={chartColorPalette[index]}
                fill={chartColorPalette[index]}
                name={
                  typeof metric.name === "object"
                    ? metric.name[lang as "en" | "ar"]
                    : metric.name
                }
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
