import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Award,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  CircleCheckBig,
  CloudDownload,
  Flame,
  Headphones,
  Layers,
  SquarePen,
  VideoOff,
} from 'lucide-react';
import { DiscountWheelModal } from './components/DiscountWheelModal';
import { LegalModal, type LegalModalType } from './components/LegalModal';
import { ProfileCard } from './components/ProfileCard';
import { VslPlayer } from './components/VslPlayer';
import {
  CHECKOUT_URL,
  FAQ_ITEMS,
  NICHE_CARDS,
  OFFER_FEATURES,
  PROFILE_EXAMPLES,
  STUDENT_RESULTS,
  TARGET_AUDIENCE_ITEMS,
  TESTIMONIAL_SLIDES,
  WHATSAPP_URL,
} from './data/packData';

function WhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const NICHE_CARD_STYLES = {
  cyan: {
    card: 'border-[#58D4F2]/65 border-b-[#58D4F2]/25 hover:border-[#58D4F2] shadow-[0_0_16px_rgba(88,212,242,0.14)] hover:shadow-[0_0_24px_rgba(88,212,242,0.28)]',
    topLine: 'bg-gradient-to-r from-transparent via-[#58D4F2]/85 to-transparent',
  },
  purple: {
    card: 'border-[#58D4F2]/55 border-b-[#A855F7]/30 hover:border-[#A855F7]/85 shadow-[0_0_16px_rgba(88,212,242,0.12),0_4px_18px_rgba(168,85,247,0.12)] hover:shadow-[0_0_24px_rgba(168,85,247,0.26)]',
    topLine: 'bg-gradient-to-r from-transparent via-[#A855F7]/85 to-transparent',
  },
  pink: {
    card: 'border-[#58D4F2]/55 border-b-[#FF4DA6]/30 hover:border-[#FF4DA6]/85 shadow-[0_0_16px_rgba(88,212,242,0.12),0_4px_18px_rgba(255,46,147,0.10)] hover:shadow-[0_0_24px_rgba(255,46,147,0.24)]',
    topLine: 'bg-gradient-to-r from-transparent via-[#FF4DA6]/80 to-transparent',
  },
};

const RESULT_CARD_STYLES = {
  cyan: 'border-[#58D4F2]/40 hover:border-[#58D4F2] shadow-[0_12px_30px_rgba(88,212,242,0.15)]',
  purple: 'border-[#A855F7]/45 hover:border-[#A855F7] shadow-[0_12px_30px_rgba(168,85,247,0.16)]',
  pink: 'border-[#FF4DA6]/35 hover:border-[#FF4DA6] shadow-[0_12px_30px_rgba(255,46,147,0.14)]',
};

const TESTIMONIAL_TRANSLATE_CLASSES = ['translate-x-0', '-translate-x-full', '-translate-x-[200%]'];

export default function App() {
  const [secondsLeft, setSecondsLeft] = useState(8 * 60 + 26);
  const [activeProfileIndex, setActiveProfileIndex] = useState(1);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0, 1, 2, 3, 4, 5]);
  const [legalModal, setLegalModal] = useState<LegalModalType>(null);
  const [isWheelOpen, setIsWheelOpen] = useState(true);
  const [discountUnlocked, setDiscountUnlocked] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 8 * 60 + 26));
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const urlsToWarm = [
      ...PROFILE_EXAMPLES.map((p) => p.avatar).filter((src): src is string => Boolean(src)),
      ...TESTIMONIAL_SLIDES.map((s) => s.image),
    ];
    urlsToWarm.forEach((src) => {
      const img = new Image();
      img.src = src;
      if (typeof img.decode === 'function') {
        img.decode().catch(() => {});
      }
    });
  }, []);

  const minutesFormatted = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const secondsFormatted = String(secondsLeft % 60).padStart(2, '0');

  const scrollToOffer = () => {
    document.getElementById('escolha')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePrevProfile = () => {
    setActiveProfileIndex((prev) => (prev - 1 + PROFILE_EXAMPLES.length) % PROFILE_EXAMPLES.length);
  };

  const handleNextProfile = () => {
    setActiveProfileIndex((prev) => (prev + 1) % PROFILE_EXAMPLES.length);
  };

  const handlePrevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + TESTIMONIAL_SLIDES.length) % TESTIMONIAL_SLIDES.length);
  };

  const handleNextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % TESTIMONIAL_SLIDES.length);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(idx) ? prev.filter((item) => item !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#080D18_0%,#050912_16%,#090B1B_38%,#040811_62%,#0B0A1A_84%,#050912_100%)] text-white font-['Montserrat'] selection:bg-[#58D4F2] selection:text-white">
      {/* HERO SECTION */}
      <section className="relative pt-4 pb-7 sm:pt-8 sm:pb-11 px-0 bg-transparent overflow-x-clip">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_38%,rgba(14,165,233,0.17)_0%,rgba(8,24,48,0.30)_46%,transparent_76%),radial-gradient(ellipse_55%_42%_at_18%_18%,rgba(147,51,234,0.14)_0%,transparent_70%),radial-gradient(ellipse_52%_40%_at_82%_22%,rgba(255,46,147,0.11)_0%,rgba(255,107,53,0.06)_48%,transparent_74%)]"
          aria-hidden="true"
        />
        <div className="w-full max-w-none mx-auto text-center flex flex-col items-center relative z-10 px-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DC2626] border border-[#EF4444]/55 text-white text-[11px] sm:text-xs font-extrabold tracking-[0.14em] uppercase mb-2.5 shadow-[0_4px_18px_rgba(220,38,38,0.32)]">
            <span>🔥EM ALTA NO BRASIL!</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#DC2626] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2.5">
            <span>ESTA OFERTA TERMINA EM:</span>
            <span className="font-mono font-extrabold tracking-widest bg-black/30 px-2 py-0.5 rounded text-white tabular-nums">
              {minutesFormatted}:{secondsFormatted}
            </span>
          </div>

          {discountUnlocked && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#05D321]/15 border border-[#05D321]/60 text-[#49F503] text-[11px] sm:text-xs font-[900] uppercase tracking-wider mb-2.5 shadow-[0_0_18px_rgba(5,211,33,0.28)]">
              <span>🎉 CUPOM DE 85% DE DESCONTO ATIVADO!</span>
            </div>
          )}

          <div className="w-full flex justify-center items-center px-4 mb-2.5 sm:mb-4">
            <img
              alt="Pack Viral com Bônus Exclusivo GTA 6"
              width={720}
              height={480}
              loading="eager"
              decoding="sync"
              fetchPriority="high"
              className="w-60 min-[390px]:w-64 sm:w-76 md:w-[330px] h-auto object-contain select-none drop-shadow-[0_14px_28px_rgba(0,0,0,0.75)]"
              draggable={false}
              src="/assets/aistudio/packviral-gta6-bonus_7e394304.webp"
            />
          </div>

          <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-[800] tracking-[-0.03em] text-white leading-[1.06] sm:leading-[1.05] mb-2.5 sm:mb-3.5 w-full max-w-full px-3 sm:px-6 text-center">
            <span className="flex flex-col items-center w-full max-w-full sm:hidden text-[clamp(1.6rem,8.8vw,3.1rem)]">
              <span className="block max-w-full">Pare de perder</span>
              <span className="block max-w-full">
                tempo <span className="gradient-blue-text">criando</span>
              </span>
              <span className="block max-w-full gradient-blue-text px-0.5">conteúdo do zero</span>
            </span>
            <span className="hidden sm:flex flex-col items-center w-full max-w-full text-[clamp(2.35rem,6.1vw,5.4rem)]">
              <span className="block max-w-full">Pare de perder tempo</span>
              <span className="block max-w-full gradient-blue-text px-1">criando conteúdo do zero</span>
            </span>
          </h1>

          <p className="text-[12.5px] sm:text-base font-bold text-[#58D4F2] text-center px-3 mb-3 sm:mb-4 tracking-wide">
            ✓ 100% Sem Copyright (Livre para Monetizar) &nbsp;•&nbsp; ✓ Todos Sem Marca d&apos;Água
          </p>

          <div className="w-full max-w-[540px] sm:max-w-[580px] mx-auto px-2 sm:px-4 my-1 sm:my-2">
            <img
              alt="Smartphone Pack Viral com exemplos de vídeos no TikTok, Instagram Reels e YouTube Shorts"
              width={680}
              height={744}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="w-full h-auto block object-contain select-none"
              draggable={false}
              src="/assets/aistudio/smartphone-packviral-v2.webp"
            />
          </div>

          <VslPlayer preloadMode="metadata" />

          <button
            type="button"
            onClick={scrollToOffer}
            className="mt-4 sm:mt-6 w-[calc(100%-1rem)] sm:w-full max-w-md py-4 sm:py-5 px-6 sm:px-8 rounded-full text-white font-[900] text-[18px] sm:text-xl tracking-wider uppercase flex items-center justify-center gap-3 green-glow-button animate-pulse-glow transition-all cursor-pointer relative overflow-hidden group shadow-[0_0_30px_rgba(10,224,40,0.6)]"
          >
            <span className="relative z-10 flex items-center gap-2 drop-shadow-md">
              QUERO ACESSO IMEDIATO
              <img
                alt="⚡"
                width={24}
                height={24}
                decoding="async"
                className="w-6 h-6 inline-block"
                src="/assets/aistudio/26a1_d3a6d0c1.svg"
              />
            </span>
          </button>
        </div>
      </section>

      {/* ARSENAL & PROFILES SECTION */}
      <section className="py-6 sm:py-10 px-2 sm:px-4 bg-transparent relative overflow-hidden">
        <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(88,212,242,0.38)_34%,rgba(168,85,247,0.35)_56%,rgba(255,46,147,0.28)_76%,transparent_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_42%_44%,rgba(14,165,233,0.11)_0%,transparent_72%),radial-gradient(ellipse_55%_45%_at_72%_52%,rgba(147,51,234,0.08)_0%,rgba(255,46,147,0.05)_48%,transparent_74%)]" />

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[28px] min-[390px]:text-[33px] sm:text-[38px] md:text-[44px] font-[800] text-center tracking-[-0.03em] leading-[1.08] text-white max-w-4xl mx-auto mb-5 sm:mb-8 px-1">
            Você Não Precisa Criar Conteúdo do Zero,{' '}
            <span className="gradient-blue-text">Tenha Um Arsenal de Conteúdo Infinito</span> Pronto
            <span className="block">Para Viralizar!</span>
          </h2>

          <div className="relative max-w-4xl mx-auto px-6 sm:px-10">
            <button
              type="button"
              onClick={handlePrevProfile}
              aria-label="Perfil anterior"
              className="absolute -left-1 sm:left-0 top-1/2 -translate-y-1/2 z-20 p-1 sm:p-2 text-[#58D4F2] hover:text-white transition-colors cursor-pointer touch-manipulation drop-shadow-[0_0_8px_rgba(88,212,242,0.75)]"
            >
              <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.5} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={handleNextProfile}
              aria-label="Próximo perfil"
              className="absolute -right-1 sm:right-0 top-1/2 -translate-y-1/2 z-20 p-1 sm:p-2 text-[#58D4F2] hover:text-white transition-colors cursor-pointer touch-manipulation drop-shadow-[0_0_8px_rgba(88,212,242,0.75)]"
            >
              <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.5} aria-hidden="true" />
            </button>

            <div className="md:hidden w-full max-w-[370px] mx-auto">
              {PROFILE_EXAMPLES.map((profile, idx) => (
                <div key={profile.handle} className={idx === activeProfileIndex ? 'block' : 'hidden'}>
                  <ProfileCard profile={profile} isActive />
                </div>
              ))}
            </div>

            <div className="hidden md:grid md:grid-cols-3 gap-4 items-center">
              {PROFILE_EXAMPLES.map((profile, idx) => (
                <ProfileCard
                  key={profile.handle}
                  profile={profile}
                  isActive={idx === activeProfileIndex}
                  onSelect={() => setActiveProfileIndex(idx)}
                />
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-3.5">
              {PROFILE_EXAMPLES.map((profile, idx) => (
                <button
                  key={profile.handle}
                  type="button"
                  onClick={() => setActiveProfileIndex(idx)}
                  aria-label={`Ver perfil ${profile.handle}`}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    idx === activeProfileIndex
                      ? 'w-7 bg-gradient-to-r from-[#58D4F2] via-[#A855F7] to-[#FF2E93]'
                      : 'w-2.5 bg-neutral-700 hover:bg-neutral-500'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-5 max-w-[520px] mx-auto mt-5 sm:mt-7">
            <div className="relative overflow-hidden bg-[linear-gradient(165deg,rgba(8,18,36,0.95)_0%,rgba(6,9,17,0.96)_72%,rgba(26,12,42,0.55)_100%)] border border-[#58D4F2]/70 rounded-2xl px-2.5 sm:px-5 py-5 sm:py-6 flex flex-col items-center justify-center text-center shadow-[0_0_20px_rgba(88,212,242,0.16),0_8px_22px_rgba(147,51,234,0.12)] hover:border-[#58D4F2] hover:shadow-[0_0_26px_rgba(88,212,242,0.28),0_8px_26px_rgba(168,85,247,0.2)] transition-all duration-200">
              <div
                className="pointer-events-none absolute top-0 inset-x-4 h-[1px] bg-gradient-to-r from-transparent via-[#58D4F2]/80 to-[#A855F7]/50"
                aria-hidden="true"
              />
              <div className="mb-3 text-[#58D4F2] drop-shadow-[0_0_10px_rgba(88,212,242,0.75)]">
                <svg viewBox="0 0 48 48" fill="none" className="w-11 h-11 sm:w-12 sm:h-12" aria-hidden="true">
                  <circle cx="24" cy="24" r="19" fill="currentColor" />
                  <path
                    d="M24 13.5V24.5L31.5 29"
                    stroke="#060911"
                    strokeWidth="3.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-[14px] sm:text-[17px] font-extrabold text-white leading-snug">
                Poste em Menos
                <br />
                de 30 segundos!
              </p>
            </div>

            <div className="relative overflow-hidden bg-[linear-gradient(165deg,rgba(8,18,36,0.95)_0%,rgba(6,9,17,0.96)_72%,rgba(44,12,38,0.48)_100%)] border border-[#58D4F2]/65 hover:border-[#FF4DA6]/80 rounded-2xl px-2.5 sm:px-5 py-5 sm:py-6 flex flex-col items-center justify-center text-center shadow-[0_0_20px_rgba(88,212,242,0.14),0_8px_22px_rgba(255,46,147,0.12)] hover:shadow-[0_0_26px_rgba(88,212,242,0.24),0_8px_26px_rgba(255,46,147,0.2)] transition-all duration-200">
              <div
                className="pointer-events-none absolute top-0 inset-x-4 h-[1px] bg-gradient-to-r from-[#58D4F2]/50 via-[#FF4DA6]/75 to-[#FF8C42]/50"
                aria-hidden="true"
              />
              <div className="mb-3 text-[#58D4F2] drop-shadow-[0_0_10px_rgba(88,212,242,0.75)]">
                <svg viewBox="0 0 48 48" fill="none" className="w-11 h-11 sm:w-12 sm:h-12" aria-hidden="true">
                  <path
                    d="M16 19L19.2 9.5C19.6 8.3 20.9 7.8 22 8.2L24 9L26 8.2C27.1 7.8 28.4 8.3 28.8 9.5L32 19H16Z"
                    fill="currentColor"
                  />
                  <path d="M8 20.5C14 18.2 34 18.2 40 20.5C35 23 13 23 8 20.5Z" fill="currentColor" />
                  <circle cx="17.5" cy="28" r="5" fill="currentColor" />
                  <circle cx="30.5" cy="28" r="5" fill="currentColor" />
                  <path d="M22.2 27.2H25.8" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
                  <path d="M11 41C12.2 36.2 17.5 34.5 24 34.5C30.5 34.5 35.8 36.2 37 41H11Z" fill="currentColor" />
                </svg>
              </div>
              <p className="text-[14px] sm:text-[17px] font-extrabold text-white leading-snug">
                Ideal para perfis
                <br />
                anônimos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4-STEP TIMELINE SECTION */}
      <section className="py-6 sm:py-10 px-2 sm:px-4 bg-transparent relative overflow-hidden">
        <div
          className="pointer-events-none absolute top-0 inset-x-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(88,212,242,0.34)_35%,rgba(168,85,247,0.32)_58%,rgba(255,46,147,0.26)_78%,transparent_100%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_45%,rgba(14,165,233,0.10)_0%,transparent_72%),radial-gradient(ellipse_60%_50%_at_50%_72%,rgba(168,85,247,0.08)_0%,rgba(255,46,147,0.05)_50%,transparent_76%)]"
          aria-hidden="true"
        />

        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[28px] min-[390px]:text-[34px] sm:text-[38px] md:text-[44px] font-[800] text-center tracking-[-0.02em] leading-[1.08] text-white px-1">
            Quem Cresce Hoje Não Cria do Zero. Eles
            <span className="block gradient-blue-text mt-0.5">Reaproveitam Vídeos Que Já Viralizaram.</span>
          </h2>
          <p className="mt-2.5 sm:mt-3.5 text-[17px] sm:text-xl md:text-[22px] font-semibold text-neutral-100 text-center">
            O jogo é volume, não perfeição.
          </p>

          <div className="mt-6 sm:mt-8 max-w-[480px] sm:max-w-[560px] mx-auto flex flex-col px-1 sm:px-0">
            {/* Step 1 */}
            <div className="relative">
              <div
                className="absolute left-[50px] sm:left-[63px] -translate-x-1/2 top-[100px] sm:top-[126px] bottom-[-22px] sm:bottom-[-26px] w-[4px] z-10 pointer-events-none bg-gradient-to-b from-[#58D4F2] to-[#A855F7]"
                aria-hidden="true"
              />
              <div className="flex items-center mb-[22px] sm:mb-[26px]">
                <div className="relative z-20 shrink-0 w-[100px] h-[100px] sm:w-[126px] sm:h-[126px] rounded-full bg-[radial-gradient(circle_at_center,rgba(88,212,242,0.22)_0%,#030710_72%)] border-2 flex items-center justify-center border-[#58D4F2] shadow-[0_0_22px_rgba(88,212,242,0.26)]">
                  <svg viewBox="5 3 38 40" fill="none" className="w-[58px] h-[58px] sm:w-[74px] sm:h-[74px] text-[#58D4F2]" aria-hidden="true">
                    <path
                      d="M9 17.5L38 11.5L36.2 6.8C35.8 5.6 34.5 4.9 33.3 5.2L9.8 10.1C8.5 10.4 7.7 11.6 8 12.9L9 17.5Z"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15 9.1L17.5 15.5M23 7.4L25.5 13.8M31 5.7L33.2 12.1"
                      stroke="currentColor"
                      strokeWidth="2.3"
                      strokeLinecap="round"
                    />
                    <rect
                      x="9"
                      y="18"
                      width="30"
                      height="22"
                      rx="3.5"
                      fill="currentColor"
                      fillOpacity="0.16"
                      stroke="currentColor"
                      strokeWidth="2.4"
                    />
                    <path d="M21 24.2L29.5 29L21 33.8V24.2Z" fill="currentColor" />
                  </svg>
                  <span
                    className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-white border-2 border-[#58D4F2]"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-1 -ml-8 sm:-ml-10 pl-11 sm:pl-14 pr-4 sm:pr-7 min-h-[86px] sm:min-h-[104px] py-3 rounded-r-full border border-l-0 bg-gradient-to-r from-[#091E32] via-[#0A1022] to-[#050A14] flex items-center border-[#58D4F2]/50">
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[40px] sm:text-[52px] font-[800] leading-none text-[#58D4F2] w-7 sm:w-10 text-center shrink-0">
                    1
                  </span>
                  <div
                    className="w-[1px] h-12 sm:h-14 bg-gradient-to-b from-[#58D4F2]/50 via-[#A855F7]/40 to-[#FF2E93]/40 mx-3.5 sm:mx-5 shrink-0"
                    aria-hidden="true"
                  />
                  <div className="text-left leading-[1.2] text-[16px] sm:text-[19px]">
                    <div className="font-bold text-white">Escolha um</div>
                    <div className="font-semibold text-[#58D4F2]">vídeo pronto</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div
                className="absolute left-[50px] sm:left-[63px] -translate-x-1/2 top-[100px] sm:top-[126px] bottom-[-22px] sm:bottom-[-26px] w-[4px] z-10 pointer-events-none bg-gradient-to-b from-[#A855F7] to-[#FF2E93]"
                aria-hidden="true"
              />
              <div className="flex items-center mb-[22px] sm:mb-[26px]">
                <div className="relative z-20 shrink-0 w-[100px] h-[100px] sm:w-[126px] sm:h-[126px] rounded-full bg-[radial-gradient(circle_at_center,rgba(88,212,242,0.22)_0%,#030710_72%)] border-2 flex items-center justify-center border-[#A855F7] shadow-[0_0_22px_rgba(168,85,247,0.28)]">
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[#58D4F2]">
                    <svg viewBox="4.5 2 16.5 19" fill="none" className="w-[34px] h-[38px] sm:w-[44px] sm:h-[48px]" aria-hidden="true">
                      <path
                        d="M14.5 3.5V14.8C14.5 17.1 12.6 19 10.3 19C8 19 6.1 17.1 6.1 14.8C6.1 12.6 7.8 10.8 10 10.6V13.4C9.2 13.6 8.7 14.1 8.7 14.8C8.7 15.7 9.4 16.4 10.3 16.4C11.2 16.4 11.9 15.7 11.9 14.8V3.5H14.5ZM14.5 3.5C15.1 5.8 16.9 7.6 19.2 8V10.7C17.4 10.6 15.8 9.9 14.5 8.8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <svg viewBox="2 2 20 20" fill="none" className="w-[36px] h-[36px] sm:w-[46px] sm:h-[46px]" aria-hidden="true">
                      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="2.1" />
                      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2.1" />
                      <circle cx="17.2" cy="6.8" r="1.15" fill="currentColor" />
                    </svg>
                  </div>
                  <span
                    className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-white border-2 border-[#A855F7]"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-1 -ml-8 sm:-ml-10 pl-11 sm:pl-14 pr-4 sm:pr-7 min-h-[86px] sm:min-h-[104px] py-3 rounded-r-full border border-l-0 bg-gradient-to-r from-[#091E32] via-[#0A1022] to-[#050A14] flex items-center border-[#A855F7]/50">
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[40px] sm:text-[52px] font-[800] leading-none text-[#58D4F2] w-7 sm:w-10 text-center shrink-0">
                    2
                  </span>
                  <div
                    className="w-[1px] h-12 sm:h-14 bg-gradient-to-b from-[#58D4F2]/50 via-[#A855F7]/40 to-[#FF2E93]/40 mx-3.5 sm:mx-5 shrink-0"
                    aria-hidden="true"
                  />
                  <div className="text-left leading-[1.2] text-[16px] sm:text-[19px]">
                    <div className="font-bold text-white">Poste no</div>
                    <div className="font-semibold text-[#58D4F2]">
                      TikTok ou
                      <br />
                      Instagram
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div
                className="absolute left-[50px] sm:left-[63px] -translate-x-1/2 top-[100px] sm:top-[126px] bottom-[-22px] sm:bottom-[-26px] w-[4px] z-10 pointer-events-none bg-gradient-to-b from-[#FF2E93] to-[#58D4F2]"
                aria-hidden="true"
              />
              <div className="flex items-center mb-[22px] sm:mb-[26px]">
                <div className="relative z-20 shrink-0 w-[100px] h-[100px] sm:w-[126px] sm:h-[126px] rounded-full bg-[radial-gradient(circle_at_center,rgba(88,212,242,0.22)_0%,#030710_72%)] border-2 flex items-center justify-center border-[#FF4DA6] shadow-[0_0_22px_rgba(255,46,147,0.26)]">
                  <svg viewBox="8 8 32 32" fill="none" className="w-[56px] h-[56px] sm:w-[70px] sm:h-[70px] text-[#58D4F2]" aria-hidden="true">
                    <path
                      d="M12.5 22.5C13.2 16.1 18.6 11.2 25.2 11.2C29.8 11.2 33.9 13.6 36.1 17.3"
                      stroke="currentColor"
                      strokeWidth="3.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M37.4 11.8L37.4 18.8L30.4 18.8"
                      stroke="currentColor"
                      strokeWidth="3.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M35.5 25.5C34.8 31.9 29.4 36.8 22.8 36.8C18.2 36.8 14.1 34.4 11.9 30.7"
                      stroke="currentColor"
                      strokeWidth="3.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M10.6 36.2L10.6 29.2L17.6 29.2"
                      stroke="currentColor"
                      strokeWidth="3.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-white border-2 border-[#FF4DA6]"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-1 -ml-8 sm:-ml-10 pl-11 sm:pl-14 pr-4 sm:pr-7 min-h-[86px] sm:min-h-[104px] py-3 rounded-r-full border border-l-0 bg-gradient-to-r from-[#091E32] via-[#0A1022] to-[#050A14] flex items-center border-[#FF4DA6]/45">
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[40px] sm:text-[52px] font-[800] leading-none text-[#58D4F2] w-7 sm:w-10 text-center shrink-0">
                    3
                  </span>
                  <div
                    className="w-[1px] h-12 sm:h-14 bg-gradient-to-b from-[#58D4F2]/50 via-[#A855F7]/40 to-[#FF2E93]/40 mx-3.5 sm:mx-5 shrink-0"
                    aria-hidden="true"
                  />
                  <div className="text-left leading-[1.2] text-[16px] sm:text-[19px]">
                    <div className="font-bold text-white">Repita esse</div>
                    <div className="font-semibold text-[#58D4F2]">
                      processo todos
                      <br />
                      os dias
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <div className="flex items-center">
                <div className="relative z-20 shrink-0 w-[100px] h-[100px] sm:w-[126px] sm:h-[126px] rounded-full bg-[radial-gradient(circle_at_center,rgba(88,212,242,0.22)_0%,#030710_72%)] border-2 flex items-center justify-center border-[#58D4F2] shadow-[0_0_22px_rgba(88,212,242,0.26)]">
                  <svg viewBox="6 6 36 35" fill="none" className="w-[56px] h-[56px] sm:w-[70px] sm:h-[70px] text-[#58D4F2]" aria-hidden="true">
                    <rect x="9" y="29" width="6.5" height="9" rx="1.5" fill="currentColor" fillOpacity="0.9" />
                    <rect x="20.5" y="24" width="6.5" height="14" rx="1.5" fill="currentColor" fillOpacity="0.95" />
                    <rect x="32" y="18.5" width="6.5" height="19.5" rx="1.5" fill="currentColor" />
                    <path d="M10 22.5C18.5 20.8 26.5 16.8 34.5 9.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    <path d="M29 8.8H35.5V15.3" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span
                    className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-white border-2 border-[#58D4F2]"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-1 -ml-8 sm:-ml-10 pl-11 sm:pl-14 pr-4 sm:pr-7 min-h-[86px] sm:min-h-[104px] py-3 rounded-r-full border border-l-0 bg-gradient-to-r from-[#091E32] via-[#0A1022] to-[#050A14] flex items-center border-[#58D4F2]/50">
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[40px] sm:text-[52px] font-[800] leading-none text-[#58D4F2] w-7 sm:w-10 text-center shrink-0">
                    4
                  </span>
                  <div
                    className="w-[1px] h-12 sm:h-14 bg-gradient-to-b from-[#58D4F2]/50 via-[#A855F7]/40 to-[#FF2E93]/40 mx-3.5 sm:mx-5 shrink-0"
                    aria-hidden="true"
                  />
                  <div className="text-left leading-[1.2] text-[16px] sm:text-[19px]">
                    <div className="font-bold text-white">Veja seu</div>
                    <div className="font-semibold text-[#58D4F2]">perfil crescer!</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 100.000 CORTES PRONTOS NICHE GRID */}
      <section className="py-6 sm:py-10 px-[4px] sm:px-4 bg-transparent relative overflow-hidden">
        <div
          className="pointer-events-none absolute top-0 inset-x-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(88,212,242,0.38)_30%,rgba(255,46,147,0.34)_56%,rgba(255,107,53,0.30)_76%,transparent_100%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_78%_52%_at_50%_38%,rgba(14,165,233,0.10)_0%,transparent_72%),radial-gradient(ellipse_60%_45%_at_22%_68%,rgba(147,51,234,0.08)_0%,transparent_70%),radial-gradient(ellipse_55%_42%_at_80%_64%,rgba(255,107,53,0.06)_0%,transparent_72%)]"
          aria-hidden="true"
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[30px] min-[390px]:text-[36px] sm:text-[42px] font-[800] text-center tracking-[-0.02em] leading-[1.08] mb-4 sm:mb-7 text-white px-1">
            <span className="gradient-blue-text">100.000 CORTES PRONTOS </span>PARA POSTAR
          </h2>

          <div className="grid grid-cols-3 gap-[5px] sm:gap-4 md:gap-5 items-stretch">
            {NICHE_CARDS.map((card, idx) => {
              const style = NICHE_CARD_STYLES[card.variant];
              return (
                <div
                  key={idx}
                  className={`relative bg-[linear-gradient(180deg,rgba(8,18,36,0.92)_0%,rgba(8,10,24,0.90)_100%)] border rounded-xl sm:rounded-2xl overflow-hidden flex flex-col text-center transition-all duration-200 group ${style.card} ${
                    card.centered ? 'col-start-2' : ''
                  }`}
                >
                  <div
                    className={`pointer-events-none absolute top-0 inset-x-3 h-[1px] ${style.topLine} z-10`}
                    aria-hidden="true"
                  />
                  <div className="w-full aspect-[400/218] overflow-hidden bg-[#060B16] border-b border-[#58D4F2]/25">
                    <img
                      alt={card.caption || 'E muito mais'}
                      width={400}
                      height={218}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      src={card.image}
                    />
                  </div>
                  <div className="p-[5px] sm:p-3.5 md:p-4 flex-1 flex items-center justify-center text-center">
                    <p className="text-[9.5px] min-[390px]:text-[10px] sm:text-xs md:text-[14px] font-medium text-neutral-100 leading-[1.24] sm:leading-snug">
                      {card.caption}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BONUS CARDS SECTION */}
      <section className="py-6 sm:py-9 px-3 sm:px-4 bg-transparent relative overflow-hidden">
        <div
          className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#58D4F2]/40 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_18%,rgba(147,51,234,0.12)_0%,rgba(255,46,147,0.06)_42%,transparent_75%)]"
          aria-hidden="true"
        />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-[28px] min-[390px]:text-[32px] sm:text-[42px] font-[900] text-[#EF4444] tracking-tight mb-2 uppercase">
              ⚠️ ATENÇÃO!
            </h3>
            <h4 className="font-['Plus_Jakarta_Sans',sans-serif] text-[18px] min-[390px]:text-[20px] sm:text-[26px] font-[800] tracking-tight leading-[1.3] text-white max-w-3xl mx-auto px-2">
              VEJA O <span className="gradient-blue-text">BÔNUS</span> QUE VOCÊ VAI RECEBER COMPRANDO ESSE PACK!
            </h4>
          </div>

          {/* Bonus 1: GTA 6 */}
          <div className="relative rounded-3xl overflow-hidden border border-[#58D4F2]/40 bg-[#070D19]/95 shadow-[0_20px_55px_rgba(0,0,0,0.65)]">
            <div
              className="pointer-events-none absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#58D4F2] via-[#FF2E93] to-[#FFD60A] z-20"
              aria-hidden="true"
            />
            <div className="relative z-10 p-4 sm:p-6 md:p-8">
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#FFD60A] via-[#FACC15] to-[#FF9F1C] text-[#050912] font-[900] text-xs sm:text-sm uppercase tracking-[0.14em] shadow-[0_4px_18px_rgba(250,204,21,0.3)]">
                  <Flame className="w-4 h-4 fill-[#050912] shrink-0" aria-hidden="true" />
                  <span>BÔNUS EXCLUSIVO</span>
                </div>
              </div>

              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-[800] text-[22px] min-[390px]:text-[26px] sm:text-[34px] md:text-[38px] leading-[1.1] tracking-[-0.02em] text-white text-center max-w-4xl mx-auto text-balance">
                <span className="bg-[linear-gradient(135deg,#FFD60A_0%,#FF6B35_36%,#FF2E93_72%,#A855F7_100%)] bg-clip-text text-transparent font-[900]">
                  GTA 6
                </span>{' '}
                VAI PARAR A INTERNET.{' '}
                <span className="gradient-blue-text drop-shadow-[0_0_20px_rgba(88,212,242,0.4)]">
                  VOCÊ ESTÁ PREPARADO?
                </span>
              </h2>

              <div className="mt-4 sm:mt-6 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-center">
                <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
                  <div
                    className="pointer-events-none absolute inset-2 rounded-full bg-[radial-gradient(circle,rgba(88,212,242,0.20)_0%,rgba(255,46,147,0.12)_52%,transparent_74%)]"
                    aria-hidden="true"
                  />
                  <img
                    alt="Personagem Pack Viral segurando arte do GTA 6 com faixa Bônus Exclusivo"
                    width={720}
                    height={480}
                    loading="eager"
                    decoding="async"
                    className="relative z-10 w-[80%] max-w-[280px] sm:max-w-[340px] lg:max-w-full h-auto object-contain select-none drop-shadow-[0_12px_24px_rgba(0,0,0,0.75)]"
                    draggable={false}
                    src="/assets/aistudio/packviral-gta6-bonus_7e394304.webp"
                  />
                </div>

                <div className="lg:col-span-7 space-y-3.5 text-left">
                  <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[17px] sm:text-[20px] font-[800] text-[#58D4F2]">
                    Pensa comigo...
                  </p>
                  <p className="text-[15px] sm:text-[17px] text-neutral-100 leading-[1.6]">
                    Um dos jogos <strong className="text-white font-bold">mais aguardados do mundo</strong> está
                    chegando. <strong className="text-white font-bold">Milhões de pessoas</strong> vão procurar vídeos,
                    novidades, curiosidades e cortes sobre GTA 6.
                  </p>
                  <div className="rounded-2xl bg-[linear-gradient(135deg,rgba(88,212,242,0.12)_0%,rgba(147,51,234,0.14)_55%,rgba(255,46,147,0.12)_100%)] border border-[#58D4F2]/45 p-3.5 sm:p-4">
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[15px] sm:text-[17.5px] font-[800] text-white leading-[1.4]">
                      E enquanto todo mundo estiver procurando esses vídeos, você pode estar{' '}
                      <span className="text-[#58D4F2]">publicando os seus!</span>
                    </p>
                  </div>
                  <div className="rounded-2xl bg-[#050912]/85 border border-[#FF4DA6]/45 p-3.5 sm:p-4.5 text-center">
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[22px] sm:text-[30px] font-[900] leading-tight tracking-tight tabular-nums bg-[linear-gradient(90deg,#FFD60A_0%,#FF6B35_48%,#FF2E93_100%)] bg-clip-text text-transparent">
                      +3.500 CORTES VIRAIS DO GTA 6!
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 sm:mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={scrollToOffer}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#05D321] hover:bg-[#04b81c] text-white font-[900] text-[15px] sm:text-base uppercase tracking-wider shadow-[0_0_24px_rgba(5,211,33,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>QUERO GARANTIR MEU ACESSO</span>
                  <ArrowDown className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {/* Bonus 2: Frutinhas Falantes */}
          <div className="relative rounded-3xl overflow-hidden border border-[#58D4F2]/40 bg-[#070D19]/95 shadow-[0_20px_55px_rgba(0,0,0,0.65)] mt-5 sm:mt-7">
            <div
              className="pointer-events-none absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#58D4F2] via-[#A855F7] to-[#FFD60A] z-20"
              aria-hidden="true"
            />
            <div className="relative z-10 p-4 sm:p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-center gap-2 mb-3 sm:mb-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#FFD60A] via-[#FACC15] to-[#FF9F1C] text-[#050912] font-[900] text-xs sm:text-sm uppercase tracking-[0.14em] shadow-[0_4px_18px_rgba(250,204,21,0.3)]">
                  <Flame className="w-4 h-4 fill-[#050912] shrink-0" aria-hidden="true" />
                  <span>BÔNUS GRÁTIS</span>
                </div>
              </div>

              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-[800] text-[22px] min-[390px]:text-[25px] sm:text-[32px] md:text-[36px] leading-[1.12] tracking-[-0.02em] text-white text-center max-w-4xl mx-auto text-balance">
                <span className="text-[#FFD60A] font-[900]">BÔNUS EXCLUSIVO:</span>{' '}
                <span className="gradient-blue-text drop-shadow-[0_0_20px_rgba(88,212,242,0.4)]">
                  PACK DE FRUTINHAS FALANTES
                </span>
              </h2>

              <div className="mt-4 sm:mt-6 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-center">
                <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
                  <div
                    className="pointer-events-none absolute inset-2 rounded-full bg-[radial-gradient(circle,rgba(88,212,242,0.20)_0%,rgba(250,204,21,0.10)_52%,transparent_74%)]"
                    aria-hidden="true"
                  />
                  <div className="relative z-10 w-full rounded-2xl overflow-hidden bg-[#000000] border border-[#58D4F2]/45 p-1.5 sm:p-2 shadow-[0_12px_30px_rgba(0,0,0,0.75)]">
                    <img
                      alt="Pack Frutinhas Virais - +50.000 vídeos de frutinhas falantes prontos para postar"
                      width={800}
                      height={453}
                      loading="eager"
                      decoding="async"
                      className="w-full h-auto rounded-xl object-contain select-none"
                      draggable={false}
                      src="/assets/aistudio/banner-frutinhas-virais_19abeb29.webp"
                    />
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-3.5 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#05D321]/15 border border-[#05D321]/50 text-[#4EE949] font-[800] text-xs uppercase tracking-wider">
                    <span>🎁 BÔNUS GRÁTIS AO ADQUIRIR O PACK VIRAL</span>
                  </div>
                  <p className="text-[15px] sm:text-[17px] text-neutral-100 leading-[1.6]">
                    Receba também um pack exclusivo com{' '}
                    <strong className="text-white font-bold">50.000 vídeos de frutinhas falantes</strong>, prontos para
                    publicar no <strong className="text-white font-bold">TikTok, Instagram Reels e YouTube Shorts</strong>,
                    sem precisar criar ou editar do zero.
                  </p>
                  <div className="rounded-2xl bg-[linear-gradient(135deg,rgba(88,212,242,0.12)_0%,rgba(147,51,234,0.14)_55%,rgba(255,46,147,0.12)_100%)] border border-[#58D4F2]/45 p-3.5 sm:p-4">
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[15px] sm:text-[17px] font-[800] text-white leading-[1.4]">
                      Você leva esse pacote completo como <span className="text-[#4EE949]">BÔNUS GRÁTIS</span> garantindo
                      seu acesso hoje ao Pack Viral!
                    </p>
                  </div>
                  <div className="rounded-2xl bg-[#050912]/85 border border-[#58D4F2]/45 p-3.5 sm:p-4 text-center">
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[20px] sm:text-[26px] font-[900] leading-tight tracking-tight tabular-nums bg-[linear-gradient(90deg,#FFD60A_0%,#58D4F2_52%,#4EE949_100%)] bg-clip-text text-transparent">
                      +50.000 VÍDEOS DE FRUTINHAS FALANTES!
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 sm:mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={scrollToOffer}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#05D321] hover:bg-[#04b81c] text-white font-[900] text-[15px] sm:text-base uppercase tracking-wider shadow-[0_0_24px_rgba(5,211,33,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>QUERO GARANTIR MEU ACESSO</span>
                  <ArrowDown className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O ACESSO É SIMPLES SECTION */}
      <section className="py-6 sm:py-10 px-2 sm:px-4 bg-transparent relative overflow-hidden">
        <div
          className="pointer-events-none absolute top-0 inset-x-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(88,212,242,0.36)_35%,rgba(168,85,247,0.34)_60%,rgba(255,46,147,0.28)_80%,transparent_100%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_40%_at_50%_20%,rgba(14,165,233,0.09)_0%,transparent_72%),radial-gradient(ellipse_80%_46%_at_50%_82%,rgba(147,51,234,0.10)_0%,rgba(255,46,147,0.06)_52%,transparent_76%)]"
          aria-hidden="true"
        />

        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[32px] min-[390px]:text-[38px] sm:text-[42px] font-[800] text-center tracking-[-0.02em] leading-[1.08] mb-5 sm:mb-7 text-white">
            O Acesso é <span className="gradient-blue-text">Simples:</span>
          </h2>

          <div className="max-w-2xl mx-auto space-y-4 sm:space-y-5 mb-6 sm:mb-9 px-1">
            <div className="flex items-start gap-3.5 sm:gap-4 text-left">
              <div className="mt-1 shrink-0 text-[#58D4F2]">
                <Layers className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true" />
              </div>
              <p className="text-[15.5px] sm:text-[17px] text-neutral-100 leading-relaxed">
                Você terá acesso ao pacote Premium com{' '}
                <strong className="text-white font-bold">+100mil cortes virais</strong> através de uma área de membros
                premium, <strong className="text-white font-bold">organizada por nicho</strong>. O link de acesso é
                enviado imediatamente no{' '}
                <strong className="text-white font-bold">
                  e-mail cadastrado na compra e também no seu WhatsApp.
                </strong>
              </p>
            </div>

            <div className="flex items-start gap-3.5 sm:gap-4 text-left">
              <div className="mt-1 shrink-0 text-[#58D4F2]">
                <CloudDownload className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true" />
              </div>
              <p className="text-[15.5px] sm:text-[17px] text-neutral-100 leading-relaxed">
                Você terá acesso a um pacote com os melhores cortes do momento, prontos para utilizar nas principais
                plataformas, como: <strong className="text-white font-bold">TikTok, Instagram, YouTube, Kwai,</strong>{' '}
                etc. Basta baixar e postar!
              </p>
            </div>

            <div className="flex items-start gap-3.5 sm:gap-4 text-left">
              <div className="mt-1 shrink-0 text-[#58D4F2]">
                <CircleCheck className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true" />
              </div>
              <p className="text-[15.5px] sm:text-[17px] text-neutral-100 leading-relaxed">
                São vídeos de alta conversão, <strong className="text-white font-bold">testados e aprovados!</strong>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4">
            <div className="relative overflow-hidden bg-[linear-gradient(165deg,rgba(7,13,25,0.94)_0%,rgba(9,10,24,0.94)_100%)] rounded-2xl px-3 py-5 sm:py-6 flex flex-col items-center justify-center text-center transition-all duration-200 border border-[#58D4F2]/75 hover:border-[#58D4F2] shadow-[0_0_18px_rgba(88,212,242,0.18)] hover:shadow-[0_0_26px_rgba(88,212,242,0.32)]">
              <div
                className="pointer-events-none absolute top-0 inset-x-3 h-[1px] bg-gradient-to-r from-transparent via-[#58D4F2]/80 to-transparent"
                aria-hidden="true"
              />
              <div className="mb-3 text-[#58D4F2]">
                <VideoOff className="w-9 h-9 sm:w-10 sm:h-10" strokeWidth={2.2} aria-hidden="true" />
              </div>
              <p className="text-[14px] sm:text-[15px] font-extrabold text-white leading-snug">Não precisa aparecer</p>
            </div>

            <div className="relative overflow-hidden bg-[linear-gradient(165deg,rgba(7,13,25,0.94)_0%,rgba(9,10,24,0.94)_100%)] rounded-2xl px-3 py-5 sm:py-6 flex flex-col items-center justify-center text-center transition-all duration-200 border border-[#58D4F2]/60 hover:border-[#A855F7] shadow-[0_0_18px_rgba(88,212,242,0.14),0_6px_20px_rgba(168,85,247,0.14)] hover:shadow-[0_0_26px_rgba(168,85,247,0.28)]">
              <div
                className="pointer-events-none absolute top-0 inset-x-3 h-[1px] bg-gradient-to-r from-transparent via-[#A855F7]/75 to-transparent"
                aria-hidden="true"
              />
              <div className="mb-3 text-[#58D4F2]">
                <SquarePen className="w-9 h-9 sm:w-10 sm:h-10" strokeWidth={2.2} aria-hidden="true" />
              </div>
              <p className="text-[14px] sm:text-[15px] font-extrabold text-white leading-snug">Não precisa editar</p>
            </div>

            <div className="relative overflow-hidden bg-[linear-gradient(165deg,rgba(7,13,25,0.94)_0%,rgba(9,10,24,0.94)_100%)] rounded-2xl px-3 py-5 sm:py-6 flex flex-col items-center justify-center text-center transition-all duration-200 border border-[#58D4F2]/55 hover:border-[#FF4DA6] shadow-[0_0_18px_rgba(88,212,242,0.14),0_6px_20px_rgba(255,46,147,0.12)] hover:shadow-[0_0_26px_rgba(255,46,147,0.26)]">
              <div
                className="pointer-events-none absolute top-0 inset-x-3 h-[1px] bg-gradient-to-r from-transparent via-[#FF4DA6]/75 to-transparent"
                aria-hidden="true"
              />
              <div className="mb-3 text-[#58D4F2]">
                <Award className="w-9 h-9 sm:w-10 sm:h-10" strokeWidth={2.2} aria-hidden="true" />
              </div>
              <p className="text-[14px] sm:text-[15px] font-extrabold text-white leading-snug">
                Não precisa ter experiência
              </p>
            </div>

            <div className="relative overflow-hidden bg-[linear-gradient(165deg,rgba(7,13,25,0.94)_0%,rgba(9,10,24,0.94)_100%)] rounded-2xl px-3 py-5 sm:py-6 flex flex-col items-center justify-center text-center transition-all duration-200 border border-[#58D4F2]/60 hover:border-[#A855F7] shadow-[0_0_18px_rgba(88,212,242,0.14),0_6px_20px_rgba(168,85,247,0.14)] hover:shadow-[0_0_26px_rgba(168,85,247,0.28)]">
              <div
                className="pointer-events-none absolute top-0 inset-x-3 h-[1px] bg-gradient-to-r from-transparent via-[#A855F7]/75 to-transparent"
                aria-hidden="true"
              />
              <div className="mb-3 text-[#58D4F2]">
                <Check className="w-9 h-9 sm:w-10 sm:h-10" strokeWidth={2.2} aria-hidden="true" />
              </div>
              <p className="text-[14px] sm:text-[15px] font-extrabold text-white leading-snug">Conteúdo validado</p>
            </div>

            <div className="relative overflow-hidden bg-[linear-gradient(165deg,rgba(7,13,25,0.94)_0%,rgba(9,10,24,0.94)_100%)] rounded-2xl px-3 py-5 sm:py-6 flex flex-col items-center justify-center text-center transition-all duration-200 border border-[#58D4F2]/55 hover:border-[#FF4DA6] shadow-[0_0_18px_rgba(88,212,242,0.14),0_6px_20px_rgba(255,46,147,0.12)] hover:shadow-[0_0_26px_rgba(255,46,147,0.26)] col-span-2 sm:col-span-1">
              <div
                className="pointer-events-none absolute top-0 inset-x-3 h-[1px] bg-gradient-to-r from-transparent via-[#FF4DA6]/75 to-transparent"
                aria-hidden="true"
              />
              <div className="mb-3 text-[#58D4F2]">
                <Flame className="w-9 h-9 sm:w-10 sm:h-10" strokeWidth={2.2} aria-hidden="true" />
              </div>
              <p className="text-[14px] sm:text-[15px] font-extrabold text-white leading-snug">
                Alta chance de viralização
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PARA QUEM É O PACKVIRAL */}
      <section className="py-6 sm:py-8 px-3 sm:px-4 bg-transparent relative overflow-hidden">
        <div
          className="pointer-events-none absolute top-0 inset-x-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(88,212,242,0.34)_35%,rgba(168,85,247,0.32)_62%,transparent_100%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_46%,rgba(14,165,233,0.09)_0%,rgba(147,51,234,0.07)_46%,transparent_76%)]"
          aria-hidden="true"
        />

        <div className="max-w-2xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center mb-5 sm:mb-6">
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[22px] min-[390px]:text-[26px] sm:text-[32px] md:text-[36px] font-[800] text-white tracking-wide uppercase leading-tight">
              PARA QUEM É O
            </h2>
            <div className="mt-2 flex items-center justify-center">
              <img
                alt="Pack Viral"
                width={384}
                height={256}
                loading="eager"
                decoding="async"
                className="w-52 min-[390px]:w-60 sm:w-68 md:w-76 max-w-full h-auto object-contain select-none"
                draggable={false}
                src="/assets/aistudio/logo-packviral-personagem_7706549a.webp"
              />
            </div>
          </div>

          <div className="max-w-[580px] mx-auto flex flex-col gap-2.5 sm:gap-3 px-1 sm:px-0">
            {TARGET_AUDIENCE_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="relative flex items-center gap-3 p-3.5 sm:p-4 rounded-xl bg-[linear-gradient(135deg,rgba(7,13,25,0.96)_0%,rgba(11,16,34,0.95)_100%)] border border-[#58D4F2]/30 hover:border-[#58D4F2]/70 transition-all duration-200 shadow-sm"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#05D321]/15 border border-[#05D321]/40 flex items-center justify-center shrink-0 text-[#05D321]">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={3} aria-hidden="true" />
                </div>
                <p className="flex-1 text-[14.5px] min-[390px]:text-[15.5px] sm:text-[16.5px] text-neutral-100 font-semibold leading-[1.4]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STUDENT RESULTS SECTION */}
      <section className="py-6 sm:py-9 px-2 sm:px-4 bg-transparent relative overflow-hidden">
        <div
          className="pointer-events-none absolute top-0 inset-x-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(88,212,242,0.36)_35%,rgba(255,46,147,0.32)_62%,transparent_100%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_40%_50%,rgba(14,165,233,0.09)_0%,transparent_72%),radial-gradient(ellipse_55%_45%_at_72%_55%,rgba(168,85,247,0.07)_0%,rgba(255,107,53,0.04)_52%,transparent_74%)]"
          aria-hidden="true"
        />

        <div className="w-full mx-auto text-center flex flex-col items-center relative z-10">
          <div className="w-full max-w-4xl px-0 sm:px-2">
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[26px] min-[390px]:text-[32px] sm:text-[40px] font-[800] text-white tracking-[-0.02em] leading-[1.1] mb-1.5 flex items-center justify-center gap-1.5 sm:gap-3 px-2">
              <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 text-[#58D4F2] shrink-0 animate-arrow-bounce" aria-hidden="true" />
              <span className="min-w-0">Resultado do primeiro mês usando esse Pack</span>
              <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 text-[#58D4F2] shrink-0 animate-arrow-bounce" aria-hidden="true" />
            </h2>
            <p className="text-sm sm:text-base font-medium text-neutral-200 mb-1">Três dos nossos alunos</p>
            <p className="text-sm sm:text-base font-semibold text-white mb-4 flex items-center justify-center gap-1.5">
              <span>Arraste para o lado</span>
              <ArrowRight className="w-4 h-4 text-[#58D4F2] shrink-0" aria-hidden="true" />
            </p>

            <div className="relative flex sm:grid sm:grid-cols-3 gap-3 sm:gap-5 items-center sm:items-stretch overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-2 sm:pb-0 -mx-2 px-2 sm:mx-0 sm:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {STUDENT_RESULTS.map((result, idx) => (
                <div
                  key={idx}
                  className={`bg-[#080E1A] rounded-2xl overflow-hidden shadow-2xl transition-all duration-200 w-[90%] sm:w-full shrink-0 sm:shrink snap-center border ${RESULT_CARD_STYLES[result.accent]}`}
                >
                  <img
                    alt={result.alt}
                    width={900}
                    height={502}
                    loading="eager"
                    decoding="async"
                    className="w-full h-auto block object-contain select-none"
                    draggable={false}
                    src={result.image}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS CAROUSEL SECTION */}
      <section className="py-6 sm:py-9 px-2 sm:px-4 bg-transparent relative overflow-hidden">
        <div
          className="pointer-events-none absolute top-0 inset-x-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(88,212,242,0.34)_35%,rgba(168,85,247,0.32)_60%,rgba(255,46,147,0.26)_80%,transparent_100%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_52%,rgba(14,165,233,0.09)_0%,rgba(147,51,234,0.07)_48%,transparent_76%)]"
          aria-hidden="true"
        />

        <div className="w-full max-w-md mx-auto text-center relative z-10">
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[30px] min-[390px]:text-[36px] sm:text-[40px] font-[800] text-white tracking-[-0.02em] leading-[1.1] mb-4">
            Quem adquiriu, <span className="gradient-blue-text">gostou</span> ❤️
          </h2>

          <div
            className="relative w-full sm:max-w-[420px] mx-auto px-3 sm:px-0"
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const diff = touchStartX.current - e.changedTouches[0].clientX;
              if (diff > 40) handleNextTestimonial();
              if (diff < -40) handlePrevTestimonial();
              touchStartX.current = null;
            }}
          >
            <div className="overflow-hidden rounded-2xl bg-[#080E1A] border-2 border-[#58D4F2] shadow-[0_0_26px_rgba(88,212,242,0.22),0_10px_32px_rgba(168,85,247,0.16)]">
              <div
                className={`flex transition-transform duration-500 ease-out ${TESTIMONIAL_TRANSLATE_CLASSES[testimonialIndex]}`}
              >
                {TESTIMONIAL_SLIDES.map((slide, idx) => (
                  <div key={idx} className="w-full shrink-0">
                    <img
                      alt={slide.alt}
                      width={677}
                      height={682}
                      loading="eager"
                      decoding="async"
                      className="w-full h-auto block object-contain select-none"
                      draggable={false}
                      src={slide.image}
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handlePrevTestimonial}
              aria-label="Depoimento anterior"
              className="absolute left-0 sm:-left-5 top-1/2 -translate-y-1/2 z-20 bg-black/90 hover:bg-[#112238] text-white p-2 sm:p-2.5 rounded-full border border-[#58D4F2]/70 hover:border-[#A855F7] transition-all cursor-pointer shadow-xl active:scale-95 touch-manipulation"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-[#58D4F2]" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={handleNextTestimonial}
              aria-label="Próximo depoimento"
              className="absolute right-0 sm:-right-5 top-1/2 -translate-y-1/2 z-20 bg-black/90 hover:bg-[#112238] text-white p-2 sm:p-2.5 rounded-full border border-[#58D4F2]/70 hover:border-[#FF4DA6] transition-all cursor-pointer shadow-xl active:scale-95 touch-manipulation"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#58D4F2]" aria-hidden="true" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-3.5">
            {TESTIMONIAL_SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setTestimonialIndex(idx)}
                aria-label={`Ver depoimento ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all cursor-pointer touch-manipulation ${
                  idx === testimonialIndex
                    ? 'w-7 bg-gradient-to-r from-[#58D4F2] via-[#A855F7] to-[#FF2E93]'
                    : 'w-2.5 bg-neutral-700 hover:bg-neutral-500'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* OFFER / PRICING SECTION */}
      <section className="py-8 sm:py-12 px-2.5 sm:px-4 bg-transparent relative" id="escolha">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute top-0 inset-x-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(88,212,242,0.42)_32%,rgba(168,85,247,0.42)_54%,rgba(255,46,147,0.36)_72%,transparent_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_78%_52%_at_48%_42%,rgba(14,165,233,0.14)_0%,transparent_72%),radial-gradient(ellipse_62%_48%_at_55%_68%,rgba(147,51,234,0.11)_0%,rgba(255,46,147,0.08)_46%,rgba(255,107,53,0.04)_70%,transparent_84%)]" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[30px] min-[390px]:text-[36px] sm:text-[44px] font-[800] text-center text-white tracking-[-0.02em] leading-[1.08] mb-6 sm:mb-9 uppercase px-1 text-balance">
            PREPARAMOS A <span className="gradient-blue-text">MELHOR OFERTA</span> PARA VOCÊ
          </h2>

          <div className="max-w-[540px] mx-auto mt-6">
            <div className="rounded-[24px] p-[2px] bg-[linear-gradient(150deg,#58D4F2_0%,#0EA5E9_36%,#A855F7_66%,#FF2E93_86%,#FF8C42_100%)] shadow-[0_24px_65px_rgba(14,165,233,0.24),0_12px_42px_rgba(255,46,147,0.16)] relative overflow-visible">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 bg-[#49F503] border-2 border-[#58D4F2] text-black font-[900] italic text-xs sm:text-sm py-1 px-4 rounded-full flex items-center gap-1.5 shadow-[0_6px_20px_rgba(73,245,3,0.35)] whitespace-nowrap">
                <span>🔥 MAIS VENDIDO</span>
              </div>

              <div className="rounded-[22px] bg-[radial-gradient(ellipse_at_top,#0C2348_0%,#09132B_50%,#050914_100%)] p-5 sm:p-9 flex flex-col justify-between text-center relative">
                <div>
                  <div className="mt-2 mb-3 inline-block bg-[#30FF00] text-black font-[900] italic text-xl sm:text-2xl py-2 px-8 rounded-2xl shadow-[0_6px_24px_rgba(48,255,0,0.28)] uppercase tracking-wide">
                    OFERTA PREMIUM
                  </div>

                  <div className="w-full my-2 flex justify-center">
                    <img
                      alt="Kit PackViral Definitivo de Conteúdo Viral - 100.000 Cortes"
                      width={720}
                      height={658}
                      loading="eager"
                      decoding="async"
                      className="w-72 sm:w-80 h-auto max-w-full object-contain"
                      src="/assets/aistudio/packviral-100k-sem-fundo_9c224a3a.webp"
                    />
                  </div>

                  <div className="my-3 py-3 px-4 rounded-2xl bg-[#050912]/70 border border-white/10">
                    {discountUnlocked && (
                      <div className="inline-block mb-1.5 px-3 py-0.5 rounded-full bg-[#05D321]/20 border border-[#05D321]/60 text-[#49F503] text-[11px] font-[900] uppercase tracking-wider">
                        🎉 85% OFF DA ROLETA APLICADO
                      </div>
                    )}
                    <p className="text-sm sm:text-base italic text-gray-300 mb-0.5 tabular-nums">
                      De <span className="line-through text-red-600 font-bold decoration-2">R$97,00</span>
                    </p>
                    <p className="text-sm sm:text-base italic text-gray-200 mb-1.5">por apenas:</p>
                    <div className="flex items-start justify-center font-[900] text-[#00ff88] my-1 leading-none tabular-nums">
                      <span className="text-2xl sm:text-3xl font-extrabold mr-1 mt-2">R$</span>
                      <span className="text-6xl sm:text-8xl tracking-tighter">19</span>
                      <span className="text-3xl sm:text-4xl font-extrabold mt-1 tracking-tight">,90</span>
                    </div>
                  </div>

                  <div className="my-3">
                    <ul className="space-y-0 text-center font-bold italic text-[15px] sm:text-base text-white leading-snug">
                      {OFFER_FEATURES.map((feature, idx) => (
                        <li key={idx}>
                          {idx > 0 && <div className="w-[85%] border-t border-dotted border-neutral-700 mx-auto" />}
                          <div
                            className={`flex ${
                              feature.boldPrefix ? 'items-start font-normal' : 'items-center'
                            } justify-center gap-2.5 py-1.5`}
                          >
                            <CircleCheckBig
                              className={`w-5 h-5 shrink-0 fill-[#4EE949] text-[#09132B] ${
                                feature.boldPrefix ? 'mt-0.5' : ''
                              }`}
                              aria-hidden="true"
                            />
                            <span>
                              {feature.boldPrefix && <b>{feature.boldPrefix} </b>}
                              {feature.text}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-center gap-2.5 my-4 bg-green-500/10 border border-green-500/30 py-2 px-4 rounded-xl">
                    <WhatsAppIcon className="w-7 h-7 text-[#25D366] shrink-0" />
                    <span className="text-white font-[900] italic text-xs sm:text-sm tracking-wide">
                      ACESSO IMEDIATO NO WHATSAPP
                    </span>
                  </div>
                </div>

                <div>
                  <a
                    href={CHECKOUT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4.5 px-6 rounded-full font-[900] text-lg sm:text-xl text-white bg-[#00E635] border border-[#00B328] shadow-[0_0_25px_8px_rgba(0,230,53,0.65)] hover:bg-[#00c92e] hover:scale-105 active:scale-95 transition-all block uppercase tracking-wider my-3 text-center cursor-pointer"
                  >
                    LIBERAR SUPER PACK
                  </a>
                  <p className="mt-2 text-xs sm:text-sm gradient-blue-text font-bold italic flex items-center justify-center gap-1.5">
                    <span>👑 +1.387 pessoas escolheram essa oferta</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GUARANTEE SEAL SECTION */}
      <section className="py-4 sm:py-7 px-2 sm:px-4 bg-transparent relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.10)_0%,rgba(147,51,234,0.06)_40%,transparent_66%)]"
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
          <div className="relative group cursor-pointer transition-transform duration-300 hover:scale-105">
            <img
              alt="Selo de Garantia de 7 Dias"
              width={520}
              height={520}
              loading="eager"
              decoding="async"
              className="relative w-52 sm:w-64 h-auto mx-auto object-contain drop-shadow-xl"
              src="/assets/aistudio/selo-garantia-7-dias_fe690b18.webp"
            />
          </div>
        </div>
      </section>

      {/* SUPORTE 24 HORAS SECTION */}
      <section className="py-6 sm:py-9 px-2 sm:px-4 bg-transparent relative overflow-hidden">
        <div
          className="pointer-events-none absolute top-0 inset-x-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(88,212,242,0.34)_35%,rgba(168,85,247,0.32)_62%,transparent_100%)]"
          aria-hidden="true"
        />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="bg-[linear-gradient(155deg,rgba(8,14,26,0.94)_0%,rgba(15,12,30,0.94)_100%)] border border-[#58D4F2]/65 rounded-2xl p-5 sm:p-8 text-center shadow-[0_0_25px_rgba(88,212,242,0.14),0_10px_28px_rgba(168,85,247,0.14)] relative overflow-hidden">
            <div className="absolute top-0 left-10 right-10 h-[1.5px] bg-gradient-to-r from-[#58D4F2]/60 via-[#A855F7]/75 to-[#FF4DA6]/60 pointer-events-none" />
            <div className="w-14 h-14 rounded-2xl bg-[linear-gradient(135deg,#0C2342_0%,#1A1335_100%)] border border-[#58D4F2] flex items-center justify-center mx-auto mb-3.5 shadow-[0_0_16px_rgba(88,212,242,0.22)]">
              <Headphones className="w-7 h-7 text-[#58D4F2]" aria-hidden="true" />
            </div>
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[28px] min-[390px]:text-[34px] sm:text-[34px] font-[800] text-white tracking-[-0.02em] leading-[1.1] mb-2.5 uppercase">
              SUPORTE <span className="gradient-blue-text">24 HORAS</span>
            </h2>
            <p className="text-[15px] sm:text-base text-neutral-200 max-w-xl mx-auto leading-relaxed mb-5">
              Quando você compra, você recebe{' '}
              <span className="text-white font-semibold">suporte 24 horas ensinando passo a passo a viralizar</span> e
              também ganha o{' '}
              <span className="text-white font-semibold">número direto das melhores pessoas que já viralizaram</span>{' '}
              com o pack. E se tiver qualquer dúvida antes de adquirir, é só chamar no WhatsApp agora mesmo:
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1fb858] text-black font-[900] text-sm sm:text-base uppercase tracking-wider shadow-[0_0_20px_rgba(37,211,102,0.45)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <WhatsAppIcon className="w-5 h-5 fill-current shrink-0" />
              <span>TIRAR DÚVIDAS NO WHATSAPP</span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-6 sm:py-10 px-2 sm:px-4 bg-transparent relative overflow-hidden">
        <div
          className="pointer-events-none absolute top-0 inset-x-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(88,212,242,0.34)_35%,rgba(168,85,247,0.32)_62%,transparent_100%)]"
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[34px] min-[390px]:text-[42px] sm:text-[42px] font-[800] gradient-blue-text tracking-[-0.02em] leading-[1.1] mb-4 sm:mb-6">
            FAQ
          </h2>

          <div className="w-full max-w-3xl space-y-3 sm:space-y-4">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIndices.includes(idx);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                  className="w-full text-left bg-[linear-gradient(155deg,rgba(8,14,26,0.92)_0%,rgba(12,11,26,0.92)_100%)] border border-[#58D4F2]/25 rounded-2xl p-4 sm:p-6 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:border-[#A855F7]/75 hover:shadow-[0_0_20px_rgba(168,85,247,0.16)] cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-[17px] sm:text-2xl font-bold text-white leading-tight">
                      {item.question}
                    </h3>
                    <ChevronDown
                      className={`w-6 h-6 text-[#58D4F2] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                  {isOpen && (
                    <div className="mt-2.5 text-[15px] sm:text-lg text-neutral-200 font-normal leading-relaxed">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-6 sm:py-9 px-2 sm:px-4 bg-transparent relative overflow-hidden text-center">
        <div
          className="pointer-events-none absolute top-0 inset-x-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(88,212,242,0.34)_32%,rgba(255,46,147,0.32)_58%,rgba(255,107,53,0.26)_78%,transparent_100%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_65%_at_50%_55%,rgba(14,165,233,0.10)_0%,rgba(147,51,234,0.08)_46%,rgba(255,46,147,0.05)_70%,transparent_80%)]"
          aria-hidden="true"
        />
        <div className="max-w-3xl mx-auto flex flex-col items-center relative z-10">
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[30px] min-[390px]:text-[36px] sm:text-[42px] font-[800] italic uppercase text-white tracking-[-0.02em] leading-[1.08] mb-2">
            COMECE <span className="gradient-blue-text">HOJE MESMO</span>
          </h2>
          <p className="text-[16px] sm:text-lg italic font-medium text-neutral-200 mb-5 max-w-xl">
            Tenha acesso aos 100.000 cortes e comece a postar agora.
          </p>
          <button
            type="button"
            onClick={scrollToOffer}
            className="w-full max-w-sm py-4 px-10 sm:px-14 rounded-2xl font-[800] text-lg text-white bg-[#05D321] shadow-[0_0_24px_rgba(5,211,33,0.6)] hover:scale-105 active:scale-95 transition-transform uppercase tracking-wider cursor-pointer"
          >
            QUERO MEU ACESSO
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pt-8 pb-12 px-4 bg-transparent relative text-center">
        <div
          className="pointer-events-none absolute top-0 inset-x-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(88,212,242,0.28)_35%,rgba(168,85,247,0.26)_65%,transparent_100%)]"
          aria-hidden="true"
        />
        <div className="max-w-3xl mx-auto flex flex-col items-center relative z-10">
          <div className="mb-4">
            <img
              alt="PackViral"
              width={320}
              height={320}
              loading="eager"
              decoding="async"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto object-cover border-2 border-[#58D4F2] shadow-[0_0_22px_rgba(88,212,242,0.34),0_0_28px_rgba(168,85,247,0.20)]"
              src="/assets/aistudio/packviral-logo_b23c2b54.webp"
            />
          </div>

          <div className="flex items-center justify-center gap-2 text-sm sm:text-base font-medium text-neutral-200 mb-3">
            <button
              type="button"
              onClick={() => setLegalModal('privacy')}
              className="text-neutral-200 hover:text-[#58D4F2] transition-colors cursor-pointer"
            >
              Política de Privacidade
            </button>
            <span className="text-neutral-600"> | </span>
            <button
              type="button"
              onClick={() => setLegalModal('terms')}
              className="text-neutral-200 hover:text-[#58D4F2] transition-colors cursor-pointer"
            >
              Termos de Uso
            </button>
          </div>

          <div className="w-full max-w-2xl border-t border-white/10 my-3" />

          <p className="text-sm text-neutral-300 mb-1 font-normal">
            Suporte:{' '}
            <a href="mailto:contato@packverso.shop" className="hover:text-[#58D4F2] transition-colors">
              contato@packverso.shop
            </a>
          </p>
          <p className="text-[11px] sm:text-xs italic text-neutral-400 max-w-2xl mt-1 leading-relaxed">
            Este site não é afiliado ao Facebook ou a qualquer entidade do Facebook. Depois que você sair do Facebook, a
            responsabilidade não é deles e sim do nosso site.
          </p>
        </div>
      </footer>

      {/* FLOATING WHATSAPP SUPPORT BUTTON */}
      <aside aria-label="Suporte WhatsApp" className="fixed bottom-4 right-4 z-50 sm:bottom-5 sm:right-5">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Tire dúvidas pelo WhatsApp"
          className="group relative flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#25D366] text-white shadow-[0_4px_18px_rgba(37,211,102,0.5)] hover:shadow-[0_6px_24px_rgba(37,211,102,0.75)] hover:scale-110 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/80"
        >
          <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none -z-10" />
          <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 fill-current drop-shadow" />
          <span className="sr-only">Tire dúvidas pelo WhatsApp</span>
        </a>
      </aside>

      <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />

      <DiscountWheelModal
        isOpen={isWheelOpen}
        onClaimDiscount={() => {
          setDiscountUnlocked(true);
          setIsWheelOpen(false);
        }}
      />
    </div>
  );
}
