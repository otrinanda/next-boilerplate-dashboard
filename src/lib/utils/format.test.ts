import { describe, it, expect } from "vitest"
import { formatCurrency } from "./format"

describe("formatCurrency", () => {
  it("should format number to IDR currency", () => {
    expect(formatCurrency(18500000)).toBe("Rp 18.500.000")
  })

  it("should handle zero value", () => {
    expect(formatCurrency(0)).toBe("Rp 0")
  })
})
