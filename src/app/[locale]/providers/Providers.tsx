"use client";
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
    
      <ApiContext.Provider value={userData}>{children}</ApiContext.Provider>
   
  );
}

export const useApiData = () => {
  return useContext(ApiContext);
};
