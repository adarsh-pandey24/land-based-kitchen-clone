import Link from "next/link";
import type { ReactNode } from "react";

export function Loading() {
  return (
    <div className="flex items-center gap-3 p-8 text-sm text-muted" role="status">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-gold border-t-transparent" />
      Loading…
    </div>
  );
}

export function PageHeader({
  title,
  description,
  action,
  back,
}: {
  title: string;
  description?: string;
  action?: { label: string; href: string };
  back?: { label: string; href: string };
}) {
  return (
    <header className="flex flex-col gap-4 border-b border-line bg-white px-5 py-6 sm:flex-row sm:items-end sm:justify-between md:px-8">
      <div>
        {back && (
          <Link href={back.href} className="text-xs uppercase tracking-[0.2em] text-muted hover:text-gold">
            ← {back.label}
          </Link>
        )}
        <h1 className="mt-1 font-serif text-3xl">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      </div>
      {action && (
        <Link href={action.href} className="btn self-start sm:self-auto">
          {action.label}
        </Link>
      )}
    </header>
  );
}

export function Panel({ children }: { children: ReactNode }) {
  return <div className="p-5 md:p-8">{children}</div>;
}

export function FormCard({ children }: { children: ReactNode }) {
  return <div className="max-w-3xl border border-line bg-white p-5 md:p-8">{children}</div>;
}
