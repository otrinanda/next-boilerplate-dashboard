import type { InternalAxiosRequestConfig } from "axios"

export function requestInterceptor(config: InternalAxiosRequestConfig) {
  config.headers["X-Request-ID"] = crypto.randomUUID()
  return config
}
