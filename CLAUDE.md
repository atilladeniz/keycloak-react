# Keycloak-React Projekt Konventionen

## Überblick
Dieses Projekt nutzt Next.js mit Auth.js (NextAuth.js v5) für die Authentifizierung über Keycloak und PostgreSQL als Datenbank.

## Tech Stack
- **Frontend**: Next.js 15+ (App Router)
- **Authentifizierung**: Auth.js (NextAuth.js v5) mit Keycloak Provider
- **Datenbank**: PostgreSQL mit Drizzle ORM
- **Infrastructure as Code**: Terraform
- **Container**: Docker & Docker Compose
- **Styling**: Tailwind CSS
- **Reverse Proxy**: Nginx (Production)

## Entwicklungsumgebung

### Services
- **Keycloak**: http://localhost:8081/admin/master/console/
  - Benutzer: admin
  - Passwort: admin
- **PostgreSQL**: localhost:5433
  - Passwort: password
- **Next.js App**: http://localhost:3000

## Code-Konventionen

### TypeScript
- Strikt typisierte Interfaces für alle API-Responses
- Keine `any` Typen verwenden
- Funktionale Komponenten mit TypeScript

### Ordnerstruktur
```
src/
├── app/                    # Next.js App Router
├── components/            # React Komponenten
│   ├── auth/             # Auth-spezifische Komponenten
│   └── ui/               # Wiederverwendbare UI Komponenten
├── lib/                  # Utilities und Konfigurationen
│   ├── auth/            # Auth.js Konfiguration
│   └── db/              # Datenbankverbindung
├── hooks/               # Custom React Hooks
└── types/               # TypeScript Type Definitionen
```

### Environment Variablen
Alle sensiblen Daten in `.env.local`:
- Datenbank-Verbindungen
- Keycloak Client Secrets
- API Keys

### Testing & Linting
```bash
npm run lint        # ESLint prüfen
npm run typecheck   # TypeScript prüfen
npm run dev         # Entwicklungsserver
```

### Git Workflow
- Feature Branches vom `main` Branch
- Aussagekräftige Commit Messages
- Pull Requests mit klarer Beschreibung

## Sicherheit
- Keine Secrets im Code
- Environment Variablen für alle sensiblen Daten
- HTTPS in Produktion
- CSP Headers konfigurieren