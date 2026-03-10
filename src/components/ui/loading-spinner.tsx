export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a]">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-white/[0.08] border-t-[#1DB954] animate-spin" />
        <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-b-[#1DB954]/30 animate-spin [animation-direction:reverse] [animation-duration:1.5s]" />
      </div>
      <p className="mt-6 text-white/60 text-sm animate-pulse">
        Analisando seu gosto musical...
      </p>
    </div>
  );
}
