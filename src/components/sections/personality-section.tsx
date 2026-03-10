import type { Personality } from '@/lib/spotify/types';
import { Card } from '@/components/ui';

interface PersonalitySectionProps {
  personality: Personality;
}

export function PersonalitySection({ personality }: PersonalitySectionProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Sua Personalidade Musical</h2>
      <Card className="text-center py-10 space-y-4">
        <div className="text-7xl">{personality.emoji}</div>
        <h3 className="text-2xl font-bold text-white">
          {personality.title}
        </h3>
        <p className="text-white/50 max-w-md mx-auto leading-relaxed">
          {personality.description}
        </p>
      </Card>
    </section>
  );
}
