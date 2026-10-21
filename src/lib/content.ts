import "server-only";
import { cacheTag } from "next/cache";
import { db } from "./db";
import { images } from "./site";
import { fallbackServices, type Service } from "@/content/services";
import type { Dish } from "./validation";

// Public-site content readers. Each one is cached and tagged; admin mutations
// call updateTag() with the same tag so changes show on the next request.
//
// Fallback rule: if a table has no rows at all (fresh database) the original
// static content is shown. Once any row exists, only published rows render.
// Database errors are logged and fall back to static content so the public
// site keeps working.

export const tags = {
  services: "cms:services",
  menus: "cms:menus",
  gallery: "cms:gallery",
  testimonials: "cms:testimonials",
  chefs: "cms:chefs",
} as const;

const order = [{ sortOrder: "asc" as const }, { createdAt: "asc" as const }];

async function withFallback<T>(label: string, run: () => Promise<T | null>, fallback: T): Promise<T> {
  if (!process.env.DATABASE_URL) {
    console.error(`[cms] DATABASE_URL is not set; using static ${label} content.`);
    return fallback;
  }
  // One retry covers brief connection drops (e.g. Neon waking from idle, or
  // many parallel build workers connecting at once).
  for (let attempt = 1; ; attempt++) {
    try {
      return (await run()) ?? fallback;
    } catch (error) {
      if (attempt < 2) continue;
      console.error(`[cms] Failed to load ${label} from database; using static content.`, error);
      return fallback;
    }
  }
}

export type { Service };

// Services for one service page, or all services when group is omitted.
export async function getServices(group?: string): Promise<Service[]> {
  "use cache";
  cacheTag(tags.services);
  const all = await withFallback(
    "services",
    async () => {
      if ((await db.cateringService.count()) === 0) return null;
      const rows = await db.cateringService.findMany({ where: { published: true }, orderBy: order });
      return rows.map(({ imageUrl, ...r }) => ({ ...r, image: imageUrl }));
    },
    fallbackServices,
  );
  return group ? all.filter((s) => s.group === group) : all;
}

export type PublicMenu = {
  title: string;
  category: string;
  description: string;
  image: string | null;
  pdfUrl: string | null;
  dishes: Dish[];
};

// Menus for a service page: those assigned to the page plus those assigned to
// every page (empty group). There is no static fallback: the section is hidden
// until menus are published.
export async function getMenus(group: string): Promise<PublicMenu[]> {
  "use cache";
  cacheTag(tags.menus);
  return withFallback<PublicMenu[]>(
    "menus",
    async () => {
      const rows = await db.chefMenu.findMany({
        where: { published: true, group: { in: [group, ""] } },
        orderBy: order,
      });
      return rows.map((r) => ({
        title: r.title,
        category: r.category,
        description: r.description,
        image: r.imageUrl,
        pdfUrl: r.pdfUrl,
        dishes: Array.isArray(r.dishes) ? (r.dishes as Dish[]) : [],
      }));
    },
    [],
  );
}

export type PublicImage = { src: string; alt: string; caption?: string | null; category?: string | null };

// Published gallery images. With a category, returns that category's images,
// or the whole gallery when the category has none yet. There is no placeholder
// fallback ("real events, no stock photos"): gallery sections stay hidden until
// photos are published.
export async function getGallery(category: string | null, limit?: number): Promise<PublicImage[]> {
  "use cache";
  cacheTag(tags.gallery);
  return withFallback<PublicImage[]>(
    "gallery",
    async () => {
      let rows = category
        ? await db.galleryImage.findMany({ where: { published: true, category }, orderBy: order, take: limit })
        : [];
      if (rows.length === 0) {
        rows = await db.galleryImage.findMany({ where: { published: true }, orderBy: order, take: limit });
      }
      return rows.map((r) => ({ src: r.imageUrl, alt: r.altText, caption: r.caption, category: r.category }));
    },
    [],
  );
}

export type PublicChef = {
  name: string;
  role: string;
  image: string;
  biography: string;
  experience: string | null;
};

// About copy in Joseph's voice: the copy document's draft story combined with
// the facts from his bio (16 years, luxury hotels in Australia and Asia).
const fallbackChefs: PublicChef[] = [
  {
    name: "Joseph Raj",
    role: "Chef & owner",
    image: images.chef,
    biography:
      "I grew up in India, where every gathering started in the kitchen and nobody left hungry. I've spent 16 years cooking in luxury restaurants and premium hotels across Australia and Asia, from banquets to fine dining.\n\nThe Gold Coast gave me produce I'd only dreamed about: prawns off the boat, Northern Rivers cheese, mangoes that taste like home. The Coast & Cardamom is what happens when those two kitchens meet.\n\nMy philosophy is simple: good food, thoughtfully made, and shared around the table.",
    experience: null,
  },
];

export async function getChefs(): Promise<PublicChef[]> {
  "use cache";
  cacheTag(tags.chefs);
  return withFallback(
    "chef profiles",
    async () => {
      if ((await db.chefProfile.count()) === 0) return null;
      const rows = await db.chefProfile.findMany({ where: { published: true }, orderBy: order });
      return rows.map((r) => ({
        name: r.name,
        role: r.designation,
        image: r.imageUrl,
        biography: r.biography,
        experience: r.experience,
      }));
    },
    fallbackChefs,
  );
}
