interface StatCardProps {
  value: string;
  label: string;
  emoji?: string;
}

export function StatCard({ value, label, emoji }: StatCardProps) {
  return (
    <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-5 text-center hover:bg-white/[0.08] transition-colors duration-300">
      {emoji && <div className="text-3xl mb-2">{emoji}</div>}
      <div className="text-3xl font-bold text-white tracking-tight">{value}</div>
      <div className="text-xs text-white/40 mt-1 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}
