import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ShowreelSection } from "@/components/sections/ShowreelSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { WhySection } from "@/components/sections/WhySection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { MentorsSection } from "@/components/sections/MentorsSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { RegistrationSection } from "@/components/sections/RegistrationSection";
import { JsonLd } from "@/components/seo/JsonLd";

export default function HomePage() {
  return (
    <>
      <JsonLd type="organization" />
      <JsonLd type="course" />
      <JsonLd type="faq" />
      <JsonLd type="breadcrumb" />

      <Navigation />

      <main id="main-content">
        <HeroSection />
        <ShowreelSection />
        <AboutSection />
        <ProblemSection />
        <WhySection />
        <ExperienceSection />
        <MentorsSection />
        <PortfolioSection />
        <JourneySection />
        <TestimonialsSection />
        <FAQSection />
        <RegistrationSection />
      </main>

      <Footer />
    </>
  );
}
