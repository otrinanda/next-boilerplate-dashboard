"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, formatDate } from "@lib/utils/format"
import type { Employee, EmployeeStatus } from "@app-types/employee.types"

const STATUS_LABEL: Record<EmployeeStatus, string> = {
  active: "Active",
  inactive: "Inactive",
  "on-leave": "On Leave",
}

const STATUS_CLASS: Record<EmployeeStatus, string> = {
  active: "bg-status-success/10 text-status-success border-status-success/20",
  inactive: "bg-status-danger/10 text-status-danger border-status-danger/20",
  "on-leave": "bg-status-warning/10 text-status-warning border-status-warning/20",
}

export const employeeColumns: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "nik",
    header: "NIK",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "joinDate",
    header: "Join Date",
    cell: ({ row }) => formatDate(row.original.joinDate),
  },
  {
    accessorKey: "baseSalary",
    header: "Base Salary",
    cell: ({ row }) => formatCurrency(row.original.baseSalary),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status
      return (
        <Badge variant="outline" className={`text-xs ${STATUS_CLASS[status]}`}>
          {STATUS_LABEL[status]}
        </Badge>
      )
    },
  },
]
