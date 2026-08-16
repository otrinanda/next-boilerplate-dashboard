"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { WandSparklesIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Wizard, clearDraft, type WizardStep } from "@/components/common/wizard"
import { EmployeeIdentityStep } from "@/components/modules/employees/employee-identity-step"
import { employeeFormSchema, type EmployeeFormValues } from "@/components/modules/employees/employee-form.schema"

const DRAFT_KEY = "employee-create-draft"

// Dev-only convenience for manual QA — never rendered in production builds.
const IS_DEV = process.env.NODE_ENV === "development"

const DEV_SAMPLE_DATA: EmployeeFormValues = {
  fullName: "Andi Darmawan",
  phoneNumber: "0878123123123",
  placeOfBirth: "Sorong",
  dateOfBirth: new Date(1990, 2, 19),
  gender: "male",
  ethnicity: "papua",
  religion: "protestant",
  maritalStatus: "married",
  employeeId: "123123123",
  departmentId: "engineering",
  position: "site-manager",
  role: "employee",
  joinDate: new Date(1990, 2, 19),
  contractNumber: "KTR-001-001",
  bankName: "mandiri",
  bankAccountNumber: "1231231231",
  payrollType: "contract",
  npwpOwnerName: "Andi Darmawan",
  npwpNumber: "110.000.000.000",
  // Alamat tab is still a placeholder, but the schema still requires these —
  // fill them too so a full form.handleSubmit() doesn't get blocked by them.
  mobileNumber: "0878123123123",
  homePhone: "",
  currentAddress: { street: "Jl. Merdeka No. 1", city: "jakarta-selatan", province: "dki-jakarta", postalCode: "12345" },
  sameAsCurrentAddress: true,
  permanentAddress: { street: "", city: "", province: "", postalCode: "" },
}

function ComingSoonStep({ label }: { label: string }) {
  return (
    <div className="text-text-secondary flex min-h-40 items-center justify-center text-sm">
      Tab &quot;{label}&quot; belum diimplementasikan.
    </div>
  )
}

export function EmployeeCreateWizard() {
  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      placeOfBirth: "",
      religion: "",
      maritalStatus: "",
      employeeId: "",
      contractNumber: "",
      // Not yet exposed in the UI (Alamat tab still a placeholder), kept so the
      // schema type-checks — see the note in employee-form.schema.ts.
      mobileNumber: "",
      homePhone: "",
      currentAddress: { street: "", city: "", province: "", postalCode: "" },
      sameAsCurrentAddress: false,
      permanentAddress: { street: "", city: "", province: "", postalCode: "" },
    },
  })

  const [activeStep, setActiveStep] = useState(0)

  // Only reachable once every tab below is actually built — full-schema
  // validation (via handleSubmit) will fail on the hidden Alamat fields until then.
  const onSubmit = form.handleSubmit((values) => {
    toast.success("Data captured — check console for values.")
    console.log("employee-create-wizard values:", values)
    clearDraft(DRAFT_KEY)
  })

  const steps: WizardStep<EmployeeFormValues>[] = [
    {
      id: "identitas",
      label: "Identitas",
      fields: [
        "fullName",
        "phoneNumber",
        "placeOfBirth",
        "dateOfBirth",
        "gender",
        "ethnicity",
        "religion",
        "maritalStatus",
        "employeeId",
        "departmentId",
        "position",
        "role",
        "joinDate",
        "contractNumber",
      ],
      content: <EmployeeIdentityStep control={form.control} />,
    },
    { id: "dokumen-karyawan", label: "Dokumen Karyawan", content: <ComingSoonStep label="Dokumen Karyawan" /> },
    { id: "penempatan-kerja", label: "Penempatan Kerja", content: <ComingSoonStep label="Penempatan Kerja" /> },
    { id: "alamat", label: "Alamat", content: <ComingSoonStep label="Alamat" /> },
    { id: "keluarga", label: "Keluarga", content: <ComingSoonStep label="Keluarga" /> },
    { id: "pengalaman-kerja", label: "Pengalaman Kerja", content: <ComingSoonStep label="Pengalaman Kerja" /> },
  ]

  return (
    <div className="space-y-3">
      {IS_DEV && (
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => form.reset(DEV_SAMPLE_DATA)}
          >
            <WandSparklesIcon />
            Isi Data Contoh (Dev)
          </Button>
        </div>
      )}
      <Wizard
        steps={steps}
        form={form}
        activeStep={activeStep}
        onStepChange={setActiveStep}
        onSubmit={onSubmit}
        isSubmitting={form.formState.isSubmitting}
        navigationStyle="tabs"
        previousLabel="Kembali"
        nextLabel="Simpan dan Selanjutnya"
        draftKey={DRAFT_KEY}
        draftExclude={["avatar"]}
      />
    </div>
  )
}
