import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function NotFound() {
  const session = await auth();
  
  // Wenn eingeloggt, redirect zum Dashboard
  if (session?.user) {
    redirect("/dashboard");
  }
  
  // Wenn nicht eingeloggt, zeige 404 Seite
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <p className="mt-2 text-lg text-gray-600">Seite nicht gefunden</p>
        <Link 
          href="/" 
          className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Zur Startseite
        </Link>
      </div>
    </div>
  );
}