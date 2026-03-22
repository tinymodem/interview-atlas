import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="mb-5 flex flex-wrap items-center gap-1.5 text-sm text-nc-text-muted">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="flex items-center gap-1.5">
          {index > 0 && <span>/</span>}
          {item.href ? (
            <Link href={item.href} className="transition-colors hover:text-nc-green">
              {item.label}
            </Link>
          ) : (
            <span className="text-nc-text">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
