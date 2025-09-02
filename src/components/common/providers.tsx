"use client";

import { AuthProvider } from "@/contexts/auth.context";
import { FetchProvider } from "@/contexts/fetch.context";
import { I18nProviderClient } from "@/translations/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SplinePointer } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import {  useMemo } from "react";
import { ToastContainer } from "react-toastify";
import { MainHeader } from "../header/main-header";

interface Props {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const Providers = ({ children }: Props) => {
  const { locale } = useParams();
  const pathname = usePathname();


const pathWithoutLang = useMemo(() => {
    return pathname?.replace(/(ar|en)/, "");
  }, [pathname]);

  const hideHeader = pathWithoutLang.includes("/login") ;
// console.log(authData,"authData",hideHeader,pathWithoutLang)
//    useEffect(() => {
//     if ( !authData?.token && pathWithoutLang !== "/login") {
//       router.replace("/login");
//     }
//   }, [authData,  pathWithoutLang]);


  return (
    <I18nProviderClient
      locale={locale ? String(locale) : "ar"}
      fallback={
        <div className="flex h-screen w-screen items-center justify-center bg-white">
          <SplinePointer />
        </div>
      }
    >
      {" "}
      <ToastContainer
        limit={3}
        position="bottom-center"
        autoClose={3000}
        // enableMultiContainer={false}
        theme="colored"
        style={{ zIndex: 100000 }}
        rtl={true}
      />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <FetchProvider>
            {/* <UserProvider> */}
            {!hideHeader && <MainHeader />} 
              {children}
            {/* </UserProvider> */}
          </FetchProvider>
        </AuthProvider>
      </QueryClientProvider>
    </I18nProviderClient>
  );
};
