# Routing & RBAC

Keywords: rbac, role, permission, middleware, guard, sidebar, navigation, admin, hr, finance, employee, edge runtime

## Route Protection

Next.js 16 me-rename **Middleware** jadi **Proxy** (fungsi & konvensi file sama persis, cuma nama file & nama fungsi yang berubah: `middleware.ts` → `proxy.ts`, `export function middleware` → `export function proxy`). Proyek ini pakai Next.js 16 — gunakan konvensi `proxy.ts`, bukan `middleware.ts` (deprecated, masih jalan tapi ter-warning saat build).

Proxy jalan di Edge Runtime — sebelum halaman di-render.

> **Penting:** route group seperti `(dashboard)` dan `(auth)` adalah konstruksi Next.js untuk pengelompokan folder saja — **tidak pernah muncul di URL asli**. Matcher **tidak boleh** mereferensikan nama group (mis. `'/(dashboard)/:path*'` tidak akan pernah match apa pun). Gunakan pendekatan exclusion-based: proteksi semua path kecuali yang eksplisit publik.

```ts
// proxy.ts (di src/proxy.ts jika proyek pakai src/)
const PUBLIC_PATHS = ['/login', '/unauthorized', '/dev/status']

export function proxy(request: NextRequest) {
  if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) return NextResponse.next()

  const token = request.cookies.get(process.env.NEXT_PUBLIC_COOKIE_NAME ?? 'access_token')
  if (!token) return NextResponse.redirect(new URL('/login', request.url))

  const role = getTokenRole(token.value)
  if (!canAccess(request.nextUrl.pathname, role)) {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
}
```

## Permission Matrix

| Module | Admin | HR | Finance | Employee |
|---|:---:|:---:|:---:|:---:|
| Dashboard Home (`/`) | ✅ | ✅ | ✅ | ✅ |
| Master Data | ✅ | ✅ | ❌ | ❌ |
| Configuration | ✅ | ❌ | ✅ | ❌ |
| Operational | ✅ | ✅ | ❌ | ❌ |
| Payroll | ✅ | ✅ | ✅ | ❌ |
| THR | ✅ | ❌ | ✅ | ❌ |
| Tax | ✅ | ❌ | ✅ | ❌ |
| Reports | ✅ | ✅ | ✅ | ❌ |
| Payslip | ✅ | ✅ | ✅ | Own only |

> **Data sensitif (salary, tax):** hanya dapat diakses Admin & Finance
>
> **Event-Based layer:** baris THR & Tax termasuk layer *Event-Based* (lihat [module-breakdown.md](module-breakdown.md)) — dijalankan tidak setiap bulan, berbeda dari Operational/Payroll Core yang rutin bulanan.

## Action Permissions

```ts
// lib/auth/permissions.ts
export const ROUTE_PERMISSIONS: Record<string, Role[]> = {
  '/':              ['admin', 'hr', 'finance', 'employee'],
  '/master-data':   ['admin', 'hr'],
  '/configuration': ['admin', 'finance'],
  '/operational':   ['admin', 'hr'],
  '/payroll':       ['admin', 'hr', 'finance'],
  '/thr':           ['admin', 'finance'],
  '/tax':           ['admin', 'finance'],
  '/reports':       ['admin', 'hr', 'finance'],
  '/payslip':       ['admin', 'hr', 'finance'],
  '/payslip/my':    ['employee'],
}

export const ACTION_PERMISSIONS = {
  employee: {
    view:   ['admin', 'hr'],
    create: ['admin', 'hr'],
    edit:   ['admin', 'hr'],
    delete: ['admin'],
  },
  salary: {
    view: ['admin', 'finance'],
    edit: ['admin', 'finance'],
  },
  payroll: {
    run:     ['admin', 'hr'],
    review:  ['admin', 'hr', 'finance'],
    approve: ['admin', 'finance'],
  },
  tax: {
    view: ['admin', 'finance'],
  },
}
```

## Component-Level Guard

```tsx
// hooks/use-permissions.ts
export function usePermissions() {
  const { user } = useAuthStore()

  const can = (action: string, module: string): boolean =>
    ACTION_PERMISSIONS[module]?.[action]?.includes(user.role) ?? false

  const isSensitiveAllowed = (type: 'salary' | 'tax'): boolean =>
    ['admin', 'finance'].includes(user.role)

  return { can, isSensitiveAllowed }
}

// Penggunaan di komponen
const { can, isSensitiveAllowed } = usePermissions()

{can('edit', 'employee') && <EditButton />}
{isSensitiveAllowed('salary') && <SalarySection />}
```

## Dynamic Sidebar Navigation

```ts
// constants/navigation.ts
export const NAV_ITEMS = [
  {
    label: 'Master Data',
    path: '/master-data',
    icon: 'users',
    allowedRoles: ['admin', 'hr'],
  },
  {
    label: 'Configuration',
    path: '/configuration',
    icon: 'settings',
    allowedRoles: ['admin', 'finance'],
  },
  // ...
]

// Sidebar hanya render item yang sesuai role
const filteredNav = NAV_ITEMS.filter(item =>
  item.allowedRoles.includes(user.role)
)
```
