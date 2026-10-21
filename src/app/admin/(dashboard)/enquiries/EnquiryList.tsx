"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import { inputClass } from "@/components/admin/Fields";
import { deleteEnquiry, updateEnquiry, type EnquiryResult } from "./actions";

export type EnquiryRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  eventType: string;
  service: string;
  guests: string;
  venue: string;
  format: string | null;
  dietary: string[];
  budget: string;
  message: string | null;
  status: Status;
  notes: string | null;
  received: string;
};

type Status = "NEW" | "CONTACTED" | "BOOKED" | "CLOSED";

const statuses: { value: Status; label: string; className: string }[] = [
  { value: "NEW", label: "New", className: "bg-amber-100 text-amber-900" },
  { value: "CONTACTED", label: "Contacted", className: "bg-blue-100 text-blue-900" },
  { value: "BOOKED", label: "Booked", className: "bg-green-100 text-green-800" },
  { value: "CLOSED", label: "Closed", className: "bg-mist text-muted" },
];
const statusOf = (s: Status) => statuses.find((x) => x.value === s)!;

// Australian mobile numbers stored as entered; WhatsApp needs digits with 61.
const whatsappNumber = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("0") ? `61${digits.slice(1)}` : digits;
};

export default function EnquiryList({ enquiries }: { enquiries: EnquiryRow[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Status | "ALL">("ALL");
  const [openId, setOpenId] = useState<string | null>(null);
  const [notice, setNotice] = useState<EnquiryResult | null>(null);
  const [pending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState<EnquiryRow | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = { ALL: enquiries.length };
    for (const e of enquiries) c[e.status] = (c[e.status] ?? 0) + 1;
    return c;
  }, [enquiries]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return enquiries.filter(
      (e) =>
        (filter === "ALL" || e.status === filter) &&
        (!q || [e.name, e.email, e.phone, e.service, e.venue, e.eventType].join(" ").toLowerCase().includes(q)),
    );
  }, [enquiries, query, filter]);

  const run = (fn: () => Promise<EnquiryResult>) => startTransition(async () => setNotice(await fn()));

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

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, email, phone, service, venue…"
          className={`${inputClass} lg:max-w-sm`}
        />
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by status">
          {[{ value: "ALL" as const, label: "All" }, ...statuses].map((s) => (
            <button
              key={s.value}
              role="tab"
              aria-selected={filter === s.value}
              onClick={() => setFilter(s.value)}
              className={`rounded-full border px-3 py-1.5 text-sm ${
                filter === s.value ? "border-navy bg-navy text-sea" : "border-line bg-white hover:border-navy"
              }`}
            >
              {s.label} ({counts[s.value] ?? 0})
            </button>
          ))}
        </div>
        {pending && <span className="text-sm text-muted">Saving…</span>}
      </div>

      {enquiries.length === 0 ? (
        <div className="mt-6 border border-dashed border-line bg-white px-6 py-16 text-center">
          <p className="font-serif text-xl">No enquiries yet</p>
          <p className="mt-2 text-sm text-muted">New submissions from the website form will appear here.</p>
        </div>
      ) : shown.length === 0 ? (
        <p className="mt-6 border border-dashed border-line bg-white px-6 py-10 text-center text-sm text-muted">
          Nothing matches your search or filter.
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-line border border-line bg-white">
          {shown.map((e) => {
            const open = openId === e.id;
            const st = statusOf(e.status);
            return (
              <li key={e.id}>
                <button
                  onClick={() => setOpenId(open ? null : e.id)}
                  aria-expanded={open}
                  className="flex w-full flex-col gap-2 p-4 text-left hover:bg-mist/40 md:flex-row md:items-center"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">
                      {e.name} <span className="font-normal text-muted">· {e.service}</span>
                    </span>
                    <span className="block truncate text-sm text-muted">
                      {e.eventDate} · {e.guests} guests · {e.venue}
                    </span>
                  </span>
                  <span className="flex items-center gap-3 text-sm">
                    <span className={`px-2 py-0.5 text-xs font-semibold uppercase tracking-wider ${st.className}`}>{st.label}</span>
                    <span className="text-muted">{e.received}</span>
                  </span>
                </button>
                {open && <EnquiryDetail enquiry={e} pending={pending} run={run} onDelete={() => { setConfirming(e); dialog.current?.showModal(); }} />}
              </li>
            );
          })}
        </ul>
      )}

      <dialog ref={dialog} className="m-auto w-[min(92vw,420px)] p-6 backdrop:bg-black/50" onClose={() => setConfirming(null)}>
        <h2 className="font-serif text-xl">Delete enquiry?</h2>
        <p className="mt-3 text-sm text-muted">
          The enquiry from “{confirming?.name}” will be permanently removed. This cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={() => dialog.current?.close()} className="px-4 py-2 text-sm">
            Cancel
          </button>
          <button
            onClick={() => {
              const target = confirming;
              dialog.current?.close();
              if (target) {
                setOpenId(null);
                run(() => deleteEnquiry(target.id));
              }
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

function EnquiryDetail({
  enquiry: e,
  pending,
  run,
  onDelete,
}: {
  enquiry: EnquiryRow;
  pending: boolean;
  run: (fn: () => Promise<EnquiryResult>) => void;
  onDelete: () => void;
}) {
  const [status, setStatus] = useState<Status>(e.status);
  const [notes, setNotes] = useState(e.notes ?? "");
  const dirty = status !== e.status || notes !== (e.notes ?? "");
  const facts: [string, string][] = [
    ["Event date", e.eventDate],
    ["Event type", e.eventType],
    ["Service", e.service],
    ["Guests", e.guests],
    ["Suburb or venue", e.venue],
    ["Drop-off or on-site", e.format ?? "Not given"],
    ["Dietary", e.dietary.length ? e.dietary.join(", ") : "None given"],
    ["Budget", e.budget],
  ];

  return (
    <div className="border-t border-line bg-mist/30 p-4 md:p-6">
      <div className="flex flex-wrap gap-2 text-sm">
        <a href={`mailto:${e.email}`} className="border border-line bg-white px-3 py-1.5 hover:border-navy">
          Email {e.email}
        </a>
        <a href={`tel:${e.phone.replace(/\s/g, "")}`} className="border border-line bg-white px-3 py-1.5 hover:border-navy">
          Call {e.phone}
        </a>
        <a
          href={`https://wa.me/${whatsappNumber(e.phone)}`}
          target="_blank"
          rel="noreferrer"
          className="border border-line bg-white px-3 py-1.5 hover:border-navy"
        >
          WhatsApp
        </a>
      </div>

      <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
        {facts.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs uppercase tracking-wider text-muted">{label}</dt>
            <dd className="mt-1">{value}</dd>
          </div>
        ))}
      </dl>
      {e.message && (
        <div className="mt-5 text-sm">
          <p className="text-xs uppercase tracking-wider text-muted">Message</p>
          <p className="mt-1 whitespace-pre-line">{e.message}</p>
        </div>
      )}

      <div className="mt-6 grid gap-4 border-t border-line pt-5 md:grid-cols-[200px_1fr]">
        <label className="block text-sm">
          <span className="font-medium">Status</span>
          <select value={status} onChange={(ev) => setStatus(ev.target.value as Status)} className={`mt-1 ${inputClass}`}>
            {statuses.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="font-medium">Internal notes</span>
          <textarea
            value={notes}
            onChange={(ev) => setNotes(ev.target.value)}
            rows={3}
            placeholder="Quote sent, follow-up date, anything the team should know. Never shown to the customer."
            className={`mt-1 ${inputClass}`}
          />
        </label>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          disabled={pending || !dirty}
          onClick={() => run(() => updateEnquiry({ id: e.id, status, notes }))}
          className="btn !px-5 !py-2 disabled:opacity-50"
        >
          Save
        </button>
        <button onClick={onDelete} disabled={pending} className="border border-red-200 px-4 py-2 text-sm text-red-700 hover:bg-red-50">
          Delete enquiry
        </button>
      </div>
    </div>
  );
}
