import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { apiClient } from "@lib/api/client"
import { ENDPOINTS } from "@lib/api/endpoints"
import { useAuthStore } from "@stores/auth.store"
import type { Role } from "@constants/roles"

// NOTE: kontrak /auth/login & /auth/me belum dikonfirmasi BE (lihat
// docs/architecture/pending-be.md, section Authentication) — bentuk payload/response
// di bawah ini masih asumsi mengikuti api-layer.md, akan disesuaikan begitu kontrak fix.
interface LoginPayload {
  email: string
  password: string
}

interface LoginResponse {
  user: {
    id: string
    name: string
    role: Role
    employeeId?: string
  }
}

export function useAuth() {
  const router = useRouter()
  const { user, isAuthenticated, setUser, clear } = useAuthStore()

  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) =>
      apiClient.post<LoginResponse>(ENDPOINTS.auth.login, payload),
    onSuccess: (data) => {
      setUser(data.user)
      router.push("/")
    },
    onError: () => {
      toast.error("Login failed. Please check your credentials.")
    },
  })

  const logout = async () => {
    try {
      await apiClient.post(ENDPOINTS.auth.logout)
    } catch {
      // logout tetap lanjut secara lokal walau request ke BE gagal
    }
    clear()
    router.push("/login")
  }

  return {
    user,
    isAuthenticated,
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    logout,
  }
}
