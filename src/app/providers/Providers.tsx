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
  
   //console.log("userData providers: ", userData);
  
    if (userData && userData.id) {
      fetch(`/api/users/${userData.id}`)
        .then((response) => response.json())
        .then((data) => {

          //console.log(data)

          setData(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token]);

//console.log("la data de providers que genera dashboard es: ", data)

  return data ? (
    <SessionProvider>
      <ApiContext.Provider value={data}>{children}</ApiContext.Provider>
    </SessionProvider>
  ) : null;
}

export const useApiData = () => {
  return useContext(ApiContext);
};
