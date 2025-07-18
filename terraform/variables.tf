variable "keycloak_url" {
  description = "The URL of the Keycloak server"
  type        = string
  default     = "http://localhost:8081"
}

variable "keycloak_admin_username" {
  description = "The admin username for Keycloak"
  type        = string
  default     = "admin"
}

variable "keycloak_admin_password" {
  description = "The admin password for Keycloak"
  type        = string
  default     = "admin"
  sensitive   = true
}

variable "realm_name" {
  description = "The name of the Keycloak realm"
  type        = string
  default     = "nextjs-app"
}

variable "client_id" {
  description = "The client ID for the Next.js application"
  type        = string
  default     = "nextjs-app"
}

variable "app_url" {
  description = "The URL of the Next.js application"
  type        = string
  default     = "http://localhost:3000"
}

variable "create_test_user" {
  description = "Whether to create a test user"
  type        = bool
  default     = true
}