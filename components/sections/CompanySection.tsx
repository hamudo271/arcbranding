"use client";

import AnimatedNumber from "@/components/ui/AnimatedNumber";

type Stat = {
  label: string;
  value: number;
  suffix?: string;
  format?: (n: number) => string;
};

const STATS: Stat[] = [
  {
    label: "매출액 (24년 기준)",
    value: 248,
    suffix: "억원",
    format: (n) => Math.round(n).toLocaleString("en-US"),
  },
  {
    label: "영업이익 (24년 기준)",
    value: 38,
    suffix: "억원",
    format: (n) => Math.round(n).toLocaleString("en-US"),
  },
  {
    label: "임직원 수",
    value: 142,
    suffix: "명",
  },
  {
    label: "누적 브랜드 파트너",
    value: 102,
    suffix: "곳",
  },
  {
    label: "수상 실적",
    value: 38,
    suffix: "건",
  },
];

export default function CompanySection() {
  return (
    <section className="bg-ink text-white py-24 md:py-32">
      <div className="grid-padding">
        <div className="text-[11px] tracking-[0.25em] uppercase text-white/50">
          Company Information
        </div>
        <h2 className="mt-6 text-2xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance">
          브랜드를 성장시키는 힘,
          <br />
          숫자와 규모부터 다릅니다.
        </h2>

        <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-10">
          {STATS.map((s) => (
            <div key={s.label} className="border-t border-white/25 pt-4">
              <div className="text-[11px] tracking-[0.05em] text-white/55 mb-4 md:mb-6 leading-snug">
                {s.label}
              </div>
              <div className="font-bold leading-none text-3xl md:text-4xl lg:text-5xl whitespace-nowrap">
                <AnimatedNumber value={s.value} format={s.format} />
                {s.suffix && (
                  <span className="ml-1 text-base md:text-lg lg:text-xl font-medium text-white/80">
                    {s.suffix}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
