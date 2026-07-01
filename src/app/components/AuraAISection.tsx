import { motion } from "motion/react";
import { MessageSquare, Zap, BookOpen, Link2 } from "lucide-react";
import { useNavigate } from "react-router";

const FEATURES = [
  {
    Icon: MessageSquare,
    title: "Conversational Interfaces",
    desc: "Chat-native AI that speaks your customers' language, 24/7.",
  },
  {
    Icon: Zap,
    title: "Automated Workflows",
    desc: "Zero manual overhead. Maximum operational scale.",
  },
  {
    Icon: BookOpen,
    title: "Custom Knowledge Base",
    desc: "AI trained on your specific business context and data.",
  },
  {
    Icon: Link2,
    title: "CRM Integration",
    desc: "Connects seamlessly to your existing business stack.",
  },
];

export function AuraAISection() {
  const navigate = useNavigate();
  const handleWaitlist = () => {
    navigate("?contact=true");
  };

  return (
    <section
      id="aura"
      className="relative flex items-center justify-center overflow-hidden min-h-screen py-20 w-full"
      style={{
        background: "#FFFFFF",
        perspective: "1500px",
      }}
    >
      {/* Decorative background grid/dots */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(#6366F1 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          zIndex: 0,
        }}
      />

      <div
        className="relative z-10 flex flex-col items-center text-center px-6 md:px-10 w-full"
        style={{ maxWidth: "900px", margin: "0 auto" }}
      >
        {/* Flagship badge */}
        <motion.div
          className="inline-flex items-center rounded-full mb-8 shadow-sm"
          style={{ background: "#6366F1", padding: "8px 16px" }}
          initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
          whileInView={{ scale: 1, opacity: 1, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px", fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.14em",
              color: "white",
            }}
          >
            Flagship Product
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(64px, 12vw, 150px)",
            letterSpacing: "-0.03em",
            lineHeight: 0.90,
            color: "#05050A",
            marginBottom: "24px",
            textTransform: "uppercase",
          }}
          initial={{ opacity: 0, y: 40, rotateX: 15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Aura AI
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(18px, 2.5vw, 24px)",
            color: "#475569",
            lineHeight: 1.55,
            marginBottom: "48px",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          A smart business assistant ecosystem for modern African enterprises.
        </motion.p>

        {/* Feature grid 2x2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-10">
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.title}
              className="flex flex-col items-start text-left relative overflow-hidden group shadow-sm hover:shadow-xl transition-shadow duration-500"
              style={{
                background: "#FAFAFA",
                border: "1px solid rgba(0,0,0,0.05)",
                borderRadius: "24px",
                padding: "32px",
                transformStyle: "preserve-3d",
              }}
              initial={{ opacity: 0, y: 30, rotateY: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{
                y: -6,
                rotateY: 0,
              }}
            >
              <div className="absolute top-[-30px] right-[-30px] w-32 h-32 bg-[#6366F1]/10 blur-3xl rounded-full pointer-events-none" />
              <feat.Icon size={24} color="#6366F1" className="mb-3" />
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "16px", fontWeight: 700,
                  color: "#05050A", marginBottom: "8px",
                }}
              >
                {feat.title}
              </div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  color: "#475569",
                  lineHeight: 1.60,
                }}
              >
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          onClick={handleWaitlist}
          className="rounded-full font-bold text-white transition-all hover:scale-[1.02]"
          style={{
            fontFamily: "'DM Sans', 'Inter', sans-serif",
            fontSize: "16px", fontWeight: 700,
            padding: "0 32px", height: "56px",
            background: "linear-gradient(100deg, #FFB020 0%, #B027C0 50%, #6050E0 100%)",
            border: "none",
            boxShadow: "0 10px 25px rgba(96,80,224,0.3)"
          }}
          whileHover={{ y: -2, boxShadow: "0 15px 35px rgba(96,80,224,0.4)" }}
          whileTap={{ scale: 0.98 }}
        >
          Join the Waitlist
        </motion.button>
      </div>
    </section>
  );
}
