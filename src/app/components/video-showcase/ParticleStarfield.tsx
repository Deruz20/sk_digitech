import { useEffect, useRef } from "react";

export const ParticleStarfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
      hue: number;
    }> = [];

    let animationId = 0;
    let width = 0;
    let height = 0;

    const initParticles = () => {
      particles.length = 0;
      const count = Math.min(80, Math.floor((width * height) / 8000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 1.4 + 0.4,
          opacity: Math.random() * 0.45 + 0.12,
          hue: Math.random() > 0.6 ? 260 : 30,
        });
      }
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    };

    const animate = () => {
      ctx.fillStyle = "rgba(5, 5, 5, 0.06)";
      ctx.fillRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        ctx.fillStyle =
          particle.hue === 260
            ? `rgba(139, 92, 246, ${particle.opacity})`
            : `rgba(247, 165, 33, ${particle.opacity * 0.6})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-starfield" aria-hidden="true" />;
};
