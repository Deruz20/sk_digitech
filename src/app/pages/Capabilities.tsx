import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ServicesSection } from "../components/ServicesSection";
import { ProcessSection } from "../components/ProcessSection";
import { SupportParticleEngine } from "../utils/SupportParticleEngine";

export function Capabilities() {
  const fullText = "End-to-End Digital Excellence.";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [engine, setEngine] = useState<SupportParticleEngine | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
        if (canvasRef.current && !engine) {
          const newEngine = new SupportParticleEngine(canvasRef.current);
          setEngine(newEngine);
        }
    }, 100);
    return () => {
      clearTimeout(timer);
      if (engine) engine.destroy();
    };
  }, [engine]);

  return (
    <div className="flex flex-col bg-[#F5F5F7] relative overflow-hidden">
      
      {/* Cinematic Glowing Orbs */}
      <motion.div 
        animate={{ 
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-[-10%] w-[40vw] h-[40vw] bg-[#E91E63]/10 rounded-full blur-[100px] pointer-events-none z-0"
      />
      <motion.div 
        animate={{ 
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.5, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] bg-[#5A53C8]/10 rounded-full blur-[100px] pointer-events-none z-0"
      />
      <motion.div 
        animate={{ 
          x: [0, 50, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[10%] left-[30%] w-[30vw] h-[30vw] bg-[#F7A521]/10 rounded-full blur-[100px] pointer-events-none z-0"
      />

      {/* Premium Canvas Particle Engine Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-100 mix-blend-multiply">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <section className="pt-28 pb-4 px-4 md:px-8 max-w-[1400px] mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center text-center"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block px-5 py-2 rounded-full border border-gray-200 text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-8 bg-white/60 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
          >
            Capabilities
          </motion.div>
          
          <h1 className="text-[56px] md:text-[80px] font-black font-['Space_Grotesk'] tracking-tight leading-[1] mb-8 min-h-[160px] md:min-h-[100px] flex items-center justify-center flex-wrap max-w-5xl">
            <span>
              {fullText.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.04 + 0.3, ease: "easeOut" }}
                  style={{
                    background: "linear-gradient(135deg, #F7A521 0%, #E91E63 50%, #5A53C8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {char}
                </motion.span>
              ))}
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
                className="inline-block w-[6px] h-[0.75em] ml-3 align-middle rounded-full shadow-[0_0_15px_rgba(233,30,99,0.5)]"
                style={{ background: "linear-gradient(to bottom, #F7A521, #E91E63)" }}
              />
            </span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
            className="text-[18px] md:text-[20px] text-gray-600 font-['Inter'] max-w-3xl mx-auto drop-shadow-sm"
          >
            From deep-tech engineering and AI orchestration to immersive digital experiences, we build the infrastructure of tomorrow.
          </motion.p>
        </motion.div>
      </section>

      <div className="relative z-10 pb-8">
        <ServicesSection />
      </div>
      
      <div className="relative z-10 pb-20">
        <ProcessSection />
      </div>
    </div>
  );
}
