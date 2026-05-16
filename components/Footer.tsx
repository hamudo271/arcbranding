import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/data/brand";

const LEGAL_LINKS = [
  { label: "개인정보 처리방침", href: "#", bold: true },
  { label: "영상정보처리기기 운영·관리 방침", href: "#" },
  { label: "개인정보 보호정책", href: "#" },
  { label: "비윤리 행위 신고", href: "#" },
  { label: "공정거래 위반신고", href: "#" },
  { label: "공정거래파트너포털(WITH-I)", href: "#" },
  { label: "인재채용", href: "#" },
];

type SnsKey = "facebook" | "blog" | "youtube" | "instagram";

function SocialIcon({ name }: { name: SnsKey }) {
  const map: Record<SnsKey, React.ReactNode> = {
    facebook: (
      <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.5 1.5-1.5h1.7V4.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.3H7.5V14h2.7v8h3.3z" />
    ),
    blog: <path d="M5 4h14v3H5zM5 10.5h14v3H5zM5 17h14v3H5z" />,
    youtube: (
      <path d="M22 8.4c-.2-1.4-1.1-2.5-2.5-2.7C17.4 5.4 12 5.4 12 5.4s-5.4 0-7.5.3C3.1 5.9 2.2 7 2 8.4 1.7 10 1.7 12 1.7 12s0 2 .3 3.6c.2 1.4 1.1 2.5 2.5 2.7 2.1.3 7.5.3 7.5.3s5.4 0 7.5-.3c1.4-.2 2.3-1.3 2.5-2.7.3-1.6.3-3.6.3-3.6s0-2-.3-3.6zM10 15V9l5 3-5 3z" />
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="4" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </>
    ),
  };
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-label={name}
      className="hover:opacity-70 transition-opacity"
    >
      {map[name]}
    </svg>
  );
}

export default function Footer() {
  const snsEntries = (Object.entries(BRAND.sns) as [SnsKey, string][]).filter(
    ([, url]) => Boolean(url)
  );

  return (
    <footer className="bg-ink text-white py-12 md:py-16">
      <div className="grid-padding flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-3">
          {BRAND.logoType === "image" ? (
            <Image
              src={BRAND.logoPath.white}
              alt={`${BRAND.name} 로고`}
              height={28}
              width={140}
              className="h-7 w-auto"
            />
          ) : (
            <span
              className="font-extrabold"
              style={{ fontSize: "20px", letterSpacing: "-0.02em" }}
            >
              {BRAND.name}
            </span>
          )}
          <span className="text-xs text-white/50">{BRAND.copyright}</span>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 max-w-2xl">
          {LEGAL_LINKS.map((l, i) => (
            <span key={l.label} className="flex items-center gap-3">
              <Link
                href={l.href}
                className={[
                  "text-xs hover:opacity-80 transition-opacity",
                  l.bold ? "font-semibold text-white" : "text-white/60",
                ].join(" ")}
              >
                {l.label}
              </Link>
              {i < LEGAL_LINKS.length - 1 && (
                <span className="text-white/20 text-xs">|</span>
              )}
            </span>
          ))}
        </div>

        {snsEntries.length > 0 && (
          <div className="flex items-center gap-4">
            {snsEntries.map(([name, url]) => (
              <Link
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
              >
                <SocialIcon name={name} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}
