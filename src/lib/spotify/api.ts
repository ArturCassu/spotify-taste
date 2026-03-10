import { SPOTIFY_API_BASE } from './config';
import type {
  SpotifyProfile,
  SpotifyTopArtists,
  SpotifyTopTracks,
  SpotifyRecentlyPlayed,
  SpotifyAudioFeatures,
  SpotifyData,
  TimeRange,
} from './types';

// ── Generic Fetch ──────────────────────────────────────────

export async function fetchApi<T>(path: string, token: string): Promise<T> {
  const url = path.startsWith('http') ? path : `${SPOTIFY_API_BASE}${path}`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    if (response.status === 401) {
      // Token expired — clear session and redirect to login
      sessionStorage.clear();
      window.location.href = '/';
      throw new Error('Token expirado. Redirecionando para login...');
    }
    const error = await response.text();
    throw new Error(`Spotify API error (${response.status}): ${error}`);
  }

  return response.json() as Promise<T>;
}

// ── Profile ────────────────────────────────────────────────

export function getProfile(token: string): Promise<SpotifyProfile> {
  return fetchApi<SpotifyProfile>('/me', token);
}

// ── Top Artists ────────────────────────────────────────────

export function getTopArtists(
  token: string,
  timeRange: TimeRange,
  limit: number = 50,
): Promise<SpotifyTopArtists> {
  return fetchApi<SpotifyTopArtists>(
    `/me/top/artists?time_range=${timeRange}&limit=${limit}`,
    token,
  );
}

// ── Top Tracks ─────────────────────────────────────────────

export function getTopTracks(
  token: string,
  timeRange: TimeRange,
  limit: number = 50,
): Promise<SpotifyTopTracks> {
  return fetchApi<SpotifyTopTracks>(
    `/me/top/tracks?time_range=${timeRange}&limit=${limit}`,
    token,
  );
}

// ── Recently Played ────────────────────────────────────────

export function getRecentlyPlayed(
  token: string,
  limit: number = 50,
): Promise<SpotifyRecentlyPlayed> {
  return fetchApi<SpotifyRecentlyPlayed>(
    `/me/player/recently-played?limit=${limit}`,
    token,
  );
}

// ── Audio Features ─────────────────────────────────────────

export function getAudioFeatures(
  token: string,
  ids: string[],
): Promise<SpotifyAudioFeatures> {
  // Spotify accepts max 100 IDs per request
  const chunk = ids.slice(0, 100);
  return fetchApi<SpotifyAudioFeatures>(
    `/audio-features?ids=${chunk.join(',')}`,
    token,
  );
}

// ── Fetch Everything ───────────────────────────────────────

export async function fetchAllData(token: string): Promise<SpotifyData> {
  const timeRanges: TimeRange[] = ['short_term', 'medium_term', 'long_term'];

  const [
    profile,
    artistsShort,
    artistsMedium,
    artistsLong,
    tracksShort,
    tracksMedium,
    tracksLong,
    recent,
  ] = await Promise.all([
    getProfile(token),
    getTopArtists(token, timeRanges[0]),
    getTopArtists(token, timeRanges[1]),
    getTopArtists(token, timeRanges[2]),
    getTopTracks(token, timeRanges[0]),
    getTopTracks(token, timeRanges[1]),
    getTopTracks(token, timeRanges[2]),
    getRecentlyPlayed(token),
  ]);

  // Audio features — may fail with 403 on newer Spotify apps (deprecated endpoint)
  let audioFeatures: SpotifyData['audioFeatures'] = [];
  try {
    const allTracks = [
      ...tracksShort.items,
      ...tracksMedium.items,
      ...tracksLong.items,
    ];
    const uniqueIds = [...new Set(allTracks.map((t) => t.id))];

    const featureChunks: Promise<SpotifyAudioFeatures>[] = [];
    for (let i = 0; i < uniqueIds.length; i += 100) {
      featureChunks.push(getAudioFeatures(token, uniqueIds.slice(i, i + 100)));
    }
    const featureResults = await Promise.all(featureChunks);
    audioFeatures = featureResults.flatMap((r) =>
      r.audio_features.filter(Boolean),
    );
  } catch (err) {
    console.warn('Audio features unavailable (endpoint may be deprecated):', err);
  }

  return {
    profile,
    artists: {
      short: artistsShort.items,
      medium: artistsMedium.items,
      long: artistsLong.items,
    },
    tracks: {
      short: tracksShort.items,
      medium: tracksMedium.items,
      long: tracksLong.items,
    },
    recent: recent.items,
    audioFeatures,
  };
}
