import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GraduationCap, ArrowRight, BookOpen, Users } from "lucide-react";

export function EliteAcademyMockup() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (step === 0) {
      timeout = setTimeout(() => setStep(1), 500); // Trigger initial load
    } else if (step === 1) {
      timeout = setTimeout(() => setStep(2), 2500); // Show floating card
    } else if (step === 2) {
      timeout = setTimeout(() => setStep(3), 2500); // Hover button effect
    } else if (step === 3) {
      timeout = setTimeout(() => setStep(0), 1000); // Reset and loop
    }

    return () => clearTimeout(timeout);
  }, [step]);

  return (
    <div className="w-full h-full bg-[#f3f4f6] relative overflow-hidden flex flex-col p-4 group-hover:scale-105 transition-transform duration-700">
      
      {/* Background Decor */}
      <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-blue-400/20 rounded-full blur-[60px]" />
      <div className="absolute bottom-[-20%] left-[-10%] w-80 h-80 bg-yellow-400/20 rounded-full blur-[80px]" />

      {/* Macbook CSS Frame */}
      <div className="relative flex flex-col items-center mt-4 w-[90%] max-w-[340px] z-10">
        
        {/* Macbook Lid / Screen */}
        <div className="w-full aspect-[16/10] bg-[#f3f4f6] rounded-t-xl rounded-b-sm border-[4px] border-[#1a1a1a] relative overflow-hidden shadow-2xl flex flex-col">
          {/* Webcam */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#222] rounded-full z-30" />
          
          {/* Browser Window Chrome */}
          <div className="flex-1 bg-white flex flex-col overflow-hidden relative z-10">
        
        {/* Browser Top Bar */}
        <div className="h-8 bg-gray-50 border-b border-gray-200 flex items-center px-3 gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <div className="mx-auto w-1/2 h-4 bg-gray-200 rounded-md" />
        </div>

        {/* Webpage Content */}
        <div className="flex-1 relative flex flex-col">
          
          {/* Navbar */}
          <div className="h-12 border-b border-gray-100 flex items-center justify-between px-6 bg-white/80 backdrop-blur-sm z-20">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
                <GraduationCap size={14} className="text-white" />
              </div>
              <span className="font-bold text-gray-800 text-sm tracking-tight">ELITE</span>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-1.5 bg-gray-200 rounded-full" />
              <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
              <div className="w-10 h-1.5 bg-gray-200 rounded-full" />
            </div>
          </div>

          {/* Hero Section */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 relative overflow-hidden">
            
            {/* Animated Hero Text */}
            <AnimatePresence>
              {step >= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="text-center z-10 flex flex-col items-center"
                >
                  <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-tight mb-3">
                    Shape Your <br/>
                    <span className="text-blue-600 relative inline-block">
                      Future Today
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="absolute bottom-0 left-0 h-1.5 bg-yellow-400/60 rounded-full -z-10"
                      />
                    </span>
                  </h1>
                  <p className="text-gray-500 text-[11px] max-w-[220px] leading-relaxed mb-6">
                    Join a community of global leaders and innovators. World-class education starts here.
                  </p>
                  
                  {/* CTA Button */}
                  <motion.button 
                    animate={step === 2 ? { scale: 1.05, backgroundColor: "#1e3a8a" } : { scale: 1, backgroundColor: "#2563eb" }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-bold shadow-lg shadow-blue-500/30 transition-colors"
                  >
                    Apply Now
                    <motion.div animate={step === 2 ? { x: 4 } : { x: 0 }}>
                      <ArrowRight size={14} />
                    </motion.div>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Floating Stats Card (Parallax/Slide effect) */}
            <AnimatePresence>
              {step >= 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 50, rotate: 5 }}
                  animate={{ opacity: 1, x: 0, rotate: -2 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
                  className="absolute bottom-6 right-6 bg-white p-3 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center gap-3 z-20"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <Users size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-gray-900">10,000+</div>
                    <div className="text-[9px] text-gray-500 font-medium">Active Students</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Floating Course Card */}
            <AnimatePresence>
              {step >= 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -50, rotate: -5 }}
                  animate={{ opacity: 1, x: 0, rotate: 3 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", bounce: 0.4, duration: 0.8, delay: 0.1 }}
                  className="absolute top-10 left-4 bg-white p-2.5 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center gap-2 z-20"
                >
                  <div className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center">
                    <BookOpen size={14} className="text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-900">150+ Courses</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
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
