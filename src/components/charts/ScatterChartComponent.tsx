"use client";


import { useTranslation } from "@/translations/client";
import {
  ResponsiveContainer,
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../common/card";



interface ScatterChartCardProps {
  title: string;
  data: unknown[];
  scatters: {name:string | { en: string; ar: string },dataKey:string}[]| undefined

}

export function ScatterChartCard({
  title,
  data,
  scatters,

}: ScatterChartCardProps) {
  const { lang } = useTranslation();
  const chartColorPalette = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b"];

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Investment analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <CartesianGrid />
            <XAxis type="number" dataKey="x" name="Risk" />
            <YAxis type="number" dataKey="y" name="Return" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />

            {scatters?.map((metric, index) => (
              <Scatter
                key={index}
                name={
                  typeof metric.name === "object"
                    ? metric.name[lang as "en" | "ar"]
                    : metric.name
                }
                data={data}
                dataKey={metric.dataKey}
                fill={chartColorPalette[index]}
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
