import type { Control } from "react-hook-form"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { TextField } from "@/components/common/form-fields/text-field"
import { DatePickerField } from "@/components/common/form-fields/date-picker-field"
import { SelectField } from "@/components/common/form-fields/select-field"
import { RadioGroupField } from "@/components/common/form-fields/radio-group-field"
import { FileUploadField } from "@/components/common/form-fields/file-upload-field"
import {
  GENDER_OPTIONS,
  ETHNICITY_OPTIONS,
  RELIGION_OPTIONS,
  MARITAL_STATUS_OPTIONS,
  DEPARTMENT_OPTIONS,
  POSITION_OPTIONS,
  ROLE_OPTIONS,
  BANK_OPTIONS,
  PAYROLL_TYPE_OPTIONS,
  type EmployeeFormValues,
} from "@/components/modules/employees/employee-form.schema"

function SectionHeading({ title, required }: { title: string; required: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <h3 className="text-text-primary text-sm font-medium">{title}</h3>
      <Badge variant={required ? "secondary" : "outline"}>{required ? "Wajib" : "Opsional"}</Badge>
    </div>
  )
}

export function EmployeeIdentityStep({ control }: { control: Control<EmployeeFormValues> }) {
  return (
    <div className="space-y-8">
      {/* Section 1 — required */}
      <div className="space-y-4">
        <div>
          <SectionHeading title="Informasi Karyawan" required />
          <Separator className="mt-2" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <FileUploadField
            control={control}
            name="avatar"
            label="Foto Profil"
            accept="image/png"
            description="Drag & drop file disini. Atau klik untuk menjelajah (format PNG, maks. 5MB)."
          />
          <div className="grid grid-cols-1 gap-4 md:col-span-2 md:grid-cols-2">
            <TextField control={control} name="fullName" label="Nama Lengkap" placeholder="Masukkan Nama Lengkap" />
            <TextField
              control={control}
              name="phoneNumber"
              label="Nomor Ponsel"
              type="tel"
              placeholder="Masukkan Nomor Ponsel"
            />
            <TextField
              control={control}
              name="placeOfBirth"
              label="Tempat Lahir"
              placeholder="Masukkan Kota Lahir"
            />
            <DatePickerField control={control} name="dateOfBirth" label="Tanggal Lahir" placeholder="dd/mm/yyyy" />
            <RadioGroupField control={control} name="gender" label="Jenis Kelamin" options={GENDER_OPTIONS} />
            <SelectField
              control={control}
              name="ethnicity"
              label="Suku"
              placeholder="Pilih Suku"
              options={ETHNICITY_OPTIONS}
            />
            <SelectField
              control={control}
              name="religion"
              label="Agama"
              placeholder="Pilih Agama"
              options={RELIGION_OPTIONS}
            />
            <SelectField
              control={control}
              name="maritalStatus"
              label="Status Perkawinan"
              placeholder="Pilih Status"
              options={MARITAL_STATUS_OPTIONS}
            />
          </div>
        </div>
      </div>

      {/* Section 2 — required */}
      <div className="space-y-4">
        <div>
          <SectionHeading title="Detail Ketenagakerjaan" required />
          <Separator className="mt-2" />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <TextField control={control} name="employeeId" label="ID karyawan" placeholder="Masukkan ID karyawan" />
          <SelectField
            control={control}
            name="departmentId"
            label="Departemen"
            placeholder="Pilih Departemen"
            options={DEPARTMENT_OPTIONS}
          />
          <SelectField
            control={control}
            name="position"
            label="Posisi Pekerjaan"
            placeholder="Pilih Posisi Pekerjaan"
            options={POSITION_OPTIONS}
          />
          <SelectField control={control} name="role" label="Role" placeholder="Pilih Role" options={ROLE_OPTIONS} />
          <DatePickerField
            control={control}
            name="joinDate"
            label="Tanggal Bergabung di Perusahaan"
            placeholder="dd/mm/yyyy"
          />
          <TextField
            control={control}
            name="contractNumber"
            label="Nomor Kontrak"
            placeholder="Masukkan Nomor Kontrak"
          />
        </div>
      </div>

      {/* Section 3 — optional */}
      <div className="space-y-4">
        <div>
          <SectionHeading title="Informasi Financial dan Pajak" required={false} />
          <Separator className="mt-2" />
        </div>

        <div className="space-y-4">
          <p className="text-text-secondary text-xs font-medium">Payroll dan Detail Bank</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <SelectField
              control={control}
              name="bankName"
              label="Nama Bank"
              placeholder="Pilih Nama Bank"
              options={BANK_OPTIONS}
            />
            <TextField
              control={control}
              name="bankAccountNumber"
              label="Nomor Rekening"
              placeholder="Masukkan Nomor Rekening"
            />
            <SelectField
              control={control}
              name="payrollType"
              label="Tipe Payroll"
              placeholder="Pilih Tipe Payroll"
              options={PAYROLL_TYPE_OPTIONS}
            />
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-text-secondary text-xs font-medium">Informasi Pajak</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TextField
              control={control}
              name="npwpOwnerName"
              label="Nama Pemilik NPWP"
              placeholder="Masukkan Nama Pemilik NPWP"
            />
            <TextField control={control} name="npwpNumber" label="Nomor NPWP" placeholder="Masukkan Nomor NPWP" />
          </div>
        </div>
      </div>
    </div>
  )
}
