import { useReducedMotion, LazyMotion, domAnimation, m } from "motion/react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, ArrowUpRight, Code, PenTool, Layout, Box, MonitorSmartphone, PenLine } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════
// SK DIGITECH: THE ANTIGRAVITY SIGNATURE DESIGN
// Cyber-Luxury / Dark Mode / High-End Tech Agency
// ═══════════════════════════════════════════════════════════════════════

const SERVICES = [
  {
    title: "brand identity",
    desc: "We build visual systems that command authority. From primary marks to comprehensive guidelines, ensuring absolute consistency.",
    tags: ["logo design", "brand books", "visual language"],
    icon: PenTool,
    glow: "group-hover:shadow-[0_0_40px_rgba(0,255,102,0.15)]"
  },
  {
    title: "product ui/ux",
    desc: "Frictionless interfaces for complex systems. We architect user journeys that convert, wrapped in aesthetics that build trust.",
    tags: ["web apps", "mobile interfaces", "wireframing"],
    icon: Layout,
    glow: "group-hover:shadow-[0_0_40px_rgba(223,255,0,0.15)]"
  },
  {
    title: "web design",
    desc: "Marketing sites that don't just look pretty—they perform. High-conversion landing pages and immersive corporate websites.",
    tags: ["landing pages", "corporate sites", "interactions"],
    icon: Code,
    glow: "group-hover:shadow-[0_0_40px_rgba(0,255,102,0.15)]"
  },
  {
    title: "packaging",
    desc: "Physical manifestations of digital brands. We design packaging that jumps off the shelf and delivers a premium unboxing experience.",
    tags: ["box design", "labeling", "3d rendering"],
    icon: Box,
    glow: "group-hover:shadow-[0_0_40px_rgba(223,255,0,0.15)]"
  },
  {
    title: "art direction",
    desc: "Defining the overarching visual narrative. We direct photography, illustration styles, and 3D assets to create a cohesive universe.",
    tags: ["photography", "3d assets", "illustration"],
    icon: MonitorSmartphone,
    glow: "group-hover:shadow-[0_0_40px_rgba(0,255,102,0.15)]"
  },
  {
    title: "motion design",
    desc: "Adding the dimension of time. Micro-interactions, promotional videos, and UI animations that bring static designs to life.",
    tags: ["ui motion", "promos", "lottie"],
    icon: PenLine,
    glow: "group-hover:shadow-[0_0_40px_rgba(223,255,0,0.15)]"
  }
];

const CASES = [
  {
    title: "Helio FinTech App",
    category: "Product UI/UX",
    date: "09.24",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85&auto=format&fit=crop"
  },
  {
    title: "Aura Skincare Rebrand",
    category: "Brand Identity",
    date: "08.24",
    img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=85&auto=format&fit=crop"
  },
  {
    title: "Merida Labs Dashboard",
    category: "Product UI/UX",
    date: "07.24",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=85&auto=format&fit=crop"
  },
  {
    title: "Vanguard Architecture",
    category: "Web Design",
    date: "06.24",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85&auto=format&fit=crop"
  }
];

// Reusable micro-components
const NeonPill = ({ children, color = "green" }: { children: React.ReactNode, color?: "green" | "yellow" }) => (
  <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest border border-white/10 bg-white/5 backdrop-blur-md ${color === "green" ? "text-[#00ff66]" : "text-[#dfff00]"}`}>
    {children}
  </span>
);

export function Design() {
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

  return (
    <LazyMotion features={domAnimation}>
      <main className="w-full bg-[#050505] text-white min-h-screen font-sans selection:bg-[#00ff66] selection:text-black overflow-hidden">
        
        {/* Background ambient glow */}
        <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-[#00ff66]/10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />
        <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-[#dfff00]/5 rounded-full blur-[120px] translate-x-1/4 translate-y-1/4 pointer-events-none z-0" />
        
        {/* Noise texture overlay */}
        <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* HERO SECTION */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <section className="pt-[200px] pb-[100px] px-6 lg:px-16 w-full max-w-[1600px] mx-auto relative z-10 border-b border-white/10">
          <m.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-16"
          >
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-8">
                <span className="w-2 h-2 bg-[#00ff66] rounded-full animate-pulse shadow-[0_0_10px_#00ff66]" />
                <span className="font-mono text-xs text-white/50 uppercase tracking-[0.2em]">Service Architecture // 01</span>
              </div>
              
              <h1 className="text-[clamp(60px,8vw,140px)] font-bold leading-[0.85] tracking-[-0.04em] mb-8">
                design beyond <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff66] to-[#dfff00]">expectation.</span>
              </h1>
              
              <p className="text-[clamp(18px,2vw,24px)] text-white/60 leading-[1.6] max-w-2xl font-light">
                We engineer digital experiences that dominate markets. Not just pretty pixels—calculated, strategic, high-conversion visual architecture.
              </p>
            </div>

            <div className="w-full lg:w-auto flex flex-col items-start lg:items-end gap-6">
              <div className="w-full lg:w-72 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg flex flex-col gap-4">
                <div className="flex justify-between items-center text-white/40 text-xs font-mono uppercase tracking-widest">
                  <span>Client Win Rate</span>
                  <ArrowUpRight className="w-4 h-4 text-[#00ff66]" />
                </div>
                <div className="text-4xl font-bold">98<span className="text-[#00ff66]">%</span></div>
              </div>
              <button onClick={() => navigate("?contact=true")} className="w-full lg:w-auto bg-gradient-primary text-white px-10 py-5 rounded-full font-bold text-[15px] flex items-center justify-center gap-3 hover:shadow-[0_0_25px_rgba(247,165,33,0.5)] hover:-translate-y-1 transition-all duration-300 group">
                Initiate Project 
                <span className="bg-white/20 backdrop-blur-md text-white w-6 h-6 rounded-full flex items-center justify-center group-hover:bg-white/40 transition-colors">
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            </div>
          </m.div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* CAPABILITIES (Bento Grid) */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <section className="py-[140px] px-6 lg:px-16 w-full max-w-[1600px] mx-auto relative z-10 border-b border-white/10">
          <div className="flex justify-between items-end mb-20">
            <h2 className="text-[clamp(40px,5vw,80px)] font-bold leading-[0.9] tracking-[-0.03em]">
              capabilities
            </h2>
            <NeonPill color="yellow">Core Services</NeonPill>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((srv, i) => {
              const Icon = srv.icon;
              return (
                <m.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`group relative flex flex-col p-10 rounded-[32px] bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500 overflow-hidden ${srv.glow}`}
                >
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 text-[#00ff66]">
                    <Icon className="w-24 h-24 stroke-[1px]" />
                  </div>
                  
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-8 border border-white/10 group-hover:bg-[#00ff66]/20 transition-colors duration-500">
                    <Icon className="w-5 h-5 text-white group-hover:text-[#00ff66]" />
                  </div>

                  <h3 className="text-[28px] lg:text-[36px] font-bold leading-[1.1] tracking-[-0.02em] mb-4 relative z-10">
                    {srv.title}
                  </h3>
                  
                  <p className="text-[16px] leading-[1.6] text-white/60 mb-12 max-w-[90%] relative z-10">
                    {srv.desc}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-2 relative z-10">
                    {srv.tags.map((tag, tIndex) => (
                      <span key={tIndex} className="px-3 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-wider bg-black/50 border border-white/5 text-white/70">
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
        {/* SHOWCASE (Cinematic Layout) */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <section className="py-[140px] px-6 lg:px-16 w-full max-w-[1600px] mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-8">
            <h2 className="text-[clamp(60px,8vw,140px)] font-bold leading-[0.8] tracking-[-0.04em]">
              selected <br />
              <span className="text-white/20">works.</span>
            </h2>
            <div className="max-w-md">
              <p className="text-white/60 text-lg leading-relaxed font-light mb-6">
                A highly curated selection of our recent engagements. We don't just build websites; we architect digital empires.
              </p>
              <button onClick={() => navigate('/work')} className="px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest border border-[#00ff66]/30 bg-[#00ff66]/5 backdrop-blur-md text-[#00ff66] hover:bg-[#00ff66]/20 transition-all flex items-center gap-2 mt-4">
                View Full Archive <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CASES.map((item, i) => (
              <m.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative cursor-pointer"
              >
                <div className="w-full aspect-[4/3] rounded-[32px] overflow-hidden mb-6 relative">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700 z-10" />
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-[1500ms] ease-[0.16,1,0.3,1]"
                  />
                  
                  {/* Floating Action Button */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 z-20">
                    <span className="text-white text-xs font-bold uppercase tracking-widest">Explore</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-start px-2">
                  <div>
                    <h3 className="font-bold text-[28px] leading-[1.2] tracking-[-0.02em] group-hover:text-[#00ff66] transition-colors duration-300 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/50 text-[14px] font-medium tracking-wide uppercase">
                      {item.category}
                    </p>
                  </div>
                  <span className="font-mono text-[12px] text-white/40 uppercase tracking-widest">{item.date}</span>
                </div>
              </m.div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* PHILOSOPHY / CTA (Giant Marquee feel) */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <section className="py-[140px] px-6 lg:px-16 w-full max-w-[1600px] mx-auto relative z-10 border-t border-white/10 mt-16">
          <div className="bg-white/5 border border-white/10 rounded-[40px] p-10 lg:p-24 overflow-hidden relative group">
            {/* Ambient hover glow inside CTA */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-[#00ff66]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
              <div>
                <h2 className="text-[clamp(40px,6vw,90px)] font-bold leading-[0.9] tracking-[-0.03em] mb-8">
                  stop blending in. <br />
                  <span className="text-[#00ff66]">start dominating.</span>
                </h2>
                <p className="text-xl text-white/60 leading-[1.6] max-w-lg mb-12 font-light">
                  A remarkable result is the consequence of elite execution. We manage the process entirely, allowing you to focus on your business.
                </p>
                <button onClick={() => navigate("?contact=true")} className="bg-gradient-primary text-white px-10 py-5 rounded-full font-bold text-[15px] flex items-center gap-3 hover:shadow-[0_0_25px_rgba(247,165,33,0.5)] hover:-translate-y-1 transition-all duration-300">
                  Start a Project <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-col gap-8 lg:pt-4">
                <div className="p-8 rounded-2xl bg-black/50 border border-white/10 hover:border-[#00ff66]/50 transition-colors duration-300">
                  <h3 className="text-2xl font-bold mb-4">Timeless, Not Trendy.</h3>
                  <p className="text-white/50 leading-relaxed">We deconstruct trends and utilize them strategically. Our designs remain visually dominant for years, not months.</p>
                </div>
                <div className="p-8 rounded-2xl bg-black/50 border border-white/10 hover:border-[#dfff00]/50 transition-colors duration-300">
                  <h3 className="text-2xl font-bold mb-4">Calculated Execution.</h3>
                  <p className="text-white/50 leading-relaxed">Excellence requires a system. We prioritize, divide into strict stages, and execute flawlessly. No black boxes.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </LazyMotion>
  );
}
