/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { img } from "@/lib/site";
import { formatDate, posts } from "@/content/posts";
import { PageHero } from "@/components/Sections";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <>
      <PageHero title="Blog" image={img("blog-hero", 2000, 1300)} cta={null} />
      <section className="mx-auto max-w-7xl px-5 py-24">
        <div className="grid gap-10 md:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
              <div className="overflow-hidden">
                <img
                  src={p.image}
                  alt=""
                  className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="mt-5 text-xs uppercase tracking-[0.2em] text-gold">{formatDate(p.date)}</p>
              <h2 className="mt-2 font-serif text-2xl group-hover:text-gold">{p.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p.excerpt}</p>
              <span className="mt-4 inline-block border-b border-gold pb-1 text-xs uppercase tracking-[0.2em] text-gold">
                Read more
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
