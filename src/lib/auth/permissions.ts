import { ROLES, type Role } from "@constants/roles"

export const ROUTE_PERMISSIONS: Record<string, Role[]> = {
  "/": [ROLES.admin, ROLES.hr, ROLES.finance, ROLES.employee],
  "/master-data": [ROLES.admin, ROLES.hr],
  "/configuration": [ROLES.admin, ROLES.finance],
  "/operational": [ROLES.admin, ROLES.hr],
  "/payroll": [ROLES.admin, ROLES.hr, ROLES.finance],
  "/thr": [ROLES.admin, ROLES.finance],
  "/tax": [ROLES.admin, ROLES.finance],
  "/reports": [ROLES.admin, ROLES.hr, ROLES.finance],
  "/payslip": [ROLES.admin, ROLES.hr, ROLES.finance],
  "/payslip/my": [ROLES.employee],
}

export const ACTION_PERMISSIONS: Record<string, Record<string, Role[]>> = {
  employee: {
    view: [ROLES.admin, ROLES.hr],
    create: [ROLES.admin, ROLES.hr],
    edit: [ROLES.admin, ROLES.hr],
    delete: [ROLES.admin],
  },
  salary: {
    view: [ROLES.admin, ROLES.finance],
    edit: [ROLES.admin, ROLES.finance],
  },
  payroll: {
    run: [ROLES.admin, ROLES.hr],
    review: [ROLES.admin, ROLES.hr, ROLES.finance],
    approve: [ROLES.admin, ROLES.finance],
  },
  tax: {
    view: [ROLES.admin, ROLES.finance],
  },
}
