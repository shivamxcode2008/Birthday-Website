/**
 * A lightweight Audio Manager using the Web Audio API for SFX and ambient BGM.
 * Prevents overlapping SFX issues and handles mute states.
 * Safely falls back if Web Audio API is unsupported or blocked.
 */

class AudioManager {
  constructor() {
    this.isMuted = true; // Default to muted until user enables
    this.audioContext = null;
    this.bgmNodes = [];
    this.bgmPlaying = false;
    this.bgmInterval = null;
  }

  init() {
    if (this.audioContext) return true;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return false;
      this.audioContext = new AudioContext();
      return true;
    } catch (e) {
      console.warn('AudioContext initialization failed:', e);
      return false;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    
    try {
      if (!this.isMuted) {
        this.init();
        if (this.audioContext && this.audioContext.state === 'suspended') {
          this.audioContext.resume();
        }
        if (!this.bgmPlaying) {
          this.startBGM();
        }
      } else {
        this.stopBGM();
      }
    } catch (e) {
      console.warn('Audio toggle failed:', e);
    }
    
    return this.isMuted;
  }

  safePlay(callback) {
    if (this.isMuted) return;
    if (!this.init()) return;
    try {
      callback(this.audioContext);
    } catch (e) {
      console.warn('Audio playback failed:', e);
    }
  }

  // --- Background Music (Ambient Generative) ---
  
  startBGM() {
    if (this.bgmPlaying || this.isMuted) return;
    this.bgmPlaying = true;
    
    this.safePlay((ctx) => {
      // Pentatonic scale frequencies for a dreamy vibe (C Major Pentatonic)
      const pentatonic = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
      
      const playRandomNote = () => {
        if (!this.bgmPlaying) return;
        
        const freq = pentatonic[Math.floor(Math.random() * pentatonic.length)];
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        // Very soft, slow attack and release
        const now = ctx.currentTime;
        const duration = 4.0;
        
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.015, now + duration / 2);
        gain.gain.linearRampToValueAtTime(0, now + duration);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(now);
        osc.stop(now + duration);
        
        this.bgmNodes.push({ osc, gain });
        // Clean up dead nodes
        setTimeout(() => {
          this.bgmNodes = this.bgmNodes.filter(n => n.osc !== osc);
        }, duration * 1000);
      };

      // Play a note every 1.5 to 2.5 seconds
      const loop = () => {
        if (!this.bgmPlaying) return;
        playRandomNote();
        this.bgmInterval = setTimeout(loop, 1500 + Math.random() * 1000);
      };
      
      loop();
    });
  }

  stopBGM() {
    this.bgmPlaying = false;
    clearTimeout(this.bgmInterval);
    this.safePlay((ctx) => {
      const now = ctx.currentTime;
      this.bgmNodes.forEach(({ osc, gain }) => {
        try {
          gain.gain.cancelScheduledValues(now);
          gain.gain.linearRampToValueAtTime(0, now + 0.5);
          osc.stop(now + 0.5);
        } catch (e) {}
      });
      this.bgmNodes = [];
    });
  }

  duckBGM() {
    this.safePlay((ctx) => {
      const now = ctx.currentTime;
      this.bgmNodes.forEach(({ gain }) => {
        try {
          // Reduce volume by 70%
          const currentGain = gain.gain.value;
          gain.gain.cancelScheduledValues(now);
          gain.gain.linearRampToValueAtTime(currentGain * 0.3, now + 1);
        } catch (e) {}
      });
    });
  }

  // --- Sound Effects ---

  playPop() {
    this.safePlay((ctx) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    });
  }

  playType() {
    this.safePlay((ctx) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(800 + Math.random() * 200, ctx.currentTime);
      
      gainNode.gain.setValueAtTime(0.02, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    });
  }

  playSuccess() {
    this.safePlay((ctx) => {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C E G C
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const startTime = ctx.currentTime + (i * 0.08);
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.1, startTime + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.4);
      });
    });
  }

  playError() {
    this.safePlay((ctx) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.2);
      gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    });
  }

  playOpen() {
    this.safePlay((ctx) => {
      // Paper rustle approximation (noise + lowpass)
      const bufferSize = ctx.sampleRate * 0.3; // 300ms
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 1000;
      
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      
      noise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      noise.start();
    });
  }

  playGift() {
    this.safePlay((ctx) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
      osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.3); // A6
      
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    });
  }
  
  playSlide() {
    this.safePlay((ctx) => {
      // Soft gentle whoosh
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(50, ctx.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.1);
      gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.2);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    });
  }

  playSparkle() {
    this.safePlay((ctx) => {
      // High-pitched magical chime
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(3000, ctx.currentTime + 0.3);
      
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    });
  }

  playBlowout() {
    this.safePlay((ctx) => {
      // A quick whoosh of white noise
      const bufferSize = ctx.sampleRate * 0.4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 800;
      filter.Q.value = 0.5;
      
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      
      noise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);
      noise.start();
    });
  }

  playBirthdayMelody() {
    this.safePlay((ctx) => {
      // "Happy Birthday to You" simple melody relative frequencies
      const C4 = 261.63;
      const D4 = 293.66;
      const E4 = 329.63;
      const F4 = 349.23;
      const G4 = 392.00;
      
      const melody = [
        { f: C4, d: 0.3, t: 0 },
        { f: C4, d: 0.1, t: 0.4 },
        { f: D4, d: 0.5, t: 0.6 },
        { f: C4, d: 0.5, t: 1.2 },
        { f: F4, d: 0.5, t: 1.8 },
        { f: E4, d: 0.8, t: 2.4 },
        
        { f: C4, d: 0.3, t: 3.4 },
        { f: C4, d: 0.1, t: 3.8 },
        { f: D4, d: 0.5, t: 4.0 },
        { f: C4, d: 0.5, t: 4.6 },
        { f: G4, d: 0.5, t: 5.2 },
        { f: F4, d: 0.8, t: 5.8 },
      ];

      melody.forEach(note => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = note.f;
        
        const startTime = ctx.currentTime + note.t;
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + note.d);
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + note.d);
      });
    });
  }
}

export const audio = new AudioManager();
