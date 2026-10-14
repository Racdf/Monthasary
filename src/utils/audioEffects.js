/**
 * Synthesizes tactile sound effects using Web Audio API:
 * 1. playGlassShatterSound: Shattering crystalline glass
 * 2. playKeyUnlockSound: Metallic key click & celestial unlock
 * 3. playSuccessChime: Happy sparkle bell for correct answer
 */

export function playGlassShatterSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;

    // 1. Sub impact punch
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(110, now);
    subOsc.frequency.exponentialRampToValueAtTime(30, now + 0.18);
    subGain.gain.setValueAtTime(0.5, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 0.25);

    // 2. High frequency crystal ringing shards
    const crystalFreqs = [1900, 2600, 3800, 5200, 7100];
    crystalFreqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 200, now);
      
      const delay = idx * 0.015;
      gain.gain.setValueAtTime(0.0001, now + delay);
      gain.gain.linearRampToValueAtTime(0.08, now + delay + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.45 + Math.random() * 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + delay);
      osc.stop(now + delay + 0.8);
    });

    // 3. Noise burst (crackle)
    const bufferSize = ctx.sampleRate * 0.25;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.05));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1800, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.3, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noise.start(now);
  } catch (err) {
    console.warn("Audio effect error:", err);
  }
}

export function playSuccessChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);

      gain.gain.setValueAtTime(0.0001, now + idx * 0.07);
      gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.07 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.45);
    });
  } catch (e) {
    // ignore
  }
}

export function playKeyUnlockSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    // Metallic click
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);

    // Resonant ring
    const ring = ctx.createOscillator();
    const ringGain = ctx.createGain();
    ring.type = 'sine';
    ring.frequency.setValueAtTime(1480, now + 0.05);

    ringGain.gain.setValueAtTime(0.08, now + 0.05);
    ringGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

    ring.connect(ringGain);
    ringGain.connect(ctx.destination);
    ring.start(now + 0.05);
    ring.stop(now + 0.55);
  } catch (e) {
    // ignore
  }
}
