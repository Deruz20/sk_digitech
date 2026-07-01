import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

const FAQ_DATA = [
  {
    category: "Process",
    questions: [
      {
        q: "What is your typical project timeline?",
        a: "Most digital transformation projects take between 8 to 16 weeks, depending on complexity. We work in 2-week sprints to ensure continuous delivery and feedback."
      },
      {
        q: "Do you offer post-launch support?",
        a: "Yes, we provide 3 months of complimentary support post-launch, with optional ongoing maintenance retainers available."
      }
    ]
  },
  {
    category: "Pricing",
    questions: [
      {
        q: "How do you structure your pricing?",
        a: "We offer both fixed-bid for clearly defined scopes and time-and-materials for agile projects. We are fully transparent with our estimates upfront."
      }
    ]
  },
  {
    category: "Technical",
    questions: [
      {
        q: "What tech stack do you specialize in?",
        a: "We are experts in modern web engineering, primarily utilizing React, Next.js, Node.js, and TypeScript, backed by highly scalable cloud infrastructure."
      }
    ]
  }
];

export function FAQs() {
  const [activeCategory, setActiveCategory] = useState("Process");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = FAQ_DATA.map(cat => ({
    ...cat,
    questions: cat.questions.filter(q => 
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
      q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0);

  const categories = FAQ_DATA.map(cat => cat.category);

  return (
    <div className="bg-[#FFFFFF] min-h-screen text-[#111111] pt-40 pb-20 px-6 md:px-20 font-['Space_Grotesk'] selection:bg-[#F7A521] selection:text-white">
      <div className="max-w-[1000px] mx-auto">
        <div className="mb-16">
          <span className="text-gray-400 font-['Inter'] text-sm mb-6 block uppercase tracking-widest font-semibold">
            03 — FAQs
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[64px] md:text-[90px] lg:text-[100px] leading-[0.9] font-medium tracking-tight mb-8"
          >
            we have
            <span 
              className="font-bold block lg:inline lg:ml-6"
              style={{
                background: "linear-gradient(135deg, #F7A521 0%, #E91E63 50%, #5A53C8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              answers.
            </span>
          </motion.h1>

          {/* Search Bar */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search questions..." 
              value={searchQuery}
              onChange={(e) => {
                 setSearchQuery(e.target.value);
                 if (e.target.value) setActiveCategory("All");
              }}
              className="w-full bg-gray-50 border border-gray-200 rounded-full py-4 pl-12 pr-6 text-lg focus:outline-none focus:border-[#5A53C8] focus:ring-1 focus:ring-[#5A53C8] transition-all font-['Inter']"
            />
          </div>
        </div>

        {/* Categories */}
        {!searchQuery && (
          <div className="flex gap-4 mb-12 border-b border-gray-100 pb-6 overflow-x-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                className={`px-6 py-2 rounded-full font-['Inter'] font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat 
                    ? "bg-[#111] text-white" 
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Accordion */}
        <div className="flex flex-col gap-4">
          {filteredData.map((categoryGroup) => (
            (searchQuery || activeCategory === categoryGroup.category || activeCategory === "All") && 
              categoryGroup.questions.map((item, idx) => {
                const globalIdx = categoryGroup.category + idx;
                const isOpen = openIndex === globalIdx as any;
                
                return (
                  <motion.div 
                    key={globalIdx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-gray-100 rounded-2xl overflow-hidden bg-white hover:shadow-md transition-shadow"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : globalIdx as any)}
                      className="w-full flex items-center justify-between p-6 text-left"
                    >
                      <span className="text-xl md:text-2xl font-medium pr-8">{item.q}</span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center"
                      >
                        <ChevronDown size={20} />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="p-6 pt-0 text-gray-500 font-['Inter'] text-lg leading-relaxed">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
          ))}
          
          {filteredData.length === 0 && (
            <div className="py-20 text-center text-gray-500 font-['Inter'] text-lg">
              No answers found for your search. Try different keywords.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
