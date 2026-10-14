import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles, ChevronLeft, ChevronRight, Mail, Clock, RotateCcw } from 'lucide-react';
import TimezoneBridge from './TimezoneBridge';
import LockedLetterChest from './LockedLetterChest';
import VirtualHug from './VirtualHug';

// Import local assets
import slide1 from '../assets/slideshow/slide1.jpg';
import slide2 from '../assets/slideshow/slide2.jpg';
import slide3 from '../assets/slideshow/slide3.jpg';
import slide4 from '../assets/slideshow/slide4.jpg';
import slide5 from '../assets/slideshow/slide5.jpg';
import coupleImg from '../assets/couple.jpg';

export default function BackgroundSlideshow({ onBackToGalaxy }) {
  const slides = [
    {
      id: 1,
      image: slide1,
      title: "Where It All Began",
      subtitle: "Avakin Life • Our First Spark",
      quote: "Two avatars crossing paths in a virtual club... neither of us knew we were meeting our forever home.",
      location: "Virtual Universe"
    },
    {
      id: 2,
      image: slide2,
      title: "Golden Hour Dreams",
      subtitle: "Lying Beneath the Same Sun",
      quote: "Even when miles separate our hands, our souls rest in the exact same field of warmth.",
      location: "In My Daydreams"
    },
    {
      id: 3,
      image: slide3,
      title: "Cozy Late Night Calls",
      subtitle: "Whispers Across The Ocean",
      quote: "Falling asleep listening to you laugh on call is the sweetest comfort in this entire universe.",
      location: "India 🇮🇳 ⇄ 🇵🇭 Philippines"
    },
    {
      id: 4,
      image: slide4,
      title: "The Midnight Guardian",
      subtitle: "Under the Moonlit Castle",
      quote: "My love will wrap around you like angel wings through the darkest nights. You are always safe with me.",
      location: "Cebuano Midnight Sky"
    },
    {
      id: 5,
      image: slide5,
      title: "My Royal Crown Princess",
      subtitle: "Gothic Elegant Devotion",
      quote: "Palangga kaayo tika, akong langga. In every timeline and every realm, I will always choose only you.",
      location: "My Eternal Queen"
    },
    {
      id: 6,
      image: coupleImg,
      title: "Our Sacred Embrace",
      subtitle: "Forever Bound at the Core",
      quote: "No amount of distance can weaken what was written in the stars. Happy Monthsary, my darling.",
      location: "Center of Gravity"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('slideshow'); // 'slideshow' | 'chest' | 'clocks' | 'hug'
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  // Transition to next slide with random interval between 4.8s and 7.5s
  useEffect(() => {
    if (isPaused) return;

    const randomInterval = Math.floor(Math.random() * 2700) + 4800;

    timerRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, randomInterval);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, isPaused, slides.length]);

  const goToSlide = (index) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setCurrentIndex(index);
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="fixed inset-0 w-full h-[100dvh] bg-black text-white overflow-hidden select-none flex flex-col justify-between">
      
      {/* ======================================================== */}
      {/* BACKGROUND CROSS-FADING & BLENDING IMAGE LAYERS */}
      {/* ======================================================== */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {slides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-[2200ms] ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Mobile-optimized Ken Burns zoom & crop */}
              <div
                className={`w-full h-full transform-gpu ${
                  isActive ? 'scale-105 transition-transform duration-[7000ms] ease-out' : 'scale-100'
                }`}
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center 20%',
                }}
              />
            </div>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* BLEND & LIGHTING OVERLAYS (SUBTLE, TRANSLUCENT) */}
      {/* ======================================================== */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none z-20" />
      
      <div className="absolute inset-0 pointer-events-none z-20" style={{
        background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0, 0, 0, 0.3) 65%, rgba(0, 0, 0, 0.85) 100%)'
      }} />

      {/* ======================================================== */}
      {/* TOP NAVIGATION / CONTROLS (MOBILE-FIRST) */}
      {/* ======================================================== */}
      <header className="relative z-30 pt-safe px-3 pt-3 sm:px-6 sm:pt-6 flex items-center justify-between w-full max-w-lg mx-auto shrink-0">
        
        {/* Back to Galaxy Button */}
        <button
          onClick={onBackToGalaxy}
          className="liquid-glass-interactive px-3 py-2 rounded-full flex items-center space-x-1.5 text-xs text-purple-200 hover:text-white transition-all shadow-lg active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5 text-purple-400" />
          <span className="font-medium tracking-tight">Galaxy</span>
        </button>

        {/* Feature Modal Quick Toggles */}
        <div className="flex items-center space-x-2">
          
          {/* Dual Clocks Toggle */}
          <button
            onClick={() => setActiveTab(activeTab === 'clocks' ? 'slideshow' : 'clocks')}
            className={`p-2.5 rounded-full liquid-glass-interactive transition-all ${
              activeTab === 'clocks' ? 'border-purple-400 bg-purple-900/80 shadow-[0_0_15px_rgba(168,85,247,0.7)]' : 'text-purple-200'
            }`}
            title="Dual Time Zones"
            aria-label="View Timezones"
          >
            <Clock className="w-4 h-4 text-purple-300" />
          </button>

          {/* Letter Chest Toggle */}
          <button
            onClick={() => setActiveTab(activeTab === 'chest' ? 'slideshow' : 'chest')}
            className={`p-2.5 rounded-full liquid-glass-interactive relative transition-all ${
              activeTab === 'chest'
                ? 'border-purple-400 bg-purple-900/80 shadow-[0_0_20px_rgba(192,132,252,0.9)]'
                : 'border-purple-400/60 shadow-[0_0_15px_rgba(168,85,247,0.6)] animate-pulse'
            }`}
            title="Unlock Secret Letter"
            aria-label="Unlock Secret Letter"
          >
            <Mail className="w-4 h-4 text-amber-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
          </button>

          {/* Virtual Hug Toggle */}
          <button
            onClick={() => setActiveTab(activeTab === 'hug' ? 'slideshow' : 'hug')}
            className={`p-2.5 rounded-full liquid-glass-interactive transition-all ${
              activeTab === 'hug' ? 'border-purple-400 bg-purple-900/80 shadow-[0_0_15px_rgba(244,114,182,0.7)]' : 'text-purple-200'
            }`}
            title="Send Virtual Hug"
            aria-label="Virtual Hug"
          >
            <Heart className="w-4 h-4 fill-pink-400 text-pink-400" />
          </button>
        </div>
      </header>

      {/* ======================================================== */}
      {/* FLOATING MODALS (CHEST, CLOCKS, HUG) */}
      {/* ======================================================== */}
      {activeTab === 'chest' && (
        <LockedLetterChest onClose={() => setActiveTab('slideshow')} />
      )}

      {activeTab === 'clocks' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="w-full max-w-sm relative my-auto">
            <button
              onClick={() => setActiveTab('slideshow')}
              className="absolute -top-3 -right-3 z-50 w-9 h-9 rounded-full bg-zinc-900 border border-purple-400/50 flex items-center justify-center text-purple-200 hover:text-white shadow-xl active:scale-90"
            >
              ✕
            </button>
            <TimezoneBridge />
          </div>
        </div>
      )}

      {activeTab === 'hug' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="w-full max-w-sm relative my-auto">
            <button
              onClick={() => setActiveTab('slideshow')}
              className="absolute -top-3 -right-3 z-50 w-9 h-9 rounded-full bg-zinc-900 border border-purple-400/50 flex items-center justify-center text-purple-200 hover:text-white shadow-xl active:scale-90"
            >
              ✕
            </button>
            <VirtualHug />
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SINGLE CENTERED CONTAINER: CAROUSEL CARD & GLOWING CONTRAST TEXT BELOW    */}
      {/* Positioned slightly below vertical center (translate-y-[6%] on mobile)    */}
      {/* ========================================================================= */}
      <main className="relative z-30 flex-1 flex flex-col items-center justify-center w-full px-4 py-2 pointer-events-none">
        
        <div className="w-full max-w-md mx-auto flex flex-col items-center text-center pointer-events-auto transform translate-y-[6%] sm:translate-y-[8%] transition-transform">
          
          {/* ======================================================== */}
          {/* MAIN CAROUSEL CARD (LOW BLUR FOR HIGH PHOTO VISIBILITY)  */}
          {/* ======================================================== */}
          <div className="w-full bg-black/30 backdrop-blur-[6px] rounded-3xl p-4 sm:p-5 border border-white/25 shadow-2xl relative transition-all">
            
            {/* Subtitle tag */}
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-purple-950/60 border border-purple-400/30 text-[10px] text-purple-300 mb-1.5 font-medium tracking-wider uppercase">
              <Sparkles className="w-3 h-3 text-purple-400" />
              <span>{currentSlide.subtitle}</span>
            </div>

            <h2 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide drop-shadow-md">
              {currentSlide.title}
            </h2>

            <p className="mt-1.5 text-xs text-purple-100 font-normal leading-relaxed italic line-clamp-3 drop-shadow">
              "{currentSlide.quote}"
            </p>

            {/* Navigation & Progress */}
            <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between">
              
              <button
                onClick={() => goToSlide((currentIndex - 1 + slides.length) % slides.length)}
                className="p-1 rounded-full hover:bg-white/15 text-purple-200 active:scale-90 transition-transform"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Pagination dots */}
              <div className="flex items-center space-x-1.5">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      idx === currentIndex
                        ? 'w-6 bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.9)]'
                        : 'w-1.5 bg-white/30'
                    }`}
                    aria-label={`Go to photo ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => goToSlide((currentIndex + 1) % slides.length)}
                className="p-1 rounded-full hover:bg-white/15 text-purple-200 active:scale-90 transition-transform"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>

          {/* ======================================================== */}
          {/* CONTRASTING GLOWING CALLOUT TEXT UNDERNEATH (NO PILL)     */}
          {/* ======================================================== */}
          <div className="mt-3.5 px-2">
            <p className="text-xs sm:text-sm font-semibold tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] [text-shadow:_0_0_10px_rgba(255,255,255,0.9),_0_0_20px_rgba(192,132,252,0.9),_0_0_32px_rgba(147,51,234,0.85)] animate-pulse text-center">
              Tap icons on top right for letter 💌 & timezone ⏱️
            </p>
          </div>

        </div>

      </main>

      {/* Safe area bottom spacing */}
      <div className="pb-safe h-3 shrink-0 pointer-events-none" />

    </div>
  );
}
