/**
 * Web Audio API synthesizer for study soundscapes.
 * Provides authentic generated audio (Binaural Focus, Rain, White Noise, Lo-Fi Hum, Chimes)
 * with zero external network dependencies.
 */

class SoundscapeEngine {
  private ctx: AudioContext | null = null;
  private currentType: 'rain' | 'binaural' | 'whitenoise' | 'lofi' | 'off' = 'off';
  private nodes: (AudioNode | number)[] = [];
  private masterGain: GainNode | null = null;
  private volume: number = 0.5;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getCurrentType(): string {
    return this.currentType;
  }

  public stop() {
    if (this.ctx) {
      this.nodes.forEach((node) => {
        if (typeof node === 'number') {
          window.clearInterval(node);
        } else {
          try {
            (node as any).stop?.();
            node.disconnect();
          } catch (e) {
            // ignore
          }
        }
      });
      this.nodes = [];
    }
    this.currentType = 'off';
  }

  public playSoundscape(type: 'rain' | 'binaural' | 'whitenoise' | 'lofi' | 'off') {
    this.stop();
    if (type === 'off') return;

    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    this.currentType = type;

    switch (type) {
      case 'binaural':
        this.playBinauralFocus();
        break;
      case 'rain':
        this.playRain();
        break;
      case 'whitenoise':
        this.playWhiteNoise();
        break;
      case 'lofi':
        this.playLofiDrone();
        break;
    }
  }

  private playBinauralFocus() {
    if (!this.ctx || !this.masterGain) return;

    // 40Hz Gamma wave for active mental concentration
    // Left ear: 210 Hz, Right ear: 250 Hz (or 200 / 240)
    const baseFreq = 180;
    const beatFreq = 40; // 40Hz gamma focus

    const oscLeft = this.ctx.createOscillator();
    const oscRight = this.ctx.createOscillator();

    oscLeft.type = 'sine';
    oscRight.type = 'sine';
    oscLeft.frequency.value = baseFreq;
    oscRight.frequency.value = baseFreq + beatFreq;

    const panLeft = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
    const panRight = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;

    if (panLeft && panRight) {
      panLeft.pan.value = -1;
      panRight.pan.value = 1;
    }

    const gain = this.ctx.createGain();
    gain.gain.value = 0.25;

    if (panLeft && panRight) {
      oscLeft.connect(panLeft);
      panLeft.connect(gain);
      oscRight.connect(panRight);
      panRight.connect(gain);
    } else {
      oscLeft.connect(gain);
      oscRight.connect(gain);
    }

    gain.connect(this.masterGain);

    oscLeft.start();
    oscRight.start();
    this.nodes.push(oscLeft, oscRight, gain);
  }

  private playWhiteNoise() {
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter into soft gentle brown-ish tone
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 850;

    const gain = this.ctx.createGain();
    gain.gain.value = 0.35;

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    whiteNoise.start();
    this.nodes.push(whiteNoise, filter, gain);
  }

  private playRain() {
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = 3 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    // Pink-noise formula
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }

    const rainSource = this.ctx.createBufferSource();
    rainSource.buffer = noiseBuffer;
    rainSource.loop = true;

    const lowpass = this.ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 1100;

    const highpass = this.ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.value = 160;

    const gain = this.ctx.createGain();
    gain.gain.value = 0.4;

    rainSource.connect(lowpass);
    lowpass.connect(highpass);
    highpass.connect(gain);
    gain.connect(this.masterGain);

    rainSource.start();
    this.nodes.push(rainSource, lowpass, highpass, gain);
  }

  private playLofiDrone() {
    if (!this.ctx || !this.masterGain) return;

    // Gentle warm triad drone (F - A - C) low in octave
    const freqs = [87.31, 110.0, 130.81];
    const gain = this.ctx.createGain();
    gain.gain.value = 0.18;

    freqs.forEach((f) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = f;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 320;

      osc.connect(filter);
      filter.connect(gain);
      osc.start();
      this.nodes.push(osc, filter);
    });

    gain.connect(this.masterGain);
    this.nodes.push(gain);
  }

  public playTimerBell() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const bellGain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.35); // E5

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1046.5, now); // C6 overtone

    bellGain.gain.setValueAtTime(0.4, now);
    bellGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

    osc1.connect(bellGain);
    osc2.connect(bellGain);
    bellGain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 1.8);
    osc2.stop(now + 1.8);
  }
}

export const soundscapeEngine = new SoundscapeEngine();
