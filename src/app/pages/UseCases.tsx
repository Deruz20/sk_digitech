import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useSearchParams } from "react-router";
import { AuraAIMockup } from "../components/mockups/AuraAIMockup";
import { BakeryMockup } from "../components/mockups/BakeryMockup";
import { CampusSystemMockup } from "../components/mockups/CampusSystemMockup";
import { IndigoAIMockup } from "../components/mockups/IndigoAIMockup";
import { ClientLogos } from "../components/ClientLogos";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "education", label: "Education" },
  { id: "healthcare", label: "Healthcare" },
  { id: "ngos", label: "NGOs" },
  { id: "professional", label: "Professional Services" },
  { id: "e-com", label: "E-Commerce" }
];

const PROJECTS = [
  {
    id: 1,
    category: "education",
    name: "Elite Academy Portal",
    date: "05.25",
    image: "/images/uc_education_1_1782481941967.png",
  },
  {
    id: 2,
    category: "healthcare",
    name: "Pharmalink Dashboard",
    date: "04.25",
    image: "/images/uc_healthcare_1_1782481955830.png",
  },
  {
    id: 3,
    category: "e-com",
    name: "SK Bakery Store",
    date: "03.25",
    component: BakeryMockup,
  },
  {
    id: 4,
    category: "education",
    name: "Campus System CRM",
    date: "02.25",
    component: CampusSystemMockup,
  },
  {
    id: 5,
    category: "professional",
    name: "Indigo AI Consultant",
    date: "01.25",
    component: IndigoAIMockup,
  },
  {
    id: 6,
    category: "ngos",
    name: "Global Care Network",
    date: "12.24",
    // Stunning CSS Mockup for NGO right here
    component: () => (
      <div className="w-full h-full bg-[#E8E1D9] relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2670&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative w-[85%] h-[75%] bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40 overflow-hidden flex">
          <div className="w-1/4 bg-[#3E5244]/10 border-r border-[#3E5244]/20 p-6 flex flex-col gap-4">
            <div className="h-6 w-24 bg-[#3E5244] rounded-md mb-6" />
            <div className="h-4 w-full bg-[#3E5244]/20 rounded-md" />
            <div className="h-4 w-5/6 bg-[#3E5244]/20 rounded-md" />
            <div className="h-4 w-4/6 bg-[#3E5244]/20 rounded-md" />
          </div>
          <div className="w-3/4 p-8 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div className="h-8 w-48 bg-[#3E5244] rounded-lg" />
              <div className="h-10 w-32 bg-[#D4A373] rounded-full" />
            </div>
            <div className="flex gap-4 h-32">
              <div className="flex-1 bg-[#3E5244]/5 rounded-xl border border-[#3E5244]/10 flex flex-col justify-center p-4">
                <div className="text-[#3E5244] text-xs font-bold uppercase mb-1">Total Impact</div>
                <div className="text-[#3E5244] text-3xl font-black">2.4M</div>
              </div>
              <div className="flex-1 bg-[#D4A373]/10 rounded-xl border border-[#D4A373]/20 flex flex-col justify-center p-4">
                <div className="text-[#D4A373] text-xs font-bold uppercase mb-1">Funds Raised</div>
                <div className="text-[#D4A373] text-3xl font-black">$850k</div>
              </div>
            </div>
            <div className="flex-1 bg-[#3E5244]/5 rounded-xl border border-[#3E5244]/10 relative overflow-hidden">
               <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#3E5244]/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 7,
    category: "healthcare",
    name: "MedCare Patient App",
    date: "11.24",
    // Stunning CSS Mockup for Healthcare App
    component: () => (
      <div className="w-full h-full bg-[#F0F7F9] relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative w-[320px] h-[650px] bg-white rounded-[45px] shadow-[0_20px_50px_rgba(0,100,120,0.15)] border-[8px] border-[#E2EFF3] flex flex-col overflow-hidden">
          <div className="pt-12 px-6 pb-6 bg-[#00A3B5] text-white rounded-b-[30px]">
            <div className="text-sm opacity-80 mb-1">Welcome back,</div>
            <div className="text-2xl font-bold">Sarah Jenkins</div>
            <div className="mt-6 flex gap-3">
              <div className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">Heart Rate: 72bpm</div>
            </div>
          </div>
          <div className="p-6 flex flex-col gap-4 flex-1 bg-[#F8FCFD]">
            <div className="text-[#2D4A52] font-bold text-lg">Upcoming Appointments</div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#E2EFF3] flex items-center gap-4">
              <div className="w-12 h-12 bg-[#00A3B5]/10 text-[#00A3B5] rounded-xl flex items-center justify-center font-bold">14</div>
              <div>
                <div className="font-bold text-[#2D4A52]">Dr. Peterson</div>
                <div className="text-sm text-[#5C7E87]">Cardiology • 10:00 AM</div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#E2EFF3] flex items-center gap-4 mt-2">
              <div className="w-12 h-12 bg-[#F39C12]/10 text-[#F39C12] rounded-xl flex items-center justify-center font-bold">18</div>
              <div>
                <div className="font-bold text-[#2D4A52]">Lab Results</div>
                <div className="text-sm text-[#5C7E87]">Blood Work • Pending</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 8,
    category: "professional",
    name: "Torque Legal",
    date: "10.24",
    // Stunning CSS Mockup for Professional Services
    component: () => (
      <div className="w-full h-full bg-[#0A1128] relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 50% 0%, #1C336E 0%, transparent 60%)" }} />
        <div className="relative w-[85%] h-[75%] bg-[#111A35]/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col">
          <div className="h-16 border-b border-white/5 flex items-center px-8 justify-between">
             <div className="text-white font-serif italic text-xl">Torque<span className="font-sans not-italic font-bold ml-1 text-[#CBA153]">Legal</span></div>
             <div className="flex gap-6 text-sm text-gray-400">
               <span className="text-white">Dashboard</span>
               <span>Cases</span>
               <span>Clients</span>
               <span>Documents</span>
             </div>
          </div>
          <div className="flex-1 p-8 flex gap-8">
             <div className="flex-1 flex flex-col gap-6">
                <div className="h-32 bg-[#1C2849] rounded-xl border border-white/5 p-6 flex flex-col justify-between">
                   <div className="text-gray-400 text-sm">Active Cases</div>
                   <div className="text-white text-4xl font-light">142 <span className="text-[#CBA153] text-sm ml-2">+12%</span></div>
                </div>
                <div className="flex-1 bg-[#1C2849] rounded-xl border border-white/5 relative overflow-hidden">
                   <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#CBA153]/20 to-transparent opacity-50" />
                   <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <path d="M0,100 L0,50 Q25,30 50,60 T100,40 L100,100 Z" fill="#CBA153" opacity="0.1" />
                      <path d="M0,100 L0,60 Q25,40 50,70 T100,50 L100,100 Z" fill="none" stroke="#CBA153" strokeWidth="1" />
                   </svg>
                </div>
             </div>
             <div className="w-1/3 bg-[#1C2849] rounded-xl border border-white/5 p-6 flex flex-col gap-4">
                <div className="text-white font-medium mb-2">Recent Activity</div>
                {[1,2,3,4].map(i => (
                  <div key={i} className="flex gap-3 items-center">
                    <div className="w-2 h-2 rounded-full bg-[#CBA153]" />
                    <div className="flex-1">
                      <div className="h-2 w-full bg-white/10 rounded-full mb-1" />
                      <div className="h-2 w-2/3 bg-white/5 rounded-full" />
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 9,
    category: "ngos",
    name: "EcoSave Tracker",
    date: "09.24",
    // Stunning CSS Mockup for another NGO
    component: () => (
      <div className="w-full h-full bg-[#0E1E15] relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2626&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1E15] via-[#0E1E15]/80 to-transparent" />
        <div className="relative w-[320px] h-[650px] bg-[#122A1C]/90 backdrop-blur-xl rounded-[45px] shadow-2xl border border-white/10 flex flex-col overflow-hidden p-6">
          <div className="flex justify-between items-center text-white mb-8 mt-4">
            <div className="text-2xl font-light tracking-tight">Eco<span className="font-bold text-[#00E676]">Save</span></div>
            <div className="w-10 h-10 rounded-full bg-white/10" />
          </div>
          <div className="bg-[#00E676]/20 border border-[#00E676]/30 rounded-2xl p-6 mb-6">
            <div className="text-[#00E676] text-sm font-medium mb-1">Carbon Offset</div>
            <div className="text-white text-4xl font-bold">12.4t</div>
            <div className="text-white/60 text-xs mt-2">Top 5% of contributors</div>
          </div>
          <div className="text-white font-medium mb-4">Active Campaigns</div>
          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-4">
              <div className="w-16 h-16 bg-[#00E676]/20 rounded-xl" />
              <div className="flex-1">
                <div className="text-white font-medium mb-1 text-sm">Amazon Reforestation</div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-3">
                  <div className="h-full bg-[#00E676] w-[75%]" />
                </div>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-4">
              <div className="w-16 h-16 bg-[#00E676]/20 rounded-xl" />
              <div className="flex-1">
                <div className="text-white font-medium mb-1 text-sm">Ocean Cleanup</div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-3">
                  <div className="h-full bg-[#00E676] w-[40%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 10,
    category: "professional",
    name: "Architectural Studio",
    date: "08.24",
    // Clean minimal mockup
    component: () => (
      <div className="w-full h-full bg-[#E5E5E5] relative flex items-center justify-center overflow-hidden">
        <div className="relative w-[90%] h-[80%] bg-white rounded-md shadow-2xl overflow-hidden flex flex-col">
          <div className="flex-1 relative">
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop" alt="Architecture" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute top-12 left-12 text-white">
              <div className="text-sm tracking-[0.2em] uppercase mb-4 font-bold">Studio Archi</div>
              <div className="text-6xl font-light tracking-tighter">Modernism<br/>Redefined.</div>
            </div>
          </div>
          <div className="h-24 bg-white flex items-center px-12 justify-between">
            <div className="text-[#111] font-medium">Featured Projects</div>
            <div className="flex gap-4">
              <div className="w-32 h-16 bg-gray-200 rounded-sm" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600607687985-cecb12fd1c5f?q=80&w=2670&auto=format&fit=crop')", backgroundSize: "cover" }} />
              <div className="w-32 h-16 bg-gray-200 rounded-sm" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2670&auto=format&fit=crop')", backgroundSize: "cover" }} />
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 11,
    category: "e-com",
    name: "Moto Touareg Shop",
    date: "07.24",
    component: () => (
      <div className="w-full h-full bg-[#111] relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558981285-6f0c94958bb6?q=80&w=2670&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
        <div className="relative w-[85%] h-[75%] bg-[#1A1A1A]/80 backdrop-blur-md rounded-2xl border border-white/10 flex overflow-hidden">
          <div className="w-1/2 p-12 flex flex-col justify-center">
            <div className="text-[#FF5F00] font-bold tracking-widest uppercase text-xs mb-4">New Arrival</div>
            <div className="text-white text-5xl font-black italic tracking-tighter uppercase leading-[0.9] mb-6">Desert<br/>Storm V2</div>
            <div className="text-gray-400 text-sm mb-8 leading-relaxed max-w-xs">Built for the harshest environments. Lightweight, durable, and aerodynamic.</div>
            <div className="flex items-center gap-6">
               <div className="text-white text-2xl font-bold">$2,499</div>
               <div className="bg-[#FF5F00] text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-white hover:text-[#111] transition-colors cursor-pointer">Add to Cart</div>
            </div>
          </div>
          <div className="w-1/2 relative">
             <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[#FF5F00] rounded-full blur-[120px] opacity-20" />
             <img src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2670&auto=format&fit=crop" alt="Motorcycle" className="absolute right-0 top-1/2 -translate-y-1/2 w-[120%] object-contain drop-shadow-2xl" style={{ mixBlendMode: "lighten" }} />
          </div>
        </div>
      </div>
    )
  },
  {
    id: 12,
    category: "education",
    name: "Aura Learning AI",
    date: "06.24",
    component: AuraAIMockup,
  }
];

export function UseCases() {
  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get("filter");
  
  // Set initial filter based on URL, default to 'all'
  const [activeFilter, setActiveFilter] = useState(filterParam && CATEGORIES.some(c => c.id === filterParam) ? filterParam : "all");

  // Keep state in sync if URL changes
  useEffect(() => {
    if (filterParam && CATEGORIES.some(c => c.id === filterParam)) {
      setActiveFilter(filterParam);
    }
  }, [filterParam]);

  const filteredProjects = activeFilter === "all" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeFilter);

  return (
    <div className="bg-[#F9FAFB] min-h-screen text-[#111111] pt-32 pb-32 px-6 md:px-20 font-['Space_Grotesk'] selection:bg-[#F7A521] selection:text-white">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Section (Matching reference structure) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10">
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[120px] md:text-[200px] font-black leading-[0.8] tracking-tighter"
          >
            cases
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="md:max-w-md flex flex-col gap-3 pb-4"
          >
            <span className="text-gray-400 font-['Inter'] text-sm uppercase tracking-widest font-semibold">
              01 — Portfolio
            </span>
            <p className="text-[#555555] font-['Inter'] text-lg md:text-xl leading-relaxed">
              We guide web brands, across platforms and places, through agile design and digital experience.
            </p>
          </motion.div>
        </div>

        {/* Filter Pills */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center gap-3 mb-16"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-8 py-3 rounded-full font-bold text-sm tracking-wide transition-all duration-300 border ${
                activeFilter === cat.id 
                  ? "bg-gradient-primary text-white border-transparent shadow-lg shadow-[#F7A521]/20" 
                  : "bg-white text-gray-500 hover:bg-gray-100 border-gray-200"
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <AnimatePresence>
            {filteredProjects.map((project, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
                key={project.id}
                className="group relative flex flex-col gap-6"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[4/3] rounded-[32px] overflow-hidden bg-gray-200 cursor-pointer">
                  {project.component ? (
                    <div className="w-full h-full transition-transform duration-700 group-hover:scale-105">
                       <project.component />
                    </div>
                  ) : project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200" />
                  )}
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
                  </div>
                </div>

                {/* Project Info */}
                <div className="flex items-center justify-between pt-2 px-1">
                  <h3 className="text-[22px] font-bold tracking-tight text-[#111111]">
                    {project.name}
                  </h3>
                  <span className="text-[15px] font-['Inter'] font-medium text-[#777777]">
                    {project.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Clients Section */}
        <ClientLogos />

      </div>
    </div>
  );
}
