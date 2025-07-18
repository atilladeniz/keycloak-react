terraform {
  required_providers {
    keycloak = {
      source  = "mrparkers/keycloak"
      version = ">= 4.0.0"
    }
  }
  required_version = ">= 1.0"
}

provider "keycloak" {
  client_id     = "admin-cli"
  username      = var.keycloak_admin_username
  password      = var.keycloak_admin_password
  url           = var.keycloak_url
  initial_login = false
}

# Realm erstellen (optional, wenn nicht master verwendet wird)
resource "keycloak_realm" "nextjs_realm" {
  realm   = var.realm_name
  enabled = true

  registration_allowed          = true
  registration_email_as_username = false
  remember_me                   = true
  reset_password_allowed        = true
  edit_username_allowed         = false

  login_theme = "keycloak"

  internationalization {
    supported_locales = ["en", "de"]
    default_locale    = "de"
  }

  security_defenses {
    brute_force_detection {
      permanent_lockout                = false
      max_login_failures               = 10
      wait_increment_seconds           = 60
      quick_login_check_milli_seconds  = 1000
      minimum_quick_login_wait_seconds = 60
      max_failure_wait_seconds         = 900
      failure_reset_time_seconds       = 43200
    }
  }

  password_policy = "upperCase(1) and lowerCase(1) and digits(1) and specialChars(1) and length(8)"
}

# Client für Next.js App
resource "keycloak_openid_client" "nextjs_client" {
  realm_id                     = keycloak_realm.nextjs_realm.id
  client_id                    = var.client_id
  name                         = "Next.js Application"
  enabled                      = true
  access_type                  = "CONFIDENTIAL"
  standard_flow_enabled        = true
  implicit_flow_enabled        = false
  direct_access_grants_enabled = true
  service_accounts_enabled     = true

  root_url = var.app_url
  base_url = var.app_url

  valid_redirect_uris = [
    "${var.app_url}/*",
    "${var.app_url}/api/auth/callback/keycloak"
  ]

  web_origins = [
    var.app_url,
    "+"
  ]

  admin_url = var.app_url

  # Logout configuration
  frontchannel_logout_enabled = true
  frontchannel_logout_url     = "${var.app_url}/api/auth/logout-callback"
  backchannel_logout_url      = "${var.app_url}/api/auth/secure-logout"
  
  # Post logout redirect URIs - direkt unterstützt ab Provider v4.4.0
  valid_post_logout_redirect_uris = [
    "${var.app_url}/*",
    "${var.app_url}/",
    "${var.app_url}"
  ]
  
  extra_config = {
    "frontchannel.logout.session.required" = "false"
  }

  # authentication_flow_binding_overrides {
  #   browser_id = keycloak_authentication_flow.browser_flow.id
  # }
}

# Client Secret ausgeben
resource "keycloak_openid_client_default_scopes" "nextjs_client_default_scopes" {
  realm_id  = keycloak_realm.nextjs_realm.id
  client_id = keycloak_openid_client.nextjs_client.id

  default_scopes = [
    "openid",
    "profile",
    "email",
    "roles",
    "web-origins"
  ]
}

# Optionale Client Scopes
resource "keycloak_openid_client_optional_scopes" "nextjs_client_optional_scopes" {
  realm_id  = keycloak_realm.nextjs_realm.id
  client_id = keycloak_openid_client.nextjs_client.id

  optional_scopes = [
    "address",
    "phone",
    "offline_access"
  ]
}

# Browser Flow für bessere Sicherheit - DEAKTIVIERT weil es Probleme verursacht
# resource "keycloak_authentication_flow" "browser_flow" {
#   realm_id    = keycloak_realm.nextjs_realm.id
#   alias       = "browser-with-otp"
#   description = "Browser flow with conditional OTP"
# }

# Beispiel-Benutzer (nur für Development)
resource "keycloak_user" "test_user" {
  count    = var.create_test_user ? 1 : 0
  realm_id = keycloak_realm.nextjs_realm.id
  username = "testuser"
  enabled  = true

  email      = "test@example.com"
  first_name = "Test"
  last_name  = "User"

  initial_password {
    value     = "Test1234!"
    temporary = false
  }
}

# Rolle für Benutzer
resource "keycloak_role" "user_role" {
  realm_id    = keycloak_realm.nextjs_realm.id
  name        = "user"
  description = "Regular user role"
}

resource "keycloak_role" "admin_role" {
  realm_id    = keycloak_realm.nextjs_realm.id
  name        = "admin"
  description = "Administrator role"
}

# Protocol Mapper für Rollen
resource "keycloak_generic_protocol_mapper" "roles_mapper" {
  realm_id  = keycloak_realm.nextjs_realm.id
  client_id = keycloak_openid_client.nextjs_client.id
  name      = "realm-roles"

  protocol         = "openid-connect"
  protocol_mapper  = "oidc-usermodel-realm-role-mapper"

  config = {
    "multivalued"       = "true"
    "claim.name"        = "roles"
    "jsonType.label"    = "String"
    "id.token.claim"    = "true"
    "access.token.claim" = "true"
    "userinfo.token.claim" = "true"
  }
}

# Protocol Mapper für User ID
resource "keycloak_generic_protocol_mapper" "user_id_mapper" {
  realm_id  = keycloak_realm.nextjs_realm.id
  client_id = keycloak_openid_client.nextjs_client.id
  name      = "user-id"

  protocol         = "openid-connect"
  protocol_mapper  = "oidc-usermodel-attribute-mapper"

  config = {
    "user.attribute"    = "id"
    "claim.name"        = "user_id"
    "jsonType.label"    = "String"
    "id.token.claim"    = "true"
    "access.token.claim" = "true"
    "userinfo.token.claim" = "true"
  }
}