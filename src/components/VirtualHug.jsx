import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import hugGif from '../assets/hug.gif';

export default function VirtualHug() {
  const [hugCount, setHugCount] = useState(0);
  const [isPressing, setIsPressing] = useState(false);
  const [showGif, setShowGif] = useState(false);
  const [gifKey, setGifKey] = useState(0);

  const triggerHug = (e) => {
    setHugCount((prev) => prev + 1);
    setIsPressing(true);
    setShowGif(true);
    setGifKey(Date.now()); // forces GIF reload/restart if needed

    setTimeout(() => setIsPressing(false), 250);

    // Dynamic origin coordinates from click
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    // Canvas confetti burst with heart colors
    confetti({
      particleCount: 50,
      spread: 75,
      origin: { x, y },
      colors: ['#a855f7', '#d8b4fe', '#ffffff', '#ec4899', '#f472b6'],
      ticks: 200,
      gravity: 0.8,
      scalar: 1.2,
    });

    try {
      confetti({
        particleCount: 25,
        spread: 110,
        origin: { x, y },
        colors: ['#c084fc', '#f472b6', '#ffffff'],
        scalar: 1.4,
      });
    } catch (err) {
      // fallback
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto my-4 px-2 text-center">
      <div className="liquid-glass rounded-3xl p-5 sm:p-7 border border-purple-500/30 relative shadow-2xl">
        
        {/* Subtle decorative glow */}
        <div className="absolute -top-10 -left-10 w-28 h-28 bg-pink-500/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-purple-600/20 rounded-full blur-2xl pointer-events-none" />

        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-400/40 text-purple-300 text-xs mb-3">
          <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400 animate-pulse" />
          <span>Long Distance Warmth</span>
        </div>

        <h3 className="font-serif text-2xl font-bold text-white mb-1.5">
          Send a Warm Hug 🫂
        </h3>
        <p className="text-xs text-purple-200/80 mb-5 leading-relaxed">
          Whenever you miss me or feel the miles, press this to wrap my arms around you from India all the way to Cebu.
        </p>

        {/* ======================================================== */}
        {/* HUG GIF ANIMATED DISPLAY FRAME */}
        {/* ======================================================== */}
        {showGif && (
          <div className="mb-5 relative animate-fade-in">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-2xl overflow-hidden liquid-glass border-2 border-purple-400/70 shadow-[0_0_30px_rgba(168,85,247,0.5)] group">
              
              <img
                key={gifKey}
                src={`${hugGif || '/hug.gif'}?t=${gifKey}`}
                alt="Warm Virtual Hug"
                className="w-full h-full object-cover select-none"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/hug.gif';
                }}
              />

              {/* Glowing overlay border */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/30 pointer-events-none" />
              
              {/* Floating Heart Badge */}
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] text-pink-300 flex items-center space-x-1">
                <Heart className="w-3 h-3 fill-pink-400" />
                <span>Hug Sent!</span>
              </div>
            </div>

            <p className="text-xs text-pink-200 font-medium mt-2 animate-pulse">
              *holding you so tight right now* 💜
            </p>
          </div>
        )}

        {/* Hug Button */}
        <button
          onClick={triggerHug}
          className={`w-full group relative inline-flex items-center justify-center space-x-2.5 py-3.5 px-6 rounded-full font-semibold text-sm sm:text-base text-white transition-all duration-300 shadow-xl cursor-pointer ${
            isPressing
              ? 'scale-95 bg-purple-700 shadow-purple-500/80'
              : 'bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 hover:from-purple-500 hover:to-indigo-700 shadow-purple-900/60 hover:shadow-purple-600/50 hover:scale-[1.02] active:scale-95'
          } border border-purple-400/40`}
        >
          <Heart className={`w-4 h-4 text-pink-300 fill-pink-300 transition-transform ${isPressing ? 'scale-125' : 'group-hover:scale-110'}`} />
          <span className="tracking-wide">Press for Virtual Hug</span>
          <Sparkles className="w-4 h-4 text-purple-200" />
        </button>

        {hugCount > 0 && (
          <div className="mt-4 animate-fade-in">
            <span className="text-xs text-purple-300 font-medium bg-purple-950/70 px-3.5 py-1.5 rounded-full border border-purple-500/30 inline-block">
              💜 {hugCount} {hugCount === 1 ? 'hug' : 'hugs'} delivered across 4,500 km!
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
