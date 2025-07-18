"use client";

import { useSession } from "next-auth/react";

export function UserInfo() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="animate-pulse">Lade...</div>;
  }

  if (!session) {
    return <div>Nicht angemeldet</div>;
  }

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-semibold mb-2">Benutzerinformationen</h3>
      <dl className="space-y-1">
        <div className="flex gap-2">
          <dt className="font-medium">Name:</dt>
          <dd>{session.user?.name || "Nicht angegeben"}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="font-medium">E-Mail:</dt>
          <dd>{session.user?.email}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="font-medium">ID:</dt>
          <dd className="font-mono text-sm">{session.user?.id}</dd>
        </div>
      </dl>
    </div>
  );
}