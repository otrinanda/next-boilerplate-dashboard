import { z } from "zod"

export const employeeFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  nik: z.string().length(16, "NIK must be 16 digits"),
  joinDate: z.date(),
  departmentId: z.string().uuid(),
  baseSalary: z.number().min(0),
})

export type EmployeeFormValues = z.infer<typeof employeeFormSchema>
