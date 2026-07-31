# Design System

Keywords: design system, tone, enterprise, dense, dark theme, color palette, typography, shadcn, page header, status badge, data table, confirm dialog, error state, naming, form, zod, loading

## Tone & Design Direction

**Enterprise & Dense** — dark theme, compact, data-heavy. Mirip Bloomberg Terminal atau SAP. Dipilih karena user utama (HR, Finance) adalah power user yang butuh banyak informasi dalam satu layar.

> Ketika UI/UX tim datang, cukup update CSS variables di blok `@theme inline` dan `:root` pada `app/globals.css`. Komponen mengikuti otomatis tanpa refactor. Tailwind v4 tidak membutuhkan `tailwind.config.ts`.

### Tiga Opsi yang Dieksplorasi

| Tone | Deskripsi | Keputusan |
|---|---|---|
| Professional & Corporate | Light, clean, institutional | Tidak dipilih |
| Modern & Friendly | White sidebar, approachable | Tidak dipilih |
| **Enterprise & Dense** | **Dark, compact, data-heavy** | **✅ Dipilih** |

**Alasan memilih Enterprise & Dense:**
- User utama (HR, Finance) adalah power user yang butuh banyak data per layar
- Payroll system digunakan dalam konteks kerja profesional sehari-hari
- Dark theme mengurangi eye strain untuk penggunaan intensif

## Design Tokens

Tailwind v4 tidak membutuhkan `tailwind.config.ts`. Semua token dikonfigurasi langsung di `app/globals.css`:
- **`@theme inline`** → Tailwind utility tokens (font, font size, warna brand)
- **`:root`** → CSS variables baseline (light) untuk shadcn/ui semantic tokens
- **`.dark`** → override token Enterprise & Dense — tema default aplikasi, diaktifkan lewat `next-themes` (`ThemeProvider` di `app/layout.tsx` dengan `defaultTheme="dark"`)

```css
/* app/globals.css — @theme inline (Tailwind utility tokens) */
@theme inline {
  /* Font — dimuat via next/font di layout.tsx */
  --font-sans: var(--font-space-grotesk), sans-serif;
  --font-mono: var(--font-geist-mono);

  /* Custom font size scale */
  --text-2xs: 9px;    --text-2xs--line-height: 1.4;
  --text-xs: 11px;    --text-xs--line-height: 1.5;
  --text-sm: 12px;    --text-sm--line-height: 1.5;
  --text-base: 13px;  --text-base--line-height: 1.6;
  --text-lg: 15px;    --text-lg--line-height: 1.5;
  --text-xl: 18px;    --text-xl--line-height: 1.4;
  --text-2xl: 22px;   --text-2xl--line-height: 1.3;

  /* Brand & extended color tokens */
  --color-brand-navy: #1B2B4B;
  --color-primary-light: #60A5FA;
  --color-primary-muted: rgba(46, 116, 192, 0.15);
  --color-surface: #13171E;
  --color-surface-raised: #0D1117;
  --color-surface-overlay: #1A1F28;
  --color-border-subtle: #191D24;
  --color-text-primary: #CDD6E0;
  --color-text-secondary: #6B8299;
  --color-text-muted: #3D4D5E;
  --color-text-inverse: #0D1117;
  --color-status-success: #10B981;
  --color-status-warning: #F59E0B;
  --color-status-danger: #EF4444;
  --color-status-info: #60A5FA;
}

/* .dark = Enterprise & Dense dark theme (tema default aplikasi) */
.dark {
  --background: #13171E;    /* surface.DEFAULT */
  --foreground: #CDD6E0;    /* text.primary */
  --primary: #2E74C0;       /* primary.DEFAULT */
  --sidebar: #0D1117;       /* surface.raised */
  /* lihat globals.css untuk nilai lengkap */
}
```

### Color Palette Lengkap

| Token | Hex | Konteks Penggunaan |
|---|---|---|
| `brand.navy` | `#1B2B4B` | Branding, logo, sidebar background |
| `primary.DEFAULT` | `#2E74C0` | Button primary, link, active nav, border active |
| `primary.light` | `#60A5FA` | Accent text, highlight, icon active |
| `primary.muted` | `rgba(46,116,192,0.15)` | Active nav background, badge background |
| `surface.DEFAULT` | `#13171E` | Page background |
| `surface.raised` | `#0D1117` | Sidebar, topbar, card, table header |
| `surface.overlay` | `#1A1F28` | Input field, search bar, dropdown |
| `border.DEFAULT` | `#1E2530` | Card border, section divider, table border |
| `border.subtle` | `#191D24` | Antar baris tabel |
| `text.primary` | `#CDD6E0` | Body text, nilai, label penting |
| `text.secondary` | `#6B8299` | Label, deskripsi, secondary info |
| `text.muted` | `#3D4D5E` | Placeholder, disabled, nav group label |
| `status.success` | `#10B981` | Active, approved, berhasil |
| `status.warning` | `#F59E0B` | Pending, on leave, review, perlu perhatian |
| `status.danger` | `#EF4444` | Error, inactive, destructive action |
| `status.info` | `#60A5FA` | Informasi, badge periode |

## Typography Scale & Usage

| Scale | Size | Penggunaan |
|---|---|---|
| `2xs` | 9px | Label kolom tabel, nav group label |
| `xs` | 11px | Badge, status, secondary info |
| `sm` | 12px | Toolbar button, tabel data, caption |
| `base` | 13px | Body text, nav item, form field |
| `lg` | 15px | Page title, card heading |
| `xl` | 18px | Section heading |
| `2xl` | 22px | Summary value / stat number |

```
2xs (9px)   → Nav group label, column header tabel
xs  (11px)  → Badge, status pill, pagination info
sm  (12px)  → Toolbar button, tabel cell, caption, breadcrumb
base(13px)  → Body text, nav item, form label, form input
lg  (15px)  → Page title, card heading, topbar title
xl  (18px)  → Section heading
2xl (22px)  → Summary stat value, dashboard number
```

## shadcn/ui Components

| Kategori | Komponen | Penggunaan |
|---|---|---|
| Layout | Sidebar, Breadcrumb, Separator | Shell navigasi |
| Data Display | DataTable, Badge, Avatar, Card, Tooltip | Semua list & detail view |
| Forms | Form, Input, Select, Checkbox, Switch, DatePicker, Combobox | Semua form |
| Feedback | Dialog, Sheet, Toast, Alert, Skeleton | Loading, notifikasi, konfirmasi |
| Actions | DropdownMenu, Tabs | Row action, multi-section page |

## Custom Common Components

### PageHeader

```tsx
// components/common/page-header/index.tsx
interface PageHeaderProps {
  title: string
  description?: string
  breadcrumbs?: { label: string; href?: string }[]
  actions?: React.ReactNode   // slot untuk tombol kanan atas
}

// Penggunaan
<PageHeader
  title="Employee Management"
  breadcrumbs={[{ label: 'Master Data' }, { label: 'Employees' }]}
  actions={<Button>+ Add Employee</Button>}
/>
```

### StatusBadge

```tsx
// components/common/status-badge/index.tsx
type StatusType =
  | 'active' | 'inactive' | 'on-leave'    // employee status
  | 'draft' | 'running' | 'review'        // payroll in-progress
  | 'approved' | 'locked'                 // payroll final

// Penggunaan
<StatusBadge status="approved" />
```

### DataTable

```tsx
// components/common/data-table/index.tsx
interface DataTableProps<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
  isLoading?: boolean           // otomatis tampil Skeleton rows
  pagination?: {
    pageIndex: number
    pageSize: number
    total: number
    onPageChange: (page: number) => void
  }
  toolbar?: React.ReactNode     // slot untuk search & filter
}
```

### ConfirmDialog

```tsx
// components/common/confirm-dialog/index.tsx
interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  variant?: 'default' | 'destructive'
  onConfirm: () => void
  isLoading?: boolean           // disable button saat mutation berlangsung
}
```

### ErrorState

```tsx
// components/common/error-state/index.tsx
interface ErrorStateProps {
  title?: string
  description?: string
  retry?: () => void
}
```

## Naming Convention

| Type | Convention | Contoh |
|---|---|---|
| Components | PascalCase | `EmployeeTable`, `PayslipCard` |
| Hooks | camelCase | `useEmployees`, `usePayrollPeriod` |
| File names | kebab-case | `employee-table.tsx` |
| Constants | SCREAMING_SNAKE | `PAYROLL_STATUS`, `ROLES` |
| Zod schemas | kebab-case + `.schema.ts` | `employee-form.schema.ts` |
| Services | kebab-case + `.service.ts` | `employee.service.ts` |
| Stores | kebab-case + `.store.ts` | `auth.store.ts` |

## Form Convention

```tsx
// Schema dipisah di file tersendiri
// components/modules/employees/employee-form.schema.ts
export const employeeFormSchema = z.object({
  name:         z.string().min(2, 'Name is required'),
  nik:          z.string().length(16, 'NIK must be 16 digits'),
  joinDate:     z.date(),
  departmentId: z.string().uuid(),
  baseSalary:   z.number().min(0),
})

export type EmployeeFormValues = z.infer<typeof employeeFormSchema>

// Form component
// components/modules/employees/employee-form.tsx
export function EmployeeForm({ onSubmit, defaultValues }) {
  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues,
  })

  return (
    <Form {...form}>
      <FormField name="name" render={({ field }) => (
        <FormItem>
          <FormLabel>Full Name</FormLabel>
          <FormControl><Input {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
    </Form>
  )
}
```

## Loading & Error Pattern

```tsx
// Konvensi standar di semua halaman
const { data, isLoading, isError, refetch } = useEmployees(params)

if (isLoading) return <DataTable isLoading />
if (isError)   return <ErrorState retry={refetch} />
return <DataTable data={data} columns={columns} />
```
