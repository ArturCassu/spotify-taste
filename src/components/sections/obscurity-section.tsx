import { Card } from '@/components/ui';

interface ObscuritySectionProps {
  score: number;
}

function getObscurityMeta(score: number) {
  if (score >= 70)
    return {
      color: 'text-purple-400',
      bg: 'bg-purple-400',
      label: 'Ultra Underground',
      desc: 'Quase ninguém escuta o que você escuta. Parabéns (ou não).',
    };
  if (score >= 55)
    return {
      color: 'text-violet-400',
      bg: 'bg-violet-400',
      label: 'Underground',
      desc: 'Seu gosto é bem alternativo. Você provavelmente descobre artistas antes deles estourarem.',
    };
  if (score >= 40)
    return {
      color: 'text-blue-400',
      bg: 'bg-blue-400',
      label: 'Equilibrado',
      desc: 'Um mix saudável de hits e descobertas. O melhor dos dois mundos.',
    };
  if (score >= 25)
    return {
      color: 'text-teal-400',
      bg: 'bg-teal-400',
      label: 'Popular',
      desc: 'Você curte o que tá tocando. Nada de errado com isso.',
    };
  return {
    color: 'text-[#1DB954]',
    bg: 'bg-[#1DB954]',
    label: 'Mainstream',
    desc: 'Top 50, playlists virais, os maiores hits. Você sabe o que o povo gosta.',
  };
}

export function ObscuritySection({ score }: ObscuritySectionProps) {
  const meta = getObscurityMeta(score);

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Índice de Obscuridade</h2>
      <Card className="text-center py-8 space-y-6">
        {/* Big number */}
        <div>
          <div className={`text-6xl font-bold tabular-nums ${meta.color}`}>
            {score}
          </div>
          <div className="text-sm text-white/40 mt-1">de 100</div>
        </div>

        {/* Label */}
        <div
          className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold text-black ${meta.bg}`}
        >
          {meta.label}
        </div>

        {/* Description */}
        <p className="text-white/50 max-w-sm mx-auto text-sm leading-relaxed">
          {meta.desc}
        </p>

        {/* Scale */}
        <div className="max-w-xs mx-auto">
          <div className="h-2 rounded-full overflow-hidden bg-gradient-to-r from-[#1DB954] via-blue-400 to-purple-500">
            <div
              className="h-full bg-transparent"
              style={{ marginLeft: `${score}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-white/30 mt-1">
            <span>Mainstream</span>
            <span>Underground</span>
          </div>
          {/* Indicator */}
          <div className="relative h-0 -mt-[18px]">
            <div
              className="absolute -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-lg shadow-white/20 border-2 border-[#0a0a0a]"
              style={{ left: `${score}%` }}
            />
          </div>
        </div>
      </Card>
    </section>
  );
}
