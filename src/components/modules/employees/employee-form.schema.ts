import { z } from "zod"
import { ROLES } from "@constants/roles"

export const GENDER_OPTIONS = [
  { value: "male", label: "Laki-laki" },
  { value: "female", label: "Perempuan" },
]

// TODO(BE): mock lists below — replace with master data from API once available
// (see docs/architecture/pending-be.md).
export const ETHNICITY_OPTIONS = [
  { value: "jawa", label: "Jawa" },
  { value: "sunda", label: "Sunda" },
  { value: "batak", label: "Batak" },
  { value: "minang", label: "Minang" },
  { value: "bugis", label: "Bugis" },
  { value: "papua", label: "Papua" },
  { value: "betawi", label: "Betawi" },
  { value: "other", label: "Lainnya" },
]

export const RELIGION_OPTIONS = [
  { value: "islam", label: "Islam" },
  { value: "protestant", label: "Kristen Protestan" },
  { value: "catholic", label: "Katolik" },
  { value: "hindu", label: "Hindu" },
  { value: "buddha", label: "Buddha" },
  { value: "konghucu", label: "Konghucu" },
  { value: "other", label: "Lainnya" },
]

export const MARITAL_STATUS_OPTIONS = [
  { value: "single", label: "Belum Menikah" },
  { value: "married", label: "Menikah" },
  { value: "divorced", label: "Cerai Hidup" },
  { value: "widowed", label: "Cerai Mati" },
]

export const DEPARTMENT_OPTIONS = [
  { value: "engineering", label: "Engineering" },
  { value: "finance", label: "Finance" },
  { value: "hr", label: "Human Resources" },
  { value: "operations", label: "Operations" },
  { value: "sales-marketing", label: "Sales & Marketing" },
]

export const POSITION_OPTIONS = [
  { value: "staff", label: "Staff" },
  { value: "supervisor", label: "Supervisor" },
  { value: "manager", label: "Manager" },
  { value: "site-manager", label: "Site Manager" },
  { value: "director", label: "Director" },
]

// System access role — reuses the real RBAC roles (see constants/roles.ts),
// not a separate mock list.
export const ROLE_OPTIONS = Object.values(ROLES).map((role) => ({
  value: role,
  label: role.charAt(0).toUpperCase() + role.slice(1),
}))

export const BANK_OPTIONS = [
  { value: "mandiri", label: "Bank Mandiri" },
  { value: "bca", label: "BCA" },
  { value: "bri", label: "BRI" },
  { value: "bni", label: "BNI" },
  { value: "cimb-niaga", label: "CIMB Niaga" },
]

export const PAYROLL_TYPE_OPTIONS = [
  { value: "permanent", label: "Tetap" },
  { value: "contract", label: "Kontrak" },
  { value: "freelance", label: "Freelance" },
  { value: "internship", label: "Magang" },
]

export const PROVINCE_OPTIONS = [
  { value: "dki-jakarta", label: "DKI Jakarta" },
  { value: "jawa-barat", label: "Jawa Barat" },
  { value: "jawa-tengah", label: "Jawa Tengah" },
  { value: "jawa-timur", label: "Jawa Timur" },
  { value: "banten", label: "Banten" },
]

export const CITY_OPTIONS = [
  { value: "jakarta-selatan", label: "Jakarta Selatan" },
  { value: "jakarta-pusat", label: "Jakarta Pusat" },
  { value: "bandung", label: "Bandung" },
  { value: "semarang", label: "Semarang" },
  { value: "surabaya", label: "Surabaya" },
  { value: "tangerang", label: "Tangerang" },
]

const addressSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  postalCode: z.string().optional(),
})

// Tabs: Identitas (built) | Dokumen Karyawan, Penempatan Kerja, Keluarga,
// Pengalaman Kerja (not built yet, see employee-create-wizard.tsx placeholders).
//
// "Alamat" below is the OLD 2-step design's Address content, kept as-is pending
// the redesigned Alamat tab — note its `mobileNumber`/`homePhone` likely overlap
// with Identitas' new `phoneNumber` field and should be reconciled once that
// tab's new design is shown.
export const employeeFormSchema = z
  .object({
    // Tab: Identitas — section "Informasi Karyawan" (required)
    avatar: z
      .any()
      .optional()
      .refine((file) => !file || (file instanceof File && file.size <= 5 * 1024 * 1024), {
        message: "File must be a PNG under 5MB",
      }),
    fullName: z.string().min(2, "Full name is required"),
    phoneNumber: z.string().min(8, "Enter a valid phone number"),
    placeOfBirth: z.string().min(1, "Place of birth is required"),
    dateOfBirth: z.date(),
    gender: z.enum(["male", "female"]),
    ethnicity: z.string().min(1, "Please select an ethnicity"),
    religion: z.string().min(1, "Please select a religion"),
    maritalStatus: z.string().min(1, "Please select a marital status"),

    // Tab: Identitas — section "Detail Ketenagakerjaan" (required)
    employeeId: z.string().min(1, "Employee ID is required"),
    departmentId: z.string().min(1, "Please select a department"),
    position: z.string().min(1, "Please select a position"),
    role: z.string().min(1, "Please select a role"),
    joinDate: z.date(),
    contractNumber: z.string().min(1, "Contract number is required"),

    // Tab: Identitas — section "Informasi Financial dan Pajak" (optional)
    bankName: z.string().optional(),
    bankAccountNumber: z.string().optional(),
    payrollType: z.string().optional(),
    npwpOwnerName: z.string().optional(),
    npwpNumber: z.string().optional(),

    // Tab: Alamat (old 2-step design, pending redesign — see note above)
    mobileNumber: z.string().min(8, "Enter a valid mobile number"),
    homePhone: z.string().optional(),
    currentAddress: z.object({
      street: z.string().min(1, "Street address is required"),
      city: z.string().min(1, "City is required"),
      province: z.string().min(1, "Province is required"),
      postalCode: z.string().min(1, "Postal code is required"),
    }),
    sameAsCurrentAddress: z.boolean(),
    permanentAddress: addressSchema,
  })
  .superRefine((values, ctx) => {
    if (values.sameAsCurrentAddress) return
    const requiredFields = ["street", "city", "province", "postalCode"] as const
    for (const field of requiredFields) {
      if (!values.permanentAddress[field]) {
        ctx.addIssue({
          code: "custom",
          message: "This field is required",
          path: ["permanentAddress", field],
        })
      }
    }
  })

export type EmployeeFormValues = z.infer<typeof employeeFormSchema>
