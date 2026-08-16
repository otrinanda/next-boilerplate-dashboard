"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontalIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { StatusBadge } from "@/components/common/status-badge"
import { formatCurrency, formatDate } from "@lib/utils/format"
import type { Employee } from "@app-types/employee.types"

interface GetEmployeeColumnsOptions {
  onDeactivate: (employee: Employee) => void
}

export function getEmployeeColumns({ onDeactivate }: GetEmployeeColumnsOptions): ColumnDef<Employee>[] {
  return [
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
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const employee = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <MoreHorizontalIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem disabled>Edit</DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                disabled={employee.status === "inactive"}
                onClick={() => onDeactivate(employee)}
              >
                Deactivate
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}
