export const ENDPOINTS = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    me: "/auth/me",
    refresh: "/auth/refresh",
  },
  employees: {
    root: "/employees",
    detail: (id: string) => `/employees/${id}`,
    deactivate: (id: string) => `/employees/${id}/deactivate`,
  },
  payroll: {
    root: "/payroll",
    run: (periodId: string) => `/payroll/${periodId}/run`,
    approve: (periodId: string) => `/payroll/${periodId}/approve`,
    lock: (periodId: string) => `/payroll/${periodId}/lock`,
    rollback: (periodId: string) => `/payroll/${periodId}/rollback`,
  },
  payslip: {
    generate: (periodId: string) => `/payslip/${periodId}/generate`,
    download: (id: string) => `/payslip/${id}/download`,
  },
}
