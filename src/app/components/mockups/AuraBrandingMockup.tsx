import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Type, Droplet, LayoutTemplate } from "lucide-react";

export function AuraBrandingMockup() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (step === 0) {
      timeout = setTimeout(() => setStep(1), 500); // Intro
    } else if (step === 1) {
      timeout = setTimeout(() => setStep(2), 2000); // Colors pop
    } else if (step === 2) {
      timeout = setTimeout(() => setStep(3), 2500); // Typography pop
    } else if (step === 3) {
      timeout = setTimeout(() => setStep(0), 2000); // Reset
    }

    return () => clearTimeout(timeout);
  }, [step]);

  return (
    <div className="w-full h-full bg-[#110A1F] relative overflow-hidden flex flex-col items-center justify-center p-4 group-hover:scale-105 transition-transform duration-700">
      
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-20%] w-80 h-80 bg-purple-600/20 rounded-full blur-[80px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-orange-500/10 rounded-full blur-[80px]" />

      {/* iPad Portrait Frame */}
      <div className="relative flex flex-col items-center mt-2 h-[95%] max-h-[380px] aspect-[3/4] z-10 shadow-2xl rounded-[28px] border-[2px] border-[#333] bg-[#0A0A0C] ring-4 ring-black">
        
        {/* iPad Screen */}
        <div className="w-full h-full bg-[#FAFAFA] rounded-[24px] relative overflow-hidden flex flex-col">
          
          {/* Webcam dot */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#222] rounded-full z-30" />

          {/* App Content - Branding Guidelines */}
          <div className="flex-1 flex flex-col relative z-10 overflow-hidden pt-6">
            
            <motion.div 
              animate={{ y: step >= 2 ? -60 : 0 }} 
              transition={{ duration: 1, ease: "easeInOut" }}
              className="flex flex-col h-[150%] px-5"
            >
              
              {/* Logo Presentation */}
              <div className="h-40 flex flex-col items-center justify-center border-b border-gray-100">
                <span className="text-[8px] font-bold tracking-[0.3em] text-gray-400 uppercase mb-4">Brand Identity</span>
                
                {step >= 1 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative"
                  >
                    <h1 className="text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-[#F7A521]">
                      AURA
                    </h1>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.5, duration: 1 }}
                      className="h-1 bg-gradient-to-r from-purple-600 to-[#F7A521] mt-2 rounded-full"
                    />
                  </motion.div>
                )}
              </div>

              {/* Color Palette */}
              <div className="py-6 border-b border-gray-100">
                <div className="flex items-center gap-1.5 mb-4">
                  <Droplet size={10} className="text-gray-400" />
                  <span className="text-[9px] font-bold text-gray-800 uppercase tracking-widest">Core Palette</span>
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                  <AnimatePresence>
                    {step >= 1 && (
                      <>
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="aspect-square rounded-xl bg-[#6B21A8] shadow-sm flex items-end p-1.5">
                          <span className="text-white text-[6px] font-medium opacity-80">Primary</span>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="aspect-square rounded-xl bg-[#9333EA] shadow-sm flex items-end p-1.5">
                          <span className="text-white text-[6px] font-medium opacity-80">Accent</span>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="aspect-square rounded-xl bg-[#F7A521] shadow-sm flex items-end p-1.5">
                          <span className="text-white text-[6px] font-medium opacity-80">Highlight</span>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="aspect-square rounded-xl bg-[#0F172A] shadow-sm flex items-end p-1.5">
                          <span className="text-white text-[6px] font-medium opacity-80">Dark</span>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Typography */}
              <div className="py-6">
                <div className="flex items-center gap-1.5 mb-4">
                  <Type size={10} className="text-gray-400" />
                  <span className="text-[9px] font-bold text-gray-800 uppercase tracking-widest">Typography</span>
                </div>
                
                <AnimatePresence>
                  {step >= 2 && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex flex-col gap-3"
                    >
                      <div className="flex items-end gap-3">
                        <span className="text-4xl font-black text-gray-900 leading-none">Aa</span>
                        <div className="flex flex-col pb-1">
                          <span className="text-[10px] font-bold text-gray-800 uppercase tracking-wider">Space Grotesk</span>
                          <span className="text-[8px] text-gray-500">Headings & Display</span>
                        </div>
                      </div>
                      
                      <div className="w-full h-px bg-gray-100 my-1" />
                      
                      <div className="flex items-end gap-3">
                        <span className="text-3xl font-medium text-gray-700 leading-none font-sans">Aa</span>
                        <div className="flex flex-col pb-1">
                          <span className="text-[10px] font-bold text-gray-800 uppercase tracking-wider">Inter</span>
                          <span className="text-[8px] text-gray-500">Body & UI Elements</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </motion.div>
          </div>

        </div>
      </div>

    </div>
  );
}
