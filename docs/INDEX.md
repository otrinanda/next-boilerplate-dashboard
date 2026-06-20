# Documentation INDEX — Master Map

> **Entry point WAJIB.** Selalu mulai dari file ini sebelum membaca dokumen lain di `docs/`.
> Cara konsumsi: cari topik di tabel → catat `Path` → gunakan `grep_search` dengan `Keywords` jika perlu lokalisasi → baru `read_file` ke path spesifik (pakai line range untuk file besar).

---

## Kategori

| Kategori | Path | Cakupan |
|---|---|---|
| Architecture | [architecture/README.md](architecture/README.md) | Stack, struktur, auth, RBAC, state, API, ADR, env, git, setup, testing, performance |
| UI/UX | [ui-ux/README.md](ui-ux/README.md) | Design system, tokens, komponen, konvensi form |
| Payroll Rules | [payroll-rules/README.md](payroll-rules/README.md) | State machine; (formula pajak/BPJS/THR menyusul) |
| SOP | [sop/README.md](sop/README.md) | Playbook step-by-step developer |
| PRD | [prd/README.md](prd/README.md) | _(empty, menunggu upload)_ |
| API Spec | [api/README.md](api/README.md) | _(empty, untuk saat ini lihat architecture/api-layer.md)_ |

---

## Index Per Topik (Quick Jump)

| Topik | File | Keywords (untuk grep) |
|---|---|---|
| Project type, MVP scope, tech stack | [architecture/overview.md](architecture/overview.md) | overview, stack, mvp, scope |
| Daftar modul & high-level flow | [architecture/module-breakdown.md](architecture/module-breakdown.md) | module, master data, configuration, operational, payroll core |
| Struktur folder `src/` | [architecture/folder-structure.md](architecture/folder-structure.md) | folder, structure, src, app router |
| Authentication (JWT HttpOnly Cookie) | [architecture/authentication.md](architecture/authentication.md) | auth, jwt, cookie, tokenService, withCredentials |
| RBAC, permission matrix, sidebar nav | [architecture/rbac.md](architecture/rbac.md) | rbac, role, permission, middleware, sidebar |
| State management (TanStack Query + Zustand) | [architecture/state-management.md](architecture/state-management.md) | tanstack, zustand, queryKeys, cache, staleTime |
| API layer, interceptors, error handling | [architecture/api-layer.md](architecture/api-layer.md) | axios, interceptor, service, endpoint, 401, 403, 422 |
| PDF generation | [architecture/pdf-generation.md](architecture/pdf-generation.md) | pdf, export, api route, generatePDF |
| Architecture Decision Records | [architecture/adr.md](architecture/adr.md) | adr, decision, trade-off |
| Environment variables | [architecture/environment.md](architecture/environment.md) | env, NEXT_PUBLIC, secret |
| Git workflow & commit convention | [architecture/git-workflow.md](architecture/git-workflow.md) | git, branch, conventional commits |
| Project setup & initial install | [architecture/getting-started.md](architecture/getting-started.md) | setup, install, shadcn, create-next-app |
| Testing strategy | [architecture/testing.md](architecture/testing.md) | test, vitest, playwright |
| Performance considerations | [architecture/performance.md](architecture/performance.md) | performance, lazy load, bundle, memo |
| Pending konfirmasi ke BE | [architecture/pending-be.md](architecture/pending-be.md) | pending, be, backend, blocker |
| Design system, tokens, komponen, form | [ui-ux/design-system.md](ui-ux/design-system.md) | design, color, typography, shadcn, page header, status badge, data table, form, zod |
| Payroll state machine | [payroll-rules/state-machine.md](payroll-rules/state-machine.md) | state machine, draft, running, review, approved, locked, rollback |
| SOP: bikin modul baru (8 step) | [sop/creating-new-module.md](sop/creating-new-module.md) | new module, scaffold, step-by-step |

---

## Aturan Akses (ringkas)

1. **MUST** baca file ini (`INDEX.md`) dulu untuk lokasi topik.
2. **MUST NOT** read seluruh folder `docs/` sekaligus (no glob read).
3. **SHOULD** pakai `grep_search` dengan keyword dari tabel di atas untuk lokalisasi sebelum `read_file`.
4. **SHOULD** baca file dengan line range untuk file > 200 baris.

Aturan lengkap: lihat `AGENTS.md` blok `docs-access-rules`.
