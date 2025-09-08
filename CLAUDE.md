# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Turborepo monorepo using Bun as the package manager, containing:
- **apps/web**: Next.js 15 app with HeroUI components, Tailwind CSS v4, and Convex authentication
- **apps/backend**: Convex backend with authentication setup  
- **packages/ui**: Shared React component library
- **packages/eslint-config**: Shared ESLint configurations
- **packages/typescript-config**: Shared TypeScript configurations

## Development Commands

### Root-level commands (run from project root)
```bash
# Install dependencies
bun install

# Development - runs all apps concurrently
bun dev

# Build all packages and apps
bun build

# Lint all packages
bun lint

# Type checking across all packages
bun check-types

# Format code
bun format
```

### Working with specific apps/packages
```bash
# Run dev for specific app
bun dev --filter=web
bun dev --filter=@repo/backend

# Build specific app
bun build --filter=web

# Run lint for specific app
bun lint --filter=web

# Type check specific app
bun check-types --filter=web
```

### App-specific commands

**Web app** (apps/web):
```bash
# Development server on port 3000 with Turbopack
cd apps/web && bun dev

# Build for production
cd apps/web && bun build

# Type checking
cd apps/web && bun check-types
```

**Backend** (apps/backend):
```bash
# Start Convex dev server
cd apps/backend && bun dev

# Generate Convex types
cd apps/backend && bun codegen
```

## Architecture

### Monorepo Structure
- Uses Turborepo for build orchestration with dependency-aware task running
- Bun workspaces for package management and linking
- Shared packages use `workspace:*` protocol for internal dependencies

### Frontend (apps/web)
- Next.js 15 with App Router and React 19
- Tailwind CSS v4 with PostCSS configuration
- HeroUI component library integration
- Convex for real-time data and authentication
- Theme support via next-themes

### Backend (apps/backend)
- Convex serverless functions in `convex/` directory
- Authentication configured with @convex-dev/auth
- Schema definitions in `convex/schema.ts`
- HTTP endpoints in `convex/http.ts`

### Authentication Flow
- Uses @convex-dev/auth v0.0.88 for authentication
- Auth configuration in `apps/backend/convex/auth.config.ts`
- Client-side auth in `apps/web/app/(auth)/` directory
- Shared auth dependencies between web and backend

### Environment Variables
Both apps use `.env.local` files containing:
- `CONVEX_DEPLOYMENT`: Deployment identifier
- `CONVEX_URL` / `NEXT_PUBLIC_CONVEX_URL`: Convex cloud URL

## Key Technical Decisions

1. **Bun over npm/yarn/pnpm**: Using Bun 1.2.18 for faster installs and native TypeScript support
2. **Turbopack**: Enabled for faster Next.js development builds
3. **Convex**: Serverless backend for real-time features without managing infrastructure
4. **TypeScript 5.9.2**: Consistent version across all packages
5. **ESLint with max-warnings 0**: Enforces zero warnings in CI/CD