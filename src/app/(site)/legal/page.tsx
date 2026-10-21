import type { Metadata } from "next";
import { img, site } from "@/lib/site";
import { EnquirySection, PageHero, Rule } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Privacy Policy and Terms & Conditions",
  description: `How ${site.legalName} handles your personal information, and the terms for bookings, deposits, cancellations, allergies and food safety.`,
};

// Privacy Policy and Terms & Conditions on one page (/legal#privacy, /legal#terms).
// Privacy follows the topics in the client's business details document and the
// Australian Privacy Principles. Deposit amounts, payment dates, cancellation
// fees and refund rules have not been supplied, so the terms point to the
// booking quote for those. Have both sections reviewed before launch.

const privacy = [
  {
    h: "Information we collect",
    p: [
      "When you enquire or book, we collect the details you give us: your name, email, phone number, event date, venue or suburb, guest numbers, budget, and any dietary requirements or allergies you tell us about.",
      "If you visit this website, basic technical information (such as browser type and pages visited) may be recorded by our hosting provider.",
    ],
  },
  {
    h: "How we use your information",
    p: [
      "To reply to your enquiry, prepare a menu and quote, plan and cater your event safely (including allergies), take payments, and keep records we are required to keep.",
      "We only send marketing messages if you ask us to, and you can opt out at any time.",
    ],
  },
  {
    h: "Storage and protection",
    p: [
      "Your information is stored in secure, access-controlled systems used by our business, and is kept only as long as we need it for the purposes above or as the law requires.",
    ],
  },
  {
    h: "Third-party services",
    p: [
      "We use trusted providers to run our business, such as website hosting, email and payment services. They only receive what they need to provide their service. We do not sell your personal information.",
    ],
  },
  {
    h: "Your rights",
    p: [
      "You can ask to see or correct the personal information we hold about you, or ask us to delete it where we are not required to keep it. If you have a concern about how we handled your information, contact us first. You can also contact the Office of the Australian Information Commissioner (oaic.gov.au).",
    ],
  },
];

const terms = [
  {
    h: "Bookings, deposits and payment",
    p: [
      "Every booking starts with a written quote. Your quote sets out the menu, price, deposit, final payment date, cancellation and refund terms for your event. A booking is confirmed once the deposit is paid.",
    ],
  },
  {
    h: "Changes and cancellations",
    p: [
      "Tell us about changes to guest numbers, timings or venue as early as possible. If you need to cancel, the cancellation and refund terms on your quote apply. Nothing in these terms limits your rights under the Australian Consumer Law.",
    ],
  },
  {
    h: "Allergies and dietary requirements",
    p: [
      "Tell us about every allergy and dietary requirement when you enquire. We plan menus around them and label every dish. Our kitchen handles common allergens, so we cannot guarantee any dish is completely free of trace allergens; please tell us about severe allergies so we can discuss the safest options.",
    ],
  },
  {
    h: "Food safety",
    p: [
      "We follow Queensland food safety requirements and safe food handling practices, including procedures for allergies and dietary requirements. Licence and insurance details are available on request.",
    ],
  },
];

function Block({ id, title, intro, items }: { id: string; title: string; intro: string; items: { h: string; p: string[] }[] }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="heading">{title}</h2>
      <Rule />
      <p className="mt-8 text-muted">{intro}</p>
      {items.map((s) => (
        <div key={s.h} className="mt-10">
          <h3 className="text-2xl">{s.h}</h3>
          {s.p.map((p) => (
            <p key={p.slice(0, 30)} className="mt-3 text-muted">
              {p}
            </p>
          ))}
        </div>
      ))}
    </section>
  );
}

export default function LegalPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy and Terms & Conditions"
        line="How we look after your information, and the terms for every booking."
        image={img("cc-legal-hero", 2400)}
      />
      <div className="mx-auto max-w-3xl px-5 py-20">
        <nav aria-label="On this page" className="flex flex-wrap gap-2">
          <a href="#privacy" className="rounded-full border border-line px-4 py-1.5 text-sm font-medium hover:border-navy">
            Privacy Policy
          </a>
          <a href="#terms" className="rounded-full border border-line px-4 py-1.5 text-sm font-medium hover:border-navy">
            Terms &amp; Conditions
          </a>
        </nav>

        <div className="mt-16 space-y-20">
          <Block
            id="privacy"
            title="Privacy Policy"
            intro={`This policy explains how ${site.legalName} collects, uses and protects your personal information, in line with the Privacy Act 1988 (Cth) and the Australian Privacy Principles.`}
            items={privacy}
          />
          <Block
            id="terms"
            title="Terms & Conditions"
            intro={`These terms apply to catering booked with ${site.legalName}. Your written quote forms part of them.`}
            items={terms}
          />
          <section>
            <h2 className="text-2xl">Questions</h2>
            <p className="mt-3 text-muted">
              Email{" "}
              <a href={`mailto:${site.email}`} className="text-surf underline">
                {site.email}
              </a>{" "}
              or call {site.phone}.
            </p>
          </section>
        </div>
      </div>
      <EnquirySection />
    </>
  );
}
