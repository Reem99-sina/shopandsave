"use client";

import { useTranslation } from "@/translations/client";
import React from "react";

interface ProgressBarProps {
  value: number; // current progress (0-100)
  color?: string; // custom color
  height?: string; // custom height (e.g., "8px" or "h-2")
  title?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  color = "bg-blue-500",
  height = "h-2",
  title,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-[12px]">
          {value} {t("order")}
        </p>
      </div>
      <div className={`w-full bg-gray-200 rounded-full ${height}`}>
        <div
          className={`${color} h-full rounded-full transition-all duration-500`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
