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
      if (!ref.current) return;

      // Drive --p from 0 to 1 over the first 100vh of scroll inside the hero.
      // After that, the section's sticky child remains fullscreen until the
      // parent's bottom passes viewport bottom — revealing the next section.
      gsap.to(ref.current, {
        "--p": 1,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "+=100%", // 100% of trigger height = 200vh; expansion completes in first half
          scrub: 0.3,
          // markers: true, // uncomment for debugging
        },
      });
    },
    { scope: ref }
  );

  const current = SLIDES[idx];

  return (
    <section
      ref={ref}
      id="hero"
      className="relative w-screen bg-ink text-white"
      style={
        {
          height: "200svh",
          // initial value for the scroll-driven CSS variable
          ["--p" as string]: 0,
        } as React.CSSProperties
      }
    >
      <div className="sticky top-0 h-svh w-screen overflow-hidden">
        {/* Intro: fades out as the video expands */}
        <div
          className="hero-intro absolute inset-0 grid-padding flex items-center pointer-events-none"
          style={
            { opacity: "calc(1 - var(--p, 0) * 1.8)" } as React.CSSProperties
          }
        >
          <div className="max-w-4xl">
            <div className="text-[11px] tracking-[0.25em] uppercase text-white/50 mb-5">
              Showreel 2026
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-bold leading-[0.95] tracking-tight text-balance">
              브랜드의 다음
              <br />
              장면을 설계합니다.
            </h1>
            <div className="mt-6 text-sm md:text-base text-white/60">
              스크롤하면 영상이 펼쳐집니다 ↓
            </div>
          </div>
        </div>

        {/* Expanding video/image frame.
            Top-right small (initial) → fullscreen as --p goes 0 → 1 */}
        <div
          className="hero-frame absolute overflow-hidden bg-ink will-change-[width,height,top,right]"
          style={
            {
              top: "calc(72px * (1 - var(--p, 0)))",
              right: "calc(32px * (1 - var(--p, 0)))",
              width: "calc(32vw + (100vw - 32vw) * var(--p, 0))",
              height: "calc(22vh + (100svh - 22vh) * var(--p, 0))",
              borderRadius: "calc(8px * (1 - var(--p, 0)))",
            } as React.CSSProperties
          }
        >
          {SLIDES.map((s, i) => (
            <div
              key={s.client + i}
              className={[
                "absolute inset-0 transition-opacity duration-1000 ease-out",
                i === idx ? "opacity-100" : "opacity-0",
              ].join(" ")}
            >
              <Image
                src={s.img}
                alt={`${s.client} — ${s.project}`}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>
          ))}

          {/* Tiny "NEXT/PLAY" label inside the small thumbnail, fades on expansion */}
          <div
            className="absolute left-3 bottom-2 text-[10px] tracking-[0.18em] uppercase text-white/80 pointer-events-none"
            style={
              { opacity: "calc(1 - var(--p, 0) * 2.5)" } as React.CSSProperties
            }
          >
            ▸ Showreel
          </div>
        </div>

        {/* Bottom-left caption: visible only when fully expanded */}
        <div
          className="absolute left-5 md:left-10 lg:left-20 bottom-20 md:bottom-24 z-10"
          style={
            { opacity: "calc((var(--p, 0) - 0.78) * 5)" } as React.CSSProperties
          }
        >
          <div className="text-[11px] tracking-[0.2em] uppercase text-white/70">
            {String(idx + 1).padStart(2, "0")} /{" "}
            {String(SLIDES.length).padStart(2, "0")}
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
          style={
            { opacity: "calc((var(--p, 0) - 0.78) * 5)" } as React.CSSProperties
          }
        >
          → View Our All Work
        </Link>

        {/* Bottom-right pagination dots */}
        <div
          className="absolute bottom-8 right-5 md:right-10 lg:right-20 z-10 hidden md:flex gap-2"
          style={
            { opacity: "calc((var(--p, 0) - 0.78) * 5)" } as React.CSSProperties
          }
        >
          {SLIDES.map((_, i) => (
            <button
              key={i}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setIdx(i)}
              className={[
                "h-0.5 transition-all",
                i === idx
                  ? "w-8 bg-white"
                  : "w-4 bg-white/40 hover:bg-white/70",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
