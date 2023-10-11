/* export { default } from "next-auth/middleware"

export const config = { matcher: ["/aquiVanLasRutasQueQueremosProteger"] } */
import  Cookies  from "js-cookie";

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export function middleware(request: NextRequest) {
  /* const userToken = Cookies.get('token'); */
  const userToken = request.cookies.get("token")?.value;
  /* console.log(userToken) */

  if(!userToken) {
     return NextResponse.redirect(new URL('/login',request.url))
  }

  else {
   return NextResponse.redirect(new URL('/dashboard', request.url))
   return ("Welcome to the Dashboard")
   
  }
}

export const config = {
  matcher: "/das"
}