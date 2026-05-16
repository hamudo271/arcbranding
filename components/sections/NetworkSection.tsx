"use client";

import Link from "next/link";
import NetworkDiagram from "@/components/ui/NetworkDiagram";

export default function NetworkSection() {
  return (
    <section id="network" className="bg-ink-2 text-white py-24 md:py-32">
      <div className="grid-padding grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <div className="text-[11px] tracking-[0.25em] uppercase text-white/50">
            Global Network
          </div>
          <h2 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance">
            세계 어디서나
            <br />
            브랜드의 가능성을
            <br />
            실현합니다.
          </h2>
          <p className="mt-6 text-sm md:text-base text-white/65 leading-relaxed max-w-md">
            서울 본사와 도쿄·LA 위성 스튜디오, 그리고 전 세계 100여 곳의 브랜드
            파트너와 협업하며 지역의 결을 살린 크리에이티브를 전합니다.
          </p>
          <Link
            href="#"
            className="inline-flex mt-10 text-base font-medium hover:opacity-60 transition-opacity"
          >
            → View Our Partners
          </Link>
        </div>

        <div className="lg:col-span-7">
          <NetworkDiagram />
        </div>
      </div>
    </section>
  );
}
