import { decode } from "jsonwebtoken";
import Cookies from "js-cookie";

export interface DecodedToken {
  id: number;
  iat: number;
  exp: number;
}

const getUserDataFromToken = (token: string): DecodedToken | void => {
  console.log(token);
  try {
    const decodedToken = decode(token) as DecodedToken;
    const currentDate = Math.floor(Date.now() / 1000);

    if (decodedToken.exp < currentDate) {
      Cookies.set("token", "");
      return;
    }

    return decodedToken;
  } catch (error) {
    console.error("Error al decodificar el token:", error);
  }
};

export default getUserDataFromToken;
