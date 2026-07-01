import { motion } from "motion/react";
import { Zap, Search, Shield, Gauge } from "lucide-react";

const features = [
  {
    icon: <Gauge className="w-6 h-6 text-emerald-400" />,
    title: "Performance Engineering",
    desc: "Lightning-fast load times through optimized assets, edge caching, and modern frameworks."
  },
  {
    icon: <Search className="w-6 h-6 text-blue-400" />,
    title: "SEO Optimization",
    desc: "Semantic HTML structure, dynamic metadata, and schema markup built-in for search dominance."
  },
  {
    icon: <Shield className="w-6 h-6 text-purple-400" />,
    title: "Scalability & Security",
    desc: "Enterprise architecture designed to handle traffic spikes and protect user data effortlessly."
  },
  {
    icon: <Zap className="w-6 h-6 text-amber-400" />,
    title: "Accessible by Design",
    desc: "Inclusive UX meeting WCAG standards, ensuring everyone can interact with your brand."
  }
];

export function SeoSection() {
  return (
    <section className="py-32 relative bg-[#fcfcfc]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="font-['Inter'] text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Built for speed. <br/>
              <span className="text-slate-400">Engineered to rank.</span>
            </h2>
            <p className="text-slate-600 text-lg mb-8 max-w-lg">
              A beautiful design means nothing if nobody sees it. Our development process prioritizes Core Web Vitals, technical SEO, and accessibility from day one.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((feat, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center">
                    {feat.icon}
                  </div>
                  <h3 className="font-['Inter'] font-bold text-lg text-slate-900">{feat.title}</h3>
                  <p className="text-sm text-slate-500">{feat.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative h-[500px] rounded-3xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden p-8 shadow-xl shadow-slate-200/50"
          >
            {/* Abstract visual representing performance/SEO metrics */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTM5IDM5VjFoLTM4djM4aDM4eiIgZmlsbD0icmdiYSgwLDAsMCwwLjAxKSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')] opacity-60" />
            
            <div className="w-full max-w-sm space-y-6 relative z-10">
              {[
                { label: "Performance", score: "99" },
                { label: "Accessibility", score: "100" },
                { label: "Best Practices", score: "100" },
                { label: "SEO", score: "100" }
              ].map((metric, i) => (
                <div key={i} className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                  <span className="font-medium text-slate-700">{metric.label}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-48 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${metric.score}%` }}
                        transition={{ duration: 1, delay: i * 0.2 }}
                        className="h-full bg-emerald-500 rounded-full"
                      />
                    </div>
                    <span className="font-mono text-emerald-500 font-bold">{metric.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
