import { LoginButton } from "@/components/auth/login-button";
import Link from "next/link";

export default function Home() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Keycloak React Demo
          </h1>
          <p className="mt-2 text-gray-600">
            Sichere Authentifizierung mit Next.js und Better-auth
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <LoginButton />
            <p className="text-sm text-gray-500">
              Melde dich mit deinem Keycloak-Konto an
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/dashboard"
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Direkt zum Dashboard →
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Features:
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Keycloak & Auth.js Integration</li>
            <li>PostgreSQL Datenbank</li>
            <li>Terraform Infrastructure as Code</li>
            <li>Docker Compose Setup</li>
            <li>TypeScript & Next.js 15.4</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
