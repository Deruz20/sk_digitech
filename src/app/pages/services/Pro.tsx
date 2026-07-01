import { useReducedMotion, LazyMotion, domAnimation, m } from "motion/react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, ArrowUpRight, PenTool, Layout, Target, Map, Megaphone, BarChart } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════
// SK DIGITECH: CYBER-LUXURY PRO ENGINEERING
// ═══════════════════════════════════════════════════════════════════════

const MARKETING_NEEDS = [
  {
    title: "design & build",
    desc: "Creating Design System contains both UI elements as well as standard Brand guidelines including the color palette, typography, and iconography.",
    icon: PenTool
  },
  {
    title: "campaign & content",
    desc: "Researching and rolling out strategic campaigns and creating written content, imagery and video.",
    icon: Megaphone
  },
  {
    title: "digital marketing",
    desc: "Driving traffic, engaging audiences and achieving conversions through organic search, paid advertising and social media.",
    icon: BarChart
  }
];

const SERVICES = [
  {
    title: "design systems",
    desc: "We create Design System that is an ecosystem of tools, guidelines, shared values and principles which help teams ship more efficiently consistent design and includes any element that should be standard across platforms.",
    tags: ["consistent design", "ui kit", "brand guidelines"],
    glow: "group-hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]",
    colSpan: "lg:col-span-1"
  },
  {
    title: "brand strategy",
    desc: "Brand strategy is a comprehensive plan encompassing specific, long-term goals that contribute to the success of company branding. It works with the component parts of brand that make it identifiable and brings them together to form a story.",
    tags: ["research & audit", "competitor analysis", "brand identity", "brand activation"],
    glow: "group-hover:shadow-[0_0_40px_rgba(0,255,102,0.15)]",
    colSpan: "lg:col-span-1"
  },
  {
    title: "digital marketing",
    desc: "Digital marketing strategy involves an assessment of specific goals that are achievable through online channels. In an era when many consumers transact business on their mobile devices, a well-executed strategy is crucial.",
    tags: ["seo", "smm", "content marketing", "e-mail marketing", "digital advertising"],
    glow: "group-hover:shadow-[0_0_40px_rgba(255,0,128,0.15)]",
    colSpan: "lg:col-span-1"
  },
  {
    title: "go-to-market strategy",
    desc: "A Go-to-Market (GTM) strategy is a comprehensive outline or guide on how to launch product to the market. It covers everything from who potential customer or target market is, to positioning tactics and pricing strategy.",
    tags: ["pricing strategy", "sales plan", "marketing plan", "omnichannel strategy"],
    glow: "group-hover:shadow-[0_0_40px_rgba(0,128,255,0.15)]",
    colSpan: "lg:col-span-1"
  }
];

const CLIENTS = [
  { name: "Pharmalink", logo: "Pharmalink" },
  { name: "Taboo", logo: "TABOO" },
  { name: "Pharmalys", logo: "Pharmalys" },
  { name: "Hotelline", logo: "HOTELLINE" },
  { name: "Safi", logo: "safi" },
  { name: "Swisslac", logo: "swisslac" },
  { name: "Dermalys", logo: "DERMALYS" },
  { name: "Moto", logo: "MOTO TOUAREG" },
  { name: "PrimaSure", logo: "PrimaSure" },
  { name: "MyAgent", logo: "MYAGENT RENT" },
  { name: "Safi H2O", logo: "safi H2O" },
  { name: "Safi Milk", logo: "safi Milk" }
];

const NeonPill = ({ children, color = "white" }: { children: React.ReactNode, color?: string }) => (
  <span className="px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest border border-white/10 bg-white/5 backdrop-blur-md text-white/80">
    {children}
  </span>
);

export function Pro() {
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
      <main className="w-full bg-[#050505] text-white min-h-screen font-sans selection:bg-[#0055ff] selection:text-white overflow-hidden relative">
        
        {/* Background ambient glow - Blue & Purple for Pro */}
        <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-[#0055ff]/10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />
        <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-[#dfff00]/5 rounded-full blur-[120px] translate-x-1/4 translate-y-1/4 pointer-events-none z-0" />
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
                <span className="w-2 h-2 bg-[#0055ff] rounded-full animate-pulse shadow-[0_0_10px_#0055ff]" />
                <span className="font-mono text-xs text-white/50 uppercase tracking-[0.2em]">01 – Capabilities - Pro</span>
              </div>
              
              <h1 className="text-[clamp(60px,8vw,140px)] font-bold leading-[0.85] tracking-[-0.04em] mb-8">
                digital pro <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0055ff] to-[#00aaff]">{"{ brings strategy to life }"}</span>
              </h1>
            </div>

            <div className="w-full lg:w-1/3 flex flex-col items-start lg:items-end gap-6 text-left lg:text-right">
              <p className="text-white/60 text-lg leading-relaxed font-light mb-4">
                Combining strategy, creativity, technical ability and years of knowledge we help clients create and manage integrated digital channels that engage customers. Always with the focus on achieving the results they require.
              </p>
              <button onClick={() => navigate("?contact=true")} className="bg-gradient-primary text-white px-8 py-4 rounded-full font-bold text-[14px] flex items-center justify-center gap-3 hover:shadow-[0_0_25px_rgba(247,165,33,0.5)] hover:-translate-y-1 transition-all duration-300 group mt-12 w-max">
                Start a Project
                <span className="bg-white/20 backdrop-blur-md text-white w-6 h-6 rounded-full flex items-center justify-center group-hover:bg-white/40 transition-colors">
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            </div>
          </m.div>

          {/* Cinematic 3D Abstract Graphic */}
          <div className="w-full flex justify-center mt-12 relative h-[50vh] md:h-[60vh] rounded-[32px] overflow-hidden border border-white/10 bg-white/5 group">
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 pointer-events-none" />
             <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=85&auto=format&fit=crop" 
                alt="Abstract Strategy Graphic" 
                className="w-full h-full object-cover mix-blend-luminosity opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-1000 ease-[0.16,1,0.3,1] saturate-[0.5] group-hover:saturate-100"
             />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* MARKETING NEEDS (Sticky Side-Scroll) */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <section className="py-[140px] px-6 lg:px-16 w-full max-w-[1600px] mx-auto relative z-10 border-t border-white/10">
          <div className="flex flex-col lg:flex-row gap-24 relative">
            
            {/* Left sticky headline */}
            <div className="lg:w-1/2 relative">
              <div className="lg:sticky lg:top-[30vh] h-max">
                <h2 className="text-[clamp(50px,8vw,120px)] font-bold leading-[0.9] tracking-[-0.04em] mb-12">
                  all your digital <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40 italic font-light">marketing needs</span>
                </h2>
                
                <div className="mt-12 hidden lg:block w-32 h-32 relative">
                  {/* Abstract rotating knot/shape representation */}
                  <div className="absolute inset-0 border-4 border-[#0055ff]/30 rounded-[40%] animate-[spin_10s_linear_infinite]" />
                  <div className="absolute inset-2 border-4 border-[#00aaff]/20 rounded-[40%] animate-[spin_15s_linear_infinite_reverse]" />
                </div>
              </div>
            </div>

            {/* Right side scrolling factors */}
            <div className="lg:w-1/2 flex flex-col gap-32 py-10 lg:pb-[20vh]">
              {MARKETING_NEEDS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <m.div 
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="group border-l-2 border-white/10 pl-10 hover:border-[#0055ff] transition-colors duration-500"
                  >
                    <Icon className="w-10 h-10 text-white/20 group-hover:text-[#0055ff] transition-colors duration-500 mb-6" />
                    <h3 className="text-[40px] lg:text-[64px] font-bold leading-[0.95] tracking-[-0.03em] group-hover:text-white transition-colors duration-300 mb-6">
                      {item.title}
                    </h3>
                    <p className="text-[20px] text-white/50 leading-[1.6] font-light max-w-md">
                      {item.desc}
                    </p>
                  </m.div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* SERVICES CARDS (Bento Grid) */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <section className="py-[140px] px-6 lg:px-16 w-full max-w-[1600px] mx-auto relative z-10 border-t border-white/10">
          <div className="flex items-center gap-4 mb-20">
            <span className="font-mono text-xs text-white/50 uppercase tracking-[0.2em]">02 – Our Services</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {SERVICES.map((srv, i) => (
              <m.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative flex flex-col p-10 lg:p-14 rounded-[40px] bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500 overflow-hidden ${srv.glow} ${srv.colSpan} min-h-[400px]`}
              >
                {/* Dynamic colored background glow per card */}
                <div className={`absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
                
                <h3 className="text-[40px] lg:text-[64px] font-bold leading-[0.9] tracking-[-0.04em] mb-8 relative z-10 max-w-[80%]">
                  {srv.title.split(' ').map((word, wIdx) => (
                    <span key={wIdx} className="block">{word}</span>
                  ))}
                </h3>
                
                <p className="text-[16px] leading-[1.6] text-white/60 mb-16 relative z-10 font-light max-w-lg">
                  {srv.desc}
                </p>

                <div className="mt-auto flex flex-wrap gap-2 relative z-10">
                  {srv.tags.map((tag, tIndex) => (
                    <NeonPill key={tIndex}>{tag}</NeonPill>
                  ))}
                </div>
              </m.div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* CLIENTS GRID */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <section className="py-[140px] px-6 lg:px-16 w-full max-w-[1600px] mx-auto relative z-10 border-t border-white/10">
          <div className="flex flex-col lg:flex-row gap-24 relative">
            
            {/* Left sticky headline */}
            <div className="lg:w-1/3 relative">
              <div className="lg:sticky lg:top-[30vh] h-max">
                <div className="flex items-center gap-4 mb-8">
                  <span className="font-mono text-xs text-white/50 uppercase tracking-[0.2em]">03 – Our Clients</span>
                </div>
                <h2 className="text-[clamp(50px,8vw,100px)] font-bold leading-[0.9] tracking-[-0.04em]">
                  We are <br />
                  trusted
                </h2>
              </div>
            </div>

            {/* Right side logo grid */}
            <div className="lg:w-2/3">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {CLIENTS.map((client, i) => (
                  <m.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="aspect-[3/2] flex flex-col items-center justify-center bg-white/[0.02] border border-white/5 rounded-[24px] group hover:bg-white/[0.05] hover:border-white/20 transition-colors duration-500 cursor-default"
                  >
                    <span className="font-bold text-xl tracking-widest text-white/40 group-hover:text-white transition-colors duration-500 text-center px-4">
                      {client.logo}
                    </span>
                  </m.div>
                ))}
              </div>
            </div>

          </div>
        </section>

      </main>
    </LazyMotion>
  );
}
