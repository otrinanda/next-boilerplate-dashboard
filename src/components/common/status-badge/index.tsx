import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type StatusType =
  | "active"
  | "inactive"
  | "on-leave" // employee status
  | "draft"
  | "running"
  | "review" // payroll in-progress
  | "approved"
  | "locked" // payroll final

const STATUS_CONFIG: Record<StatusType, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-status-success/10 text-status-success border-status-success/20" },
  inactive: { label: "Inactive", className: "bg-status-danger/10 text-status-danger border-status-danger/20" },
  "on-leave": { label: "On Leave", className: "bg-status-warning/10 text-status-warning border-status-warning/20" },
  draft: { label: "Draft", className: "bg-text-muted/10 text-text-secondary border-border" },
  running: { label: "Running", className: "bg-status-info/10 text-status-info border-status-info/20" },
  review: { label: "Review", className: "bg-status-warning/10 text-status-warning border-status-warning/20" },
  approved: { label: "Approved", className: "bg-status-success/10 text-status-success border-status-success/20" },
  locked: { label: "Locked", className: "bg-primary/10 text-primary border-primary/20" },
}

export function StatusBadge({ status, className }: { status: StatusType; className?: string }) {
  const config = STATUS_CONFIG[status]
  return (
    <Badge variant="outline" className={cn("text-xs", config.className, className)}>
      {config.label}
    </Badge>
  )
}
