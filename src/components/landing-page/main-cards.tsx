import { CheckCircle, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent } from "../common/card";
import { useTranslation } from "@/translations/client";
import { JSX } from "react";

type TranslationKeys =
  | "total_orders"
  | "total_orders_count"
  | "orders_today"
  | "completed_orders"
  | "completed_orders_count"
  | "out_of_orders"
  | "in_progress"
  | "in_progress_count"
  | "pending_orders"
  | "total_sales"
  | "total_sales_amount"
  | "sales_today"
  | "sar";
interface Stat {
  title: TranslationKeys;
  value: TranslationKeys;
  subtitle: TranslationKeys;
  extra?: TranslationKeys;
  icon: JSX.Element;
  color: string;
}
const stats :Stat[]= [
  {
    title: "total_orders",
    value: "total_orders_count",
    subtitle: "orders_today",
    icon: <TrendingUp className="text-gray-600" size={24} />,
    color: "text-gray-800",
  },
  {
    title: "completed_orders",
    value: "completed_orders_count",
    subtitle: "out_of_orders",
    icon: <CheckCircle className="text-green-600" size={24} />,
    color: "text-green-600",
  },
  {
    title: "in_progress",
    value: "in_progress_count",
    subtitle: "pending_orders",
    icon: <Clock className="text-yellow-600" size={24} />,
    color: "text-yellow-600",
  },
  {
    title: "total_sales",
    value: "total_sales_amount",
    subtitle: "sales_today",
    icon: <TrendingUp className="text-gray-600" size={24} />,
    color: "text-gray-800",
    extra: "sar",
  },
];
export function MainCards() {
  const { t, isRTL } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
          <Card className="bg-white" key={index}>
            <CardContent className="">
              <div
                className={`flex items-center justify-between ${
                  isRTL ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div className="flex flex-col gap-3 items-baseline">
                <p className="text-sm  mb-2 ">{t(stat.title)}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>
                  {t(stat.value)} {stat.extra ? t(stat.extra) : ""}
                </p>
                <p className="text-xs text-gray-500 mt-1">{t(stat.subtitle)}</p>
              </div>
              {stat.icon && stat.icon}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
