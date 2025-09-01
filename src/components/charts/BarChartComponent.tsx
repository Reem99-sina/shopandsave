import { useTranslation } from "@/translations/client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../common/card";


interface BarChartComponentProps {
  data: unknown[];
  title: string;
  bars: { dataKey: string; name?: string | { en: string; ar: string } }[]; // Removed fill property
  width?: string | number;
  height?: number;
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({
  data,
  title,
  bars,
}) => {
  const { lang } = useTranslation(); // Use useTranslation

  // Define the color palette internally
  const chartColorPalette = ["#405bd6", "#ef4444", "#10b981", "#f59e0b"];

  return (
    <Card className="bg-white relative">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Monthly comparison</CardDescription>
      </CardHeader>
      <div
        className={`absolute top-0 w-3 h-24 ${
          lang === "en" ? "rounded-tl-xl left-0" : "rounded-tr-xl right-0"
        } bg-primary `}
      ></div>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {bars.map((bar, index) => (
              <Bar
                key={index}
                dataKey={bar.dataKey}
                fill={chartColorPalette[index % chartColorPalette.length]} // Apply color from internal palette
                name={
                  typeof bar.name === "object"
                    ? bar.name[lang as "en" | "ar"]
                    : bar.name || bar.dataKey
                } // Handle i18n for name
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default BarChartComponent;
