# Folder Structure

Keywords: folder, structure, src, app router, components, lib, hooks, services, stores, types, constants

```
src/
├── app/
│   ├── (auth)/
│   │   └── login/
│   ├── (dashboard)/
│   │   ├── layout.tsx                  # Dashboard shell + sidebar
│   │   ├── page.tsx                    # Dashboard home (URL: /)
│   │   ├── master-data/
│   │   │   ├── employees/
│   │   │   │   ├── page.tsx            # List
│   │   │   │   ├── [id]/page.tsx       # Detail
│   │   │   │   └── new/page.tsx        # Create
│   │   │   ├── organization/
│   │   │   └── salary/
│   │   ├── configuration/
│   │   │   ├── payroll-components/
│   │   │   ├── tax/
│   │   │   └── bpjs/
│   │   ├── operational/
│   │   │   ├── attendance/
│   │   │   ├── overtime/
│   │   │   └── loans/
│   │   ├── payroll/
│   │   │   ├── run/
│   │   │   ├── review/
│   │   │   └── approval/
│   │   ├── thr/                        # Event-Based layer (lihat module-breakdown.md)
│   │   ├── tax/                        # Event-Based layer (lihat module-breakdown.md)
│   │   │   ├── monthly/
│   │   │   └── reconciliation/
│   │   ├── reports/
│   │   │   ├── payroll/
│   │   │   ├── tax/
│   │   │   └── loans/
│   │   └── payslip/
│   │       └── my/                     # Employee: lihat payslip sendiri
│   └── api/
│       └── pdf/                        # HTML template → PDF generation
│
├── components/
│   ├── ui/                             # shadcn/ui (auto-generated, jangan diedit manual)
│   ├── common/                         # Reusable generic components
│   │   ├── layout/                     # Shell aplikasi: sidebar, header, nav, theme toggle
│   │   │   ├── app-sidebar.tsx
│   │   │   ├── app-header.tsx
│   │   │   ├── nav-main.tsx
│   │   │   ├── nav-user.tsx
│   │   │   ├── nav-projects.tsx
│   │   │   ├── team-switcher.tsx
│   │   │   └── theme-toogle.tsx
│   │   ├── data-table/
│   │   │   ├── index.tsx
│   │   │   ├── toolbar.tsx
│   │   │   └── pagination.tsx
│   │   ├── page-header/
│   │   ├── status-badge/
│   │   ├── confirm-dialog/
│   │   ├── error-state/
│   │   └── pdf-preview/
│   └── modules/                        # Feature-specific components
│       ├── employees/
│       ├── payroll/
│       ├── tax/
│       └── payslip/
│
├── lib/
│   ├── api/
│   │   ├── client.ts                   # Axios instance
│   │   ├── endpoints.ts                # URL constants
│   │   └── interceptors/
│   │       ├── request.ts
│   │       └── response.ts
│   ├── auth/
│   │   ├── token.ts                    # tokenService abstraction
│   │   ├── permissions.ts              # Role-permission mapping
│   │   └── guards.ts
│   ├── query-keys.ts                   # TanStack Query key factory
│   └── utils/
│       ├── format.ts                   # Currency, date, number
│       └── pdf.ts                      # PDF generation helper
│
├── hooks/
│   ├── use-auth.ts
│   ├── use-permissions.ts
│   └── modules/                        # Per-module hooks
│       ├── use-employees.ts
│       ├── use-payroll.ts
│       └── use-payslip.ts
│
├── services/                           # API call functions (pure, no logic)
│   ├── employee.service.ts
│   ├── payroll.service.ts
│   ├── tax.service.ts
│   └── payslip.service.ts
│
├── stores/
│   ├── auth.store.ts                   # User session + role
│   ├── payroll.store.ts                # Active payroll period
│   └── error.store.ts                  # Fatal error state
│
├── types/
│   ├── employee.types.ts
│   ├── payroll.types.ts
│   ├── tax.types.ts
│   └── api.types.ts                    # ApiResponse, ApiError, Paginated
│
└── constants/
    ├── navigation.ts                   # NAV_ITEMS untuk sidebar (lihat rbac.md)
    ├── roles.ts
    ├── payroll-status.ts
    └── routes.ts
```
