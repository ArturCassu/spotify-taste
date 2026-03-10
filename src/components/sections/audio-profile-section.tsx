import type { AudioProfile } from '@/lib/spotify/types';
import { Card, ProgressBar, StatCard } from '@/components/ui';

interface AudioProfileSectionProps {
  features: AudioProfile | null;
}

const FEATURE_META: {
  key: keyof Omit<AudioProfile, 'tempo'>;
  label: string;
  icon: string;
}[] = [
  { key: 'danceability', label: 'Dançabilidade', icon: '💃' },
  { key: 'energy', label: 'Energia', icon: '⚡' },
  { key: 'valence', label: 'Positividade', icon: '😊' },
  { key: 'acousticness', label: 'Acústico', icon: '🎸' },
  { key: 'instrumentalness', label: 'Instrumental', icon: '🎹' },
  { key: 'speechiness', label: 'Fala', icon: '🗣️' },
  { key: 'liveness', label: 'Ao Vivo', icon: '🎤' },
];

export function AudioProfileSection({ features }: AudioProfileSectionProps) {
  if (!features) {
    return (
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Perfil Sonoro</h2>
        <Card>
          <p className="text-white/40 text-sm">
            Dados de áudio não disponíveis.
          </p>
        </Card>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Perfil Sonoro</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Feature bars */}
        <Card>
          <div className="space-y-4">
            {FEATURE_META.map(({ key, label, icon }) => (
              <ProgressBar
                key={key}
                label={label}
                value={Math.round(features[key] * 100)}
                icon={icon}
                color="bg-[#1DB954]"
              />
            ))}
          </div>
        </Card>

        {/* Tempo stat */}
        <div className="flex items-center justify-center">
          <StatCard
            value={`${Math.round(features.tempo)}`}
            label="BPM Médio"
            emoji="🥁"
          />
        </div>
      </div>
    </section>
  );
}
