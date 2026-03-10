// ── Types ──────────────────────────────────────────────────
export type {
  TimeRange,
  SpotifyImage,
  SpotifyProfile,
  SpotifyArtist,
  SpotifyAlbum,
  SpotifyTrack,
  SpotifyTopArtists,
  SpotifyTopTracks,
  SpotifyRecentlyPlayedItem,
  SpotifyRecentlyPlayed,
  AudioFeature,
  SpotifyAudioFeatures,
  TimeRangeData,
  SpotifyData,
  TokenResponse,
  AudioProfile,
  Personality,
} from './types';

// ── Config ─────────────────────────────────────────────────
export {
  SCOPES,
  SPOTIFY_AUTH_URL,
  SPOTIFY_TOKEN_URL,
  SPOTIFY_API_BASE,
  CLIENT_ID_KEY,
} from './config';

// ── PKCE ───────────────────────────────────────────────────
export { generateRandom, generatePKCE } from './pkce';

// ── Auth ───────────────────────────────────────────────────
export {
  getClientId,
  setClientId,
  getRedirectUri,
  initiateLogin,
  exchangeCode,
  getToken,
  setToken,
  logout,
  isAuthenticated,
} from './auth';

// ── API ────────────────────────────────────────────────────
export {
  fetchApi,
  getProfile,
  getTopArtists,
  getTopTracks,
  getRecentlyPlayed,
  getAudioFeatures,
  fetchAllData,
} from './api';

// ── Analysis ───────────────────────────────────────────────
export {
  analyzeGenres,
  analyzeDecades,
  analyzeObscurity,
  analyzeAudioFeatures,
  getPersonality,
} from './analysis';
