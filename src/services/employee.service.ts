import type {
  Employee,
  EmployeeListParams,
  CreateEmployeePayload,
  UpdateEmployeePayload,
} from "@app-types/employee.types"
import type { PaginatedResponse } from "@app-types/api.types"

// TEMPORARY: data mock statis sampai endpoint BE tersedia.
// Ganti body tiap fungsi dengan pemanggilan apiClient (dikomentari di bawah) begitu /employees live.
const MOCK_EMPLOYEES: Employee[] = [
  { id: "1", name: "Andi Saputra", nik: "3201010101900001", email: "andi.saputra@msone.com", department: "Engineering", departmentId: "dept-eng", position: "Software Engineer", joinDate: "2022-03-14", baseSalary: 12000000, status: "active" },
  { id: "2", name: "Budi Santoso", nik: "3201010101900002", email: "budi.santoso@msone.com", department: "Finance", departmentId: "dept-fin", position: "Finance Staff", joinDate: "2021-07-01", baseSalary: 9500000, status: "active" },
  { id: "3", name: "Citra Dewi", nik: "3201010101900003", email: "citra.dewi@msone.com", department: "Human Resources", departmentId: "dept-hr", position: "HR Manager", joinDate: "2019-01-20", baseSalary: 15000000, status: "active" },
  { id: "4", name: "Dewi Lestari", nik: "3201010101900004", email: "dewi.lestari@msone.com", department: "Engineering", departmentId: "dept-eng", position: "QA Engineer", joinDate: "2023-05-09", baseSalary: 10000000, status: "on-leave" },
  { id: "5", name: "Eko Prasetyo", nik: "3201010101900005", email: "eko.prasetyo@msone.com", department: "Sales", departmentId: "dept-sales", position: "Sales Executive", joinDate: "2020-11-11", baseSalary: 8500000, status: "active" },
  { id: "6", name: "Fitri Handayani", nik: "3201010101900006", email: "fitri.handayani@msone.com", department: "Finance", departmentId: "dept-fin", position: "Accountant", joinDate: "2022-09-01", baseSalary: 9000000, status: "active" },
  { id: "7", name: "Gilang Ramadhan", nik: "3201010101900007", email: "gilang.ramadhan@msone.com", department: "Engineering", departmentId: "dept-eng", position: "Engineering Manager", joinDate: "2018-02-15", baseSalary: 22000000, status: "active" },
  { id: "8", name: "Hesti Wulandari", nik: "3201010101900008", email: "hesti.wulandari@msone.com", department: "Human Resources", departmentId: "dept-hr", position: "Recruiter", joinDate: "2023-01-10", baseSalary: 7500000, status: "inactive" },
]

export const employeeService = {
  getAll: (_params: EmployeeListParams): Promise<PaginatedResponse<Employee>> =>
    Promise.resolve({ data: MOCK_EMPLOYEES, total: MOCK_EMPLOYEES.length, page: 1, limit: 20 }),
    // apiClient.get(ENDPOINTS.employees.root, { params }),

  getById: (id: string): Promise<Employee> => {
    const found = MOCK_EMPLOYEES.find((e) => e.id === id)
    if (!found) return Promise.reject(new Error("Employee not found"))
    return Promise.resolve(found)
    // return apiClient.get(ENDPOINTS.employees.detail(id))
  },

  create: (payload: CreateEmployeePayload): Promise<Employee> =>
    Promise.resolve({ ...payload, id: crypto.randomUUID(), department: "", status: "active" }),
    // apiClient.post(ENDPOINTS.employees.root, payload),

  update: (id: string, payload: UpdateEmployeePayload): Promise<Employee> => {
    const found = MOCK_EMPLOYEES.find((e) => e.id === id)
    return Promise.resolve({ ...(found as Employee), ...payload, id })
    // return apiClient.put(ENDPOINTS.employees.detail(id), payload)
  },

  deactivate: (_id: string): Promise<void> => Promise.resolve(),
    // apiClient.patch(ENDPOINTS.employees.deactivate(id)),
}
