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
    isBlocked: false,
  },
  message: "string",
});

const defaultApiResponse = {
  finder: {
    id: 0,
    username: "",
    email: "",
    password: "",
    login_date: "",
    maxExpenditure: 100000,
    emailVerified: false,
    available_money: "",
    lastmove_amount: "",
    lastmove_date: "",
    isBlocked: false,
  },
  message: "Usuario no autenticado",
};

export function Providers({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<ApiResponse>();
  const [token, setToken] = useCookies(["token"]);
  useEffect(() => {

    const userData = token.token!=='' ? getUserDataFromToken(token.token) : null;

    if (userData && userData.id) {
      fetch(`/api/users/${userData.id}`)
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.log(error));
    } else {
      setData(defaultApiResponse);
    }
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
