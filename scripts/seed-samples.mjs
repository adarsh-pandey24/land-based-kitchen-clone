// Adds sample gallery images and sample menus so the site can be previewed
// before the client's own photos and menus arrive. Every record is titled or
// captioned "Sample" and can be deleted from the admin (Gallery / Chef menus).
// Safe to re-run: existing samples (matched by slug or image URL) are skipped.
//
// Photos: Unsplash images served by picsum.photos (free to use under the
// Unsplash licence). Dishes: the sample dishes from the website copy document.
//
// Usage: npm run seed-samples
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
const photo = (id, w = 1200, h = 1200) => `https://picsum.photos/id/${id}/${w}/${h}`;

const gallery = [
  { id: 292, alt: "Red onion, herbs and whole peppercorns on a chopping board", category: "behind-the-scenes" },
  { id: 490, alt: "Mortar and pestle with spices, knives and a cast-iron pan", category: "behind-the-scenes" },
  { id: 627, alt: "Fresh green beans", category: "behind-the-scenes" },
  { id: 312, alt: "Honey dripping from a wooden dipper", category: "behind-the-scenes" },
  { id: 429, alt: "Bowl of fresh raspberries", category: "grazing-tables-boards" },
  { id: 1080, alt: "Punnets of ripe strawberries", category: "grazing-tables-boards" },
  { id: 674, alt: "Hands holding a bunch of black grapes", category: "grazing-tables-boards" },
  { id: 999, alt: "Celebration cake with nuts on a dark table", category: "party-catering" },
  { id: 835, alt: "Biscuits in a bowl with lemons and flowers", category: "party-catering" },
  { id: 488, alt: "Colourful salad with peppers and red cabbage in a clay bowl", category: "private-dining-events" },
  { id: 493, alt: "Yoghurt with oats and fresh strawberries", category: "private-dining-events" },
  { id: 635, alt: "Enamel cups set out on a wooden table", category: "chakna-and-tonic" },
];

const menus = [
  {
    slug: "sample-chakna-tonic-menu",
    title: "Sample: Chakna & Tonic",
    category: "Bar snacks",
    group: "chakna-and-tonic",
    imageUrl: photo(635, 900, 1100),
    description: "Sample menu for preview. Replace it with Joseph's menu in the admin.\n\nTen small plates, made fresh, with chilled tonic. BYO drinks.",
    dishes: [
      { name: "Masala peanuts", description: "", dietary: "V" },
      { name: "Chilli paneer bites", description: "", dietary: "V" },
      { name: "Chicken tikka skewers", description: "", dietary: "" },
      { name: "Pani puri", description: "", dietary: "V" },
      { name: "Onion pakora", description: "", dietary: "V" },
    ],
  },
  {
    slug: "sample-grazing-menu",
    title: "Sample: Grazing table",
    category: "Boards & grazing",
    group: "grazing-tables-boards",
    imageUrl: photo(1080, 900, 1100),
    description: "Sample menu for preview. Replace it with Joseph's menu in the admin.\n\nStyled on the day, with a few Indian surprises.",
    dishes: [
      { name: "Local and imported cheeses", description: "", dietary: "" },
      { name: "Cured meats", description: "", dietary: "" },
      { name: "Seasonal fruit", description: "", dietary: "" },
      { name: "House pickles and dips", description: "", dietary: "" },
      { name: "Breads and crackers", description: "", dietary: "" },
    ],
  },
  {
    slug: "sample-barbecue-menu",
    title: "Sample: Barbecue party",
    category: "Barbecue",
    group: "party-catering",
    imageUrl: photo(292, 900, 1100),
    description: "Sample menu for preview. Replace it with Joseph's menu in the admin.\n\nAustralian barbecue, Indian marinades, cooked on your grill.",
    dishes: [
      { name: "Tandoori chicken", description: "", dietary: "" },
      { name: "Lamb seekh kebab", description: "", dietary: "" },
      { name: "Garlic prawn skewers", description: "", dietary: "" },
      { name: "Grilled corn with chilli butter", description: "", dietary: "V" },
      { name: "Salads, chutneys and breads", description: "", dietary: "" },
    ],
  },
  {
    slug: "sample-indian-buffet-menu",
    title: "Sample: Indian buffet",
    category: "Buffet",
    group: "private-dining-events",
    imageUrl: photo(488, 900, 1100),
    description: "Sample menu for preview. Replace it with Joseph's menu in the admin.\n\nCooked fresh and served hot, every dish labelled.",
    dishes: [
      { name: "Curries", description: "", dietary: "" },
      { name: "Biryani", description: "", dietary: "" },
      { name: "Tandoor", description: "", dietary: "" },
      { name: "Breads and chutneys", description: "", dietary: "" },
      { name: "Dessert", description: "", dietary: "" },
    ],
  },
];

try {
  let addedImages = 0;
  for (const [i, g] of gallery.entries()) {
    const imageUrl = photo(g.id);
    if (await db.galleryImage.findFirst({ where: { imageUrl } })) continue;
    await db.galleryImage.create({
      data: {
        imageUrl,
        altText: g.alt,
        caption: "Sample photo · replace with your own",
        category: g.category,
        published: true,
        sortOrder: 1000 + i * 10,
      },
    });
    addedImages++;
  }
  let addedMenus = 0;
  for (const [i, m] of menus.entries()) {
    if (await db.chefMenu.findUnique({ where: { slug: m.slug } })) continue;
    await db.chefMenu.create({ data: { ...m, published: true, sortOrder: 1000 + i * 10 } });
    addedMenus++;
  }
  console.log(`Sample gallery images added: ${addedImages}. Sample menus added: ${addedMenus}.`);
} catch (error) {
  console.error("Could not add samples:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  await db.$disconnect();
}
