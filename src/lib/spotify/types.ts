// ── Time Range ──────────────────────────────────────────────
export type TimeRange = 'short_term' | 'medium_term' | 'long_term';

// ── Spotify API Responses ──────────────────────────────────

export interface SpotifyImage {
  url: string;
  height: number | null;
  width: number | null;
}

export interface SpotifyProfile {
  id: string;
  display_name: string;
  images: SpotifyImage[];
  followers: { total: number };
  product: string;
  country: string;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  images: SpotifyImage[];
  genres: string[];
  popularity: number;
  external_urls: { spotify: string };
}

export interface SpotifyAlbum {
  name: string;
  images: SpotifyImage[];
  release_date: string;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  album: SpotifyAlbum;
  artists: { id: string; name: string }[];
  popularity: number;
  duration_ms: number;
  external_urls: { spotify: string };
  preview_url: string | null;
}

export interface SpotifyTopArtists {
  items: SpotifyArtist[];
  total: number;
  limit: number;
  offset: number;
}

export interface SpotifyTopTracks {
  items: SpotifyTrack[];
  total: number;
  limit: number;
  offset: number;
}

export interface SpotifyRecentlyPlayedItem {
  track: SpotifyTrack;
  played_at: string;
}

export interface SpotifyRecentlyPlayed {
  items: SpotifyRecentlyPlayedItem[];
}

export interface AudioFeature {
  id: string;
  danceability: number;
  energy: number;
  valence: number;
  acousticness: number;
  instrumentalness: number;
  speechiness: number;
  liveness: number;
  tempo: number;
  key: number;
  mode: number;
  time_signature: number;
  loudness: number;
}

export interface SpotifyAudioFeatures {
  audio_features: AudioFeature[];
}

// ── Aggregated Data ────────────────────────────────────────

export interface TimeRangeData<T> {
  short: T[];
  medium: T[];
  long: T[];
}

export interface SpotifyData {
  profile: SpotifyProfile;
  artists: TimeRangeData<SpotifyArtist>;
  tracks: TimeRangeData<SpotifyTrack>;
  recent: SpotifyRecentlyPlayedItem[];
  audioFeatures: AudioFeature[];
}

// ── Auth ───────────────────────────────────────────────────

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
}

// ── Analysis ───────────────────────────────────────────────

export interface AudioProfile {
  danceability: number;
  energy: number;
  valence: number;
  acousticness: number;
  instrumentalness: number;
  speechiness: number;
  liveness: number;
  tempo: number;
}

export interface Personality {
  emoji: string;
  title: string;
  description: string;
}
