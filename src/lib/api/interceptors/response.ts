import type { AxiosError, AxiosResponse } from "axios"
import { useAuthStore } from "@stores/auth.store"
import { useErrorStore } from "@stores/error.store"
import type { ApiError } from "@app-types/api.types"

export function responseInterceptor(response: AxiosResponse) {
  return response.data
}

export function responseErrorInterceptor(error: AxiosError<ApiError>) {
  const status = error.response?.status

  if (status === 401) {
    useAuthStore.getState().clear()
    if (typeof window !== "undefined") window.location.href = "/login"
    return
  }
  if (status === 403) {
    if (typeof window !== "undefined") window.location.href = "/unauthorized"
    return
  }
  if (status === 500 || status === 503) {
    if (error.response?.data) useErrorStore.getState().setFatal(error.response.data)
    return
  }

  return Promise.reject(error)
}
