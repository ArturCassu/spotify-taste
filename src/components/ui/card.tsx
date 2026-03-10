interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export function Card({ children, className = '', title, subtitle }: CardProps) {
  return (
    <div
      className={`bg-white/[0.04] border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.08] transition-colors duration-300 ${className}`}
    >
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-lg font-semibold text-white">{title}</h3>
          )}
          {subtitle && (
            <p className="text-sm text-white/50 mt-1">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
