"use server";

import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { tags } from "@/lib/content";
import { menuSchema } from "@/lib/validation";
import { bool, dbError, invalid, str, type FormState } from "@/lib/admin-crud";

function parseDishes(raw: string): unknown {
  try {
    return JSON.parse(raw || "[]");
  } catch {
    return null;
  }
}

export async function saveMenu(id: string | null, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireUser();
  const parsed = menuSchema.safeParse({
    title: str(formData, "title"),
    slug: str(formData, "slug"),
    description: str(formData, "description"),
    category: str(formData, "category"),
    imageUrl: str(formData, "imageUrl"),
    dishes: parseDishes(str(formData, "dishes")),
    published: bool(formData, "published"),
    sortOrder: str(formData, "sortOrder") || 0,
  });
  if (!parsed.success) return invalid(parsed.error);
  try {
    if (id) await db.chefMenu.update({ where: { id }, data: parsed.data });
    else await db.chefMenu.create({ data: parsed.data });
  } catch (error) {
    return dbError(error);
  }
  updateTag(tags.menus);
  redirect("/admin/menus?saved=1");
}
