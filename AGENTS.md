<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:docs-access-rules -->
# Project Reference Docs — Access Rules

Project ini punya dokumen referensi terorganisir di folder `docs/`. Aturan berikut **WAJIB** diikuti agar tidak membaca dokumen yang tidak relevan.

## Hard Rules

1. **MUST** baca [docs/INDEX.md](docs/INDEX.md) **TERLEBIH DAHULU** sebelum membaca file apapun di `docs/`. INDEX adalah peta master topik → file path.
2. **MUST NOT** membaca seluruh isi folder `docs/` sekaligus. Dilarang:
   - Glob read seperti `docs/**/*.md` dalam satu batch
   - Membaca >3 file `docs/` dalam satu turn tanpa justifikasi eksplisit
   - Membaca subfolder README + semua file di dalamnya sekaligus
3. **MUST** gunakan `grep_search` dengan keyword dari INDEX untuk lokalisasi topik **SEBELUM** `read_file`, kecuali path sudah eksplisit dari INDEX.
4. **MUST** baca file `docs/` dengan line range terbatas jika file > 200 baris. Jangan read full file untuk mencari satu section.
5. **MUST NOT** memodifikasi file `docs/` tanpa permintaan eksplisit user.

## Struktur Folder

```
docs/
├── INDEX.md              ← entry point WAJIB
├── architecture/         ← stack, struktur, auth, RBAC, state, API, ADR, env, git, setup, testing, perf
├── ui-ux/                ← design system, tokens, komponen, form convention
├── payroll-rules/        ← business logic payroll (state machine + formula menyusul)
├── sop/                  ← playbook step-by-step
├── prd/                  ← product requirements (empty, akan diisi)
└── api/                  ← API spec detail (empty, sementara lihat architecture/api-layer.md)
```

## Workflow Standar

```
User bertanya tentang topik X
   ↓
1. read_file: docs/INDEX.md (sekali per sesi cukup)
   ↓
2. Cari topik X di tabel INDEX → dapat path + keywords
   ↓
3. Jika lokasi pasti → read_file langsung (pakai line range jika file besar)
   Jika ragu → grep_search keyword di docs/<kategori>/ → baru read_file
   ↓
4. Jawab user berdasarkan section yang relevan
```

## Anti-Pattern (JANGAN)

- ❌ `read_file` semua file di `docs/architecture/` "untuk memastikan tidak miss"
- ❌ `grep_search` tanpa `includePattern: docs/**` (cari di seluruh workspace padahal cuma butuh dokumen)
- ❌ Skip `INDEX.md` karena merasa sudah tahu strukturnya
- ❌ Edit `docs/` saat user minta perubahan kode (dokumen ≠ kode produksi)
<!-- END:docs-access-rules -->
