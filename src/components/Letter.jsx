import React from 'react';
import { Heart, Feather } from 'lucide-react';

export default function Letter() {
  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto max-h-[82dvh] flex flex-col rounded-3xl bg-zinc-950/95 border border-purple-500/40 shadow-2xl backdrop-blur-xl overflow-hidden animate-fade-in">
      
      {/* Compact Top Seal & Header */}
      <div className="pt-4 pb-2 px-4 text-center shrink-0 border-b border-purple-500/20 bg-purple-950/40">
        <div className="w-9 h-9 mx-auto rounded-full bg-gradient-to-tr from-purple-800 to-purple-500 p-0.5 shadow-md flex items-center justify-center mb-1">
          <Heart className="w-4 h-4 text-white fill-white/20" />
        </div>
        <span className="text-[10px] uppercase tracking-widest text-purple-300 font-semibold block">
          Confession of the Heart
        </span>
        <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
          For My Everything 💜
        </h3>
      </div>

      {/* Scrollable Letter Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 text-purple-100/90 text-xs sm:text-sm leading-relaxed font-light">
        <p>
          <strong className="text-white font-medium text-sm sm:text-base">Happy Monthsary, my love. 💜</strong>
        </p>

        <p>
          Who would have thought that a random day in <em>Avakin Life</em> would lead me to the person who now holds my whole heart? Even with 4,500 kilometers and a time zone between us, you manage to make me feel closer, calmer, and happier than anyone right here ever could.
        </p>

        <p>
          Thank you for every late-night conversation, every shared laugh, and the sweet warmth you bring into my life every single day. The distance is just a temporary number—what we have is real, and every passing month brings us one step closer to the day there are no screens between us.
        </p>

        <div className="my-2 p-3 rounded-2xl bg-purple-900/30 border border-purple-400/30 text-center shadow-inner">
          <p className="font-serif italic text-purple-200 text-xs sm:text-sm font-medium">
            "I cherish you more than words can say. Happy Monthsary, my everything."
          </p>
        </div>
      </div>

      {/* Compact Bottom Signature */}
      <div className="p-3 px-4 border-t border-purple-500/20 bg-purple-950/30 flex items-center justify-between shrink-0">
        <div>
          <div className="text-[10px] text-purple-400">Forever Yours,</div>
          <div className="font-serif font-bold text-sm sm:text-base text-white">Your Pyra 👑</div>
        </div>
        <div className="flex items-center space-x-1 text-[10px] text-purple-300 bg-purple-900/40 px-2.5 py-1 rounded-full border border-purple-500/20">
          <Feather className="w-3 h-3 text-purple-400" />
          <span>Sealed with Eternity</span>
        </div>
      </div>

    </div>
  );
}
