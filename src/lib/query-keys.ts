import type { EmployeeListParams } from "@app-types/employee.types"

export const queryKeys = {
  employees: {
    all: ["employees"] as const,
    list: (params: EmployeeListParams) => ["employees", "list", params] as const,
    detail: (id: string) => ["employees", "detail", id] as const,
  },
  payroll: {
    all: ["payroll"] as const,
    period: (periodId: string) => ["payroll", "period", periodId] as const,
    summary: (periodId: string) => ["payroll", "period", periodId, "summary"] as const,
  },
  payslip: {
    byEmployee: (employeeId: string, periodId: string) => ["payslip", employeeId, periodId] as const,
  },
  tax: {
    monthly: (periodId: string) => ["tax", "monthly", periodId] as const,
    reconciliation: (year: number) => ["tax", "reconciliation", year] as const,
  },
}
