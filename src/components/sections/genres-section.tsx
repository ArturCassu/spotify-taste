import { Card } from '@/components/ui';

interface GenresSectionProps {
  genres: [string, number][];
}

const BAR_COLORS = [
  'bg-[#1DB954]',
  'bg-emerald-400',
  'bg-teal-400',
  'bg-cyan-400',
  'bg-sky-400',
  'bg-blue-400',
  'bg-indigo-400',
  'bg-violet-400',
  'bg-purple-400',
  'bg-fuchsia-400',
];

export function GenresSection({ genres }: GenresSectionProps) {
  const topGenres = genres.slice(0, 10);
  const maxCount = topGenres[0]?.[1] ?? 1;

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Top Gêneros</h2>
      <Card>
        <div className="space-y-3">
          {topGenres.map(([genre, count], i) => {
            const pct = (count / maxCount) * 100;
            return (
              <div key={genre} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/70 capitalize">{genre}</span>
                  <span className="text-white/30 tabular-nums text-xs">
                    {count} artista{count > 1 ? 's' : ''}
                  </span>
                </div>
                <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${BAR_COLORS[i % BAR_COLORS.length]}`}
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
