import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { MagneticButton } from "./ui/MagneticButton";
import { ArrowRight } from "lucide-react";
import { SupportParticleEngine } from "../utils/SupportParticleEngine";

export function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [engine, setEngine] = useState<SupportParticleEngine | null>(null);
  
  // Flashlight position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs to make the flashlight feel fluid
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (canvasRef.current && !engine) {
        const newEngine = new SupportParticleEngine(canvasRef.current);
        // Transform the particles into the SK logo shape
        newEngine.setShape('sk');
        setEngine(newEngine);
    }
    return () => {
        if (engine) {
            engine.destroy();
        }
    };
  }, [engine]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 md:px-10">
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative py-40 md:py-60 bg-[#050505] rounded-[40px] overflow-hidden flex flex-col items-center justify-center text-center shadow-2xl"
        >
          {/* Particle Engine Background (SK Logo Shape) */}
          <div className="absolute inset-0 z-0 opacity-60 pointer-events-none mix-blend-screen flex items-center justify-center">
              <canvas ref={canvasRef} className="w-full h-full" />
          </div>

          {/* Interactive Flashlight Effect */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-0 opacity-50"
            style={{
              background: `radial-gradient(600px circle at calc(${springX}px) calc(${springY}px), rgba(98,0,238,0.15), transparent 40%)`,
            }}
          />
          <motion.div
            className="pointer-events-none absolute inset-0 z-0 opacity-40 mix-blend-screen"
            style={{
              background: `radial-gradient(400px circle at calc(${springX}px) calc(${springY}px), rgba(255,95,0,0.1), transparent 40%)`,
            }}
          />

          <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center">
            <span className="text-[#FF5F00] font-['Inter'] text-sm uppercase tracking-widest font-semibold block mb-8">
              04 — Start Project
            </span>
            
            <h2 className="text-[50px] md:text-[90px] lg:text-[120px] leading-[0.9] font-medium font-['Space_Grotesk'] text-white tracking-tighter mb-16">
              let's build <br/> 
              <span className="text-gray-500 italic font-light">the impossible.</span>
            </h2>

            <MagneticButton>
              <div className="group relative flex items-center justify-center w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full bg-white text-[#111111] overflow-hidden transition-transform duration-500 hover:scale-95 shadow-2xl">
                {/* Background Hover Expansion */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#6200EE] to-[#FF5F00] translate-y-full rounded-full transition-transform duration-500 ease-out group-hover:translate-y-0" />
                
                <div className="relative z-10 flex flex-col items-center gap-2 group-hover:text-white transition-colors duration-300">
                  <ArrowRight size={32} className="-rotate-45 group-hover:rotate-0 transition-transform duration-500 ease-out" />
                  <span className="font-['Inter'] font-semibold text-lg md:text-xl uppercase tracking-widest mt-1">
                    Start
                  </span>
                </div>
              </div>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
