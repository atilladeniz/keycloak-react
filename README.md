# Next.js + Keycloak + Auth.js

Eine moderne Full-Stack-Authentifizierungslösung mit Next.js 15, Keycloak und Auth.js (NextAuth.js v5).

## 🚀 Features

- **Next.js 15** mit App Router
- **Keycloak** als Identity Provider
- **Auth.js** (NextAuth.js v5) für Session Management
- **PostgreSQL** mit Drizzle ORM
- **Terraform** für Infrastructure as Code
- **Docker Compose** für lokale Entwicklung
- **TypeScript** für Type Safety
- **Tailwind CSS** für Styling
- **Sicherer Logout** mit Server-seitiger Keycloak-Integration

## 📋 Voraussetzungen

- Node.js 18+
- Docker & Docker Compose
- Terraform (optional, für automatisches Keycloak-Setup)

## 🛠️ Installation

### 1. Repository klonen

```bash
git clone <repository-url>
cd keycloak-react
```

### 2. Dependencies installieren

```bash
npm install
```

### 3. Environment-Variablen einrichten

```bash
cp .env.example .env.local
# Bearbeite .env.local mit deinen Werten
```

### 4. Services starten

```bash
# Starte Keycloak und PostgreSQL
docker-compose up -d

# Warte bis Keycloak bereit ist (ca. 30 Sekunden)

# Hinweis: Docker-Dateien befinden sich im /docker Ordner
```

### 5. Keycloak konfigurieren

**Option A: Mit Terraform (empfohlen)**

```bash
cd terraform
terraform init
terraform apply
# Die Outputs enthalten alle benötigten Werte für .env.local
```

**Option B: Manuell**
- Öffne http://localhost:8081/admin
- Login: admin / admin
- Erstelle Realm, Client und User manuell

### 6. Datenbank initialisieren

```bash
# Migrations ausführen mit Drizzle
npm run db:push

# Oder für Production mit Migrations:
npm run db:migrate
```

### 7. Entwicklungsserver starten

```bash
npm run dev
```

Die App ist jetzt unter http://localhost:3000 verfügbar!

## 🔐 Authentifizierung

### Login-Flow Konfiguration

Die App unterstützt zwei Login-Modi, die über `/src/config/auth.config.ts` konfiguriert werden:

**Standard-Modus (`autoRedirectToKeycloak: false`):**
1. Benutzer sieht die Login-Seite
2. Klickt auf "Mit Keycloak anmelden"
3. Weiterleitung zu Keycloak Login
4. Nach erfolgreichem Login zurück zur App

**Auto-Redirect-Modus (`autoRedirectToKeycloak: true`):**
1. Benutzer wird automatisch zu Keycloak weitergeleitet
2. Kein Zwischenschritt über die Login-Seite
3. Nach erfolgreichem Login direkt zum Dashboard

```typescript
// src/config/auth.config.ts
export const authConfig = {
  autoRedirectToKeycloak: true, // Aktiviert direkten Keycloak-Login
};
```

### Logout-Flow
- Sicherer Server-seitiger Logout
- Beendet Sessions in beiden Systemen (App & Keycloak)
- Keine sichtbare Weiterleitung zu Keycloak

## 🏗️ Projektstruktur

```
src/
├── app/                    # Next.js App Router
│   ├── api/auth/          # Auth.js API Routes
│   ├── dashboard/         # Geschützter Bereich
│   └── login/            # Login-Seite
├── components/           # React Komponenten
│   └── auth/            # Auth-Komponenten
├── lib/                 # Utilities
│   └── db/             # Datenbank-Konfiguration
├── types/              # TypeScript Definitionen
└── auth.ts            # Auth.js Konfiguration
```

## 🚢 Production Deployment

```bash
# Build für Production
docker-compose -f docker/docker-compose.prod.yml up --build
```

Die App läuft dann auf Port 3000 mit integrierten Security Headers.

## 📝 Verfügbare Scripts

```bash
npm run dev        # Entwicklungsserver
npm run build      # Production Build
npm run start      # Production Server
npm run lint       # ESLint
npm run typecheck  # TypeScript Check
npm run db:push    # Datenbank-Schema synchronisieren (Dev)
npm run db:migrate # Migrations ausführen (Production)
npm run db:studio  # Drizzle Studio öffnen (DB Browser)
```

## 🔧 Konfiguration

### Keycloak
- Admin Console: http://localhost:8081/admin
- Realm: `nextjs-app`
- Client: `nextjs-client`

### PostgreSQL
- Host: localhost
- Port: 5433
- Databases:
  - `keycloak_db` - Für Keycloak
  - `nextjs_app` - Für die Next.js App (Auth.js)
- User: postgres
- Password: password

## 🐛 Troubleshooting

### Keycloak startet nicht
```bash
docker-compose logs keycloak
# Prüfe auf Port-Konflikte
```

### Database Connection Error
```bash
# Prüfe ob PostgreSQL läuft
docker-compose ps
# Prüfe Verbindung
psql -h localhost -p 5433 -U postgres -d keycloak_react
```

### Session wird nicht gespeichert
- Prüfe AUTH_SECRET in .env.local
- Stelle sicher, dass die Auth.js Tabellen existieren

## 📚 Weitere Dokumentation

- [CLAUDE.md](./CLAUDE.md) - Projekt-Konventionen
- [terraform/README.md](./terraform/README.md) - Terraform Setup
- [Auth.js Docs](https://authjs.dev)
- [Keycloak Docs](https://www.keycloak.org/documentation)

## 🤝 Contributing

Pull Requests sind willkommen! Bitte beachte die Coding-Standards in CLAUDE.md.

## 📄 Lizenz

MIT