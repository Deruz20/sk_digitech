import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const STEPS = [
  {
    num: "01",
    title: "Discovery & Architecture",
    desc: "We dive deep into your business logic. We map out data flows, technical constraints, and define a scalable architecture before writing a single line of code.",
  },
  {
    num: "02",
    title: "Prototyping & UX",
    desc: "Low-fidelity wireframes evolve into high-fidelity prototypes. We focus on extreme usability, minimizing friction, and establishing the core visual language.",
  },
  {
    num: "03",
    title: "Engineering",
    desc: "Our engineers build using bleeding-edge stacks (React, Next.js, Node). We enforce strict typing, modular components, and highly performant animations.",
  },
  {
    num: "04",
    title: "Deployment & Scale",
    desc: "We deploy to robust cloud infrastructure, configuring CI/CD pipelines, CDN caching, and automated testing to ensure your product scales flawlessly from day one.",
  }
];

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Optional: subtle parallax on the whole section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={containerRef} className="py-32 md:py-48 bg-[#0a0a0a] text-white relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-20">
        
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32">
          {/* Sticky Left Column */}
          <div className="lg:w-1/3">
            <div className="sticky top-40">
              <span className="text-[#FF5F00] font-['Inter'] text-sm uppercase tracking-widest font-semibold block mb-6">
                02 — Methodology
              </span>
              <h2 className="text-[50px] md:text-[70px] font-['Space_Grotesk'] leading-[1.1] font-medium tracking-tight mb-8">
                How we build the future.
              </h2>
              <p className="text-gray-400 font-['Inter'] text-lg md:text-xl font-light max-w-md">
                We believe in rigorous engineering masked by effortless design. Our process is transparent, agile, and relentlessly focused on outcomes.
              </p>
            </div>
          </div>

          {/* Scrolling Right Column */}
          <div className="lg:w-2/3 flex flex-col gap-32 pt-20 lg:pt-0">
            {STEPS.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-8 md:pl-16 border-l border-gray-800"
              >
                {/* Dot */}
                <div className="absolute top-0 -left-[1px] w-[3px] h-12 bg-gradient-to-b from-[#6200EE] to-[#FF5F00]" />
                
                <span className="text-gray-600 font-['Inter'] text-2xl font-light block mb-4">
                  {step.num}
                </span>
                <h3 className="text-3xl md:text-5xl font-['Space_Grotesk'] font-medium tracking-tight mb-6 text-gray-100">
                  {step.title}
                </h3>
                <p className="text-gray-400 font-['Inter'] text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
