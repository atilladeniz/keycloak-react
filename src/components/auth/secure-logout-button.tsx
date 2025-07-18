"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";

export function SecureLogoutButton() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      
      // Server-side logout is more secure than iframe approach
      const response = await fetch("/api/auth/secure-logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin", // Important for security
      });
      
      if (!response.ok) {
        throw new Error("Logout failed");
      }
      
      // Clear client-side storage
      localStorage.clear();
      sessionStorage.clear();
      
      // Clear only auth-related cookies
      const authCookies = ['next-auth.session-token', 'next-auth.csrf-token', 'next-auth.callback-url'];
      authCookies.forEach(name => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=lax`;
      });
      
      // Redirect to home
      window.location.href = "/";
      
    } catch (error) {
      console.error("Logout error:", error);
      // Fallback to client-side signOut
      await signOut({ callbackUrl: "/" });
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
    >
      {isLoggingOut ? "Abmelden..." : "Abmelden"}
    </button>
  );
}