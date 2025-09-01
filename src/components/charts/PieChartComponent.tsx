import { useTranslation } from "@/translations/client";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../common/card";


interface PieChartComponentProps {
  data: { name: string; value: number }[];
  title: string | { en: string; ar: string }; // Allow i18n object for title
}

const PieChartComponent: React.FC<PieChartComponentProps> = ({
  data,
  title,
  // Removed colors from destructuring
}) => {
  const { lang } = useTranslation();

  // Define the color palette internally
  const chartColorPalette = ["#3b82f6", "#10b981", "#ef4444", "#f59e0b"];

  const displayTitle =
    typeof title === "object" ? title[lang as "en" | "ar"] : title;

  return (
    <Card className="bg-white relative">
      <CardHeader>
        <CardTitle>{displayTitle}</CardTitle>
        <CardDescription>Portfolio breakdown</CardDescription>
      </CardHeader>
      <div className="absolute "></div>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartColorPalette[index % chartColorPalette.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PieChartComponent;
