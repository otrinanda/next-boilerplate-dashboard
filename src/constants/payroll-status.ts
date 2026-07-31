export const PAYROLL_STATUS = {
  draft: "draft",
  running: "running",
  review: "review",
  approved: "approved",
  locked: "locked",
} as const

export type PayrollStatus = (typeof PAYROLL_STATUS)[keyof typeof PAYROLL_STATUS]
