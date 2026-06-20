# Architecture

Keywords: arsitektur, technical, stack, structure, decisions, infra, setup

Dokumentasi keputusan teknis dan struktur engineering. Konsumsi per-file sesuai topik — JANGAN baca semua sekaligus.

| File | Topik | Keywords |
|---|---|---|
| [overview.md](overview.md) | Project type, tech stack, alasan pemilihan | nextjs, typescript, tailwind, tanstack, zustand, axios, scope, mvp |
| [module-breakdown.md](module-breakdown.md) | Daftar modul (master/config/operational/payroll/output) + high-level flow | module, layer, flow, master data, configuration, operational, payroll core, event-based |
| [folder-structure.md](folder-structure.md) | Struktur folder `src/` lengkap | folder, structure, app router, src, services, hooks, stores, types, constants |
| [authentication.md](authentication.md) | JWT HttpOnly Cookie, tokenService, axios withCredentials | auth, jwt, cookie, httponly, login, token, withCredentials |
| [rbac.md](rbac.md) | Middleware route protection, permission matrix, usePermissions, sidebar nav | rbac, role, permission, middleware, guard, sidebar, admin, hr, finance, employee |
| [state-management.md](state-management.md) | TanStack Query + Zustand split, query keys, caching strategy | state, tanstack, query, zustand, cache, staleTime, queryKeys, store |
| [api-layer.md](api-layer.md) | Axios instance, interceptors, service convention, hooks, endpoints, error matrix | api, axios, interceptor, service, endpoint, error handling, http status, 401, 403, 422, 500 |
| [pdf-generation.md](pdf-generation.md) | PDF via Next.js API Route + helper | pdf, export, output, api route, generatePDF, payslip pdf |
| [adr.md](adr.md) | Architecture Decision Records (7 ADR) | adr, decision, alasan, trade-off, app router, tanstack, zustand, httponly, react hook form, design tone, datatable |
| [environment.md](environment.md) | Env vars convention, `.env.example` | env, environment, variables, NEXT_PUBLIC, secret, config |
| [git-workflow.md](git-workflow.md) | Branch strategy, naming, conventional commits, daily workflow | git, branch, commit, conventional commits, feature, fix, chore, develop, main |
| [getting-started.md](getting-started.md) | Prerequisites, create-next-app, install deps, shadcn setup, tsconfig | setup, install, shadcn, create-next-app, dependencies, prerequisites, path alias |
| [testing.md](testing.md) | Scope test priority, Vitest setup, konvensi file test | test, testing, vitest, react testing library, playwright, e2e |
| [performance.md](performance.md) | Pagination, lazy load, image, bundle size, memo, monitoring | performance, pagination, lazy load, bundle, image, memo, optimization, sentry |
| [pending-be.md](pending-be.md) | Checklist konfirmasi ke BE Golang | pending, be, backend, golang, konfirmasi, checklist, auth, rbac, contract |
