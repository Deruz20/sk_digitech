interface DottedBgProps {
  className?: string;
  opacity?: number;
  dotColor?: string;
  size?: number;
}

export function DottedBg({
  className = "",
  opacity = 0.35,
  dotColor = "rgba(61,57,137,0.12)",
  size = 24,
}: DottedBgProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        opacity,
        backgroundImage: `radial-gradient(${dotColor} 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
      }}
      aria-hidden
    />
  );
}
