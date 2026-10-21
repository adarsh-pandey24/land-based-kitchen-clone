"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import type { PublicImage } from "@/lib/content";

export default function GalleryFilter({
  items,
  tabs,
  instagram,
}: {
  items: PublicImage[];
  tabs: { key: string; label: string }[];
  instagram: string;
}) {
  const [active, setActive] = useState("all");
  // Only show tabs that have images, so visitors never land on an empty filter.
  const visibleTabs = tabs.filter((t) => items.some((i) => i.category === t.key));
  const shown = active === "all" ? items : items.filter((i) => i.category === active);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl rounded-sm bg-shell px-6 py-14 text-center">
        <p className="font-serif text-2xl">Photos from recent events are on their way.</p>
        <p className="mt-3 text-muted">In the meantime, see what Joseph is cooking on Instagram.</p>
        <a href={instagram} target="_blank" rel="noreferrer" className="btn mt-6">
          Follow on Instagram
        </a>
      </div>
    );
  }

  return (
    <div>
      {visibleTabs.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filter gallery">
          {[{ key: "all", label: "All" }, ...visibleTabs].map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={active === t.key}
              onClick={() => setActive(t.key)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                active === t.key ? "border-navy bg-navy text-sea" : "border-line bg-sea hover:border-navy"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}
      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {shown.map((item, i) => (
          <figure key={`${item.src}-${i}`} className="overflow-hidden rounded-sm bg-shell">
            <img src={item.src} alt={item.alt} loading="lazy" className="aspect-square w-full object-cover" />
            {item.caption && <figcaption className="px-3 py-2 text-xs text-muted">{item.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </div>
  );
}
