import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "아크브랜딩 | Arc Branding",
  description:
    "새로운 경험을 설계하고 브랜드의 가능성을 바꿉니다. 아크브랜딩은 데이터와 크리에이티브로 브랜드 경험을 만드는 광고 에이전시입니다.",
  keywords: ["아크브랜딩", "광고대행사", "브랜드 컨설팅", "크리에이티브 에이전시"],
  openGraph: {
    title: "아크브랜딩 | Arc Branding",
    description: "새로운 경험을 설계하고 브랜드의 가능성을 바꿉니다.",
    url: "https://arcbranding.com",
    siteName: "아크브랜딩",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full font-sans bg-white text-black">
        <SmoothScroll />
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
