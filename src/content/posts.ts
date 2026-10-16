// Blog posts. Placeholder articles: replace with your own writing.
import { img } from "@/lib/site";

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  body: { heading?: string; text: string }[];
};

export const posts: Post[] = [
  {
    slug: "benefits-of-bespoke-catering",
    title: "Five reasons to choose a bespoke caterer",
    date: "2026-03-10",
    excerpt: "Why a tailored catering service often beats a set menu for your next event.",
    image: img("post-catering", 1200, 800),
    body: [
      { text: "Placeholder introduction. Explain who this article is for and what they will learn." },
      { heading: "1. A menu built for your guests", text: "Placeholder paragraph." },
      { heading: "2. Less stress for the host", text: "Placeholder paragraph." },
      { heading: "3. Better ingredients", text: "Placeholder paragraph." },
      { heading: "4. Flexible service styles", text: "Placeholder paragraph." },
      { heading: "5. Every dietary need covered", text: "Placeholder paragraph." },
    ],
  },
  {
    slug: "private-chef-dinner-party",
    title: "Why a private chef makes the perfect dinner party",
    date: "2026-02-02",
    excerpt: "Skip the booking and the bill-splitting: bring the restaurant home instead.",
    image: img("post-chef", 1200, 800),
    body: [
      { text: "Placeholder introduction for this article." },
      { heading: "Your table, your rules", text: "Placeholder paragraph." },
      { heading: "A menu just for you", text: "Placeholder paragraph." },
      { heading: "No clean-up", text: "Placeholder paragraph." },
    ],
  },
  {
    slug: "what-is-private-dining",
    title: "What is private dining? A simple guide",
    date: "2026-01-15",
    excerpt: "Everything you need to know before booking your first private dining experience.",
    image: img("post-dining", 1200, 800),
    body: [
      { text: "Placeholder introduction for this article." },
      { heading: "How it works", text: "Placeholder paragraph." },
      { heading: "What it costs", text: "Placeholder paragraph." },
      { heading: "How to book", text: "Placeholder paragraph." },
    ],
  },
];

export const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
