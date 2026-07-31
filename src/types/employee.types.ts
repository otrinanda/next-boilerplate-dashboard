export type EmployeeStatus = "active" | "inactive" | "on-leave"

export interface Employee {
  id: string
  name: string
  nik: string
  email: string
  department: string
  departmentId: string
  position: string
  joinDate: string
  baseSalary: number
  status: EmployeeStatus
}

export interface EmployeeListParams {
  page?: number
  limit?: number
  search?: string
  status?: EmployeeStatus
}

export interface CreateEmployeePayload {
  name: string
  nik: string
  email: string
  departmentId: string
  position: string
  joinDate: string
  baseSalary: number
}

export type UpdateEmployeePayload = Partial<CreateEmployeePayload>
