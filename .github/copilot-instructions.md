# AI Coding Agent Instructions for Phoenix Project

## Project Overview
This is a modern React application built with TanStack Start, featuring authentication, database integration, and a component-based UI. The app uses file-based routing and follows a hybrid architecture with SQLite for authentication and PostgreSQL for application data.

## Tech Stack & Architecture
- **Framework**: TanStack Start (React 19 + Vite + Nitro v2)
- **Routing**: TanStack Router (file-based routing in `src/routes/`)
- **Authentication**: Better Auth with SQLite database
- **Database**: Drizzle ORM with PostgreSQL for app data
- **UI**: shadcn/ui components with Tailwind CSS
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Linting/Formatting**: Biome (4-space indentation, double quotes, semicolons as needed)
- **Package Manager**: pnpm
- **Language**: French (set in root HTML)

## Key Directories & Files
- `src/routes/` - File-based routing (create `*.tsx` files for new routes)
- `src/components/ui/` - shadcn/ui components (linting disabled)
- `src/components/` - Custom app components
- `src/lib/` - Utilities and configurations
- `src/database/` - Drizzle schema and database setup
- `auth-schema.ts` - Better Auth SQLite schema
- `better-auth_migrations/` - Auth database migrations

## Development Workflow
```bash
pnpm install          # Install dependencies
pnpm dev             # Start dev server (port 3000)
pnpm build           # Production build
pnpm test            # Run tests (Vitest)
pnpm lint            # Lint code
pnpm format          # Format code
pnpm check           # Full check (lint + format)
```

## Code Patterns & Conventions

### Component Structure
- Use shadcn/ui components from `src/components/ui/`
- Custom components in `src/components/` with subdirectories by feature
- Export components as named exports, not default

### Styling
- Use `cn()` utility for conditional classes: `cn("base-class", condition && "conditional-class")`
- Use `container()` utility for consistent max-width: `<div className={container()}>`
- Follow Tailwind CSS conventions with custom design tokens

### Authentication
- Use `authClient` from `@/lib/auth-client` for client-side auth
- Wrap protected routes with `<SignedIn>` and `<RedirectToSignIn>` from `@daveyplate/better-auth-ui`
- Auth state managed through Better Auth providers

### Database
- Auth data: SQLite via Better Auth
- App data: PostgreSQL via Drizzle ORM
- Schema defined in `src/database/schema.ts` (re-exports auth schema)

### Routing
- File-based routing: create files in `src/routes/` (e.g., `dashboard.tsx` for `/dashboard`)
- Use TanStack Router hooks: `useRouter()`, `Link` component
- Loaders for data fetching: `loader` property in route config

### Imports
- Use `@/*` path alias for `src/` imports
- Import UI components: `import { Button } from "@/components/ui/button"`
- Import utilities: `import { cn } from "@/lib/utils"`

### TypeScript
- Strict mode enabled
- Use interface merging for component props with Radix variants
- Leverage Drizzle's type-safe queries

## Common Tasks

### Adding a New Route
1. Create `src/routes/new-route.tsx`
2. Export `Route` using `createFileRoute("/new-route")`
3. Add component function and export

### Adding UI Components
1. Use shadcn CLI or copy from existing components
2. Place in `src/components/ui/` (linting disabled)
3. Use `cva()` for variants, `cn()` for class merging

### Database Operations
1. Define schema in `src/database/schema.ts`
2. Use Drizzle queries: `db.select().from(table)`
3. For auth tables, use Better Auth APIs

### Authentication Integration
1. Import auth components from `@daveyplate/better-auth-ui`
2. Use `authClient` for programmatic auth
3. Handle redirects with TanStack Router navigation

## Quality Checks
- Run `pnpm check` before commits
- Ensure TypeScript strict mode compliance
- Test auth flows and protected routes
- Verify responsive design with Tailwind classes

## Deployment
- Built for Vercel (Nitro v2 preset)
- Environment variables: `DATABASE_URL` for PostgreSQL
- Auth database: SQLite file `database.sqlite`