import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import * as jose from "jose";

export default async function middleware(request: NextRequest) {
  // Step 1: Use the incoming request
  const defaultLocale = request.headers.get('x-default-locale') || 'en';


  
  // Step 2: Create and call the next-intl middleware
  const handleI18nRouting = createIntlMiddleware({
    locales: ['en', 'es'],
    defaultLocale,
    localePrefix: 'always'
  });
  const response = handleI18nRouting(request);
  // Step 3: Alter the response
  response.headers.set('x-default-locale', defaultLocale);

  const paths = ["/en/dashboard", "/es/dashboard", "/en/wallet", "/es/wallet", "/en/moves-form", "/es/moves-form", "/en/transaction", "/es/transaction", "/en/profile", "/es/profile"];
  // Check if the request is for /dashboard
  if (paths.includes(request.nextUrl.pathname)) {
    try {
      const userToken = request.cookies.get("token")?.value;
      if (!userToken) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
      await jose.jwtVerify(userToken, secret);
      
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/reset-password/(.*)']
};
