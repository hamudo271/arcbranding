"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";

export default function BrandStatement() {
  const ref = useRef<HTMLElement | null>(null);
  registerGsap();

  useGSAP(
    () => {
      // Line reveal for the slogan
      const lines = gsap.utils.toArray<HTMLElement>(".bs-line > span");
      gsap.set(lines, { yPercent: 110 });
      gsap.to(lines, {
        yPercent: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
        },
      });

      // Character-by-character reveal for the big display
      const chars = gsap.utils.toArray<HTMLElement>(".bs-char");
      gsap.set(chars, { yPercent: 100, opacity: 0 });
      gsap.to(chars, {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.07,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 55%",
        },
      });

      // Scroll-driven horizontal parallax sweep
      gsap.fromTo(
        ".bs-display-wrapper",
        { xPercent: 5 },
        {
          xPercent: -5,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        }
      );
    },
    { scope: ref }
  );

  const displayChars = Array.from("아크브랜딩");

  return (
    <section
      ref={ref}
      className="relative bg-white text-black min-h-screen flex flex-col justify-between py-20 md:py-28 overflow-hidden"
    >
      <div className="grid-padding">
        <div className="text-[11px] tracking-[0.25em] uppercase text-black/50 mb-6">
          We Are Arc Branding
        </div>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
          <div className="bs-line overflow-hidden">
            <span className="inline-block">새로운 경험을 설계하고</span>
          </div>
          <div className="bs-line overflow-hidden">
            <span className="inline-block">브랜드의 가능성을 바꿉니다.</span>
          </div>
        </h2>
      </div>

      <div className="bs-display-wrapper">
        <div
          className="bs-display font-black leading-[0.85] tracking-[-0.04em] text-center whitespace-nowrap overflow-hidden"
          style={{ fontSize: "clamp(72px, 18vw, 320px)" }}
        >
          {displayChars.map((c, i) => (
            <span
              key={i}
              className="bs-char inline-block"
              style={{ willChange: "transform, opacity" }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
