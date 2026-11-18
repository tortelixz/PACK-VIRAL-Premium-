import { useRef, useState } from 'react';
import { Play, Volume2 } from 'lucide-react';

interface VslPlayerProps {
  src?: string;
  poster?: string;
  preloadMode?: 'none' | 'metadata' | 'auto';
}

export function VslPlayer({
  src = '/assets/aistudio/lv_0_20261116183908_61303a5c.mp4',
  poster = '/assets/aistudio/smartphone-packviral_0bd7d211.webp',
  preloadMode = 'metadata',
}: VslPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const handleStartVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.volume = 1;
    setHasStarted(true);
    video.play().catch(() => {
      // Fallback if browser blocks unmuted play on unusual environments
      video.muted = true;
      video.play().catch(() => {});
    });
  };

  return (
    <div className="w-full max-w-[330px] sm:max-w-[365px] mx-auto px-2 sm:px-0 my-3 sm:my-4">
      <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0C182E]/90 border border-[#58D4F2]/50 text-[#58D4F2] text-[11px] sm:text-xs font-extrabold uppercase tracking-wider mb-3 shadow-[0_0_16px_rgba(88,212,242,0.18)]">
        <span className="w-2 h-2 rounded-full bg-[#05D321] animate-ping" aria-hidden="true" />
        <span>ASSISTA E VEJA O PACK POR DENTRO</span>
      </div>

      <div className="relative rounded-[24px] p-[2px] bg-[linear-gradient(150deg,#58D4F2_0%,#0EA5E9_38%,#A855F7_68%,#FF2E93_100%)] shadow-[0_0_38px_rgba(88,212,242,0.22),0_14px_44px_rgba(168,85,247,0.18)]">
        <div className="relative w-full aspect-[9/16] rounded-[22px] overflow-hidden bg-[#050912]">
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            preload={preloadMode}
            playsInline
            controls={hasStarted}
            onPlay={() => setHasStarted(true)}
            className="w-full h-full object-cover block"
          />

          {!hasStarted && (
            <button
              type="button"
              onClick={handleStartVideo}
              aria-label="Assistir apresentação em vídeo com som"
              className="group absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#050912]/65 hover:bg-[#050912]/50 transition-colors cursor-pointer p-5 text-center"
            >
              <div className="px-3.5 py-1.5 rounded-full bg-[#DC2626] text-white text-[11px] font-[900] uppercase tracking-wider mb-4 flex items-center gap-1.5 shadow-[0_4px_16px_rgba(220,38,38,0.45)]">
                <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>CLIQUE PARA ATIVAR O SOM</span>
              </div>

              <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-[#05D321] text-black shadow-[0_0_32px_rgba(5,211,33,0.75)] group-hover:scale-110 transition-transform duration-200">
                <span className="absolute -inset-2 rounded-full bg-[#05D321]/35 animate-ping pointer-events-none" />
                <Play className="w-9 h-9 fill-current ml-1 relative z-10" aria-hidden="true" />
              </div>

              <span className="mt-4 font-['Plus_Jakarta_Sans',sans-serif] text-base sm:text-lg font-[800] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                Assistir Apresentação
              </span>
              <span className="mt-0.5 text-xs font-semibold text-[#58D4F2] drop-shadow">
                Veja todos os +100.000 vídeos por dentro
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
