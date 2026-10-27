import { after, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { notifyNewEnquiry } from "@/lib/notify";

const optional = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : null));

// Earliest allowed event date: yesterday in Gold Coast time, which leaves room
// for visitors in time zones behind Queensland.
const earliestDate = () => {
  const d = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Australia/Brisbane" }).format(d);
};

const enquiry = z.object({
  firstName: z.string().trim().min(1).max(60),
  lastName: z.string().trim().min(1).max(60),
  email: z.email().max(200),
  phone: z.string().trim().min(6).max(40),
  date: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .refine((d) => d >= earliestDate(), "PAST_DATE"),
  eventType: z.string().trim().min(1).max(80),
  service: z.string().trim().min(1).max(120),
  guests: z.string().trim().min(1).max(40),
  format: optional(40),
  dietary: optional(1000),
  message: optional(5000),
  // Honeypot: hidden from people, filled in by bots.
  company: z.string().optional(),
});

// Saves enquiries from ContactForm (they appear in Admin > Enquiries) and
// emails them to Joseph when email is configured (see src/lib/notify.ts).
export async function POST(request: Request) {
  const parsed = enquiry.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    const pastDate = parsed.error.issues.some((i) => i.message === "PAST_DATE");
    return NextResponse.json(
      { error: pastDate ? "Choose an event date from today onwards." : "Please complete the required fields." },
      { status: 400 },
    );
  }
  const { company, date, firstName, lastName, dietary, ...rest } = parsed.data;
  if (company) return NextResponse.json({ ok: true }); // silently drop bot submissions

  // Venue and budget were removed from the form; their columns stay for older enquiries.
  const data = {
    ...rest,
    name: `${firstName} ${lastName}`,
    eventDate: date,
    dietary: dietary ? [dietary] : [],
    venue: "",
    budget: "",
  };
  try {
    const saved = await db.enquiry.create({ data });
    console.log("New enquiry saved", saved.id);
  } catch (error) {
    console.error("[enquiry] Could not save enquiry", error);
    return NextResponse.json({ error: "Your enquiry didn't send. Please call or email us." }, { status: 500 });
  }
  // Email after responding, so the visitor never waits on the mail service.
  after(() => notifyNewEnquiry({ ...data, dietary }));
  return NextResponse.json({ ok: true });
}
