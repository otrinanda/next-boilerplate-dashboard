# Pending Confirmations with BE

Keywords: pending, be, backend, golang, konfirmasi, checklist, blocker

> Semua item di bawah perlu dikonfirmasi dengan BE Developer (Golang) sebelum implementasi dimulai.

## Authentication

- [ ] Apakah BE bisa set `HttpOnly Cookie` di login response?
- [ ] Apakah BE akan handle CORS dengan `credentials: true`?
- [ ] Apakah BE bisa set cookie attributes: `Secure`, `SameSite=Strict/Lax`?
- [ ] Refresh token — otomatis via cookie atau perlu hit `/auth/refresh` secara eksplisit?

## RBAC

- [ ] Apakah role disimpan di JWT payload? Jika ya, field name-nya apa?
- [ ] Apakah satu user bisa punya lebih dari satu role?
- [ ] Apakah ada permission granular dari BE atau cukup role-based saja?
- [ ] Endpoint untuk verify token / get current user?

## API Contract

- [ ] Format response pagination — konfirmasi struktur `{ data, total, page, limit }`
- [ ] Format error response — konfirmasi struktur `{ message, code, errors[] }`
- [ ] Apakah BE return `422` untuk validation error atau HTTP code lain?
- [ ] Apakah BE return `409` untuk duplicate entry atau HTTP code lain?

## State & Period

- [ ] Apakah ada endpoint untuk get active payroll period?
- [ ] Apakah payroll status di-return di setiap response atau endpoint tersendiri?

## Business Logic

- [ ] Approval workflow — single atau multi-level approval?
- [ ] Format export laporan — PDF saja atau Excel juga?
- [ ] Business rules perhitungan pajak (TER / Gross / Gross-Up / Net)?
- [ ] Business rules BPJS — persentase dan komponen apa saja?
- [ ] Mekanisme rollback setelah payroll di-approve & locked?
