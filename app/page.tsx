import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ShowreelSection } from "@/components/sections/ShowreelSection";
import { AcademySection } from "@/components/sections/AcademySection";
import { LaunchTimelineSection } from "@/components/sections/LaunchTimelineSection";
import { RegistrationSection } from "@/components/sections/RegistrationSection";
import { JsonLd } from "@/components/seo/JsonLd";

export default function HomePage() {
  return (
    <>
      <JsonLd type="organization" />
      <JsonLd type="website" />
      <JsonLd type="course" />
      <JsonLd type="breadcrumb" />

      <Navigation />

      <main id="main-content">
        <HeroSection />
        <ShowreelSection />
        <AcademySection />
        <LaunchTimelineSection />
        <RegistrationSection />
      </main>

      <Footer />
    </>
  );
}
