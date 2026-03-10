'use client';

import type { SpotifyProfile } from '@/lib/spotify/types';
import { logout } from '@/lib/spotify/auth';

interface HeaderProps {
  profile?: SpotifyProfile;
}

export function Header({ profile }: HeaderProps) {
  function handleLogout() {
    logout();
    window.location.href = '/';
  }

  return (
    <header className="sticky top-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="#1DB954"
          >
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          <span className="font-semibold text-sm text-white">
            Spotify Taste
          </span>
        </div>

        {/* User */}
        {profile && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {profile.images[0] ? (
                <img
                  src={profile.images[0].url}
                  alt={profile.display_name}
                  className="w-7 h-7 rounded-full"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-white/[0.08] flex items-center justify-center text-xs">
                  {profile.display_name.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="text-sm text-white/70 hidden sm:inline">
                {profile.display_name}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="text-xs text-white/30 hover:text-white/60 transition cursor-pointer"
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
