import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    
    if (session?.idToken) {
      // Build the Keycloak end session URL
      const endSessionUrl = new URL(
        `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/logout`
      );
      
      // Add required parameters
      endSessionUrl.searchParams.set("id_token_hint", session.idToken);
      endSessionUrl.searchParams.set(
        "post_logout_redirect_uri", 
        process.env.AUTH_URL || "http://localhost:3000"
      );
      
      // Return the logout URL for client-side handling
      return Response.json({ 
        url: endSessionUrl.toString() 
      });
    }
    
    // No session or no ID token
    return Response.json({ 
      url: "/" 
    });
    
  } catch (error) {
    console.error("Federated logout error:", error);
    return Response.json({ 
      url: "/" 
    });
  }
}