"use client";

import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";

export default function ServiceSection() {
  const ref = useRef<HTMLElement | null>(null);
  registerGsap();

  useGSAP(
    () => {
      // Line-by-line reveal (yPercent slide-up from overflow:hidden line)
      const lines = gsap.utils.toArray<HTMLElement>(".svc-line > span:not(.svc-inline)");
      gsap.set(lines, { yPercent: 110 });
      gsap.to(lines, {
        yPercent: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
        },
      });

      // Clip-path reveal (left → right) for the inline image
      const inline = ref.current?.querySelector(".svc-inline");
      const inlineImg = inline?.querySelector("img");
      if (inline && inlineImg) {
        gsap.set(inline, { clipPath: "inset(0 100% 0 0)" });
        gsap.set(inlineImg, { scale: 1.25 });
        gsap.to(inline, {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 60%",
          },
        });
        gsap.to(inlineImg, {
          scale: 1,
          duration: 1.6,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 60%",
          },
        });
        // Continuous parallax on the inline image
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

      // Label fade-in
      gsap.from(".svc-label", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        },
      });

      // CTA gentle rise
      gsap.from(".svc-cta", {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 55%",
        },
      });
    },
    { scope: ref }
  );

  return (
    <section
      id="service"
      ref={ref}
      className="relative bg-white text-black py-28 md:py-40"
    >
      <div className="grid-padding">
        <div className="svc-label text-[11px] tracking-[0.25em] uppercase text-black/50 mb-10">
          Business Solutions
        </div>

        <h2 className="font-bold leading-[1.15] tracking-tight text-3xl md:text-5xl lg:text-6xl text-balance">
          <div className="svc-line overflow-hidden mb-2">
            <span className="inline-block">방대한 데이터와 기술,</span>
          </div>
          <div className="svc-line overflow-hidden mb-2 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="inline-block">생각하지 못한</span>
            <span className="svc-inline relative inline-block w-[180px] h-[64px] md:w-[280px] md:h-[100px] lg:w-[340px] lg:h-[120px] overflow-hidden rounded-md align-middle">
              <Image
                src="https://picsum.photos/seed/who-we-are/600/220"
                alt="Who we are"
                fill
                sizes="(min-width:1024px) 340px, (min-width:768px) 280px, 180px"
                className="object-cover will-change-transform"
              />
            </span>
          </div>
          <div className="svc-line overflow-hidden mb-2">
            <span className="inline-block">크리에이티브로</span>
          </div>
          <div className="svc-line overflow-hidden">
            <span className="inline-block">새로운 브랜드 경험을 만듭니다.</span>
          </div>
        </h2>

        <div className="mt-14 svc-cta">
          <Link
            href="#"
            className="inline-flex items-center gap-2 text-base font-medium hover:opacity-60 transition-opacity"
          >
            → View Our Approach
          </Link>
        </div>
      </div>
    </section>
  );
}
