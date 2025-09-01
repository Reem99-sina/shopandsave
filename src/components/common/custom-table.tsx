"use client";

import { useTranslation } from "@/translations/client";
import { CheckCircle, Clock, ShoppingCart, Building } from "lucide-react";
import { useState, useMemo } from "react";

interface TableColumn {
  key: string;
  label: string;
  width?: string;
  align?: "left" | "right" | "center";
  filterable?: boolean; // ✅ Add this
}

interface TableRow {
  [key: string]: any;
}

interface CustomTableProps {
  columns: TableColumn[];
  data: TableRow[];
  className?: string;
  showFilters?: boolean;
}

export const CustomTable: React.FC<CustomTableProps> = ({
  columns,
  data,
  className = "",
  showFilters = true,
}) => {
  const { t, isRTL } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Dynamic filters state
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  // ✅ Build filter options dynamically
  const filterOptions = useMemo(() => {
    const options: { [key: string]: string[] } = {};
    columns.forEach((col) => {
      if (col.filterable) {
        const uniqueValues = Array.from(new Set(data.map((row) => row[col.key])));
        options[col.key] = [t("all"), ...uniqueValues];
      }
    });
    return options;
  }, [columns, data]);

  // ✅ Handle filter change
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // ✅ Filtered data
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      // Search filter
      const matchesSearch =
        searchTerm === "" ||
        row.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.store?.toLowerCase().includes(searchTerm.toLowerCase());

      // Dynamic filters
      const matchesFilters = Object.keys(filters).every((key) => {
        return filters[key] === "all" || row[key] === filters[key];
      });

      return matchesSearch && matchesFilters;
    });
  }, [data, searchTerm, filters]);

  const getStoreIcon = (storeName: string) => {
    switch (storeName) {
      case t("carrefour"):
        return <ShoppingCart size={16} className="text-gray-600" />;
      case t("lulu_market"):
      case t("metro_market"):
        return <Building size={16} className="text-gray-600" />;
      default:
        return <ShoppingCart size={16} className="text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const isCompleted = status === t("completed");
    const Icon = isCompleted ? CheckCircle : Clock;
    const bgColor = isCompleted
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${bgColor} ${
          isRTL ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <Icon size={12} />
        {status}
      </span>
    );
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      {showFilters && (
        <div className="mb-4  rounded-lg">
          <div
            className={`flex flex-wrap items-center gap-4 ${
              isRTL ? "flex-row" : "flex-row-reverse"
            }`}
          >
            {/* ✅ Search Input */}
            <div className="flex-1">
              <input
                type="text"
                placeholder={t("search_orders_customers")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  isRTL ? "text-right" : "text-left"
                }`}
              />
            </div>

            {/* ✅ Dynamic Dropdown Filters */}
            {Object.keys(filterOptions).map((key) => (
              <div key={key} className="min-w-[150px]">
                <select
                  value={filters[key] || "all"}
                  onChange={(e) => handleFilterChange(key, e.target.value)}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {filterOptions[key].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            <div className="text-sm text-gray-600 min-w-[100px]">
              {t("results")}: {filteredData.length}
            </div>
          </div>
        </div>
      )}

      {/* ✅ Table */}
      <div className="min-w-full">
        {/* Header */}
        <div className="border-b border-gray-200">
          <div className="grid grid-cols-6 gap-4 py-3 px-4">
            {columns.map((column) => (
              <div
                key={column.key}
                className={`text-sm font-semibold text-gray-600 ${
                  isRTL ? "text-right" : "text-left"
                } ${column.width || ""}`}
              >
                {column.label}
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="divide-y divide-gray-100">
          {filteredData.length > 0 ? (
            filteredData.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-6 gap-4 py-3 px-4 hover:bg-gray-50 transition-colors"
              >
                {columns.map((column) => (
                  <div
                    key={column.key}
                    className={`text-sm ${
                      isRTL ? "text-right" : "text-left"
                    } ${column.width || ""}`}
                  >
                    {column.key === "orderNumber" && (
                      <span className="font-medium">{row[column.key]}</span>
                    )}
                    {column.key === "customer" && (
                      <div>
                        <p className="text-sm font-medium">
                          {row.customerName}
                        </p>
                        <p className="text-xs text-gray-500">{row.location}</p>
                        <p className="text-xs text-gray-400">{row.item}</p>
                      </div>
                    )}
                    {column.key === "store" && (
                      <div
                        className={`flex items-center gap-2 ${
                          isRTL ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        {getStoreIcon(row[column.key])}
                        <span className="text-sm">{row[column.key]}</span>
                      </div>
                    )}
                    {column.key === "amount" && (
                      <span className="font-medium">
                        {row[column.key]} {t("sar")}
                      </span>
                    )}
                    {column.key === "status" &&
                      getStatusBadge(row[column.key])}
                    {column.key === "time" && (
                      <span className="text-gray-600">
                        {row[column.key]} {row.timePeriod}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-gray-500">
              {t("no_results_found")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
