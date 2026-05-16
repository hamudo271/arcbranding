import HeroSection from "@/components/sections/HeroSection";
import BrandStatement from "@/components/sections/BrandStatement";
import ServiceSection from "@/components/sections/ServiceSection";
import CompanySection from "@/components/sections/CompanySection";
import NetworkSection from "@/components/sections/NetworkSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BrandStatement />
      <ServiceSection />
      <CompanySection />
      <NetworkSection />
      <ContactSection />
    </>
  );
}
