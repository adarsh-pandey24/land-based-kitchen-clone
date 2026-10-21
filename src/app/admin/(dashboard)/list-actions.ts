"use server";

import { refresh, updateTag } from "next/cache";
import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { tags } from "@/lib/content";

// Shared list operations (publish toggle, reorder, delete) for the five content
// modules. Each call re-verifies the session before touching data.

const modules = {
  services: { delegate: () => db.cateringService, tag: tags.services },
  menus: { delegate: () => db.chefMenu, tag: tags.menus },
  gallery: { delegate: () => db.galleryImage, tag: tags.gallery },
  testimonials: { delegate: () => db.testimonial, tag: tags.testimonials },
  chefs: { delegate: () => db.chefProfile, tag: tags.chefs },
} as const;

export type ModuleKey = keyof typeof modules;

type Row = { id: string; published: boolean; sortOrder: number };
// Minimal shared shape of the five Prisma delegates used below.
type Delegate = {
  findUnique(args: { where: { id: string } }): Promise<Row | null>;
  findMany(args: { select: { id: true; sortOrder: true }; orderBy: object[] }): Promise<{ id: string; sortOrder: number }[]>;
  update(args: { where: { id: string }; data: Partial<Row> }): Prisma.PrismaPromise<Row>;
  delete(args: { where: { id: string } }): Promise<Row>;
};

const input = z.object({
  module: z.enum(Object.keys(modules) as [ModuleKey, ...ModuleKey[]]),
  id: z.string().min(1).max(64),
});

export type ListResult = { ok: boolean; message: string };

async function run(module: string, id: string, op: (d: Delegate, id: string) => Promise<string>): Promise<ListResult> {
  await requireUser();
  const parsed = input.safeParse({ module, id });
  if (!parsed.success) return { ok: false, message: "Invalid request." };
  const config = modules[parsed.data.module];
  try {
    const message = await op(config.delegate() as unknown as Delegate, parsed.data.id);
    updateTag(config.tag);
    refresh();
    return { ok: true, message };
  } catch (error) {
    console.error("[admin] List action failed", error);
    return { ok: false, message: "Action failed. The record may have been removed." };
  }
}

export async function togglePublished(module: string, id: string) {
  return run(module, id, async (d, id) => {
    const row = await d.findUnique({ where: { id } });
    if (!row) throw new Error("Not found");
    await d.update({ where: { id }, data: { published: !row.published } });
    return row.published ? "Unpublished." : "Published.";
  });
}

export async function moveItem(module: string, id: string, direction: "up" | "down") {
  return run(module, id, async (d, id) => {
    const rows = await d.findMany({ select: { id: true, sortOrder: true }, orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });
    const ids = rows.map((r) => r.id);
    const from = ids.indexOf(id);
    const to = direction === "up" ? from - 1 : from + 1;
    if (from === -1) throw new Error("Not found");
    if (to < 0 || to >= ids.length) return "Already at the edge.";
    [ids[from], ids[to]] = [ids[to], ids[from]];
    // Renumber so sort orders stay unique and gap-free, writing only rows whose
    // position number actually changes.
    const current = new Map(rows.map((r) => [r.id, r.sortOrder]));
    const changes = ids.map((rowId, i) => [rowId, i * 10] as const).filter(([rowId, order]) => current.get(rowId) !== order);
    await db.$transaction(changes.map(([rowId, order]) => d.update({ where: { id: rowId }, data: { sortOrder: order } })));
    return "Order updated.";
  });
}

export async function deleteItem(module: string, id: string) {
  return run(module, id, async (d, id) => {
    await d.delete({ where: { id } });
    return "Deleted.";
  });
}
