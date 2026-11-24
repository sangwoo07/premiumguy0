/**
 * Web Audio API synthesizer for interactive sound effects and generative music preview.
 * Self-contained without external audio dependencies.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private currentOscillators: OscillatorNode[] = [];
  private currentGainNodes: GainNode[] = [];
  private loopInterval: number | null = null;
  private isPlayingMusic: boolean = false;
  private currentMoodIndex: number = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopCurrentMusic();
    } else {
      this.initContext();
      if (this.isPlayingMusic) {
        this.startMoodMusic(this.currentMoodIndex);
      }
    }
  }

  // Play snappy click/switch sound effect
  public playSwitchSound(isPremium: boolean) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      if (isPremium) {
        // Ascending pleasant chord
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
      } else {
        // Descending gentle click
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(260, now + 0.12);
      }

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.2);
    } catch {
      // AudioContext policy fallback
    }
  }

  public stopCurrentMusic() {
    if (this.loopInterval) {
      clearInterval(this.loopInterval);
      this.loopInterval = null;
    }
    this.currentOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {}
    });
    this.currentGainNodes.forEach((g) => {
      try {
        g.disconnect();
      } catch {}
    });
    this.currentOscillators = [];
    this.currentGainNodes = [];
  }

  public startMoodMusic(moodIdx: number) {
    this.currentMoodIndex = moodIdx;
    this.isPlayingMusic = true;
    if (this.isMuted) return;

    this.stopCurrentMusic();
    this.initContext();
    if (!this.ctx) return;

    // Mood scales and chord definitions (frequencies in Hz)
    const moodScales = [
      // 0: LoFi - Warm mellow chords (Cmaj7, Am7, Fmaj7, G7)
      [
        [261.63, 329.63, 392.00, 493.88], // Cmaj7
        [220.00, 261.63, 329.63, 392.00], // Am7
        [174.61, 220.00, 261.63, 329.63], // Fmaj7
        [196.00, 246.94, 293.66, 349.23], // G7
      ],
      // 1: City Pop - Bright retro synth chords (Dmaj7, C#m7, Bm7, A)
      [
        [293.66, 369.99, 440.00, 554.37],
        [277.18, 329.63, 415.30, 493.88],
        [246.94, 293.66, 369.99, 440.00],
        [220.00, 277.18, 329.63, 440.00],
      ],
      // 2: Gym Hip-Hop - Driving deep bass & punchy stabs
      [
        [110.00, 164.81, 220.00, 261.63],
        [123.47, 185.00, 246.94, 293.66],
        [98.00, 146.83, 196.00, 233.08],
        [110.00, 164.81, 220.00, 277.18],
      ],
      // 3: Live Concert - Spacious reverb-like atmospheric pad
      [
        [196.00, 293.66, 392.00, 587.33],
        [174.61, 261.63, 349.23, 523.25],
        [164.81, 246.94, 329.63, 493.88],
        [196.00, 293.66, 392.00, 587.33],
      ]
    ];

    const currentProgression = moodScales[moodIdx] || moodScales[0];
    let step = 0;

    const playChord = () => {
      if (this.isMuted || !this.ctx) return;
      const now = this.ctx.currentTime;
      const chord = currentProgression[step % currentProgression.length];
      step++;

      chord.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Waveform selection by mood
        if (moodIdx === 0) osc.type = 'sine';
        else if (moodIdx === 1) osc.type = i === 0 ? 'triangle' : 'sawtooth';
        else if (moodIdx === 2) osc.type = i === 0 ? 'square' : 'triangle';
        else osc.type = 'sine';

        osc.frequency.setValueAtTime(freq, now);

        // Low volume for gentle ambient background
        const peakGain = moodIdx === 1 ? 0.025 : 0.04;
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(peakGain / chord.length, now + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.0005, now + 2.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 2.3);

        this.currentOscillators.push(osc);
        this.currentGainNodes.push(gain);
      });
    };

    playChord();
    this.loopInterval = window.setInterval(playChord, 2200);
  }

  public pauseMusic() {
    this.isPlayingMusic = false;
    this.stopCurrentMusic();
  }
}

export const soundEngine = new SoundEngine();
