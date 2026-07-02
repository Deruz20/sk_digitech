import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ParticleStarfield } from "./ParticleStarfield";
import { ParticleLogoFormation } from "./ParticleLogoFormation";
import { ServiceMockupView, ServiceOverlay } from "./ServiceMockups";
import { SERVICE_SECTIONS } from "./types";

interface ServicesBillboardProps {
  isActive: boolean;
}

export const ServicesBillboard = ({ isActive }: ServicesBillboardProps) => {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [hasPlayedIntro, setHasPlayedIntro] = useState(false);
  const [introStarted, setIntroStarted] = useState(false);

  useEffect(() => {
    if (isActive && !introStarted) {
      setIntroStarted(true);
    }
  }, [isActive, introStarted]);

  const currentSection = SERVICE_SECTIONS[sectionIndex];
  const showIntro = introStarted && !hasPlayedIntro;

  // Cycle through service sections after intro completes
  useEffect(() => {
    if (!isActive) return;
    if (sectionIndex === 0 && !hasPlayedIntro) return;

    const duration = currentSection.durationMs;
    const timer = window.setTimeout(() => {
      setSectionIndex((prev) => {
        const next = (prev + 1) % SERVICE_SECTIONS.length;
        return next === 0 ? 1 : next;
      });
    }, duration);

    return () => clearTimeout(timer);
  }, [isActive, sectionIndex, currentSection.durationMs, hasPlayedIntro]);

  const handleIntroComplete = () => {
    setHasPlayedIntro(true);
    setSectionIndex(0);
  };

  const activeServiceId = hasPlayedIntro ? currentSection.id : null;

  return (
    <div className="services-billboard">
      {/* Particle starfield — always running */}
      <ParticleStarfield />

      <AnimatePresence mode="wait">
        {showIntro ? (
          <ParticleLogoFormation key="intro" onComplete={handleIntroComplete} />
        ) : (
          activeServiceId && (
            <motion.div
              key={activeServiceId}
              className="service-mockup-stage"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <ServiceMockupView sectionId={activeServiceId} />
            </motion.div>
          )
        )}
      </AnimatePresence>

      {/* Wordmark and tagline overlaid on top of canvas — always visible */}
    </div>
  );
};
