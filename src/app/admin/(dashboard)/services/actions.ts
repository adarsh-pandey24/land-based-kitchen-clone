"use server";

import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { tags } from "@/lib/content";
import { serviceSchema } from "@/lib/validation";
import { bool, dbError, invalid, str, type FormState } from "@/lib/admin-crud";

export async function saveService(id: string | null, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireUser();
  const parsed = serviceSchema.safeParse({
    title: str(formData, "title"),
    slug: str(formData, "slug"),
    description: str(formData, "description"),
    imageUrl: str(formData, "imageUrl"),
    priceLabel: str(formData, "priceLabel"),
    published: bool(formData, "published"),
    sortOrder: str(formData, "sortOrder") || 0,
  });
  if (!parsed.success) return invalid(parsed.error);
  try {
    if (id) await db.cateringService.update({ where: { id }, data: parsed.data });
    else await db.cateringService.create({ data: parsed.data });
  } catch (error) {
    return dbError(error);
  }
  updateTag(tags.services);
  redirect("/admin/services?saved=1");
}
