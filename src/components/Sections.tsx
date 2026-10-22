/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { ReactNode } from "react";
import { logo, site, tel } from "@/lib/site";
import { getMenus, getServices, type PublicImage, type PublicMenu } from "@/lib/content";
import { getGoogleReviews } from "@/lib/google-reviews";
import { benefits, groups, reasons, steps } from "@/content/services";
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

export function ChaknaBand() {
  return (
    <section className="bg-navy text-sea">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-24">
        <div>
          <p className="eyebrow !text-gold">Our signature</p>
          <h2 className="heading mt-3">
            You bring the bottle. We bring the <em className="text-gold">chakna</em>.
          </h2>
          <Rule />
          <p className="mt-6 text-sea/80">
            In India, nobody drinks without chakna: the spiced, crunchy, salty small plates that keep everyone at the
            table. We make ten of them, fresh, and bring the tonic. You pour whatever you like.
          </p>
          <ul className="mt-6 space-y-2 text-sea/90">
            {["Ten small plates, made fresh", "Chilled tonic water included", "BYO drinks, always"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-gold" />
                {t}
              </li>
            ))}
          </ul>
          <Link href="/chakna-and-tonic" className="btn-gold btn-arrow mt-8">
            See Chakna &amp; Tonic
          </Link>
        </div>
        <ChaknaPlates />
      </div>
    </section>
  );
}

// The ten-plate motif from the brand guidelines (page 13). Sample dishes are
// suggestions for Joseph to confirm; the rest show as numbered plates.
const chaknaDishes = ["Masala peanuts", "Chilli paneer", "Tikka skewers", "Pani puri", "Onion pakora"];

function ChaknaPlates() {
  return (
    <div>
      <ul className="grid grid-cols-3 gap-3 sm:grid-cols-5 md:gap-4" aria-label="Sample chakna plates">
        {Array.from({ length: 10 }, (_, i) => (
          <li
            key={i}
            className={`flex aspect-square items-center justify-center rounded-full border-2 border-gold p-2 text-center text-xs leading-tight md:text-sm ${
              chaknaDishes[i] ? "text-sea" : "text-sea/50"
            }`}
          >
            {chaknaDishes[i] ?? `Plate ${i + 1}`}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-center text-sm italic text-sea/60">Ten small plates. Final dishes set with Joseph.</p>
    </div>
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
            {(s.guests || s.format || s.goodFor || s.priceLabel) && (
              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                {s.guests && <Fact label="Guests" value={s.guests} />}
                {s.format && <Fact label="Format" value={s.format} />}
                {s.priceLabel && <Fact label="Price" value={s.priceLabel} />}
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
  cta = { label: "View full gallery", href: "/gallery" },
}: {
  eyebrow?: string;
  title: string;
  items: PublicImage[];
  cta?: { label: string; href: string } | null;
}) {
  if (items.length === 0) return null;
  return (
    <section className="bg-navy py-20 md:py-24">
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
        {cta && (
          <div className="mt-8 text-center">
            <Link href={cta.href} className="btn-gold btn-arrow">
              {cta.label}
            </Link>
          </div>
        )}
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
        <SectionIntro eyebrow="Why Coast & Cardamom" title="Why book Coast & Cardamom." center dark />
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

// Google reviews carousel (live from Joseph's Google Business Profile).
// Hidden until the Places API key and Place ID are configured and Google
// returns at least one 4 or 5 star review.
export async function GoogleReviewsCarousel() {
  const data = await getGoogleReviews();
  if (!data || data.reviews.length === 0) {
    // Development only: show where the widget sits until Google is connected.
    // Never shown on the live site, and never with made-up reviews.
    return process.env.NODE_ENV === "development" ? <GoogleReviewsPreview connected={!!data} /> : null;
  }
  return (
    <section id="reviews" className="scroll-mt-24 bg-shell py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionIntro eyebrow="Reviews" title="What hosts say after the party." center />
        <div className="mt-12">
          <Carousel label="Google reviews" slideClass="w-[85%] sm:w-[46%] lg:w-[31%]">
            {data.reviews.map((r, i) => (
              <figure key={`${r.author}-${i}`} className="flex h-full flex-col rounded-sm bg-sea p-7">
                <figcaption className="flex items-center gap-3">
                  {r.photo ? (
                    <img src={r.photo} alt="" width={44} height={44} referrerPolicy="no-referrer" className="h-11 w-11 rounded-full" />
                  ) : (
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy font-serif text-lg text-sea">
                      {r.author.charAt(0)}
                    </span>
                  )}
                  <span>
                    {r.authorUrl ? (
                      <a href={r.authorUrl} target="_blank" rel="noreferrer" className="block font-semibold hover:underline">
                        {r.author}
                      </a>
                    ) : (
                      <span className="block font-semibold">{r.author}</span>
                    )}
                    {r.when && <span className="block text-sm text-muted">{r.when}</span>}
                  </span>
                </figcaption>
                <div className="mt-4 text-[#f6bb06]" aria-label={`${r.rating} out of 5 stars`}>
                  {"★".repeat(r.rating)}
                  <span className="text-line">{"★".repeat(5 - r.rating)}</span>
                </div>
                <blockquote className="mt-3 line-clamp-6 text-[15px] leading-relaxed">{r.text}</blockquote>
                <p className="mt-auto pt-5 text-xs text-muted">Posted on Google</p>
              </figure>
            ))}
          </Carousel>
        </div>
        <p className="mt-8 text-center text-sm text-muted">
          {data.rating !== null && (
            <>
              <span className="font-semibold text-navy">{data.rating.toFixed(1)} stars</span> from{" "}
              {data.mapsUrl ? (
                <a href={data.mapsUrl} target="_blank" rel="noreferrer" className="underline">
                  {data.total} Google reviews
                </a>
              ) : (
                `${data.total} Google reviews`
              )}
              {" · "}
            </>
          )}
          <a href={data.writeReviewUrl} target="_blank" rel="noreferrer" className="font-medium text-surf underline">
            Leave a review
          </a>
        </p>
      </div>
    </section>
  );
}

function GoogleReviewsPreview({ connected }: { connected: boolean }) {
  return (
    <section id="reviews" className="scroll-mt-24 bg-shell py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionIntro eyebrow="Reviews" title="What hosts say after the party." center />
        <p className="mx-auto mt-8 max-w-2xl rounded-sm border border-dashed border-gold-dark bg-sea px-4 py-3 text-center text-sm text-muted">
          <strong className="text-navy">Development preview.</strong>{" "}
          {connected
            ? "Google is connected but returned no 4 or 5 star reviews yet."
            : "Add GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID to .env to load Joseph's Google reviews here."}{" "}
          This section stays hidden on the live site until real reviews load.
        </p>
        <div className="mt-10">
          <Carousel label="Google reviews (preview)" slideClass="w-[85%] sm:w-[46%] lg:w-[31%]">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} aria-hidden className="flex h-full flex-col rounded-sm bg-sea p-7">
                <div className="flex items-center gap-3">
                  <span className="h-11 w-11 rounded-full bg-line" />
                  <span className="space-y-2">
                    <span className="block h-3 w-28 rounded bg-line" />
                    <span className="block h-2.5 w-16 rounded bg-line" />
                  </span>
                </div>
                <div className="mt-4 text-line">★★★★★</div>
                <div className="mt-3 space-y-2">
                  <span className="block h-2.5 w-full rounded bg-line" />
                  <span className="block h-2.5 w-11/12 rounded bg-line" />
                  <span className="block h-2.5 w-4/5 rounded bg-line" />
                </div>
                <p className="mt-auto pt-5 text-xs text-muted">Google review</p>
              </div>
            ))}
          </Carousel>
        </div>
        <p className="mt-8 text-center text-sm text-muted">
          <span className="font-semibold text-navy">[rating] stars</span> from [count] Google reviews ·{" "}
          <span className="font-medium text-surf underline">Leave a review</span>
        </p>
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
// Every page ends with the Google reviews carousel, then the enquiry form. "service"
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
    <GoogleReviewsCarousel />
    <section id="enquire" className="scroll-mt-24 py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-5">
        <SectionIntro eyebrow={eyebrow} title={title} center>
          <p>Tell us about your event. Joseph replies personally with a menu idea and a quote.</p>
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
