import { useEffect, useRef, useState } from 'react';
import { Sparkles, Volume2 } from 'lucide-react';
import {
  playConfettiAndApplause,
  playWheelTick,
  unlockCelebrationAudio,
} from '../utils/celebrationAudio';

interface DiscountWheelModalProps {
  isOpen: boolean;
  onClaimDiscount: () => void;
}

interface WheelSegment {
  label: string;
  sublabel: string;
  fill: string;
  textColor: string;
  isWinner?: boolean;
}

const WHEEL_SEGMENTS: WheelSegment[] = [
  { label: '85%', sublabel: 'OFF', fill: '#05D321', textColor: '#041206', isWinner: true },
  { label: '15%', sublabel: 'OFF', fill: '#0E1930', textColor: '#E2E8F0' },
  { label: '50%', sublabel: 'OFF', fill: '#7C3AED', textColor: '#FFFFFF' },
  { label: '25%', sublabel: 'OFF', fill: '#0B1324', textColor: '#E2E8F0' },
  { label: '70%', sublabel: 'OFF', fill: '#0EA5E9', textColor: '#041322' },
  { label: '10%', sublabel: 'OFF', fill: '#0E1930', textColor: '#E2E8F0' },
  { label: '40%', sublabel: 'OFF', fill: '#DB2777', textColor: '#FFFFFF' },
  { label: '30%', sublabel: 'OFF', fill: '#0B1324', textColor: '#E2E8F0' },
];

const SEGMENT_COUNT = WHEEL_SEGMENTS.length;
const SLICE_DEG = 360 / SEGMENT_COUNT;

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function createWedgePath(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? '0' : '1';
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y} Z`;
}

interface ConfettiPiece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  tilt: number;
  tiltSpeed: number;
  alpha: number;
}

const CONFETTI_COLORS = ['#05D321', '#58D4F2', '#A855F7', '#FF2E93', '#FACC15', '#FFFFFF'];

export function DiscountWheelModal({ isOpen, onClaimDiscount }: DiscountWheelModalProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  const wheelRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const spinTimeoutRef = useRef<number | null>(null);
  const tickRafRef = useRef<number | null>(null);
  const confettiRafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (spinTimeoutRef.current !== null) window.clearTimeout(spinTimeoutRef.current);
      if (tickRafRef.current !== null) window.cancelAnimationFrame(tickRafRef.current);
      if (confettiRafRef.current !== null) window.cancelAnimationFrame(confettiRafRef.current);
    };
  }, []);

  const launchConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces: ConfettiPiece[] = [];
    const total = 150;

    for (let i = 0; i < total; i++) {
      const fromLeft = i % 3 === 0;
      const fromRight = i % 3 === 1;
      const originX = fromLeft
        ? canvas.width * 0.18
        : fromRight
          ? canvas.width * 0.82
          : canvas.width * 0.5;
      const originY = fromLeft || fromRight ? canvas.height * 0.62 : canvas.height * 0.28;

      const spreadAngle = fromLeft
        ? -Math.PI / 3 + (Math.random() - 0.5) * 0.9
        : fromRight
          ? (-2 * Math.PI) / 3 + (Math.random() - 0.5) * 0.9
          : -Math.PI / 2 + (Math.random() - 0.5) * 1.9;
      const speed = 7 + Math.random() * 11;

      pieces.push({
        x: originX,
        y: originY,
        vx: Math.cos(spreadAngle) * speed,
        vy: Math.sin(spreadAngle) * speed - 2,
        size: 6 + Math.random() * 7,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.25,
        tilt: Math.random() * 10,
        tiltSpeed: 0.08 + Math.random() * 0.12,
        alpha: 1,
      });
    }

    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let alive = 0;
      for (const p of pieces) {
        p.vx *= 0.985;
        p.vy += 0.28; // gravity
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.tilt += p.tiltSpeed;

        if (elapsed > 2600) {
          p.alpha = Math.max(0, p.alpha - 0.025);
        }

        if (p.alpha > 0 && p.y < canvas.height + 40) {
          alive++;
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          const scaleY = Math.cos(p.tilt);
          ctx.fillRect(-p.size / 2, (-p.size * scaleY) / 2, p.size, p.size * 0.65);
          ctx.restore();
        }
      }

      if (alive > 0 && elapsed < 4500) {
        confettiRafRef.current = window.requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    confettiRafRef.current = window.requestAnimationFrame(animate);
  };

  const startTickWatcher = () => {
    let lastSliceIndex = -1;

    const checkRotation = () => {
      const el = wheelRef.current;
      if (!el) return;

      const computed = window.getComputedStyle(el).transform;
      if (computed && computed !== 'none') {
        const match = computed.match(/matrix\(([^)]+)\)/);
        if (match) {
          const [a, b] = match[1].split(',').map(Number);
          let angleDeg = Math.atan2(b, a) * (180 / Math.PI);
          if (angleDeg < 0) angleDeg += 360;
          const currentSlice = Math.floor((angleDeg + SLICE_DEG / 2) / SLICE_DEG) % SEGMENT_COUNT;

          if (lastSliceIndex !== -1 && currentSlice !== lastSliceIndex) {
            playWheelTick(0.95 + Math.random() * 0.15);
          }
          lastSliceIndex = currentSlice;
        }
      }

      tickRafRef.current = window.requestAnimationFrame(checkRotation);
    };

    tickRafRef.current = window.requestAnimationFrame(checkRotation);
  };

  const handleSpin = () => {
    if (isSpinning || hasWon) return;

    // Unlock audio immediately inside user click gesture
    unlockCelebrationAudio();
    playWheelTick(1.1);

    setIsSpinning(true);
    startTickWatcher();

    spinTimeoutRef.current = window.setTimeout(() => {
      if (tickRafRef.current !== null) {
        window.cancelAnimationFrame(tickRafRef.current);
        tickRafRef.current = null;
      }
      setIsSpinning(false);
      setHasWon(true);
      playConfettiAndApplause();
      launchConfetti();
    }, 4650);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#03060E]/88 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wheel-modal-title"
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-30"
        aria-hidden="true"
      />

      <div className="relative z-20 w-full max-w-[430px] rounded-[26px] p-[2px] bg-[linear-gradient(150deg,#58D4F2_0%,#A855F7_52%,#FF2E93_100%)] shadow-[0_0_55px_rgba(88,212,242,0.28),0_24px_70px_rgba(0,0,0,0.85)]">
        <div className="relative rounded-[24px] bg-[radial-gradient(ellipse_at_top,#102344_0%,#081022_55%,#050914_100%)] px-4 py-5 sm:px-6 sm:py-6 text-center overflow-hidden">

          {!hasWon ? (
            <>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#05D321]/15 border border-[#05D321]/45 text-[#49F503] text-[11px] font-extrabold uppercase tracking-widest mb-2">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                <span>PRESENTE DE BOAS-VINDAS</span>
              </div>

              <h2
                id="wheel-modal-title"
                className="font-['Plus_Jakarta_Sans',sans-serif] text-[22px] sm:text-[26px] font-[800] text-white leading-[1.12] tracking-[-0.02em] mb-1.5"
              >
                Gire a roleta e veja o{' '}
                <span className="gradient-blue-text">seu desconto.</span>
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 mb-4">
                Você tem <span className="text-white font-bold">1 giro grátis</span> para liberar seu cupom exclusivo hoje.
              </p>

              {/* WHEEL CONTAINER */}
              <div className="relative w-[268px] h-[268px] sm:w-[300px] sm:h-[300px] mx-auto mb-5 select-none">
                {/* Outer Neon Glow */}
                <div
                  className="pointer-events-none absolute -inset-3 rounded-full bg-[radial-gradient(circle,rgba(88,212,242,0.28)_0%,rgba(168,85,247,0.18)_52%,transparent_72%)]"
                  aria-hidden="true"
                />

                {/* Top Pointer Triangle */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 drop-shadow-[0_4px_10px_rgba(0,0,0,0.85)]">
                  <svg width="34" height="36" viewBox="0 0 34 36" fill="none" aria-hidden="true">
                    <path
                      d="M17 35L3 6C1.8 3.6 3.5 1 6.2 1H27.8C30.5 1 32.2 3.6 31 6L17 35Z"
                      fill="#FACC15"
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                    />
                  </svg>
                </div>

                {/* Spinning Wheel */}
                <div
                  ref={wheelRef}
                  className={`w-full h-full rounded-full shadow-[0_0_28px_rgba(0,0,0,0.9)] ${
                    isSpinning || hasWon ? 'wheel-spin-to-85' : 'rotate-[135deg]'
                  }`}
                >
                  <svg viewBox="0 0 360 360" className="w-full h-full">
                    <defs>
                      <linearGradient id="wheelRim" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#58D4F2" />
                        <stop offset="50%" stopColor="#A855F7" />
                        <stop offset="100%" stopColor="#FF2E93" />
                      </linearGradient>
                    </defs>

                    {/* Outer Bezel */}
                    <circle cx="180" cy="180" r="175" fill="url(#wheelRim)" />
                    <circle cx="180" cy="180" r="167" fill="#050912" />

                    {/* Slices */}
                    {WHEEL_SEGMENTS.map((seg, idx) => {
                      const startAngle = idx * SLICE_DEG - SLICE_DEG / 2;
                      const endAngle = idx * SLICE_DEG + SLICE_DEG / 2;
                      const path = createWedgePath(180, 180, 162, startAngle, endAngle);
                      const pegPos = polarToCartesian(180, 180, 169, startAngle);

                      return (
                        <g key={idx}>
                          <path
                            d={path}
                            fill={seg.fill}
                            stroke="#050912"
                            strokeWidth="2.5"
                          />
                          <g transform={`rotate(${idx * SLICE_DEG} 180 180)`}>
                            <text
                              x="180"
                              y="64"
                              textAnchor="middle"
                              fill={seg.textColor}
                              className="font-['Plus_Jakarta_Sans',sans-serif] font-[900]"
                              fontSize={seg.isWinner ? '25' : '22'}
                            >
                              {seg.label}
                            </text>
                            <text
                              x="180"
                              y="84"
                              textAnchor="middle"
                              fill={seg.textColor}
                              className="font-['Montserrat',sans-serif] font-[800]"
                              fontSize="12"
                            >
                              {seg.sublabel}
                            </text>
                          </g>
                          {/* Bezel Peg Lights */}
                          <circle
                            cx={pegPos.x}
                            cy={pegPos.y}
                            r="4"
                            fill={idx % 2 === 0 ? '#FACC15' : '#FFFFFF'}
                          />
                        </g>
                      );
                    })}

                    {/* Center Hub */}
                    <circle cx="180" cy="180" r="34" fill="#080D18" stroke="#58D4F2" strokeWidth="4" />
                    <circle cx="180" cy="180" r="24" fill="#05D321" />
                    <text
                      x="180"
                      y="185"
                      textAnchor="middle"
                      fill="#041206"
                      className="font-['Plus_Jakarta_Sans',sans-serif] font-[900]"
                      fontSize="12"
                    >
                      GIRE!
                    </text>
                  </svg>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSpin}
                disabled={isSpinning}
                className={`w-full py-4 px-6 rounded-full font-[900] text-base sm:text-lg uppercase tracking-wider text-white transition-all flex items-center justify-center gap-2 ${
                  isSpinning
                    ? 'bg-neutral-700 cursor-wait opacity-85'
                    : 'green-glow-button animate-pulse-glow cursor-pointer hover:scale-[1.02] active:scale-95 shadow-[0_0_26px_rgba(10,224,40,0.55)]'
                }`}
              >
                <Volume2 className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>{isSpinning ? 'GIRANDO A ROLETA...' : 'GIRAR ROLETA AGORA!'}</span>
              </button>
            </>
          ) : (
            <div className="py-2">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#05D321] text-black text-xs font-[900] uppercase tracking-wider mb-3 shadow-[0_0_20px_rgba(5,211,33,0.45)]">
                <span>🎉 PARABÉNS! VOCÊ GANHOU!</span>
              </div>

              <h2
                id="wheel-modal-title"
                className="font-['Plus_Jakarta_Sans',sans-serif] text-[26px] sm:text-[32px] font-[800] text-white leading-[1.08] tracking-[-0.02em] mb-2"
              >
                CUPOM DE <span className="text-[#05D321]">85% DE DESCONTO</span> LIBERADO!
              </h2>

              <p className="text-sm sm:text-base text-neutral-200 leading-relaxed mb-4">
                Você tirou a maior premiação da roleta! Seu desconto máximo já foi aplicado na oferta do{' '}
                <span className="text-white font-bold">Pack Viral +100.000 Vídeos</span>.
              </p>

              <div className="rounded-2xl bg-[#050912]/90 border border-[#05D321]/50 px-4 py-3 mb-5 shadow-[0_0_22px_rgba(5,211,33,0.16)]">
                <p className="text-xs sm:text-sm font-extrabold text-[#58D4F2] uppercase tracking-wide">
                  ✓ 85% OFF ATIVADO AUTOMATICAMENTE
                </p>
              </div>

              <button
                type="button"
                onClick={onClaimDiscount}
                className="w-full py-4 px-6 rounded-full font-[900] text-base sm:text-lg uppercase tracking-wider text-white green-glow-button animate-pulse-glow cursor-pointer hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_28px_rgba(10,224,40,0.6)]"
              >
                RESGATAR MEU DESCONTO DE 85% 🔥
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
