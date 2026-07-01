export interface SectionLabelProps {
  text: string;
  align?: 'left' | 'right' | 'center';
}

export function SectionLabel({ text, align = 'left' }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-4 ${
      align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start'
    }`}>
      {(align === 'right' || align === 'center') && (
        <div className="h-[1px] flex-grow max-w-[40px] bg-[var(--border)]" />
      )}
      <span className="font-['Syne'] text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--accent-1)]">
        {text}
      </span>
      {(align === 'left' || align === 'center') && (
        <div className="h-[1px] flex-grow max-w-[40px] bg-[var(--border)]" />
      )}
    </div>
  );
}
