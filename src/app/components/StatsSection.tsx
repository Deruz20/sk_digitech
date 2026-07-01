import { motion } from "motion/react";

export function StatsSection() {
  return (
    <section className="py-32 bg-white relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-20">
        
        {/* Top border divider */}
        <div className="w-full h-[1px] bg-gray-200 mb-20" />

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-20">
          
          {/* Left: Massive Metric */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col"
          >
            <span className="text-[#FF5F00] font-['Inter'] text-sm uppercase tracking-widest font-semibold block mb-6">
              03 — Impact
            </span>
            <div className="text-[clamp(80px,8vw,160px)] font-medium font-['Space_Grotesk'] leading-[0.8] tracking-tighter text-[#111111]">
              98<span className="text-gray-300">%</span>
            </div>
            <p className="text-gray-500 font-['Inter'] text-xl md:text-2xl font-light mt-6 max-w-sm">
              Client retention rate across our enterprise partnerships over the last 3 years.
            </p>
          </motion.div>

          {/* Right: Testimonial */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:w-5/12 flex flex-col"
          >
            <div className="text-6xl text-gray-200 font-serif leading-none mb-4">"</div>
            <p className="text-2xl md:text-[32px] leading-[1.3] font-['Space_Grotesk'] tracking-tight text-[#111111] mb-12">
              SK Digitech didn't just rebuild our platform; they fundamentally changed how we operate. Their engineering rigor is unmatched in the agency space.
            </p>
            
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&auto=format&fit=crop" 
                  alt="Client Portrait" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-['Space_Grotesk'] font-bold text-lg text-[#111111]">David Harrison</span>
                <span className="font-['Inter'] text-gray-500 text-sm">CTO, Vanguard Financial</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom border divider */}
        <div className="w-full h-[1px] bg-gray-200 mt-32" />
        
      </div>
    </section>
  );
}
