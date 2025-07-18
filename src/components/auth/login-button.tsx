"use client";

import { signIn } from "next-auth/react";

export function LoginButton() {
  const handleLogin = () => {
    signIn("keycloak", { callbackUrl: "/dashboard" });
  };

  return (
    <button
      type="button"
      onClick={handleLogin}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
    >
      Mit Keycloak anmelden
    </button>
  );
}