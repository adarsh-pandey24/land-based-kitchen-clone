"use server";

import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { tags } from "@/lib/content";
import { gallerySchema } from "@/lib/validation";
import { bool, dbError, invalid, str, type FormState } from "@/lib/admin-crud";

export async function saveImage(id: string | null, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireUser();
  const parsed = gallerySchema.safeParse({
    imageUrl: str(formData, "imageUrl"),
    altText: str(formData, "altText"),
    caption: str(formData, "caption"),
    category: str(formData, "category"),
    published: bool(formData, "published"),
    sortOrder: str(formData, "sortOrder") || 0,
  });
  if (!parsed.success) return invalid(parsed.error);
  try {
    if (id) await db.galleryImage.update({ where: { id }, data: parsed.data });
    else await db.galleryImage.create({ data: parsed.data });
  } catch (error) {
    return dbError(error);
  }
  updateTag(tags.gallery);
  redirect("/admin/gallery?saved=1");
}
