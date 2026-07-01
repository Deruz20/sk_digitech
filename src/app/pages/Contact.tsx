import { motion } from "motion/react";
import { useSearchParams } from "react-router";

export function Contact() {
  const [, setSearchParams] = useSearchParams();

  return (
    <div className="bg-[#060509] min-h-screen text-white relative flex items-center justify-center overflow-hidden">

      {/* Intro State */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pointer-events-auto w-full max-w-4xl mx-auto">
        <motion.h1
          className="text-5xl md:text-8xl font-bold tracking-tight mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "-0.04em" }}
        >
          New project on<br />the horizon?
        </motion.h1>

        <motion.p
          className="text-3xl md:text-5xl italic font-light text-gray-400 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Let's partner up!
        </motion.p>

        <motion.button
          onClick={() => setSearchParams((prev) => { prev.set("contact", "true"); return prev; })}
          className="bg-gradient-primary px-10 py-5 rounded-full font-bold text-white text-lg flex items-center gap-3 hover:shadow-[0_0_30px_rgba(247,165,33,0.6)] transition-all active:scale-95"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Become a client <span>→</span>
        </motion.button>
      </div>

      {/* Background Decor (Optional glow to make it look premium) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-primary opacity-30 blur-[150px] rounded-full pointer-events-none" />

    </div>
  );
}
