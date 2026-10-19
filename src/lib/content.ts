import "server-only";
import { cacheTag } from "next/cache";
import { db } from "./db";
import { gallery, menus, services, testimonials, img } from "./site";
import type { Dish } from "./validation";

// Public-site content readers. Each one is cached and tagged; admin mutations
// call updateTag() with the same tag so changes show on the next request.
//
// Fallback rule: if a table has no rows at all (fresh database) the original
// static placeholder content is shown. Once any row exists, only published rows
// render. Database errors are logged and fall back to static content so the
// public site keeps working.

export const tags = {
  services: "cms:services",
  menus: "cms:menus",
  gallery: "cms:gallery",
  testimonials: "cms:testimonials",
  chefs: "cms:chefs",
} as const;

const servicePages = new Set(["private-chef", "private-dining", "bespoke-catering"]);

async function withFallback<T>(label: string, run: () => Promise<T | null>, fallback: T): Promise<T> {
  if (!process.env.DATABASE_URL) {
    console.error(`[cms] DATABASE_URL is not set; using static ${label} content.`);
    return fallback;
  }
  try {
    return (await run()) ?? fallback;
  } catch (error) {
    console.error(`[cms] Failed to load ${label} from database; using static content.`, error);
    return fallback;
  }
}

export type PublicService = { title: string; text: string; image: string; href: string; priceLabel?: string | null };

export async function getServices(): Promise<PublicService[]> {
  "use cache";
  cacheTag(tags.services);
  return withFallback(
    "services",
    async () => {
      if ((await db.cateringService.count()) === 0) return null;
      const rows = await db.cateringService.findMany({
        where: { published: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      });
      return rows.map((r) => ({
        title: r.title,
        text: r.description,
        image: r.imageUrl,
        // Only existing service pages have their own URL; others go to the enquiry page.
        href: servicePages.has(r.slug) ? `/${r.slug}` : "/contact-us",
        priceLabel: r.priceLabel,
      }));
    },
    services,
  );
}

export type PublicMenu =
  | { kind: "pdf"; title: string; href: string }
  | { kind: "menu"; title: string; category: string; description: string; image: string | null; dishes: Dish[] };

export async function getMenus(): Promise<PublicMenu[]> {
  "use cache";
  cacheTag(tags.menus);
  return withFallback<PublicMenu[]>(
    "menus",
    async () => {
      if ((await db.chefMenu.count()) === 0) return null;
      const rows = await db.chefMenu.findMany({
        where: { published: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      });
      return rows.map((r) => ({
        kind: "menu",
        title: r.title,
        category: r.category,
        description: r.description,
        image: r.imageUrl,
        dishes: Array.isArray(r.dishes) ? (r.dishes as Dish[]) : [],
      }));
    },
    menus.map((m) => ({ kind: "pdf", ...m })),
  );
}

export type PublicImage = { src: string; alt: string; caption?: string | null };

export async function getGallery(category: string | null, fallbackPrefix: string, limit?: number): Promise<PublicImage[]> {
  "use cache";
  cacheTag(tags.gallery);
  const fallback = gallery(fallbackPrefix, limit ?? 40).map((src, i) => ({ src, alt: `Gallery image ${i + 1}` }));
  return withFallback(
    "gallery",
    async () => {
      if ((await db.galleryImage.count()) === 0) return null;
      const order = [{ sortOrder: "asc" as const }, { createdAt: "asc" as const }];
      let rows = category
        ? await db.galleryImage.findMany({ where: { published: true, category }, orderBy: order, take: limit })
        : [];
      // Pages without images of their own show the full published gallery.
      if (rows.length === 0) {
        rows = await db.galleryImage.findMany({ where: { published: true }, orderBy: order, take: limit });
      }
      return rows.map((r) => ({ src: r.imageUrl, alt: r.altText, caption: r.caption }));
    },
    fallback,
  );
}

export type PublicTestimonial = { name: string; text: string; role?: string | null };

export async function getTestimonials(): Promise<PublicTestimonial[]> {
  "use cache";
  cacheTag(tags.testimonials);
  return withFallback(
    "testimonials",
    async () => {
      if ((await db.testimonial.count()) === 0) return null;
      const rows = await db.testimonial.findMany({
        where: { published: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      });
      return rows.map((r) => ({ name: r.clientName, text: r.content, role: r.roleOrCompany }));
    },
    testimonials,
  );
}

export type PublicChef = {
  name: string;
  role: string;
  image: string;
  points: { title: string; text: string }[];
};

// Placeholder team shown until chef profiles are added in the admin panel.
const fallbackTeam: PublicChef[] = [
  {
    name: "Head Chef",
    role: "Co-director",
    image: img("team-chef", 800, 1000),
    points: [
      { title: "Experience", text: "Summarise your chef's background, training and kitchens they have worked in." },
      { title: "Cooking Style", text: "Describe the food: the flavours, techniques and produce they love." },
      { title: "Philosophy", text: "Explain what drives them and how they approach each menu." },
    ],
  },
  {
    name: "Service Lead",
    role: "Co-director",
    image: img("team-service", 800, 1000),
    points: [
      { title: "Background", text: "Describe their hospitality experience and where it began." },
      { title: "Service Standards", text: "Explain the level of care guests can expect at every event." },
      { title: "Discretion", text: "Note how privacy and confidentiality are respected for every client." },
      { title: "Styling", text: "Describe how they set the scene: tables, flowers and atmosphere." },
      { title: "Presentation", text: "Explain the attention to detail that goes into every space." },
    ],
  },
];

export async function getChefs(): Promise<PublicChef[]> {
  "use cache";
  cacheTag(tags.chefs);
  return withFallback(
    "chef profiles",
    async () => {
      if ((await db.chefProfile.count()) === 0) return null;
      const rows = await db.chefProfile.findMany({
        where: { published: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      });
      return rows.map((r) => ({
        name: r.name,
        role: r.designation,
        image: r.imageUrl,
        points: [
          ...(r.experience ? [{ title: "Experience", text: r.experience }] : []),
          { title: "Biography", text: r.biography },
        ],
      }));
    },
    fallbackTeam,
  );
}
