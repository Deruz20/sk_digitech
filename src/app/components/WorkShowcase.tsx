import { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    title: "Aura AI",
    category: "Machine Learning",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Vanguard",
    category: "Fintech Platform",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Elysium",
    category: "Web Architecture",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Nexis",
    category: "Enterprise Cloud",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600&auto=format&fit=crop",
  },
];

export function WorkShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse positions for the custom preview image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for tracking
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    // Offset slightly so it centers around the cursor
    mouseX.set(e.clientX - left - 150);
    mouseY.set(e.clientY - top - 150);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="py-32 bg-white relative overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-20 relative z-10">
        <div className="mb-20">
          <span className="text-gray-400 font-['Inter'] text-sm uppercase tracking-widest font-semibold block mb-4">
            01 — Selected Work
          </span>
          <h2 className="text-[50px] md:text-[80px] font-['Space_Grotesk'] leading-[0.9] tracking-tight font-medium">
            engineered to
            <span 
              className="block bg-gradient-to-r from-[#6200EE] to-[#FF5F00] bg-clip-text text-transparent"
            >
              outperform.
            </span>
          </h2>
        </div>

        <div className="flex flex-col border-t border-gray-200">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group flex flex-col md:flex-row md:items-center justify-between py-10 md:py-16 border-b border-gray-200 cursor-pointer relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div className="flex items-center gap-6 md:gap-12 z-10">
                <span className="text-gray-300 font-['Inter'] text-2xl font-light">
                  0{idx + 1}
                </span>
                <h3 className="text-[40px] md:text-[80px] lg:text-[100px] font-['Space_Grotesk'] font-medium tracking-tight text-[#111111] group-hover:text-[#6200EE] transition-colors duration-500 leading-none">
                  {project.title}
                </h3>
              </div>
              <div className="mt-4 md:mt-0 flex items-center gap-6 z-10">
                <span className="text-gray-500 font-['Inter'] text-lg md:text-xl font-light">
                  {project.category}
                </span>
                <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#6200EE] group-hover:border-[#6200EE] group-hover:text-white transition-all duration-300">
                  <ArrowUpRight size={24} className="group-hover:rotate-45 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Following Image Preview (Glassmorphic) */}
      <motion.div
        className="hidden md:block pointer-events-none absolute top-0 left-0 w-[300px] h-[300px] rounded-2xl overflow-hidden z-0 shadow-2xl"
        style={{
          x: springX,
          y: springY,
          opacity: hoveredIndex !== null ? 1 : 0,
          scale: hoveredIndex !== null ? 1 : 0.8,
        }}
        transition={{ opacity: { duration: 0.3 }, scale: { duration: 0.3 } }}
      >
        <div className="w-full h-full relative">
          {PROJECTS.map((project, idx) => (
            <img
              key={idx}
              src={project.image}
              alt={project.title}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                hoveredIndex === idx ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          {/* Glass Overlay */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] pointer-events-none" />
        </div>
      </motion.div>
    </section>
  );
}
