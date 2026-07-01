import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const ARTICLES = [
  {
    id: 1,
    category: "Product",
    title: "Introducing Aura AI — intelligence built for African enterprises",
    date: "Mar 12, 2026",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 2,
    category: "Engineering",
    title: "Why we ship React-first, performance-obsessed web systems",
    date: "Feb 28, 2026",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    category: "Design",
    title: "Brand systems that scale across 24 markets",
    date: "Feb 14, 2026",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 4,
    category: "Agency",
    title: "From Mukono to the world — our studio story",
    date: "Jan 30, 2026",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop",
  },
];

function ArticleCard({ article }: { article: (typeof ARTICLES)[0] }) {
  return (
    <article className="group flex flex-col h-full bg-transparent border-none shadow-none cursor-pointer">
      <div className="relative aspect-square overflow-hidden rounded-[24px] md:rounded-[32px] mb-6">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col flex-1 px-1">
        <h3 className="mb-3 text-[22px] md:text-[26px] font-medium text-[#111111] leading-tight font-['Space_Grotesk'] group-hover:text-[#6200EE] transition-colors">
          {article.title}
        </h3>
        
        <div className="flex items-center gap-4 mb-4 text-[14px] text-gray-500 font-['Inter']">
          <span>{article.date}</span>
          <span>{article.category}</span>
        </div>
        
        <button
          type="button"
          className="flex items-center gap-1 text-[14px] text-gray-600 font-['Inter'] bg-transparent border-none p-0 group/btn hover:text-[#111111] transition-colors"
        >
          Read blog
          <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </article>
  );
}

export function NewsSection() {
  return (
    <section
      id="blog"
      className="relative overflow-hidden py-32 md:py-40 bg-white"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <h2 className="text-[40px] md:text-[56px] font-['Space_Grotesk'] font-normal text-[#111111] tracking-tight">
            Latest Blogs
          </h2>
          
          <button
            type="button"
            className="hidden md:flex items-center justify-center rounded-full px-6 py-2.5 text-[15px] font-['Inter'] border border-gray-200 bg-transparent text-[#111111] hover:bg-gray-50 transition-colors"
          >
            View blog
          </button>
        </div>

        {/* Carousel Section */}
        <Carousel
          opts={{ align: "start", loop: true, dragFree: true }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-8">
            {ARTICLES.map((article) => (
              <CarouselItem
                key={article.id}
                className="pl-4 md:pl-8 basis-[85%] sm:basis-1/2 lg:basis-1/3 xl:basis-[28%]"
              >
                <ArticleCard article={article} />
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="flex justify-start gap-4 mt-12 md:mt-16">
            <CarouselPrevious className="static translate-y-0 left-auto top-auto w-12 h-12 rounded-full border border-gray-100 bg-[#F8F9FA] hover:bg-gray-100 shadow-none text-gray-600" />
            <CarouselNext className="static translate-y-0 right-auto top-auto w-12 h-12 rounded-full border border-gray-100 bg-[#F8F9FA] hover:bg-gray-100 shadow-none text-gray-600" />
          </div>
        </Carousel>
        
        {/* Mobile View Blog Button */}
        <div className="mt-12 flex justify-center md:hidden">
          <button
            type="button"
            className="flex items-center justify-center rounded-full px-8 py-3 text-[15px] font-['Inter'] border border-gray-200 bg-transparent text-[#111111] hover:bg-gray-50 transition-colors w-full"
          >
            View blog
          </button>
        </div>
        
      </div>
    </section>
  );
}
