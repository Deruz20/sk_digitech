import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

const METRICS = [
  { value: 24, label: "Markets", suffix: "" },
  { value: 150, label: "Projects", suffix: "+" },
  { value: 4, label: "Continents", suffix: "" },
  { value: 99, label: "Uptime", suffix: ".9%" },
];

function Counter({ from = 0, to, duration = 2, suffix = "" }: { from?: number, to: number, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = null;
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / (duration * 1000), 1);
        
        // Easing function (easeOutExpo)
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        setCount(Math.floor(easeProgress * (to - from) + from));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, from, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

export function MetricsSection() {
  return (
    <section
      id="metrics"
      className="relative w-full py-32 overflow-hidden"
      style={{ background: "#FAF9F7", borderTop: "1px solid rgba(0,0,0,0.05)", perspective: "1000px" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {METRICS.map((metric, i) => (
            <motion.div 
              key={metric.label}
              className="flex flex-col items-center md:items-start text-center md:text-left"
              initial={{ opacity: 0, y: 50, rotateX: 30 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div 
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(48px, 8vw, 96px)",
                  lineHeight: 1,
                  color: "#05050A",
                  letterSpacing: "-0.03em",
                  marginBottom: "8px"
                }}
              >
                <Counter to={metric.value} suffix={metric.suffix} />
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(14px, 1.5vw, 18px)",
                  fontWeight: 600,
                  color: "#6366F1",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                }}
              >
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
