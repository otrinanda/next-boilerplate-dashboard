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

```css
/* app/globals.css — override shadcn CSS variables ke Enterprise theme */
:root {
  --background: 215 28% 9%;          /* #13171E */
  --foreground: 210 25% 82%;         /* #CDD6E0 */
  --card: 220 27% 7%;                /* #0D1117 */
  --border: 215 22% 15%;             /* #1E2530 */
  --primary: 211 62% 47%;            /* #2E74C0 */
  --primary-foreground: 0 0% 100%;
  --muted: 215 22% 15%;
  --muted-foreground: 213 19% 40%;   /* #6B8299 */
  --destructive: 0 72% 51%;          /* #EF4444 */
}
```

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
      "@types/*": ["./src/types/*"],
      "@constants/*": ["./src/constants/*"]
    }
  }
}
```

```ts
// next.config.ts
const nextConfig = {
  experimental: {
    typedRoutes: true,    // type-safe Link href
  },
}
```
