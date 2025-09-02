"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/card";
import { useTranslation } from "@/translations/client";
import { ShoppingCart, Building } from "lucide-react";
import { MainCards } from "@/components/landing-page/main-cards";
import {  useMemo, useState } from "react";
import {
  DataTableFilters,
  FilterConfig,
} from "@/components/table/filter-custom";
import { Option } from "@/components/common/select";
import { Table } from "@/components/table";

export default function OrdersDashboard() {
  const { t, isRTL } = useTranslation();
  const [filters, setFilters] = useState<
    Record<string, string | string[] | Option[] | Option>
  >({});

  const cardData = [
    {
      id: 1,
      title: t("carrefour"),
      icon: <ShoppingCart size={20} className="text-gray-600" />,
      completion: t("carrefour_completion"),
      orders: t("carrefour_orders"),
      sales: t("carrefour_sales"),
      avgOrder: t("carrefour_avg_order"),
    },
    {
      id: 2,
      title: t("lulu_market"),
      icon: <Building size={20} className="text-gray-600" />,
      completion: t("lulu_completion"),
      orders: t("lulu_orders"),
      sales: t("lulu_sales"),
      avgOrder: t("lulu_avg_order"),
    },
    // Add more cards if needed
  ];
  
  const data = [
    {
      orderNumber: t("ord_001"),
      customer: t("ahmed_mohammed"),
      location: t("riyadh_narjis"),
      item: t("item_8"),
      store: t("carrefour"),
      amount: t("order_amount_1"),
      status: t("completed"),
      time: t("time_1030"),
      timePeriod: t("am"),
    },
    {
      orderNumber: t("ord_002"),
      customer: t("fatima_ali"),
      location: t("jeddah_zahraa"),
      item: t("item_12"),
      store: t("lulu_market"),
      amount: t("order_amount_2"),
      status: t("in_progress_status"),
      time: t("time_1115"),
      timePeriod: t("am"),
    },
    {
      orderNumber: t("ord_003"),
      customer: t("mohammed_saeed"),
      location: t("dammam_faisaliyah"),
      item: t("item_6"),
      store: t("metro_market"),
      amount: t("order_amount_3"),
      status: t("completed"),
      time: t("time_1200"),
      timePeriod: t("pm"),
    },
    {
      orderNumber: t("ord_004"),
      customer: t("noura_khaled"),
      location: t("riyadh_olya"),
      item: t("item_15"),
      store: t("carrefour"),
      amount: t("order_amount_4"),
      status: t("in_progress_status"),
      time: t("time_0145"),
      timePeriod: t("pm"),
    },
  ];
  
  const columns: {
    title: string;
    accessor: string;
  }[] = [
    { title: t("order_number"), accessor: "orderNumber" },
    { title: t("customer"), accessor: "customer" },
    //   { title: "شعار ", accessor: "logo" },
    { title: t("store"), accessor: "store" },
    { title: t("amount"), accessor: "amount" },
    { title: t("status"), accessor: "status" },
    { title: t("time"), accessor: "time" },
  ];

  const options = useMemo(() => {
    return data?.map((ele) => ({
      orderNumber: ele?.orderNumber,
      customer: ele?.customer,
      store: ele?.store,
      amount: ele?.amount,
      status: ele?.status,
      time: ele?.time,
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
      key: t("store"),
      placeholder: t("store"),
      options: [{ label: t("all"), value: "" },...Array.from(
        new Set(data.map((ele) => ele.store)) // Remove duplicates
      ).map((store) => ({ label: store, value: store }))],
    },
  ];
  
  const filteredOptions = useMemo(() => {
    return options.filter((row) => {
      let match = true;

      // 🔍 Search filter (text)
      if (filters[t("search")] && typeof filters[t("search")] === "string") {
        const searchValue = (filters[t("search")] as string).toLowerCase();
        match =
          row.amount.toLowerCase().includes(searchValue) ||
          row.customer.toLowerCase().includes(searchValue) ||
          row.orderNumber.toLowerCase().includes(searchValue) ||
          row.status.toString().includes(searchValue);
        row.store.toString().includes(searchValue);
      }

      // 🔍 Date filter (select)
      if (filters[t("store")]) {
        match =
          match &&
          row.store
            .toLowerCase()
            .includes((filters[t("store")] as Option)?.value);
      }

      return match;
    });
  }, [options, filters]);

  return (
    <div className={`min-h-screen bg-white text-gray-800 font-sans `}>
      <div className="p-6 space-y-6 bg-gray-50">
        <div className="container mx-auto flex flex-col gap-6">
          <MainCards />

          {/* Main Content Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Individual Order Tracking */}
            <Card className="bg-white col-span-2 !gap-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm ">
                  {t("individual_order_tracking")}
                </CardTitle>
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

            {/* Right Panel - Sales Volume per Store */}
            <Card className="bg-white !gap-3">
              <CardHeader className="pb-4">
                <div
                  className={`flex items-center justify-between  ${
                    isRTL ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <CardTitle className="text-sm font-semibold">
                    {t("sales_volume_per_store")}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {cardData.map((card) => (
                  <div
                    key={card.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    {/* Header */}
                    <div
                      className={`flex items-start justify-between mb-3 ${
                        isRTL ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      <div
                        className={`flex items-center gap-2 ${
                          isRTL ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        {card.icon}
                        <span className="font-medium text-sm">
                          {card.title}
                        </span>
                      </div>
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-[10px]">
                        {t("completed")} %{card.completion}
                      </span>
                    </div>

                    {/* Orders & Sales */}
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div className="flex flex-col items-end text-[12px]">
                        <p className=" text-gray-600">{t("orders")}</p>
                        <p className="font-bold">{card.orders}</p>
                      </div>
                      <div className="flex flex-col items-end text-[12px]">
                        <p className=" text-gray-600">{t("sales")}</p>
                        <p className="font-bold">
                          {card.sales} {t("sar")}
                        </p>
                      </div>
                    </div>

                    {/* Completion Rate */}
                    <div className="mb-3">
                      <div
                        className={`flex items-center justify-between mb-1 ${
                          isRTL ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        <span className="text-[12px] text-gray-600">
                          {t("completion_rate")}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gray-600 h-2 rounded-full"
                          style={{ width: `${card.completion}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Average Order */}
                    <p className="text-[10px] text-gray-600">
                      {t("average_order_value")}: {card.avgOrder} {t("sar")}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
