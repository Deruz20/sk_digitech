import { motion } from "motion/react";
import { DottedBg } from "./shared/DottedBg";

const logos = [
  "NEXTGEN", "AURORA", "LUMINARY", "ELEVATE", "NEXUS", "VERTEX"
];

export function TrustSection() {
  return (
    <section className="py-32 md:py-40 relative overflow-hidden border-y border-black/5" style={{ background: "#FFFFFF" }}>
      <DottedBg opacity={0.25} />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center">
          <p className="text-sm font-medium tracking-widest uppercase text-slate-400 mb-12">
            Trusted by ambitious global brands
          </p>
          
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-60 grayscale">
            {logos.map((logo, index) => (
              <motion.div
                key={logo}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="font-['Inter'] text-2xl md:text-3xl font-bold text-slate-400 hover:text-slate-800 transition-colors"
              >
                {logo}
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 mt-24 pt-16 border-t border-slate-100 w-full">
            {[
              { label: "Projects Delivered", value: "150+" },
              { label: "Global Reach", value: "24+" },
              { label: "Awards Won", value: "12" },
              { label: "Client Retention", value: "99%" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                className="text-center md:text-left"
              >
                <div className="text-4xl md:text-5xl font-['Inter'] font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
