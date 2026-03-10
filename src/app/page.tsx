'use client';

import { useEffect, useState } from 'react';
import {
  isAuthenticated,
  getToken,
  fetchAllData,
  analyzeGenres,
  analyzeDecades,
  analyzeObscurity,
  analyzeAudioFeatures,
  getPersonality,
} from '@/lib/spotify';
import type { SpotifyData, AudioProfile, Personality } from '@/lib/spotify';
import { Header, Footer } from '@/components/layout';
import {
  HeroLogin,
  PersonalitySection,
  TopArtistsSection,
  TopTracksSection,
  GenresSection,
  AudioProfileSection,
  DecadesSection,
  ObscuritySection,
  RecentTracksSection,
} from '@/components/sections';
import { LoadingSpinner } from '@/components/ui';

interface AnalysisResult {
  data: SpotifyData;
  genres: [string, number][];
  decades: [string, number][];
  obscurity: number;
  audioProfile: AudioProfile | null;
  personality: Personality;
}

export default function Home() {
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      setLoading(false);
      return;
    }

    setAuthed(true);
    const token = getToken()!;

    fetchAllData(token)
      .then((data) => {
        const genres = analyzeGenres([
          ...data.artists.short,
          ...data.artists.medium,
          ...data.artists.long,
        ]);
        const decades = analyzeDecades([
          ...data.tracks.short,
          ...data.tracks.medium,
          ...data.tracks.long,
        ]);
        const obscurity = analyzeObscurity([
          ...data.artists.short,
          ...data.artists.medium,
          ...data.artists.long,
        ]);
        const audioProfile = analyzeAudioFeatures(data.audioFeatures);
        const personality = getPersonality(genres, audioProfile, obscurity);

        setResult({ data, genres, decades, obscurity, audioProfile, personality });
      })
      .catch((err) => {
        console.error('Failed to fetch Spotify data:', err);
        setError(err instanceof Error ? err.message : 'Erro ao carregar dados.');
      })
      .finally(() => setLoading(false));
  }, []);

  // Not authenticated — show hero / login
  if (!authed && !loading) {
    return (
      <>
        <Header />
        <HeroLogin />
        <Footer />
      </>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <LoadingSpinner />
        <p className="text-[var(--text-muted)] text-sm animate-pulse">
          Analisando seu gosto musical…
        </p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-red-400 text-lg font-medium">Algo deu errado</p>
        <p className="text-[var(--text-muted)] text-sm max-w-md">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded-full bg-[var(--spotify)] px-6 py-2 text-sm font-semibold text-black transition-colors hover:bg-[var(--spotify-dark)]"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  // Dashboard
  if (!result) return null;

  const { data, genres, decades, obscurity, audioProfile, personality } = result;

  return (
    <>
      <Header profile={data.profile} />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <section className="py-12">
          <PersonalitySection personality={personality} />
        </section>

        <section className="py-12">
          <TopArtistsSection artists={data.artists} />
        </section>

        <section className="py-12">
          <TopTracksSection tracks={data.tracks} />
        </section>

        <section className="py-12">
          <GenresSection genres={genres} />
        </section>

        {audioProfile && (
          <section className="py-12">
            <AudioProfileSection features={audioProfile} />
          </section>
        )}

        <section className="py-12">
          <DecadesSection decades={decades} />
        </section>

        <section className="py-12">
          <ObscuritySection score={obscurity} />
        </section>

        {data.recent.length > 0 && (
          <section className="py-12">
            <RecentTracksSection tracks={data.recent} />
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
