import Link from "next/link"

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumbs?: { label: string; href?: string }[]
  actions?: React.ReactNode
}

// Blok judul di dalam konten halaman. Breadcrumb top-bar dihandle terpisah oleh
// AppHeader (lihat components/common/layout/app-header.tsx); prop `breadcrumbs` di sini
// opsional untuk kasus halaman yang butuh breadcrumb inline.
export function PageHeader({ title, description, breadcrumbs, actions }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-1 flex items-center gap-1 text-text-muted text-xs">
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.label} className="flex items-center gap-1">
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-text-secondary">
                    {crumb.label}
                  </Link>
                ) : (
                  <span>{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 && <span>/</span>}
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-text-primary text-lg font-semibold leading-none">{title}</h1>
        {description && <p className="text-text-secondary text-sm mt-2">{description}</p>}
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  )
}
