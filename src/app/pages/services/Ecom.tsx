import { useReducedMotion, LazyMotion, domAnimation, m } from "motion/react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, ArrowUpRight, ShoppingCart, Smartphone, Share2, Store, Package, Cog, Box } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════
// SK DIGITECH: CYBER-LUXURY E-COM ENGINEERING
// ═══════════════════════════════════════════════════════════════════════

const SERVICES = [
  {
    title: "ecommerce solutions",
    desc: "We develop different eCom solutions depending on the goals and business needs from simple online stores with a fast launch to the enterprise level which help brands succeed online.",
    tags: ["online stores", "professional native solution", "standard professional solution", "native enterprise solution"],
    glow: "group-hover:shadow-[0_0_40px_rgba(0,255,102,0.15)]",
    icon: ShoppingCart
  },
  {
    title: "mobile dev",
    desc: "We build cross-platform apps that run on iOS and Android through a single code base to expand reach, decrease risks and maximize velocity; create exceptional apps with attractive design.",
    tags: ["android app", "iOS app", "cross-platform app", "design and modernization"],
    glow: "group-hover:shadow-[0_0_40px_rgba(223,255,0,0.15)]",
    icon: Smartphone
  },
  {
    title: "social commerce",
    desc: "Social commerce sells products directly through social networks. It differs from Social Media Marketing in that you offer users the opportunity to make a purchase directly on the network they are using.",
    tags: ["effective sales", "customization", "usability"],
    glow: "group-hover:shadow-[0_0_40px_rgba(0,255,102,0.15)]",
    icon: Share2
  }
];

const EXPERTISE = [
  {
    title: "online stores",
    desc: "using the constructor for individual entrepreneurs, start-ups (small number of SKUs): fast and efficient access to your target audience with maximum sales channel coverage",
    icon: Store
  },
  {
    title: "standard professional solution",
    desc: "for small and medium-sized businesses: quick start and brand-specific styling, optimal price-quality ratio",
    icon: Box
  },
  {
    title: "professional native solution",
    desc: "with individual design and layout, tailored to the specific business processes",
    icon: Cog
  },
  {
    title: "native enterprise solution",
    desc: "for the needs of manufacturing and trading companies with deep automation and integration with accounting financial and production systems",
    icon: Package
  }
];

const CASES = [
  {
    title: "Dermalys Skincare products",
    date: "01.21",
    img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1200&q=85&auto=format&fit=crop" // Placeholder for dermalys
  },
  {
    title: "Swisslac products, made from Swiss raw materials",
    date: "10.23",
    img: "https://images.unsplash.com/photo-1550439062-609e1531270e?w=1200&q=85&auto=format&fit=crop" // Placeholder for swisslac
  },
  {
    title: "Aura Premium Cosmetics",
    date: "08.24",
    img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=85&auto=format&fit=crop"
  },
  {
    title: "Vanguard Tech Accessories",
    date: "06.24",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=85&auto=format&fit=crop"
  }
];

const NeonPill = ({ children, color = "green" }: { children: React.ReactNode, color?: "green" | "yellow" }) => (
  <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest border border-white/10 bg-white/5 backdrop-blur-md ${color === "green" ? "text-[#00ff66]" : "text-[#dfff00]"}`}>
    {children}
  </span>
);

export function Ecom() {
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
      <main className="w-full bg-[#050505] text-white min-h-screen font-sans selection:bg-[#00ff66] selection:text-black overflow-hidden relative">
        
        {/* Background ambient glow */}
        <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-[#00ff66]/10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />
        <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-[#dfff00]/10 rounded-full blur-[120px] translate-x-1/4 translate-y-1/4 pointer-events-none z-0" />
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
                <span className="w-2 h-2 bg-[#00ff66] rounded-full animate-pulse shadow-[0_0_10px_#00ff66]" />
                <span className="font-mono text-xs text-white/50 uppercase tracking-[0.2em]">01 – Capabilities - E-com</span>
              </div>
              
              <h1 className="text-[clamp(60px,8vw,140px)] font-bold leading-[0.85] tracking-[-0.04em] mb-8">
                digital e-com <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff66] to-[#dfff00]">{"{ is your expert }"}</span>
              </h1>
            </div>

            <div className="w-full lg:w-1/3 flex flex-col items-start lg:items-end gap-6 text-left lg:text-right">
              <p className="text-white/60 text-lg leading-relaxed font-light mb-4">
                Create and improve online sales systems. We develop and implement business processes & IT solutions to create a seamless shopping experience online in different sales channels.
              </p>
              <button onClick={() => navigate("?contact=true")} className="bg-gradient-primary text-white px-8 py-4 rounded-full font-bold text-[14px] flex items-center justify-center gap-3 hover:shadow-[0_0_25px_rgba(247,165,33,0.5)] hover:-translate-y-1 transition-all duration-300 group">
                Build Your Store
                <span className="bg-white/20 backdrop-blur-md text-white w-6 h-6 rounded-full flex items-center justify-center group-hover:bg-white/40 transition-colors">
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            </div>
          </m.div>

          {/* Cinematic Floating Product Graphic */}
          <div className="w-full flex justify-center mt-12 relative h-[50vh] md:h-[60vh] rounded-[32px] overflow-hidden border border-white/10 bg-white/5 group">
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 pointer-events-none" />
             <img 
                src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1600&q=85&auto=format&fit=crop" 
                alt="E-Commerce Interface" 
                className="w-full h-full object-cover mix-blend-luminosity opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-1000 ease-[0.16,1,0.3,1]"
             />
             <div className="absolute bottom-10 left-10 z-20">
               <NeonPill color="green">Omnichannel Strategy</NeonPill>
             </div>
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
        {/* EXPERTISE (Sticky Side-Scroll Section) */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* Added extra top/bottom padding to ensure a very prominent scrolling effect */}
        <section className="py-[140px] px-6 lg:px-16 w-full max-w-[1600px] mx-auto relative z-10 border-t border-white/10">
          <div className="flex flex-col lg:flex-row gap-24 relative">
            
            {/* Left sticky headline */}
            <div className="lg:w-1/2 relative">
              <div className="lg:sticky lg:top-[30vh] h-max">
                <h2 className="text-[clamp(50px,8vw,120px)] font-bold leading-[0.9] tracking-[-0.04em] mb-12">
                  our <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff66] to-[#dfff00]">{"{ expertise }"}</span>
                </h2>
                
                <button onClick={() => navigate("?contact=true")} className="bg-gradient-primary text-white px-8 py-4 rounded-full font-bold text-[14px] flex items-center justify-center gap-3 hover:shadow-[0_0_25px_rgba(247,165,33,0.5)] hover:-translate-y-1 transition-all duration-300 group mt-12 w-max">
                  Become a client <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right side scrolling factors */}
            <div className="lg:w-1/2 flex flex-col gap-32 py-10 lg:pb-[20vh]">
              {EXPERTISE.map((factor, i) => {
                const Icon = factor.icon;
                return (
                  <m.div 
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="group border-l-2 border-white/10 pl-10 hover:border-[#00ff66] transition-colors duration-500"
                  >
                    <Icon className="w-10 h-10 text-white/20 group-hover:text-[#00ff66] transition-colors duration-500 mb-6" />
                    <h3 className="text-[40px] lg:text-[64px] font-bold leading-[0.95] tracking-[-0.03em] group-hover:text-white transition-colors duration-300 mb-6 max-w-lg">
                      {factor.title}
                    </h3>
                    <p className="text-[20px] text-white/50 leading-[1.6] font-light max-w-md">
                      {factor.desc}
                    </p>
                  </m.div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* CASES/PRODUCTS SHOWCASE */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <section className="py-[140px] px-6 lg:px-16 w-full max-w-[1600px] mx-auto relative z-10 border-t border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-8">
            <h2 className="text-[clamp(60px,8vw,140px)] font-bold leading-[0.85] tracking-[-0.04em]">
              products
            </h2>
            <div className="max-w-md">
              <NeonPill color="yellow">THAT DEEPEN CONNECTIONS</NeonPill>
              <p className="text-white/60 text-lg leading-relaxed font-light mt-6 mb-6">
                Online store development from basic analytics data to complex integrations within the framework of technical support.
              </p>
              <button onClick={() => navigate('/work')} className="px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest border border-[#00ff66]/30 bg-[#00ff66]/5 backdrop-blur-md text-[#00ff66] hover:bg-[#00ff66]/20 transition-all flex items-center gap-2">
                View Full Archive <ArrowRight className="w-3 h-3" />
              </button>
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
                
                <div className="flex justify-between items-start px-2">
                  <h3 className="font-bold text-[24px] tracking-[-0.02em] group-hover:text-[#00ff66] transition-colors duration-300 max-w-[80%] leading-[1.2]">
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
