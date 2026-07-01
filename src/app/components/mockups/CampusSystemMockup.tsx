import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { LayoutDashboard, Users, Calendar, Settings, Bell, BookOpen, TrendingUp } from "lucide-react";

export function CampusSystemMockup() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    // Simple loop to re-trigger animations every 6 seconds
    if (step === 0) {
      timeout = setTimeout(() => setStep(1), 500); 
    } else if (step === 1) {
      timeout = setTimeout(() => setStep(0), 6000); 
    }

    return () => clearTimeout(timeout);
  }, [step]);

  return (
    <div className="w-full h-full bg-[#050B14] relative overflow-hidden flex items-center justify-center p-4 group-hover:scale-105 transition-transform duration-700">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-[#050B14] to-[#050B14]" />
      
      {/* iMac Monitor CSS Frame */}
      <div className="relative flex flex-col items-center mt-2 w-[95%] max-w-[400px] z-10">
        
        {/* Monitor Screen */}
        <div className="w-full aspect-[16/9] bg-[#050B14] rounded-xl border-[6px] border-[#1a1a1a] relative overflow-hidden shadow-2xl flex flex-col">
          
          {/* Dashboard App Container */}
          <div className="flex-1 bg-[#0A1120]/80 backdrop-blur-xl flex overflow-hidden relative z-10">
        
        {/* Sidebar */}
        <div className="w-14 h-full border-r border-blue-900/30 flex flex-col items-center py-4 bg-[#070D19]">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            <BookOpen size={14} className="text-white" />
          </div>
          
          <div className="flex flex-col gap-4 w-full items-center">
            <div className="w-full flex justify-center relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-cyan-400 rounded-r-full shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
              <LayoutDashboard size={16} className="text-cyan-400" />
            </div>
            <Users size={16} className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer" />
            <Calendar size={16} className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer" />
          </div>
          
          <div className="mt-auto flex flex-col gap-4">
            <Settings size={16} className="text-slate-600" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full relative">
          
          {/* Header */}
          <div className="h-12 border-b border-blue-900/30 flex items-center justify-between px-5 bg-gradient-to-r from-transparent to-blue-900/10">
            <div className="flex flex-col">
              <span className="text-slate-200 font-semibold text-[11px] tracking-wide">Campus Overview</span>
              <span className="text-slate-500 text-[8px] uppercase tracking-widest">Live System Data</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bell size={14} className="text-slate-400" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border border-[#0A1120]" />
              </div>
              <div className="w-6 h-6 rounded-full bg-slate-700 border border-slate-600" />
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="flex-1 p-4 grid grid-cols-3 gap-3 overflow-hidden">
            
            {/* Main Chart Area (Spans 2 columns) */}
            <div className="col-span-2 flex flex-col gap-3">
              {/* Top Stats Cards */}
              <div className="flex gap-3">
                <div className="flex-1 bg-gradient-to-br from-blue-900/20 to-transparent border border-blue-800/30 rounded-lg p-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-10">
                    <Users size={32} />
                  </div>
                  <span className="text-slate-400 text-[9px] uppercase font-bold tracking-wider">Total Students</span>
                  <div className="text-white font-bold text-lg mt-1 flex items-baseline gap-2">
                    {step === 1 ? (
                      <motion.span animate={{ opacity: [0, 1] }} transition={{ duration: 1 }}>14,208</motion.span>
                    ) : "14,208"}
                    <span className="text-green-400 text-[8px] font-medium flex items-center"><TrendingUp size={8} className="mr-0.5"/> +2.4%</span>
                  </div>
                </div>
                
                <div className="flex-1 bg-gradient-to-br from-cyan-900/20 to-transparent border border-cyan-800/30 rounded-lg p-3">
                  <span className="text-slate-400 text-[9px] uppercase font-bold tracking-wider">Active Staff</span>
                  <div className="text-white font-bold text-lg mt-1">1,842</div>
                </div>
              </div>

              {/* Huge Data Chart */}
              <div className="flex-1 bg-[#050914]/50 border border-blue-900/20 rounded-lg p-3 flex flex-col relative">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300 text-[10px] font-medium">Campus Network Traffic</span>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  </div>
                </div>
                
                {/* CSS SVG Chart Animation */}
                <div className="flex-1 w-full relative mt-2 border-l border-b border-blue-900/30">
                  {step === 1 && (
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                      {/* Grid lines */}
                      <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(30,58,138,0.2)" strokeWidth="0.5" />
                      <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(30,58,138,0.2)" strokeWidth="0.5" />
                      <line x1="0" y1="75" x2="100" y2="75" stroke="rgba(30,58,138,0.2)" strokeWidth="0.5" />
                      
                      {/* Area Fill */}
                      <motion.path 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        d="M0,100 L0,60 Q20,30 40,70 T80,40 T100,20 L100,100 Z" 
                        fill="url(#gradient)" 
                      />
                      
                      {/* Line Path */}
                      <motion.path 
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        d="M0,60 Q20,30 40,70 T80,40 T100,20" 
                        fill="none" 
                        stroke="#22d3ee" 
                        strokeWidth="2" 
                        strokeLinecap="round"
                      />
                      
                      {/* Gradient Def */}
                      <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="rgba(34,211,238,0.4)" />
                          <stop offset="100%" stopColor="rgba(34,211,238,0)" />
                        </linearGradient>
                      </defs>
                    </svg>
                  )}
                  
                  {/* Floating tooltip */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={step === 1 ? { opacity: 1, y: 0 } : { opacity: 0 }}
                    transition={{ delay: 1.5 }}
                    className="absolute top-[20%] right-[10%] bg-white rounded flex items-center px-2 py-1 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                  >
                    <span className="text-[#050B14] text-[8px] font-bold">Peak: 4.2TB/s</span>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Right Side Column */}
            <div className="col-span-1 flex flex-col gap-3">
              
              {/* Circular Progress Ring (Attendance) */}
              <div className="bg-[#050914]/50 border border-blue-900/20 rounded-lg p-3 flex flex-col items-center justify-center relative">
                <span className="text-slate-300 text-[9px] font-medium absolute top-2 left-3">Daily Attendance</span>
                
                <div className="w-16 h-16 relative mt-4">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(30,58,138,0.3)" strokeWidth="6" />
                    {step === 1 && (
                      <motion.circle 
                        initial={{ strokeDasharray: "0 200" }}
                        animate={{ strokeDasharray: "165 200" }} // Approx 92% of circumference
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        cx="32" cy="32" r="28" 
                        fill="none" 
                        stroke="#3b82f6" 
                        strokeWidth="6" 
                        strokeLinecap="round" 
                      />
                    )}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-white text-xs font-bold leading-none">92%</span>
                  </div>
                </div>
              </div>

              {/* Live Feed */}
              <div className="flex-1 bg-gradient-to-b from-[#050914]/50 to-transparent border border-blue-900/20 rounded-lg p-3 flex flex-col overflow-hidden">
                <span className="text-slate-300 text-[9px] font-medium mb-3">Live System Logs</span>
                
                <div className="flex-1 relative">
                  {step === 1 && (
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 flex flex-col gap-2"
                    >
                      <div className="flex gap-2 items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        <div className="flex flex-col">
                          <span className="text-white text-[8px]">Library Access</span>
                          <span className="text-slate-500 text-[7px]">Just now</span>
                        </div>
                      </div>
                      
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex gap-2 items-center"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <div className="flex flex-col">
                          <span className="text-white text-[8px]">Server Load High</span>
                          <span className="text-slate-500 text-[7px]">2m ago</span>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="flex gap-2 items-center"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        <div className="flex flex-col">
                          <span className="text-white text-[8px]">Backup Complete</span>
                          <span className="text-slate-500 text-[7px]">15m ago</span>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>
          </div>
        </div>

        {/* iMac Stand */}
        <div className="w-16 h-8 bg-gradient-to-b from-[#d9d9d9] to-[#8c8c8c] relative flex justify-center border-x border-gray-400 z-10" />
        <div className="w-24 h-2 bg-gradient-to-r from-[#b3b3b3] via-[#e6e6e6] to-[#b3b3b3] rounded-t-sm shadow-xl z-20" />
        <div className="w-32 h-4 bg-black/40 blur-md rounded-[100%] absolute -bottom-2 z-0" />
      </div>
    </div>
  );
}
