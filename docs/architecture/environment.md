# Environment Variables & Configuration

Keywords: env, environment, variables, NEXT_PUBLIC, secret, config, .env

## File Structure

```
.env.local              # Development lokal (tidak di-commit)
.env.example            # Template untuk developer baru (di-commit)
.env.production         # Production (di-set di CI/CD, tidak di-commit)
```

## Variables

```bash
# .env.example

# API
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1

# App
NEXT_PUBLIC_APP_NAME=PayrollMS
NEXT_PUBLIC_APP_VERSION=1.0.0

# Cookie
NEXT_PUBLIC_COOKIE_NAME=access_token
```

> **Aturan:** Variabel yang diakses di browser wajib prefix `NEXT_PUBLIC_`. Variabel server-only (secret, key) tidak boleh pakai prefix tersebut.
>
> **Referensi pemakaian:** `NEXT_PUBLIC_COOKIE_NAME` dipakai di middleware — lihat [rbac.md](rbac.md) section *Route Protection*.
>
> **Catatan PDF Generation:** tidak ada env var server-only untuk PDF saat ini. Alur yang didokumentasikan di [pdf-generation.md](pdf-generation.md) memanggil Next.js Route Handler internal (`/api/pdf`) langsung dari browser via `fetch()` — tidak ada PDF service eksternal yang butuh shared secret, dan browser tidak punya akses ke env var server-only untuk mengirimkannya. Jika nanti ada kebutuhan memanggil rendering service eksternal, tambahkan secret di sini **dan** update `pdf-generation.md` untuk menjelaskan alur barunya.
