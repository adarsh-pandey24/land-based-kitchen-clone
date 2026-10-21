"use server";

import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { tags } from "@/lib/content";
import { testimonialSchema } from "@/lib/validation";
import { bool, dbError, invalid, str, type FormState } from "@/lib/admin-crud";

export async function saveTestimonial(id: string | null, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireUser();
  const parsed = testimonialSchema.safeParse({
    clientName: str(formData, "clientName"),
    content: str(formData, "content"),
    roleOrCompany: str(formData, "roleOrCompany"),
    published: bool(formData, "published"),
    sortOrder: str(formData, "sortOrder") || 0,
  });
  if (!parsed.success) return invalid(parsed.error);
  try {
    if (id) await db.testimonial.update({ where: { id }, data: parsed.data });
    else await db.testimonial.create({ data: parsed.data });
  } catch (error) {
    return dbError(error);
  }
  updateTag(tags.testimonials);
  redirect("/admin/testimonials?saved=1");
}
