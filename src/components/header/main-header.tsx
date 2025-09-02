"use client";

import Link from "next/link";
import { useTranslation } from "@/translations/client";
import {
  Home,
  FileText,
  BarChart3,
  ShoppingCart,
  User,
  LogOut,
  Languages,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import clsx from "clsx";
import { useAuth } from "@/hooks/auth.hook";

export function MainHeader() {
  const { isRTL, t, changeLanguage, lang } = useTranslation();
  const params = usePathname();
  const { logout } = useAuth();
  const pathWithoutLang = useMemo(() => {
    return params?.replace(/(ar|en)/, "").replace(/\/{2,}/g, "/");
  }, [params]);

  const navLinks = [
    { label: t("home"), icon: Home, href: "/" },
    { label: t("daily_reports"), icon: FileText, href: "/reports" },
    { label: t("analytics"), icon: BarChart3, href: "/analytics" },
    { label: t("big_deals"), icon: ShoppingCart, href: "/big-deals" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div
        className={`flex items-center justify-between container mx-auto ${
          isRTL ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Title and Navigation Menu */}
        <div
          className={`flex items-center gap-8 ${
            isRTL ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <h1 className="text-2xl font-bold text-gray-800">
            {t("orders_dashboard")}
          </h1>

          {/* Navigation Menu */}
          <div
            className={`flex items-center gap-2 ${
              isRTL ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {navLinks.map(({ label, icon: Icon, href }, index) => (
              <Link
                key={index}
                href={href}
                className={clsx(
                  "flex items-center gap-2   px-4 py-2 rounded-lg transition-colors hover:bg-gray-100 !text-sm",
                  pathWithoutLang == href
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:text-gray-800"
                )}
              >
                <span>{label}</span>
                <Icon size={16} />
              </Link>
            ))}
          </div>
        </div>

        {/* User Profile */}
        <div
          className={`flex items-center gap-3 ${
            isRTL ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <LogOut
            className="text-black cursor-pointer"
            onClick={() => {
              logout();
            }}
          />
          <Languages
            className="text-black cursor-pointer"
            onClick={() => {
              changeLanguage(lang == "ar" ? "en" : "ar");
            }}
          />
          <span className="text-gray-600">{t("welcome_user")}</span>
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <User size={16} className="text-gray-600" />
          </div>
        </div>
      </div>
    </nav>
  );
}
