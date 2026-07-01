import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function SignatureSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Cinematic scroll reveals
  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.5], [0, 1, 1, 0]);
  const scale1 = useTransform(scrollYProgress, [0, 0.4], [0.95, 1.05]);

  const opacity2 = useTransform(scrollYProgress, [0.3, 0.5, 0.7, 0.8], [0, 1, 1, 0]);
  const scale2 = useTransform(scrollYProgress, [0.3, 0.7], [0.95, 1.05]);

  const opacity3 = useTransform(scrollYProgress, [0.6, 0.8, 1, 1], [0, 1, 1, 1]);
  const scale3 = useTransform(scrollYProgress, [0.6, 1], [0.95, 1]);

  return (
    <section
      ref={containerRef}
      id="signature"
      className="relative w-full"
      style={{
        background: "#050505",
        height: "300vh", // long scroll
      }}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Abstract background glow */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(247,165,33,0.1) 0%, transparent 60%)"
          }}
        />

        {/* First Statement */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          style={{ opacity: opacity1, scale: scale1 }}
        >
          <h2 style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(32px, 8vw, 100px)",
            color: "#FFFFFF",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            textTransform: "uppercase"
          }}>
            Most agencies<br/>build pages.
          </h2>
        </motion.div>

        {/* Second Statement */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          style={{ opacity: opacity2, scale: scale2 }}
        >
          <h2 style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(48px, 10vw, 120px)",
            color: "#F7A521", // Brand accent
            letterSpacing: "-0.03em",
            lineHeight: 1,
            textTransform: "uppercase"
          }}>
            We build systems.
          </h2>
        </motion.div>

        {/* Third Statement */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          style={{ opacity: opacity3, scale: scale3 }}
        >
          <h2 style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(32px, 6vw, 80px)",
            color: "#FFFFFF",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            textTransform: "uppercase",
            marginBottom: "40px"
          }}>
            Systems generate leads.<br/>
            Systems automate operations.<br/>
            Systems create growth.
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(16px, 2vw, 24px)",
            color: "rgba(255,255,255,0.6)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 500
          }}>
            Designed for Humans. Engineered for Scale.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
