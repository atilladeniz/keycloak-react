# 🔐 Next.js + Keycloak Authentication Starter

A production-ready full-stack authentication solution with Next.js 15, Keycloak, and Auth.js (NextAuth.js v5).

## ✨ Features

- 🚀 **Next.js 15** with App Router and Server Actions
- 🔑 **Keycloak** as Enterprise Identity Provider
- 🛡️ **Auth.js v5** for seamless session management
- 🗄️ **PostgreSQL** with Drizzle ORM for type-safe database access
- 🏗️ **Terraform** for automated Infrastructure as Code setup
- 🐳 **Docker Compose** for consistent development environments
- 📘 **TypeScript** for full type safety
- 🎨 **Tailwind CSS** for modern UI design
- 🔒 **Secure Logout** with server-side session termination
- ⚡ **One-Click Setup** with automated installation script

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/yourusername/keycloak-react.git
cd keycloak-react

# Install dependencies
npm install

# Automated setup (starts Docker, configures Keycloak, initializes DB)
npm run setup

# Start development server
npm run dev
```

The app is now available at http://localhost:3000! 🎉

### Test Credentials
- **Username:** `testuser`
- **Password:** `Test1234!`

## 📋 Prerequisites

- Node.js 18+ 
- Docker & Docker Compose
- npm or pnpm
- Terraform (will be installed automatically if not present)

## 🛠️ Detailed Installation

### 1. Environment Setup

```bash
# Environment variables are created automatically during setup
# Manual adjustments possible in .env.local
```

### 2. Services Management

```bash
# Start all services (Keycloak + PostgreSQL)
docker-compose up -d

# Stop services
docker-compose down

# Complete reset (including database)
npm run auth:clean
```

### 3. Database

```bash
# Sync schema (Development)
npm run db:push

# Run migrations (Production)
npm run db:migrate

# Open database UI
npm run db:studio
```

## 🏗️ Project Architecture

```
keycloak-react/
├── src/
│   ├── app/                    # Next.js App Router Pages
│   │   ├── (auth)/            # Authenticated routes
│   │   ├── api/auth/          # Auth.js API endpoints
│   │   ├── dashboard/         # Protected area
│   │   └── login/             # Login UI
│   ├── components/            # React components
│   │   ├── auth/              # Auth-specific components
│   │   └── ui/                # Reusable UI components
│   ├── lib/                   # Utilities and configurations
│   │   └── db/                # Database schema and connection
│   ├── types/                 # TypeScript type definitions
│   └── auth.ts                # Auth.js main configuration
├── terraform/                  # Infrastructure as Code
│   ├── main.tf                # Keycloak Realm & Client setup
│   └── variables.tf           # Configurable parameters
├── docker/                     # Docker configurations
│   └── nginx/                 # Production reverse proxy
├── scripts/                    # Automation scripts
│   └── setup-auth.sh          # One-click setup script
└── drizzle.config.ts          # Database configuration
```

## 🔐 Authentication Features

### Session Management
- JWT-based sessions with Auth.js
- Automatic token refresh
- Server-side session validation

### Security
- PKCE flow for OAuth 2.0
- CSRF protection
- Secure cookie handling
- Content Security Policy headers

### Keycloak Integration
- Single Sign-On (SSO) ready
- Multi-Factor Authentication support
- User self-service (password reset, etc.)
- Realm-based multi-tenancy

## 📝 Available NPM Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Create production build
npm run start        # Start production server
npm run lint         # Code linting
npm run typecheck    # TypeScript type checking
npm run setup        # Automated setup of all services
npm run auth:clean   # Complete authentication reset
npm run db:push      # Sync database schema
npm run db:migrate   # Production migrations
npm run db:studio    # Open database GUI
```

## 🚢 Production Deployment

### With Docker

```bash
# Production build with optimized settings
docker build -f docker/Dockerfile.prod -t keycloak-react .

# With Docker Compose
docker-compose -f docker/docker-compose.prod.yml up -d
```

### Environment Variables

Important production settings:
- `AUTH_URL` - Public URL of the app
- `KEYCLOAK_URL` - Keycloak server URL
- `DATABASE_URL` - PostgreSQL connection string
- `AUTH_SECRET` - Generate with `openssl rand -base64 32`

## 🔧 Configuration

### Keycloak Admin
- URL: http://localhost:8081/admin
- Username: `admin`
- Password: `admin`
- Realm: `nextjs-app`
- Client: `nextjs-client`

### PostgreSQL
- Port: `5433` (to avoid conflicts)
- User: `postgres`
- Password: `password`
- Databases:
  - `keycloak_db` - Keycloak metadata
  - `nextjs_app` - Application data

## 🐛 Troubleshooting

### "Client not found" Error
```bash
# Rebuild Terraform state
cd terraform
terraform destroy -auto-approve
terraform apply -auto-approve
```

### Docker Container Won't Start
```bash
# Check logs
docker-compose logs -f keycloak

# Check ports
lsof -i :8081
lsof -i :5433
```

### Database Connection Error
```bash
# PostgreSQL status
docker-compose ps

# Test connection
docker exec -it keycloak-postgres psql -U postgres
```

## 📚 Further Documentation

- [CLAUDE.md](./CLAUDE.md) - Project conventions and AI instructions
- [Auth.js Documentation](https://authjs.dev)
- [Keycloak Documentation](https://www.keycloak.org/documentation)
- [Drizzle ORM](https://orm.drizzle.team)

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- [Vercel](https://vercel.com) for Next.js
- [Keycloak](https://www.keycloak.org) Team
- [Auth.js](https://authjs.dev) Contributors
- [Drizzle Team](https://orm.drizzle.team) for the amazing ORM