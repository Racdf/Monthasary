import React, { useEffect, useRef } from 'react';

/**
 * Headless AudioPlayer:
 * Generates an ethereal, romantic celestial soundscape using Web Audio API.
 * Contains ZERO visible UI elements per user request.
 */
export default function AudioPlayer({ isPlaying }) {
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const timerRef = useRef(null);

  // Ethereal pentatonic chord progression (F# minor / A major pentatonic)
  const notes = [
    220.00, // A3
    277.18, // C#4
    329.63, // E4
    369.99, // F#4
    440.00, // A4
    554.37, // C#5
    659.25, // E5
    739.99, // F#5
    880.00  // A5
  ];

  const playChime = (freq, time, duration = 2.8) => {
    if (!audioCtxRef.current || !gainNodeRef.current) return;
    const ctx = audioCtxRef.current;

    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();

    // Bell-like celestial sine
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    noteGain.gain.setValueAtTime(0.0001, time);
    noteGain.gain.linearRampToValueAtTime(0.07, time + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(noteGain);
    noteGain.connect(gainNodeRef.current);

    osc.start(time);
    osc.stop(time + duration);
  };

  useEffect(() => {
    if (isPlaying) {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioContext();

        const masterGain = audioCtxRef.current.createGain();
        masterGain.gain.setValueAtTime(0.3, audioCtxRef.current.currentTime);
        masterGain.connect(audioCtxRef.current.destination);
        gainNodeRef.current = masterGain;
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      let step = 0;
      const interval = setInterval(() => {
        if (!audioCtxRef.current) return;
        const now = audioCtxRef.current.currentTime;
        
        const noteIndex = [0, 2, 4, 6, 4, 2, 3, 5, 7, 5, 3, 1][step % 12];
        playChime(notes[noteIndex], now, 3.2);

        if (step % 4 === 0) {
          playChime(notes[0] / 2, now, 4.5);
        }

        step++;
      }, 1250);

      timerRef.current = interval;

      return () => {
        clearInterval(interval);
      };
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  }, [isPlaying]);

  // Completely invisible - zero UI rendered
  return null;
}
