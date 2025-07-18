import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Keycloak({
      clientId: process.env.KEYCLOAK_CLIENT_ID as string,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET as string,
      issuer: `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}`,
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLogin = nextUrl.pathname === "/login";
      const isOnHome = nextUrl.pathname === "/";

      // Wenn eingeloggt
      if (isLoggedIn) {
        // Redirect von Login oder Home zum Dashboard
        if (isOnLogin || isOnHome) {
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
        // Alle anderen Routen erlauben
        return true;
      }

      // Wenn nicht eingeloggt
      if (!isLoggedIn) {
        // Nur Home und Login erlauben
        if (isOnHome || isOnLogin) {
          return true;
        }
        // Alle anderen Routen zum Home redirecten
        return Response.redirect(new URL("/", nextUrl));
      }

      return true;
    },
    jwt({ token, account }) {
      if (account) {
        token.idToken = account.id_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
    session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.idToken) {
        session.idToken = token.idToken as string;
      }
      if (token.refreshToken) {
        session.refreshToken = token.refreshToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/",
  },
  session: {
    strategy: "jwt",
  },
});
