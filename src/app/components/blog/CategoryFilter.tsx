import { Category, CATEGORIES } from "../../data/blogPosts";

export function CategoryFilter({ 
  active, 
  onChange 
}: { 
  active: Category; 
  onChange: (c: Category) => void 
}) {
  return (
    <div className="w-full overflow-x-auto pb-4 -mb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="flex items-center gap-3 min-w-max">
        {CATEGORIES.map((category) => {
          const isActive = active === category;
          return (
            <button
              key={category}
              onClick={() => onChange(category)}
              className={`
                px-5 py-2.5 rounded-full font-['Inter'] text-sm font-medium transition-all duration-200
                ${isActive 
                  ? "bg-[#5A53C8] text-white shadow-md" 
                  : "bg-white text-[#5A53C8] border border-[#5A53C8] hover:bg-[#5A53C8]/10"
                }
              `}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
