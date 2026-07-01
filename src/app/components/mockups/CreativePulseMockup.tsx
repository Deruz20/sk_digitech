import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PenTool, Palette, Layers, Sparkles } from "lucide-react";

export function CreativePulseMockup() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (step === 0) {
      timeout = setTimeout(() => setStep(1), 500); // Intro
    } else if (step === 1) {
      timeout = setTimeout(() => setStep(2), 2000); // Grid load
    } else if (step === 2) {
      timeout = setTimeout(() => setStep(3), 2500); // Color shift
    } else if (step === 3) {
      timeout = setTimeout(() => setStep(0), 1500); // Reset
    }

    return () => clearTimeout(timeout);
  }, [step]);

  return (
    <div className="w-full h-full bg-[#E8E6E1] relative overflow-hidden flex flex-col items-center justify-center p-4 group-hover:scale-105 transition-transform duration-700">
      
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-20%] w-80 h-80 bg-pink-500/10 rounded-full blur-[80px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]" />

      {/* iPad Landscape Frame */}
      <div className="relative flex flex-col items-center mt-2 w-[95%] max-w-[360px] z-10 shadow-2xl rounded-[28px] border-[2px] border-[#e0e0e0] bg-white ring-8 ring-[#111]">
        
        {/* iPad Screen */}
        <div className="w-full aspect-[4/3] bg-[#FAFAFA] rounded-[20px] relative overflow-hidden flex flex-col">
          
          {/* Webcam dot */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#222] rounded-full z-30" />

          {/* App Content */}
          <div className="flex-1 flex flex-col ml-4 relative z-10">
            
            {/* Header */}
            <div className="flex items-center justify-between p-4 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center shadow-md">
                  <Palette size={14} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-gray-900 text-xs tracking-tight leading-tight">Creative Pulse</span>
                  <span className="font-medium text-gray-400 text-[8px] uppercase tracking-widest">Workspace</span>
                </div>
              </div>
              <div className="flex gap-2 mr-2">
                <div className="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                  <Layers size={10} className="text-gray-600" />
                </div>
                <div className="w-6 h-6 rounded-md bg-gray-900 flex items-center justify-center shadow-sm">
                  <PenTool size={10} className="text-white" />
                </div>
              </div>
            </div>

            {/* Canvas / Masonry Grid Area */}
            <div className="flex-1 p-4 pt-0 grid grid-cols-3 gap-3 overflow-hidden">
              
              {/* Main Canvas Piece */}
              <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden bg-gray-100 shadow-inner group">
                <AnimatePresence>
                  {step >= 1 && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"
                    >
                      <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]" />
                      
                      {/* Animated vector blob inside */}
                      {step >= 2 && (
                        <motion.div 
                          initial={{ borderRadius: "50%", scale: 0.8, rotate: 0 }}
                          animate={{ borderRadius: ["50%", "30% 70% 70% 30% / 30% 30% 70% 70%", "50%"], scale: 1.1, rotate: 90 }}
                          transition={{ duration: 2, ease: "easeInOut" }}
                          className="absolute inset-4 bg-gradient-to-tl from-yellow-400 to-orange-500 shadow-2xl mix-blend-screen opacity-80"
                        />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Small grid items */}
              <div className="col-span-1 row-span-1 rounded-xl overflow-hidden bg-gray-100 relative">
                {step >= 1 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="absolute inset-0 bg-gradient-to-tr from-emerald-400 to-cyan-400"
                  />
                )}
              </div>

              <div className="col-span-1 row-span-1 rounded-xl overflow-hidden bg-gray-100 relative">
                {step >= 1 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="absolute inset-0 bg-gradient-to-bl from-rose-400 to-orange-400"
                  />
                )}
              </div>

              <div className="col-span-3 h-12 rounded-xl overflow-hidden bg-white border border-gray-200 flex items-center px-4 justify-between mt-1">
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1">
                  <Sparkles size={10} className="text-yellow-500" /> Generating Palette
                </span>
                <div className="flex gap-1.5">
                  {step >= 2 && (
                    <>
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }} className="w-4 h-4 rounded-full bg-indigo-500" />
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} className="w-4 h-4 rounded-full bg-pink-500" />
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} className="w-4 h-4 rounded-full bg-orange-400" />
                    </>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
