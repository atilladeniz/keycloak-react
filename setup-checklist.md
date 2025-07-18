# Setup Checkliste nach Neustart

## 1. Docker Compose starten
```bash
cd /Users/atilla/Desktop/keycloak-react
docker-compose up -d
```

## 2. Warten bis Keycloak bereit ist (ca. 30-60 Sekunden)
Prüfe ob Keycloak läuft:
```bash
curl http://localhost:8081/health/ready
```

## 3. Terraform Setup
```bash
cd terraform
terraform init
terraform apply -auto-approve
```

## 4. Client Secret in .env.local eintragen
Nach dem Terraform apply:
```bash
# Client Secret anzeigen
terraform output -raw client_secret

# Dann in .env.local eintragen:
KEYCLOAK_CLIENT_SECRET=<output-from-above>
```

## 5. Datenbank Migration
```bash
cd ..
npm run db:push
```

## 6. Next.js starten
```bash
npm run dev
```

## Test Credentials
- Username: `testuser`
- Password: `Test1234!`

## Wichtige URLs
- Keycloak Admin: http://localhost:8081/admin/master/console/
  - Username: admin
  - Password: admin
- Next.js App: http://localhost:3000