import "server-only";

// Emails each new enquiry to Joseph through Resend (https://resend.com), using
// its HTTP API so no extra package is needed. Switched on by two env vars:
//   RESEND_API_KEY      API key from the Resend dashboard
//   ENQUIRY_EMAIL_TO    where enquiries go, e.g. thecoastncardamomau@gmail.com
// Optional: ENQUIRY_EMAIL_FROM, a sender on a domain verified in Resend
// (defaults to Resend's test sender, which can only mail the account owner).
// Without the settings, enquiries are still saved and shown in the admin.

type EnquiryEmail = {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  eventType: string;
  service: string;
  guests: string;
  format: string | null;
  dietary: string | null;
  message: string | null;
};

const escape = (v: string) => v.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function notifyNewEnquiry(e: EnquiryEmail) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_EMAIL_TO;
  if (!key || !to) return;

  const rows: [string, string | null][] = [
    ["Name", e.name],
    ["Email", e.email],
    ["Phone", e.phone],
    ["Event date", e.eventDate],
    ["Event type", e.eventType],
    ["Service", e.service],
    ["Guests", e.guests],
    ["Drop-off or on-site", e.format],
    ["Dietary requirements", e.dietary],
    ["Event details", e.message],
  ];
  const html = `<h2>New enquiry from ${escape(e.name)}</h2><table cellpadding="6">${rows
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escape(v!).replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table><p>Reply to this email to answer ${escape(e.name)} directly. All enquiries are also in the website admin under Enquiries.</p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.ENQUIRY_EMAIL_FROM || "The Coast & Cardamom <onboarding@resend.dev>",
        to: to.split(",").map((s) => s.trim()),
        reply_to: e.email,
        subject: `New enquiry: ${e.eventType}, ${e.eventDate} (${e.name})`,
        html,
      }),
    });
    if (!res.ok) console.error(`[notify] Resend returned ${res.status}: ${await res.text()}`);
  } catch (error) {
    console.error("[notify] Could not send enquiry email", error);
  }
}
