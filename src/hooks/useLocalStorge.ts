import { useState } from "react";

type LocalStorageHookReturnType<T> = {
  storedValue: T | undefined;
  setStoredValue: (key: string, value: T) => void;
  removeStoredValue: (key: string) => void;
};

const useLocalStorage = <T>(key?: string): LocalStorageHookReturnType<T> => {
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    try {
      if (key && typeof window !== "undefined") {
        const item = localStorage.getItem(key);

        return item ? (JSON.parse(item) as T) : undefined;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error("Error retrieving data from local storage:", error);

      return undefined;
    }
  });

  const setAndStoreValue = (key: string, value: T) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error storing data in local storage:", error);
    }
  };

  const removeStoredValue = (key: string) => {
    try {
      setStoredValue(undefined);
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing data from local storage:", error);
    }
  };

  return { storedValue, setStoredValue: setAndStoreValue, removeStoredValue };
};

export default useLocalStorage;
