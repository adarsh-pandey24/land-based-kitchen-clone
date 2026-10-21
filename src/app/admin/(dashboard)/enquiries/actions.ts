"use server";

import { refresh } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";

export type EnquiryResult = { ok: boolean; message: string };

const id = z.string().min(1).max(64);
const update = z.object({
  id,
  status: z.enum(["NEW", "CONTACTED", "BOOKED", "CLOSED"]),
  notes: z
    .string()
    .trim()
    .max(5000)
    .transform((v) => (v === "" ? null : v)),
});

export async function updateEnquiry(input: { id: string; status: string; notes: string }): Promise<EnquiryResult> {
  await requireUser();
  const parsed = update.safeParse(input);
  if (!parsed.success) return { ok: false, message: "Invalid request." };
  try {
    await db.enquiry.update({
      where: { id: parsed.data.id },
      data: { status: parsed.data.status, notes: parsed.data.notes },
    });
  } catch (error) {
    console.error("[admin] updateEnquiry failed", error);
    return { ok: false, message: "Could not save. The enquiry may have been deleted." };
  }
  refresh();
  return { ok: true, message: "Enquiry updated." };
}

export async function deleteEnquiry(enquiryId: string): Promise<EnquiryResult> {
  await requireUser();
  const parsed = id.safeParse(enquiryId);
  if (!parsed.success) return { ok: false, message: "Invalid request." };
  try {
    await db.enquiry.delete({ where: { id: parsed.data } });
  } catch (error) {
    console.error("[admin] deleteEnquiry failed", error);
    return { ok: false, message: "Could not delete. It may already be gone." };
  }
  refresh();
  return { ok: true, message: "Enquiry deleted." };
}
