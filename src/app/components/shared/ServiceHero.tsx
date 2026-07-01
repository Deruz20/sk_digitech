import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { MagneticButton } from "./MagneticButton";

interface ServiceHeroProps {
  headline: string;
  subhead: string;
  eyebrow: string;
  backgroundImage?: string;
  splineUrl?: string;
  accentColor?: string;
  ctas?: React.ReactNode;
  socialProof?: React.ReactNode;
}

export function ServiceHero({ headline, subhead, eyebrow, backgroundImage, splineUrl, accentColor = "var(--accent-1)", ctas, socialProof }: ServiceHeroProps) {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const words = headline.split(" ");

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden pt-32 pb-20 px-6"
    >
      {/* Background Image or Spline with Parallax */}
      {splineUrl ? (
        <div className="absolute inset-0 z-0 bg-black">
          <iframe 
            src={splineUrl} 
            title="3D Background Visualization"
            className="w-full h-full pointer-events-none border-0"
            loading="lazy"
          />
        </div>
      ) : backgroundImage ? (
        <motion.div
          className="absolute inset-0 z-0 bg-cover bg-center bg-[#0a0a0f]"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
            y: prefersReducedMotion ? 0 : y,
            opacity: prefersReducedMotion ? 1 : opacity
          }}
          role="img"
          aria-label="Hero background"
        />
      ) : null}

      {/* Overlays to ensure text contrast */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[var(--background)] via-[var(--background)]/80 to-[var(--background)]/30 pointer-events-none" />
      <div className="absolute inset-0 z-[2] bg-black/40 mix-blend-multiply pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center flex flex-col items-center mt-auto pt-20">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
          className="mb-8"
        >
          <span 
            className="font-['Syne'] text-[11px] font-semibold uppercase tracking-[0.15em] px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-md"
            style={{ color: accentColor }}
          >
            {eyebrow}
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="text-[clamp(40px, 5vw, 72px)] font-['Playfair_Display'] font-bold leading-[1.1] tracking-[-0.02em] mb-6 text-[var(--text-1)] max-w-4xl">
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
              <motion.span
                className="inline-block"
                initial={{ y: prefersReducedMotion ? 0 : "100%" }}
                animate={{ y: 0 }}
                transition={{ 
                  duration: 0.7, 
                  ease: [0.215, 0.61, 0.355, 1], 
                  delay: prefersReducedMotion ? 0 : 0.1 + (i * 0.05) 
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: prefersReducedMotion ? 0 : 0.4, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-[clamp(16px,2vw,20px)] font-['Syne'] text-[var(--text-2)] mb-10 max-w-2xl leading-[1.6]"
        >
          {subhead}
        </motion.p>

        {/* CTAs */}
        {ctas && (
          <motion.div
            initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: prefersReducedMotion ? 0 : 0.5, ease: [0.215, 0.61, 0.355, 1] }}
            className="flex flex-row flex-wrap justify-center items-center gap-4 w-full"
          >
            {ctas}
          </motion.div>
        )}
      </div>

      {/* Social Proof / Stats Strip (Placed at the bottom naturally) */}
      {socialProof && (
        <motion.div
          initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: prefersReducedMotion ? 0 : 0.6, ease: [0.215, 0.61, 0.355, 1] }}
          className="relative z-10 w-full max-w-5xl mx-auto mt-auto pt-16"
        >
          {socialProof}
        </motion.div>
      )}
    </section>
  );
}
