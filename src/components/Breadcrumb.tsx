import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[color:var(--text-muted)]">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
          {index > 0 && <span className="text-[color:var(--border-strong)]">/</span>}
          {item.href ? (
            <Link href={item.href} className="transition hover:text-[color:var(--brand-strong)]">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-[color:var(--text)]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
