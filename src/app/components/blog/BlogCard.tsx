import { motion } from "motion/react";
import { BlogPost } from "../../data/blogPosts";

export function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="flex flex-col bg-white border border-gray-100 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-[6px] hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)] cursor-pointer group h-full"
    >
      <div 
        className="w-full h-[200px] rounded-xl mb-6 relative overflow-hidden flex-shrink-0"
        style={{ background: post.gradient }}
      >
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="mb-4">
          <span 
            className="px-3 py-1 text-xs font-semibold rounded-full text-white"
            style={{ backgroundColor: post.thumbnailColor }}
          >
            {post.category}
          </span>
        </div>
        
        <h3 className="text-[1.1rem] font-bold font-['Space_Grotesk'] text-[#111] leading-snug mb-3 line-clamp-2 group-hover:text-[#5A53C8] transition-colors">
          {post.title}
        </h3>
        
        <p className="text-gray-600 font-['Inter'] text-[0.875rem] leading-relaxed mb-6 line-clamp-3 flex-1">
          {post.excerpt}
        </p>
        
        <div className="mt-auto pt-4 border-t border-gray-100 text-gray-500 font-['Inter'] text-sm flex items-center justify-between">
          <span>{formattedDate}</span>
          <span>{post.readingTime} min read</span>
        </div>
      </div>
    </motion.article>
  );
}
