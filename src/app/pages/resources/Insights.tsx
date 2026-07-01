import { useState } from "react";
import { motion } from "motion/react";
import { blogPosts, Category } from "../../data/blogPosts";
import { FeaturedPostCard } from "../../components/blog/FeaturedPostCard";
import { BlogCard } from "../../components/blog/BlogCard";
import { CategoryFilter } from "../../components/blog/CategoryFilter";

export function Insights() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const featuredPost = blogPosts.find((post) => post.featured);
  
  const filteredPosts = blogPosts.filter((post) => {
    if (post.featured) return false; // exclude featured post from the grid
    if (activeCategory === "All") return true;
    return post.category === activeCategory;
  });

  return (
    <div className="bg-[#FFFFFF] min-h-screen text-[#111111] pt-40 pb-20 px-6 md:px-20 font-['Space_Grotesk'] selection:bg-[#F7A521] selection:text-white">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header section */}
        <div className="mb-16">
          <span className="text-gray-400 font-['Inter'] text-sm mb-6 block uppercase tracking-widest font-semibold">
            01 — Insights
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[64px] md:text-[90px] lg:text-[100px] leading-[0.9] font-medium tracking-tight"
          >
            our thinking
            <span 
              className="font-bold block lg:inline lg:ml-6"
              style={{
                background: "linear-gradient(135deg, #F7A521 0%, #E91E63 50%, #5A53C8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              out loud.
            </span>
          </motion.h1>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-20">
            <FeaturedPostCard post={featuredPost} />
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-12 border-b border-gray-100 pb-8">
          <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
        </div>

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
        
        {filteredPosts.length === 0 && (
          <div className="py-20 text-center text-gray-500 font-['Inter'] text-lg">
            No posts found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
