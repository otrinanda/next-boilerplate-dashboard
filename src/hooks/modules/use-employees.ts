import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { AxiosError } from "axios"
import { employeeService } from "@services/employee.service"
import { queryKeys } from "@lib/query-keys"
import type { EmployeeListParams, CreateEmployeePayload } from "@app-types/employee.types"
import type { ApiError } from "@app-types/api.types"

export function useEmployees(params: EmployeeListParams) {
  return useQuery({
    queryKey: queryKeys.employees.list(params),
    queryFn: () => employeeService.getAll(params),
    staleTime: 1000 * 60,
  })
}

export function useCreateEmployee() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateEmployeePayload) => employeeService.create(payload),
    onSuccess: () => {
      toast.success("Employee created successfully.")
      queryClient.invalidateQueries({ queryKey: queryKeys.employees.all })
    },
    onError: (error: AxiosError<ApiError>) => {
      const status = error.response?.status
      if (status === 409) {
        toast.error(error.response?.data.message ?? "Employee already exists.")
        return
      }
      if (status === 422) return
      toast.error("Something went wrong.")
    },
  })
}
