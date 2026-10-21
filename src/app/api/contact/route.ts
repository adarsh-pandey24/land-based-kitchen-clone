import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const optional = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : null));

const enquiry = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.email().max(200),
  phone: z.string().trim().min(6).max(40),
  date: z.string().trim().min(1).max(20),
  eventType: z.string().trim().min(1).max(80),
  service: z.string().trim().min(1).max(120),
  guests: z.string().trim().min(1).max(40),
  venue: z.string().trim().min(1).max(200),
  format: optional(40),
  dietary: z.array(z.string().trim().max(40)).max(20).optional().default([]),
  budget: z.string().trim().min(1).max(40),
  message: optional(5000),
  // Honeypot: hidden from people, filled in by bots.
  company: z.string().optional(),
});

// Saves enquiries from ContactForm. They appear in Admin > Enquiries.
export async function POST(request: Request) {
  const parsed = enquiry.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Please complete the required fields." }, { status: 400 });
  }
  const { company, date, ...data } = parsed.data;
  if (company) return NextResponse.json({ ok: true }); // silently drop bot submissions

  try {
    const saved = await db.enquiry.create({ data: { ...data, eventDate: date } });
    console.log("New enquiry saved", saved.id);
  } catch (error) {
    console.error("[enquiry] Could not save enquiry", error);
    return NextResponse.json({ error: "Your enquiry didn't send. Please call or email us." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
