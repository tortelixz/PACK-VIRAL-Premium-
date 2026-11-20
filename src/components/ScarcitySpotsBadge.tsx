import { useEffect, useRef, useState } from 'react';

const STEP_INTERVAL_MS = 1000;

export function ScarcitySpotsBadge() {
  const [spotsLeft, setSpotsLeft] = useState(5);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || hasEnteredView) return;

    if (typeof IntersectionObserver === 'undefined') {
      setHasEnteredView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setHasEnteredView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.8 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasEnteredView]);

  useEffect(() => {
    if (!hasEnteredView || spotsLeft <= 1) return;

    const timer = window.setTimeout(() => {
      setSpotsLeft((prev) => (prev > 1 ? prev - 1 : 1));
    }, STEP_INTERVAL_MS);

    return () => window.clearTimeout(timer);
  }, [hasEnteredView, spotsLeft]);

  return (
    <div
      ref={containerRef}
      aria-live="polite"
      className="w-full mb-3 flex justify-center"
    >
      <div className="w-full rounded-2xl bg-gradient-to-r from-[#28070B]/95 via-[#180814]/95 to-[#28070B]/95 border border-red-500/60 px-3 sm:px-4 py-2.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 animate-urgency-pulse">
        <span className="text-[13px] sm:text-[15px] font-[900] uppercase tracking-wider text-white flex items-center gap-1.5">
          <span aria-hidden="true">🔥</span>
          <span>{spotsLeft === 1 ? 'RESTA APENAS' : 'RESTAM APENAS'}</span>
        </span>

        <span className="inline-flex items-center justify-center min-w-[2.25rem] sm:min-w-[2.6rem] px-2.5 py-0.5 rounded-xl bg-white border-2 border-red-500 shadow-[0_0_16px_rgba(255,255,255,0.45)]">
          <span
            key={spotsLeft}
            className="font-['Plus_Jakarta_Sans',sans-serif] text-[24px] sm:text-[28px] font-[900] leading-none tabular-nums animate-spot-pop"
          >
            <span className="animate-black-red-blink">{spotsLeft}</span>
          </span>
        </span>

        <span className="text-[13px] sm:text-[15px] font-[900] uppercase tracking-wider text-white">
          {spotsLeft === 1 ? 'VAGA!' : 'VAGAS!'}
        </span>
      </div>
    </div>
  );
}
