"use client";
import { useTranslation } from "@/translations/client";
import { Package, TrendingUp, ChartColumn, Users } from "lucide-react";
import { JSX } from "react";
type TranslationKeys =
  | "total_orders"
  | "average_order_value"
  | "total_sales"
  | "total_items"
  | "last_7_days"
  | "selected_period"
  | "items_sold"
  | "average_order";

interface CardData {
  title: TranslationKeys;
  value: string;
  subtitle: TranslationKeys;
  icon: JSX.Element;
}

const cards: CardData[] = [
  {
    title: "total_orders",
    value: "1,164",
    subtitle: "last_7_days",
    icon: <Package className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "total_sales",
    value: "336,730 ر.س",
    subtitle: "selected_period",
    icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "total_items",
    value: "9,310",
    subtitle: "items_sold",
    icon: <ChartColumn className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "average_order_value",
    value: "289 ر.س",
    subtitle: "average_order",
    icon: <Users className="h-4 w-4 text-muted-foreground" />,
  },
];

export default function DashboardReportsCards() {
  const { t } = useTranslation();

  return (
    <main className="container mx-auto px-6 py-8">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white text-card-foreground flex flex-col gap-6 rounded-xl border border-gray-200"
            >
              <div className="flex flex-row items-center justify-between px-6 pt-6 pb-2">
                <h4 className="text-sm font-medium">{t(card.title)}</h4>
                {card.icon}
              </div>
              <div className="px-6 pb-6">
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground">
                  {t(card.subtitle)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
