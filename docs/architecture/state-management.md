# State Management

Keywords: state, tanstack query, zustand, cache, staleTime, queryKeys, store, server state, ui state

## Prinsip Pemisahan

| State Type | Tool | Contoh |
|---|---|---|
| Server state | TanStack Query | Data employee, payroll, tax |
| Global UI state | Zustand | Auth session, active period, fatal error |
| Local UI state | useState | Modal open, form step, filter lokal |

> **Anti-pattern yang dihindari:** menyimpan server data di Zustand

## Zustand Stores

```ts
// stores/auth.store.ts
interface AuthState {
  user: {
    id: string
    name: string
    role: Role
    employeeId?: string     // hanya jika role Employee
  } | null
  isAuthenticated: boolean
  setUser: (user: User) => void
  clear: () => void
}

// stores/payroll.store.ts
interface PayrollPeriodState {
  activePeriod: {
    id: string
    month: number
    year: number
    status: PayrollStatus
  } | null
  setActivePeriod: (period: Period) => void
}

// stores/error.store.ts
interface ErrorState {
  fatal: ApiError | null
  setFatal: (error: ApiError) => void
  clearFatal: () => void
}
```

## TanStack Query — Key Factory

```ts
// lib/query-keys.ts
export const queryKeys = {
  employees: {
    all:    ['employees'],
    list:   (params) => ['employees', 'list', params],
    detail: (id)     => ['employees', 'detail', id],
  },
  payroll: {
    all:     ['payroll'],
    period:  (periodId) => ['payroll', 'period', periodId],
    summary: (periodId) => ['payroll', 'period', periodId, 'summary'],
  },
  payslip: {
    byEmployee: (employeeId, periodId) => ['payslip', employeeId, periodId],
  },
  tax: {
    monthly:        (periodId) => ['tax', 'monthly', periodId],
    reconciliation: (year)     => ['tax', 'reconciliation', year],
  },
}
```

## Caching Strategy

| Data | Cache Time | Stale Time | Alasan |
|---|---|---|---|
| Employee list | 5 menit | 1 menit | Jarang berubah |
| Employee detail | 10 menit | 2 menit | Relatif statis |
| Payroll summary | 1 menit | 30 detik | Bisa berubah saat review |
| Configuration | 30 menit | 5 menit | Sangat jarang berubah |
| Active period | 2 menit | 1 menit | Perlu relatif fresh |

## Global Query Config

```ts
// lib/query-client.ts
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,    // Mencegah auto-refetch saat switch tab
      staleTime: 1000 * 60,           // 1 menit default
    },
    mutations: {
      retry: 0,                       // Mutation tidak di-retry otomatis
    }
  }
})
```
