import { auth } from "@/auth";
import { signOut } from "@/auth";

export async function POST() {
  try {
    const session = await auth();
    
    if (session?.idToken) {
      // Build Keycloak logout URL for server-side call
      const logoutUrl = new URL(
        `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/logout`
      );
      
      // Server-to-server logout request
      const response = await fetch(logoutUrl.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          "client_id": process.env.KEYCLOAK_CLIENT_ID!,
          "client_secret": process.env.KEYCLOAK_CLIENT_SECRET!,
          "refresh_token": session.refreshToken || "",
          "id_token_hint": session.idToken,
        }),
      });
      
      if (!response.ok) {
        console.error("Keycloak logout failed:", response.status, await response.text());
      }
    }
    
    // Clear NextAuth session
    await signOut({ redirect: false });
    
    return Response.json({ success: true });
    
  } catch (error) {
    console.error("Secure logout error:", error);
    
    // Try to at least clear NextAuth session
    try {
      await signOut({ redirect: false });
    } catch (signOutError) {
      console.error("SignOut fallback failed:", signOutError);
    }
    
    return Response.json(
      { error: "Logout failed" }, 
      { status: 500 }
    );
  }
}