import React, { useState, useEffect } from 'react';
import { Sparkles, MessageCircle, X } from 'lucide-react';

export type MascotMood = 'greeting' | 'thinking' | 'correct' | 'incorrect' | 'streak' | 'encouraging';

interface MascotCompanionProps {
  mood?: MascotMood;
  customMessage?: string;
  learnerName?: string;
}

const SAT_TIPS = [
  "Top SATs Tip: In Paper 1 Arithmetic, always check if your final fraction can be simplified!",
  "In SPaG, remember that a relative clause starts with who, which, where, when, whose or that!",
  "Multiply across for fractions: numerator × numerator, denominator × denominator. Super simple!",
  "Don't rush multi-digit multiplication: always put the placeholder zero before multiplying by the tens digit!",
  "Subjunctive mood rule: Use 'If I were...' rather than 'If I was...' for hypothetical wishes!",
  "Keep your bus-stop remainders tiny and neat so you don't confuse them with the main digits!"
];

export const MascotCompanion: React.FC<MascotCompanionProps> = ({
  mood = 'greeting',
  customMessage,
  learnerName = 'Saad'
}) => {
  const [tipIndex, setTipIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % SAT_TIPS.length);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const getMoodContent = () => {
    if (customMessage) {
      return {
        speech: customMessage,
        badge: 'Coach Pip',
        color: 'border-indigo-200 dark:border-indigo-800 bg-indigo-50/80 dark:bg-slate-800/90 text-slate-900 dark:text-slate-100'
      };
    }

    switch (mood) {
      case 'correct':
        return {
          speech: `Spot on, ${learnerName}! That's how a Year 6 champion handles SATs! 🎯`,
          badge: 'Brilliant!',
          color: 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/90 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200'
        };
      case 'incorrect':
        return {
          speech: `No worries, ${learnerName}! Mistakes are where the real learning happens. Check the step-by-step breakdown! 💪`,
          badge: 'Keep Going!',
          color: 'border-amber-200 dark:border-amber-800 bg-amber-50/90 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200'
        };
      case 'streak':
        return {
          speech: `You're on fire! Consistency is the secret weapon to smashing your KS2 SATs! 🔥`,
          badge: 'Streak Master',
          color: 'border-orange-200 dark:border-orange-800 bg-orange-50/90 dark:bg-orange-950/40 text-orange-900 dark:text-orange-200'
        };
      case 'thinking':
        return {
          speech: `Take your time! Read the question carefully and jot your steps on the scratchpad. 🧠`,
          badge: 'Focus Mode',
          color: 'border-sky-200 dark:border-sky-800 bg-sky-50/90 dark:bg-sky-950/40 text-sky-900 dark:text-sky-200'
        };
      case 'greeting':
      default:
        return {
          speech: `Welcome back, ${learnerName}! ${SAT_TIPS[tipIndex]}`,
          badge: 'Daily Study Tip',
          color: 'border-indigo-100 dark:border-slate-800 bg-white/95 dark:bg-slate-800/95 text-slate-800 dark:text-slate-100'
        };
    }
  };

  const { speech, badge, color } = getMoodContent();

  if (isDismissed) {
    return (
      <button
        onClick={() => setIsDismissed(false)}
        className="fixed bottom-4 right-4 z-40 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110"
        title="Open Companion"
      >
        <span className="text-xl">🦉</span>
      </button>
    );
  }

  return (
    <div className="relative flex items-center gap-3">
      {/* Animated Mascot Avatar */}
      <div className="relative group cursor-pointer flex-shrink-0" onClick={() => setTipIndex((prev) => (prev + 1) % SAT_TIPS.length)}>
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center p-0.5 shadow-md transform transition-transform group-hover:scale-105">
          <div className="w-full h-full rounded-[14px] bg-white/20 dark:bg-black/30 flex items-center justify-center text-3xl sm:text-4xl select-none">
            {mood === 'correct' ? '🎉' : mood === 'incorrect' ? '🧐' : mood === 'streak' ? '⚡' : '🦉'}
          </div>
        </div>
        <div className="absolute -bottom-1 -right-1 bg-amber-400 text-indigo-950 font-black text-[10px] px-1.5 py-0.5 rounded-full shadow-sm flex items-center gap-0.5">
          <Sparkles className="w-2.5 h-2.5" />
          <span>PIP</span>
        </div>
      </div>

      {/* Speech Bubble */}
      <div className={`relative flex-1 p-3 sm:p-3.5 rounded-2xl border shadow-sm transition-all duration-300 ${color}`}>
        <div className="absolute -left-2 top-5 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-inherit" />

        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
            <MessageCircle className="w-3 h-3" />
            {badge}
          </span>
          <button
            onClick={() => setIsDismissed(true)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-0.5 rounded-md"
            title="Dismiss bubble"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-xs sm:text-sm font-medium leading-relaxed">
          {speech}
        </p>
      </div>
    </div>
  );
};
