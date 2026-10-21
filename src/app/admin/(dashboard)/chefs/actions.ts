"use server";

import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { tags } from "@/lib/content";
import { chefSchema } from "@/lib/validation";
import { bool, dbError, invalid, str, type FormState } from "@/lib/admin-crud";

export async function saveChef(id: string | null, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireUser();
  const parsed = chefSchema.safeParse({
    name: str(formData, "name"),
    slug: str(formData, "slug"),
    designation: str(formData, "designation"),
    biography: str(formData, "biography"),
    imageUrl: str(formData, "imageUrl"),
    experience: str(formData, "experience"),
    published: bool(formData, "published"),
    sortOrder: str(formData, "sortOrder") || 0,
  });
  if (!parsed.success) return invalid(parsed.error);
  try {
    if (id) await db.chefProfile.update({ where: { id }, data: parsed.data });
    else await db.chefProfile.create({ data: parsed.data });
  } catch (error) {
    return dbError(error);
  }
  updateTag(tags.chefs);
  redirect("/admin/chefs?saved=1");
}
