"use client";
import { useTranslation } from "@/translations/client";
import clsx from "clsx";
import { Package, TrendingUp, ChartColumn, Users } from "lucide-react";
import { JSX } from "react";
type TranslationKeys =
  | "averageDailyOrders"
  | "activeCustomers"
  | "averageOrderValue"
  | "growthRate"|"prevWeek"


interface CardData {
  title: TranslationKeys;
  value: string;
  subtitle: TranslationKeys;
  icon: JSX.Element;
}

const cards: CardData[] = [
  {
    title: "averageDailyOrders",
    value: "54",
    subtitle: "prevWeek",
    icon: <Package className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "activeCustomers",
    value: "248",
    subtitle: "prevWeek",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "averageOrderValue",
    value: "285 ر.س",
    subtitle: "prevWeek",
    icon: <ChartColumn className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "growthRate",
    value: "+15%",
    subtitle: "prevWeek",
    icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
  
  },
];

export default function DashboardAnalysisCards() {
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
              <div className="flex flex-row-reverse items-center justify-between px-6 pt-6 pb-2">
                <h4 className="text-sm font-medium">{t(card.title)}</h4>
                {card.icon}
              </div>
              <div className="px-6 pb-6 text-end">
                <div className={clsx(card.value.includes("%")?"text-green-600":"","text-2xl font-bold")}>{card.value}</div>
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
