import React, { useState, useEffect } from 'react';
import { Clock, Heart, Sparkles } from 'lucide-react';

export default function TimezoneBridge() {
  const [istTime, setIstTime] = useState('');
  const [phtTime, setPhtTime] = useState('');
  const [istDate, setIstDate] = useState('');
  const [phtDate, setPhtDate] = useState('');

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();

      // India Standard Time (Asia/Kolkata)
      const istOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const istDateOptions = {
        timeZone: 'Asia/Kolkata',
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      };

      // Philippine Standard Time (Asia/Manila)
      const phtOptions = {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const phtDateOptions = {
        timeZone: 'Asia/Manila',
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      };

      setIstTime(now.toLocaleTimeString('en-US', istOptions));
      setIstDate(now.toLocaleDateString('en-US', istDateOptions));
      setPhtTime(now.toLocaleTimeString('en-US', phtOptions));
      setPhtDate(now.toLocaleDateString('en-US', phtDateOptions));
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto my-12 px-4">
      <div className="liquid-glass rounded-3xl p-6 sm:p-8 relative overflow-hidden text-center">
        {/* Glow ambient background inside card */}
        <div className="absolute -top-20 -left-20 w-44 h-44 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-44 h-44 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-center space-x-2 text-purple-300 text-xs tracking-widest uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Cosmic Bridge of Hearts</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white mb-2">
          Two Skies, One Gravity
        </h3>
        <p className="text-sm text-purple-200/80 mb-8 max-w-md mx-auto">
          4,500+ kilometers across the ocean, but never more than a heartbeat away.
        </p>

        {/* Dual Clocks Display */}
        <div className="grid grid-cols-2 gap-4 relative items-center">
          {/* India Side */}
          <div className="liquid-glass rounded-2xl p-4 sm:p-5 flex flex-col items-center">
            <div className="flex items-center space-x-1.5 text-xs text-purple-300 mb-1">
              <span>🇮🇳</span>
              <span className="font-semibold uppercase tracking-wider">India (Pyra)</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-white my-1">
              {istTime || 'Loading...'}
            </div>
            <div className="text-[11px] text-purple-300/70">{istDate}</div>
            <div className="text-[10px] text-zinc-400 mt-1">IST (UTC+5:30)</div>
          </div>

          {/* Central Connecting Heart & Distance */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-700 to-white/90 p-0.5 shadow-lg shadow-purple-500/40 animate-pulse">
              <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-purple-400 fill-purple-400" />
              </div>
            </div>
          </div>

          {/* Philippines Side */}
          <div className="liquid-glass rounded-2xl p-4 sm:p-5 flex flex-col items-center">
            <div className="flex items-center space-x-1.5 text-xs text-purple-300 mb-1">
              <span>🇵🇭</span>
              <span className="font-semibold uppercase tracking-wider">Philippines (Langga)</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-purple-200 my-1">
              {phtTime || 'Loading...'}
            </div>
            <div className="text-[11px] text-purple-300/70">{phtDate}</div>
            <div className="text-[10px] text-zinc-400 mt-1">PHT (UTC+8:00)</div>
          </div>
        </div>

        {/* Constellation Connecting Line & Time Gap */}
        <div className="mt-6 pt-5 border-t border-purple-500/20 flex flex-col items-center">
          <div className="flex items-center space-x-2 text-xs text-purple-300 font-medium">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span>2 hours & 30 minutes apart in time • <strong className="text-white">0 miles apart in soul</strong></span>
          </div>
          <p className="text-[11px] text-zinc-400 mt-1.5 italic">
            "When the moon rises in Cebu, I look up knowing it shines upon the same sky we share."
          </p>
        </div>
      </div>
    </div>
  );
}
