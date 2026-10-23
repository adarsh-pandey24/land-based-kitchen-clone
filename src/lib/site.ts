// Brand settings and site-wide copy for The Coast & Cardamom Catering Co.
// Sources: brand guidelines, website copy document, and the client's Drive
// folder (contact details, Joseph's bio, brand description). Values marked
// TODO are still to be confirmed by the client.

export const site = {
  name: "The Coast & Cardamom",
  legalName: "The Coast & Cardamom Catering Co.",
  chef: "Joseph Raj",
  line: "Indian spice. Coastal table. Your place.",
  tagline: "Where the Coast Meets Spice.",
  yearsExperience: 15,
  // Countries Joseph has worked in (About page stats strip).
  countriesWorked: 2 as number | null,
  countries: "India and Australia",
  // Hotel groups Joseph has cooked for.
  hotels: ["JW Marriott", "Six Senses", "Taj Hotels", "The Oberoi Group"],
  // Reply time promised on the enquiry form and Contact page.
  replyTime: "within 24 hours",
  region: "Gold Coast",
  location: "Gold Coast, QLD",
  serviceArea: "No travel fee within 30 km on the Gold Coast. Further out, a per-kilometre travel fee applies, shown on your quote.",
  phone: "+61 487 988 930",
  whatsapp: "61487988930",
  email: "thecoastncardamomau@gmail.com",
  abn: "", // TODO: ABN applied for, expected in about a month
  hours: "", // TODO: enquiry hours
  socials: {
    instagram: "https://www.instagram.com/thecoastncardamom",
    facebook: "", // TODO: to be added
  },
};

// Public URL of the site, used for the sitemap and social sharing images.
export const siteUrl = (process.env.SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

// Google Maps link for the service area (no street address is published).
export const mapUrl = "https://www.google.com/maps/search/?api=1&query=Gold%20Coast%20QLD%20Australia";

export const tel = `tel:${site.phone.replace(/\s/g, "")}`;

// Header menu: six pages (Privacy Policy and Terms are linked in the footer). The four service pages sit under Catering services.
export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About the Chef", href: "/about" },
  {
    label: "Catering Services",
    href: "/services",
    children: [
      { label: "Chakna & Tonic", href: "/chakna-and-tonic" },
      { label: "Boards & Grazing", href: "/grazing-tables-boards" },
      { label: "Parties & Celebrations", href: "/party-catering" },
      { label: "Dining & Events", href: "/private-dining-events" },
      { label: "View all menus", href: "/menus" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Reviews & FAQs", href: "/reviews-faqs" },
  { label: "Contact", href: "/contact" },
];

export const logo = { badge: "/brand/badge.webp", disc: "/brand/badge-disc.webp" };

// No food or chef photos have been supplied yet (Drive folders 02-15 are
// empty), so image slots use on-brand illustrated placeholders. Wide slots get
// the hero artwork; others rotate through the palette by seed. Replace a slot
// by pointing it at a file in /public (e.g. /images/grazing-table.jpg).
const swatches = ["shell", "surf", "curry", "navy", "gold"];
export const img = (seed: string, w = 1600) => {
  if (w >= 2000) return "/placeholders/hero.svg";
  const hash = [...seed].reduce((n, c) => (n * 31 + c.charCodeAt(0)) >>> 0, 7);
  return `/placeholders/photo-${swatches[hash % swatches.length]}.svg`;
};

export const images = {
  hero: img("cc-hero", 2400),
  welcome: img("cc-welcome", 900),
  chef: img("cc-chef", 900),
  why1: img("cc-why-1", 800),
  why2: img("cc-why-2", 800),
};

// Dietary options the client guarantees. Vegetarian means no eggs.
export const dietary = ["Halal", "Jain", "Vegetarian (no eggs)", "Dairy-free", "Gluten-free", "Nut-free"];

// From the client's brand description.
export const values = [
  { title: "Freshness & provenance", text: "Seasonal produce, sourced locally where we can." },
  { title: "Craftsmanship", text: "Professional standards and detail in every menu." },
  { title: "Authentic flavour", text: "Traditional spice and technique, cooked with modern ideas." },
  { title: "Personal hospitality", text: "Your occasion, your guests, your budget, listened to." },
  { title: "Consistency", text: "Reliable on the day, every time." },
];

export const enquiryOptions = {
  eventTypes: ["Birthday or celebration", "Corporate", "Boat party", "Wedding or engagement", "Dinner party", "Other"],
  guests: ["Under 10", "10 to 25", "26 to 50", "51 to 100", "100+"],
  format: ["Drop-off", "Chef on-site", "Not sure"],
  dietary: ["Halal", "Jain", "Vegetarian (no eggs)", "Dairy-free", "Gluten-free", "Nut allergy", "Other"],
  // Placeholder budget bands from the copy document; Joseph to set his own.
  budget: ["Under $500", "$500 to $1,500", "$1,500 to $3,000", "$3,000+", "Not sure yet"],
};
