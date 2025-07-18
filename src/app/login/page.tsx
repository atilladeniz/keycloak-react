import { LoginButton } from "@/components/auth/login-button";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { authConfig } from "@/config/auth.config";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const session = await auth();
  const params = await searchParams;

  if (session) {
    redirect(params.callbackUrl || "/dashboard");
  }

  // If autoRedirectToKeycloak is enabled, perform server-side redirect
  if (authConfig.autoRedirectToKeycloak) {
    const callbackUrl = params.callbackUrl || "/dashboard";
    // Redirect to the NextAuth signin endpoint
    redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-sm w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Anmelden</h2>
          <p className="mt-2 text-sm text-gray-600">
            Melde dich mit deinem Keycloak-Konto an
          </p>
        </div>
        <div className="mt-8">
          <LoginButton />
        </div>
      </div>
    </div>
  );
}