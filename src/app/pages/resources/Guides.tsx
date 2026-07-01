import { motion } from "motion/react";
import { Search, BookOpen, Lock } from "lucide-react";

export function Guides() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen text-[#111111] pt-40 pb-20 px-6 md:px-20 font-['Space_Grotesk'] selection:bg-[#F7A521] selection:text-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[64px] md:text-[90px] lg:text-[100px] leading-[0.9] font-medium tracking-tight"
          >
            our
            <span 
              className="font-bold block lg:inline lg:ml-6"
              style={{
                background: "linear-gradient(135deg, #F7A521 0%, #E91E63 50%, #5A53C8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              guides.
            </span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:max-w-sm flex flex-col gap-3 pb-4"
          >
            <span className="text-gray-400 font-['Inter'] text-sm uppercase tracking-widest font-semibold">
              04 — Guides
            </span>
            <p className="text-[#555555] font-['Inter'] text-lg">
              High-value playbooks and technical architectures.
            </p>
          </motion.div>
        </div>

        {/* Visual Shell Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {/* Coming Soon Placeholder */}
           <div className="col-span-full py-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50">
              <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center text-[#5A53C8] mb-6 relative">
                 <BookOpen size={32} />
                 <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">
                    <Lock size={14} />
                 </div>
              </div>
              <h3 className="text-3xl font-bold mb-4">The Enterprise AI Playbook</h3>
              <p className="text-gray-500 font-['Inter'] max-w-md text-center mb-8">
                We're currently writing our first comprehensive guide on integrating AI into legacy systems. Check back soon for the full gated PDF download.
              </p>
              <button className="px-8 py-3 bg-gray-200 text-gray-500 font-bold rounded-full cursor-not-allowed">
                Coming Soon
              </button>
           </div>
        </div>

      </div>
    </div>
  );
}
