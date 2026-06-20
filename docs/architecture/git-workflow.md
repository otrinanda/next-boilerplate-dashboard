# Git Workflow & Branching Strategy

Keywords: git, branch, commit, conventional commits, feature, fix, chore, develop, main, workflow

## Branch Structure

```
main          ← production-ready, hanya merge dari release
develop       ← integrasi semua fitur, base untuk semua branch
feature/*     ← pengembangan fitur baru
fix/*         ← bug fix
chore/*       ← non-functional (config, deps, refactor)
```

## Branch Naming Convention

```bash
feature/employee-list
feature/payroll-run
fix/auth-redirect-loop
chore/update-dependencies
chore/setup-eslint
```

## Commit Message Convention

Menggunakan **Conventional Commits**:

```
feat(employee): add create employee form
fix(auth): handle token expiry on refresh
chore(deps): upgrade tanstack-query to v5.x
refactor(table): extract pagination to separate component
style(sidebar): adjust active item indicator
```

Format: `type(scope): description`

| Type | Kapan Digunakan |
|---|---|
| `feat` | Fitur baru |
| `fix` | Bug fix |
| `chore` | Config, deps, tooling |
| `refactor` | Refactor tanpa perubahan behavior |
| `style` | Perubahan visual/CSS |
| `docs` | Dokumentasi |

## Workflow Harian

```bash
# 1. Selalu mulai dari develop terbaru
git checkout develop
git pull origin develop

# 2. Buat branch baru
git checkout -b feature/employee-list

# 3. Kerjakan, commit secara granular
git add .
git commit -m "feat(employee): add employee list table with pagination"

# 4. Push dan buat PR ke develop
git push origin feature/employee-list
```
