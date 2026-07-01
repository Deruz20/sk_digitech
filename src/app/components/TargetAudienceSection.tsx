import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

// Gradient colors removed here; we will use a true Canvas LinearGradient in the render loop

type ShapeType = "default" | "brackets" | "network";

/**
 * Rasterize a shape on an offscreen canvas and return sampled pixel positions.
 * Positions are returned in the coordinate space of the target area.
 */
function getShapePoints(
  shape: ShapeType,
  areaX: number,
  areaY: number,
  areaW: number,
  areaH: number
): { x: number; y: number }[] {
  if (shape === "default") return [];

  const size = 200;
  const offscreen = document.createElement("canvas");
  offscreen.width = size;
  offscreen.height = size;
  const ctx = offscreen.getContext("2d");
  if (!ctx) return [];

  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = "#000";
  ctx.strokeStyle = "#000";

  if (shape === "brackets") {
    // Bold weight to give the particles a thicker, more solid area to fill
    ctx.font = '700 240px "Space Grotesk", sans-serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("{  }", size / 2, size / 2);
  } else {
    // Network: 5 circles connected by lines
    ctx.lineWidth = 10;
    const cx = size / 2, cy = size / 2, r = 55;
    const nodes: { x: number; y: number }[] = [];
    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
      const nx = cx + Math.cos(angle) * r;
      const ny = cy + Math.sin(angle) * r;
      nodes.push({ x: nx, y: ny });
      ctx.beginPath();
      ctx.arc(nx, ny, 25, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.lineWidth = 6;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
  }

  const imgData = ctx.getImageData(0, 0, size, size);
  const points: { x: number; y: number }[] = [];
  const step = 2; // Sample more densely for sharper shapes

  const scale = Math.min(areaW * 0.45, areaH * 0.45) / size;
  const centerX = areaX + areaW / 2;
  const centerY = areaY + areaH / 2;

  for (let y = 0; y < size; y += step) {
    for (let x = 0; x < size; x += step) {
      const i = (y * size + x) * 4;
      if (imgData.data[i + 3] > 40) {
        points.push({
          x: centerX + (x - size / 2) * scale,
          y: centerY + (y - size / 2) * scale,
        });
      }
    }
  }
  return points;
}

export function TargetAudienceSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const activeShapeRef = useRef<ShapeType>("default");
  const shapePointsRef = useRef<{ x: number; y: number }[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let sectionTop = 0;
    let sectionLeft = 0;
    let animationFrameId: number;

    const setCanvasSize = () => {
      const rect = section.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      sectionTop = rect.top;
      sectionLeft = rect.left;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Rebuild shape points if a shape is active
      if (activeShapeRef.current !== "default") {
        rebuildShapePoints(activeShapeRef.current);
      }
    };

    setCanvasSize();

    const mobile = width < 768;
    const particleCount = mobile ? 600 : 1500;

    // Particle structure
    const particles: {
      x: number; y: number;
      baseX: number; baseY: number;
      targetX: number; targetY: number;
      vx: number; vy: number;
      radius: number;
      opacity: number; targetOpacity: number;
    }[] = Array.from({ length: particleCount }, () => {
      const x = Math.random() * width;
      const y = Math.random() * height;
      return {
        x, y,
        baseX: x, baseY: y,
        targetX: x, targetY: y,
        vx: shouldReduceMotion ? 0 : (Math.random() - 0.5) * 0.5,
        vy: shouldReduceMotion ? 0 : (Math.random() - 0.5) * 0.5,
        // Slightly larger for visibility
        radius: Math.random() * 2.0 + 1.0,
        opacity: 0,
        targetOpacity: 0.2 + Math.random() * 0.8,
      };
    });

    let mouseX = -9999;
    let mouseY = -9999;
    let isMousePresent = false;
    let shapeBlend = 0;
    let targetShapeBlend = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (shouldReduceMotion) return;
      const rect = section.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isMousePresent = true;
    };

    const handleMouseLeave = () => {
      isMousePresent = false;
      mouseX = -9999;
      mouseY = -9999;
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", setCanvasSize);

    // Shape management
    const rebuildShapePoints = (shape: ShapeType) => {
      if (shape === "default") {
        shapePointsRef.current = [];
        return;
      }
      const halfW = width / 2;
      if (shape === "brackets") {
        shapePointsRef.current = getShapePoints(shape, 0, 0, halfW, height);
      } else {
        shapePointsRef.current = getShapePoints(shape, halfW, 0, halfW, height);
      }
      // Assign targets
      const pts = shapePointsRef.current;
      if (pts.length > 0) {
        for (const p of particles) {
          const pt = pts[Math.floor(Math.random() * pts.length)];
          // Zero jitter: snap precisely to the sampled shape points for extreme sharpness
          p.targetX = pt.x;
          p.targetY = pt.y;
        }
      }
    };

    // Expose shape setter
    (section as any).__setShape = (shape: ShapeType) => {
      activeShapeRef.current = shape;
      targetShapeBlend = shape === "default" ? 0 : 1;
      rebuildShapePoints(shape);
      if (shape === "default") {
        for (const p of particles) {
          p.targetX = p.baseX;
          p.targetY = p.baseY;
        }
      }
    };

    // ─── Render loop (same structure as hero) ───
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (document.visibilityState === "hidden") {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Smooth blend
      shapeBlend += (targetShapeBlend - shapeBlend) * 0.04;

      // Create the logo's linear gradient spanning the entire width of the canvas
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, "#5A53C8"); // Indigo
      gradient.addColorStop(0.5, "#9C27B0"); // Purple
      gradient.addColorStop(1, "#F7A521"); // Orange
      ctx.fillStyle = gradient;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!shouldReduceMotion) {
          if (shapeBlend > 0.01) {
            // Stronger spring and heavier dampening to snap instantly into the tight shapes
            const dx = p.targetX - p.x;
            const dy = p.targetY - p.y;
            p.vx += dx * 0.08;
            p.vy += dy * 0.08;
            p.vx *= 0.82;
            p.vy *= 0.82;
          } else {
            // Normal drift (same as hero)
            p.x += p.vx;
            p.y += p.vy;
          }

          // Mouse repulsion (same as hero section)
          if (isMousePresent) {
            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const repelRadius = 120;

            if (dist < repelRadius && dist > 0) {
              const force = (repelRadius - dist) / repelRadius;
              p.vx += (dx / dist) * force * 1.5;
              p.vy += (dy / dist) * force * 1.5;
            }
          }

          // Apply velocity
          p.x += p.vx;
          p.y += p.vy;

          // Bounce off edges (same as hero)
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
          p.x = Math.max(0, Math.min(width, p.x));
          p.y = Math.max(0, Math.min(height, p.y));
        }

        // Fade in (same as hero)
        if (p.opacity < p.targetOpacity) {
          p.opacity += 0.01;
        }

        // Draw with high performance
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [shouldReduceMotion]);

  const setShape = useCallback((shape: ShapeType) => {
    const section = sectionRef.current;
    if (section && (section as any).__setShape) {
      (section as any).__setShape(shape);
    }
  }, []);

  // ─── Desktop Layout ───
  if (!isMobile) {
    return (
      <div ref={sectionRef} className="w-full bg-white relative overflow-hidden" style={{ minHeight: '600px' }}>
        {/* Canvas — exact same pattern as hero */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none z-0"
          aria-hidden="true"
        />

        {/* Content — two perfectly equal columns */}
        <div className="relative z-10 max-w-[1600px] mx-auto w-full grid grid-cols-2 min-h-[600px]">

          {/* Left Column — Startups */}
          <div
            className="flex flex-col items-center justify-center text-center py-24 px-8 cursor-default"
            onMouseEnter={() => setShape("brackets")}
            onMouseLeave={() => setShape("default")}
          >
            <div className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-full px-5 py-2 mb-10 shadow-sm">
              <span className="text-[11px] font-['Inter'] font-semibold text-[#111111] tracking-widest uppercase">
                Launch &amp; Grow
              </span>
            </div>
            <h2 className="text-[44px] md:text-[56px] leading-[1.05] font-['Space_Grotesk'] text-[#111111] font-normal tracking-tight mb-14">
              For startups
              <br />
              <span className="text-gray-400 font-light">Achieve new heights</span>
            </h2>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary flex items-center gap-1 group px-8 py-3 text-[15px]"
            >
              <span className="gradient-glow-hover">Start Project</span>
              <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 icon-glow-hover" />
            </motion.button>
          </div>

          {/* Right Column — Organizations */}
          <div
            className="flex flex-col items-center justify-center text-center py-24 px-8 cursor-default"
            onMouseEnter={() => setShape("network")}
            onMouseLeave={() => setShape("default")}
          >
            <div className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-full px-5 py-2 mb-10 shadow-sm">
              <span className="text-[11px] font-['Inter'] font-semibold text-[#111111] tracking-widest uppercase">
                Enterprise Scale
              </span>
            </div>
            <h2 className="text-[44px] md:text-[56px] leading-[1.05] font-['Space_Grotesk'] text-[#111111] font-normal tracking-tight mb-14">
              For organizations
              <br />
              <span className="text-gray-400 font-light">Level up your digital operations</span>
            </h2>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-1 group bg-[#F8F9FA] border border-gray-200 text-[#111111] hover:bg-white hover:border-gray-300 transition-colors duration-300 rounded-full px-8 py-3 text-[15px] font-medium shadow-lg shadow-black/5"
            >
              <span className="gradient-glow-hover">View Case Studies</span>
              <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 icon-glow-hover" />
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Mobile Layout ───
  return (
    <div ref={sectionRef} className="w-full bg-white relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col">
        {/* Card 1 */}
        <div
          className="flex flex-col items-center justify-center text-center py-20 px-6 min-h-[380px]"
          onTouchStart={() => setShape("brackets")}
          onTouchEnd={() => setShape("default")}
        >
          <div className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-full px-4 py-1.5 mb-6 shadow-sm">
            <span className="text-[10px] font-['Inter'] font-semibold text-[#111111] tracking-[0.15em] uppercase">
              Launch &amp; Grow
            </span>
          </div>
          <h2 className="text-[32px] leading-[1.1] font-['Space_Grotesk'] text-[#111111] font-normal tracking-tight mb-3">
            For startups
          </h2>
          <p className="text-[18px] font-['Space_Grotesk'] text-gray-400 font-light mb-10">
            Achieve new heights
          </p>
          <motion.button
            whileTap={{ scale: 0.96 }}
            className="btn-primary flex items-center gap-1 group px-7 py-2.5 text-[14px]"
          >
            <span>Start Project</span>
            <ArrowUpRight size={16} />
          </motion.button>
        </div>

        <div className="mx-auto w-16 h-px bg-gray-200" />

        {/* Card 2 */}
        <div
          className="flex flex-col items-center justify-center text-center py-20 px-6 min-h-[380px]"
          onTouchStart={() => setShape("network")}
          onTouchEnd={() => setShape("default")}
        >
          <div className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-full px-4 py-1.5 mb-6 shadow-sm">
            <span className="text-[10px] font-['Inter'] font-semibold text-[#111111] tracking-[0.15em] uppercase">
              Enterprise Scale
            </span>
          </div>
          <h2 className="text-[32px] leading-[1.1] font-['Space_Grotesk'] text-[#111111] font-normal tracking-tight mb-3">
            For organizations
          </h2>
          <p className="text-[18px] font-['Space_Grotesk'] text-gray-400 font-light mb-10">
            Level up your digital operations
          </p>
          <motion.button
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-1 group bg-[#F8F9FA] border border-gray-200 text-[#111111] rounded-full px-7 py-2.5 text-[14px] font-medium shadow-lg shadow-black/5"
          >
            <span>View Case Studies</span>
            <ArrowUpRight size={16} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
