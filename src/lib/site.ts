// Shared site settings. Replace the placeholder brand, contact details and
// images with your own (or content you have rights to use).

export const site = {
  name: "Your Kitchen Co.",
  tagline: "Private chef, dining & catering",
  regions: "Gold Coast, Brisbane & Byron Bay",
  phone: "0400 000 000",
  email: "hello@example.com",
  location: "Gold Coast, QLD",
  socials: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
  },
};

export const tel = `tel:${site.phone.replace(/\s/g, "")}`;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Private Chef", href: "/private-chef" },
  { label: "Private Dining", href: "/private-dining" },
  { label: "Bespoke Catering", href: "/bespoke-catering" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact-us" },
];

// Placeholder photography (picsum.photos). Swap for your own files in /public.
export const img = (seed: string, w = 1600, h = 1000) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const images = {
  hero: img("kitchen-hero", 2000, 1300),
  welcome: img("plated-dish", 900, 1100),
  about: img("chef-team", 1000, 1200),
  why: img("table-setting", 1000, 1200),
  contact: img("dinner-party", 2000, 1100),
};

export const services = [
  {
    title: "Private Chef",
    text: "A dedicated chef in your home or holiday rental, cooking menus shaped around your tastes and occasion.",
    image: img("private-chef", 900, 1100),
    href: "/private-chef",
  },
  {
    title: "Private Dining",
    text: "Multi-course dinners with table service, styled settings and wine pairing for intimate gatherings.",
    image: img("private-dining", 900, 1100),
    href: "/private-dining",
  },
  {
    title: "Bespoke Catering",
    text: "Canapés, grazing and full-service catering for celebrations, corporate events and weddings.",
    image: img("catering", 900, 1100),
    href: "/bespoke-catering",
  },
];

export const gallery = (prefix: string, count: number, size = 800) =>
  Array.from({ length: count }, (_, i) => img(`${prefix}-${i + 1}`, size, size));

// Sample testimonials only. Replace with genuine reviews from your customers.
export const testimonials = [
  { name: "Sample Client A", text: "Placeholder review text. Replace with a real customer quote." },
  { name: "Sample Client B", text: "Placeholder review text. Replace with a real customer quote." },
  { name: "Sample Client C", text: "Placeholder review text. Replace with a real customer quote." },
  { name: "Sample Client D", text: "Placeholder review text. Replace with a real customer quote." },
  { name: "Sample Client E", text: "Placeholder review text. Replace with a real customer quote." },
  { name: "Sample Client F", text: "Placeholder review text. Replace with a real customer quote." },
];

// Menu PDFs. Put your files in /public/menus and update the paths.
export const menus = [
  { title: "Canapé Menu", href: "/menus/canape-menu.pdf" },
  { title: "Long Table Shared Menu", href: "/menus/shared-menu.pdf" },
  { title: "Tasting Menu (3–10 courses)", href: "/menus/tasting-menu.pdf" },
];
