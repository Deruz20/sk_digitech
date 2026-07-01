import { motion } from "motion/react";
import { BlogPost } from "../../data/blogPosts";
import { ArrowRight } from "lucide-react";

export function FeaturedPostCard({ post }: { post: BlogPost }) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full min-h-[360px] bg-white border border-gray-100 rounded-3xl p-6 md:p-10 flex flex-col md:flex-row gap-8 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="w-full md:w-[60%] flex flex-col justify-center order-2 md:order-1">
        <div className="flex items-center gap-4 mb-4">
          <span 
            className="px-3 py-1 text-xs font-semibold rounded-full text-white"
            style={{ backgroundColor: post.thumbnailColor }}
          >
            {post.category}
          </span>
          <span className="text-gray-500 text-sm font-['Inter']">
            {formattedDate} • {post.readingTime} min read
          </span>
        </div>
        
        <h2 className="text-[2.5rem] leading-tight font-bold font-['Space_Grotesk'] text-[#111] mb-4">
          {post.title}
        </h2>
        
        <p className="text-gray-600 font-['Inter'] text-lg mb-8 line-clamp-3">
          {post.excerpt}
        </p>
        
        <button className="flex w-fit items-center gap-2 bg-gradient-to-r from-[#F7A521] via-[#E91E63] to-[#5A53C8] text-white px-6 py-3 rounded-full font-bold text-sm transition-transform hover:scale-105 active:scale-95">
          Read Article <ArrowRight size={16} />
        </button>
      </div>
      
      <div 
        className="w-full md:w-[40%] min-h-[240px] md:min-h-full rounded-2xl order-1 md:order-2"
        style={{ background: post.gradient }}
      />
    </motion.div>
  );
}
