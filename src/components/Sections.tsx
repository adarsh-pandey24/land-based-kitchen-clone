/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { ReactNode } from "react";
import { images, menus, services, testimonials } from "@/lib/site";
import ContactForm from "./ContactForm";

export function Rule({ center = false }: { center?: boolean }) {
  return <div className={`mt-6 h-px w-20 bg-gold ${center ? "mx-auto" : ""}`} />;
}

export function PageHero({
  title,
  subtitle,
  image,
  cta = { label: "Enquire Now", href: "/contact-us" },
  full = false,
}: {
  title: string;
  subtitle?: string;
  image: string;
  cta?: { label: string; href: string } | null;
  full?: boolean;
}) {
  return (
    <section
      className={`relative flex items-center justify-center overflow-hidden ${
        full ? "min-h-screen" : "min-h-[70vh]"
      }`}
    >
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 px-5 pt-20 text-center text-white">
        <h1 className="mx-auto max-w-4xl font-serif text-4xl leading-tight md:text-6xl lg:text-7xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-6 max-w-2xl text-sm uppercase tracking-[0.3em] md:text-base">
            {subtitle}
          </p>
        )}
        {cta && (
          <Link href={cta.href} className="btn mt-10">
            {cta.label}
          </Link>
        )}
      </div>
    </section>
  );
}

export function Split({
  eyebrow,
  title,
  image,
  reverse = false,
  framed = false,
  cta,
  children,
}: {
  eyebrow?: string;
  title: string;
  image: string;
  reverse?: boolean;
  framed?: boolean;
  cta?: { label: string; href: string };
  children: ReactNode;
}) {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-2">
      <div className={reverse ? "md:order-2" : ""}>
        {eyebrow && <h3 className="eyebrow">{eyebrow}</h3>}
        <h2 className={`heading ${eyebrow ? "mt-4" : ""}`}>{title}</h2>
        <Rule />
        <div className="mt-6 space-y-4 leading-relaxed text-muted">{children}</div>
        {cta && (
          <Link href={cta.href} className="btn mt-8">
            {cta.label}
          </Link>
        )}
      </div>
      <div className={`relative ${reverse ? "md:order-1" : ""}`}>
        {framed && <div className="absolute -left-4 -top-4 h-full w-full border border-gold" />}
        <img src={image} alt="" className="relative aspect-[4/5] w-full object-cover" />
      </div>
    </section>
  );
}

export function ServiceCards({
  title = "Private Chef, Dining & Catering Services",
  exclude,
  children,
}: {
  title?: string;
  exclude?: string;
  children?: ReactNode;
}) {
  const list = services.filter((s) => s.title !== exclude);
  return (
    <section className="bg-mist py-24">
      <div className="mx-auto max-w-7xl px-5">
        <h2 className="heading text-center">{title}</h2>
        <Rule center />
        <div className={`mt-14 grid gap-8 ${list.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
          {list.map((s) => (
            <Link key={s.title} href={s.href} className="group relative block overflow-hidden">
              <img
                src={s.image}
                alt={s.title}
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                <h3 className="font-serif text-2xl md:text-3xl">{s.title}</h3>
                <p className="mt-3 max-h-0 overflow-hidden text-sm leading-relaxed opacity-0 transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100">
                  {s.text}
                </p>
                <span className="mt-4 inline-block border-b border-gold pb-1 text-xs uppercase tracking-[0.2em] text-gold">
                  Learn more
                </span>
              </div>
            </Link>
          ))}
        </div>
        {children}
      </div>
    </section>
  );
}

export function GalleryGrid({
  title,
  items,
  cta,
  dark = true,
}: {
  title?: string;
  items: string[];
  cta?: { label: string; href: string };
  dark?: boolean;
}) {
  return (
    <section className={`${dark ? "bg-ink" : "bg-white"} py-24`}>
      <div className="mx-auto max-w-7xl px-5">
        {title && (
          <>
            <h2 className={`heading text-center ${dark ? "text-white" : ""}`}>{title}</h2>
            <Rule center />
          </>
        )}
        <div className={`grid grid-cols-2 gap-3 md:grid-cols-4 ${title ? "mt-14" : ""}`}>
          {items.map((src, i) => (
            <div key={src} className="group overflow-hidden">
              <img
                src={src}
                alt={`Gallery image ${i + 1}`}
                loading="lazy"
                className="aspect-square w-full object-cover transition duration-700 group-hover:scale-110 group-hover:opacity-80"
              />
            </div>
          ))}
        </div>
        {cta && (
          <div className="mt-12 text-center">
            <Link href={cta.href} className={dark ? "btn-outline" : "btn"}>
              {cta.label}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export function Process({
  title,
  steps,
}: {
  title: string;
  steps: { title: string; text: string }[];
}) {
  return (
    <section className="bg-mist py-24">
      <div className="mx-auto max-w-7xl px-5">
        <h2 className="heading text-center">{title}</h2>
        <Rule center />
        <ol className="mt-14 grid gap-6 md:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.title} className="relative bg-white p-6 shadow-sm">
              <span className="font-serif text-5xl text-gold/40">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 font-serif text-xl">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 text-center">
          <Link href="/contact-us" className="btn">
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}

export function MenuDownloads({ title }: { title: string }) {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-5 text-center">
        <h2 className="heading">{title}</h2>
        <Rule center />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {menus.map((m) => (
            <a
              key={m.title}
              href={m.href}
              target="_blank"
              rel="noreferrer"
              className="group border border-gold px-6 py-10 transition-colors hover:bg-gold"
            >
              <svg viewBox="0 0 24 24" className="mx-auto h-10 w-10 text-gold group-hover:text-white" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M6 3h9l4 4v14H6z" />
                <path d="M14 3v5h5M9 13h7M9 17h7" />
              </svg>
              <span className="mt-4 block font-serif text-xl group-hover:text-white">{m.title}</span>
              <span className="mt-2 block text-xs uppercase tracking-[0.2em] text-muted group-hover:text-white">
                View menu
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Benefits({
  title,
  intro,
  items,
  image,
}: {
  title: string;
  intro?: string;
  items: { title?: string; text: string }[];
  image: string;
}) {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-2">
      <img src={image} alt="" className="aspect-[4/5] w-full object-cover" />
      <div>
        <h2 className="heading">{title}</h2>
        <Rule />
        {intro && <p className="mt-6 leading-relaxed text-muted">{intro}</p>}
        <ul className="mt-6 space-y-5">
          {items.map((b, i) => (
            <li key={i} className="flex gap-4">
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold text-xs text-white">
                ✓
              </span>
              <div>
                {b.title && <h4 className="font-serif text-lg">{b.title}</h4>}
                <p className="text-sm leading-relaxed text-muted">{b.text}</p>
              </div>
            </li>
          ))}
        </ul>
        <Link href="/contact-us" className="btn mt-8">
          Book Now
        </Link>
      </div>
    </section>
  );
}

export function Features({
  title,
  items,
}: {
  title: string;
  items: { title: string; text: string }[];
}) {
  return (
    <section className="bg-ink py-24 text-white">
      <div className="mx-auto max-w-7xl px-5">
        <h2 className="heading mx-auto max-w-4xl text-center">{title}</h2>
        <Rule center />
        <div className="mt-14 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((f) => (
            <div key={f.title} className="bg-ink p-8">
              <h3 className="font-serif text-xl text-gold">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{f.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/contact-us" className="btn">
            Get In Touch
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="bg-mist py-24">
      <div className="mx-auto max-w-7xl px-5">
        <h2 className="heading text-center capitalize">Our clients love us</h2>
        <Rule center />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold font-serif text-lg text-white">
                  {t.name.charAt(0)}
                </div>
                <figcaption className="font-medium">{t.name}</figcaption>
              </div>
              <div className="mt-4 text-[#f6bb06]" aria-label="5 stars">
                ★★★★★
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed text-muted">{t.text}</blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faqs({ title, items }: { title: string; items: { q: string; a: string }[] }) {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-5">
        <h2 className="heading text-center">{title}</h2>
        <Rule center />
        <div className="mt-12 divide-y divide-line border-y border-line">
          {items.map((f, i) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-lg">
                <span>
                  <span className="mr-3 text-gold">Q.{i + 1}</span>
                  {f.q}
                </span>
                <span className="text-2xl text-gold transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactCta({
  title = "Contact us today and book your next unforgettable meal",
}: {
  title?: string;
}) {
  return (
    <section id="enquire" className="relative scroll-mt-20 overflow-hidden py-28">
      <img src={images.contact} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center text-white">
        <h2 className="heading">{title}</h2>
        <p className="mt-6 leading-relaxed text-white/80">
          Tell us about your event and we will send a tailored menu and quote.
        </p>
        <ContactForm dark />
      </div>
    </section>
  );
}
