import Link from "next/link";
import { site, tel } from "@/lib/site";

const quickLinks = [
  ["Home", "/"],
  ["About Us", "/about-us"],
  ["Gallery", "/gallery"],
  ["Find Out More", "/find-out-more"],
  ["Blog", "/blog"],
  ["Contact", "/contact-us"],
];

const serviceLinks = [
  ["Private Chef Experiences", "/private-chef"],
  ["Private Dining", "/private-dining"],
  ["Bespoke Catering", "/bespoke-catering"],
  ["FAQs", "/private-dining-faqs"],
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white/80">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="font-serif text-2xl text-white">{site.name}</p>
          <p className="mt-4 text-sm leading-relaxed">
            {site.tagline} across {site.regions}.
          </p>
        </div>

        <div>
          <h6 className="mb-5 font-serif text-lg text-gold">Contact &amp; Socials</h6>
          <ul className="space-y-3 text-sm">
            <li><a href={`mailto:${site.email}`} className="hover:text-gold">{site.email}</a></li>
            <li><a href={tel} className="hover:text-gold">{site.phone}</a></li>
            <li>{site.location}</li>
          </ul>
          <div className="mt-5 flex gap-3">
            <a href={site.socials.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 hover:border-gold hover:text-gold">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M14 8h3V4h-3c-2.8 0-4 1.8-4 4.3V10H7v4h3v10h4V14h3l1-4h-4V8.6c0-.4.2-.6.6-.6Z"/></svg>
            </a>
            <a href={site.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 hover:border-gold hover:text-gold">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h6 className="mb-5 font-serif text-lg text-gold">Quick Links</h6>
          <ul className="space-y-3 text-sm">
            {quickLinks.map(([l, h]) => (
              <li key={l}><Link href={h} className="hover:text-gold">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h6 className="mb-5 font-serif text-lg text-gold">Services</h6>
          <ul className="space-y-3 text-sm">
            {serviceLinks.map(([l, h]) => (
              <li key={l}><Link href={h} className="hover:text-gold">{l}</Link></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs md:flex-row">
          <p>&copy; {site.name}. All rights reserved.</p>
          <Link href="/privacy-policy" className="hover:text-gold">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
