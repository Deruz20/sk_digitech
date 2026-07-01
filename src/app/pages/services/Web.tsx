import { useReducedMotion, LazyMotion, domAnimation, m, useScroll, useTransform } from "motion/react";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, ArrowUpRight, Code, Layout, Globe, Server, Layers, Cpu, Smartphone } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════
// SK DIGITECH: CYBER-LUXURY WEB ENGINEERING
// ═══════════════════════════════════════════════════════════════════════

const SERVICES = [
  {
    title: "landing page",
    desc: "A highly-optimized one-page site with targeted information regarding a product or service designed to turn visitors into customers at maximum conversion rates.",
    tags: ["lead generation", "new launch", "events"],
    glow: "group-hover:shadow-[0_0_40px_rgba(223,255,0,0.15)]",
    icon: Globe
  },
  {
    title: "corporate website",
    desc: "A powerful company representation on the internet. Contains information about the company's activities, services, catalogs, and acts as the digital headquarters.",
    tags: ["brand", "company", "group"],
    glow: "group-hover:shadow-[0_0_40px_rgba(0,255,102,0.15)]",
    icon: Layout
  },
  {
    title: "multipage website",
    desc: "Complex architecture with a branched sitemap. Contains multiple portals and subpages within a structured menu, usually duplicated across several localized languages.",
    tags: ["branched sitemap", "unlimited scalability", "multilingual"],
    glow: "group-hover:shadow-[0_0_40px_rgba(223,255,0,0.15)]",
    icon: Layers
  }
];

const PRICING_FACTORS = [
  {
    title: "functional",
    desc: "The need to add personal accounts, secure authentication, real-time feeds, complex state management, or e-commerce capabilities.",
    icon: Cpu
  },
  {
    title: "complexity",
    desc: "A single landing page is faster to engineer than a multi-page corporate portal with CMS integration and custom 3D webGL assets.",
    icon: Layers
  },
  {
    title: "content",
    desc: "Whether we are responsible for the creation of high-end promotional videos, 3D renders, copywriting, or bespoke Lottie animations.",
    icon: Smartphone
  },
  {
    title: "services",
    desc: "Connecting external third-party tools, ERP/CRM integrations, complex analytics pipelines, and advanced SEO architectures.",
    icon: Server
  }
];

const CASES = [
  {
    title: "CMMZE",
    date: "07.24",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85&auto=format&fit=crop"
  },
  {
    title: "Zero E",
    date: "07.24",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=85&auto=format&fit=crop"
  },
  {
    title: "Revo Analytics",
    date: "06.24",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=85&auto=format&fit=crop"
  },
  {
    title: "Lamar Enterprise",
    date: "05.24",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85&auto=format&fit=crop"
  }
];

const NeonPill = ({ children, color = "green" }: { children: React.ReactNode, color?: "green" | "yellow" }) => (
  <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest border border-white/10 bg-white/5 backdrop-blur-md ${color === "green" ? "text-[#00ff66]" : "text-[#dfff00]"}`}>
    {children}
  </span>
);

export function Web() {
  const prefersReducedMotion = useReducedMotion();
  const navigate = useNavigate();

  // Force pure dark mode globally
  useEffect(() => {
    document.documentElement.style.setProperty('--background', '#050505');
    document.documentElement.style.setProperty('--text-1', '#ffffff');
    return () => {
      document.documentElement.style.removeProperty('--background');
      document.documentElement.style.removeProperty('--text-1');
    };
  }, []);

  // Macbook tilt animation
  const macbookRef = useRef(null);
  const { scrollYProgress: macbookScroll } = useScroll({
    target: macbookRef,
    offset: ["start end", "center center"]
  });
  const macbookRotateX = useTransform(macbookScroll, [0, 1], [15, 0]);
  const macbookScale = useTransform(macbookScroll, [0, 1], [0.9, 1]);
  const macbookY = useTransform(macbookScroll, [0, 1], [100, 0]);

  return (
    <LazyMotion features={domAnimation}>
      <main className="w-full bg-[#050505] text-white min-h-screen font-sans selection:bg-[#dfff00] selection:text-black overflow-hidden">
        
        {/* Background ambient glow */}
        <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-[#dfff00]/10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />
        <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-[#00ff66]/10 rounded-full blur-[120px] translate-x-1/4 translate-y-1/4 pointer-events-none z-0" />
        <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* HERO SECTION */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <section className="pt-[200px] pb-[100px] px-6 lg:px-16 w-full max-w-[1600px] mx-auto relative z-10">
          <m.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-16 mb-24"
          >
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-8">
                <span className="w-2 h-2 bg-[#dfff00] rounded-full animate-pulse shadow-[0_0_10px_#dfff00]" />
                <span className="font-mono text-xs text-white/50 uppercase tracking-[0.2em]">01 – Capabilities - Web</span>
              </div>
              
              <h1 className="text-[clamp(60px,8vw,140px)] font-bold leading-[0.85] tracking-[-0.04em] mb-8">
                digital web <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dfff00] to-[#00ff66]">{"{ smart approach }"}</span>
              </h1>
            </div>

            <div className="w-full lg:w-1/3 flex flex-col items-start lg:items-end gap-6 text-left lg:text-right">
              <p className="text-white/60 text-lg leading-relaxed font-light mb-4">
                Develop websites with an eye on SEO-optimization and extreme performance. We have over six years' experience creating user focused and highly effective websites using agile principles.
              </p>
              <button onClick={() => navigate("?contact=true")} className="bg-gradient-primary text-white px-8 py-4 rounded-full font-bold text-[14px] flex items-center justify-center gap-3 hover:shadow-[0_0_25px_rgba(247,165,33,0.5)] hover:-translate-y-1 transition-all duration-300 group">
                Discuss Architecture 
                <span className="bg-white/20 backdrop-blur-md text-white w-6 h-6 rounded-full flex items-center justify-center group-hover:bg-white/40 transition-colors">
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            </div>
          </m.div>

          {/* Cinematic Macbook Tilt */}
          <div className="w-full flex justify-center perspective-[2000px] mt-12">
            <m.div
              ref={macbookRef}
              style={{
                rotateX: prefersReducedMotion ? 0 : macbookRotateX,
                scale: prefersReducedMotion ? 1 : macbookScale,
                y: prefersReducedMotion ? 0 : macbookY,
                transformStyle: "preserve-3d",
              }}
              className="w-full max-w-[1400px] relative rounded-[32px] overflow-hidden shadow-[0_0_80px_rgba(223,255,0,0.1)] border border-white/10 bg-white/5"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10 pointer-events-none" />
              <img 
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&q=85&auto=format&fit=crop" 
                alt="Web Engineering Dashboard" 
                className="w-full h-auto object-cover aspect-[16/9] lg:aspect-[21/9] mix-blend-luminosity opacity-80"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center w-full">
                <Code className="w-16 h-16 text-[#dfff00] mx-auto mb-6 opacity-80" />
                <div className="text-3xl font-bold tracking-widest uppercase opacity-90">engineered for scale</div>
              </div>
            </m.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* SERVICES CARDS */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <section className="py-[140px] px-6 lg:px-16 w-full max-w-[1600px] mx-auto relative z-10 border-t border-white/10 mt-[100px]">
          <div className="flex items-center gap-4 mb-20">
            <span className="font-mono text-xs text-white/50 uppercase tracking-[0.2em]">02 – Our Services</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {SERVICES.map((srv, i) => {
              const Icon = srv.icon;
              return (
                <m.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`group relative flex flex-col p-10 lg:p-12 rounded-[40px] bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500 overflow-hidden ${srv.glow}`}
                >
                  {/* Subtle gradient background inspired by the screenshots but adapted for dark mode */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <h3 className="text-[40px] lg:text-[56px] font-bold leading-[0.9] tracking-[-0.04em] mb-8 relative z-10">
                    {srv.title.split(' ').map((word, wIdx) => (
                      <span key={wIdx} className="block">{word}</span>
                    ))}
                  </h3>
                  
                  <p className="text-[16px] leading-[1.6] text-white/60 mb-16 relative z-10 font-light">
                    {srv.desc}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-2 relative z-10">
                    {srv.tags.map((tag, tIndex) => (
                      <span key={tIndex} className="px-4 py-2 rounded-full text-[12px] font-medium tracking-wide bg-white/10 border border-white/5 text-white/80 backdrop-blur-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </m.div>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* PRICING FACTORS */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <section className="py-[140px] px-6 lg:px-16 w-full max-w-[1600px] mx-auto relative z-10 border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            
            {/* Left sticky headline */}
            <div className="lg:sticky lg:top-32 h-max">
              <h2 className="text-[clamp(50px,6vw,100px)] font-bold leading-[0.9] tracking-[-0.04em] mb-12">
                What does <br />
                the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff66] to-[#dfff00]">{"{ price }"}</span> <br />
                depend on
              </h2>
              
              <button onClick={() => navigate("?contact=true")} className="bg-gradient-primary text-white px-8 py-4 rounded-full font-bold text-[14px] flex items-center justify-center gap-3 hover:shadow-[0_0_25px_rgba(247,165,33,0.5)] hover:-translate-y-1 transition-all duration-300 group mt-12 w-max">
                Become a client <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right side factors */}
            <div className="flex flex-col gap-12">
              {PRICING_FACTORS.map((factor, i) => {
                const Icon = factor.icon;
                return (
                  <m.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="group"
                  >
                    <div className="flex items-center gap-6 mb-4">
                      <h3 className="text-[40px] lg:text-[60px] font-bold leading-[1.0] tracking-[-0.03em] group-hover:text-[#00ff66] transition-colors duration-300">
                        {factor.title}
                      </h3>
                    </div>
                    <p className="text-[18px] text-white/50 leading-[1.6] font-light max-w-lg">
                      {factor.desc}
                    </p>
                  </m.div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* CASES SHOWCASE */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <section className="py-[140px] px-6 lg:px-16 w-full max-w-[1600px] mx-auto relative z-10 border-t border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-8">
            <h2 className="text-[clamp(60px,8vw,140px)] font-bold leading-[0.85] tracking-[-0.04em]">
              user friendly
            </h2>
            <div className="max-w-md">
              <NeonPill color="green">AND HIGH QUALITY</NeonPill>
              <p className="text-white/60 text-lg leading-relaxed font-light mt-6">
                Using clear calls to action, smooth and fast functionality and breathtaking visual designs, we help increase your website's traffic, conversions and, ultimately, your business' revenue.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 gap-y-16">
            {CASES.map((item, i) => (
              <m.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative cursor-pointer"
              >
                <div className="w-full aspect-[4/3] rounded-[24px] overflow-hidden mb-6 relative border border-white/5 bg-white/5">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[1500ms] ease-[0.16,1,0.3,1]"
                  />
                  
                  {/* Floating Action Button */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 z-20">
                    <ArrowUpRight className="w-6 h-6 text-[#00ff66]" />
                  </div>
                </div>
                
                <div className="flex justify-between items-center px-2">
                  <h3 className="font-bold text-[24px] tracking-[-0.02em] group-hover:text-[#dfff00] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <span className="font-mono text-[14px] text-white/40 uppercase tracking-widest">{item.date}</span>
                </div>
              </m.div>
            ))}
          </div>
        </section>

      </main>
    </LazyMotion>
  );
}
