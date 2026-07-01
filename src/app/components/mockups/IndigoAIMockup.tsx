import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mic, Waves, Sparkles } from "lucide-react";

export function IndigoAIMockup() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (step === 0) {
      timeout = setTimeout(() => setStep(1), 1000); // Wake word
    } else if (step === 1) {
      timeout = setTimeout(() => setStep(2), 2000); // Processing
    } else if (step === 2) {
      timeout = setTimeout(() => setStep(3), 3000); // Response
    } else if (step === 3) {
      timeout = setTimeout(() => setStep(0), 1500); // Reset
    }

    return () => clearTimeout(timeout);
  }, [step]);

  return (
    <div className="w-full h-full bg-[#050510] relative overflow-hidden flex flex-col items-center justify-center p-4 group-hover:scale-105 transition-transform duration-700">
      
      {/* Background Decor */}
      <div className="absolute top-[20%] left-[20%] w-64 h-64 bg-indigo-600/20 rounded-full blur-[80px]" />
      <div className="absolute bottom-[-10%] right-[10%] w-80 h-80 bg-blue-600/20 rounded-full blur-[80px]" />

      {/* Macbook CSS Frame */}
      <div className="relative flex flex-col items-center mt-4 w-[90%] max-w-[320px] z-10">
        
        {/* Macbook Lid / Screen */}
        <div className="w-full aspect-[16/10] bg-black rounded-t-xl rounded-b-sm border-[4px] border-[#1a1a1a] relative overflow-hidden shadow-2xl flex flex-col">
          {/* Webcam */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#222] rounded-full z-30" />
          
          {/* Screen Content (Indigo AI) */}
          <div className="flex-1 bg-gradient-to-b from-[#0a0a1a] to-[#050510] relative flex flex-col items-center justify-center p-4 overflow-hidden">
            
            {/* Ambient waves */}
            {step >= 1 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="w-32 h-32 border border-indigo-500/20 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                <div className="absolute w-48 h-48 border border-blue-500/10 rounded-full animate-ping" style={{ animationDuration: '4s' }} />
              </motion.div>
            )}

            {/* AI Core Orb */}
            <div className="relative z-10 mb-6">
              <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-50" />
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-blue-600 shadow-[0_0_30px_rgba(99,102,241,0.6)] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(255,255,255,0.4),_transparent)]" />
                {step === 0 ? (
                  <Mic size={24} className="text-white/80" />
                ) : step === 1 ? (
                  <Waves size={24} className="text-white animate-pulse" />
                ) : (
                  <Sparkles size={24} className="text-white animate-spin" style={{ animationDuration: '4s' }} />
                )}
              </div>
            </div>

            {/* AI Text output */}
            <div className="h-12 flex items-center justify-center text-center z-10 px-4">
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.p key="0" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-indigo-200/50 text-[10px] uppercase tracking-widest font-bold">
                    Say "Hey Indigo"
                  </motion.p>
                )}
                {step === 1 && (
                  <motion.p key="1" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-white text-[12px] font-medium">
                    "Schedule a meeting with the design team..."
                  </motion.p>
                )}
                {step >= 2 && (
                  <motion.p key="2" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-indigo-300 text-[11px] leading-tight">
                    Meeting scheduled for <span className="text-white font-bold">Tomorrow at 10:00 AM</span>. Invites sent.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* Macbook Base */}
        <div className="w-[115%] h-3 bg-gradient-to-b from-[#b3b3b3] to-[#808080] rounded-t-sm rounded-b-xl relative shadow-2xl flex justify-center z-20">
          {/* Thumb indentation */}
          <div className="w-16 h-1 bg-[#666] rounded-b-md" />
        </div>
        {/* Bottom shadow */}
        <div className="w-[100%] h-4 bg-black/40 blur-md rounded-[100%] absolute -bottom-3 z-0" />

      </div>

    </div>
  );
}
