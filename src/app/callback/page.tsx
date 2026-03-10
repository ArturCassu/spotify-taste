'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { exchangeCode, setToken } from '@/lib/spotify';
import { LoadingSpinner } from '@/components/ui';

function CallbackContent() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get('code');
    const authError = searchParams.get('error');

    if (authError) {
      setError(`Autorização negada: ${authError}`);
      return;
    }

    if (!code) {
      setError('Código de autorização não encontrado na URL.');
      return;
    }

    exchangeCode(code)
      .then((tokenResponse) => {
        setToken(tokenResponse.access_token);
        window.location.href = '/';
      })
      .catch((err) => {
        console.error('Token exchange failed:', err);
        setError(
          err instanceof Error
            ? err.message
            : 'Falha ao trocar o código por um token.',
        );
      });
  }, [searchParams]);

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-red-400 text-lg font-medium">Erro na autenticação</p>
        <p className="text-[var(--text-muted)] text-sm max-w-md">{error}</p>
        <a
          href="/"
          className="mt-4 inline-block rounded-full bg-[var(--spotify)] px-6 py-2 text-sm font-semibold text-black transition-colors hover:bg-[var(--spotify-dark)]"
        >
          Voltar ao início
        </a>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <LoadingSpinner />
      <p className="text-[var(--text-muted)] text-sm animate-pulse">
        Conectando com o Spotify…
      </p>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen flex-col items-center justify-center gap-4">
          <LoadingSpinner />
          <p className="text-[var(--text-muted)] text-sm animate-pulse">
            Conectando com o Spotify…
          </p>
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  );
}
