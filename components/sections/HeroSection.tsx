"use client";

import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, registerGsap } from "@/lib/gsap";

const SLIDES = [
  {
    client: "Aether Studio",
    project: "Spring Collection 2025",
    img: "https://picsum.photos/seed/arc-aether/1920/1080",
  },
  {
    client: "Lumen Mobility",
    project: "EV Identity System",
    img: "https://picsum.photos/seed/arc-lumen/1920/1080",
  },
  {
    client: "Onda Beverage",
    project: "Summer Brand Campaign",
    img: "https://picsum.photos/seed/arc-onda/1920/1080",
  },
  {
    client: "Niche Atelier",
    project: "Heritage Renewal",
    img: "https://picsum.photos/seed/arc-niche/1920/1080",
  },
  {
    client: "Vertex Capital",
    project: "Investor Day Film",
    img: "https://picsum.photos/seed/arc-vertex/1920/1080",
  },
];

export default function HeroSection() {
  const ref = useRef<HTMLElement | null>(null);
  const [idx, setIdx] = useState(0);
  registerGsap();

  const next = useCallback(
    () => setIdx((i) => (i + 1) % SLIDES.length),
    []
  );

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  useGSAP(
    () => {
      // Subtle parallax: image zooms/translates slightly as hero scrolls out
      gsap.to(".hero-slide-img", {
        yPercent: 12,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      // Captions fade as you scroll past hero
      gsap.to(".hero-content", {
        opacity: 0,
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    },
    { scope: ref }
  );

  const nextIdx = (idx + 1) % SLIDES.length;
  const current = SLIDES[idx];
  const upcoming = SLIDES[nextIdx];

  return (
    <section
      id="hero"
      ref={ref}
      className="relative w-screen h-[100svh] overflow-hidden bg-ink text-white"
    >
      {SLIDES.map((s, i) => (
        <div
          key={s.client + i}
          className={[
            "absolute inset-0 transition-opacity duration-1000 ease-out",
            i === idx ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          <div className="hero-slide-img absolute inset-0 will-change-transform">
            <Image
              src={s.img}
              alt={`${s.client} — ${s.project}`}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/35" />
        </div>
      ))}

      <div className="hero-content">
        {/* Top-right thumbnail card */}
        <div className="absolute top-24 right-5 md:right-10 lg:right-20 z-10 group cursor-pointer w-44 md:w-56">
          <button
            onClick={next}
            className="block w-full text-left"
            aria-label="Next slide"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <Image
                src={upcoming.img}
                alt={`Next: ${upcoming.client}`}
                fill
                sizes="(min-width:768px) 224px, 176px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
            <div className="mt-2">
              <div className="text-[10px] tracking-[0.15em] uppercase text-white/70">
                Next
              </div>
              <div className="text-xs font-semibold leading-tight mt-0.5">
                {upcoming.client}
              </div>
              <div className="text-[11px] text-white/70 leading-tight">
                {upcoming.project}
              </div>
            </div>
          </button>
        </div>

        {/* Bottom-left caption */}
        <div className="absolute left-5 md:left-10 lg:left-20 bottom-20 md:bottom-24 z-10">
          <div className="text-[11px] tracking-[0.2em] uppercase text-white/70">
            {String(idx + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
          </div>
          <div className="mt-2 text-base md:text-lg font-medium">
            {current.client}
          </div>
          <div className="text-sm md:text-base text-white/80">
            {current.project}
          </div>
        </div>

        {/* Bottom-center CTA */}
        <Link
          href="/work"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-sm md:text-base font-medium tracking-wide hover:opacity-70 transition-opacity"
        >
          → View Our All Work
        </Link>

        {/* Pagination dots */}
        <div className="absolute bottom-8 right-5 md:right-10 lg:right-20 z-10 hidden md:flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setIdx(i)}
              className={[
                "h-0.5 transition-all",
                i === idx ? "w-8 bg-white" : "w-4 bg-white/40 hover:bg-white/70",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
