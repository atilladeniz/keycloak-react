import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/config/auth.config";

export default auth((req) => {
  const { auth, nextUrl } = req;
  const isLoggedIn = !!auth?.user;
  const isOnHome = nextUrl.pathname === "/";
  
  // Auto-redirect to Keycloak if enabled and user is on home page and not logged in
  if (authConfig.autoRedirectToKeycloak && isOnHome && !isLoggedIn) {
    // Redirect to login page which will handle the auto-redirect
    return Response.redirect(new URL("/login?callbackUrl=/dashboard", nextUrl));
  }
  
  const response = NextResponse.next();
  
  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    `connect-src 'self' ${process.env.KEYCLOAK_BASE_URL || 'http://localhost:8081'} ${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}`,
    `frame-src 'self' ${process.env.KEYCLOAK_BASE_URL || 'http://localhost:8081'}`,
  ].join("; ");
  
  response.headers.set("Content-Security-Policy", csp);
  
  return response;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};