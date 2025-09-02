import { useTranslation } from "@/translations/client";
import { Button } from "../common/button.component";
import { ShoppingCart, Store, Building2 } from "lucide-react";
import { JSX } from "react";
import Papa from "papaparse";
type TranslationKeys = "carrefour" | "lulu_market" | "metro_market";

interface StoreData {
  name: TranslationKeys;
  orders: number;
  sales: string;
  items: number;
  avgOrder: string;
  marketShare: string;
  icon: JSX.Element;
}

const stores: StoreData[] = [
  {
    name: "carrefour",
    orders: 505,
    sales: "138,600 ر.س",
    items: 4038,
    avgOrder: "274 ر.س",
    marketShare: "41%",
    icon: <ShoppingCart className="h-5 w-5" />,
  },
  {
    name: "lulu_market",
    orders: 384,
    sales: "113,100 ر.س",
    items: 3072,
    avgOrder: "295 ر.س",
    marketShare: "34%",
    icon: <Store className="h-5 w-5" />,
  },
  {
    name: "metro_market",
    orders: 275,
    sales: "85,030 ر.س",
    items: 2200,
    avgOrder: "309 ر.س",
    marketShare: "25%",
    icon: <Building2 className="h-5 w-5" />,
  },
];

export default function StoreSales() {
  const { t } = useTranslation();
  const exportToCSV = () => {
    const csv = Papa.unparse(stores);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "stores-data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <section className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-sm font-semibold">{t("sales_volume_per_store")}</h2>
        <Button
          className=" px-4 py-2 rounded-lg text-sm hover:bg-gray-100 bg-gray-200 !text-black !w-auto"
          text={t("export_store_stats")}
          onClick={exportToCSV}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stores.map((store, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-200 p-6 flex flex-col gap-4 bg-card"
          >
            <div className="flex items-center gap-2 text-sm font-semibold">
              {store.icon}
              <span>{t(store.name)}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">{t("orders")}</p>
                <p className="font-bold">{store.orders}</p>
              </div>
              <div>
                <p className="text-gray-500">{t("sales")}</p>
                <p className="font-bold text-green-600">{store.sales}</p>
              </div>
              <div>
                <p className="text-gray-500">{t("items")}</p>
                <p className="font-bold">{store.items}</p>
              </div>
              <div>
                <p className="text-gray-500">{t("average_order")}</p>
                <p className="font-bold">{store.avgOrder}</p>
              </div>
            </div>
            <div className="border-t pt-2 text-gray-500 text-xs flex justify-between">
              <span>{t("market_share")}</span>
              <span className="font-bold">{store.marketShare}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
