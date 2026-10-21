"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site, tel, type NavItem } from "@/lib/site";
import { Wordmark } from "./Wordmark";
import Icon from "./Icon";

const isActive = (pathname: string, item: NavItem) =>
  pathname === item.href || (item.children ?? []).some((c) => c.href === pathname);

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tone = (active: boolean) => `transition-colors hover:text-gold ${active ? "text-gold" : "text-sea"}`;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 bg-navy transition-shadow ${scrolled || open ? "shadow-lg" : ""}`}
      >
        <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between gap-6 px-5">
          <Link href="/" aria-label={`${site.name} home`} onClick={() => setOpen(false)}>
            <Wordmark />
          </Link>

          <nav className="hidden items-center gap-5 xl:flex" aria-label="Main">
            {nav.map((item) =>
              item.children ? (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    aria-haspopup="true"
                    className={`flex items-center gap-1 whitespace-nowrap py-2 text-sm font-medium ${tone(isActive(pathname, item))}`}
                  >
                    {item.label}
                    <svg viewBox="0 0 12 12" className="h-3 w-3 transition-transform group-hover:rotate-180" aria-hidden>
                      <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </Link>
                  <div className="invisible absolute left-1/2 top-full w-60 -translate-x-1/2 pt-3 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <ul className="rounded-sm border border-line bg-white py-2 shadow-xl">
                      {item.children.map((c) => (
                        <li key={c.label}>
                          <Link
                            href={c.href}
                            className={`block px-5 py-2.5 text-sm hover:bg-shell ${pathname === c.href ? "font-semibold text-curry" : "text-navy"}`}
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap text-sm font-medium ${tone(isActive(pathname, item))}`}
                >
                  {item.label}
                </Link>
              ),
            )}
            <a
              href={tel}
              aria-label={`Call ${site.phone}`}
              className="flex items-center gap-2 whitespace-nowrap rounded-sm border border-sea/60 px-3 py-2 text-sm font-medium text-sea hover:border-gold hover:text-gold"
            >
              <Icon name="phone" className="h-4 w-4" />
              <span className="hidden 2xl:inline">{site.phone}</span>
            </a>
            <a
              href="#enquire"
              className="btn whitespace-nowrap !border-sea !bg-sea !px-5 !py-2 !text-navy hover:!border-curry hover:!bg-curry hover:!text-sea"
            >
              Plan your event
            </a>
          </nav>

          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 xl:hidden"
          >
            <span className={`h-0.5 w-6 bg-sea transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-6 bg-sea transition ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-6 bg-sea transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>

        {open && (
          <nav className="flex max-h-[calc(100vh-76px)] flex-col overflow-y-auto border-t border-sea/10 px-5 pb-6 xl:hidden" aria-label="Main">
            {nav.map((item) => (
              <div key={item.href} className="border-b border-sea/10">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block py-3 font-medium ${tone(pathname === item.href)}`}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="pb-3 pl-4">
                    {item.children
                      .filter((c) => c.href !== item.href)
                      .map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            onClick={() => setOpen(false)}
                            className={`block py-2 text-[15px] ${tone(pathname === c.href)}`}
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>
        )}
      </header>

      {/* Mobile sticky bar: Call · Plan your event */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-sea/10 bg-navy text-sm font-medium text-sea xl:hidden">
        <a href={tel} className="py-3.5 text-center">
          Call
        </a>
        <a href="#enquire" className="bg-curry py-3.5 text-center">
          Plan your event
        </a>
      </div>
    </>
  );
}
