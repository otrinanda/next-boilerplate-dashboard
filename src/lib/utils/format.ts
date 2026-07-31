export function formatCurrency(value: number): string {
  return `Rp ${value.toLocaleString("id-ID")}`
}

export function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}
