import { AlertTriangleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorStateProps {
  title?: string
  description?: string
  retry?: () => void
}

export function ErrorState({
  title = "Something went wrong",
  description = "Gagal memuat data. Coba lagi.",
  retry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-status-danger/10">
        <AlertTriangleIcon className="size-5 text-status-danger" />
      </div>
      <div>
        <p className="text-text-primary text-sm font-medium">{title}</p>
        <p className="text-text-secondary text-xs mt-1">{description}</p>
      </div>
      {retry && (
        <Button variant="outline" size="sm" onClick={retry}>
          Retry
        </Button>
      )}
    </div>
  )
}
