import { motion } from "motion/react";

export function AbstractArtwork({ className = "" }: { className?: string }) {
  // Generate an array of spheres with varying sizes and colors derived from the primary gradient
  const spheres = Array.from({ length: 40 }).map((_, i) => {
    const size = Math.random() * 50 + 20; // 20px to 70px
    const delay = Math.random() * 2;
    const duration = Math.random() * 4 + 4;
    
    // Choose between the brand colors
    const colors = [
      "linear-gradient(135deg, #F7A521 0%, #E91E63 100%)",
      "linear-gradient(135deg, #E91E63 0%, #5A53C8 100%)",
      "linear-gradient(135deg, #5A53C8 0%, #F7A521 100%)"
    ];
    const color = colors[i % colors.length];

    // Position them in a clustered circular shape
    const radius = Math.random() * 110;
    const angle = Math.random() * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    return { size, delay, duration, color, x, y };
  });

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Background soft ambient glow */}
      <div className="absolute w-full h-full max-w-[400px] max-h-[400px] rounded-full bg-gradient-to-tr from-[#F7A521] via-[#E91E63] to-[#5A53C8] mix-blend-multiply filter blur-[60px] opacity-40" />
      
      <motion.div 
        animate={{ 
          rotate: [0, 360],
        }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="relative w-[320px] h-[320px] flex items-center justify-center"
      >
        {spheres.map((s, i) => (
          <motion.div 
            key={i}
            animate={{ 
              y: [s.y - 15, s.y + 15, s.y - 15], 
              x: [s.x - 10, s.x + 10, s.x - 10],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: s.duration, 
              repeat: Infinity, 
              ease: "easeInOut", 
              delay: s.delay 
            }}
            className="absolute rounded-full shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.3),0_10px_20px_rgba(0,0,0,0.2)]"
            style={{ 
              width: s.size, 
              height: s.size, 
              background: s.color,
              zIndex: Math.floor(s.size) // Larger spheres in front generally
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
