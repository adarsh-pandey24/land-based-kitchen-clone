"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logout } from "@/app/admin/auth-actions";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/services", label: "Catering services" },
  { href: "/admin/menus", label: "Chef menus" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/chefs", label: "Chef profiles" },
];

export default function AdminNav({ email, role, siteName }: { email: string; role: "ADMIN" | "EDITOR"; siteName: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const all = role === "ADMIN" ? [...links, { href: "/admin/users", label: "Admin users" }] : links;
  const active = (href: string) => (href === "/admin" ? pathname === href : pathname.startsWith(href));

  return (
    <aside className="bg-ink text-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-64 lg:shrink-0 lg:flex-col">
      <div className="flex items-center justify-between px-5 py-4 lg:py-6">
        <Link href="/admin" className="font-serif text-lg">
          {siteName}
          <span className="block font-sans text-xs uppercase tracking-[0.3em] text-gold">Admin</span>
        </Link>
        <button
          onClick={() => setOpen((v) => !v)}
          className="border border-white/30 px-3 py-1.5 text-xs uppercase tracking-widest lg:hidden"
          aria-expanded={open}
        >
          Menu
        </button>
      </div>
      <nav className={`${open ? "block" : "hidden"} flex-1 px-3 pb-4 lg:block`}>
        {all.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className={`block px-3 py-2.5 text-sm transition-colors ${
              active(l.href) ? "bg-white/10 text-gold" : "text-white/80 hover:text-white"
            }`}
          >
            {l.label}
          </Link>
        ))}
        <div className="mt-6 border-t border-white/10 px-3 pt-4 text-xs text-white/60">
          <p className="truncate">{email}</p>
          <p className="mt-1 uppercase tracking-widest text-gold">{role}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/" className="underline hover:text-white" target="_blank">
              View website
            </Link>
            <form action={logout}>
              <button type="submit" className="underline hover:text-white">
                Log out
              </button>
            </form>
          </div>
        </div>
      </nav>
    </aside>
  );
}
