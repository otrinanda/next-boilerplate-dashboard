# Payroll State Machine

Keywords: payroll, state machine, lifecycle, draft, running, review, approved, locked, rollback, status, workflow

```
Draft ──► Running ──► Review ──► Approved ──► Locked
                                    │
                                    └──► Rollback (jika ada kesalahan)
```

| Status | Deskripsi | Actor |
|---|---|---|
| Draft | Period dibuat, belum diproses | Admin, HR |
| Running | Sedang dihitung oleh sistem | System |
| Review | Menunggu pengecekan & adjustment | Admin, HR, Finance |
| Approved | Disetujui, siap untuk output | Admin, Finance |
| Locked | Final, tidak bisa diubah | System (otomatis setelah approved) |

> Setelah Locked, perubahan hanya bisa dilakukan melalui proses rollback. Mekanisme rollback perlu dikonfirmasi ke BE (lihat [../architecture/pending-be.md](../architecture/pending-be.md) section *Business Logic*).
