"use client";

import { signOut } from "next-auth/react";

interface User {
  email?: string;
  name?: string;
}

export function UserMenu({ user }: { user: User }) {
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-700">
        {user.email || user.name || "User"}
      </span>
      <button
        type="button"
        onClick={handleLogout}
        className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
      >
        Abmelden
      </button>
    </div>
  );
}