import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SecureLogoutButton } from "@/components/auth/secure-logout-button";
import { UserInfo } from "@/components/auth/user-info";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold">Dashboard</h1>
              </div>
              <div className="flex items-center gap-2">
                <SecureLogoutButton />
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Willkommen im Dashboard!
              </h2>
              <p className="text-gray-600">
                Du bist erfolgreich angemeldet.
              </p>
            </div>

            <UserInfo />

            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">
                Session Details
              </h3>
              <pre className="text-sm text-blue-800 overflow-auto">
                {JSON.stringify(session, null, 2)}
              </pre>
            </div>
          </div>
        </main>
      </div>
  );
}