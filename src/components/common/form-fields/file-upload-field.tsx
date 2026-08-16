"use client"

import * as React from "react"
import { UploadIcon, FileIcon, XIcon } from "lucide-react"
import type { Control, FieldPath, FieldValues } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

interface FileUploadFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label?: string
  description?: string
  accept?: string
  disabled?: boolean
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function FileUploadField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  accept,
  disabled,
}: FileUploadFieldProps<TFieldValues>) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = React.useState(false)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const file = (field.value ?? null) as File | null

        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <div>
                <input
                  ref={inputRef}
                  type="file"
                  accept={accept}
                  disabled={disabled}
                  className="hidden"
                  onChange={(event) => field.onChange(event.target.files?.[0] ?? null)}
                />

                {file ? (
                  <div className="flex items-center justify-between rounded-md border border-border bg-surface-overlay px-3 py-2">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileIcon className="size-4 shrink-0 text-text-secondary" />
                      <span className="truncate text-sm text-text-primary">{file.name}</span>
                      <span className="shrink-0 text-xs text-text-muted">
                        {formatFileSize(file.size)}
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-7 shrink-0"
                      disabled={disabled}
                      onClick={() => {
                        field.onChange(null)
                        if (inputRef.current) inputRef.current.value = ""
                      }}
                    >
                      <XIcon className="size-4" />
                    </Button>
                  </div>
                ) : (
                  <button
                    type="button"
                    disabled={disabled}
                    onClick={() => inputRef.current?.click()}
                    onDragOver={(event) => {
                      event.preventDefault()
                      setIsDragging(true)
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(event) => {
                      event.preventDefault()
                      setIsDragging(false)
                      const dropped = event.dataTransfer.files?.[0]
                      if (dropped) field.onChange(dropped)
                    }}
                    className={cn(
                      "flex w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border py-6 text-center transition-colors",
                      isDragging ? "border-primary bg-primary/5" : "hover:bg-surface-overlay",
                      disabled && "pointer-events-none opacity-50"
                    )}
                  >
                    <UploadIcon className="size-5 text-text-muted" />
                    <span className="text-xs text-text-secondary">
                      Click to upload or drag and drop
                    </span>
                  </button>
                )}
              </div>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
