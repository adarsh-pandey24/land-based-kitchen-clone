import { NextResponse } from "next/server";

// Receives enquiries from ContactForm. Connect an email provider
// (e.g. Resend, SendGrid, Nodemailer) here to deliver them.
export async function POST(request: Request) {
  const data = await request.json().catch(() => null);
  if (!data?.name || !data?.email) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }
  console.log("New enquiry", data);
  return NextResponse.json({ ok: true });
}
