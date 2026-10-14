import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Heart, Stars } from 'lucide-react';
import CosmicCanvas from './components/CosmicCanvas';
import AudioPlayer from './components/AudioPlayer';
import GlassShatter from './components/GlassShatter';
import BackgroundSlideshow from './components/BackgroundSlideshow';
import { playGlassShatterSound } from './utils/audioEffects';

// Image imports for direct preloading & display
import coupleImg from './assets/couple.jpg';
import slide1 from './assets/slideshow/slide1.jpg';
import slide2 from './assets/slideshow/slide2.jpg';
import slide3 from './assets/slideshow/slide3.jpg';
import slide4 from './assets/slideshow/slide4.jpg';
import slide5 from './assets/slideshow/slide5.jpg';

export default function App() {
  const [currentView, setCurrentView] = useState('greeting'); // 'greeting' | 'slideshow'
  const [isShattering, setIsShattering] = useState(false);
  const [buttonRect, setButtonRect] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const buttonRef = useRef(null);

  // Preload all slideshow images on mount to eliminate any decoding or image loading lag
  useEffect(() => {
    const imagesToPreload = [coupleImg, slide1, slide2, slide3, slide4, slide5];
    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const handleTakeMeThere = () => {
    if (isShattering) return;

    if (buttonRef.current) {
      setButtonRect(buttonRef.current.getBoundingClientRect());
    }

    playGlassShatterSound();
    
    // Start shattering AND start fading in slideshow simultaneously with ease
    setIsShattering(true);
    setIsPlayingAudio(true);
  };

  const handleShatterComplete = () => {
    setCurrentView('slideshow');
    setIsShattering(false);
  };

  const handleBackToGalaxy = () => {
    setCurrentView('greeting');
    setIsShattering(false);
  };

  return (
    <div className="relative min-h-[100dvh] w-full bg-black text-white selection:bg-purple-600 selection:text-white font-sans antialiased overflow-hidden">
      
      {/* Headless AudioPlayer: Completely invisible, background celestial sound only */}
      <AudioPlayer isPlaying={isPlayingAudio} />

      {/* ========================================================================= */}
      {/* BACKGROUND SLIDESHOW LAYER (PRE-RENDERED TO ELIMINATE BLACK SCREEN LAG)   */}
      {/* Fades in smoothly with ease as glass shards burst                         */}
      {/* ========================================================================= */}
      <div
        className={`fixed inset-0 z-0 transition-all duration-[3000ms] ease-out ${
          isShattering || currentView === 'slideshow'
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-105 pointer-events-none'
        }`}
      >
        <BackgroundSlideshow onBackToGalaxy={handleBackToGalaxy} />
      </div>

      {/* ======================================================== */}
      {/* 3D GLASS SHATTER ANIMATION OVERLAY */}
      {/* ======================================================== */}
      {isShattering && (
        <GlassShatter
          buttonRect={buttonRect}
          onComplete={handleShatterComplete}
        />
      )}

      {/* ======================================================== */}
      {/* INITIAL GREETING & BLACK HOLE VIEW */}
      {/* Fades out with ease as shards fly forward */}
      {/* ======================================================== */}
      <div
        className={`relative z-10 min-h-[100dvh] w-full flex flex-col items-center justify-between px-4 py-8 sm:py-12 transition-all duration-[2500ms] ease-out ${
          isShattering || currentView === 'slideshow'
            ? 'opacity-0 scale-95 blur-md pointer-events-none'
            : 'opacity-100 scale-100 pointer-events-auto'
        }`}
      >
        {/* Dynamic Cosmic Canvas */}
        <CosmicCanvas />

        {/* Top Pill Header */}
        <header className="relative z-10 pt-2">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full liquid-glass text-[11px] font-medium text-purple-200 animate-float">
            <Stars className="w-3 h-3 text-purple-400 animate-spin-slow" />
            <span className="tracking-widest uppercase">Happy Monthsary, My Universe</span>
            <Stars className="w-3 h-3 text-purple-400 animate-spin-slow" />
          </div>
        </header>

        {/* Central Black Hole & Event Horizon */}
        <main className="relative z-10 flex flex-col items-center justify-center text-center my-auto w-full max-w-sm">
          
          <div className="relative my-2 sm:my-4 flex items-center justify-center">
            
            {/* Outer Dashed Orbit Ring */}
            <div className="absolute w-[240px] h-[240px] sm:w-[310px] sm:h-[310px] rounded-full border border-purple-500/25 border-dashed animate-spin-slow pointer-events-none" />
            
            {/* Relativistic Accretion Disc */}
            <div className="absolute w-[210px] h-[210px] sm:w-[270px] sm:h-[270px] rounded-full border-2 border-t-purple-400 border-r-white/40 border-b-purple-600/30 border-l-transparent animate-spin-reverse-slow pointer-events-none blur-[0.5px]" />

            {/* Volumetric Purple Vortex Glow */}
            <div className="absolute w-[170px] h-[170px] sm:w-[220px] sm:h-[220px] rounded-full bg-gradient-to-tr from-purple-900/80 via-purple-600/40 to-white/20 blur-xl animate-pulse-glow pointer-events-none" />

            {/* Central Event Horizon Frame */}
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 rounded-full p-[3px] bg-gradient-to-tr from-white via-purple-500 to-purple-800 shadow-[0_0_40px_rgba(168,85,247,0.7),0_0_80px_rgba(126,34,206,0.35)] transition-transform duration-700 active:scale-95 group">
              
              {/* Inner Black Hole Cavity & Picture Container */}
              <div className="w-full h-full rounded-full overflow-hidden bg-black relative border-2 border-black/80">
                
                {/* Provided Couple Picture cropped to embrace */}
                <img
                  src={coupleImg || "/couple.jpg"}
                  alt="Our Sacred Embrace"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/couple.jpg";
                  }}
                  className="w-full h-full object-cover object-[center_30%] scale-105 select-none"
                />

                {/* Luminous Event Horizon Rim Overlay */}
                <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/30 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-950/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Orbiting Sparkle Badge */}
              <div className="absolute -bottom-1 -right-1 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/90 border border-purple-400/80 p-1 flex items-center justify-center shadow-lg shadow-purple-500/50 animate-bounce">
                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-300 fill-purple-400" />
              </div>

            </div>
          </div>

          {/* Cebuano Romantic Copy (Mobile Sized) */}
          <div className="mt-4 px-2">
            <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white drop-shadow-md">
              Welcome, langga <span className="inline-block hover:scale-125 transition-transform duration-300">💜</span>
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-purple-200/90 font-light tracking-wide max-w-xs mx-auto">
              i have a cute little surprise waiting for you inside ✨
            </p>
          </div>

        </main>

        {/* Bottom Action Button (Mobile-First Touch Target) */}
        <footer className="relative z-10 pb-4 w-full max-w-xs mx-auto">
          <button
            ref={buttonRef}
            onClick={handleTakeMeThere}
            disabled={isShattering}
            className={`w-full group relative liquid-glass-interactive py-3.5 px-6 rounded-full flex items-center justify-center space-x-2.5 text-base font-medium text-white tracking-wide cursor-pointer overflow-hidden transition-all duration-300 ${
              isShattering ? 'scale-90 opacity-0' : 'hover:scale-[1.02] active:scale-95'
            }`}
          >
            <div className="absolute inset-0 shimmer-sweep pointer-events-none opacity-40" />
            <Sparkles className="w-4 h-4 text-purple-300 group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-semibold text-white drop-shadow">Take me there!</span>
            <Heart className="w-4 h-4 text-purple-400 fill-purple-400 group-hover:scale-125 transition-transform duration-300" />
          </button>
        </footer>

      </div>

    </div>
  );
}
