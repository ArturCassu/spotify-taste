import type { SpotifyTrack } from '@/lib/spotify/types';

interface RecentTracksSectionProps {
  tracks: { track: SpotifyTrack; played_at: string }[];
}

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60_000);

  if (diffMin < 1) return 'agora';
  if (diffMin < 60) return `${diffMin}min`;

  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h`;

  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay}d`;
}

export function RecentTracksSection({ tracks }: RecentTracksSectionProps) {
  const displayed = tracks.slice(0, 12);

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Tocadas Recentemente</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {displayed.map((item, i) => (
          <a
            key={`${item.track.id}-${item.played_at}-${i}`}
            href={item.track.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.06] rounded-xl p-3 hover:bg-white/[0.08] transition-colors duration-200 group"
          >
            {/* Album art */}
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/[0.06] shrink-0">
              {item.track.album.images[0] ? (
                <img
                  src={item.track.album.images[0].url}
                  alt={item.track.album.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm text-white/20">
                  🎵
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-white truncate">
                {item.track.name}
              </h3>
              <p className="text-xs text-white/40 truncate">
                {item.track.artists.map((a) => a.name).join(', ')}
              </p>
            </div>

            {/* Time ago */}
            <span className="text-xs text-white/20 shrink-0 tabular-nums">
              {timeAgo(item.played_at)}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
