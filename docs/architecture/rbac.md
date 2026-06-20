# Routing & RBAC

Keywords: rbac, role, permission, middleware, guard, sidebar, navigation, admin, hr, finance, employee, edge runtime

## Route Protection

Next.js **Middleware** di Edge Runtime — jalan sebelum halaman di-render.

```ts
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')
  if (!token) return NextResponse.redirect('/login')

  const role = getTokenRole(token)
  if (!canAccess(request.nextUrl.pathname, role)) {
    return NextResponse.redirect('/unauthorized')
  }
}

export const config = {
  matcher: ['/(dashboard)/:path*'],
}
```

## Permission Matrix

| Module | Admin | HR | Finance | Employee |
|---|:---:|:---:|:---:|:---:|
| Master Data | ✅ | ✅ | ❌ | ❌ |
| Configuration | ✅ | ❌ | ✅ | ❌ |
| Operational | ✅ | ✅ | ❌ | ❌ |
| Payroll | ✅ | ✅ | ✅ | ❌ |
| THR | ✅ | ❌ | ✅ | ❌ |
| Tax | ✅ | ❌ | ✅ | ❌ |
| Reports | ✅ | ✅ | ✅ | ❌ |
| Payslip | ✅ | ✅ | ✅ | Own only |

> **Data sensitif (salary, tax):** hanya dapat diakses Admin & Finance

## Action Permissions

```ts
// lib/auth/permissions.ts
export const ROUTE_PERMISSIONS: Record<string, Role[]> = {
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
