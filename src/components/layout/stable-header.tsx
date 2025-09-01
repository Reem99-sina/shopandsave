"use client";

import { useTranslation } from "@/translations/client";
import { useAuth } from "@/hooks/auth.hook";
import { 
  BarChart3, 
  FileText, 
  Home, 
  ShoppingCart, 
  User,
  LogOut,
  Settings
} from "lucide-react";
import { Button } from "@/components/common/button.component";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const StableHeader = () => {
  const { t, isRTL } = useTranslation();
  const {  isAuthenticated, logout } = useAuth();
  const pathname = usePathname();

  const navigationItems = [
    {
      key: 'home',
      label: t('home'),
      icon: <Home size={16} />,
      href: '/',
      active: pathname === '/'
    },
    {
      key: 'daily_reports',
      label: t('daily_reports'),
      icon: <FileText size={16} />,
      href: '/reports',
      active: pathname === '/reports'
    },
    {
      key: 'analytics',
      label: t('analytics'),
      icon: <BarChart3 size={16} />,
      href: '/analytics',
      active: pathname === '/analytics'
    },
    {
      key: 'big_deals',
      label: t('big_deals'),
      icon: <ShoppingCart size={16} />,
      href: '/deals',
      active: pathname === '/deals'
    }
  ];

  const handleLogout = () => {
    logout();
    // Redirect will be handled by useAuthGuard
  };

  if (!isAuthenticated) {
    return null; // Don't show header if not authenticated
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="px-6 py-4">
        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          {/* Left side - Logo and Navigation */}
          <div className={`flex items-center gap-8 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            {/* Logo/Title */}
            <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors">
              {t('orders_dashboard')}
            </Link>
            
            {/* Navigation Menu */}
            <nav className={`flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              {navigationItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    item.active
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side - User Profile */}
          <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            {/* User Info */}
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">
                  { t('welcome_user')}
                </p>
                <p className="text-xs text-gray-500">
                  { 'Admin'}
                </p>
              </div>
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <User size={20} className="text-gray-600" />
              </div>
            </div>

            {/* User Menu */}
            <div className="relative group">
              <Button
                text=""
                className="w-10 h-10 p-0 rounded-full bg-gray-100 hover:bg-gray-200"
                startIcon={<Settings size={16} className="text-gray-600" />}
              />
              
              {/* Dropdown Menu */}
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <button
                    onClick={handleLogout}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors ${
                      isRTL ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <LogOut size={16} />
                    <span>{t('logout')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
