'use client';

import { useState } from 'react';
import type { SpotifyArtist } from '@/lib/spotify/types';
import { TabGroup, ProgressBar } from '@/components/ui';

interface TopArtistsSectionProps {
  artists: {
    short: SpotifyArtist[];
    medium: SpotifyArtist[];
    long: SpotifyArtist[];
  };
}

const TIME_TABS = [
  { key: 'short', label: '4 semanas' },
  { key: 'medium', label: '6 meses' },
  { key: 'long', label: 'Todos os tempos' },
];

export function TopArtistsSection({ artists }: TopArtistsSectionProps) {
  const [range, setRange] = useState('short');
  const currentArtists = artists[range as keyof typeof artists].slice(0, 20);

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold">Top Artistas</h2>
        <TabGroup tabs={TIME_TABS} activeTab={range} onTabChange={setRange} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {currentArtists.map((artist, i) => (
          <a
            key={artist.id}
            href={artist.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white/[0.04] border border-white/[0.06] rounded-2xl p-3 hover:bg-white/[0.08] transition-all duration-300 hover:scale-[1.02]"
          >
            {/* Rank badge */}
            <div className="relative mb-3">
              <div className="aspect-square rounded-xl overflow-hidden bg-white/[0.06]">
                {artist.images[0] ? (
                  <img
                    src={artist.images[0].url}
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl text-white/20">
                    🎤
                  </div>
                )}
              </div>
              <span className="absolute -top-1.5 -left-1.5 w-7 h-7 bg-[#1DB954] text-black rounded-full flex items-center justify-center text-xs font-bold">
                {i + 1}
              </span>
            </div>

            {/* Info */}
            <h3 className="text-sm font-semibold text-white truncate">
              {artist.name}
            </h3>

            {/* Genres */}
            <div className="flex flex-wrap gap-1 mt-2">
              {artist.genres.slice(0, 2).map((genre) => (
                <span
                  key={genre}
                  className="text-[10px] px-2 py-0.5 bg-white/[0.06] rounded-full text-white/40 truncate max-w-full"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Popularity */}
            <div className="mt-3">
              <ProgressBar
                label=""
                value={artist.popularity}
                color="bg-[#1DB954]"
              />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
