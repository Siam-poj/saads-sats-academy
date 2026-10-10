import { useCallback, useEffect, useRef, useState } from 'react';

export function useSound() {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('saad_sats_sound_enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      localStorage.setItem('saad_sats_sound_enabled', JSON.stringify(next));
      return next;
    });
  }, []);

  const playTone = useCallback((freq: number, type: OscillatorType, duration: number, gainValue = 0.1, delay = 0) => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const startTime = ctx.currentTime + delay;
      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(gainValue, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch {
      // Audio autoplay policy fallback
    }
  }, [soundEnabled, getAudioContext]);

  const playCorrect = useCallback(() => {
    // Joyful ascending arpeggio (C5 -> E5 -> G5)
    playTone(523.25, 'sine', 0.15, 0.12, 0);
    playTone(659.25, 'sine', 0.18, 0.12, 0.08);
    playTone(783.99, 'triangle', 0.35, 0.15, 0.16);
  }, [playTone]);

  const playIncorrect = useCallback(() => {
    // Gentle encouraging low chord
    playTone(330, 'triangle', 0.2, 0.1, 0);
    playTone(293.66, 'sine', 0.25, 0.08, 0.1);
  }, [playTone]);

  const playClick = useCallback(() => {
    playTone(800, 'sine', 0.04, 0.04, 0);
  }, [playTone]);

  const playLevelUp = useCallback(() => {
    playTone(440, 'triangle', 0.15, 0.15, 0);
    playTone(554.37, 'triangle', 0.15, 0.15, 0.1);
    playTone(659.25, 'triangle', 0.2, 0.15, 0.2);
    playTone(880, 'sine', 0.5, 0.2, 0.3);
  }, [playTone]);

  const playTick = useCallback(() => {
    playTone(1200, 'sine', 0.02, 0.03, 0);
  }, [playTone]);

  const playFanfare = useCallback(() => {
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      playTone(freq, 'triangle', 0.25, 0.15, idx * 0.12);
    });
  }, [playTone]);

  return {
    soundEnabled,
    toggleSound,
    playCorrect,
    playIncorrect,
    playClick,
    playLevelUp,
    playTick,
    playFanfare
  };
}
