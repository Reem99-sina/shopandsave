"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/card";
import { Option } from "@/components/common/select";
import DealsDashboardCards from "@/components/deals/deals-card";
import { Table } from "@/components/table";
import {
  DataTableFilters,
  FilterConfig,
} from "@/components/table/filter-custom";
import { useTranslation } from "@/translations/client";
import { useMemo, useState } from "react";

export default function BigDeals() {
  const { t } = useTranslation();

  const [filters, setFilters] = useState<
    Record<string, string | string[] | Option[] | Option>
  >({});

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
      options: [
        { label: t("all"), value: "" },
        ...Array.from(new Set(data.map((ele) => ele.store))).map((store) => ({
          label: store,
          value: store,
        })),
      ],
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
        <div className="container mx-auto flex flex-col gap-2">
          <DealsDashboardCards />
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
        </div>
      </div>
    </div>
  );
}
