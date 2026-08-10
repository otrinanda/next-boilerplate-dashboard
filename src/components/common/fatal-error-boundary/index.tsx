"use client"

import { AlertOctagonIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useErrorStore } from "@stores/error.store"

// Menangani error fatal (500/503) yang di-set interceptor ke useErrorStore
// (lihat docs/architecture/api-layer.md, section Fatal Error Page). Dibungkus di
// dashboard layout supaya seluruh area (dashboard) tertutup satu boundary.
export function FatalErrorBoundary({ children }: { children: React.ReactNode }) {
  const { fatal, clearFatal } = useErrorStore()

  if (fatal) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-status-danger/10">
          <AlertOctagonIcon className="size-6 text-status-danger" />
        </div>
        <div>
          <p className="text-text-primary text-lg font-semibold">Terjadi kesalahan sistem</p>
          <p className="text-text-secondary text-sm mt-1">
            {fatal.message || "Server sedang bermasalah. Silakan coba beberapa saat lagi."}
          </p>
          {fatal.code && (
            <p className="text-text-muted font-mono text-xs mt-2">Error code: {fatal.code}</p>
          )}
        </div>
        <Button variant="outline" size="sm" onClick={clearFatal}>
          Coba lagi
        </Button>
      </div>
    )
  }

  return <>{children}</>
}
