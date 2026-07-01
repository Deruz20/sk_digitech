import { AntigravityHero } from "../components/AntigravityHero";
import { VideoShowcase } from "../components/VideoShowcase";
import { TrustSection } from "../components/TrustSection";
import { ServicesSection } from "../components/ServicesSection";
import { ProcessSection } from "../components/ProcessSection";
import { AuraAISection } from "../components/AuraAISection";
import { TargetAudienceSection } from "../components/TargetAudienceSection";
import { NewsSection } from "../components/NewsSection";
import { CTASection } from "../components/CTASection";

export function Home() {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      <AntigravityHero />
      <VideoShowcase />
      <TrustSection />
      <ServicesSection />
      <ProcessSection />
      <AuraAISection />
      <TargetAudienceSection />
      <NewsSection />
      <CTASection />
    </div>
  );
}
