import { NextResponse, type NextRequest } from "next/server"
import { canAccess, getTokenRole } from "@lib/auth/guards"

const PUBLIC_PATHS = ["/login", "/unauthorized", "/dev/status"]

// Next.js 16 me-rename Middleware jadi Proxy (fungsi & konvensi file sama, cuma nama).
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (PUBLIC_PATHS.includes(pathname)) return NextResponse.next()

  const cookieName = process.env.NEXT_PUBLIC_COOKIE_NAME ?? "access_token"
  const token = request.cookies.get(cookieName)
  if (!token) return NextResponse.redirect(new URL("/login", request.url))

  const role = getTokenRole(token.value)
  if (!canAccess(pathname, role)) {
    return NextResponse.redirect(new URL("/unauthorized", request.url))
  }

  return NextResponse.next()
}

// Route group seperti (dashboard)/(auth) tidak pernah muncul di URL asli, jadi matcher
// berbasis exclusion (bukan mendaftar nama group) — lihat docs/architecture/rbac.md.
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
}
