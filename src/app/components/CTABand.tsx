import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { ScrollReveal } from "./shared/ScrollReveal";
import { DottedBg } from "./shared/DottedBg";

const SERVICE_CHIPS = ["design", "web", "commerce", "ai systems", "branding", "pro"];
const NAV_CHIPS = ["home", "capabilities", "cases", "blog", "about"];

export function CTABand() {
  const navigate = useNavigate();
  const handleContact = () => {
    navigate("?contact=true");
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#FFFFFF", padding: "100px 0" }}
    >
      <DottedBg opacity={0.2} />
      <div className="max-w-[1400px] mx-auto px-6 md:px-20 relative z-10">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-12">
            {/* Left column */}
            <div className="flex flex-col items-start" style={{ maxWidth: "700px" }}>
              {/* Availability badge */}
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="rounded-full"
                  style={{ width: "8px", height: "8px", background: "#6366F1", flexShrink: 0 }}
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "12px", fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: "0.14em",
                    color: "#475569",
                  }}
                >
                  Available for new projects
                </span>
              </div>

              {/* Headline */}
              <div className="mb-6">
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(56px, 10vw, 130px)",
                    letterSpacing: "-0.03em",
                    lineHeight: 0.95,
                    color: "#05050A",
                    textTransform: "uppercase"
                  }}
                >
                  New project
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(56px, 10vw, 130px)",
                    letterSpacing: "-0.03em",
                    lineHeight: 0.95,
                    background: "linear-gradient(90deg, #6366F1, #818CF8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textTransform: "uppercase"
                  }}
                >
                  on the horizon?
                </div>
              </div>

              {/* Service chips */}
              <div className="flex flex-wrap gap-2 mb-4">
                {SERVICE_CHIPS.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full"
                    style={{
                      background: "rgba(0,0,0,0.03)",
                      border: "1px solid rgba(0,0,0,0.1)",
                      padding: "0 14px",
                      height: "32px",
                      display: "inline-flex",
                      alignItems: "center",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "12px", fontWeight: 700,
                      textTransform: "uppercase", letterSpacing: "0.12em",
                      color: "#475569",
                    }}
                  >
                    {chip}
                  </span>
                ))}
              </div>

              {/* Quick nav */}
              <div className="flex flex-wrap gap-5">
                {NAV_CHIPS.map((nav) => (
                  <button
                    key={nav}
                    className="bg-transparent border-none cursor-pointer p-0"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "10px", fontWeight: 700,
                      textTransform: "uppercase", letterSpacing: "0.12em",
                      color: "#94A3B8",
                    }}
                    onClick={() => {
                      const el = document.querySelector(`#${nav === "capabilities" ? "services" : nav === "cases" ? "work" : nav}`);
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {nav}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-end w-full md:w-auto perspective-1000">
              <motion.button
                onClick={handleContact}
                className="group relative flex items-center justify-center gap-2 rounded-full font-bold overflow-hidden"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "18px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  padding: "0 48px",
                  height: "64px",
                  minWidth: "240px",
                  background: "#6366F1",
                  color: "#FFFFFF",
                  transformStyle: "preserve-3d",
                  border: "none",
                }}
                whileHover={{ scale: 1.05, y: -2, boxShadow: "0 10px 30px rgba(99,102,241,0.4)" }}
                whileTap={{ scale: 0.95, y: 0 }}
              >
                <span className="relative z-10 flex items-center gap-2">Start Project <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
              </motion.button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
