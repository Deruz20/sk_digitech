import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useAnimationFrame, useMotionValue } from "framer-motion";
import {
  CheckCircle2,
  Box,
  RotateCcw,
  Grip,
  ArrowRightToLine,
  Sparkles,
  GitCommit,
  Code2,
  TerminalSquare,
  Copy,
  GitBranch,
  Braces,
  PenTool
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const DOCK_ICONS: Array<{ Icon: LucideIcon; label: string }> = [
  { Icon: PenTool, label: "Design" },
  { Icon: CheckCircle2, label: "Check" },
  { Icon: Box, label: "Box" },
  { Icon: RotateCcw, label: "Refresh" },
  { Icon: Grip, label: "Grip" },
  { Icon: ArrowRightToLine, label: "ArrowRight" },
  { Icon: Sparkles, label: "Sparkles" },
  { Icon: GitCommit, label: "Node" },
  { Icon: Code2, label: "Code" },
  { Icon: TerminalSquare, label: "Terminal" },
  { Icon: Copy, label: "Copy" },
  { Icon: GitBranch, label: "Branch" },
  { Icon: Braces, label: "Braces" },
];

const DockIcon = ({ Icon, label, index, isActive }: { Icon: LucideIcon, label: string, index: number, isActive: boolean }) => {
  const y = useMotionValue(0);
  
  useAnimationFrame((t) => {
    // Rollercoaster physics
    y.set(Math.sin((t * 0.0006) + (index * 0.6)) * 40);
  });

  return (
    <motion.li
      style={{ y, z: 0 }}
      whileHover={isActive ? undefined : { scale: 1.05 }}
      animate={{ scale: isActive ? 1.15 : 1 }}
      className={`orbital-dock-icon-wrapper flex items-center justify-center p-4 rounded-full mx-3 border min-w-[84px] min-h-[84px] w-[84px] h-[84px] transition-colors duration-500 ${
        isActive 
          ? "bg-gradient-primary text-white shadow-[0_12px_32px_rgba(156,39,176,0.5)] border-transparent" 
          : "bg-spectrum border-[#9C27B0]/20 text-[#9C27B0] shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_28px_rgba(156,39,176,0.3)] hover:border-[#9C27B0]/40 hover:text-[#5A53C8]"
      }`}
    >
      <div className={`orbital-dock-icon ${isActive ? "active" : ""}`} title={label}>
        <Icon 
          size={isActive ? 32 : 24} 
          strokeWidth={isActive ? 2.5 : 1.5} 
          fill={isActive ? "currentColor" : "none"}
          aria-hidden="true" 
        />
      </div>
    </motion.li>
  );
};

export const OrbitalDock = () => {
  const dockRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: dockRef,
    offset: ["start end", "end start"]
  });
  
  const rawX = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const driftX = useSpring(rawX, { stiffness: 60, damping: 20, mass: 0.8 });

  return (
    <div className="orbital-dock w-full overflow-hidden py-24 relative flex justify-center" aria-label="Service tools orbital dock" ref={dockRef}>
      {/* Optional: Add gradient masks to the edges to make it fade out nicely */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      
      <motion.ul className="orbital-dock-icons" style={{ x: driftX, margin: 0, padding: 0, display: "flex", listStyle: "none", width: "max-content" }}>
        {DOCK_ICONS.map(({ Icon, label }, idx) => (
          <DockIcon 
            key={label} 
            Icon={Icon} 
            label={label} 
            index={idx} 
            isActive={label === "Sparkles"} 
          />
        ))}
      </motion.ul>
    </div>
  );
};
