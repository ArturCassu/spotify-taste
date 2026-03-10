'use client';

interface ProgressBarProps {
  label: string;
  value: number;
  color?: string;
  icon?: string;
}

export function ProgressBar({
  label,
  value,
  color = 'bg-[#1DB954]',
  icon,
}: ProgressBarProps) {
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-white/70">
          {icon && <span className="mr-1.5">{icon}</span>}
          {label}
        </span>
        <span className="text-white/50 font-medium tabular-nums">
          {Math.round(clampedValue)}%
        </span>
      </div>
      <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${color}`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
