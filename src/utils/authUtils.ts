
import { decode } from 'jsonwebtoken';
interface DecodedToken {
  id: number;
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