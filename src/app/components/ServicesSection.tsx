import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { PenTool, Globe, ShoppingBasket, Code2, Sparkles } from "lucide-react";
import { DottedBg } from "./shared/DottedBg";
import { ScrollReveal } from "./shared/ScrollReveal";

const CARDS = [
  {
    id: "design",
    title: "design",
    tags: "branding · ui/ux · identity · packaging",
    desc: "Fueled by strategy and backed by strong technical ability and experience, we execute designs that are purposeful as well as beautiful",
    bgImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    iconColor: "#00E676", // Green
    Icon: PenTool,
    href: "/services/design",
  },
  {
    id: "web",
    title: "web",
    tags: "web studio · development · seo optimization",
    desc: "We have over 15 years' experience creating user focused and highly effective websites using agile principles",
    bgImage: "/images/web_bg.png",
    iconColor: "#AA00FF", // Purple
    Icon: Globe,
    href: "/services/web",
  },
  {
    id: "commerce",
    title: "e-com",
    tags: "online-store · mobile development · social com",
    desc: "Create a seamless shopping experience online in different sales channels via delivering an omnichannel strategy",
    bgImage: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2574&auto=format&fit=crop",
    iconColor: "#FF1744", // Pink/Red
    Icon: ShoppingBasket,
    href: "/services/e-com",
  },
  {
    id: "pro",
    title: "pro",
    tags: "design systems · digital marketing · gtm strategy",
    desc: "Combining strategy, creativity, technical ability and years of knowledge we help clients create and manage integrated digital channels that engage customers.",
    bgImage: "/images/pro_bg.png",
    iconColor: "#2962FF", // Blue
    Icon: Code2,
    href: "/services/pro",
    isWide: true,
  },
  {
    id: "aura",
    title: "aura",
    tags: "ai workflows · automation",
    desc: "Aura AI is our flagship product — a conversational business intelligence platform built for modern African enterprises.",
    bgImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop",
    iconColor: "#FF3D00", // Orange
    Icon: Sparkles,
    href: "/services/aura-ai",
  },
];

function ServiceCard({ card, delay }: { card: typeof CARDS[0], delay: number }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: delay }}
      className="h-full"
    >
      <Link to={card.href}
        className="block relative flex flex-col justify-between overflow-hidden cursor-pointer w-full group h-full"
        style={{
          borderRadius: "24px",
          padding: "32px",
          minHeight: "420px",
          textDecoration: "none",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${card.bgImage})`, willChange: "transform" }}
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Gradient overlay to ensure text readability */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/0 via-black/10 to-black/60 pointer-events-none opacity-90 mix-blend-multiply" />

        {/* Top: Circular Icon */}
        <div className="relative z-10 mb-16">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg"
            style={{ backgroundColor: card.iconColor }}
          >
            <card.Icon size={22} strokeWidth={2.5} />
          </div>
        </div>

        {/* Bottom: Title, Desc, Line, Tags */}
        <div className="relative z-10 flex flex-col mt-auto transform-gpu">
          <h3 className="font-['Space_Grotesk'] text-[56px] md:text-[72px] font-medium leading-[1] text-white tracking-[-0.04em] lowercase mb-4 drop-shadow-md transition-transform duration-300 group-hover:translate-x-2">
            {card.title}
          </h3>
          <p className="font-['Inter'] text-[15px] text-white/95 leading-[1.5] max-w-[95%] font-medium drop-shadow-md mb-6">
            {card.desc}
          </p>
          
          <hr className="border-white/30 mb-5" />

          <div className="flex flex-row w-full gap-2">
            {card.tags.split(" · ").map(tag => (
              <div 
                key={tag} 
                className="flex-auto min-w-0 flex justify-center items-center px-2 py-1.5 rounded-[100px] border border-white/40 bg-white/10 backdrop-blur-md transition-colors duration-300 group-hover:bg-white/20"
              >
                <span className="text-[11px] lg:text-[13px] font-medium lowercase tracking-wide font-['Inter'] text-white whitespace-nowrap overflow-hidden text-ellipsis block">
                  {tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative w-full py-12 md:py-16 overflow-hidden bg-transparent"
    >

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <ScrollReveal className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-[#05050A] font-['Inter'] text-[14px] font-medium uppercase tracking-[0.1em] opacity-50">02 — Capabilities</span>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {CARDS.map((card, i) => (
            <div key={card.id} className={card.isWide ? "md:col-span-2" : "md:col-span-1"}>
              <ServiceCard card={card} delay={i * 0.1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
