import Image from "next/image";
import Link from "next/link";
import CompanySection from "@/components/sections/CompanySection";

const HISTORY = [
  { year: "2018", body: "아크브랜딩 서울에서 출발 — 첫 브랜드 파트너 5개사 확보" },
  { year: "2019", body: "Spikes Asia 브론즈 — 첫 글로벌 어워드 수상" },
  { year: "2020", body: "데이터·인사이트팀 신설, 통합 마케팅 솔루션 라인업 확장" },
  { year: "2022", body: "디지털 크리에이티브 스튜디오 'Arc Lab' 분사" },
  { year: "2024", body: "누적 100개 브랜드 파트너 돌파, 연간 캠페인 120건 운영" },
  { year: "2025", body: "도쿄·LA 위성 스튜디오 오픈 — 글로벌 파트너십 확장" },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-28 md:pt-32 pb-24 bg-white text-black">
        <div className="grid-padding">
          <div className="text-[11px] tracking-[0.25em] uppercase text-black/50 mb-6">
            About / Our Story
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-balance max-w-4xl">
            데이터와 크리에이티브가
            <br />
            만나는 곳, 아크브랜딩.
          </h1>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <p className="lg:col-span-7 text-base md:text-lg leading-relaxed text-black/75">
              아크브랜딩은 데이터 기반의 인사이트와 경계를 넘는 크리에이티브로
              브랜드의 다음 장면을 설계합니다. 패션, 모빌리티, F&B, 라이프스타일을
              아우르는 100여 곳의 파트너와 함께 브랜드 정체성, 캠페인, 디지털
              경험까지 통합적으로 만들어 왔습니다.
            </p>
            <div className="lg:col-span-5 relative aspect-[4/3] overflow-hidden rounded-sm bg-black/5">
              <Image
                src="https://picsum.photos/seed/about-hero/900/680"
                alt="Our team"
                fill
                sizes="(min-width:1024px) 40vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <CompanySection />

      <section className="bg-white text-black py-24 md:py-32">
        <div className="grid-padding">
          <div className="text-[11px] tracking-[0.25em] uppercase text-black/50 mb-6">
            History
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-16">
            우리가 걸어온 길.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 gap-x-6">
            {HISTORY.map((h) => (
              <div key={h.year} className="md:col-span-6 lg:col-span-4 border-t border-black/15 pt-5">
                <div className="text-2xl md:text-3xl font-black tracking-tight">
                  {h.year}
                </div>
                <p className="mt-3 text-sm md:text-base text-black/70 leading-relaxed">
                  {h.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-base font-medium hover:opacity-60 transition-opacity"
            >
              → View Our Work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
