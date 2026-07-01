import { useRef, useState, ReactNode } from "react";
import { motion, useSpring } from "motion/react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  stiffness?: number;
  damping?: number;
  mass?: number;
}

export function MagneticButton({
  children,
  className = "",
  onClick,
  stiffness = 150,
  damping = 15,
  mass = 0.5,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { stiffness, damping, mass };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.3); // Magnetic pull strength
    y.set(middleY * 0.3);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ x, y }}
      className={`relative inline-flex items-center justify-center cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
