"use client";
import { SessionProvider } from "next-auth/react";
import { createContext, useContext, useState, useEffect } from "react";
import getUserDataFromToken from "@/utils/authUtils";
import { ApiResponse } from "../types/type";
import { useCookies } from "react-cookie";
const ApiContext = createContext({
  finder: {
    id: 0,
    username: "",
    email: "",
    password: "",
    login_date: "",
    available_money: "",
    maxExpenditure: 100000,
    emailVerified: false,
    lastmove_amount: "",
    lastmove_date: "",
  },
  message: "string",
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<ApiResponse>();
  const [token, setToken] = useCookies(["token"]);

  useEffect(() => {
    const userData = token ? getUserDataFromToken(token.token) : null;

    fetch(`/api/users/${userData?.user_id}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  return data ? (
    <SessionProvider>
      <ApiContext.Provider value={data}>{children}</ApiContext.Provider>
    </SessionProvider>
  ) : null;
}

export const useApiData = () => {
  return useContext(ApiContext);
};
