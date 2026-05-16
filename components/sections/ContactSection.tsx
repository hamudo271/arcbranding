"use client";

import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { BRAND } from "@/data/brand";

export default function ContactSection() {
  const ref = useRef<HTMLElement | null>(null);
  registerGsap();

  useGSAP(
    () => {
      // Line-by-line slide-up (only non-image spans)
      const lines = gsap.utils.toArray<HTMLElement>(".ct-line > span:not(.ct-inline)");
      gsap.set(lines, { yPercent: 110 });
      gsap.to(lines, {
        yPercent: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
        },
      });

      // Clip-path reveal for inline image + image scale
      const inline = ref.current?.querySelector(".ct-inline");
      const inlineImg = inline?.querySelector("img");
      if (inline && inlineImg) {
        gsap.set(inline, { clipPath: "inset(0 100% 0 0)" });
        gsap.set(inlineImg, { scale: 1.25 });
        gsap.to(inline, {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 60%" },
        });
        gsap.to(inlineImg, {
          scale: 1,
          duration: 1.6,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 60%" },
        });
        gsap.to(inlineImg, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }

      gsap.from(".ct-meta", {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.15,
        delay: 0.3,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 60%",
        },
      });
    },
    { scope: ref }
  );

  return (
    <section
      id="contact"
      ref={ref}
      className="bg-ink text-white py-28 md:py-40"
    >
      <div className="grid-padding">
        <div className="text-[11px] tracking-[0.25em] uppercase text-white/50 mb-10">
          Contact
        </div>

        <h2 className="font-bold leading-[1.1] tracking-tight text-3xl md:text-5xl lg:text-6xl text-balance">
          <div className="ct-line overflow-hidden mb-2">
            <span className="inline-block">함께하세요.</span>
          </div>
          <div className="ct-line overflow-hidden mb-2 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="inline-block">브랜드 경험이</span>
            <span className="ct-inline relative inline-block w-[160px] h-[60px] md:w-[260px] md:h-[96px] lg:w-[320px] lg:h-[110px] overflow-hidden rounded-md align-middle">
              <Image
                src="https://picsum.photos/seed/contact-frame/600/220"
                alt=""
                fill
                sizes="(min-width:1024px) 320px, (min-width:768px) 260px, 160px"
                className="object-cover"
              />
            </span>
          </div>
          <div className="ct-line overflow-hidden mb-2">
            <span className="inline-block">달라지면</span>
          </div>
          <div className="ct-line overflow-hidden">
            <span className="inline-block">모든 것이 달라집니다.</span>
          </div>
        </h2>

        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="ct-meta">
            <div className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-2">
              Address
            </div>
            <Link
              href={`https://maps.google.com/?q=${encodeURIComponent(BRAND.address)}`}
              target="_blank"
              className="text-base md:text-lg leading-relaxed hover:opacity-70 transition-opacity"
            >
              {BRAND.address} ↗
            </Link>
            <div className="text-[11px] tracking-[0.2em] uppercase text-white/40 mt-8 mb-2">
              Phone
            </div>
            <a
              href={`tel:${BRAND.phone.replace(/[^0-9+]/g, "")}`}
              className="text-base md:text-lg hover:opacity-70 transition-opacity"
            >
              {BRAND.phone}
            </a>
          </div>

          <div className="ct-meta md:justify-self-end">
            <Link
              href={`mailto:${BRAND.email}`}
              className="inline-flex items-center gap-3 rounded-full border border-white/80 px-7 py-4 md:px-9 md:py-5 text-base md:text-lg font-medium hover:bg-white hover:text-ink transition-colors"
            >
              Get On Board
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
