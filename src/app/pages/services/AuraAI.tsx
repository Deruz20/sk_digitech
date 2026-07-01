import { useReducedMotion, LazyMotion, domAnimation, m, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { 
  Network, Search, BrainCircuit, Workflow, MessageSquareText, Zap,
  Database, LineChart, ShieldCheck, Target, Loader2, Play, Activity,
  Code2, GitMerge, FileJson, ArrowRight, ChevronUp, Terminal, Cpu, CheckCircle2
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════
// DATA CONSTANTS & UTILS
// ═══════════════════════════════════════════════════════════════════════
const NODES = [
  { id: "request", label: "User Request", x: 10, y: 50, desc: "Ingests raw API triggers or natural language.", glow: "rgba(0, 255, 102, 0.6)" },
  { id: "intent", label: "Intent Analysis", x: 30, y: 20, desc: "Deconstructs input into actionable intent vectors.", glow: "rgba(223, 255, 0, 0.6)" },
  { id: "knowledge", label: "Knowledge Layer", x: 30, y: 80, desc: "Retrieves company context via RAG embeddings.", glow: "rgba(0, 255, 102, 0.6)" },
  { id: "reasoning", label: "Reasoning Engine", x: 55, y: 50, desc: "Decomposes the problem and applies logic.", glow: "rgba(223, 255, 0, 0.8)" },
  { id: "planner", label: "Task Planner", x: 80, y: 20, desc: "Generates multi-step tool-use workflows.", glow: "rgba(0, 255, 102, 0.6)" },
  { id: "response", label: "Response Generator", x: 80, y: 80, desc: "Synthesizes data into formatted outputs.", glow: "rgba(223, 255, 0, 0.6)" },
  { id: "action", label: "Business Action", x: 95, y: 50, desc: "Executes final API calls or database commits.", glow: "rgba(0, 255, 102, 1)" }
];

const CONNECTIONS = [
  { from: "request", to: "intent" },
  { from: "request", to: "knowledge" },
  { from: "intent", to: "reasoning" },
  { from: "knowledge", to: "reasoning" },
  { from: "reasoning", to: "planner" },
  { from: "reasoning", to: "response" },
  { from: "planner", to: "action" },
  { from: "response", to: "action" }
];

const NeonPill = ({ children, color = "green" }: { children: React.ReactNode, color?: "green" | "yellow" }) => (
  <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest border border-white/10 bg-white/5 backdrop-blur-md ${color === "green" ? "text-[#00ff66]" : "text-[#dfff00]"}`}>
    {children}
  </span>
);

// ═══════════════════════════════════════════════════════════════════════
// HERO: 3D NODE NETWORK SHOWCASE
// ═══════════════════════════════════════════════════════════════════════
function AuraIntelligenceCore({ navigate }: { navigate: any }) {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const getNode = (id: string) => NODES.find(n => n.id === id)!;

  // 3D Mouse Parallax effect for the node graph
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || prefersReducedMotion) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section className="min-h-screen pt-[160px] pb-24 px-6 md:px-12 w-full max-w-[1600px] mx-auto flex flex-col justify-center relative border-b border-white/10 overflow-visible">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 justify-between relative z-10 items-center">
        
        <m.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:w-[45%] pt-8"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="w-2 h-2 bg-[#00ff66] rounded-full animate-pulse shadow-[0_0_15px_#00ff66]" />
            <span className="font-mono text-xs text-white/50 uppercase tracking-[0.2em]">Aura Core v3.0 / Online</span>
          </div>

          <h1 className="text-[clamp(60px,7vw,120px)] leading-[0.85] tracking-[-0.04em] font-bold text-white mb-8">
            autonomous <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff66] to-[#dfff00]">execution.</span>
          </h1>

          <p className="text-white/60 text-lg leading-relaxed max-w-[480px] font-light mb-12">
            Aura is not a chat wrapper. It is a multi-agent cognitive architecture built to understand deep context, reason through systemic complexity, and execute business-critical actions natively.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => navigate("?contact=true")} className="bg-gradient-primary text-white px-8 py-4 rounded-full font-bold text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(247,165,33,0.6)] hover:-translate-y-1 flex items-center justify-center gap-2 group w-max">
              Deploy Intelligence <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="#lab" className="px-8 py-4 rounded-full font-bold text-sm text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors w-max text-center flex items-center gap-2 backdrop-blur-md">
              <Terminal className="w-4 h-4" /> Enter Lab
            </a>
          </div>
        </m.div>

        {/* 3D Node Graph Area */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
          className="lg:w-[55%] relative flex items-center justify-center min-h-[500px] perspective-[1000px]"
        >
          {/* Ambient Glow behind graph */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#00ff66]/20 to-[#dfff00]/20 rounded-full blur-[120px] pointer-events-none" />

          <m.div 
            animate={{ 
              rotateX: mousePos.y * -15, 
              rotateY: mousePos.x * 15 
            }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            className="relative w-full max-w-[700px] aspect-[4/3] z-10 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[40px] shadow-[0_0_50px_rgba(0,255,102,0.05)] overflow-visible transform-style-3d"
          >
            
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0 0 8px rgba(0,255,102,0.3))' }}>
              {CONNECTIONS.map((conn, i) => {
                const from = getNode(conn.from);
                const to = getNode(conn.to);
                const path = `M ${from.x}% ${from.y}% C ${(from.x + to.x)/2}% ${from.y}%, ${(from.x + to.x)/2}% ${to.y}%, ${to.x}% ${to.y}%`;
                
                return (
                  <g key={i}>
                    <path d={path} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
                    <m.path 
                      d={path} 
                      fill="none" 
                      stroke="url(#gradient-line)" 
                      strokeWidth="3"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "linear",
                        delay: prefersReducedMotion ? 0 : i * 0.4
                      }}
                    />
                  </g>
                );
              })}
              <defs>
                <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00ff66" />
                  <stop offset="100%" stopColor="#dfff00" />
                </linearGradient>
              </defs>
            </svg>

            {NODES.map((node) => (
              <div 
                key={node.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-20"
                style={{ 
                  left: `${node.x}%`, 
                  top: `${node.y}%`,
                  transform: `translateZ(${activeNode === node.id ? '40px' : '0px'})`
                }}
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
              >
                {/* Node Orb */}
                <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full transition-all duration-500 flex items-center justify-center border border-white/20
                  ${activeNode === node.id 
                    ? 'bg-[#00ff66] shadow-[0_0_30px_rgba(0,255,102,0.8)] scale-125' 
                    : 'bg-black backdrop-blur-md group-hover:border-[#00ff66]/50'}
                `}>
                  <div className={`w-2 h-2 rounded-full ${activeNode === node.id ? 'bg-black' : 'bg-[#00ff66] shadow-[0_0_10px_#00ff66]'}`} />
                </div>
                
                <div className={`absolute top-10 whitespace-nowrap text-[10px] md:text-xs font-mono uppercase tracking-widest transition-colors duration-300
                  ${activeNode === node.id ? 'text-[#00ff66] font-bold' : 'text-white/40 hidden md:block'}
                `}>
                  {node.label}
                </div>

                <AnimatePresence>
                  {activeNode === node.id && (
                    <m.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-16 w-72 p-5 rounded-2xl border border-white/20 bg-black/80 backdrop-blur-xl shadow-2xl z-50 text-left pointer-events-none overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#00ff66] to-[#dfff00]" />
                      <div className="flex items-center gap-3 mb-3">
                        <Cpu size={16} className="text-[#00ff66]" />
                        <span className="font-mono font-bold text-xs text-white uppercase">{node.label}</span>
                      </div>
                      <div className="text-xs text-white/60 font-light leading-relaxed">
                        {node.desc}
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </m.div>
        </div>

      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// PHASE 3 — IDE-LEVEL AURA LAB (DARK MODE REWRITE)
// ═══════════════════════════════════════════════════════════════════════
type TaskCategory = "Software Architecture" | "E-Commerce Strategy" | "Workflow Automation";
type TaskState = "idle" | "understanding" | "context" | "planning" | "output";

const LAB_TASKS: Record<TaskCategory, { input: string, icon: React.FC<any>, output: React.ReactNode }> = {
  "Software Architecture": {
    input: "Design a scalable high-frequency trading backend infrastructure.",
    icon: Code2,
    output: (
      <div className="space-y-6 text-white font-mono text-sm leading-relaxed">
        <div>
          <span className="text-black font-bold bg-[#00ff66] px-2 py-1 rounded text-xs">AURA_ARCHITECT_v3</span>
          <div className="mt-4 pl-4 border-l border-white/20">
            <span className="text-[#00ff66]">const</span> architecture = {'{'}
            <br/><span className="pl-4"><span className="text-[#dfff00]">gateway:</span> 'Rust/Actix-Web (Sub-microsecond latency)',</span>
            <br/><span className="pl-4"><span className="text-[#dfff00]">matcher:</span> 'C++ LMAX Disruptor Pattern',</span>
            <br/><span className="pl-4"><span className="text-[#dfff00]">cache:</span> 'Redis Enterprise (In-Memory)',</span>
            <br/><span className="pl-4"><span className="text-[#dfff00]">storage:</span> 'ClickHouse (Tick data OLAP)'</span>
            <br/>{'}'};
          </div>
        </div>
        <div>
          <span className="text-[#00ff66] font-bold">❯ Initiating IaC generation...</span>
          <br/><span className="text-white/40">↳ Terraform states compiled.</span>
        </div>
      </div>
    )
  },
  "E-Commerce Strategy": {
    input: "Analyze conversion dropoff and deploy a fix for the checkout flow.",
    icon: Target,
    output: (
      <div className="space-y-6 text-white text-sm leading-relaxed font-light">
        <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
          <h4 className="font-mono text-xs font-bold mb-3 flex items-center gap-2 text-[#00ff66] uppercase"><Search size={14}/> Diagnostic Report</h4>
          <p className="text-white/60">
            Telemetry indicates a <span className="text-white font-bold">42% dropoff</span> at step 2 (Shipping). Competitor benchmarking reveals our flow requires 3 more inputs than industry standard.
          </p>
        </div>
        <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
          <h4 className="font-mono text-xs font-bold mb-3 flex items-center gap-2 text-[#dfff00] uppercase"><Zap size={14}/> Executing Intervention</h4>
          <ul className="list-none text-white/60 space-y-3 font-mono text-xs">
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#00ff66]"/> Deployed Headless Apple/Google Pay bypass.</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#00ff66]"/> Overrode address validation strictness.</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#00ff66]"/> Activated SMS abandoned cart recovery webhook.</li>
          </ul>
        </div>
      </div>
    )
  },
  "Workflow Automation": {
    input: "Build customer support automation workflow.",
    icon: GitMerge,
    output: (
      <div className="space-y-6 text-white font-mono text-sm leading-relaxed">
        <div>
          <span className="text-[#00ff66] font-bold">Workflow Execution Pipeline:</span>
          <div className="mt-4 p-6 bg-white/5 border border-white/10 rounded-2xl text-xs space-y-3 text-white/50">
            <div className="text-white font-bold">[Webhook: Zendesk Ticket Ingestion]</div>
            <div className="pl-4 text-[#00ff66]">↓</div>
            <div className="pl-4 text-white">RAG Query → Knowledge Base</div>
            <div className="pl-8 text-[#00ff66]">↳ Intent Identified: Refund Request</div>
            <div className="pl-8 text-[#00ff66]">↳ Policy Check: Within 30 days (Pass)</div>
            <div className="pl-8 text-[#dfff00]">↳ Executing Stripe API Refund</div>
            <div className="pl-8 text-[#dfff00]">↳ Sending personalized resolution email</div>
          </div>
        </div>
      </div>
    )
  }
};

function InteractiveAuraLab() {
  const [activeCategory, setActiveCategory] = useState<TaskCategory>("Software Architecture");
  const [taskState, setTaskState] = useState<TaskState>("idle");

  const runSimulation = (category: TaskCategory) => {
    setActiveCategory(category);
    setTaskState("understanding");
    setTimeout(() => setTaskState("context"), 1200);
    setTimeout(() => setTaskState("planning"), 2400);
    setTimeout(() => setTaskState("output"), 3600);
  };

  return (
    <section id="lab" className="py-[140px] px-6 md:px-12 max-w-[1600px] mx-auto w-full border-b border-white/10">
      <div className="flex justify-between items-end mb-20">
        <h2 className="text-[clamp(40px,5vw,80px)] font-bold leading-[0.9] tracking-[-0.03em]">
          aura <span className="text-white/20">lab.</span>
        </h2>
        <NeonPill color="green">Live Simulation</NeonPill>
      </div>

      <div className="flex flex-col lg:flex-row h-[700px] border border-white/10 rounded-[32px] overflow-hidden shadow-[0_0_50px_rgba(0,255,102,0.05)] bg-[#0A0A0C]">
        
        {/* Sidebar */}
        <div className="lg:w-[360px] bg-white/5 border-r border-white/10 flex flex-col">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-white/40 uppercase tracking-widest">Select Protocol</span>
            <div className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse" />
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {(Object.keys(LAB_TASKS) as TaskCategory[]).map(cat => {
              const Icon = LAB_TASKS[cat].icon;
              const isActive = activeCategory === cat;
              const isLocked = taskState !== "idle" && taskState !== "output";
              return (
                <div 
                  key={cat}
                  onClick={() => !isLocked ? runSimulation(cat) : null}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 relative overflow-hidden
                    ${isActive ? 'bg-white/10 border-[#00ff66]/50 shadow-[0_0_20px_rgba(0,255,102,0.1)]' : 'bg-transparent border-white/5 hover:border-white/20'}
                    ${isLocked ? 'opacity-30 cursor-not-allowed' : ''}
                  `}
                >
                  {isActive && <div className="absolute top-0 left-0 w-1 h-full bg-[#00ff66]" />}
                  <div className={`font-mono font-bold text-xs uppercase tracking-wide mb-3 flex items-center gap-3 ${isActive ? 'text-[#00ff66]' : 'text-white/60'}`}>
                    <Icon size={16} />
                    {cat}
                  </div>
                  <p className="text-xs font-light text-white/40 leading-relaxed italic">
                    "{LAB_TASKS[cat].input}"
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Editor */}
        <div className="flex-1 flex flex-col relative bg-[#050505]">
          <div className="flex border-b border-white/10 bg-[#0A0A0C]">
            <div className="px-8 py-4 bg-[#050505] flex items-center gap-2 text-xs font-mono text-[#00ff66] border-t-2 border-t-[#00ff66] border-r border-white/10">
              <Terminal size={14} />
              aura_terminal.exe
            </div>
            <div className="px-8 py-4 flex items-center gap-2 text-xs font-mono text-white/30 border-r border-white/10">
              <Activity size={14} />
              runtime_telemetry.log
            </div>
          </div>

          <div className="flex-1 p-8 md:p-12 overflow-y-auto relative font-mono">
            {taskState === "idle" ? (
              <div className="h-full flex flex-col items-center justify-center text-white/20 group">
                <Play size={64} className="mb-6 opacity-50 group-hover:opacity-100 group-hover:text-[#00ff66] transition-all duration-500" />
                <p className="text-sm font-mono tracking-widest uppercase opacity-50">Awaiting Command Input_</p>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto w-full">
                <div className="mb-12 pb-6 border-b border-white/10">
                  <div className="text-xs text-[#00ff66] font-bold uppercase tracking-widest mb-3">❯ User Prompt</div>
                  <div className="text-white text-xl font-light tracking-tight italic">
                    "{LAB_TASKS[activeCategory].input}"
                  </div>
                </div>

                {taskState !== "output" && (
                  <div className="space-y-6 font-mono text-sm">
                    
                    <div className={`flex items-center gap-4 ${taskState === "understanding" ? 'text-white' : 'text-white/40'}`}>
                      {taskState === "understanding" ? <Loader2 size={16} className="animate-spin text-[#dfff00]" /> : <span className="text-[#00ff66]">✓</span>}
                      <span>[1/3] Deconstructing natural language intent vectors...</span>
                    </div>

                    {(taskState === "context" || taskState === "planning") && (
                      <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex items-center gap-4 ${taskState === "context" ? 'text-white' : 'text-white/40'}`}>
                        {taskState === "context" ? <Loader2 size={16} className="animate-spin text-[#dfff00]" /> : <span className="text-[#00ff66]">✓</span>}
                        <span>[2/3] Querying enterprise knowledge graph via RAG...</span>
                      </m.div>
                    )}

                    {taskState === "planning" && (
                      <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex items-center gap-4 text-white`}>
                        <Loader2 size={16} className="animate-spin text-[#dfff00]" />
                        <span>[3/3] Orchestrating autonomous sub-agents...</span>
                      </m.div>
                    )}
                  </div>
                )}

                {taskState === "output" && (
                  <m.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5 }}
                  >
                    <div className="text-xs text-[#00ff66] font-bold uppercase tracking-widest mb-8">❯ System Output</div>
                    {LAB_TASKS[activeCategory].output}
                  </m.div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// CAPABILITIES & OUTCOMES
// ═══════════════════════════════════════════════════════════════════════
const CAPABILITIES = [
  { icon: MessageSquareText, title: "Support AI", desc: "Instantly resolve tier-1 and tier-2 tickets with perfect context." },
  { icon: Zap, title: "Automation", desc: "Connect disparate APIs to execute complex multi-step tasks natively." },
  { icon: Database, title: "Knowledge Mgmt", desc: "Turn disorganized company wikis into an omniscient oracle." },
  { icon: LineChart, title: "Business Intel", desc: "Chat with your SQL database to extract immediate insights." },
  { icon: ShieldCheck, title: "Compliance", desc: "Automate policy adherence checks across internal communications." },
  { icon: Target, title: "Sales Enablement", desc: "Auto-generate hyper-personalized outbound sequences." }
];

export function AuraAI() {
  const prefersReducedMotion = useReducedMotion();
  const navigate = useNavigate();

  // Force pure dark mode globally
  useEffect(() => {
    document.documentElement.style.setProperty('--background', '#050505');
    document.documentElement.style.setProperty('--text-1', '#ffffff');
    
    document.title = "Aura AI | Autonomous Cognitive Architecture";
    
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
        <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-[#dfff00]/5 rounded-full blur-[120px] translate-x-1/4 translate-y-1/4 pointer-events-none z-0" />
        
        {/* Noise texture overlay */}
        <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

        <AuraIntelligenceCore navigate={navigate} />
        <InteractiveAuraLab />
        
        {/* Capability Showcase */}
        <section className="py-[140px] px-6 md:px-12 max-w-[1600px] mx-auto w-full border-b border-white/10 relative z-10">
          <div className="flex justify-between items-end mb-20">
            <h2 className="text-[clamp(40px,5vw,80px)] font-bold leading-[0.9] tracking-[-0.03em]">
              capabilities
            </h2>
            <NeonPill color="yellow">Neural Network</NeonPill>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAPABILITIES.map((cap, i) => (
              <m.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-10 bg-white/5 border border-white/10 rounded-[32px] hover:bg-white/10 hover:border-[#00ff66]/50 transition-all duration-500 group overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ff66]/10 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-14 h-14 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center mb-8 text-[#00ff66] group-hover:scale-110 transition-transform duration-500">
                  <cap.icon size={24} className="stroke-[1.5px]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight relative z-10">{cap.title}</h3>
                <p className="font-light text-white/50 leading-relaxed relative z-10">{cap.desc}</p>
              </m.div>
            ))}
          </div>
        </section>

        {/* Business Outcomes */}
        <section className="py-[140px] px-6 md:px-12 max-w-[1600px] mx-auto w-full border-b border-white/10 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
            <div className="w-full lg:w-[40%]">
              <h2 className="text-[clamp(50px,8vw,100px)] font-bold leading-[0.9] tracking-[-0.04em] mb-8">
                business <br />
                <span className="text-white/20">outcomes.</span>
              </h2>
              <p className="text-lg text-white/50 font-light max-w-sm leading-relaxed">
                Avoid technical jargon overload. We deploy intelligence to solve specific operational bottlenecks and drive immediate ROI.
              </p>
            </div>

            <div className="w-full lg:w-[60%] grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { value: "24/7", label: "Respond Instantly", desc: "Never leave a customer waiting regardless of timezone." },
                { value: "-80%", label: "Reduce Repetitive Work", desc: "Eliminate manual data entry, routing, and reporting." },
                { value: "3x", label: "Increase Lead Conv.", desc: "Qualify leads and book meetings while intent is peak." },
                { value: "+45%", label: "Improve CSAT", desc: "Deliver accurate, context-aware support resolutions." }
              ].map((stat, i) => (
                <m.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="flex flex-col p-10 bg-white/5 border border-white/10 rounded-[32px] hover:border-[#dfff00]/50 transition-all duration-500"
                >
                  <span className="text-5xl lg:text-6xl font-bold tracking-tight text-[#dfff00] mb-6">{stat.value}</span>
                  <span className="text-xl font-bold text-white mb-3">{stat.label}</span>
                  <span className="font-light text-sm text-white/50">{stat.desc}</span>
                </m.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Final CTA */}
        <section className="py-[140px] px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center bg-white/5 border border-white/10 rounded-[40px] p-12 lg:p-24 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-[#00ff66]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <h2 className="text-[clamp(40px,6vw,80px)] leading-[0.9] tracking-[-0.04em] font-bold mb-12 relative z-10">
              ready to deploy <br/>
              <span className="text-[#00ff66]">intelligence?</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto relative z-10">
              <button onClick={() => navigate("?contact=true")} className="w-full sm:w-auto px-10 py-5 bg-gradient-primary text-white rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(247,165,33,0.6)] hover:-translate-y-1 transition-all duration-300 shadow-lg">
                Book a Strategy Session
              </button>
              <button onClick={() => navigate("/services/web")} className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-colors backdrop-blur-md">
                Explore Integrations
              </button>
            </div>
          </div>
        </section>

      </main>
    </LazyMotion>
  );
}
