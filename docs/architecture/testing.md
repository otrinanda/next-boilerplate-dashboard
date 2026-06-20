# Testing Strategy

Keywords: test, testing, vitest, react testing library, playwright, e2e, unit, hook

## Scope Testing

Untuk solo developer dengan timeline terbatas, fokus testing di:

| Priority | Area | Tool |
|---|---|---|
| High | Utility functions (format, calculation helper) | Vitest |
| High | Zod schemas — validasi edge case | Vitest |
| Medium | Custom hooks | Vitest + React Testing Library |
| Medium | Common components | React Testing Library |
| Low | E2E critical flow (login, payroll run) | Playwright (fase berikutnya) |

## Setup

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

```ts
// vitest.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
```

## Konvensi

```ts
// Test file ditempatkan berdekatan dengan source file
src/lib/utils/format.ts
src/lib/utils/format.test.ts

// Atau di folder __tests__
src/components/common/data-table/__tests__/data-table.test.tsx
```

```ts
// Contoh test untuk utility function
// src/lib/utils/format.test.ts
describe('formatCurrency', () => {
  it('should format number to IDR currency', () => {
    expect(formatCurrency(18500000)).toBe('Rp 18.500.000')
  })

  it('should handle zero value', () => {
    expect(formatCurrency(0)).toBe('Rp 0')
  })
})
```
