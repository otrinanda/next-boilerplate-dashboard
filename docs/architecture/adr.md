# Architecture Decision Records (ADR)

Keywords: adr, decision, alasan, trade-off, app router, tanstack, zustand, httponly, react hook form, design tone, datatable, shadcn

Setiap keputusan teknis dicatat di sini beserta alasannya, agar mudah di-revisit ketika ada perubahan requirement.

---

## ADR-001: Next.js App Router (bukan Pages Router)

**Keputusan:** Gunakan App Router.

**Alasan:**
- Edge Middleware untuk RBAC lebih straightforward
- Layout nesting cocok untuk dashboard dengan sidebar
- Future-proof — Pages Router akan deprecated

**Trade-off:** Lebih baru, beberapa library masih partial support. Mitigasi: gunakan library yang sudah stable dengan App Router.

---

## ADR-002: TanStack Query untuk Server State

**Keputusan:** TanStack Query, bukan SWR atau native fetch.

**Alasan:**
- Caching & invalidation lebih granular — penting untuk payroll yang datanya saling terkait
- `useMutation` dengan `onSuccess`/`onError` lifecycle lebih eksplisit
- Query key factory memudahkan invalidation per modul

**Trade-off:** Bundle size lebih besar dari SWR. Acceptable untuk enterprise app.

---

## ADR-003: Zustand untuk Global UI State

**Keputusan:** Zustand, bukan Redux atau Context API.

**Alasan:**
- Tidak butuh provider wrapper
- API sederhana, cocok untuk solo developer
- Hanya dipakai untuk 3 store kecil (auth, payroll period, fatal error)

**Trade-off:** Tidak ada devtools sekuat Redux. Acceptable karena scope global state kecil.

---

## ADR-004: HttpOnly Cookie untuk JWT

**Keputusan:** JWT disimpan di HttpOnly Cookie, bukan localStorage.

**Alasan:**
- Payroll system menyimpan data sensitif (salary, tax) — keamanan adalah prioritas
- HttpOnly Cookie tidak bisa diakses JavaScript → aman dari XSS
- Abstraction layer `tokenService` memudahkan migrasi jika BE tidak support

**Trade-off:** Hard dependency ke BE untuk set cookie. Sudah dikoordinasikan dalam checklist pending confirmations.

---

## ADR-005: React Hook Form + Zod

**Keputusan:** React Hook Form dengan Zod untuk validasi, bukan Formik atau validasi manual.

**Alasan:**
- React Hook Form: performa lebih baik (uncontrolled by default), re-render minimal
- Zod: type-safe, schema bisa di-reuse untuk API types
- Kombinasi keduanya sudah menjadi standar industri Next.js

**Trade-off:** Learning curve untuk developer baru. Tidak relevan karena solo project.

---

## ADR-006: Enterprise & Dense Design Tone

**Keputusan:** Dark theme, compact layout, data-heavy.

**Alasan:**
- User utama (HR Admin, Finance) adalah power user yang butuh banyak data per layar
- Payroll system digunakan harian dalam konteks kerja profesional
- Design tokens terpusat → mudah di-update ketika UI/UX tim datang

**Trade-off:** Kurva adaptasi lebih tinggi untuk user baru. Bisa dimitigasi dengan onboarding tooltip.

---

## ADR-007: shadcn/ui DataTable (bukan AG Grid atau react-table langsung)

**Keputusan:** shadcn/ui DataTable yang built on TanStack Table.

**Alasan:**
- Sudah terintegrasi dengan design system shadcn
- Cukup untuk kebutuhan saat ini (simple table, server-side pagination)
- Tidak perlu lisensi enterprise seperti AG Grid

**Trade-off:** Jika nanti butuh fitur kompleks (virtualization, pivot), perlu upgrade ke TanStack Table langsung atau AG Grid.
