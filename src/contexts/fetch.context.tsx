/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { createContext, FC, ReactNode, useMemo } from "react";
import axios, { AxiosError, AxiosInstance } from "axios";
import { useAuth } from "@/hooks/auth.hook";
import { config } from "@/config";

const API_URL = config.NEXT_PUBLIC_BASE_URL;

interface AuthResponse {
  token: string;
  refreshToken: string;
}

type FetchContextInterface = {
  api: AxiosInstance;
};

type CreateInstanceParams = {
  url: string;
  token?: string;
  refreshToken?: string;
  callback: (authData: AuthResponse) => void;
  logout: () => void;
};

export const FetchContext = createContext<FetchContextInterface | null>(null);

const createInstance = ({
  url,
  refreshToken,
  callback,
  logout,
  token,
}: CreateInstanceParams) => {
  const instance = axios.create({
    baseURL: url,
  });

  instance.interceptors.request.use(
    (config) => {
      const axiosConfig = {
        ...config,
        
      };

      if (token) {
        axiosConfig.headers["Authorization"] = `${token}`;
      }

      return axiosConfig;
    },
    async (error) => await Promise.reject(error)
  );

  instance.interceptors.response.use(
    (res) => res?.data,
    async (error: AxiosError) => {
      if (error.code === "ERR_NETWORK" || error.code === "ECONNABORTED") {
        // TODO: handle if user offline

        return;
      }

      if (error.response?.status === 401) {
        if (!refreshToken) {
          return logout();
        }

        try {
          const response = await new Promise<AuthResponse>(
            (resolve, reject) => {
              // TODO: call refresh token API

              reject("not done");
            }
          );

          callback(response as AuthResponse);

          const config = error.config;

          if (!config) {
            throw error;
          }

          return instance(config);
        } catch (e) {
          logout();
        }
      }

      return await Promise.reject(error?.response?.data);
    }
  );

  return instance;
};

export const FetchProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const refreshToken = "";
  const { authData, logout } = useAuth();

  const api = useMemo(() => {
    return createInstance({
      url: API_URL as string,
      refreshToken,
      callback: () => {
        // TODO: update auth data
      },
      logout: () => {
        logout();
      },
      token: authData?.token,
    });
  }, [authData, refreshToken, logout]);

  const contextValue = useMemo(() => ({ api }), [api]);

  return (
    <FetchContext.Provider value={contextValue}>
      {children}
    </FetchContext.Provider>
  );
};
