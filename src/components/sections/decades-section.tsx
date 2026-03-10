import { Card } from '@/components/ui';

interface DecadesSectionProps {
  decades: [string, number][];
}

const DECADE_COLORS: Record<string, string> = {
  '1960s': 'bg-amber-500',
  '1970s': 'bg-orange-500',
  '1980s': 'bg-pink-500',
  '1990s': 'bg-purple-500',
  '2000s': 'bg-blue-500',
  '2010s': 'bg-cyan-400',
  '2020s': 'bg-[#1DB954]',
};

export function DecadesSection({ decades }: DecadesSectionProps) {
  const maxCount = decades[0]?.[1] ?? 1;

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Épocas Musicais</h2>
      <Card>
        <div className="space-y-3">
          {decades.map(([decade, count]) => {
            const pct = (count / maxCount) * 100;
            const color = DECADE_COLORS[decade] ?? 'bg-white/20';

            return (
              <div key={decade} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/70 font-medium">{decade}</span>
                  <span className="text-white/30 tabular-nums text-xs">
                    {count} música{count > 1 ? 's' : ''}
                  </span>
                </div>
                <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${color}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </section>
  );
}
