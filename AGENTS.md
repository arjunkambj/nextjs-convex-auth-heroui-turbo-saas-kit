# Repository Guidelines

## Project Structure & Module Organization
- Root: Turborepo monorepo managed with Bun (`bun.lock`, `turbo.json`).
- Apps: `apps/web` (Next.js) and `apps/backend` (Convex backend).
- Packages: `packages/ui` (shared React components), `packages/eslint-config`, `packages/typescript-config`.
- Common paths: source in `src/`, assets colocated per feature, config at package roots.

## Build, Test, and Development Commands
- Root (runs across workspaces)
  - `bun run dev` — run all `dev` tasks (Next + Convex) via Turbo.
  - `bun run build` — build all apps/packages.
  - `bun run lint` — ESLint across workspaces.
  - `bun run check-types` — TypeScript type-check only.
  - `bun run format` — Prettier on `*.ts, *.tsx, *.md`.
- Filter examples
  - `bunx turbo run dev --filter=web`
  - `bunx turbo run build --filter=@repo/ui`
- App-local
  - Web: `cd apps/web && bun run dev|build|start`
  - Backend: `cd apps/backend && bun run dev` (Convex dev server)

## Coding Style & Naming Conventions
- Language: TypeScript everywhere; ESM modules.
- Formatting: Prettier (run `bun run format`) — do not hand-format.
- Linting: Use `@repo/eslint-config` presets; fix warnings proactively.
- Indentation & style: 2 spaces, single quotes where applicable, trailing commas.
- Naming: PascalCase React components, camelCase variables/functions, UPPER_SNAKE_CASE env vars. File names: `kebab-case.ts`; React components: `ComponentName.tsx`.

## Testing Guidelines
- No unit-test framework configured yet. If adding tests:
  - Location: colocate `*.test.ts[x]` next to source or in `__tests__/`.
  - Aim for fast, deterministic tests; prefer pure functions in packages.
  - For web, consider Playwright for E2E; for libs, Vitest.

## Commit & Pull Request Guidelines
- Commits: follow Conventional Commits (e.g., `feat(web): add theme toggle`).
- PRs: include scope, rationale, and screenshots for UI; link issues; list breaking changes and required env/config updates. Ensure `bun run lint` and `bun run check-types` pass.

## Security & Configuration Tips
- Env: use `.env.local` per app; do not commit secrets. Next.js reads `.env.local`; Convex reads `.env` files in `apps/backend`.
- Engines: Node >= 18, Bun `1.2.18+`. Use Turbo Remote Cache optionally (`bunx turbo login && bunx turbo link`).

## Agent-Specific Instructions
- Respect workspace boundaries; adhere to this guide for any code edits.
- Prefer minimal diffs, keep styles consistent, and update docs when behavior changes.
