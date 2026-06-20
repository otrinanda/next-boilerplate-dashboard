# API Layer & Error Handling

Keywords: api, axios, interceptor, service, endpoint, error handling, http status, 401, 403, 404, 409, 422, 500, 503, fatal error

## Axios Instance

```ts
// lib/api/client.ts
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})
```

## Interceptors

```ts
// Request — tambah request ID untuk tracing
apiClient.interceptors.request.use((config) => {
  config.headers['X-Request-ID'] = crypto.randomUUID()
  return config
})

// Response — centralized error routing
apiClient.interceptors.response.use(
  (response) => response.data,    // unwrap langsung, tidak perlu .data di service

  async (error: AxiosError<ApiError>) => {
    const status = error.response?.status

    if (status === 401) {
      useAuthStore.getState().clear()
      window.location.href = '/login'
      return
    }
    if (status === 403) {
      window.location.href = '/unauthorized'
      return
    }
    if (status === 500 || status === 503) {
      useErrorStore.getState().setFatal(error.response?.data)
      return
    }

    // Semua lainnya (404, 409, 422, network error) → lempar ke caller
    return Promise.reject(error)
  }
)
```

## API Types

```ts
// types/api.types.ts
export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

export interface ApiError {
  message: string
  code: string                  // e.g. 'PAYROLL_ALREADY_LOCKED'
  errors?: {
    field: string
    message: string
  }[]
}
```

## Service Layer Convention

```ts
// services/employee.service.ts
// Hanya fungsi API call murni — tidak ada business logic
export const employeeService = {
  getAll: (params: EmployeeListParams): Promise<PaginatedResponse<Employee>> =>
    apiClient.get('/employees', { params }),

  getById: (id: string): Promise<Employee> =>
    apiClient.get(`/employees/${id}`),

  create: (payload: CreateEmployeePayload): Promise<Employee> =>
    apiClient.post('/employees', payload),

  update: (id: string, payload: UpdateEmployeePayload): Promise<Employee> =>
    apiClient.put(`/employees/${id}`, payload),

  deactivate: (id: string): Promise<void> =>
    apiClient.patch(`/employees/${id}/deactivate`),
}
```

## Hooks Layer Convention

```ts
// hooks/modules/use-employees.ts
// Wraps TanStack Query + service + error handling

export function useEmployees(params: EmployeeListParams) {
  return useQuery({
    queryKey: queryKeys.employees.list(params),
    queryFn:  () => employeeService.getAll(params),
    staleTime: 1000 * 60,
  })
}

export function useCreateEmployee() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: employeeService.create,
    onSuccess: () => {
      toast({ title: 'Employee created successfully.' })
      queryClient.invalidateQueries({ queryKey: queryKeys.employees.all })
    },
    onError: (error: AxiosError<ApiError>) => {
      const status = error.response?.status
      if (status === 409) {
        toast({ variant: 'destructive', title: error.response?.data.message })
        return
      }
      if (status === 422) return   // ditangani di form level
      toast({ variant: 'destructive', title: 'Something went wrong.' })
    }
  })
}
```

## Endpoints Convention

```ts
// lib/api/endpoints.ts
export const ENDPOINTS = {
  auth: {
    login:   '/auth/login',
    logout:  '/auth/logout',
    me:      '/auth/me',
    refresh: '/auth/refresh',
  },
  employees: {
    root:       '/employees',
    detail:     (id: string) => `/employees/${id}`,
    deactivate: (id: string) => `/employees/${id}/deactivate`,
  },
  payroll: {
    root:     '/payroll',
    run:      (periodId: string) => `/payroll/${periodId}/run`,
    approve:  (periodId: string) => `/payroll/${periodId}/approve`,
    lock:     (periodId: string) => `/payroll/${periodId}/lock`,
    rollback: (periodId: string) => `/payroll/${periodId}/rollback`,
  },
  payslip: {
    generate: (periodId: string) => `/payslip/${periodId}/generate`,
    download: (id: string)       => `/payslip/${id}/download`,
  },
}
```

## Error Handling Matrix

| HTTP Status | Error Type | Handler | UI Treatment |
|---|---|---|---|
| 401 | Unauthorized | Interceptor | Redirect ke login |
| 403 | Forbidden | Interceptor | Redirect ke /unauthorized |
| 404 | Not Found | Component | Inline empty state |
| 409 | Conflict | Hook onError | Toast destructive |
| 422 | Validation | Form setError | Inline field error |
| 500 | Server Error | Interceptor | Fatal error page |
| 503 | Service Down | Interceptor | Fatal error page |
| Network | Timeout/Offline | Hook onError | Toast + retry button |

## 3-Level Error Handling Summary

```
Level 1 — Global (Interceptor)
  401, 403, 500, 503 → handled otomatis, tidak perlu handle di component

Level 2 — Page/Component (TanStack Query onError)
  409, network error → Toast notification

Level 3 — Form (React Hook Form setError)
  422 validation → field error inline di bawah input
```

## Fatal Error Page

```tsx
// app/(dashboard)/layout.tsx
export default function DashboardLayout({ children }) {
  const { fatal, clearFatal } = useErrorStore()

  if (fatal) return <FatalErrorPage error={fatal} onRetry={clearFatal} />

  return <>{children}</>
}
```
