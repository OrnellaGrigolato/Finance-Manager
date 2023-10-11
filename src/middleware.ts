/* export { default } from "next-auth/middleware"

export const config = { matcher: ["/aquiVanLasRutasQueQueremosProteger"] } */
import * as jose from "jose";

import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export async function middleware(request: NextRequest) {
  const userToken = request.cookies.get("token")?.value;
  console.log(userToken);

    if (request.nextUrl.pathname === '/login' && !userToken) {
      return NextResponse.next()
    }

    if (!Boolean(userToken)) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const secret = new TextEncoder().encode(process.env.AUTH_SECRET)
    try {
      await jose.jwtVerify(userToken, secret);
    } catch (error) {
      console.error(error);
      if (request.nextUrl.pathname === '/login' ) {
        return NextResponse.next()
      }
      return NextResponse.redirect(new URL('/login', request.url))
    }
    

    /* else {
     return NextResponse.redirect(new URL('/dashboard', request.url))
     return ("Welcome to the Dashboard")
     
    } */
    return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/dashboard",
  ],
};