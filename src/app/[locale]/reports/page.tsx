"use client";

import DashboardReportsCards from "@/components/reports/reports";
import StoreSales from "@/components/reports/size-payment";

export default function Reports() {
  return (
    <div className={`min-h-screen bg-white text-gray-800 font-sans `}>
      <div className="p-6 space-y-6 bg-gray-50">
        <div className="container mx-auto flex flex-col gap-2">
            <DashboardReportsCards
            />
            <StoreSales/>
        </div>
      </div>
    </div>
  );
}
