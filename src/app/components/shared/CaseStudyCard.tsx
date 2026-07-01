import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useState, useRef, useEffect } from "react";

interface CaseStudyCardProps {
  projectName: string;
  client?: string;
  tags: string[];
  coverImage: string;
  description: string;
  year: string | number;
  className?: string;
}

export function CaseStudyCard({ projectName, client, tags, coverImage, description, year, className = "" }: CaseStudyCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D Tilt Physics
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [0, 1], [10, -10]);
  const rotateY = useTransform(springX, [0, 1], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || prefersReducedMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };


  return (
    <div className="perspective-[1000px] w-full" style={{ perspective: '1000px' }}>
      <motion.div
        ref={cardRef}
        style={{
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
          transformStyle: "preserve-3d"
        }}
        initial={{ scale: prefersReducedMotion ? 1 : 0.94, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--surface)] border border-[var(--border)] group cursor-pointer shadow-2xl ${className}`}
      >
      {/* Cover Image */}
      <motion.div
        animate={{ 
          scale: isHovered && !prefersReducedMotion ? 1.05 : 1,
          rotate: isHovered && !prefersReducedMotion ? 1.5 : 0
        }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${coverImage}')` }}
      />
      
      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
      
      {/* Dark Overlay on Hover */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered && !prefersReducedMotion ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 z-10 bg-black/60 backdrop-blur-[2px]"
      />

      {/* Content */}
      <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
        <div className="flex justify-between items-end mb-4">
          <motion.h3 
            animate={{ y: isHovered && !prefersReducedMotion ? -10 : 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-2xl md:text-3xl font-['Playfair_Display'] font-semibold text-white m-0"
          >
            {projectName}
          </motion.h3>
          <span className="font-['Syne'] text-sm font-semibold text-[var(--accent-1)]">{year}</span>
        </div>

        {/* Hover Revealed Details */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isHovered || prefersReducedMotion ? 1 : 0,
            height: isHovered || prefersReducedMotion ? "auto" : 0 
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="overflow-hidden"
        >
          <p className="font-['Syne'] text-sm text-[var(--text-2)] mb-4 leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <span key={tag} className="px-3 py-1 text-[11px] font-['Syne'] uppercase tracking-widest bg-[var(--surface)] border border-[var(--border)] rounded-full text-white/80">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      </motion.div>
    </div>
  );
}
