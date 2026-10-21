import type { Metadata } from "next";
import { img, mapUrl, site, tel } from "@/lib/site";
import { EnquirySection, PageHero, Rule } from "@/components/Sections";
import Icon, { type IconName } from "@/components/Icon";

export const metadata: Metadata = {
  title: { absolute: "Contact · Coast & Cardamom Catering Gold Coast" },
  description: "Tell us your date, guest count and dietary needs. Chef Joseph replies personally.",
};

export default function ContactPage() {
  const reach: { icon: IconName; label: string; href?: string; external?: boolean }[] = [
    { icon: "phone", label: site.phone, href: tel },
    { icon: "mail", label: site.email, href: `mailto:${site.email}` },
    { icon: "whatsapp", label: "Message Joseph", href: `https://wa.me/${site.whatsapp}`, external: true },
    { icon: "instagram", label: "Instagram", href: site.socials.instagram, external: true },
    ...(site.socials.facebook ? [{ icon: "facebook" as const, label: "Facebook", href: site.socials.facebook, external: true }] : []),
    { icon: "pin", label: site.serviceArea },
    { icon: "pin", label: "View the Gold Coast on Google Maps", href: mapUrl, external: true },
  ];

  return (
    <>
      <PageHero
        eyebrow="Plan your event"
        title="Tell us what you're planning."
        line="Two minutes to fill in. Joseph replies personally with a menu idea and a quote."
        image={img("cc-contact-hero", 2400)}
      />

      <section className="mx-auto max-w-3xl px-5 py-20 md:py-24">
        <div>
          <h2 className="heading">Contact details</h2>
          <Rule />
          {site.hours && <p className="mt-6 text-muted">Hours for enquiries: {site.hours}</p>}
          <ul className="mt-8 space-y-4">
            {reach.map((r) => (
              <li key={r.label} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-shell text-surf">
                  <Icon name={r.icon} className="h-4 w-4" />
                </span>
                {r.href ? (
                  <a
                    href={r.href}
                    className="break-words pt-1.5 font-medium hover:text-curry"
                    {...(r.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  >
                    {r.label}
                  </a>
                ) : (
                  <span className="pt-1.5">{r.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <EnquirySection eyebrow="Enquiry form" title="Your event, in two minutes." />
    </>
  );
}
