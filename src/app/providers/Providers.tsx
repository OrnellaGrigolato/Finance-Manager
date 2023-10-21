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
  },
  message: "Usuario no autenticado",
};

export function Providers({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<ApiResponse>();
  const [token, setToken] = useCookies(["token"]);

  useEffect(() => {

    //console.log(getUserDataFromToken(token.token))

    const userData = token ? getUserDataFromToken(token.token) : null;
  
   /* console.log("userData: ", userData);
   console.log("userData.user_id", userData?.user_id)
   console.log("userData.id", userData?.id) */
   
   if (userData && userData.user_id) {
    fetch(`/api/users/${userData.user_id}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  } 
  
  else if (userData && userData.id) {
    fetch(`/api/users/${userData.id}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  } 
  
  else {
    //se hace un estado default para que se muestre las rutas y no llamar a la api que retorna error 500 por ruta api/users/undefined 
    //si el usuario no tiene token pasa esto, userData es undefined, se retorna null y se cargan las rutas con usuario deslogeado
   /*  fetch(`/api/users/${userData?.user_id}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
      
    } */
  //esta linea resuelve el error users/undefined error 500
    setData(defaultApiResponse)

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
