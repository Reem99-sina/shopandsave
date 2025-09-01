import { PieChart, Pie, Cell } from "recharts";

const HalfDonutChart = ({ value, title,maxNumber=100 }: { value: number; title: string; maxNumber: number }) => {
  const data = [
    { name: "Score", value },
    { name: "Remaining", value: maxNumber - value },
  ];

  const COLORS = ["#405bd6", "#dce0f7"]; // Blue & Gray
  const RADIAN = Math.PI / 180;
  const cx = 100;
  const cy = 150;
  const innerRadius = 70;
  const outerRadius = 100;

  // Calculate marker position based on value
  const angle = 180 * (value / maxNumber); // 0 to 180 degrees
  const markerX = cx + outerRadius * Math.cos((180 - angle) * RADIAN);
  const markerY = cy - outerRadius * Math.sin((180 - angle) * RADIAN);

  return (
    <div style={{ textAlign: "center" }}>
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          startAngle={180}
          endAngle={0}
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} className="relative"/>
          ))}
        </Pie>

        {/* Circle marker */}
        <circle
          cx={markerX}
          cy={markerY+20}
          r={15}
          fill="white"
          strokeWidth={3}
          className="absolute"
        />

        {/* Value in center */}
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="24"
          fontWeight="bold"
        >
          {value}
        </text>
        <text x={cx} y={cy + 40} textAnchor="middle" fontSize="12" fill="#555">
          {title ? title : " Validity Score"}
        </text>
      </PieChart>
    </div>
  );
};

export default HalfDonutChart;
