/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { ReactNode } from "react";
import { logo, site, tel, values } from "@/lib/site";
import { getMenus, getServices, getTestimonials, type PublicImage, type PublicMenu } from "@/lib/content";
import { benefits, groupByKey, groups, reasons, serviceIcons, steps } from "@/content/services";
import ContactForm from "./ContactForm";
import Icon from "./Icon";
import Carousel from "./Carousel";

export function Rule({ center = false }: { center?: boolean }) {
  return <div className={`mt-5 h-0.5 w-16 bg-gold ${center ? "mx-auto" : ""}`} />;
}

// Eyebrow, H2 and gold rule: the heading stack used by every section.
export function SectionIntro({
  eyebrow,
  title,
  center = false,
  dark = false,
  children,
}: {
  eyebrow?: string;
  title: string;
  center?: boolean;
  dark?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : ""}>
      {eyebrow && <p className={`eyebrow ${dark ? "!text-gold" : ""}`}>{eyebrow}</p>}
      <h2 className={`heading mt-3 ${dark ? "text-sea" : ""}`}>{title}</h2>
      <Rule center={center} />
      {children && <div className={`mt-6 space-y-4 ${dark ? "text-sea/80" : "text-muted"}`}>{children}</div>}
    </div>
  );
}

export function PageHero({
  title,
  eyebrow,
  line,
  image,
  cta = { label: "Plan your event", href: "#enquire" },
  full = false,
  badge = false,
  align = "center",
}: {
  badge?: boolean;
  align?: "center" | "left";
  title: string;
  eyebrow?: string;
  line?: string;
  image: string;
  cta?: { label: string; href: string } | null;
  full?: boolean;
}) {
  return (
    <section
      className={`relative flex items-center overflow-hidden ${full ? "min-h-[calc(92vh-76px)]" : "min-h-[340px] md:min-h-[46vh]"}`}
    >
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className={`absolute inset-0 ${align === "left" ? "bg-gradient-to-r from-navy/85 via-navy/55 to-navy/20" : "bg-navy/60"}`} />
      <div
        className={`relative z-10 mx-auto w-full max-w-7xl px-5 py-16 text-sea ${
          align === "left" ? "text-left" : "text-center"
        }`}
      >
        {/* With the badge, the logo sits large on the left and the text to its right. */}
        <div className={badge ? "flex flex-col gap-8 md:flex-row md:items-center md:gap-14" : ""}>
        {badge && (
          <img
            src={logo.disc}
            alt="The Coast & Cardamom Catering Co. badge"
            width={320}
            height={320}
            className="h-44 w-44 shrink-0 rounded-full shadow-2xl sm:h-56 sm:w-56 lg:h-80 lg:w-80"
          />
        )}
        <div className={align === "left" ? "max-w-2xl" : "mx-auto max-w-4xl"}>
          {eyebrow && <p className="eyebrow !text-gold">{eyebrow}</p>}
          <h1 className="mt-3 font-serif text-[40px] leading-[1.15] md:text-[56px] md:leading-[64px]">{title}</h1>
          <Rule center={align !== "left"} />
          {line && <p className={`mt-6 max-w-2xl text-lg text-sea/90 ${align === "left" ? "" : "mx-auto"}`}>{line}</p>}
          {cta && (
            <a
              href={cta.href}
              className="btn btn-arrow mt-9 !border-sea !bg-sea !text-navy hover:!border-curry hover:!bg-curry hover:!text-sea"
            >
              {cta.label}
            </a>
          )}
        </div>
        </div>
      </div>
    </section>
  );
}

export function Split({
  eyebrow,
  title,
  image,
  reverse = false,
  cta,
  children,
}: {
  eyebrow?: string;
  title: string;
  image: string | [string, string];
  reverse?: boolean;
  cta?: { label: string; href: string };
  children: ReactNode;
}) {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-24">
      <div className={reverse ? "md:order-2" : ""}>
        <SectionIntro eyebrow={eyebrow} title={title}>
          {children}
        </SectionIntro>
        {cta && (
          <a href={cta.href} className="btn btn-arrow mt-8">
            {cta.label}
          </a>
        )}
      </div>
      <div className={reverse ? "md:order-1" : ""}>
        {Array.isArray(image) ? (
          <div className="grid grid-cols-2 gap-4">
            <img src={image[0]} alt="" className="aspect-[4/5] w-full rounded-sm object-cover" />
            <img src={image[1]} alt="" className="mt-10 aspect-[4/5] w-full rounded-sm object-cover" />
          </div>
        ) : (
          <img src={image} alt="" className="aspect-[4/5] w-full rounded-sm object-cover" />
        )}
      </div>
    </section>
  );
}

// "What we cater": one tile per service page.
export function GroupTiles({ exclude, title, eyebrow }: { exclude?: string; title: string; eyebrow: string }) {
  const list = groups.filter((g) => g.key !== exclude);
  return (
    <section className="bg-shell py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionIntro eyebrow={eyebrow} title={title} center />
        <div className={`mt-12 grid grid-cols-2 gap-4 md:gap-6 ${list.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          {list.map((g) => (
            <Link key={g.key} href={g.href} className="group relative block overflow-hidden rounded-sm">
              <img
                src={g.image}
                alt={g.name}
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-sea md:p-6">
                <h3 className="font-serif text-xl md:text-2xl">{g.name}</h3>
                <p className="mt-2 hidden text-sm leading-relaxed text-sea/85 md:block">{g.tileLine}</p>
                <span className="mt-3 inline-block border-b border-gold pb-0.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  See {g.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Home page: every service as an icon, linking to its block on the service page.
export async function ServiceIcons({ eyebrow, title }: { eyebrow: string; title: string }) {
  const services = await getServices();
  return (
    <section className="bg-shell py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionIntro eyebrow={eyebrow} title={title} center />
        <ul className="mt-12 grid grid-cols-3 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-6 md:gap-y-10 lg:grid-cols-6">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`${groupByKey(s.group)?.href ?? "/services"}#${s.slug}`} className="group flex flex-col items-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-navy text-gold transition-transform group-hover:scale-105 md:h-20 md:w-20">
                  <Icon name={serviceIcons[s.slug] ?? "bowl"} className="h-8 w-8 md:h-10 md:w-10" />
                </span>
                <h3 className="mt-3 text-[13px] leading-snug md:text-[15px]">{s.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{label}</dt>
      <dd className="mt-1">{value}</dd>
    </div>
  );
}

// The services in one group, one block each, alternating image side.
export async function ServiceBlocks({ group }: { group: string }) {
  const services = await getServices(group);
  if (services.length === 0) return null;
  return (
    <section className="mx-auto max-w-7xl px-5 py-12">
      {services.map((s, i) => (
        <article key={s.slug} id={s.slug} className="grid scroll-mt-24 items-center gap-10 border-t border-line py-14 first:border-t-0 md:grid-cols-2">
          <img
            src={s.image}
            alt={s.title}
            className={`aspect-[4/3] w-full rounded-sm object-cover ${i % 2 ? "md:order-2" : ""}`}
          />
          <div>
            <p className="eyebrow">{s.title}</p>
            <h2 className="heading mt-3">{s.heading || s.title}</h2>
            <Rule />
            {s.cardLine && <p className="mt-6 text-lg font-medium">{s.cardLine}</p>}
            <p className={`whitespace-pre-line text-muted ${s.cardLine ? "mt-3" : "mt-6"}`}>{s.description}</p>
            {/* Prices are not shown on the website (client decision): quotes come after a conversation. */}
            {(s.guests || s.format || s.goodFor) && (
              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                {s.guests && <Fact label="Guests" value={s.guests} />}
                {s.format && <Fact label="Format" value={s.format} />}
                {s.goodFor && <Fact label="Good for" value={s.goodFor} />}
              </dl>
            )}
            {s.sampleDishes && (
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Sample dishes</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {s.sampleDishes.split(",").map((d) => (
                    <li key={d} className="rounded-full bg-shell px-3 py-1 text-sm">
                      {d.trim()}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {s.smallPrint && <p className="mt-5 text-sm italic text-muted">{s.smallPrint}</p>}
            <a href="#enquire" data-service={s.title} className="btn btn-arrow mt-7">
              {s.buttonLabel || `Enquire about ${s.title}`}
            </a>
          </div>
          {s.gallery && (
            <ul className="grid grid-cols-2 gap-4 md:col-span-2 md:grid-cols-4">
              {s.gallery.map((g) => (
                <li key={g.src}>
                  <img src={g.src} alt={g.alt} className="aspect-[4/5] w-full rounded-sm object-cover" />
                </li>
              ))}
            </ul>
          )}
        </article>
      ))}
    </section>
  );
}

export function HowItWorks() {
  return (
    <section className="bg-shell py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionIntro eyebrow="How it works" title="Four steps, no stress." center />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-sm bg-sea p-6">
              <span className="font-serif text-4xl text-surf">{i + 1}</span>
              <h3 className="mt-2 text-xl">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function MenuCard({ menu: m }: { menu: PublicMenu }) {
  return (
    <details className="group rounded-sm border border-line bg-white/60 open:md:col-span-2">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-6">
        <span>
          <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-curry">{m.category}</span>
          <span className="mt-1 block font-serif text-2xl">{m.title}</span>
        </span>
        <span className="text-2xl text-surf transition-transform group-open:rotate-45">+</span>
      </summary>
      <div className="grid gap-8 px-6 pb-8 md:grid-cols-[1fr_2fr]">
        {m.image && <img src={m.image} alt={m.title} className="aspect-[4/5] w-full rounded-sm object-cover" />}
        <div className={m.image ? "" : "md:col-span-2"}>
          <p className="whitespace-pre-line text-muted">{m.description}</p>
          {m.dishes.length > 0 && (
            <ul className="mt-4 divide-y divide-line">
              {m.dishes.map((d, i) => (
                <li key={i} className="py-3">
                  <p className="font-medium">
                    {d.name}
                    {d.dietary && (
                      <span className="ml-2 rounded-full bg-cardamom/25 px-2 py-0.5 text-xs font-semibold text-curry">{d.dietary}</span>
                    )}
                  </p>
                  {d.description && <p className="mt-1 text-sm text-muted">{d.description}</p>}
                </li>
              ))}
            </ul>
          )}
          {m.pdfUrl && (
            <a href={m.pdfUrl} target="_blank" rel="noreferrer" className="btn mt-6">
              Download the {m.title} menu (PDF)
            </a>
          )}
        </div>
      </div>
    </details>
  );
}

export async function MenuSection({ group }: { group: string }) {
  const menus = await getMenus(group);
  if (menus.length === 0) return null;
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-5">
        <SectionIntro eyebrow="Sample menus" title="See what's on the table." center />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {menus.map((m) => (
            <MenuCard key={m.title} menu={m} />
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-muted">
          Every menu is adjusted to your guests. These are starting points, not set packages.
        </p>
      </div>
    </section>
  );
}

export function GalleryStrip({
  eyebrow,
  title,
  items,
}: {
  eyebrow?: string;
  title: string;
  items: PublicImage[];
}) {
  if (items.length === 0) return null;
  return (
    <section id="gallery" className="scroll-mt-[76px] bg-navy py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionIntro eyebrow={eyebrow} title={title} center dark />
        <div className="mt-12">
          <Carousel label="Event photos" dark>
            {items.map((item, i) => (
              <figure key={`${item.src}-${i}`} className="relative overflow-hidden rounded-sm">
                <img src={item.src} alt={item.alt} loading="lazy" className="aspect-[4/5] w-full object-cover" />
                {item.caption && (
                  <figcaption className="absolute inset-x-0 bottom-0 bg-navy/75 px-4 py-2 text-sm text-sea">{item.caption}</figcaption>
                )}
              </figure>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

export function Benefits({ images: pics }: { images: [string, string] }) {
  return (
    <Split
      eyebrow="Why book a private chef"
      title="You host. Joseph does everything else."
      image={pics}
      reverse
      cta={{ label: "Plan your event", href: "#enquire" }}
    >
      <ul className="space-y-4">
        {benefits.map((b) => (
          <li key={b} className="flex gap-3">
            <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-curry text-[11px] text-sea">
              ✓
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </Split>
  );
}

export function Reasons() {
  return (
    <section className="bg-navy py-20 text-sea md:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionIntro eyebrow="Why The Coast & Cardamom" title="Why book The Coast & Cardamom." center dark />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {reasons.map((r) => (
            <div key={r.title} className="text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sea/10 text-gold">
                <Icon name={r.icon} />
              </span>
              <h3 className="mt-4 text-lg">{r.title}</h3>
              <p className="mt-2 text-[15px] text-sea/75">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Reviews carousel: testimonials published in Admin > Testimonials.
// Hidden until at least one is published.
export async function ReviewsCarousel() {
  const reviews = await getTestimonials();
  if (reviews.length === 0) return null;
  return (
    <section id="reviews" className="scroll-mt-24 bg-shell py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionIntro eyebrow="Reviews" title="Love from our tables." center />
        <div className="mt-12">
          <Carousel label="Client reviews" slideClass="w-[85%] sm:w-[46%] lg:w-[31%]">
            {reviews.map((t, i) => (
              <figure key={`${t.name}-${i}`} className="flex h-full flex-col rounded-sm bg-sea p-7">
                <div className="text-[#f6bb06]" aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
                <blockquote className="mt-3 text-[15px] leading-relaxed">“{t.text}”</blockquote>
                <figcaption className="mt-auto flex items-center gap-3 pt-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy font-serif text-lg text-sea">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block font-semibold">{t.name}</span>
                    {t.role && <span className="block text-sm text-muted">{t.role}</span>}
                  </span>
                </figcaption>
              </figure>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

// Core values as four staggered cards (home and About).
export function CoreValues() {
  return (
    <section className="bg-shell py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionIntro eyebrow="Our core values" title={site.tagline} center />
        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <li
              key={v.title}
              className={`relative rounded-sm bg-sea p-7 ${i % 2 ? "lg:mt-10" : ""}`}
            >
              <span className="absolute right-6 top-4 font-serif text-5xl text-line" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-gold">
                <Icon name={v.icon} />
              </span>
              <h3 className="mt-5 text-xl">{v.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{v.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Faqs({ title, eyebrow = "FAQs", items }: { title: string; eyebrow?: string; items: { q: string; a: string }[] }) {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-5">
        <SectionIntro eyebrow={eyebrow} title={title} center />
        <FaqList items={items} />
      </div>
    </section>
  );
}

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="mt-10 divide-y divide-line border-y border-line">
      {items.map((f, i) => (
        <details key={f.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium">
            <span>
              <span className="mr-3 font-serif text-gold-dark">Q.{i + 1}</span>
              {f.q}
            </span>
            <span className="text-2xl text-surf transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

// Enquiry block at the foot of every page; "Plan your event" buttons link here.
// Every page ends with the reviews carousel, then the enquiry form. "service"
// pre-selects the form's service (used on single-service pages).
export async function EnquirySection({
  eyebrow = "Plan your event",
  title = "Got a date in mind?",
  service,
}: {
  eyebrow?: string;
  title?: string;
  service?: string;
}) {
  const services = (await getServices()).map((s) => s.title);
  return (
    <>
    <ReviewsCarousel />
    <section id="enquire" className="scroll-mt-24 py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-5">
        <SectionIntro eyebrow={eyebrow} title={title} center>
          <p>Share a few details below, we will get back to you {site.replyTime} to start building your event together.</p>
        </SectionIntro>
        <div className="mt-12 rounded-sm bg-shell p-5 md:p-10">
          <p className="border-b border-navy bg-[#e3d9c6] py-3 text-center text-sm font-medium tracking-[0.15em]">
            Event enquiry
          </p>
          <ContactForm services={services} defaultService={service} />
        </div>
        <p className="mt-6 text-center text-sm text-muted">
          Prefer to talk? Call{" "}
          <a href={tel} className="font-medium text-surf underline">
            {site.phone}
          </a>
          .
        </p>
      </div>
    </section>
    </>
  );
}
