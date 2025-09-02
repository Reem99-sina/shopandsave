"use client";

import { useTranslation } from "@/translations/client";
import { Package, TrendingUp, ChartColumn, Users } from "lucide-react";
import clsx from "clsx";
import { JSX } from "react";

type TranslationKeys =
  | "dashboard.cards.activeDeals"
  | "dashboard.cards.totalValue"
  | "dashboard.cards.totalOrders"
  | "dashboard.cards.averageDiscount"
  | "dashboard.cards.fromTotalDeals"
  | "dashboard.cards.allDealsValue"
  | "dashboard.cards.largeOrders"
  | "dashboard.cards.averageDiscountSubtitle";

interface CardData {
  title: TranslationKeys;
  value: string;
  subtitle: TranslationKeys;
  icon: JSX.Element;
  highlight?: string;
}

const cards: CardData[] = [
  {
    title: "dashboard.cards.activeDeals",
    value: "3",
    subtitle: "dashboard.cards.fromTotalDeals",
    highlight:"text-green-600",
    icon: <Package className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "dashboard.cards.totalValue",
    value: "479,000 ر.س",
    subtitle: "dashboard.cards.allDealsValue",
    icon: <ChartColumn className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "dashboard.cards.totalOrders",
    value: "172",
    subtitle: "dashboard.cards.largeOrders",
    icon: <Users className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "dashboard.cards.averageDiscount",
    value: "16%",
    subtitle: "dashboard.cards.averageDiscountSubtitle",
    icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
    highlight: "text-blue-600",
  },
];

export default function DealsDashboardCards() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white text-card-foreground flex flex-col gap-6 rounded-xl border border-gray-200 shadow-sm"
          >
            <div className="flex flex-row-reverse items-center justify-between px-6 pt-6 pb-2">
              <h4 className="text-sm font-medium">{t(card.title)}</h4>
              {card.icon}
            </div>
            <div className="px-6 pb-6 text-end">
              <div
                className={clsx(
                  "text-2xl font-bold",
                  card.highlight ? card.highlight : "text-gray-800"
                )}
              >
                {card.value}
              </div>
              <p className="text-xs text-muted-foreground">{t(card.subtitle)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
