// Synthesizes crisp wheel ticks, confetti party-popper burst, and realistic multi-layered applause via Web Audio API

let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  if (!sharedAudioCtx) {
    sharedAudioCtx = new AudioCtx();
  }
  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
}

export function unlockCelebrationAudio(): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
  // Silent 1-sample buffer unlock for iOS/Safari
  try {
    const buffer = ctx.createBuffer(1, 1, 22050);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start(0);
  } catch {
    // Ignore unlock errors
  }
}

export function playWheelTick(pitchMultiplier = 1): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(680 * pitchMultiplier, now);
  osc.frequency.exponentialRampToValueAtTime(190, now + 0.032);

  gain.gain.setValueAtTime(0.16, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.04);
}

function createNoiseBuffer(ctx: AudioContext, durationSec: number): AudioBuffer {
  const length = Math.floor(ctx.sampleRate * durationSec);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

export function playConfettiAndApplause(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const noiseBuffer = createNoiseBuffer(ctx, 0.35);

  // 1. Confetti Party-Popper "POP!" + Sparkle Cascade
  const popOsc = ctx.createOscillator();
  const popGain = ctx.createGain();
  popOsc.type = 'sine';
  popOsc.frequency.setValueAtTime(220, now);
  popOsc.frequency.exponentialRampToValueAtTime(52, now + 0.11);
  popGain.gain.setValueAtTime(0.45, now);
  popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);
  popOsc.connect(popGain);
  popGain.connect(ctx.destination);
  popOsc.start(now);
  popOsc.stop(now + 0.14);

  // High-frequency paper confetti crackle burst
  const popNoise = ctx.createBufferSource();
  popNoise.buffer = noiseBuffer;
  const popFilter = ctx.createBiquadFilter();
  popFilter.type = 'highpass';
  popFilter.frequency.setValueAtTime(1400, now);
  const popNoiseGain = ctx.createGain();
  popNoiseGain.gain.setValueAtTime(0.32, now);
  popNoiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
  popNoise.connect(popFilter);
  popFilter.connect(popNoiseGain);
  popNoiseGain.connect(ctx.destination);
  popNoise.start(now);
  popNoise.stop(now + 0.24);

  // Celebratory chime notes (C5 - E5 - G5 - C6)
  const fanfareNotes = [523.25, 659.25, 783.99, 1046.5];
  fanfareNotes.forEach((freq, idx) => {
    const start = now + 0.04 + idx * 0.075;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, start);
    gain.gain.setValueAtTime(0.001, start);
    gain.gain.linearRampToValueAtTime(0.16, start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.45);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + 0.48);
  });

  // 2. Multi-layered Crowd Applause (34 staggered hand-claps + warm room wash)
  const clapBuffer = createNoiseBuffer(ctx, 0.11);
  const totalClaps = 38;

  for (let i = 0; i < totalClaps; i++) {
    // Cluster fast at first, then naturally taper out over ~3.1s
    const progress = i / totalClaps;
    const clapTime = now + 0.12 + progress * 2.75 + (Math.random() * 0.09 - 0.045);

    const src = ctx.createBufferSource();
    src.buffer = clapBuffer;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(950 + Math.random() * 1950, clapTime);
    bandpass.Q.setValueAtTime(1.1 + Math.random() * 1.4, clapTime);

    const clapGain = ctx.createGain();
    const peak = (0.16 + Math.random() * 0.12) * (1 - progress * 0.62);
    clapGain.gain.setValueAtTime(0.001, clapTime);
    clapGain.gain.linearRampToValueAtTime(peak, clapTime + 0.005);
    clapGain.gain.exponentialRampToValueAtTime(0.001, clapTime + 0.065 + Math.random() * 0.04);

    src.connect(bandpass);
    bandpass.connect(clapGain);
    clapGain.connect(ctx.destination);

    src.start(clapTime);
    src.stop(clapTime + 0.11);
  }

  // Soft continuous crowd ambience bed behind the individual claps
  const crowdBuffer = createNoiseBuffer(ctx, 3.0);
  const crowdSrc = ctx.createBufferSource();
  crowdSrc.buffer = crowdBuffer;

  const crowdFilter = ctx.createBiquadFilter();
  crowdFilter.type = 'bandpass';
  crowdFilter.frequency.setValueAtTime(1450, now + 0.15);
  crowdFilter.Q.setValueAtTime(0.7, now + 0.15);

  const crowdGain = ctx.createGain();
  crowdGain.gain.setValueAtTime(0.001, now + 0.12);
  crowdGain.gain.linearRampToValueAtTime(0.14, now + 0.45);
  crowdGain.gain.setValueAtTime(0.12, now + 1.4);
  crowdGain.gain.exponentialRampToValueAtTime(0.001, now + 3.05);

  crowdSrc.connect(crowdFilter);
  crowdFilter.connect(crowdGain);
  crowdGain.connect(ctx.destination);

  crowdSrc.start(now + 0.12);
  crowdSrc.stop(now + 3.1);
}
