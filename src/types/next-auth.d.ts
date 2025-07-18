import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    idToken?: string;
    refreshToken?: string;
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}