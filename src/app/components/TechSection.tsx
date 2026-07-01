import { motion } from "motion/react";

const technologies = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Python", 
  "GraphQL", "PostgreSQL", "Framer Motion", "Figma", "WebGL", "AWS"
];

export function TechSection() {
  return (
    <section className="py-32 md:py-40 relative bg-white border-y border-slate-100 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="md:w-1/3"
          >
            <h2 className="font-['Inter'] text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              Modern Stack.
            </h2>
            <p className="text-slate-500">
              We leverage enterprise-grade technologies to build scalable, robust, and secure digital infrastructure.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="md:w-2/3 w-full flex flex-wrap gap-3"
          >
            {technologies.map((tech, index) => (
              <div 
                key={index}
                className="px-6 py-3 rounded-full border border-slate-200 bg-slate-50 text-slate-700 text-sm font-medium hover:bg-slate-900 hover:text-white hover:border-slate-900 hover:scale-105 transition-all cursor-default shadow-sm"
              >
                {tech}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
