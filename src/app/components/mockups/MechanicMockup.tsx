import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Wrench, Car, AlertTriangle, CheckCircle, Activity } from "lucide-react";

export function MechanicMockup() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (step === 0) {
      timeout = setTimeout(() => setStep(1), 1000); // Start scan
    } else if (step === 1) {
      timeout = setTimeout(() => setStep(2), 2500); // Scan complete, show fault
    } else if (step === 2) {
      timeout = setTimeout(() => setStep(3), 2000); // Highlight fix action
    } else if (step === 3) {
      timeout = setTimeout(() => setStep(0), 1500); // Reset
    }

    return () => clearTimeout(timeout);
  }, [step]);

  return (
    <div className="w-full h-full bg-[#111111] relative overflow-hidden flex items-center justify-center p-4 group-hover:scale-105 transition-transform duration-700">
      
      {/* Background Decor (Industrial Gradients) */}
      <div className="absolute top-[-20%] left-[-20%] w-64 h-64 bg-orange-600/10 rounded-full blur-[60px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-zinc-600/20 rounded-full blur-[80px]" />

      {/* Rugged Phone Frame */}
      <div className="w-[220px] h-[340px] bg-[#1C1C1E] rounded-[24px] shadow-2xl border-[3px] border-[#333333] relative overflow-hidden flex flex-col z-10 box-border ring-4 ring-[#111111]">
        
        {/* App Header */}
        <div className="pt-6 pb-3 px-4 flex justify-between items-center z-20 bg-[#242426] border-b border-[#333333]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-orange-500 flex items-center justify-center shadow-[0_0_10px_rgba(249,115,22,0.3)]">
              <Wrench size={12} className="text-black" />
            </div>
            <span className="font-black text-white tracking-tight text-xs uppercase">Torque</span>
          </div>
          <div className="w-6 h-6 rounded-md bg-[#333333] flex items-center justify-center relative">
            <AlertTriangle size={12} className="text-orange-500" />
            <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
          </div>
        </div>

        {/* Diagnostic Area */}
        <div className="flex-1 p-3 flex flex-col items-center gap-3 relative">
          
          <div className="w-full bg-[#242426] rounded-xl p-3 border border-[#333333] relative overflow-hidden flex flex-col items-center">
            <span className="text-zinc-500 text-[9px] font-bold tracking-wider uppercase w-full text-left mb-2">Active Bay: 04</span>
            
            {/* Car Wireframe / Scan Animation */}
            <div className="w-24 h-16 relative flex items-center justify-center my-2">
              <Car size={40} className="text-zinc-600" />
              
              {/* Scanning Laser */}
              {step === 1 && (
                <motion.div 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 20, opacity: 1 }}
                  transition={{ repeat: Infinity, duration: 1, repeatType: "reverse", ease: "linear" }}
                  className="absolute w-32 h-[2px] bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,1)]"
                />
              )}
            </div>

            {/* Diagnostic Status */}
            <div className="w-full flex items-center justify-between bg-[#1C1C1E] p-2 rounded-lg mt-2 border border-[#333333]">
              <div className="flex items-center gap-2">
                {step === 0 || step === 1 ? (
                  <Activity size={12} className="text-orange-500 animate-pulse" />
                ) : (
                  <CheckCircle size={12} className="text-green-500" />
                )}
                <span className="text-white text-[10px] font-bold">
                  {step === 0 ? "Ready" : step === 1 ? "Scanning OBD-II" : "Diagnostics Complete"}
                </span>
              </div>
            </div>
          </div>

          {/* Alert / Fault Code Section */}
          <div className="w-full flex-1 flex flex-col gap-2">
            <span className="text-zinc-500 text-[9px] font-bold tracking-wider uppercase">System Alerts</span>
            
            <AnimatePresence>
              {step >= 2 && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="w-full bg-[#2A1515] border border-red-500/30 rounded-lg p-3 relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-red-400 font-bold text-[10px]">P0300</span>
                    <span className="text-red-400/50 text-[8px] bg-red-500/10 px-1 rounded">High Priority</span>
                  </div>
                  <h4 className="text-white text-[11px] font-bold mb-1">Cylinder Misfire Detected</h4>
                  <p className="text-zinc-400 text-[8px] leading-tight">Ignition coil C requires inspection. Recommend spark plug replacement.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {step >= 3 && (
                <motion.button 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full mt-auto bg-orange-500 hover:bg-orange-600 transition-colors rounded-lg py-2 text-black font-black text-[10px] uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Wrench size={12} />
                  Order Parts
                </motion.button>
              )}
            </AnimatePresence>

          </div>

        </div>
      </div>
    </div>
  );
}
