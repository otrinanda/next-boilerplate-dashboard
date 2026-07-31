import axios from "axios"
import { requestInterceptor } from "@lib/api/interceptors/request"
import { responseInterceptor, responseErrorInterceptor } from "@lib/api/interceptors/response"

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
})

apiClient.interceptors.request.use(requestInterceptor)
apiClient.interceptors.response.use(responseInterceptor, responseErrorInterceptor)
