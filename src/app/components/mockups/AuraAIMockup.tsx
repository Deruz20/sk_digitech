import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, MessageSquare, Menu, Send, Loader2, CheckCircle2 } from "lucide-react";

export function AuraAIMockup() {
  const [step, setStep] = useState(0);
  const [typedText, setTypedText] = useState("");

  const promptText = "Optimize the Q3 ad campaign.";

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (step === 0) {
      // Step 0: Initial state, start typing after 1s
      setTypedText("");
      timeout = setTimeout(() => setStep(1), 1000);
    } else if (step === 1) {
      // Step 1: Typing out the prompt
      let i = 0;
      const typeInterval = setInterval(() => {
        setTypedText(promptText.slice(0, i + 1));
        i++;
        if (i >= promptText.length) {
          clearInterval(typeInterval);
          timeout = setTimeout(() => setStep(2), 500); // Wait 500ms then send
        }
      }, 50);
      return () => clearInterval(typeInterval);
    } else if (step === 2) {
      // Step 2: Message sent, show thinking
      setTypedText("");
      timeout = setTimeout(() => setStep(3), 1500); // Think for 1.5s
    } else if (step === 3) {
      // Step 3: Show solution
      timeout = setTimeout(() => setStep(0), 5000); // Wait 5s, then loop
    }

    return () => clearTimeout(timeout);
  }, [step]);

  return (
    <div className="w-full h-full bg-[#0a0a0c] relative overflow-hidden flex items-center justify-center p-6 group-hover:scale-105 transition-transform duration-700">
      
      {/* Background glowing orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-purple-600/30 rounded-full blur-[80px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-[#F7A521]/20 rounded-full blur-[80px]" />

      {/* Macbook CSS Frame */}
      <div className="relative flex flex-col items-center mt-4 w-[90%] max-w-[340px] z-10">
        
        {/* Macbook Lid / Screen */}
        <div className="w-full aspect-[16/10] bg-[#0a0a0c] rounded-t-xl rounded-b-sm border-[4px] border-[#1a1a1a] relative overflow-hidden shadow-2xl flex flex-col">
          {/* Webcam */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#222] rounded-full z-30" />
          
          {/* Main App Container */}
          <div className="flex-1 bg-white/5 backdrop-blur-xl flex overflow-hidden relative z-10">
        
        {/* Sidebar */}
        <div className="w-16 h-full border-r border-white/10 flex flex-col items-center py-4 gap-6 bg-black/20">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-[#F7A521] flex items-center justify-center shadow-[0_0_15px_rgba(247,165,33,0.4)]">
            <Sparkles size={14} className="text-white" />
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center cursor-pointer">
              <MessageSquare size={16} className="text-white/80" />
            </div>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer hover:bg-white/5">
              <Menu size={16} className="text-white/40" />
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col h-full bg-gradient-to-b from-transparent to-black/40 relative">
          
          {/* Header */}
          <div className="h-12 border-b border-white/5 flex items-center px-4 justify-between z-10 bg-black/20 backdrop-blur-md">
            <span className="text-white/90 font-medium text-sm tracking-wide">Aura Assistant</span>
            <div className="flex gap-1.5 items-center">
              <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
              <span className="text-white/40 text-xs">Online</span>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 flex flex-col gap-3 overflow-hidden relative">
            
            {/* AI Greeting */}
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="self-start max-w-[85%] bg-white/10 border border-white/5 rounded-2xl rounded-tl-sm p-3 shadow-lg"
            >
              <p className="text-white/80 text-xs leading-relaxed">
                Hello! I'm Aura. What should we tackle today?
              </p>
            </motion.div>

            {/* User Message */}
            <AnimatePresence>
              {step >= 2 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, originX: 1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="self-end max-w-[85%] bg-gradient-to-r from-purple-600/80 to-[#F7A521]/80 rounded-2xl rounded-tr-sm p-3 shadow-[0_4px_20px_rgba(247,165,33,0.15)]"
                >
                  <p className="text-white text-xs leading-relaxed">
                    {promptText}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* AI Processing / Solution */}
            <AnimatePresence>
              {step === 2 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="self-start bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm p-3 flex items-center gap-2"
                >
                  <Loader2 size={14} className="text-[#F7A521] animate-spin" />
                  <span className="text-white/60 text-xs">Analyzing datasets...</span>
                </motion.div>
              )}

              {step >= 3 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="self-start w-[90%] bg-black/40 border border-purple-500/30 rounded-2xl rounded-tl-sm p-4 shadow-[0_0_25px_rgba(147,51,234,0.1)] flex flex-col gap-2"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 size={14} className="text-green-400" />
                    <span className="text-white/90 text-xs font-semibold tracking-wide">Analysis Complete</span>
                  </div>
                  <p className="text-white/70 text-[11px] leading-relaxed">
                    Processed 1.2M events. Shift <span className="text-[#F7A521] font-bold">20% budget</span> to Display Ads. 
                    Projected ROI increase: <span className="text-green-400 font-bold">+18.4%</span>.
                  </p>
                  <div className="w-full h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "75%" }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-purple-500 to-[#F7A521]"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-white/5 bg-black/20">
            <div className="w-full h-10 bg-black/40 border border-white/10 rounded-full flex items-center px-3 justify-between">
              <span className="text-white/60 text-xs font-['Inter']">
                {step === 1 ? (
                  <>
                    {typedText}
                    <motion.span 
                      animate={{ opacity: [1, 0] }} 
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block w-1 h-3 bg-[#F7A521] ml-0.5 align-middle"
                    />
                  </>
                ) : step === 0 ? (
                  <span className="text-white/30">Type a command...</span>
                ) : (
                  ""
                )}
              </span>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 ${step === 1 && typedText.length === promptText.length ? 'bg-[#F7A521]' : 'bg-white/10'}`}>
                <Send size={12} className={step === 1 && typedText.length === promptText.length ? 'text-black' : 'text-white/80'} />
              </div>
            </div>
          </div>

        </div>
          </div>
        </div>

        {/* Macbook Base */}
        <div className="w-[115%] h-3 bg-gradient-to-b from-[#b3b3b3] to-[#808080] rounded-t-sm rounded-b-xl relative shadow-2xl flex justify-center z-20">
          {/* Thumb indentation */}
          <div className="w-16 h-1 bg-[#666] rounded-b-md" />
        </div>
        {/* Bottom shadow */}
        <div className="w-[100%] h-4 bg-black/40 blur-md rounded-[100%] absolute -bottom-3 z-0" />
      </div>
    </div>
  );
}
