import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import { OrbitalDock } from "./video-showcase/OrbitalDock";
import "./VideoShowcase.css";

const SERVICES = [
  "Web Engineering",
  "AI Integration",
  "Graphics Design",
  "Branding",
  "E-Commerce",
  "App Development",
  "Unmatched Speed",
  "Impeccable Skill",
];

const SERVICE_INTERVAL_MS = 2500;
const YOUTUBE_EMBED_URL = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";

const ParticleStarfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true, willReadFrequently: false });
    if (!ctx) return;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
    }> = [];

    let animationId = 0;
    let width = 0;
    let height = 0;

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < 40; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.25,
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
      // Use clearRect with a slight semi-transparent overlay for motion blur trail
      ctx.fillStyle = "rgba(5, 5, 5, 0.04)";
      ctx.fillRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
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

export const VideoShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  const motionMouseX = useMotionValue(0);
  const motionMouseY = useMotionValue(0);
  const springConfig = { stiffness: 120, damping: 20, mass: 0.5 };
  const cursorX = useSpring(motionMouseX, springConfig);
  const cursorY = useSpring(motionMouseY, springConfig);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || isPlayingVideo) return;

    const interval = window.setInterval(() => {
      setCurrentServiceIndex((prev) => (prev + 1) % SERVICES.length);
    }, SERVICE_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [isInView, isPlayingVideo]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    motionMouseX.set(e.clientX);
    motionMouseY.set(e.clientY);
  };

  const handleContainerClick = () => {
    if (!isPlayingVideo) {
      setIsPlayingVideo(true);
    }
  };

  const closeVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlayingVideo(false);
  };

  const showPlayCursor = isHovering && !isPlayingVideo;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"]
  });

  const rawScale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const scale = useSpring(rawScale, { stiffness: 50, damping: 20, restDelta: 0.001 });

  return (
    <section className="video-showcase-section" ref={sectionRef}>
      <div className="video-showcase-inner">
        <motion.div
          ref={containerRef}
          className="video-player-outer"
          style={{ scale, willChange: "transform" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={handleContainerClick}
          role="button"
          tabIndex={0}
          aria-label={isPlayingVideo ? "Playing intro video" : "Play intro video"}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleContainerClick();
            }
          }}
        >
          <div className="cinematic-stage">
            <ParticleStarfield />

            <div className="services-loop-container">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentServiceIndex}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="services-text"
                >
                  {SERVICES[currentServiceIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="stage-branding">
              <h2 className="stage-title">SK Digitech</h2>
              <p className="stage-subtitle">Cinematic Excellence in Motion</p>
            </div>
          </div>

          {!isPlayingVideo && (
            <div className="absolute bottom-8 right-8 z-40">
              <button
                className="flex items-center justify-center w-16 h-16 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-white/70 hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 group shadow-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  handleContainerClick();
                }}
                aria-label="Play Intro Video"
              >
                <Play size={24} fill="currentColor" className="ml-1" />
              </button>
            </div>
          )}

          <AnimatePresence>
            {showPlayCursor && (
              <motion.div
                className="play-intro-button"
                style={{ left: cursorX, top: cursorY }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.2 }}
              >
                <Play size={14} fill="currentColor" aria-hidden="true" />
                <span>Play Intro</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        <div className="mt-16 w-full">
          <OrbitalDock />
        </div>
      </div>

      {/* Video Modal Overlay */}
      <AnimatePresence>
        {isPlayingVideo && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeVideo}
          >
            <motion.div
              className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors"
                onClick={closeVideo}
                aria-label="Close Video"
              >
                ✕
              </button>
              <iframe
                width="100%"
                height="100%"
                src={YOUTUBE_EMBED_URL}
                title="SK Digitech Intro"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
