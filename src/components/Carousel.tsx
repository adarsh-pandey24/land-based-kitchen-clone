"use client";

import { Children, useRef, type ReactNode } from "react";
import Icon from "./Icon";

// Horizontal carousel with previous/next arrows; swipe also works on touch.
// Each child is one slide; slideClass sets the slide width per breakpoint.
export default function Carousel({
  children,
  label,
  slideClass = "w-[78%] sm:w-[45%] lg:w-[31%]",
  dark = false,
}: {
  children: ReactNode;
  label: string;
  slideClass?: string;
  dark?: boolean;
}) {
  const track = useRef<HTMLDivElement>(null);
  const slides = Children.toArray(children);
  const scroll = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * track.current.clientWidth * 0.8, behavior: "smooth" });
  const arrow = `flex h-11 w-11 items-center justify-center border ${
    dark ? "border-gold text-gold hover:bg-gold hover:text-navy" : "border-navy text-navy hover:bg-navy hover:text-sea"
  }`;

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div ref={track} className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none]">
        {slides.map((slide, i) => (
          <div key={i} className={`shrink-0 snap-start ${slideClass}`}>
            {slide}
          </div>
        ))}
      </div>
      {slides.length > 1 && (
        <div className="mt-8 flex justify-center gap-3">
          <button onClick={() => scroll(-1)} aria-label="Previous" className={arrow}>
            <Icon name="left" className="h-5 w-5" />
          </button>
          <button onClick={() => scroll(1)} aria-label="Next" className={arrow}>
            <Icon name="right" className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
