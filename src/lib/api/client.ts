import axios, { type AxiosRequestConfig } from "axios"
import { requestInterceptor } from "@lib/api/interceptors/request"
import { responseInterceptor, responseErrorInterceptor } from "@lib/api/interceptors/response"

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
})

instance.interceptors.request.use(requestInterceptor)
instance.interceptors.response.use(responseInterceptor, responseErrorInterceptor)

// responseInterceptor sudah unwrap response.data di runtime — tipe axios default
// (AxiosInstance) tidak tahu soal ini dan tetap melaporkan Promise<AxiosResponse<T>>.
// Wrapper ini menyamakan tipe dengan behavior runtime yang sebenarnya: Promise<T>.
interface TypedApiClient {
  get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>
  post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>
  put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>
  patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>
  delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>
}

export const apiClient = instance as unknown as TypedApiClient
