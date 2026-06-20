# PDF Generation

Keywords: pdf, export, output, payslip pdf, report pdf, api route, generatePDF, html template

- Payslip dan laporan ditampilkan di UI **dan** dapat di-export ke PDF
- HTML template file di-support dari sisi frontend, template konten dari BE
- PDF generation via **Next.js API Route** sebagai helper render

```
app/api/pdf/
└── route.ts    # POST: terima { templateHtml, data } → return PDF buffer
```

```ts
// lib/utils/pdf.ts
export async function generatePDF(templateHtml: string, data: unknown) {
  const response = await fetch('/api/pdf', {
    method: 'POST',
    body: JSON.stringify({ templateHtml, data }),
  })
  return response.blob()
}
```
