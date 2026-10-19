import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { PageHero, Rule } from "@/components/Sections";
import { img, site, tel } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

const details = [
  { label: "Phone", value: site.phone, href: tel },
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Location", value: site.location },
  { label: "Service Areas", value: site.regions },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Let's plan something delicious"
        image={img("contact-hero", 2000, 1300)}
        cta={null}
      />
      <section className="mx-auto grid max-w-7xl gap-16 px-5 py-24 md:grid-cols-[2fr_3fr]">
        <div>
          <h2 className="heading">Get in Touch</h2>
          <Rule />
          <p className="mt-6 leading-relaxed text-muted">
            Tell us a little about your event and we will reply within one business day with ideas,
            availability and a quote.
          </p>
          <dl className="mt-10 space-y-6">
            {details.map((d) => (
              <div key={d.label}>
                <dt className="eyebrow !text-xs">{d.label}</dt>
                <dd className="mt-1 font-serif text-xl">
                  {d.href ? (
                    <a href={d.href} className="hover:text-gold">{d.value}</a>
                  ) : (
                    d.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="bg-mist p-8 md:p-12">
          <h3 className="font-serif text-2xl">Send an Enquiry</h3>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
