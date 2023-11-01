"use client";
import { SessionProvider } from "next-auth/react";
import { createContext, useContext } from "react";
import getUserDataFromToken from "@/utils/authUtils";

import { useCookies } from "react-cookie";
const ApiContext = createContext<number | null>(null);

export function Providers({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useCookies(["token"]);

  let userData: { id: number } | null = null;

  if (token) {
    userData = getUserDataFromToken(token.token);
  }

  return (
    <SessionProvider>
      <ApiContext.Provider value={userData ? userData.id : null}>
        {children}
      </ApiContext.Provider>
    </SessionProvider>
  );
}

export const useApiData = () => {
  return useContext(ApiContext);
};
