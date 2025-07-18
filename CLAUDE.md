# Keycloak-React Project Conventions

## Overview
This project uses Next.js with Auth.js (NextAuth.js v5) for authentication via Keycloak and PostgreSQL as the database.

## Tech Stack
- **Frontend**: Next.js 15+ (App Router)
- **Authentication**: Auth.js (NextAuth.js v5) with Keycloak Provider
- **Database**: PostgreSQL with Drizzle ORM
- **Infrastructure as Code**: Terraform
- **Container**: Docker & Docker Compose
- **Styling**: Tailwind CSS
- **Reverse Proxy**: Nginx (Production)

## Development Environment

### Services
- **Keycloak**: http://localhost:8081/admin/master/console/
  - User: admin
  - Password: admin
- **PostgreSQL**: localhost:5433
  - Password: password
- **Next.js App**: http://localhost:3000

## Code Conventions

### TypeScript
- Strictly typed interfaces for all API responses
- No `any` types allowed
- Functional components with TypeScript

### Folder Structure
```
src/
├── app/                    # Next.js App Router
├── components/            # React Components
│   ├── auth/             # Auth-specific components
│   └── ui/               # Reusable UI components
├── lib/                  # Utilities and configurations
│   ├── auth/            # Auth.js configuration
│   └── db/              # Database connection
├── hooks/               # Custom React Hooks
└── types/               # TypeScript type definitions
```

### Environment Variables
All sensitive data in `.env.local`:
- Database connections
- Keycloak client secrets
- API keys

### Testing & Linting
```bash
npm run lint        # Check ESLint
npm run typecheck   # Check TypeScript
npm run dev         # Development server
```

### Git Workflow
- Feature branches from `main` branch
- Descriptive commit messages
- Pull requests with clear descriptions

## Security
- No secrets in code
- Environment variables for all sensitive data
- HTTPS in production
- Configure CSP headers

## Important Instruction Reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.