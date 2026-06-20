# Performance Considerations

Keywords: performance, pagination, lazy load, bundle, image, memo, optimization, sentry, monitoring

## Yang Perlu Diperhatikan

**Server-side pagination** — semua tabel menggunakan server-side pagination, bukan load semua data sekaligus. Ini sudah dihandle di `DataTable` component.

**Lazy loading per route** — Next.js App Router sudah handle ini secara otomatis per segment.

**Image optimization** — gunakan `next/image` untuk semua gambar termasuk foto karyawan.

**Bundle size** — hindari import seluruh library jika hanya butuh sebagian:

```ts
// ❌ Jangan
import _ from 'lodash'

// ✅ Import per fungsi
import debounce from 'lodash/debounce'
```

**Memo & callback** — gunakan `useMemo` dan `useCallback` hanya ketika ada masalah performa nyata, bukan preemptive optimization.

**TanStack Query** — konfigurasi `staleTime` yang tepat per data type (lihat [state-management.md](state-management.md) section *Caching Strategy*) mencegah request berlebihan.

## Monitoring (Future)

Ketika sudah production, pertimbangkan:
- **Sentry** — error tracking
- **Vercel Analytics** — web vitals (jika deploy ke Vercel)
