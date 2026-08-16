"use client"

import { useState } from "react"
import { AppHeader } from "@/components/common/layout/app-header"
import { PageHeader } from "@/components/common/page-header"
import { ErrorState } from "@/components/common/error-state"
import { ConfirmDialog } from "@/components/common/confirm-dialog"
import { DataTable } from "@/components/common/data-table"
import { DataTableToolbar } from "@/components/common/data-table/toolbar"
import { getEmployeeColumns } from "@/components/modules/employees/employee-columns"
import { useEmployees, useDeactivateEmployee } from "@hooks/modules/use-employees"
import type { Employee, EmployeeListParams } from "@app-types/employee.types"

export default function EmployeesPage() {
  const [params, setParams] = useState<EmployeeListParams>({ page: 1, limit: 20 })
  const [search, setSearch] = useState("")
  const [employeeToDeactivate, setEmployeeToDeactivate] = useState<Employee | null>(null)

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setParams((prev) => ({ ...prev, search: value, page: 1 }))
  }
  const { data, isLoading, isError, refetch } = useEmployees(params)
  const deactivateEmployee = useDeactivateEmployee()

  const breadcrumbItems = [
    { title: "Master Data", href: "/master-data" },
    { title: "Employees", href: "/master-data/employees" },
  ]

  const columns = getEmployeeColumns({ onDeactivate: setEmployeeToDeactivate })

  const handleConfirmDeactivate = () => {
    if (!employeeToDeactivate) return
    deactivateEmployee.mutate(employeeToDeactivate.id, {
      onSuccess: () => setEmployeeToDeactivate(null),
    })
  }

  return (
    <>
      <AppHeader list={breadcrumbItems} />
      <div className="py-6">
        <PageHeader
          title="Employee Management"
          description="Kelola data master karyawan."
        />
        <div className="mt-4">
          {isError ? (
            <ErrorState description="Gagal memuat data karyawan." retry={refetch} />
          ) : (
            <DataTable
              columns={columns}
              data={data?.data ?? []}
              isLoading={isLoading}
              toolbar={
                <DataTableToolbar
                  value={search}
                  onChange={handleSearchChange}
                  placeholder="Search employees..."
                />
              }
              pagination={{
                pageIndex: (params.page ?? 1) - 1,
                pageSize: params.limit ?? 20,
                total: data?.total ?? 0,
                onPageChange: (page) => setParams((prev) => ({ ...prev, page: page + 1 })),
              }}
            />
          )}
        </div>
      </div>
      <ConfirmDialog
        open={!!employeeToDeactivate}
        onOpenChange={(open) => !open && setEmployeeToDeactivate(null)}
        title="Deactivate Employee"
        description={`Are you sure you want to deactivate ${employeeToDeactivate?.name}?`}
        variant="destructive"
        confirmLabel="Deactivate"
        onConfirm={handleConfirmDeactivate}
        isLoading={deactivateEmployee.isPending}
      />
    </>
  )
}
