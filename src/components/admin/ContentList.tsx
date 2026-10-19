"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useRef, useState, useTransition } from "react";
import { deleteItem, moveItem, togglePublished, type ModuleKey } from "@/app/admin/(dashboard)/list-actions";

export type ListRow = {
  id: string;
  title: string;
  subtitle?: string | null;
  image?: string | null;
  published: boolean;
};

export default function ContentList({
  module,
  rows,
  singular,
  basePath,
}: {
  module: ModuleKey;
  rows: ListRow[];
  singular: string;
  basePath: string;
}) {
  const saved = useSearchParams().get("saved");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | "published" | "draft">("all");
  const [notice, setNotice] = useState<{ ok: boolean; message: string } | null>(
    saved ? { ok: true, message: `${singular} saved.` } : null,
  );
  const [pending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState<ListRow | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter(
      (r) =>
        (status === "all" || (status === "published") === r.published) &&
        (!q || `${r.title} ${r.subtitle ?? ""}`.toLowerCase().includes(q)),
    );
  }, [rows, query, status]);

  const run = (fn: () => Promise<{ ok: boolean; message: string }>) =>
    startTransition(async () => setNotice(await fn()));

  const askDelete = (row: ListRow) => {
    setConfirming(row);
    dialog.current?.showModal();
  };

  const canReorder = status === "all" && !query;

  return (
    <div>
      {notice && (
        <div
          role="status"
          className={`mb-4 flex items-center justify-between border px-4 py-3 text-sm ${
            notice.ok ? "border-green-200 bg-green-50 text-green-800" : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {notice.message}
          <button onClick={() => setNotice(null)} aria-label="Dismiss" className="ml-4 text-lg leading-none">
            ×
          </button>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search…"
          className="w-full border border-line bg-white px-3 py-2.5 text-sm focus:border-gold focus:outline-none sm:max-w-xs"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as typeof status)}
          className="border border-line bg-white px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
          aria-label="Filter by status"
        >
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        {pending && <span className="self-center text-sm text-muted">Working…</span>}
      </div>

      {rows.length === 0 ? (
        <div className="mt-6 border border-dashed border-line bg-white px-6 py-16 text-center">
          <p className="font-serif text-xl">No {singular.toLowerCase()} records yet</p>
          <p className="mt-2 text-sm text-muted">
            The public site shows its original placeholder content until you add one.
          </p>
          <Link href={`${basePath}/new`} className="btn mt-6">
            Add {singular.toLowerCase()}
          </Link>
        </div>
      ) : filtered.length === 0 ? (
        <p className="mt-6 border border-dashed border-line bg-white px-6 py-10 text-center text-sm text-muted">
          Nothing matches your search or filter.
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-line border border-line bg-white">
          {filtered.map((row, i) => (
            <li key={row.id} className="flex flex-col gap-3 p-4 md:flex-row md:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-4">
                {row.image !== undefined && (
                  <div className="h-14 w-14 shrink-0 overflow-hidden bg-mist">
                    {row.image && <img src={row.image} alt="" className="h-full w-full object-cover" />}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="truncate font-medium">{row.title}</p>
                  {row.subtitle && <p className="truncate text-sm text-muted">{row.subtitle}</p>}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span
                  className={`px-2 py-0.5 text-xs uppercase tracking-wider ${
                    row.published ? "bg-green-100 text-green-800" : "bg-mist text-muted"
                  }`}
                >
                  {row.published ? "Published" : "Draft"}
                </span>
                {canReorder && (
                  <>
                    <button
                      disabled={pending || i === 0}
                      onClick={() => run(() => moveItem(module, row.id, "up"))}
                      className="border border-line px-2 py-1 disabled:opacity-30"
                      aria-label={`Move ${row.title} up`}
                    >
                      ↑
                    </button>
                    <button
                      disabled={pending || i === filtered.length - 1}
                      onClick={() => run(() => moveItem(module, row.id, "down"))}
                      className="border border-line px-2 py-1 disabled:opacity-30"
                      aria-label={`Move ${row.title} down`}
                    >
                      ↓
                    </button>
                  </>
                )}
                <button
                  disabled={pending}
                  onClick={() => run(() => togglePublished(module, row.id))}
                  className="border border-line px-3 py-1 hover:border-gold"
                >
                  {row.published ? "Unpublish" : "Publish"}
                </button>
                <Link href={`${basePath}/${row.id}`} className="border border-gold px-3 py-1 text-gold-dark hover:bg-gold hover:text-white">
                  Edit
                </Link>
                <button
                  disabled={pending}
                  onClick={() => askDelete(row)}
                  className="border border-red-200 px-3 py-1 text-red-700 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {!canReorder && rows.length > 1 && (
        <p className="mt-3 text-xs text-muted">Clear search and filters to reorder.</p>
      )}

      <dialog ref={dialog} className="m-auto w-[min(92vw,420px)] p-6 backdrop:bg-black/50" onClose={() => setConfirming(null)}>
        <h2 className="font-serif text-xl">Delete {singular.toLowerCase()}?</h2>
        <p className="mt-3 text-sm text-muted">
          “{confirming?.title}” will be permanently removed from the database and the website. This cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={() => dialog.current?.close()} className="px-4 py-2 text-sm">
            Cancel
          </button>
          <button
            onClick={() => {
              const row = confirming;
              dialog.current?.close();
              if (row) run(() => deleteItem(module, row.id));
            }}
            className="bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </dialog>
    </div>
  );
}
