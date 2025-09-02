"use client";
import DashboardAnalysisCards from "@/components/anaylsis/card-anaylsis";
import BarChartComponent from "@/components/charts/barchart/bar-chart";
import CustomLineChart from "@/components/charts/dotchart";
import { CustomPie } from "@/components/charts/pieChart/custom-pie-chart";
import { Card } from "@/components/common/card";
import ProgressBar from "@/components/common/progress";
import { useTranslation } from "@/translations/client";

export default function Analytics() {
  const { t } = useTranslation();
  const pieChartData = [
    { name: t("carrefour"), value: 45, color: "#f59e0b" },
    { name: t("lulu"), value: 52, color: "#3b82f6" },
    { name: t("metro"), value: 48, color: "#10b981" },
  ];
  const importantProductCategories = [
    {
      label: t("dashboard.product_categories.fruits_vegetables"),
      value: "89",
      color: "bg-black",
    },
    {
      label: t("dashboard.product_categories.dairy"),
      value: "67",
      color: "bg-black",
    },
    {
      label: t("dashboard.product_categories.meat_poultry"),
      value: "54",
      color: "bg-black",
    },
    {
      label: t("dashboard.product_categories.bakery"),
      value: "42",
      color: "bg-black",
    },
    {
      label: t("dashboard.product_categories.others"),
      value: "28",
      color: "bg-black",
    },
  ];

  const weeklyOrdersStackedData = [
    { name: t("dashboard.days.saturday"), online: 20, offline: 25 },
    { name: t("dashboard.days.sunday"), online: 22, offline: 30 },
    { name: t("dashboard.days.monday"), online: 18, offline: 30 },
    { name: t("dashboard.days.tuesday"), online: 35, offline: 26 },
    { name: t("dashboard.days.wednesday"), online: 28, offline: 27 },
    { name: t("dashboard.days.thursday"), online: 33, offline: 25 },
    { name: t("dashboard.days.friday"), online: 40, offline: 24 },
  ];

  const config = {
    online: { label: t("dashboard.charts.orders"), color: "#00000" },
  };

  const configLine = {
    orders: { label:  t("dashboard.charts.orders"), color: "#00000" },
  };

  const dataLine = [
    { hour: 0, orders: 5 },
    { hour: 1, orders: 3 },
    { hour: 2, orders: 2 },
    { hour: 3, orders: 1 },
    { hour: 4, orders: 2 },
    { hour: 5, orders: 4 },
    { hour: 6, orders: 6 },
    { hour: 7, orders: 8 },
    { hour: 8, orders: 12 },
    { hour: 9, orders: 18 },
    { hour: 10, orders: 25 },
    { hour: 11, orders: 30 },
    { hour: 12, orders: 28 },
    { hour: 13, orders: 26 },
    { hour: 14, orders: 22 },
    { hour: 15, orders: 24 },
    { hour: 16, orders: 20 },
    { hour: 17, orders: 18 },
    { hour: 18, orders: 22 },
    { hour: 19, orders: 28 },
    { hour: 20, orders: 30 },
    { hour: 21, orders: 26 },
    { hour: 22, orders: 18 },
    { hour: 23, orders: 10 },
  ];
  return (
    <div className={`min-h-screen bg-white text-gray-800 font-sans `}>
      <div className="p-6 space-y-6 bg-gray-50">
        <div className="container mx-auto flex flex-col gap-2">
          <DashboardAnalysisCards />

          <div className="grid grid-cols-2 gap-3">
            <CustomPie
              data={pieChartData}
              title={t("dashboard.title_pie_chart")}
              config={{
                a: {
                  label: "A",
                  color: "#6259ca",
                },
                b: {
                  label: "B",
                  color: "#eb6f33",
                },
                c: {
                  label: "C",
                  color: "#0774f8",
                },
                d: {
                  label: "D",
                  color: "#ec546c",
                },
              }}
            />
            <BarChartComponent
              config={config}
              data={weeklyOrdersStackedData}
              height="h-[300px]"
              title={t("dashboard.title_bar_chart")}
            />
            <CustomLineChart
              title={t("dashboard.title_line_chart")}
              data={dataLine}
              config={configLine}
              xKey="hour"
              yKey="orders"
            />
            <Card className="bg-white px-5">
              <h3 className="text-sm font-semibold">{t("dashboard.title_product_categories")}</h3>
              <div className="flex flex-col gap-3">
                {importantProductCategories?.map((ele, index) => (
                  <ProgressBar
                    value={Number(ele?.value)}
                    color={ele?.color}
                    title={ele?.label}
                    key={index}
                  />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
