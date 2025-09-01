import { FetchContext } from "@/contexts/fetch.context";
import { useContext } from "react";

export const useFetch = () => {
  const context = useContext(FetchContext);

  if (!context) {
    throw new Error("useFetch must be used within a FetchProvider");
  }

  return context;
};
