# Authentication

Keywords: auth, authentication, jwt, cookie, httponly, login, token, tokenService, withCredentials

## Mechanism

- **JWT via HttpOnly Cookie**
- Cookie di-set oleh BE Golang, bukan frontend
- Frontend tidak bisa akses cookie secara langsung (XSS protection)

## Abstraction Layer

```ts
// lib/auth/token.ts
// Jika BE tidak support HttpOnly Cookie,
// cukup update implementasi di sini tanpa refactor codebase
export const tokenService = {
  getAccessToken: () => { /* read from memory jika perlu */ },
  clear: () => { /* clear state */ },
}
```

## Axios Config

```ts
// lib/api/client.ts
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,    // wajib untuk HttpOnly Cookie
  headers: { 'Content-Type': 'application/json' },
})
```

> Item terkait yang menunggu konfirmasi BE: lihat [pending-be.md](pending-be.md) section *Authentication*.
