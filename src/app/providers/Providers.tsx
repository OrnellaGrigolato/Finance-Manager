"use client";
import { SessionProvider } from "next-auth/react";
import { createContext, useContext } from "react";
import getUserDataFromToken from "@/utils/authUtils";

import { useCookies } from "react-cookie";
const ApiContext = createContext<number | null>(null);

export function Providers({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useCookies(["token"]);

  let userData: number | null = null;

  const userInfo = token.token ? getUserDataFromToken(token.token) : null;
  userInfo ? (userData = userInfo.id) : null;
  return (
    <SessionProvider>
      <ApiContext.Provider value={userData}>{children}</ApiContext.Provider>
    </SessionProvider>
  );
}

export const useApiData = () => {
  return useContext(ApiContext);
};
