import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { Link } from "react-router";

interface MagneticButtonProps {
  label: string;
  href?: string;
  variant: 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function MagneticButton({ label, href, variant, size = 'md' }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 20, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Magnetic pull distance logic
    x.set(distanceX * 0.3);
    y.set(distanceY * 0.3);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const baseClasses = "relative flex items-center justify-center font-['Syne'] font-semibold tracking-wide transition-colors duration-300 rounded-full";
  
  const sizeClasses = {
    sm: "px-6 py-3 text-sm",
    md: "px-8 py-4 text-base",
    lg: "px-10 py-5 text-lg"
  };

  const variantClasses = {
    primary: "bg-[var(--accent-1)] text-white shadow-lg hover:bg-[var(--accent-1)]/90",
    ghost: "bg-transparent border border-[var(--border)] text-[var(--accent-1)] hover:border-[var(--accent-1)]"
  };

  const buttonContent = (
    <motion.button
      whileTap={{ scale: prefersReducedMotion ? 1 : 0.96 }}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`}
    >
      <span className="relative z-10">{label}</span>
    </motion.button>
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block relative"
    >
      {href ? (
        <Link to={href} className="inline-block">
          {buttonContent}
        </Link>
      ) : (
        buttonContent
      )}
    </motion.div>
  );
}
