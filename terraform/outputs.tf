output "realm_id" {
  description = "The ID of the created realm"
  value       = keycloak_realm.nextjs_realm.id
}

output "client_id" {
  description = "The client ID for the Next.js application"
  value       = keycloak_openid_client.nextjs_client.client_id
}

output "client_secret" {
  description = "The client secret for the Next.js application"
  value       = keycloak_openid_client.nextjs_client.client_secret
  sensitive   = true
}

output "issuer_url" {
  description = "The OIDC issuer URL"
  value       = "${var.keycloak_url}/realms/${keycloak_realm.nextjs_realm.realm}"
}

output "authorization_url" {
  description = "The authorization endpoint URL"
  value       = "${var.keycloak_url}/realms/${keycloak_realm.nextjs_realm.realm}/protocol/openid-connect/auth"
}

output "token_url" {
  description = "The token endpoint URL"
  value       = "${var.keycloak_url}/realms/${keycloak_realm.nextjs_realm.realm}/protocol/openid-connect/token"
}

output "userinfo_url" {
  description = "The userinfo endpoint URL"
  value       = "${var.keycloak_url}/realms/${keycloak_realm.nextjs_realm.realm}/protocol/openid-connect/userinfo"
}

output "test_user_credentials" {
  description = "Test user credentials (only if created)"
  value = var.create_test_user ? {
    username = "testuser"
    password = "Test1234!"
    email    = "test@example.com"
  } : null
  sensitive = true
}