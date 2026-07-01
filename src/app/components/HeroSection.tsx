import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useNavigate } from "react-router";
import skLogo from "../../imports/sk_digitech_logo-1.png";

// Global gradient will be applied in the render loop

function ParticleCanvas({ isActive }: { isActive: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId: number;

    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    
    setCanvasSize();

    const isMobile = width < 768;
    // High-density sophisticated dot matrix
    const particleCount = isMobile ? 600 : 1500;

    const particles: any[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: shouldReduceMotion ? 0 : (Math.random() - 0.5) * 0.5,
      vy: shouldReduceMotion ? 0 : (Math.random() - 0.5) * 0.5,
      // Tiny sophisticated dots
      radius: Math.random() * 2.0 + 1.0,
      opacity: 0,
      targetOpacity: 0.2 + Math.random() * 0.8,
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;
    let isMousePresent = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (shouldReduceMotion) return;
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMousePresent = true;
    };
    
    const handleMouseLeave = () => {
      isMousePresent = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", setCanvasSize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // We only draw if the document is visible
      if (document.visibilityState === "hidden") {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Create the logo's linear gradient spanning the entire width of the canvas
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, "#5A53C8"); // Indigo
      gradient.addColorStop(0.5, "#9C27B0"); // Purple
      gradient.addColorStop(1, "#F7A521"); // Orange
      ctx.fillStyle = gradient;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!shouldReduceMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Mouse repulsion
          if (isMousePresent) {
            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const repelRadius = 120;
            
            if (dist < repelRadius) {
              const force = (repelRadius - dist) / repelRadius;
              p.x -= (dx / dist) * force * 1.5;
              p.y -= (dy / dist) * force * 1.5;
            }
          }

          // Bounce off edges
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }

        // Fade in opacity
        if (p.opacity < p.targetOpacity) {
          p.opacity += 0.01;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        
        ctx.globalAlpha = 1; // reset
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive, shouldReduceMotion]);

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      aria-hidden="true"
    />
  );
}

export function HeroSection() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const [typedText, setTypedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  
  const headlineText = "Experience liftoff with the next-gen agent platform.";

  useEffect(() => {
    if (shouldReduceMotion) {
      setTypedText(headlineText);
      setIsTypingComplete(true);
      return;
    }

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= headlineText.length) {
        setTypedText(headlineText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setIsTypingComplete(true), 300); // Small pause before fading in rest
      }
    }, 45); // Typing speed

    return () => clearInterval(typingInterval);
  }, [shouldReduceMotion]);

  const handleCTA = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(href);
    }
  };

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center overflow-hidden w-full"
      style={{ 
        minHeight: "100vh",
        backgroundColor: "#0B0F19", // Dark premium palette
        color: "#F9FAFB",
        paddingTop: "clamp(5rem, 10vw, 10rem)",
        paddingBottom: "clamp(5rem, 10vw, 10rem)",
      }}
    >
      <ParticleCanvas isActive={isTypingComplete} />

      {/* Content Container */}
      <div
        className="relative flex flex-col items-center text-center px-6 pointer-events-none w-full"
        style={{
          zIndex: 10,
          maxWidth: "1400px",
        }}
      >
        {/* Small centered logo */}
        <motion.div
          className="mb-12 flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={skLogo}
            alt="SK Digitech"
            className="object-contain filter invert opacity-90"
            style={{ height: "32px" }}
          />
          <span style={{ 
              fontFamily: "'Google Sans Flex', 'Inter', sans-serif", 
              fontSize: "26px", 
              letterSpacing: "-0.02em",
              display: "flex",
              alignItems: "center"
          }}>
            <span style={{ 
                fontWeight: 800, 
                background: "linear-gradient(90deg, #6200EE, #FF5F00)", 
                WebkitBackgroundClip: "text", 
                WebkitTextFillColor: "transparent" 
            }}>SK</span>
            <span style={{ 
                fontWeight: 400, 
                color: "#F9FAFB",
                marginLeft: "0.15em"
            }}>Digitech</span>
          </span>
        </motion.div>

        {/* Typewriter Headline */}
        <div 
          className="relative flex justify-center items-center w-full max-w-[1100px] mb-8"
          style={{ minHeight: "clamp(6rem, 16vw, 14rem)" }} // Prevent layout shift during typing
        >
          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(3rem, 8vw, 7rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              color: "#F9FAFB",
              textAlign: "center",
              display: "inline-block",
            }}
          >
            {typedText}
            {/* Gradient Cursor */}
            {!isTypingComplete && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                className="inline-block ml-1 align-middle"
                style={{
                  width: "clamp(12px, 2.5vw, 24px)",
                  height: "clamp(2.5rem, 7vw, 6rem)",
                  background: "linear-gradient(180deg, #3B82F6 0%, #D946EF 100%)",
                  borderRadius: "2px",
                }}
              />
            )}
          </h1>
        </div>

        {/* Supporting Paragraph */}
        <motion.p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
            fontWeight: 300,
            color: "#9CA3AF",
            lineHeight: 1.6,
            marginBottom: "48px",
            maxWidth: "700px",
            textAlign: "center",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isTypingComplete ? 1 : 0, y: isTypingComplete ? 0 : 20 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Websites, brand systems, e-commerce, and AI products — engineered for outcomes, not aesthetics alone.
        </motion.p>

        {/* CTA row */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-9 w-full pointer-events-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ 
            opacity: isTypingComplete ? 1 : 0, 
            scale: isTypingComplete ? 1 : 0.95 
          }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <button
            onClick={() => handleCTA("?contact=true")}
            className="flex items-center justify-center transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "16px",
              fontWeight: 500,
              padding: "0 32px",
              height: "52px",
              borderRadius: "999px",
              background: "#FFFFFF",
              color: "#0B0F19",
              border: "none",
            }}
          >
            Start Project
          </button>

          <button
            onClick={() => handleCTA("#work")}
            className="flex items-center justify-center transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "16px",
              fontWeight: 500,
              padding: "0 32px",
              height: "52px",
              borderRadius: "999px",
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(12px)",
              color: "#FFFFFF",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            Explore Work
          </button>
        </motion.div>
      </div>
    </section>
  );
}
