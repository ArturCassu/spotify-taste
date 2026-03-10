'use client';

import { useState } from 'react';
import type { SpotifyTrack } from '@/lib/spotify/types';
import { TabGroup } from '@/components/ui';

interface TopTracksSectionProps {
  tracks: {
    short: SpotifyTrack[];
    medium: SpotifyTrack[];
    long: SpotifyTrack[];
  };
}

const TIME_TABS = [
  { key: 'short', label: '4 semanas' },
  { key: 'medium', label: '6 meses' },
  { key: 'long', label: 'Todos os tempos' },
];

export function TopTracksSection({ tracks }: TopTracksSectionProps) {
  const [range, setRange] = useState('short');
  const currentTracks = tracks[range as keyof typeof tracks].slice(0, 20);

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold">Top Músicas</h2>
        <TabGroup tabs={TIME_TABS} activeTab={range} onTabChange={setRange} />
      </div>

      <div className="space-y-2">
        {currentTracks.map((track, i) => (
          <a
            key={track.id}
            href={track.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-white/[0.04] border border-white/[0.06] rounded-xl p-3 hover:bg-white/[0.08] transition-all duration-200 group"
          >
            {/* Rank */}
            <span className="text-sm font-bold text-white/30 w-6 text-right tabular-nums shrink-0">
              {i + 1}
            </span>

            {/* Album art */}
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/[0.06] shrink-0">
              {track.album.images[0] ? (
                <img
                  src={track.album.images[0].url}
                  alt={track.album.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-lg text-white/20">
                  🎵
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-white truncate">
                {track.name}
              </h3>
              <p className="text-xs text-white/40 truncate">
                {track.artists.map((a) => a.name).join(', ')}
              </p>
            </div>

            {/* Album name */}
            <span className="text-xs text-white/20 truncate max-w-[150px] hidden sm:block">
              {track.album.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
