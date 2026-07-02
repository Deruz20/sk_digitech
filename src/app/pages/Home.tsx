import { lazy, Suspense, useRef, useState, useEffect } from "react";
import { AntigravityHero } from "../components/AntigravityHero";
import { TrustSection } from "../components/TrustSection";
import { ServicesSection } from "../components/ServicesSection";
import { ProcessSection } from "../components/ProcessSection";
import { AuraAISection } from "../components/AuraAISection";
import { TargetAudienceSection } from "../components/TargetAudienceSection";
import { NewsSection } from "../components/NewsSection";
import { CTASection } from "../components/CTASection";

const VideoShowcase = lazy(() => import("../components/VideoShowcase").then(module => ({ default: module.VideoShowcase })));

function LazyVideoWrapper() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" } // load before it comes into view
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ minHeight: "100vh" }}>
      {inView && (
        <Suspense fallback={null}>
          <VideoShowcase />
        </Suspense>
      )}
    </div>
  );
}

export function Home() {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      <AntigravityHero />
      <LazyVideoWrapper />
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
