import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy" };

// Template only. Have your privacy policy reviewed for your business and
// jurisdiction (e.g. the Australian Privacy Principles) before going live.
const sections = [
  { h: "Information we collect", p: "Details you give us through enquiry forms, email or phone, such as your name, contact details and event information." },
  { h: "How we use it", p: "To reply to enquiries, prepare quotes, deliver our services and, with your consent, send occasional updates." },
  { h: "Sharing", p: "We do not sell your information. We share it only with suppliers needed to deliver your booking, or where the law requires." },
  { h: "Cookies and analytics", p: "This website may use cookies and analytics tools to understand how visitors use it. You can disable cookies in your browser." },
  { h: "Access and correction", p: `You can ask to see or correct the information we hold about you by emailing ${site.email}.` },
  { h: "Contact", p: `Questions about this policy can be sent to ${site.email} or ${site.phone}.` },
];

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pb-24 pt-36">
      <h1 className="heading">Privacy Policy</h1>
      <div className="mt-6 h-px w-20 bg-gold" />
      <p className="mt-8 leading-relaxed text-muted">
        This policy explains how {site.name} collects, uses and protects your personal information.
      </p>
      {sections.map((s) => (
        <div key={s.h} className="mt-10">
          <h2 className="font-serif text-2xl">{s.h}</h2>
          <p className="mt-3 leading-relaxed text-muted">{s.p}</p>
        </div>
      ))}
    </section>
  );
}
