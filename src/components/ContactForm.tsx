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
    if (!form.checkValidity()) {
      form.reportValidity();
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    const data = new FormData(form);
    const body = { ...Object.fromEntries(data), dietary: data.getAll("dietary") };
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).catch(() => null);
    if (res?.ok) {
      setFirstName(String(data.get("name") ?? "").trim().split(/\s+/)[0]);
      setStatus("sent");
      form.reset();
    } else {
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
          Joseph will be in touch soon. Need something sooner? Call{" "}
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
        Your name *
        <input name="name" required autoComplete="name" className={`mt-1 ${field}`} />
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
        <input name="date" type="date" required className={`mt-1 ${field}`} />
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
      <label className={label}>
        Suburb or venue *
        <input name="venue" required className={`mt-1 ${field}`} />
        <span className={help}>So we can confirm we service your area.</span>
      </label>

      <fieldset className="sm:col-span-2">
        <legend className={label}>Drop-off or chef on-site?</legend>
        <div className="mt-2 flex flex-wrap gap-5">
          {enquiryOptions.format.map((o) => (
            <label key={o} className="flex items-center gap-2 text-[15px]">
              <input type="radio" name="format" value={o} className="h-4 w-4 accent-[#14284b]" />
              {o}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="sm:col-span-2">
        <legend className={label}>Dietary requirements</legend>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
          {enquiryOptions.dietary.map((o) => (
            <label key={o} className="flex items-center gap-2 text-[15px]">
              <input type="checkbox" name="dietary" value={o} className="h-4 w-4 accent-[#2f6b34]" />
              {o}
            </label>
          ))}
        </div>
      </fieldset>

      <label className={label}>
        Total budget *
        <select name="budget" required defaultValue="" className={`mt-1 ${field}`}>
          <option value="" disabled>
            Choose one
          </option>
          {enquiryOptions.budget.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
      <label className={`${label} sm:col-span-2`}>
        Anything else?
        <textarea
          name="message"
          rows={4}
          placeholder="Theme, timings, the guest who hates coriander."
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
            Something&apos;s missing. Check the highlighted fields and try again.
          </p>
        )}
        {status === "error" && (
          <p role="alert" className="mb-4 text-sm text-red-700">
            Your enquiry didn&apos;t send. Please try again, or call {site.phone}.
          </p>
        )}
        <button type="submit" disabled={status === "sending"} className="btn btn-arrow disabled:opacity-60">
          {status === "sending" ? "Sending…" : "Send my enquiry"}
        </button>
        <p className="mt-3 text-sm text-muted">No payment needed.</p>
      </div>
    </form>
  );
}
