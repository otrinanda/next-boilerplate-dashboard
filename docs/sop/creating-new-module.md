# Creating a New Module (Step-by-Step)

Keywords: sop, new module, scaffold, step-by-step, types, service, query keys, hooks, zod, schema, component, page, navigation

Panduan ini digunakan setiap kali membuat modul baru agar konsisten.
Contoh: membuat modul **Loan** di bawah Operational.

---

## Step 1 — Buat types

```ts
// src/types/loan.types.ts
export interface Loan {
  id: string
  employeeId: string
  amount: number
  remainingAmount: number
  installment: number
  status: 'active' | 'paid' | 'cancelled'
  startDate: string
  createdAt: string
}

export interface CreateLoanPayload {
  employeeId: string
  amount: number
  installment: number
  startDate: string
}
```

## Step 2 — Buat service

```ts
// src/services/loan.service.ts
export const loanService = {
  getAll: (params): Promise<PaginatedResponse<Loan>> =>
    apiClient.get('/loans', { params }),

  getById: (id: string): Promise<Loan> =>
    apiClient.get(`/loans/${id}`),

  create: (payload: CreateLoanPayload): Promise<Loan> =>
    apiClient.post('/loans', payload),

  update: (id: string, payload: Partial<CreateLoanPayload>): Promise<Loan> =>
    apiClient.put(`/loans/${id}`, payload),
}
```

## Step 3 — Tambah query keys

```ts
// src/lib/query-keys.ts — tambahkan:
loans: {
  all:    ['loans'],
  list:   (params) => ['loans', 'list', params],
  detail: (id)     => ['loans', 'detail', id],
},
```

## Step 4 — Buat hooks

```ts
// src/hooks/modules/use-loans.ts
export function useLoans(params) {
  return useQuery({
    queryKey: queryKeys.loans.list(params),
    queryFn:  () => loanService.getAll(params),
  })
}

export function useCreateLoan() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: loanService.create,
    onSuccess: () => {
      toast({ title: 'Loan created successfully.' })
      queryClient.invalidateQueries({ queryKey: queryKeys.loans.all })
    },
    onError: () => {
      toast({ variant: 'destructive', title: 'Failed to create loan.' })
    }
  })
}
```

## Step 5 — Buat Zod schema

```ts
// src/components/modules/loans/loan-form.schema.ts
export const loanFormSchema = z.object({
  employeeId:  z.string().uuid(),
  amount:      z.number().min(1, 'Amount must be greater than 0'),
  installment: z.number().min(1).max(24),
  startDate:   z.date(),
})

export type LoanFormValues = z.infer<typeof loanFormSchema>
```

## Step 6 — Buat komponen

```
src/components/modules/loans/
├── loan-table.tsx          # DataTable dengan columns definition
├── loan-form.tsx           # Create/edit form
├── loan-form.schema.ts     # Zod schema
└── loan-detail-sheet.tsx   # Side panel detail
```

## Step 7 — Buat halaman

```tsx
// src/app/(dashboard)/operational/loans/page.tsx
export default function LoansPage() {
  const [params, setParams] = useState({ page: 1, limit: 20 })
  const { data, isLoading, isError, refetch } = useLoans(params)

  if (isLoading) return <DataTable isLoading />
  if (isError)   return <ErrorState retry={refetch} />

  return (
    <div>
      <PageHeader
        title="Loan Management"
        breadcrumbs={[{ label: 'Operational' }, { label: 'Loans' }]}
        actions={<CreateLoanButton />}
      />
      <LoanTable data={data.data} pagination={...} />
    </div>
  )
}
```

## Step 8 — Tambah ke navigation

```ts
// src/constants/navigation.ts — tambahkan:
{
  label: 'Loans',
  path: '/operational/loans',
  icon: 'banknote',
  allowedRoles: ['admin', 'hr'],
}
```
