import { z } from "zod";

// Image fields accept https URLs or site-relative paths (e.g. /images/dish.jpg).
// Anything else (javascript:, data:, http:) is rejected.
export const imageUrl = z
  .string()
  .trim()
  .min(1, "Image URL is required")
  .max(2000)
  .refine((v) => {
    if (/^\/(?!\/)[\w\-./%]*$/.test(v)) return true;
    try {
      return new URL(v).protocol === "https:";
    } catch {
      return false;
    }
  }, "Use an https:// URL or a path starting with /");

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((v) => (v === "" ? null : v))
    .nullable();

export const slug = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Slug is required")
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens");

const sortOrder = z.coerce.number().int().min(0).max(100000);
const published = z.boolean();

export const serviceSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(160),
  slug,
  description: z.string().trim().min(1, "Description is required").max(5000),
  imageUrl,
  priceLabel: optionalText(80),
  published,
  sortOrder,
});

export const dishSchema = z.object({
  name: z.string().trim().min(1, "Dish name is required").max(160),
  description: z.string().trim().max(1000).optional().default(""),
  dietary: z.string().trim().max(80).optional().default(""),
});
export type Dish = z.infer<typeof dishSchema>;

export const menuSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(160),
  slug,
  description: z.string().trim().min(1, "Description is required").max(5000),
  category: z.string().trim().min(1, "Category is required").max(80),
  imageUrl: z
    .string()
    .trim()
    .transform((v) => (v === "" ? null : v))
    .nullable()
    .pipe(imageUrl.nullable()),
  dishes: z.array(dishSchema).max(100),
  published,
  sortOrder,
});

export const galleryKeys = ["", "home", "private-chef", "private-dining", "bespoke-catering"] as const;

export const gallerySchema = z.object({
  imageUrl,
  altText: z.string().trim().min(1, "Alt text is required").max(300),
  caption: optionalText(300),
  category: z.enum(galleryKeys).transform((v) => (v === "" ? null : v)),
  published,
  sortOrder,
});

export const testimonialSchema = z.object({
  clientName: z.string().trim().min(1, "Client name is required").max(120),
  content: z.string().trim().min(1, "Review text is required").max(3000),
  roleOrCompany: optionalText(160),
  published,
  sortOrder,
});

export const chefSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  slug,
  designation: z.string().trim().min(1, "Designation is required").max(120),
  biography: z.string().trim().min(1, "Biography is required").max(8000),
  imageUrl,
  experience: optionalText(2000),
  published,
  sortOrder,
});

export const userSchema = z.object({
  email: z.email("Enter a valid email").trim().toLowerCase().max(200),
  password: z.string().min(12, "Password must be at least 12 characters").max(200),
  role: z.enum(["ADMIN", "EDITOR"]),
});

export const loginSchema = z.object({
  email: z.email("Enter a valid email").trim().toLowerCase(),
  password: z.string().min(1, "Password is required").max(200),
});
