"use client";

import { Button } from "@/components/common/button.component";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/common/card";
import Papa from "papaparse";
import { Option } from "@/components/common/select";
import DashboardReportsCards from "@/components/reports/reports";
import StoreSales from "@/components/reports/size-payment";
import { Table } from "@/components/table";
import {
  DataTableFilters,
  FilterConfig,
} from "@/components/table/filter-custom";
import { useTranslation } from "@/translations/client";
import { Download } from "lucide-react";
import { useMemo, useState } from "react";

export default function Reports() {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<
    Record<string, string | string[] | Option[] | Option>
  >({});
  const data = [
    {
      date: "2025-09-01",
      day: "Monday",
      carrefour: { orders: 120, sales: "$1,800" },
      lulu: { orders: 95, sales: "$1,350" },
      metro: { orders: 80, sales: "$1,200" },
      totalOrders: 295,
      totalSales: "$4,350",
      items: 450,
    },
    {
      date: "2025-09-02",
      day: "Tuesday",
      carrefour: { orders: 100, sales: "$1,600" },
      lulu: { orders: 88, sales: "$1,250" },
      metro: { orders: 90, sales: "$1,300" },
      totalOrders: 278,
      totalSales: "$4,150",
      items: 420,
    },
    {
      date: "2025-09-03",
      day: "Wednesday",
      carrefour: { orders: 110, sales: "$1,700" },
      lulu: { orders: 92, sales: "$1,280" },
      metro: { orders: 85, sales: "$1,250" },
      totalOrders: 287,
      totalSales: "$4,230",
      items: 435,
    },
    {
      date: "2025-09-04",
      day: "Thursday",
      carrefour: { orders: 130, sales: "$1,950" },
      lulu: { orders: 105, sales: "$1,500" },
      metro: { orders: 98, sales: "$1,400" },
      totalOrders: 333,
      totalSales: "$4,850",
      items: 490,
    },
    {
      date: "2025-09-05",
      day: "Friday",
      carrefour: { orders: 150, sales: "$2,200" },
      lulu: { orders: 120, sales: "$1,700" },
      metro: { orders: 110, sales: "$1,500" },
      totalOrders: 380,
      totalSales: "$5,400",
      items: 550,
    },
  ];
  const columns: {
    title: string;
    accessor: string;
  }[] = [
    { title: t("totalSales"), accessor: "totalSales" },
    { title: t("totalOrders"), accessor: "totalOrders" },
    //   { title: "شعار ", accessor: "logo" },
    { title: t("metro"), accessor: "metro" },
    { title: t("lulu"), accessor: "lulu" },
    { title: t("carrefour"), accessor: "carrefour" },
    { title: t("day"), accessor: "day" },
    { title: t("date"), accessor: "date" },
  ];

  const options = useMemo(() => {
    return data?.map((ele) => ({
      totalSales: ele?.totalSales,
      totalOrders: ele?.totalOrders,
      metro: (
        <div className="flex flex-col gap-2">
          <h3>
            {t("order")} {ele?.metro?.orders}
          </h3>
          <p>{ele?.metro?.sales}</p>
        </div>
      ),
      lulu: (
        <div className="flex flex-col gap-2">
          <h3>
            {t("order")} {ele?.lulu?.orders}
          </h3>
          <p>{ele?.lulu?.sales}</p>
        </div>
      ),
      carrefour: (
        <div className="flex flex-col gap-2">
          <h3>
            {t("order")} {ele?.carrefour?.orders}
          </h3>
          <p>{ele?.carrefour?.sales}</p>
        </div>
      ),
      day: ele?.day,
      date: ele?.date,
    }));
  }, [data]);
  const config: FilterConfig[] = [
    {
      type: "text",
      key: t("search"),
      placeholder: t("search"),
    },
    {
      type: "select",
      key: t("last_7_days"),
      placeholder: t("last_7_days"),
      options: Array.from(
        new Set(data.map((ele) => ele.date)) // Remove duplicates
      ).map((date) => ({ label: date, value: date })),
    },
  ];

  const filteredOptions = useMemo(() => {
    return options.filter((row) => {
      let match = true;

      // 🔍 Search filter (text)
      if (filters[t("search")] && typeof filters[t("search")] === "string") {
        const searchValue = (filters[t("search")] as string).toLowerCase();
        match =
          row.day.toLowerCase().includes(searchValue) ||
          row.date.toLowerCase().includes(searchValue) ||
          row.totalSales.toLowerCase().includes(searchValue) ||
          row.totalOrders.toString().includes(searchValue);
      }

      // 🔍 Date filter (select)
      if (filters[t("last_7_days")]) {
        match =
          match &&
          row.date
            .toLowerCase()
            .includes((filters[t("last_7_days")] as Option)?.value);
      }

      return match;
    });
  }, [options, filters]);

  const exportToCSV = () => {
    const csv = Papa.unparse(filteredOptions);
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
    <div className={`min-h-screen bg-white text-gray-800 font-sans `}>
      <div className="p-6 space-y-6 bg-gray-50">
        <div className="container mx-auto flex flex-col gap-2">
          <DashboardReportsCards />
          <StoreSales />
          <div className="grid grid-cols-1 gap-6 mt-3">
            {/* Left Panel - Individual Order Tracking */}
            <Card className="bg-white col-span-2 !gap-2">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <h4 className="leading-none font-semibold">{t("daily_report_orders")}</h4>
                  <div className="flex gap-2">
                    <Button
                      text={t("export_excel")}
                      startIcon={<Download className="h-4 w-4 ml-2" />}
                      className="!bg-gray-200 !text-black"
                      onClick={exportToCSV}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <DataTableFilters
                  config={config}
                  values={filters}
                  onChange={(newFilter, valueFilter) =>
                    setFilters((prev) => ({
                      ...prev,
                      [newFilter]: valueFilter,
                    }))
                  }
                  onClear={() => setFilters({})}
                />
                <Table columns={columns} items={filteredOptions} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
