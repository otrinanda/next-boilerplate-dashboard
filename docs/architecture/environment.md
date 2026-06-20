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

# PDF Generation
PDF_SERVICE_SECRET=your-secret-here   # server-only, tidak pakai NEXT_PUBLIC_
```

> **Aturan:** Variabel yang diakses di browser wajib prefix `NEXT_PUBLIC_`. Variabel server-only (secret, key) tidak boleh pakai prefix tersebut.
