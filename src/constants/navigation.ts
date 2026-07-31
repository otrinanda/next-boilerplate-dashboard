import { ROLES, type Role } from "@constants/roles"
import { ROUTES } from "@constants/routes"

export interface NavItem {
  label: string
  path: string
  icon: string
  allowedRoles: Role[]
}

// NOTE: belum di-wire ke AppSidebar (masih pakai data nav hardcoded nested) — lihat catatan follow-up di plan.
export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", path: ROUTES.dashboard, icon: "layout-dashboard", allowedRoles: [ROLES.admin, ROLES.hr, ROLES.finance, ROLES.employee] },
  { label: "Master Data", path: ROUTES.masterData, icon: "users", allowedRoles: [ROLES.admin, ROLES.hr] },
  { label: "Configuration", path: ROUTES.configuration, icon: "settings", allowedRoles: [ROLES.admin, ROLES.finance] },
  { label: "Operational", path: ROUTES.operational, icon: "briefcase", allowedRoles: [ROLES.admin, ROLES.hr] },
  { label: "Payroll", path: ROUTES.payroll, icon: "banknote", allowedRoles: [ROLES.admin, ROLES.hr, ROLES.finance] },
  { label: "THR", path: ROUTES.thr, icon: "coins", allowedRoles: [ROLES.admin, ROLES.finance] },
  { label: "Tax", path: ROUTES.tax, icon: "piggy-bank", allowedRoles: [ROLES.admin, ROLES.finance] },
  { label: "Reports", path: ROUTES.reports, icon: "clipboard-list", allowedRoles: [ROLES.admin, ROLES.hr, ROLES.finance] },
  { label: "Payslip", path: ROUTES.payslip, icon: "file-text", allowedRoles: [ROLES.admin, ROLES.hr, ROLES.finance, ROLES.employee] },
]
