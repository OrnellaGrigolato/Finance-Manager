/* export { default } from "next-auth/middleware"

export const config = { matcher: ["/aquiVanLasRutasQueQueremosProteger"] } */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

export async function authMiddleware(request: NextRequest) {
  const response = NextResponse.next();
  const cookieStore = request.cookies;

  try {
    const userToken = request.cookies.get("token")?.value;
    if (!userToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);

    await jose.jwtVerify(userToken, secret);
    /* else {
    return NextResponse.redirect(new URL('/dashboard', request.url))
   } */
    return response;
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard", "/wallet", "/moves-form", "/transaction", "/profile"],
};
