import { useAuthStore } from "@stores/auth.store"
import { ACTION_PERMISSIONS } from "@lib/auth/permissions"

export function usePermissions() {
  const { user } = useAuthStore()

  const can = (action: string, module: string): boolean => {
    if (!user) return false
    return ACTION_PERMISSIONS[module]?.[action]?.includes(user.role) ?? false
  }

  const isSensitiveAllowed = (type: "salary" | "tax"): boolean =>
    user ? ["admin", "finance"].includes(user.role) : false

  return { can, isSensitiveAllowed }
}
