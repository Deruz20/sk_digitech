import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { ClientLogos } from "../components/ClientLogos";
import skLogo from "../../imports/sk_digitech_logo-1.png";

const VALUES = [
  {
    title: "integrity",
    description: "As a group we declare an integrity approach to our work and communication process. We can be expected to deliver what we promise on time.",
    image: "/images/integrity_artifact_1782480057845.png"
  },
  {
    title: "transparency",
    description: "We strive to make Digital healthier, more honest and transparent, to raise the service quality standards in the market, and to raise the business awareness level about Digital marketing potential.",
    image: "/images/transparency_artifact_1782480070661.png"
  },
  {
    title: "team",
    description: "We value teamwork. We're forward-thinking and we're problem solvers but we're the sum of our parts – we're nothing without each other.",
    image: "/images/team_artifact_1782480085547.png"
  },
  {
    title: "agility",
    description: "Change is the only constant in our world, and change means opportunity. But if we make a mistake (they happen), we'll own it, agility gives us a chance to correct or solve it fast and learn from it.",
    image: "/images/agility_artifact_1782480096378.png"
  }
];

function ValueItem({ val, index, hoveredValue, setHoveredValue }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [60, 0, 0, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.8, 1, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0, 1, 1, 0]);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (latest > 0.4 && latest < 0.6) {
        if (hoveredValue !== index) {
          setHoveredValue(index);
        }
      }
    });
  }, [scrollYProgress, index, hoveredValue, setHoveredValue]);

  return (
    <motion.div
      ref={ref}
      style={{ 
        rotateX, 
        scale, 
        opacity,
        transformPerspective: 1200,
        transformOrigin: "center center"
      }}
      className="flex flex-col gap-6 py-20 cursor-default"
    >
      <h3 className="text-[60px] md:text-[85px] font-medium tracking-tighter lowercase text-[#111] leading-none">
        {val.title}
      </h3>
      <p className="text-[19px] text-[#757575] font-['Inter'] leading-[1.6] max-w-2xl">
        {val.description}
      </p>
    </motion.div>
  );
}

export function About() {
  const navigate = useNavigate();
  // Typewriter effect state
  const fullText = "we support and inspire one another";
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  useEffect(() => {
    if (!isTyping) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 70); // typing speed
    return () => clearInterval(interval);
  }, [isTyping, fullText]);

  return (
    <div className="bg-[#FFFFFF] min-h-screen text-[#111111] pt-28 pb-20 px-6 md:px-16 font-['Space_Grotesk'] selection:bg-[#F7A521] selection:text-white">
      <div className="max-w-[1300px] mx-auto">

        {/* 1. Hero Section */}
        <div className="min-h-[calc(100vh-140px)] flex flex-col justify-center mb-32">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[60px] md:text-[80px] lg:text-[105px] leading-[0.85] font-medium tracking-tighter mb-10 max-w-[1200px]"
          >
            our data-driven decisions <br className="hidden md:block"/>
            <span className="bg-gradient-to-b from-[#6200EE] to-[#FF5F00] bg-clip-text text-transparent">{"{"}</span>
            grow
            <span className="bg-gradient-to-b from-[#6200EE] to-[#FF5F00] bg-clip-text text-transparent">{"}"}</span> businesses
          </motion.h1>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 w-full relative items-stretch">
            {/* Left side: Stats + Bento Grid */}
            <div className="w-full lg:w-[55%] grid grid-cols-1 md:grid-cols-2 gap-4 relative z-20">
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-[#F5F5F7] rounded-[32px] p-8 flex flex-col justify-center min-h-[180px] xl:min-h-[220px]"
              >
                <h3 className="text-6xl md:text-7xl font-bold mb-2 tracking-tighter text-[#111]">+15</h3>
                <p className="text-[#757575] font-['Inter'] text-lg font-medium">Years of experience</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-[#F5F5F7] rounded-[32px] p-8 flex flex-col justify-center min-h-[180px] xl:min-h-[220px]"
              >
                <h3 className="text-6xl md:text-7xl font-bold mb-2 tracking-tighter text-[#111]">+25</h3>
                <p className="text-[#757575] font-['Inter'] text-lg font-medium">Partners</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-[#F5F5F7] rounded-[32px] p-8 flex flex-col justify-center min-h-[180px] xl:min-h-[220px]"
              >
                <h3 className="text-6xl md:text-7xl font-bold mb-2 tracking-tighter text-[#111]">+500</h3>
                <p className="text-[#757575] font-['Inter'] text-lg font-medium leading-snug max-w-[200px]">Projects we have successfully completed</p>
              </motion.div>

              {/* Bento grid inside the 2x2 grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-transparent min-h-[180px] xl:min-h-[220px] h-full grid grid-cols-3 grid-rows-2 gap-2"
              >
                {[
                  { name: 'design', path: '/services/design', bg: 'url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop)', span: 1 },
                  { name: 'web', path: '/services/web', bg: 'url(/images/web_bg.png)', span: 1 },
                  { name: 'e-com', path: '/services/e-com', bg: 'url(https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2574&auto=format&fit=crop)', span: 1 },
                  { name: 'pro', path: '/services/pro', bg: 'url(/images/pro_bg.png)', span: 2 },
                  { name: 'aura ai', path: '/services/aura-ai', bg: 'url(https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop)', span: 1 }
                ].map((service) => (
                  <div 
                    key={service.name} 
                    onClick={() => navigate(service.path)}
                    className={`rounded-2xl p-3 flex items-start justify-start text-white shadow-[0_5px_15px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:scale-[1.03] hover:shadow-[0_15px_30px_rgba(0,0,0,0.1)] relative overflow-hidden group cursor-pointer ${service.span === 2 ? 'col-span-2' : 'col-span-1'} row-span-1`}
                  >
                    <div className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: service.bg }} />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent z-0 transition-opacity duration-300 group-hover:opacity-80" />
                    <span className="relative z-10 font-['Space_Grotesk'] font-semibold text-[12px] tracking-tight lowercase leading-none">{service.name}</span>
                  </div>
                ))}
              </motion.div>

            </div>

            {/* Right side: Text + Button + Artwork */}
            <div className="w-full lg:w-[45%] flex flex-col justify-between items-start lg:pl-6 xl:pl-10 relative z-20 py-2">
              
              <div className="max-w-[420px]">
                <p className="text-[19px] text-[#757575] font-['Inter'] mb-6 leading-[1.6]">
                  <span className="text-[#111] font-semibold">We are a group of divisions</span> with niche expertise, all focused on pioneering digital products.
                </p>
                <p className="text-[19px] text-[#757575] font-['Inter'] leading-[1.6]">
                  Our mission is to design and build digital products, curate user experiences, invest in bright ideas and turn complex problems into growth opportunities
                </p>
              </div>

              <button 
                onClick={() => navigate("/capabilities")}
                className="pointer-events-auto flex items-center justify-center gap-3 bg-gradient-primary text-white px-8 py-3 rounded-full font-bold text-[16px] transition-all duration-300 hover:shadow-[0_0_30px_rgba(247,165,33,0.6)] active:scale-95 border-none group mt-8"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Just look at our cases <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>

        {/* 2. Where we are */}
        <div className="mb-40">
          <span className="text-gray-400 font-['Inter'] text-sm mb-6 block uppercase tracking-widest font-semibold">
            02 — Where we are
          </span>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="w-full aspect-[21/9] min-h-[400px] rounded-[40px] overflow-hidden relative flex items-end p-10 md:p-16 group shadow-2xl"
          >
            {/* Background image / map */}
            <img 
              src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2000&auto=format&fit=crop" 
              alt="Kampala, Uganda"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Dark glass overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C]/90 via-[#0A0A0C]/30 to-transparent pointer-events-none" />
            
            {/* Content */}
            <div className="relative z-10 text-white flex flex-col md:flex-row md:items-end justify-between w-full gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4 text-[#F7A521]">
                  <MapPin size={36} />
                </div>
                <h2 className="text-5xl md:text-7xl font-bold font-['Space_Grotesk'] tracking-tight mb-2">
                  Uganda
                </h2>
                <p className="text-2xl md:text-3xl text-gray-300 font-['Inter'] font-light">
                  Mukono
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-4 rounded-2xl transition-transform duration-500 group-hover:-translate-y-2">
                <p className="font-['Inter'] text-lg font-medium tracking-wide">
                  Along Kampala-Jinja Road
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3. Values Section */}
        <div className="mb-40 flex flex-col lg:flex-row gap-16 relative">
          <div className="lg:w-[45%] relative">
            <div className="sticky top-40 flex flex-col">
              <h2 className="text-[80px] md:text-[110px] font-medium leading-[0.85] tracking-tighter text-[#111] mb-12">
                values
              </h2>
              
              {/* Image reveal area */}
              <div className="w-[90%] xl:w-[80%] aspect-[4/5] rounded-3xl overflow-hidden relative shadow-2xl hidden lg:block bg-[#F5F5F7]">
                <AnimatePresence mode="wait">
                  {hoveredValue !== null && (
                    <motion.div
                      key={hoveredValue}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      <img src={VALUES[hoveredValue].image} alt={VALUES[hoveredValue].title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/5" />
                    </motion.div>
                  )}
                </AnimatePresence>
                {hoveredValue === null && (
                   <div className="absolute inset-0 flex flex-col items-center justify-center text-[#A1A1AA] font-['Inter']">
                     <Sparkles size={32} className="mb-4 opacity-50" />
                     <span>Scroll to explore</span>
                   </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="lg:w-[55%] flex flex-col gap-[10vh] pt-[15vh] pb-[25vh]">
            {VALUES.map((val, i) => (
              <ValueItem 
                key={val.title} 
                val={val} 
                index={i} 
                hoveredValue={hoveredValue} 
                setHoveredValue={setHoveredValue} 
              />
            ))}
          </div>
        </div>

        {/* 4. Team Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            onViewportEnter={() => setIsTyping(true)}
            transition={{ duration: 0.8 }}
            className="w-full aspect-[21/9] min-h-[400px] max-h-[700px] rounded-[32px] md:rounded-[48px] overflow-hidden relative group shadow-2xl"
          >
            {/* Team image */}
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop" 
              alt="SK Digitech Team"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0C]/90 via-[#0A0A0C]/50 to-transparent pointer-events-none" />
            
            {/* Logo Top Left */}
            <div className="absolute top-8 left-8 md:top-12 md:left-16 flex items-center gap-2 z-10 pointer-events-none">
              <img src={skLogo} alt="SK Logo" className="object-contain h-[32px] md:h-[40px]" />
              <span style={{ fontFamily: "'Google Sans Flex', 'Inter', sans-serif", fontSize: "24px", letterSpacing: "-0.02em", display: "flex", alignItems: "center" }}>
                <span style={{ fontWeight: 800, background: "linear-gradient(90deg, #6200EE, #FF5F00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>SK</span>
                <span style={{ fontWeight: 500, color: "#FFFFFF", marginLeft: "0.15em" }}>Digitech</span>
              </span>
            </div>

            {/* Content overlay */}
            <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end items-start pointer-events-none">
              <div className="w-full max-w-[800px]">
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium text-white leading-[1.05] tracking-tight mb-8 h-[140px] md:h-[180px] flex flex-col justify-end">
                  <span>
                    {fullText.split("").map((char, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.05, delay: index * 0.03 + 0.5 }}
                      >
                        {char}
                      </motion.span>
                    ))}
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block w-[3px] h-[0.9em] ml-1 align-middle"
                      style={{ background: "linear-gradient(180deg, #6200EE, #FF5F00)" }}
                    />
                  </span>
                </h2>
                
                {/* Thin white underline across the text container */}
                <div className="w-full h-[1px] bg-white/40 mb-8" />
                
                <button 
                  onClick={() => navigate("?contact=true")}
                  className="pointer-events-auto flex items-center justify-center gap-3 bg-gradient-primary text-white px-8 py-3 rounded-full font-bold text-base transition-all duration-300 hover:shadow-[0_0_30px_rgba(247,165,33,0.6)] active:scale-95 border-none group"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Join our team <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 5. Our Clients */}
        <ClientLogos sectionPrefix="04 — Our Clients" />

      </div>
    </div>
  );
}
