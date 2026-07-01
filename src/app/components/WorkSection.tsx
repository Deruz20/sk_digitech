import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { CampusSystemMockup } from "./mockups/CampusSystemMockup";
import { BakeryMockup } from "./mockups/BakeryMockup";
import { AuraAIMockup } from "./mockups/AuraAIMockup";
import { IndigoAIMockup } from "./mockups/IndigoAIMockup";

const FEATURED = {
  category: "Brand Identity + Web",
  name: "Kampala Commerce Hub",
  metric: "↑ 340% organic traffic in 90 days",
  bg: "#0A0A0C",
};

const GRID_CARDS = [
  {
    category: "E-Commerce",
    name: "Nile Digital Store",
    metric: "↑ 220% conversion rate",
    bg: "#050B14",
  },
  {
    category: "AI Product",
    name: "Aura AI Beta",
    metric: "2,400+ waitlist signups",
    bg: "#110A1F",
  },
  {
    category: "Fintech",
    name: "East Africa Fintech",
    metric: "Launched in 6 markets",
    bg: "#050510",
  },
];

export function WorkSection() {
  const navigate = useNavigate();
  return (
    <section
      id="work"
      className="min-h-screen flex items-center py-20 w-full"
      style={{ background: "#000000" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-20">
        <div
          className="mb-4"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px", fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "0.16em",
            color: "#F7A521",
          }}
        >
          03 — Selected Work
        </div>
        <h2
          className="mb-16"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(56px, 8vw, 110px)",
            letterSpacing: "-0.03em",
            lineHeight: 0.90,
            color: "#FFFFFF",
            textTransform: "uppercase"
          }}
        >
          Work That Moves Markets
        </h2>

        {/* Featured card */}
        <motion.div
          className="relative overflow-hidden flex items-end cursor-pointer mb-6 group"
          style={{
            background: FEATURED.bg,
            borderRadius: "32px",
            height: "clamp(400px, 50vw, 640px)",
            border: "1px solid #111"
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4, boxShadow: "0 30px 60px rgba(0,0,0,0.15)" }}
        >
          {/* Mockup Container */}
          <div className="absolute inset-0 flex items-center justify-center p-8 overflow-hidden pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500 scale-125 md:scale-100">
            <CampusSystemMockup />
          </div>

          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(10,10,12,0.95) 0%, rgba(10,10,12,0.4) 40%, transparent 100%)" }}
          />
          <div className="relative z-20 p-8 md:p-12 w-full">
            <span
              className="inline-flex items-center rounded-full mb-4"
              style={{
                background: "#F7A521",
                padding: "6px 14px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px", fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.12em",
                color: "white",
              }}
            >
              {FEATURED.category}
            </span>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(32px, 4vw, 48px)",
                color: "white",
                marginBottom: "8px",
                letterSpacing: "-0.02em"
              }}
            >
              {FEATURED.name}
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#F7A521",
                marginBottom: "12px",
              }}
            >
              {FEATURED.metric}
            </div>
            <button
              onClick={() => navigate("/work")}
              className="group flex items-center gap-1 bg-transparent border-none cursor-pointer p-0"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px", fontWeight: 700,
                color: "white",
              }}
            >
              View Case
              <span className="group-hover:translate-x-1 transition-transform duration-200"> →</span>
            </button>
          </div>
        </motion.div>

        {/* 3-card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {GRID_CARDS.map((card, i) => (
            <motion.div
              key={card.name}
              className="relative overflow-hidden flex items-end cursor-pointer group"
              style={{
                background: card.bg,
                borderRadius: "24px",
                height: "clamp(320px, 35vw, 400px)",
                border: "1px solid #111"
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
            >
              {/* Mockup Container */}
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500 scale-150">
                {i === 0 ? <BakeryMockup /> : i === 1 ? <AuraAIMockup /> : <IndigoAIMockup />}
              </div>

              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(10,10,12,0.95) 0%, rgba(10,10,12,0.4) 50%, transparent 100%)" }}
              />
              <div className="relative z-20 p-6 w-full">
                <span
                  className="inline-flex items-center rounded-full mb-3"
                  style={{
                    background: "rgba(247,165,33,0.20)",
                    border: "1px solid rgba(247,165,33,0.35)",
                    padding: "4px 12px",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "10px", fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: "0.12em",
                    color: "#F7A521",
                  }}
                >
                  {card.category}
                </span>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(18px, 2vw, 22px)",
                    color: "white",
                    marginBottom: "6px",
                  }}
                >
                  {card.name}
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#F7A521" }}>
                  {card.metric}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="flex justify-center">
          <motion.button
            onClick={() => navigate("/work")}
            className="flex items-center gap-2 bg-transparent border-none cursor-pointer group"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "15px", fontWeight: 700,
              color: "#F7A521",
            }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            View All Work
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
