/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, posts } from "@/content/posts";
import { ContactCta } from "@/components/Sections";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  return { title: post?.title, description: post?.excerpt };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <section className="relative flex min-h-[60vh] items-end overflow-hidden">
        <img src={post.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 mx-auto w-full max-w-4xl px-5 pb-16 text-white">
          <p className="text-xs uppercase tracking-[0.2em] text-gold">{formatDate(post.date)}</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">{post.title}</h1>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-5 py-20">
        {post.body.map((b, i) => (
          <div key={i} className="mt-8 first:mt-0">
            {b.heading && <h2 className="font-serif text-2xl">{b.heading}</h2>}
            <p className="mt-3 leading-relaxed text-muted">{b.text}</p>
          </div>
        ))}
        <Link href="/blog" className="btn mt-14">
          Back to Blog
        </Link>
      </article>

      <ContactCta />
    </>
  );
}
