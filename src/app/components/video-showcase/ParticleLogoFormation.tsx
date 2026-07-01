import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  size: number;
  depth: number;
  opacity: number;
  formed: boolean;
}

interface ParticleLogoFormationProps {
  onComplete?: () => void;
}

export const ParticleLogoFormation = ({ onComplete }: ParticleLogoFormationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let phase: "forming" | "hold" | "dissolve" = "forming";
    let phaseStart = performance.now();

    const sampleLogoTargets = () => {
      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return [];

      const cx = width / 2;
      const cy = height / 2;
      const scale = Math.min(width / 420, height / 180);

      offCtx.fillStyle = "#ffffff";
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.font = `900 ${Math.floor(52 * scale)}px Inter, system-ui, sans-serif`;
      offCtx.fillText("SK", cx, cy - 18 * scale);
      offCtx.font = `700 ${Math.floor(22 * scale)}px Inter, system-ui, sans-serif`;
      offCtx.fillText("DIGITECH", cx, cy + 28 * scale);

      const imageData = offCtx.getImageData(0, 0, width, height);
      const targets: Array<{ x: number; y: number; depth: number }> = [];
      const step = Math.max(3, Math.floor(4 * scale));

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const idx = (y * width + x) * 4;
          if (imageData.data[idx + 3] > 128) {
            const depth = 0.4 + Math.random() * 0.6;
            targets.push({ x, y, depth });
          }
        }
      }

      return targets;
    };

    const initParticles = () => {
      const targets = sampleLogoTargets();
      particles = targets.map((target) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        tx: target.x,
        ty: target.y,
        vx: 0,
        vy: 0,
        size: 1.2 + target.depth * 1.8,
        depth: target.depth,
        opacity: 0.2 + target.depth * 0.5,
        formed: false,
      }));
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      
      // Guard against zero dimensions on initial mount
      if (width <= 0 || height <= 0) {
        return;
      }
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
      phase = "forming";
      phaseStart = performance.now();
      completedRef.current = false;
    };

    const animate = (time: number) => {
      ctx.fillStyle = "rgba(5, 5, 8, 0.18)";
      ctx.fillRect(0, 0, width, height);

      const elapsed = time - phaseStart;

      if (phase === "forming" && elapsed > 2800) {
        phase = "hold";
        phaseStart = time;
      } else if (phase === "hold" && elapsed > 1200) {
        phase = "dissolve";
        phaseStart = time;
      } else if (phase === "dissolve" && elapsed > 900 && !completedRef.current) {
        completedRef.current = true;
        onComplete?.();
      }

      particles.forEach((p) => {
        if (phase === "forming") {
          const dx = p.tx - p.x;
          const dy = p.ty - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = Math.min(0.12, dist * 0.008);
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
          p.vx *= 0.86;
          p.vy *= 0.86;
          p.x += p.vx;
          p.y += p.vy;
          if (dist < 2) p.formed = true;
        } else if (phase === "hold") {
          p.x += Math.sin(time * 0.002 + p.depth * 10) * 0.15;
          p.y += Math.cos(time * 0.0015 + p.depth * 8) * 0.12;
        } else {
          p.vx += (Math.random() - 0.5) * 0.08;
          p.vy += (Math.random() - 0.5) * 0.08 - 0.02;
          p.x += p.vx;
          p.y += p.vy;
          p.opacity *= 0.985;
        }

        const glow = p.formed ? 0.85 : 0.45;
        const alpha = phase === "dissolve" ? p.opacity * 0.6 : p.opacity * glow;
        const zScale = 0.6 + p.depth * 0.8;

        ctx.beginPath();
        ctx.fillStyle = `rgba(${139 + p.depth * 40}, ${92 + p.depth * 30}, 246, ${alpha})`;
        ctx.arc(p.x, p.y, p.size * zScale, 0, Math.PI * 2);
        ctx.fill();

        if (p.formed && phase !== "dissolve") {
          ctx.beginPath();
          ctx.fillStyle = `rgba(247, 165, 33, ${alpha * 0.35})`;
          ctx.arc(p.x + p.depth, p.y - p.depth, p.size * zScale * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animationId = requestAnimationFrame(animate);

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, [onComplete]);

  return (
    <motion.div
      className="particle-logo-formation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <canvas ref={canvasRef} className="particle-logo-canvas" aria-hidden="true" />
      <div className="particle-logo-glow" aria-hidden="true" />
    </motion.div>
  );
};
