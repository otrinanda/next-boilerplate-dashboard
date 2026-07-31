export const ROLES = {
  admin: "admin",
  hr: "hr",
  finance: "finance",
  employee: "employee",
} as const

export type Role = (typeof ROLES)[keyof typeof ROLES]
