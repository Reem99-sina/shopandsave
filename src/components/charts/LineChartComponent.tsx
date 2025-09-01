import { useTranslation } from "@/translations/client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../common/card";

interface LineChartComponentProps {
  data: any[];
  title: string | { en: string; ar: string }; // Allow i18n object for title
  lines: { dataKey: string; name?: string | { en: string; ar: string } }[]; // Removed stroke property
  width?: string | number;
  height?: number;
}

const LineChartComponent: React.FC<LineChartComponentProps> = ({
  data,
  title,
  lines,
}) => {
  const { lang } = useTranslation();

  const displayTitle =
    typeof title === "object" ? title[lang as "en" | "ar"] : title;

  return (
    <Card className="bg-white relative">
      <CardHeader>
        <CardTitle>{displayTitle}</CardTitle>
        <CardDescription> performance</CardDescription>

      </CardHeader>
      <div
        className={`absolute top-0 w-3 h-24 ${
          lang === "en"
            ? "rounded-tl-xl left-0"
            : "rounded-tr-xl right-0"
        } bg-primary `}
      ></div>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            {lines.map((line, index) => (
              <Line
                key={index}
                type="monotone"
                name={
                  typeof line.name === "object"
                    ? line.name[lang as "en" | "ar"]
                    : line.name || line.dataKey
                }
                dataKey={line.dataKey}
                stroke="#405bd6"
                strokeWidth={3}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LineChartComponent;
