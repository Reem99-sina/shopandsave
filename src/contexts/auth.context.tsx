
import { createContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorge";
import { useQueryClient } from "@tanstack/react-query";

type AuthData = {
  token: string;
};

type AuthValuesType = {
  isAuthenticated: boolean;
  authData: AuthData | null;
  logout: () => Promise<void>;
  authenticate: (authData: AuthData) => void;
};

type Props = {
  children: ReactNode;
};

const defaultProvider: AuthValuesType = {
  authData: null,
  isAuthenticated: false,
  logout: () => Promise.resolve(undefined),
  authenticate: () => null,
};

const AuthContext = createContext(defaultProvider);

const localStorageKey = "authData";

const AuthProvider = ({ children }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setStoredValue, storedValue, removeStoredValue } =
    useLocalStorage<AuthData>(localStorageKey);

  const [authData, setAuthData] = useState<AuthData | null>(
    storedValue || null
  );

  useEffect(() => {
    if (storedValue) {
      setAuthData(storedValue);
    }
  }, [storedValue]);

  const authenticate = async (newAuthData: AuthData) => {
    setStoredValue(localStorageKey, newAuthData);
    setAuthData(newAuthData);
  };

  const handleLogout = async () => {
    removeStoredValue(localStorageKey);
    queryClient.removeQueries();
    queryClient.resetQueries();
    queryClient.invalidateQueries();

    setAuthData(null);

    router.replace("/");
  };

  const values = {
    isAuthenticated: Boolean(authData),
    authData,
    authenticate,
    logout: handleLogout,
  };
  useEffect(() => {
    if (!storedValue) {
      router.replace("/login");
    }
  }, [storedValue, router]);
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
