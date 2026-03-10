import type {
  SpotifyArtist,
  SpotifyTrack,
  AudioFeature,
  AudioProfile,
  Personality,
} from './types';

// ── Genre Analysis ─────────────────────────────────────────

/**
 * Count genre occurrences across artists, sorted descending by count.
 */
export function analyzeGenres(artists: SpotifyArtist[]): [string, number][] {
  const counts = new Map<string, number>();

  for (const artist of artists) {
    for (const genre of artist.genres) {
      counts.set(genre, (counts.get(genre) ?? 0) + 1);
    }
  }

  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

// ── Decade Analysis ────────────────────────────────────────

/**
 * Extract the decade from each track's album release_date and count occurrences.
 */
export function analyzeDecades(tracks: SpotifyTrack[]): [string, number][] {
  const counts = new Map<string, number>();

  for (const track of tracks) {
    const year = parseInt(track.album.release_date.slice(0, 4), 10);
    if (isNaN(year)) continue;

    const decade = `${Math.floor(year / 10) * 10}s`;
    counts.set(decade, (counts.get(decade) ?? 0) + 1);
  }

  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

// ── Obscurity Score ────────────────────────────────────────

/**
 * Obscurity = 100 - average popularity.
 * Higher = more obscure taste. Returns 0 if no artists.
 */
export function analyzeObscurity(artists: SpotifyArtist[]): number {
  if (artists.length === 0) return 0;

  const avgPopularity =
    artists.reduce((sum, a) => sum + a.popularity, 0) / artists.length;

  return Math.round(100 - avgPopularity);
}

// ── Audio Feature Averages ─────────────────────────────────

/**
 * Average all numeric audio features into a single AudioProfile.
 * Returns null if no features provided.
 */
export function analyzeAudioFeatures(
  features: AudioFeature[],
): AudioProfile | null {
  if (features.length === 0) return null;

  const len = features.length;

  const sum = features.reduce(
    (acc, f) => ({
      danceability: acc.danceability + f.danceability,
      energy: acc.energy + f.energy,
      valence: acc.valence + f.valence,
      acousticness: acc.acousticness + f.acousticness,
      instrumentalness: acc.instrumentalness + f.instrumentalness,
      speechiness: acc.speechiness + f.speechiness,
      liveness: acc.liveness + f.liveness,
      tempo: acc.tempo + f.tempo,
    }),
    {
      danceability: 0,
      energy: 0,
      valence: 0,
      acousticness: 0,
      instrumentalness: 0,
      speechiness: 0,
      liveness: 0,
      tempo: 0,
    },
  );

  return {
    danceability: sum.danceability / len,
    energy: sum.energy / len,
    valence: sum.valence / len,
    acousticness: sum.acousticness / len,
    instrumentalness: sum.instrumentalness / len,
    speechiness: sum.speechiness / len,
    liveness: sum.liveness / len,
    tempo: sum.tempo / len,
  };
}

// ── Personality ────────────────────────────────────────────

/**
 * Determine a "listening personality" based on genre distribution,
 * audio features, and obscurity score.
 */
export function getPersonality(
  genres: [string, number][],
  features: AudioProfile | null,
  obscurity: number,
): Personality {
  // High obscurity → underground explorer
  if (obscurity >= 60) {
    return {
      emoji: '🔮',
      title: 'Underground Explorer',
      description:
        'You dig deep. While most people stick to the charts, you\'re out there discovering artists before they blow up. Your taste is genuinely niche.',
    };
  }

  // High energy + high danceability → party animal
  if (features && features.energy > 0.7 && features.danceability > 0.7) {
    return {
      emoji: '🪩',
      title: 'Dancefloor Commander',
      description:
        'High energy, high danceability — your playlists could power a club. You live for the beat and the bass.',
    };
  }

  // High acousticness + high valence → sunny acoustic
  if (features && features.acousticness > 0.5 && features.valence > 0.5) {
    return {
      emoji: '🌻',
      title: 'Sunny Soul',
      description:
        'Acoustic vibes and positive energy. You\'re the person who puts on the perfect playlist for a road trip or a lazy Sunday morning.',
    };
  }

  // Low valence + low energy → melancholic
  if (features && features.valence < 0.35 && features.energy < 0.5) {
    return {
      emoji: '🌧️',
      title: 'Melancholic Dreamer',
      description:
        'You embrace the sad and the beautiful. Low-energy, emotionally rich music speaks to your soul. Rainy days are your vibe.',
    };
  }

  // High energy + low valence → intense
  if (features && features.energy > 0.65 && features.valence < 0.4) {
    return {
      emoji: '⚡',
      title: 'Dark Energy',
      description:
        'Intense, aggressive, and unapologetically heavy. You channel raw emotion through powerful, high-energy music.',
    };
  }

  // High instrumentalness → ambient/instrumental lover
  if (features && features.instrumentalness > 0.3) {
    return {
      emoji: '🎧',
      title: 'Soundscape Architect',
      description:
        'Words are overrated. You prefer the texture of sound — ambient, electronic, instrumental. Music as atmosphere.',
    };
  }

  // Diverse genres → eclectic
  const topGenres = genres.slice(0, 5);
  const genreSpread = topGenres.length >= 5 && topGenres[4][1] > 1;
  if (genreSpread && obscurity >= 35) {
    return {
      emoji: '🎨',
      title: 'Eclectic Curator',
      description:
        'Your taste refuses to be boxed in. You jump between genres like a musical nomad, always chasing what sounds interesting.',
    };
  }

  // Default — mainstream listener
  return {
    emoji: '🎵',
    title: 'Crowd Favorite',
    description:
      'You know what you like and you\'re not ashamed of it. Popular music is popular for a reason — it\'s good. You\'ve got solid, approachable taste.',
  };
}
