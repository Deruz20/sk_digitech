import React, { useEffect, useRef, useState } from "react";

interface ParticleVideoRendererProps {
  mode?: "idle" | "full";
}

export const ParticleVideoRenderer: React.FC<ParticleVideoRendererProps> = ({ mode = "full" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [act, setAct] = useState<number>(mode === "idle" ? 0 : 1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];
    let time = 0;
    
    const numParticles = mode === "full" ? 250 : 55;
    
    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    window.addEventListener("resize", resize);
    resize();

    // Initialize Particles
    for (let i = 0; i < numParticles; i++) {
      if (mode === "idle") {
        const isBrand = Math.random() < 0.15;
        particles.push({
          radius: Math.random() * (canvas.width * 0.4) + 50,
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.002 + 0.001,
          color: isBrand ? "#8B5CF6" : "#FFF8F0", // purple/blue tint or cream white
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.1 + 0.15,
        });
      } else {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 1.5 + 0.5,
          color: Math.random() > 0.5 ? "#6200EE" : "#FF5F00",
          opacity: 1,
        });
      }
    }

    const drawIdle = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height * 0.35; // upper portion focus
      
      particles.forEach((p) => {
        // Counterclockwise orbit
        p.angle -= p.speed;
        
        // Elliptical shape
        p.x = centerX + Math.cos(p.angle) * p.radius;
        p.y = centerY + Math.sin(p.angle) * (p.radius * 0.5);

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        const r = Math.max(0, p.size);
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1.0;
    };

    const drawAct1 = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      particles.forEach((p) => {
        const dx = centerX - p.x;
        const dy = centerY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        p.vx += (dx / dist) * 0.5 - (dy / dist) * 0.2;
        p.vy += (dy / dist) * 0.5 + (dx / dist) * 0.2;
        p.vx *= 0.92;
        p.vy *= 0.92;
        p.x += p.vx;
        p.y += p.vy;
        
        ctx.fillStyle = p.color;
        ctx.beginPath();
        const act1Radius = Math.max(0, p.size * (1 - dist / 500));
        ctx.arc(p.x, p.y, act1Radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawAct2 = () => {
      particles.forEach((p, i) => {
        p.x += Math.sin(time * 0.02 + i) * 1.5;
        p.y += Math.cos(time * 0.015 + i) * 1.5;
        
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        const act2Radius = Math.max(0, p.size);
        ctx.arc(p.x, p.y, act2Radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = dx * dx + dy * dy;
          if (dist < 8000) {
            ctx.strokeStyle = `rgba(98, 0, 238, ${1 - dist / 8000})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
    };

    const drawAct3 = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      particles.forEach((p) => {
        const dx = p.x - centerX;
        const dy = p.y - centerY;
        
        p.vx += dx * 0.01;
        p.vy += dy * 0.01;
        p.x += p.vx;
        p.y += p.vy;
        
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, 1 - (time - 500) * 0.01);
        ctx.beginPath();
        const act3Radius = Math.max(0, p.size);
        ctx.arc(p.x, p.y, act3Radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });
    };

    const render = () => {
      if (canvas.width === 0 || canvas.height === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      time++;
      
      // Clear screen
      ctx.fillStyle = (mode === "idle" || act === 3) ? "rgba(0,0,0,1)" : "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (mode === "idle") {
        if (act !== 0) setAct(0);
        drawIdle();
      } else {
        // Full 3-act sequence loop
        if (time < 180) {
          if (act !== 1) setAct(1);
          drawAct1();
        } else if (time < 500) {
          if (act !== 2) setAct(2);
          drawAct2();
        } else if (time < 650) {
          if (act !== 3) setAct(3);
          drawAct3();
        } else {
          time = 0; // Loop the sequence in modal
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode, act]);

  return (
    <div className="relative w-full h-full bg-black overflow-hidden flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* Sequence Overlay Text (Only in Full Mode) */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-8 w-full h-full pointer-events-none">
        {mode === "full" && act === 1 && (
          <div className="flex flex-col items-center animate-fade-in-out">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
              SK <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6200EE] to-[#FF5F00]">DIGITECH</span>
            </h2>
            <p className="text-xl text-slate-300 font-medium tracking-wide">
              Engineering The Future
            </p>
          </div>
        )}

        {mode === "full" && act === 2 && (
          <div className="max-w-2xl animate-fade-in-out">
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
              AURA AI <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6200EE] to-[#FF5F00] font-light">
                Data in Motion.
              </span>
            </h3>
          </div>
        )}

        {mode === "full" && act === 3 && (
          <div className="animate-fade-in-out">
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">
              Experience Liftoff.
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};
