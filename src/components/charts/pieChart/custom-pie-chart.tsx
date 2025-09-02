

import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/card";
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface CustomDonutChartProps {
  title: string;
  data: { name: string; value: number; color: string }[];
  config: Record<string, { label: string; color: string }>;
  innerRadius?: number;
  outerRadius?: number;
  height?: string;
}

export function CustomPie({
  title,
  data,
  height = "h-[300px]",
}: CustomDonutChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleMouseEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) / 2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={14}
        fontWeight="normal"
      >
        {value}%
      </text>
    );
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="text-sm  text-gray-900">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`w-full ${height}`}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                paddingAngle={1}
                dataKey="value"
                label={renderCustomLabel}
                labelLine={false}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                isAnimationActive={false}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    style={{
                      opacity:
                        activeIndex === null
                          ? 1
                          : activeIndex === index
                          ? 1
                          : 0.3,
                      transform:
                        activeIndex === index ? "scale(1.01)" : "scale(1)",
                      transition: "opacity 0.2s ease-in-out",
                    }}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
