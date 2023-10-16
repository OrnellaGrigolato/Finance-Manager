
import { decode } from 'jsonwebtoken';
interface DecodedToken {
  //a veces se devuelve un user_id a veces un id, si re remueve 1 va a haber errores con el token, causa que no se cargue ninguna ruta 
  user_id: number;
  id:number; 
  iat: number;
  exp: number;
}
const getUserDataFromToken = (token:string):DecodedToken |void  => {
   
  try {
    return decode(token) as DecodedToken;   } catch (error) {
    console.error('Error al decodificar el token:', error);

  }
}

export default getUserDataFromToken 