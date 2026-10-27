"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { enquiryOptions, site, tel } from "@/lib/site";

const NOT_SURE = "Not sure, help me choose";

// Enquiry form from the website copy document. Buttons with data-service
// (e.g. "Book a barbecue") pre-select the service before scrolling here.
export default function ContactForm({ services, defaultService }: { services: string[]; defaultService?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error" | "invalid">("idle");
  const [firstName, setFirstName] = useState("");
  const serviceRef = useRef<HTMLSelectElement>(null);
  const [errorText, setErrorText] = useState("");
  // Earliest event date is today, in the visitor's own time zone. Set on the
  // input after mount so a prerendered page never carries a stale date.
  const dateRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const d = new Date();
    if (dateRef.current) {
      dateRef.current.min = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    }
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLElement>("[data-service]");
      if (link && serviceRef.current) serviceRef.current.value = link.dataset.service ?? "";
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setErrorText("");
    if (!form.checkValidity()) {
      form.reportValidity();
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    const data = new FormData(form);
    const body = Object.fromEntries(data);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).catch(() => null);
    if (res?.ok) {
      setFirstName(String(data.get("firstName") ?? "").trim());
      setStatus("sent");
      form.reset();
    } else {
      if (res?.status === 400) setErrorText((await res.json().catch(() => null))?.error ?? "");
      setStatus(res?.status === 400 ? "invalid" : "error");
    }
  }

  const field =
    "w-full rounded-sm border border-line bg-sea px-4 py-3 text-navy placeholder:text-muted focus:border-surf focus:outline-none focus:ring-1 focus:ring-surf";
  const label = "block text-sm font-medium";
  const help = "mt-1 block text-xs text-muted";

  if (status === "sent") {
    return (
      <div role="status" className="mt-10 rounded-sm bg-sea p-8 text-center">
        <p className="font-serif text-2xl">Got it, thanks{firstName ? ` ${firstName}` : ""}.</p>
        <p className="mt-3 text-muted">
          Joseph will be in touch {site.replyTime}. Need something sooner? Call{" "}
          <a href={tel} className="text-surf underline">
            {site.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative mt-8 grid gap-5 sm:grid-cols-2">
      <label className={label}>
        First name *
        <input name="firstName" required autoComplete="given-name" className={`mt-1 ${field}`} />
      </label>
      <label className={label}>
        Last name *
        <input name="lastName" required autoComplete="family-name" className={`mt-1 ${field}`} />
      </label>
      <label className={label}>
        Email *
        <input name="email" type="email" required autoComplete="email" className={`mt-1 ${field}`} />
      </label>
      <label className={label}>
        Phone *
        <input name="phone" type="tel" required autoComplete="tel" className={`mt-1 ${field}`} />
        <span className={help}>For quick questions about your menu.</span>
      </label>
      <label className={label}>
        Event date *
        <input ref={dateRef} name="date" type="date" required className={`mt-1 ${field}`} />
        <span className={help}>Not sure yet? Pick your best guess.</span>
      </label>
      <label className={label}>
        Event type *
        <select name="eventType" required defaultValue="" className={`mt-1 ${field}`}>
          <option value="" disabled>
            Choose one
          </option>
          {enquiryOptions.eventTypes.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
      <label className={label}>
        Service you&apos;re interested in *
        <select
          ref={serviceRef}
          name="service"
          required
          defaultValue={defaultService && services.includes(defaultService) ? defaultService : ""}
          className={`mt-1 ${field}`}
        >
          <option value="" disabled>
            Choose one
          </option>
          {services.map((s) => (
            <option key={s}>{s}</option>
          ))}
          <option>{NOT_SURE}</option>
        </select>
      </label>
      <label className={label}>
        Number of guests *
        <select name="guests" required defaultValue="" className={`mt-1 ${field}`}>
          <option value="" disabled>
            Choose one
          </option>
          {enquiryOptions.guests.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>

      <fieldset className="sm:col-span-2">
        <legend className={label}>Drop-off or chef on-site?</legend>
        <div className="mt-2 flex flex-wrap gap-5">
          {enquiryOptions.format.map((o) => (
            <label key={o} className="flex items-center gap-2 text-[15px]">
              <input type="radio" name="format" value={o} className="h-4 w-4 accent-[#2f6b34]" />
              {o}
            </label>
          ))}
        </div>
      </fieldset>

      <label className={`${label} sm:col-span-2`}>
        Dietary requirements
        <textarea
          name="dietary"
          rows={2}
          placeholder="Allergies, halal, Jain, vegetarian (no eggs), gluten-free… anything we should plan for."
          className={`mt-1 ${field}`}
        />
      </label>
      <label className={`${label} sm:col-span-2`}>
        Event details
        <textarea
          name="message"
          rows={4}
          placeholder="Venue, theme, timings, the guest who hates coriander."
          className={`mt-1 ${field}`}
        />
      </label>

      {/* Spam trap: hidden from people and screen readers; bots tend to fill it in. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="text-center sm:col-span-2">
        {status === "invalid" && (
          <p role="alert" className="mb-4 text-sm text-red-700">
            {errorText || "Something's missing. Check the highlighted fields and try again."}
          </p>
        )}
        {status === "error" && (
          <p role="alert" className="mb-4 text-sm text-red-700">
            Your enquiry didn&apos;t send. Please try again, or call {site.phone}.
          </p>
        )}
        <button type="submit" disabled={status === "sending"} className="btn btn-arrow disabled:opacity-60">
          {status === "sending" ? "Sending…" : "Plan my event"}
        </button>
        <p className="mt-3 text-sm text-muted">No payment needed.</p>
      </div>
    </form>
  );
}
