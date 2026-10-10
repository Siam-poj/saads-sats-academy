import React from 'react';
import {
  Flame,
  Award,
  Volume2,
  VolumeX,
  ShieldCheck,
  Zap,
  BookOpen,
  FileCheck,
  BarChart3,
  Moon,
  Sun
} from 'lucide-react';
import { UserStats } from '../types/curriculum';
import { getLevelInfo } from '../hooks/useGamification';

export type ActiveTab = 'sprint' | 'practice' | 'mock' | 'parent';

interface NavbarProps {
  stats: UserStats;
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenBadges: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  stats,
  activeTab,
  onTabChange,
  soundEnabled,
  onToggleSound,
  onOpenBadges,
  isDark,
  onToggleTheme
}) => {
  const levelInfo = getLevelInfo(stats.xp);

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onTabChange('sprint')}>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center shadow-md text-white font-black text-xl">
              <span className="transform -rotate-6">S</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight">
                  Saad's <span className="text-indigo-600 dark:text-indigo-400">SATs</span> Academy
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800">
                  KS2 DfE
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden sm:block">
                Year 5 → Year 6 SATs Masterclass
              </p>
            </div>
          </div>

          {/* Navigation Links (Desktop & Tablet) */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            <button
              onClick={() => onTabChange('sprint')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'sprint'
                  ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
              }`}
            >
              <Zap className={`w-4 h-4 ${activeTab === 'sprint' ? 'text-amber-500 fill-amber-500' : ''}`} />
              <span>10-Min Sprint</span>
              <span className="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                Daily
              </span>
            </button>

            <button
              onClick={() => onTabChange('practice')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'practice'
                  ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Practice Arena</span>
            </button>

            <button
              onClick={() => onTabChange('mock')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'mock'
                  ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
              }`}
            >
              <FileCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Mock Papers</span>
            </button>

            <button
              onClick={() => onTabChange('parent')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'parent'
                  ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span>Parent Portal</span>
            </button>
          </nav>

          {/* Gamification Stats & Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Streak Counter */}
            <div
              className="flex items-center gap-1.5 bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900/60 px-2.5 py-1.5 rounded-xl shadow-2xs"
              title={`${stats.streakDays} Day SATs Practice Streak!`}
            >
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-bounce-short" />
              <span className="font-extrabold text-orange-700 dark:text-orange-400 text-xs sm:text-sm">
                {stats.streakDays}
              </span>
              <span className="text-[10px] text-orange-600 dark:text-orange-400 hidden sm:inline font-bold">days</span>
            </div>

            {/* Level & XP */}
            <button
              onClick={onOpenBadges}
              className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 hover:border-indigo-300 dark:hover:border-indigo-700 px-2.5 py-1.5 rounded-xl transition-transform hover:scale-102"
              title={`Level ${levelInfo.level}: ${levelInfo.title} (${stats.xp} XP)`}
            >
              <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <div className="flex flex-col text-left">
                <span className="text-[11px] font-extrabold text-indigo-900 dark:text-indigo-200 leading-none">
                  Lvl {levelInfo.level}
                </span>
                <span className="text-[9px] font-bold text-indigo-600 dark:text-indigo-400 leading-none mt-0.5">
                  {stats.xp} XP
                </span>
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
              title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Bottom Sub-nav Bar */}
        <div className="md:hidden flex items-center justify-between border-t border-slate-200/60 dark:border-slate-800 py-2">
          <button
            onClick={() => onTabChange('sprint')}
            className={`flex-1 flex flex-col items-center py-1 text-[11px] font-semibold ${
              activeTab === 'sprint' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <Zap className={`w-4 h-4 mb-0.5 ${activeTab === 'sprint' ? 'text-amber-500 fill-amber-500' : ''}`} />
            <span>Sprint</span>
          </button>
          <button
            onClick={() => onTabChange('practice')}
            className={`flex-1 flex flex-col items-center py-1 text-[11px] font-semibold ${
              activeTab === 'practice' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <BookOpen className="w-4 h-4 mb-0.5" />
            <span>Practice</span>
          </button>
          <button
            onClick={() => onTabChange('mock')}
            className={`flex-1 flex flex-col items-center py-1 text-[11px] font-semibold ${
              activeTab === 'mock' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <FileCheck className="w-4 h-4 mb-0.5" />
            <span>Mock</span>
          </button>
          <button
            onClick={() => onTabChange('parent')}
            className={`flex-1 flex flex-col items-center py-1 text-[11px] font-semibold ${
              activeTab === 'parent' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <BarChart3 className="w-4 h-4 mb-0.5" />
            <span>Parent</span>
          </button>
        </div>
      </div>
    </header>
  );
};
