import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { DottedBg } from "./shared/DottedBg";

const STATS = [
  { label: "150+ Projects" },
  { label: "24+ Markets" },
  { label: "99% Retention" },
];

export function AboutSection() {
  const navigate = useNavigate();
  return (
    <section
      id="about"
      className="relative overflow-hidden min-h-screen flex items-center py-32 md:py-40"
      style={{ background: "#FFFFFF", perspective: "1000px" }}
    >
      <DottedBg opacity={0.3} dotColor="rgba(99,102,241,0.08)" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-20 relative z-10">
        {/* Section label */}
        <div
          className="mb-16"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px", fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "0.16em",
            color: "#F7A521",
          }}
        >
          01 — About
        </div>

        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          {/* Left decorative column */}
          <div className="hidden md:block relative" style={{ width: "45%", flexShrink: 0 }}>
            <div
              className="absolute select-none pointer-events-none"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(80px, 15vw, 150px)",
                color: "rgba(61,57,137,0.05)",
                lineHeight: 1,
                top: "-10px",
                left: "0px",
                zIndex: 0,
                pointerEvents: "none",
              }}
            >
              01
            </div>
            <motion.div
              className="relative rounded-3xl overflow-hidden shadow-2xl mt-16"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
                alt="SK DIGITECH team collaboration"
                className="w-full aspect-[4/5] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3D3989]/40 to-transparent" />
            </motion.div>
          </div>

          {/* Right content column */}
          <motion.div
            className="flex flex-col items-start"
            style={{ flex: 1, zIndex: 1 }}
            initial={{ opacity: 0, y: 30, rotateY: -10, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(40px, 5vw, 72px)",
                letterSpacing: "-0.03em",
                lineHeight: 0.95,
                color: "#05050A",
                marginBottom: "28px",
              }}
            >
              Born in Uganda.<br />Built for the World.
            </h2>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "20px", fontWeight: 400,
                color: "#475569",
                lineHeight: 1.70,
                marginBottom: "40px",
                textAlign: "left",
                maxWidth: "600px"
              }}
            >
              SK DIGITECH is a full-service digital agency headquartered in Mukono, Uganda. We engineer websites, brand identities, e-commerce systems, and AI-powered products for clients across 24+ markets. Our work is built on precision, speed, and a relentless commitment to outcomes — not aesthetics alone.
            </p>

            {/* Stat pills */}
            <motion.div
              className="flex flex-wrap gap-3 mb-8"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              {STATS.map((stat) => (
                <span
                  key={stat.label}
                  className="rounded-full shadow-sm hover:shadow-md transition-shadow duration-300"
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(0,0,0,0.05)",
                    padding: "10px 20px",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px", fontWeight: 700,
                    color: "#05050A",
                  }}
                >
                  {stat.label}
                </span>
              ))}
            </motion.div>

            {/* CTA link */}
            <motion.button
              onClick={() => navigate("?contact=true")}
              className="group flex items-center gap-2 bg-transparent border-none cursor-pointer p-0"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "15px", fontWeight: 500,
                color: "#F7A521",
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className="group-hover:underline">Become a client</span>
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
