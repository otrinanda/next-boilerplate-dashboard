import { Input } from "@/components/ui/input"

interface DataTableToolbarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

// Search box generik yang dipakai lewat prop `toolbar` di DataTable (lihat index.tsx).
// Filter/kolom lain yang lebih spesifik per modul cukup dirender langsung sebagai
// React node di prop `toolbar`, tidak perlu masuk ke dalam komponen ini.
export function DataTableToolbar({ value, onChange, placeholder }: DataTableToolbarProps) {
  return (
    <Input
      placeholder={placeholder ?? "Search..."}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="max-w-sm"
    />
  )
}
