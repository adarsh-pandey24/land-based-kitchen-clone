/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { logo, mapUrl, site, tel } from "@/lib/site";
import { groups } from "@/content/services";
import { Wordmark } from "./Wordmark";
import Icon from "./Icon";

const quickLinks = [
  ["Home", "/"],
  ["About the Chef", "/about"],
  ["All services", "/services"],
  ["Menus", "/menus"],
  ["Gallery", "/gallery"],
  ["Reviews & FAQs", "/reviews-faqs"],
  ["Contact", "/contact"],
  ["Privacy Policy", "/legal#privacy"],
];

const social = "flex h-9 w-9 items-center justify-center rounded-full border border-sea/30 hover:border-gold hover:text-gold";

export default function Footer() {
  return (
    <footer className="bg-navy pb-14 text-sea/80 xl:pb-0">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.4fr]">
        <div>
          <img src={logo.disc} alt="The Coast & Cardamom Catering Co." width={120} height={120} className="h-24 w-24 rounded-full" />
          <div className="mt-5">
            <Wordmark />
          </div>
          <p className="mt-4 font-serif text-lg italic text-gold">{site.tagline}</p>
          <p className="mt-3 text-[15px] leading-relaxed">
            An elevated culinary experience designed around your unique taste.
          </p>
        </div>

        <div>
          <p className="eyebrow !text-gold">Quick links</p>
          <ul className="mt-5 space-y-3 text-[15px]">
            {quickLinks.map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="hover:text-gold">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow !text-gold">Services</p>
          <ul className="mt-5 space-y-3 text-[15px]">
            {groups.map((g) => (
              <li key={g.key}>
                <Link href={g.href} className="hover:text-gold">
                  {g.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow !text-gold">Contact &amp; socials</p>
          <ul className="mt-5 space-y-3 text-[15px]">
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 break-all hover:text-gold">
                <Icon name="mail" className="h-4 w-4 shrink-0 text-gold" />
                {site.email}
              </a>
            </li>
            <li>
              <a href={tel} className="flex items-center gap-3 hover:text-gold">
                <Icon name="phone" className="h-4 w-4 shrink-0 text-gold" />
                {site.phone}
              </a>
            </li>
            <li>
              <a href={mapUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-gold">
                <Icon name="pin" className="h-4 w-4 shrink-0 text-gold" />
                {site.location} · View on map
              </a>
            </li>
          </ul>
          <div className="mt-5 flex gap-3">
            <a href={site.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className={social}>
              <Icon name="instagram" className="h-4 w-4" />
            </a>
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" className={social}>
              <Icon name="whatsapp" className="h-4 w-4" />
            </a>
            {site.socials.facebook && (
              <a href={site.socials.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className={social}>
                <Icon name="facebook" className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-sea/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs md:flex-row">
          <p>
            &copy; 2026 {site.legalName}
            {site.abn && ` · ABN ${site.abn}`}
          </p>
          <div className="flex gap-5">
            <Link href="/legal#privacy" className="hover:text-gold">
              Privacy Policy
            </Link>
            <Link href="/legal#terms" className="hover:text-gold">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
