"use client"

import { useState } from "react"
import { AppHeader } from "@/components/common/layout/app-header"
import { EmployeeTable } from "@/components/modules/employees/employee-table"
import { employeeColumns } from "@/components/modules/employees/employee-columns"
import { useEmployees } from "@hooks/modules/use-employees"
import type { EmployeeListParams } from "@app-types/employee.types"

export default function EmployeesPage() {
  const [params] = useState<EmployeeListParams>({ page: 1, limit: 20 })
  const { data, isLoading, isError, refetch } = useEmployees(params)

  const breadcrumbItems = [
    { title: "Master Data", href: "/master-data" },
    { title: "Employees", href: "/master-data/employees" },
  ]

  return (
    <>
      <AppHeader list={breadcrumbItems} />
      <div className="container mx-auto py-10">
        {isError ? (
          <div className="flex flex-col items-center gap-3 py-10 text-center">
            <p className="text-text-secondary text-sm">Failed to load employees.</p>
            <button
              onClick={() => refetch()}
              className="text-primary text-sm underline underline-offset-4"
            >
              Retry
            </button>
          </div>
        ) : (
          <EmployeeTable columns={employeeColumns} data={data?.data ?? []} isLoading={isLoading} />
        )}
      </div>
    </>
  )
}
