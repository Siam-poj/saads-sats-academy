import React from 'react';
import {
  Flame,
  Award,
  Volume2,
  VolumeX,
  ShieldCheck,
  Zap,
  FileCheck,
  Moon,
  Sun,
  Divide,
  Layers,
  BookMarked,
  Sparkles,
  Printer
} from 'lucide-react';
import { UserStats } from '../types/curriculum';
import { getLevelInfo } from '../hooks/useGamification';

export type ActiveTab = 'sprint' | 'maths' | 'spag' | 'reading' | 'mock' | 'parent';

interface NavbarProps {
  stats: UserStats;
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenBadges: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenPrintModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  stats,
  activeTab,
  onTabChange,
  soundEnabled,
  onToggleSound,
  onOpenBadges,
  isDark,
  onToggleTheme,
  onOpenPrintModal
}) => {
  const levelInfo = getLevelInfo(stats.xp);

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 shadow-2xs transition-colors duration-150">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-2 sm:gap-6">
          {/* Brand Logo & Title */}
          <div
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none flex-shrink-0"
            onClick={() => onTabChange('sprint')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center shadow-md text-white font-black text-xl flex-shrink-0">
              <span className="transform -rotate-6">S</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight whitespace-nowrap">
                  Saad's <span className="text-indigo-600 dark:text-indigo-400">SATs</span> Academy
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800 whitespace-nowrap">
                  Year 6
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden sm:block whitespace-nowrap">
                KS2 National Curriculum
              </p>
            </div>
          </div>

          {/* Navigation Tabs (Desktop & Tablet) - All on 1 Clean Line */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
            {/* Daily Sprint */}
            <button
              onClick={() => onTabChange('sprint')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === 'sprint'
                  ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500 flex-shrink-0" />
              <span className="whitespace-nowrap">Daily Sprint</span>
              <span className="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[10px] px-1.5 py-0.5 rounded-md font-bold whitespace-nowrap ml-0.5">
                10m
              </span>
            </button>

            {/* Maths */}
            <button
              onClick={() => onTabChange('maths')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === 'maths'
                  ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
              }`}
            >
              <Divide className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span className="whitespace-nowrap">Maths</span>
            </button>

            {/* SPaG */}
            <button
              onClick={() => onTabChange('spag')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === 'spag'
                  ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
              }`}
            >
              <Layers className="w-4 h-4 text-indigo-500 flex-shrink-0" />
              <span className="whitespace-nowrap">SPaG</span>
            </button>

            {/* Reading */}
            <button
              onClick={() => onTabChange('reading')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === 'reading'
                  ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
              }`}
            >
              <BookMarked className="w-4 h-4 text-purple-500 flex-shrink-0" />
              <span className="whitespace-nowrap">Reading</span>
            </button>

            {/* Mock Papers */}
            <button
              onClick={() => onTabChange('mock')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === 'mock'
                  ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
              }`}
            >
              <FileCheck className="w-4 h-4 text-sky-500 flex-shrink-0" />
              <span className="whitespace-nowrap">Mock Papers</span>
            </button>

            {/* Printable Past Papers Action */}
            {onOpenPrintModal && (
              <button
                onClick={onOpenPrintModal}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100/60 dark:hover:bg-emerald-950/50"
                title="Print official KS2 SATs past papers and mark schemes"
              >
                <Printer className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span className="whitespace-nowrap">Print Past Papers</span>
              </button>
            )}

            {/* Parent */}
            <button
              onClick={() => onTabChange('parent')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === 'parent'
                  ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span className="whitespace-nowrap">Parent</span>
            </button>
          </nav>

          {/* Gamification Stats: Streak, Level & XP, Theme & Audio Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
            {/* Streak Counter (Clean Day 1) */}
            <div
              className="flex items-center gap-1.5 bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900/60 px-2.5 py-1.5 rounded-xl shadow-2xs"
              title={`Day ${stats.streakDays} Practice Streak`}
            >
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span className="font-extrabold text-orange-700 dark:text-orange-400 text-xs sm:text-sm">
                Day {stats.streakDays}
              </span>
            </div>

            {/* Level & XP Mini Card */}
            <button
              onClick={onOpenBadges}
              className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 hover:border-indigo-300 dark:hover:border-indigo-700 px-2.5 py-1.5 rounded-xl transition-transform active:scale-95"
              title={`Level ${levelInfo.level}: ${levelInfo.title} (${stats.xp} / ${levelInfo.nextLevelXp} XP)`}
            >
              <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-extrabold text-indigo-900 dark:text-indigo-200 leading-none">
                    Lvl {levelInfo.level}
                  </span>
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 leading-none">
                    {stats.xp} XP
                  </span>
                </div>
                {/* Embedded Mini Progress Bar */}
                <div className="w-14 sm:w-16 bg-indigo-200 dark:bg-indigo-900 rounded-full h-1 mt-1 overflow-hidden">
                  <div
                    className="bg-indigo-600 dark:bg-indigo-400 h-1 rounded-full"
                    style={{ width: `${levelInfo.progressPercent}%` }}
                  />
                </div>
              </div>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Sound Toggle */}
            <button
              onClick={onToggleSound}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
              title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Horizontal Navigation Scrollbar */}
        <div className="lg:hidden flex items-center justify-between border-t border-slate-200/60 dark:border-slate-800 py-2 overflow-x-auto gap-2">
          <button
            onClick={() => onTabChange('sprint')}
            className={`flex-1 flex flex-col items-center py-1 text-[11px] font-semibold whitespace-nowrap px-2 ${
              activeTab === 'sprint' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <Zap className="w-4 h-4 mb-0.5 text-amber-500" />
            <span>Sprint</span>
          </button>
          <button
            onClick={() => onTabChange('maths')}
            className={`flex-1 flex flex-col items-center py-1 text-[11px] font-semibold whitespace-nowrap px-2 ${
              activeTab === 'maths' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <Divide className="w-4 h-4 mb-0.5 text-emerald-500" />
            <span>Maths</span>
          </button>
          <button
            onClick={() => onTabChange('spag')}
            className={`flex-1 flex flex-col items-center py-1 text-[11px] font-semibold whitespace-nowrap px-2 ${
              activeTab === 'spag' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <Layers className="w-4 h-4 mb-0.5 text-indigo-500" />
            <span>SPaG</span>
          </button>
          <button
            onClick={() => onTabChange('reading')}
            className={`flex-1 flex flex-col items-center py-1 text-[11px] font-semibold whitespace-nowrap px-2 ${
              activeTab === 'reading' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <BookMarked className="w-4 h-4 mb-0.5 text-purple-500" />
            <span>Reading</span>
          </button>
          <button
            onClick={() => onTabChange('mock')}
            className={`flex-1 flex flex-col items-center py-1 text-[11px] font-semibold whitespace-nowrap px-2 ${
              activeTab === 'mock' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <FileCheck className="w-4 h-4 mb-0.5 text-sky-500" />
            <span>Mock</span>
          </button>
          {onOpenPrintModal && (
            <button
              onClick={onOpenPrintModal}
              className="flex-1 flex flex-col items-center py-1 text-[11px] font-semibold whitespace-nowrap px-2 text-emerald-600 dark:text-emerald-400"
            >
              <Printer className="w-4 h-4 mb-0.5 text-emerald-500" />
              <span>Print</span>
            </button>
          )}
          <button
            onClick={() => onTabChange('parent')}
            className={`flex-1 flex flex-col items-center py-1 text-[11px] font-semibold whitespace-nowrap px-2 ${
              activeTab === 'parent' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <ShieldCheck className="w-4 h-4 mb-0.5 text-slate-500" />
            <span>Parent</span>
          </button>
        </div>
      </div>
    </header>
  );
};
