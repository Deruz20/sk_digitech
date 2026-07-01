import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Database, Shield, Cpu, Activity, Server, Layout, PenTool, MousePointer2 } from "lucide-react";
import type { ServiceSectionId } from "./types";

interface ServiceMockupProps {
  sectionId: ServiceSectionId;
}

// ==========================================
// PANEL A: AURA AI ENGINE
// ==========================================
const AuraAIMockup = () => {
  const [logs, setLogs] = useState<number[]>([]);

  useEffect(() => {
    const id = setInterval(() => {
      setLogs((prev) => {
        const newLogs = [...prev, Date.now()];
        if (newLogs.length > 5) newLogs.shift();
        return newLogs;
      });
    }, 800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mockup-panel panel-aura">
      <div className="aura-terminal">
        <div className="mac-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <div className="terminal-lines">
          {logs.map((log, i) => (
            <motion.div
              key={log}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="terminal-line"
            >
              <span className="prompt">~</span>
              <span className="command">aura execute --pipeline core_{log.toString().slice(-4)}</span>
              <span className="status">✓ verified</span>
            </motion.div>
          ))}
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="cursor-block"
          />
        </div>
      </div>
      
      <div className="aura-graph-module">
        <div className="graph-header">
          <Activity size={14} className="icon-pulse" />
          <div className="pulse-track">
            <motion.div 
              className="pulse-wave"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
          </div>
        </div>
        <div className="graph-bars">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="bar"
              animate={{ height: ["20%", `${40 + Math.random() * 60}%`, "20%"] }}
              transition={{ repeat: Infinity, duration: 2 + Math.random(), delay: i * 0.1 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// PANEL B: PERFORMANCE MATRIX
// ==========================================
const PerformanceMatrixMockup = () => {
  const [latency, setLatency] = useState(400);
  const [score, setScore] = useState(0);

  useEffect(() => {
    let t = 0;
    const interval = setInterval(() => {
      t += 0.05;
      if (t > 1) t = 1;
      setLatency(Math.round(400 - (400 - 12) * t));
      setScore(Math.round(0 + (99 - 0) * t));
      if (t >= 1) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mockup-panel panel-performance">
      <div className="metric-radial">
        <svg viewBox="0 0 100 100" className="radial-svg">
          <circle cx="50" cy="50" r="40" className="radial-bg" />
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            className="radial-fg"
            initial={{ strokeDashoffset: 251 }}
            animate={{ strokeDashoffset: 251 - (251 * score) / 100 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <div className="radial-value">
          <span className="num">{score}</span>
          <span className="dec">.9</span>
        </div>
      </div>

      <div className="metric-cards">
        <div className="metric-card">
          <Cpu size={16} />
          <div className="metric-data">
            <div className="metric-val">{latency}ms</div>
            <div className="metric-bar"><div className="fill" style={{ width: `${(latency/400)*100}%` }} /></div>
          </div>
        </div>
        <div className="metric-card skeleton-card">
          <Server size={16} />
          <div className="skeleton-lines">
            <motion.div className="skel" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5 }} />
            <motion.div className="skel short" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// PANEL C: CREATION CANVAS
// ==========================================
const CreationCanvasMockup = () => {
  return (
    <div className="mockup-panel panel-canvas">
      <div className="isometric-stack">
        <motion.div 
          className="layer base-layer"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid-pattern" />
        </motion.div>
        
        <motion.div 
          className="layer mid-layer"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: -20, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <svg className="node-path" viewBox="0 0 200 100">
            <motion.path 
              d="M10,90 Q50,10 100,50 T190,10" 
              fill="none" 
              stroke="#8B5CF6" 
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
            />
            <circle cx="10" cy="90" r="4" fill="#F7A521" />
            <circle cx="100" cy="50" r="4" fill="#F7A521" />
            <circle cx="190" cy="10" r="4" fill="#F7A521" />
          </svg>
        </motion.div>

        <motion.div 
          className="layer top-layer"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: -40, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="wire-ui">
            <div className="wire-header" />
            <div className="wire-hero" />
            <div className="wire-grid">
              <div className="wire-box" />
              <div className="wire-box" />
              <div className="wire-box" />
            </div>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className="floating-cursor"
        animate={{ x: [0, 80, 20, 100], y: [0, -40, -80, -20] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <MousePointer2 size={16} fill="#111" stroke="#fff" />
      </motion.div>
    </div>
  );
};

export const ServiceMockupView = ({ sectionId }: ServiceMockupProps) => {
  switch (sectionId) {
    case "aura-ai":
      return <AuraAIMockup />;
    case "performance-matrix":
      return <PerformanceMatrixMockup />;
    case "creation-canvas":
      return <CreationCanvasMockup />;
    default:
      return null;
  }
};
