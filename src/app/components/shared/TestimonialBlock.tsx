interface TestimonialBlockProps {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatarImage?: string;
  compact?: boolean;
}

export function TestimonialBlock({ quote, name, role, company, avatarImage, compact = false }: TestimonialBlockProps) {
  return (
    <div className="relative p-8 rounded-2xl bg-[var(--surface)] backdrop-blur-[12px] border border-[var(--border)] w-full">
      {!compact && (
        <div className="absolute top-4 left-6 text-[120px] font-['Playfair_Display'] italic leading-none text-[var(--accent-1)]/20 pointer-events-none select-none">
          &ldquo;
        </div>
      )}
      
      <div className="relative z-10">
        <p className={`${compact ? 'text-xl' : 'text-2xl md:text-3xl'} font-['Playfair_Display'] italic text-[var(--text-1)] mb-8 leading-relaxed`}>
          "{quote}"
        </p>
        
        <div className="flex items-center gap-4">
          {avatarImage && (
            <img 
              src={avatarImage} 
              alt={name} 
              className="w-12 h-12 rounded-full object-cover border border-[var(--border)]"
              loading="lazy"
            />
          )}
          <div>
            <div className="font-['Syne'] text-base font-semibold text-[var(--text-1)]">{name}</div>
            <div className="font-['Syne'] text-sm text-[var(--text-2)]">{role}, {company}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
