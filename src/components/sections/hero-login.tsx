'use client';

import { useState } from 'react';
import { initiateLogin } from '@/lib/spotify/auth';

export function HeroLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    setLoading(true);
    setError(null);
    try {
      await initiateLogin();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao conectar.');
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1DB954]/[0.06] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 space-y-8 max-w-lg">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
          Descubra seu{' '}
          <span className="bg-gradient-to-r from-[#1DB954] to-[#1ed760] bg-clip-text text-transparent">
            gosto musical
          </span>
        </h1>

        <p className="text-white/50 text-lg max-w-md mx-auto">
          Analise seus artistas, músicas e gêneros favoritos do Spotify.
          Tudo roda no seu navegador.
        </p>

        {error && (
          <p className="text-red-400 text-sm bg-red-400/10 px-4 py-2 rounded-xl">
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-[#1DB954]/25 disabled:opacity-60 disabled:hover:scale-100 cursor-pointer"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          {loading ? 'Conectando...' : 'Conectar com Spotify'}
        </button>
      </div>
    </div>
  );
}
