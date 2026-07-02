import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import skLogo from "../../imports/sk_digitech_logo-1.png";

export const SKDigitechHero = () => {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  
  const headlineText = "Experience liftoff with the next-gen digital agency.";

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= headlineText.length) {
        setTypedText(headlineText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setIsTypingComplete(true), 300);
      }
    }, 45);

    return () => clearInterval(typingInterval);
  }, []);

  const handleCTA = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(href);
    }
  };

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center overflow-hidden w-full bg-[#07070A] text-[#F9FAFB]"
      style={{ 
        minHeight: "100vh",
        paddingTop: "clamp(5rem, 15vh, 10rem)",
        paddingBottom: "clamp(5rem, 10vh, 8rem)",
      }}
    >
      {/* Ultra-lightweight CSS Background Glow instead of heavy canvas particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#6200EE] opacity-20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#FF5F00] opacity-10 blur-[120px]" />
      </div>

      {/* Content Container */}
      <div className="relative flex flex-col items-center text-center px-4 md:px-6 z-10 w-full max-w-[1400px]">
        
        {/* SK Digitech Logo & Branding */}
        <motion.div
          className="mb-8 md:mb-12 flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={skLogo}
            alt="SK Digitech"
            className="object-contain filter invert opacity-90 h-6 md:h-8"
          />
          <span className="font-['Google_Sans_Flex','Inter',sans-serif] text-xl md:text-2xl tracking-tight flex items-center">
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#6200EE] to-[#FF5F00]">
              SK
            </span>
            <span className="font-normal text-[#F9FAFB] ml-1">Digitech</span>
          </span>
        </motion.div>

        {/* Typewriter Headline */}
        <div className="relative flex justify-center items-center w-full max-w-[1100px] mb-6 md:mb-8 min-h-[8rem] md:min-h-[14rem]">
          <h1 className="font-['Inter',sans-serif] font-extrabold text-4xl md:text-6xl lg:text-7xl tracking-tighter leading-[1.1] text-center inline-block">
            {typedText}
            {/* Gradient Cursor */}
            {!isTypingComplete && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                className="inline-block ml-1 md:ml-2 align-middle w-2 md:w-4 h-10 md:h-16 lg:h-20 bg-gradient-to-b from-[#6200EE] to-[#FF5F00] rounded-sm"
              />
            )}
          </h1>
        </div>

        {/* Supporting Paragraph */}
        <motion.p
          className="font-['Inter',sans-serif] text-base md:text-lg lg:text-xl font-light text-[#9CA3AF] leading-relaxed mb-10 md:mb-12 max-w-[90%] md:max-w-[700px] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isTypingComplete ? 1 : 0, y: isTypingComplete ? 0 : 20 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Websites, brand systems, e-commerce, and AI products — engineered for outcomes, performance, and global scale.
        </motion.p>

        {/* CTA row */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: isTypingComplete ? 1 : 0, scale: isTypingComplete ? 1 : 0.95 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <button
            onClick={() => handleCTA("?contact=true")}
            className="flex items-center justify-center font-medium px-8 h-12 md:h-14 rounded-full bg-white text-[#0B0F19] transition-transform hover:scale-105 active:scale-95 w-full sm:w-auto"
          >
            Start Project
          </button>

          <button
            onClick={() => handleCTA("/capabilities")}
            className="flex items-center justify-center font-medium px-8 h-12 md:h-14 rounded-full bg-white/5 backdrop-blur-md text-white border border-white/10 transition-transform hover:scale-105 active:scale-95 w-full sm:w-auto hover:bg-white/10"
          >
            Explore Services
          </button>
        </motion.div>
      </div>
    </section>
  );
};
