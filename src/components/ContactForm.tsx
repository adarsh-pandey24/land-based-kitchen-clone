"use client";

import { useState, type FormEvent } from "react";
import { services } from "@/lib/site";

export default function ContactForm({ dark = false }: { dark?: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))),
    }).catch(() => null);
    setStatus(res?.ok ? "sent" : "error");
    if (res?.ok) e.currentTarget.reset();
  }

  const field = dark
    ? "border border-white/40 bg-white/10 px-4 py-3 text-white placeholder:text-white/60 focus:border-gold focus:outline-none"
    : "border border-line bg-white px-4 py-3 placeholder:text-muted focus:border-gold focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="mt-10 grid gap-4 text-left sm:grid-cols-2">
      <input name="name" required placeholder="Name" className={field} />
      <input name="email" required type="email" placeholder="Email" className={field} />
      <input name="phone" placeholder="Phone" className={field} />
      <select name="service" defaultValue="" className={field}>
        <option value="" disabled className="text-ink">
          Service
        </option>
        {services.map((s) => (
          <option key={s.title} className="text-ink">
            {s.title}
          </option>
        ))}
      </select>
      <input name="date" type="date" className={field} />
      <input name="guests" type="number" min={1} placeholder="Number of guests" className={field} />
      <textarea name="message" rows={4} placeholder="Tell us about your event" className={`${field} sm:col-span-2`} />
      <div className="text-center sm:col-span-2">
        <button type="submit" disabled={status === "sending"} className="btn disabled:opacity-60">
          {status === "sending" ? "Sending…" : "Send Enquiry"}
        </button>
        {status === "sent" && <p className="mt-4 text-sm text-gold">Thanks, we will be in touch soon.</p>}
        {status === "error" && <p className="mt-4 text-sm text-red-400">Something went wrong. Please call us instead.</p>}
      </div>
    </form>
  );
}
