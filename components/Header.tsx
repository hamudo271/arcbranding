"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BRAND } from "@/data/brand";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const NAV: NavItem[] = [
  {
    label: "Work",
    href: "/work",
    children: [
      { label: "Recent", href: "/work" },
      { label: "Highlight", href: "/work#highlight" },
      { label: "Awards", href: "/work#awards" },
    ],
  },
  {
    label: "Expertise",
    href: "#",
    children: [
      { label: "Business Solutions", href: "#service" },
      { label: "Network", href: "#network" },
      { label: "Our Clients", href: "#" },
    ],
  },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Story", href: "/about" },
      { label: "인재채용", href: "#" },
      { label: "Press", href: "#" },
      { label: "IR", href: "#" },
      { label: "Magazine", href: "#" },
    ],
  },
  {
    label: "Values",
    href: "#",
    children: [
      { label: "ESG", href: "#" },
      { label: "CSR", href: "#" },
      { label: "Partnership", href: "#" },
      { label: "공정거래자율준수", href: "#" },
      { label: "안전경영", href: "#" },
      { label: "윤리경영", href: "#" },
      { label: "비윤리 행위 신고", href: "#" },
    ],
  },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const pathname = usePathname();
  const hasDarkHero = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState<"KOR" | "ENG">("KOR");
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      // hide on scroll down past 200, show on scroll up
      if (y > 200 && y > lastY.current) setHidden(true);
      else setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const onLeaveNav = () => setOpenIdx(null);

  const isHeaderLight = openIdx !== null || scrolled || !hasDarkHero;

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          hidden ? "-translate-y-full" : "translate-y-0",
          isHeaderLight
            ? "bg-white text-black shadow-[0_1px_0_rgba(0,0,0,0.06)]"
            : "bg-transparent text-white",
        ].join(" ")}
        onMouseLeave={onLeaveNav}
      >
        <div className="grid-padding flex h-16 lg:h-20 items-center justify-between">
          <Link href="/" aria-label={`${BRAND.name} 홈`} className="inline-flex items-center">
            {BRAND.logoType === "image" ? (
              <Image
                src={isHeaderLight ? BRAND.logoPath.black : BRAND.logoPath.white}
                alt={`${BRAND.name} 로고`}
                height={32}
                width={160}
                priority
                className="h-8 w-auto"
              />
            ) : (
              <span
                className="font-extrabold"
                style={{
                  fontSize: "20px",
                  letterSpacing: "-0.02em",
                  color: isHeaderLight ? "#000000" : "#FFFFFF",
                }}
              >
                {BRAND.name}
              </span>
            )}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {NAV.map((item, i) => (
              <div
                key={item.label}
                className="relative py-6"
                onMouseEnter={() => setOpenIdx(item.children ? i : null)}
              >
                <Link
                  href={item.href}
                  className="text-sm font-medium tracking-wide hover:opacity-60 transition-opacity"
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3 lg:gap-4">
            <button
              aria-label="Search"
              className="hidden md:inline-flex items-center justify-center w-8 h-8 hover:opacity-60 transition-opacity"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
            <div className="hidden md:flex items-center text-xs font-semibold tracking-wider">
              <button
                onClick={() => setLang("KOR")}
                className={lang === "KOR" ? "opacity-100" : "opacity-40 hover:opacity-70"}
              >
                KOR
              </button>
              <span className="mx-1 opacity-30">/</span>
              <button
                onClick={() => setLang("ENG")}
                className={lang === "ENG" ? "opacity-100" : "opacity-40 hover:opacity-70"}
              >
                ENG
              </button>
            </div>
            <button
              aria-label="Menu"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden flex flex-col gap-1 w-8 h-8 items-center justify-center"
            >
              <span className="block w-5 h-0.5 bg-current" />
              <span className="block w-5 h-0.5 bg-current" />
            </button>
          </div>
        </div>

        {/* Dropdown panel (desktop) */}
        {openIdx !== null && NAV[openIdx].children && (
          <div className="hidden lg:block absolute left-0 right-0 top-full bg-white border-t border-black/5 text-black">
            <div className="grid-padding py-8 flex justify-center gap-12">
              {NAV[openIdx].children!.map((c) => (
                <Link
                  key={c.label}
                  href={c.href}
                  className="text-sm font-medium hover:opacity-50 transition-opacity"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Overlay behind dropdown */}
      {openIdx !== null && (
        <div className="hidden lg:block fixed inset-0 bg-black/50 z-40" />
      )}

      {/* Mobile menu */}
      <div
        className={[
          "lg:hidden fixed inset-0 z-[60] bg-white text-black transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <div className="grid-padding flex h-16 items-center justify-between">
          {BRAND.logoType === "image" ? (
            <Image
              src={BRAND.logoPath.black}
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
          <button
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="w-8 h-8 flex items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <nav className="grid-padding pt-6 flex flex-col gap-1">
          {NAV.map((item) => (
            <div key={item.label} className="border-b border-black/10 py-4">
              <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block text-2xl font-bold"
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                  {item.children.map((c) => (
                    <Link
                      key={c.label}
                      href={c.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-sm text-black/60"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
