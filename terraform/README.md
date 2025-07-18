# Terraform Keycloak Setup

Diese Terraform-Konfiguration erstellt automatisch die komplette Keycloak-Infrastruktur für das Next.js Projekt.

## Was wird erstellt?

- ✅ Keycloak Realm (`nextjs-app`)
- ✅ OpenID Connect Client mit allen Konfigurationen
- ✅ Logout-Konfiguration (Front-Channel & Back-Channel)
- ✅ Valid Post Logout Redirect URIs (automatisch konfiguriert)
- ✅ Sicherheitseinstellungen (Brute Force Detection, Passwort-Policy)
- ✅ Test-Benutzer (optional)
- ✅ Rollen (user, admin)
- ✅ Protocol Mappers für Rollen und User ID

## Voraussetzungen

- Terraform >= 1.0
- Laufende Keycloak-Instanz (via Docker Compose)
- Admin-Zugangsdaten für Keycloak

## Installation

1. Terraform initialisieren:
```bash
cd terraform
terraform init
```

2. Konfiguration anpassen:
```bash
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars mit deinen Werten
```

3. Terraform ausführen:
```bash
terraform plan  # Vorschau der Änderungen
terraform apply # Änderungen anwenden
```

## Outputs

Nach erfolgreichem Apply werden folgende Werte ausgegeben:
- Client ID
- Client Secret (sensitiv)
- Realm Name
- Issuer URL

Diese Werte können direkt in die `.env.local` übernommen werden.

## Aufräumen

```bash
terraform destroy
```

## Besonderheiten

### Post Logout Redirect URIs
Die `valid_post_logout_redirect_uris` werden direkt in Terraform konfiguriert. Dies funktioniert ab Keycloak Provider Version 4.4.0. Falls du eine ältere Version verwendest, nutze den Workaround über `extra_config`:

```hcl
extra_config = {
  "post.logout.redirect.uris" = "http://localhost:3000/*##http://localhost:3000/##http://localhost:3000"
}
```

### Hinweis zu Shell-Scripts
Die Shell-Scripts im `/scripts` Ordner wurden durch diese Terraform-Konfiguration ersetzt:
- ✅ `create-test-user.sh` - Ersetzt durch `keycloak_user` Resource
- ✅ `update-keycloak-client.sh` - Ersetzt durch `keycloak_openid_client` Resource
- ✅ `fix-keycloak-logout.sh` - Ersetzt durch Logout-Konfiguration im Client