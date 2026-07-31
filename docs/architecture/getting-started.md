# Getting Started & Project Setup

Keywords: setup, install, shadcn, create-next-app, dependencies, prerequisites, path alias, tsconfig

## Prerequisites

```bash
Node.js  >= 20.x
npm      >= 10.x
```

## Initial Setup

```bash
# 1. Create Next.js project
npx create-next-app@latest payroll-ms \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd payroll-ms

# 2. Install dependencies
npm install \
  @tanstack/react-query \
  @tanstack/react-query-devtools \
  axios \
  zustand \
  react-hook-form \
  @hookform/resolvers \
  zod

# 3. Install shadcn/ui
npx shadcn@latest init

# 4. Install shadcn components yang dibutuhkan
npx shadcn@latest add \
  button input form select checkbox switch \
  dialog sheet toast alert skeleton \
  badge avatar card tooltip \
  dropdown-menu tabs separator \
  breadcrumb table

# 5. Install font
npm install @next/font
```

## Setup shadcn/ui untuk Dark Theme

```ts
// components.json (generated oleh shadcn init)
{
  "style": "default",
  "tailwind": {
    "baseColor": "slate",
    "cssVariables": true
  }
}
```

> **Override CSS variables:** Tailwind v4 pakai nilai hex langsung (bukan HSL triplet ala shadcn v3), dan token Enterprise & Dense di-set di class `.dark` — bukan `:root` — karena toggle dikelola `next-themes` dengan `defaultTheme="dark"`. Token lengkap & rationale ada di [design-system.md](../ui-ux/design-system.md) section *Design Tokens* — jangan duplikasi nilai di sini supaya tidak divergen di kemudian hari.

## Project Configuration Files

```ts
// tsconfig.json — path aliases
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@lib/*": ["./src/lib/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@services/*": ["./src/services/*"],
      "@stores/*": ["./src/stores/*"],
      "@app-types/*": ["./src/types/*"],
      "@constants/*": ["./src/constants/*"]
    }
  }
}
```

> **Catatan:** alias dinamai `@app-types/*`, bukan `@types/*` — TypeScript mereservasi nama `@types` untuk resolusi package DefinitelyTyped (`node_modules/@types`), jadi path alias literal `@types/*` menyebabkan error `TS6137: Cannot import type declaration files`. Semua referensi `types/` di dokumen lain (`api-layer.md`, `state-management.md`, dst.) yang menyebut folder `src/types/` tetap benar sebagai nama folder — yang berubah cuma alias importnya.

```ts
// next.config.ts
const nextConfig = {
  experimental: {
    typedRoutes: true,    // type-safe Link href
  },
}
```
