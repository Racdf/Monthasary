import React, { useState } from 'react';
import { Lock, Unlock, Key, Sparkles, Heart, CheckCircle2, AlertCircle, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import defaultQuestions from '../data/questions.json';
import { playSuccessChime, playKeyUnlockSound } from '../utils/audioEffects';
import Letter from './Letter';

export default function LockedLetterChest({ onClose }) {
  const [questions] = useState(defaultQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [earnedKeys, setEarnedKeys] = useState([]); // [0, 1, 2]
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Phases: 'quiz' | 'unlocking' | 'envelope_sealed' | 'envelope_opening' | 'letter_revealed'
  const [chestPhase, setChestPhase] = useState('quiz');
  
  // Detailed animation sub-steps:
  // 0: idle
  // 1: keys gliding into locks
  // 2: keys turning 90deg
  // 3: shackles popping open
  // 4: locks dissolving & chest lid hinges open
  const [unlockStep, setUnlockStep] = useState(0);

  const currentQ = questions[currentQuestionIndex];

  const handleSelectOption = (index) => {
    setSelectedAnswer(index);

    if (index === currentQ.correctIndex) {
      // CORRECT ANSWER!
      setErrorMessage('');
      playSuccessChime();

      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#c084fc', '#e9d5ff', '#ffffff', '#ffd700']
      });

      const updatedKeys = [...earnedKeys, currentQuestionIndex];
      setEarnedKeys(updatedKeys);

      if (currentQuestionIndex < questions.length - 1) {
        setTimeout(() => {
          setSelectedAnswer(null);
          setCurrentQuestionIndex((prev) => prev + 1);
        }, 750);
      } else {
        // ALL 3 KEYS EARNED -> Start complex chest unlocking sequence!
        setTimeout(() => {
          triggerChestUnlockSequence();
        }, 850);
      }
    } else {
      // INCORRECT ANSWER: Warm Cebuano prompt to try again
      setErrorMessage("Hehe, try again my langga! You know this by heart! 💜");
    }
  };

  const triggerChestUnlockSequence = () => {
    setChestPhase('unlocking');

    // Step 1: Keys glide into keyholes
    setTimeout(() => {
      setUnlockStep(1);
    }, 400);

    // Step 2: Keys turn 90deg with metallic latch audio
    setTimeout(() => {
      setUnlockStep(2);
      playKeyUnlockSound();
    }, 1100);

    // Step 3: Shackles pop open!
    setTimeout(() => {
      setUnlockStep(3);
      playKeyUnlockSound();
    }, 1800);

    // Step 4: Chest lid swings open in 3D perspective + golden beam
    setTimeout(() => {
      setUnlockStep(4);
      confetti({
        particleCount: 65,
        spread: 85,
        origin: { y: 0.5 },
        colors: ['#ffd700', '#c084fc', '#ffffff', '#a855f7']
      });
    }, 2500);

    // Step 5: The white envelope floats out into the center and WAITS for user tap!
    setTimeout(() => {
      setChestPhase('envelope_sealed');
    }, 3600);
  };

  const handleEnvelopeClick = () => {
    if (chestPhase !== 'envelope_sealed') return;

    // Break the wax seal!
    playSuccessChime();
    confetti({
      particleCount: 45,
      spread: 75,
      origin: { y: 0.5 },
      colors: ['#a855f7', '#d8b4fe', '#ffffff', '#ffd700']
    });

    setChestPhase('envelope_opening');

    // Envelope flap opens & message unfolds
    setTimeout(() => {
      setChestPhase('letter_revealed');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex flex-col items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade-in">
      
      {/* Top Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 sm:top-5 sm:right-5 z-50 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-900/90 border border-purple-400/40 flex items-center justify-center text-purple-200 hover:text-white shadow-xl active:scale-90 transition-transform"
        aria-label="Close chest"
      >
        <X className="w-5 h-5" />
      </button>

      {/* ======================================================== */}
      {/* PHASE 5: FULL LETTER REVEALED */}
      {/* ======================================================== */}
      {chestPhase === 'letter_revealed' && (
        <div className="w-full max-w-sm sm:max-w-md my-auto animate-fade-in">
          <Letter />
        </div>
      )}

      {/* ======================================================== */}
      {/* PHASE 4: ENVELOPE FLOATING & WAITING FOR USER TAP */}
      {/* ======================================================== */}
      {(chestPhase === 'envelope_sealed' || chestPhase === 'envelope_opening') && (
        <div className="flex flex-col items-center justify-center text-center animate-fade-in max-w-sm mx-auto px-4">
          
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-400/40 text-purple-300 text-xs mb-4 animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Chest Unlocked!</span>
          </div>

          <h2 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
            Your Secret Letter Has Emerged
          </h2>

          {/* Interactive White Envelope with Purple Heart Stamp */}
          <div
            onClick={handleEnvelopeClick}
            className={`group relative w-64 h-44 sm:w-72 sm:h-48 my-4 bg-gradient-to-br from-white via-slate-50 to-zinc-200 rounded-2xl shadow-[0_0_50px_rgba(192,132,252,0.6)] border-2 border-purple-300/80 cursor-pointer flex items-center justify-center transition-all duration-700 transform hover:scale-105 active:scale-95 ${
              chestPhase === 'envelope_opening' ? 'scale-110 opacity-70' : 'animate-float'
            }`}
          >
            {/* Top Envelope Triangular Flap */}
            <div
              className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-zinc-100 to-white border-b border-purple-200/60 transition-transform duration-700 origin-top [clip-path:polygon(0_0,50%_100%,100%_0)] ${
                chestPhase === 'envelope_opening' ? '-rotate-180 -translate-y-2 opacity-50' : ''
              }`}
            />

            {/* Diagonal Side Folds */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(135deg,transparent_49.5%,rgba(147,51,234,0.4)_50%,transparent_50.5%)]" />

            {/* ======================================================== */}
            {/* PURPLE HEART WAX STAMP SEAL */}
            {/* ======================================================== */}
            <div className="absolute top-[4.5rem] z-20 flex flex-col items-center pointer-events-none">
              <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-purple-900 via-purple-700 to-indigo-800 p-1 border-2 border-amber-300/90 shadow-lg shadow-purple-600/70 flex items-center justify-center animate-pulse">
                <Heart className="w-6 h-6 text-purple-200 fill-purple-300" />
              </div>
            </div>

            {/* Letter Inscription */}
            <div className="mt-14 z-10 text-center pointer-events-none">
              <span className="text-[11px] font-serif uppercase tracking-widest text-zinc-600 font-bold block">
                Para sa Akong Langga
              </span>
              <span className="text-[10px] text-purple-600 font-medium">
                From Pyra 💜
              </span>
            </div>

            {/* Floating Tap Prompt Badge */}
            <div className="absolute -bottom-3 px-3 py-1 rounded-full bg-purple-950/90 border border-purple-400 text-[11px] text-purple-200 font-semibold shadow-lg group-hover:scale-110 transition-transform animate-pulse">
              💌 Tap envelope to open
            </div>
          </div>

          <p className="mt-4 font-serif text-xs sm:text-sm text-purple-200/90 italic animate-pulse">
            *Tap the seal to unfold the letter* ✨
          </p>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PHASE 1 & 2: SIDE-BY-SIDE CHEST & QUESTION CARD                          */}
      {/* ========================================================================= */}
      {(chestPhase === 'quiz' || chestPhase === 'unlocking') && (
        <div className="w-full max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 my-auto px-2">
          
          {/* ======================================================== */}
          {/* LEFT SIDE: REDESIGNED AUTHENTIC TREASURE CHEST */}
          {/* ======================================================== */}
          <div className="w-full max-w-[280px] sm:max-w-[300px] flex flex-col items-center shrink-0">
            
            {/* Chest Header Tag */}
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-purple-950/80 border border-purple-400/40 text-purple-300 text-[10px] mb-2 shadow-md">
              <Sparkles className="w-3 h-3 text-purple-400" />
              <span>Cosmic Heart Chest</span>
            </div>

            {/* 3D Chest Container */}
            <div
              className="relative w-full aspect-[16/12] flex flex-col justify-end"
              style={{ perspective: '800px' }}
            >
              {/* Backlight Glow Behind Chest */}
              <div className="absolute inset-4 bg-gradient-to-t from-purple-800/40 to-amber-500/20 rounded-3xl blur-xl" />

              {/* ======================================================== */}
              {/* CHEST ARROWED LID (HINGES BACKWARDS WHEN UNLOCKED) */}
              {/* ======================================================== */}
              <div
                className={`relative z-20 w-full h-[38%] rounded-t-[34px] bg-gradient-to-r from-purple-950 via-zinc-900 to-purple-950 border-2 border-purple-400/70 shadow-xl overflow-hidden transition-all duration-[1200ms] origin-top ${
                  unlockStep >= 4 ? 'transform -rotateX-[115deg] -translate-y-5 opacity-40' : ''
                }`}
              >
                {/* Gold Arch Bands on Lid */}
                <div className="absolute top-0 bottom-0 left-6 w-3 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 border-x border-amber-600/60" />
                <div className="absolute top-0 bottom-0 right-6 w-3 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 border-x border-amber-600/60" />
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 border-x border-amber-600/60" />

                {/* Metallic Studs / Rivets */}
                <div className="absolute top-2 left-7 w-1.5 h-1.5 rounded-full bg-amber-200 shadow-sm" />
                <div className="absolute top-2 right-7 w-1.5 h-1.5 rounded-full bg-amber-200 shadow-sm" />
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-200 shadow-sm" />

                {/* Lid Rim Specular */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/40" />
              </div>

              {/* Volumetric Light Beams (Erupts when lid opens) */}
              {unlockStep >= 4 && (
                <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none animate-pulse">
                  <div className="w-32 h-44 bg-gradient-to-t from-transparent via-amber-300/40 to-white/70 rounded-full blur-xl transform -translate-y-12" />
                </div>
              )}

              {/* ======================================================== */}
              {/* CHEST BASE: TRANSLUCENT BODY SHOWING ENVELOPE INSIDE */}
              {/* ======================================================== */}
              <div className="relative z-10 w-full h-[64%] rounded-b-2xl bg-gradient-to-b from-purple-950/90 via-zinc-950/80 to-black border-2 border-t-0 border-purple-400/60 p-3 shadow-2xl flex flex-col justify-between overflow-hidden">
                
                {/* Side Reinforcement Bands */}
                <div className="absolute top-0 bottom-0 left-6 w-3 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 border-x border-amber-600/60 opacity-80" />
                <div className="absolute top-0 bottom-0 right-6 w-3 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 border-x border-amber-600/60 opacity-80" />

                {/* Visible White Envelope inside translucent glass */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className={`w-28 h-18 bg-white/60 border border-purple-300/80 rounded-md shadow-inner flex flex-col items-center justify-center transition-all duration-700 ${
                    unlockStep >= 4 ? 'scale-110 shadow-[0_0_30px_rgba(255,255,255,0.8)]' : 'opacity-70 blur-[0.3px]'
                  }`}>
                    <div className="w-4 h-4 rounded-full bg-purple-700 flex items-center justify-center mb-0.5">
                      <Heart className="w-2.5 h-2.5 text-purple-200 fill-purple-200" />
                    </div>
                    <span className="text-[7.5px] font-serif text-zinc-900 tracking-wider font-bold">White Envelope</span>
                  </div>
                </div>

                {/* Progress Key Tracker */}
                <div className="flex justify-between items-center z-10 text-[9px] uppercase tracking-wider text-purple-300 font-bold px-1">
                  <span>Vault</span>
                  <span>{earnedKeys.length}/3 Keys</span>
                </div>

                {/* ======================================================== */}
                {/* 3 AUTHENTIC PADLOCKS WITH SHACKLES & KEYHOLES */}
                {/* ======================================================== */}
                <div className="grid grid-cols-3 gap-1.5 z-20 my-auto pt-1">
                  {[0, 1, 2].map((idx) => {
                    const hasKey = earnedKeys.includes(idx);
                    const isUnlocked = unlockStep >= 3;
                    const isKeyTurning = unlockStep === 2;
                    const isKeyInserting = unlockStep === 1;

                    return (
                      <div key={idx} className="flex flex-col items-center relative">
                        
                        {/* Floating Golden Key */}
                        <div
                          className={`h-5 transition-all duration-700 ${
                            hasKey
                              ? isKeyTurning
                                ? 'translate-y-3.5 rotate-90 scale-110 text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,1)]'
                                : isKeyInserting
                                  ? 'translate-y-2 scale-105 text-amber-300'
                                  : 'translate-y-0 opacity-100 text-amber-400 animate-bounce'
                              : 'opacity-0 -translate-y-2'
                          }`}
                        >
                          <Key className="w-4 h-4 rotate-45" />
                        </div>

                        {/* Real Padlock: Shackle + Lock Body */}
                        <div
                          className={`relative flex flex-col items-center transition-all duration-500 ${
                            unlockStep >= 4 ? 'opacity-0 scale-75 -translate-y-3' : ''
                          }`}
                        >
                          {/* Curved Padlock Shackle */}
                          <div
                            className={`w-6 h-4 border-2 border-b-0 rounded-t-full transition-transform duration-500 origin-bottom-left ${
                              isUnlocked
                                ? 'border-green-400 -translate-y-1.5 -rotate-25 shadow-[0_0_8px_rgba(74,222,128,1)]'
                                : hasKey
                                  ? 'border-amber-300 shadow-[0_0_6px_rgba(251,191,36,0.8)]'
                                  : 'border-purple-300/60'
                            }`}
                          />

                          {/* Solid Padlock Body */}
                          <div
                            className={`w-10 h-10 rounded-lg flex flex-col items-center justify-center border shadow-lg transition-all ${
                              isUnlocked
                                ? 'bg-green-950/80 border-green-400 text-green-300'
                                : hasKey
                                  ? 'bg-gradient-to-b from-amber-700 to-amber-950 border-amber-300 text-amber-200'
                                  : 'bg-zinc-950/90 border-purple-500/40 text-purple-400'
                            }`}
                          >
                            {/* Keyhole */}
                            <div className="w-1.5 h-2.5 bg-black rounded-t-full border border-amber-200/40" />
                            <span className="text-[7.5px] font-bold mt-0.5">
                              {isUnlocked ? 'OPEN' : hasKey ? 'KEY' : `${idx + 1}`}
                            </span>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>

                {/* Bottom Brass Chest Bracket */}
                <div className="w-16 h-1 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 mx-auto rounded-full z-10" />

              </div>
            </div>

          </div>

          {/* ======================================================== */}
          {/* RIGHT SIDE: INTERACTIVE QUESTION CARD */}
          {/* ======================================================== */}
          <div className="w-full max-w-sm sm:max-w-md flex flex-col justify-center">
            {chestPhase === 'quiz' && currentQ && (
              <div className="liquid-glass rounded-3xl p-4 sm:p-5 border border-purple-500/30 text-left shadow-2xl animate-fade-in">
                
                {/* Question Progress Header */}
                <div className="flex items-center justify-between text-xs text-purple-300 font-medium mb-1.5">
                  <span className="font-semibold text-white">Unlock Key {currentQuestionIndex + 1} of 3</span>
                  <span className="text-[10px] bg-purple-900/60 px-2 py-0.5 rounded-full border border-purple-400/30">
                    Question {currentQuestionIndex + 1}
                  </span>
                </div>

                <h3 className="font-serif text-sm sm:text-base font-bold text-white mb-3 leading-snug">
                  {currentQ.question}
                </h3>

                {/* Options List */}
                <div className="space-y-2">
                  {currentQ.options.map((opt, oIdx) => {
                    const isSelected = selectedAnswer === oIdx;
                    const isCorrect = isSelected && oIdx === currentQ.correctIndex;
                    const isWrong = isSelected && oIdx !== currentQ.correctIndex;

                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectOption(oIdx)}
                        className={`w-full p-2.5 sm:p-3 rounded-2xl text-xs sm:text-sm font-medium transition-all text-left flex items-center justify-between border ${
                          isCorrect
                            ? 'bg-purple-600/70 border-green-400 text-white shadow-lg shadow-purple-500/40'
                            : isWrong
                              ? 'bg-red-950/60 border-red-500 text-red-200 animate-shake'
                              : 'bg-black/40 hover:bg-purple-900/40 border-purple-500/25 text-purple-100 hover:text-white'
                        }`}
                      >
                        <span className="pr-2 leading-tight">{opt}</span>
                        {isCorrect && <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />}
                        {isWrong && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Error Message with warm Cebuano prompt */}
                {errorMessage && (
                  <div className="mt-2.5 p-2 rounded-xl bg-red-950/50 border border-red-500/40 text-[11px] text-red-200 text-center animate-pulse">
                    {errorMessage}
                  </div>
                )}

                {/* Helpful Hint */}
                {currentQ.hint && !errorMessage && (
                  <p className="mt-2 text-[10px] text-purple-300/70 italic text-center">
                    💡 Hint: {currentQ.hint}
                  </p>
                )}

              </div>
            )}

            {/* Unlocking In Progress Status */}
            {chestPhase === 'unlocking' && (
              <div className="liquid-glass rounded-3xl p-6 text-center animate-pulse">
                <Sparkles className="w-8 h-8 text-amber-300 mx-auto mb-2 animate-spin-slow" />
                <h4 className="font-serif text-base sm:text-lg font-bold text-white mb-1">
                  Keys Turning in the Keyholes...
                </h4>
                <p className="text-xs text-purple-200">
                  Unlocking the 3 shackles & revealing your secret letter! 🗝️✨
                </p>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
