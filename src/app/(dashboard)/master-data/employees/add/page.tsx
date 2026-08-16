"use client"

import { AppHeader } from "@/components/common/layout/app-header"
import { PageHeader } from "@/components/common/page-header"
import { EmployeeCreateWizard } from "@/components/modules/employees/employee-create-wizard"

export default function AddEmployeePage() {
  const breadcrumbItems = [
    { title: "Dashboard", href: "/" },
    { title: "Manajemen Karyawan", href: "/master-data/employees" },
    { title: "Tambah Karyawan Baru", href: "/master-data/employees/add" },
  ]

  return (
    <>
      <AppHeader list={breadcrumbItems} />
      <div className="py-6">
        <PageHeader
          title="Tambah Karyawan Baru"
          description="Lengkapi isian berikut untuk menambah karyawan baru"
        />
        <div className="mt-4">
          <EmployeeCreateWizard />
        </div>
      </div>
    </>
  )
}
