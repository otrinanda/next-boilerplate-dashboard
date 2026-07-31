import { decodeJwt } from "jose"
import { ROLES, type Role } from "@constants/roles"
import { ROUTE_PERMISSIONS } from "@lib/auth/permissions"

const VALID_ROLES: readonly string[] = Object.values(ROLES)

// NOTE: nama field role claim di JWT masih asumsi ("role"), pending konfirmasi BE
// (lihat docs/architecture/pending-be.md, section RBAC). Decode tanpa verifikasi signature —
// ini cuma untuk UX redirect di Edge, otorisasi sebenarnya tetap ditegakkan di BE per API call.
export function getTokenRole(token: string): Role | null {
  try {
    const payload = decodeJwt(token)
    const role = payload.role
    return typeof role === "string" && VALID_ROLES.includes(role) ? (role as Role) : null
  } catch {
    return null
  }
}

export function canAccess(pathname: string, role: Role | null): boolean {
  if (!role) return false

  const matchedKey = Object.keys(ROUTE_PERMISSIONS)
    .sort((a, b) => b.length - a.length)
    .find((key) => (key === "/" ? pathname === "/" : pathname === key || pathname.startsWith(`${key}/`)))

  if (!matchedKey) return true

  return ROUTE_PERMISSIONS[matchedKey].includes(role)
}
