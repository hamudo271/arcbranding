import Image from "next/image";
import Link from "next/link";

const PROJECTS = [
  { client: "Aether Studio", project: "Spring Collection 2025", seed: "work-aether" },
  { client: "Lumen Mobility", project: "EV Identity System", seed: "work-lumen" },
  { client: "Onda Beverage", project: "Summer Brand Campaign", seed: "work-onda" },
  { client: "Niche Atelier", project: "Heritage Renewal", seed: "work-niche" },
  { client: "Vertex Capital", project: "Investor Day Film", seed: "work-vertex" },
  { client: "Bloom Pharmacy", project: "Wellness Rebrand", seed: "work-bloom" },
  { client: "Quill Press", project: "Digital Magazine Launch", seed: "work-quill" },
  { client: "Nordic Living", project: "Lifestyle Pavilion", seed: "work-nordic" },
  { client: "Arena FC", project: "Match Day Identity", seed: "work-arena" },
  { client: "Vivid Coffee", project: "Seasonal Menu Visual", seed: "work-vivid" },
  { client: "Ridge Outdoor", project: "Trail Series Film", seed: "work-ridge" },
  { client: "Maple Bank", project: "100th Anniversary", seed: "work-maple" },
];

export default function WorkPage() {
  return (
    <section className="pt-28 md:pt-32 pb-24 bg-white text-black">
      <div className="grid-padding">
        <div className="text-[11px] tracking-[0.25em] uppercase text-black/50 mb-6">
          Our Work
        </div>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-balance max-w-3xl">
          브랜드의 가능성을 바꾼
          <br />
          크리에이티브 아카이브.
        </h1>

        <div className="mt-10 flex flex-wrap gap-2">
          {["Recent", "Highlight", "Awards"].map((f, i) => (
            <Link
              key={f}
              href="#"
              className={[
                "text-xs md:text-sm px-4 py-2 rounded-full border transition-colors",
                i === 0
                  ? "bg-black text-white border-black"
                  : "border-black/15 hover:border-black",
              ].join(" ")}
            >
              {f}
            </Link>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {PROJECTS.map((p) => (
            <Link
              key={p.seed}
              href="#"
              className="group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-black/5">
                <Image
                  src={`https://picsum.photos/seed/${p.seed}/800/600`}
                  alt={`${p.client} — ${p.project}`}
                  fill
                  sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-3">
                <div>
                  <div className="text-[10px] tracking-[0.15em] uppercase text-black/50">
                    {p.client}
                  </div>
                  <div className="text-base md:text-lg font-semibold mt-1">
                    {p.project}
                  </div>
                </div>
                <span className="text-sm text-black/40 group-hover:text-black transition-colors">
                  ↗
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
