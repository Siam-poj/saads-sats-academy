import React, { useState } from 'react';
import {
  Flame,
  Award,
  Zap,
  BookOpen,
  FileCheck,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Timer,
  CheckCircle2,
  Divide,
  Layers,
  BookMarked
} from 'lucide-react';
import { Navbar, ActiveTab } from './components/Navbar';
import { DailySprintView } from './components/DailySprintView';
import { SubjectPracticeView } from './components/SubjectPracticeView';
import { MockExamSimulatorView } from './components/MockExamSimulatorView';
import { ParentDashboardView } from './components/ParentDashboardView';
import { BadgeModal } from './components/BadgeModal';
import { useGamification } from './hooks/useGamification';
import { useSound } from './hooks/useSound';
import { useTheme } from './hooks/useTheme';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('sprint');
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState<boolean>(false);

  const { theme, isDark, toggleTheme } = useTheme();

  const {
    stats,
    badges,
    levelInfo,
    newlyUnlockedBadge,
    clearNewBadge,
    recordSprintCompletion,
    resetAllProgress,
    unlockBadge
  } = useGamification();

  const {
    soundEnabled,
    toggleSound,
    playCorrect,
    playIncorrect,
    playClick,
    playLevelUp,
    playFanfare,
    playTick
  } = useSound();

  const handleAwardXp = (amount: number) => {
    // XP awarded in practice
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      {/* Top Navigation */}
      <Navbar
        stats={stats}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onOpenBadges={() => setIsBadgeModalOpen(true)}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Main Body */}
      <main className="flex-1 pb-16">
        {/* Dynamic Greeting & XP Progress Header Strip */}
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-800 dark:from-indigo-950 dark:via-indigo-900 dark:to-slate-950 text-white border-b border-indigo-900/20 dark:border-slate-800 py-3.5 px-4 sm:px-6 transition-colors duration-200">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3 text-center md:text-left">
              <div className="w-11 h-11 rounded-2xl bg-amber-400 text-indigo-950 font-black text-xl flex items-center justify-center shadow-md">
                🎓
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-extrabold flex items-center gap-2 justify-center md:justify-start">
                  <span>Welcome, {stats.learnerName}!</span>
                  <span className="text-amber-300 text-xs sm:text-sm font-bold flex items-center gap-1">
                    <Flame className="w-4 h-4 fill-amber-300" />
                    Day {stats.streakDays}
                  </span>
                </h2>
                <p className="text-xs text-indigo-100 dark:text-indigo-200 font-medium">
                  Year 6 SATs Masterclass • Maths, SPaG & Reading
                </p>
              </div>
            </div>

            {/* Level Progress Bar */}
            <div className="w-full md:w-72 bg-white/10 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-white/10 dark:border-slate-700/60 text-xs">
              <div className="flex items-center justify-between mb-1 font-bold">
                <span className="text-amber-300 flex items-center gap-1 text-[11px] sm:text-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  Level {levelInfo.level}: {levelInfo.title}
                </span>
                <span className="text-indigo-200 dark:text-indigo-300 text-[10px] sm:text-xs">
                  {stats.xp} / {levelInfo.nextLevelXp} XP
                </span>
              </div>
              <div className="w-full bg-indigo-950/40 dark:bg-slate-950 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-400 to-amber-300 h-2 rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${levelInfo.progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* View Switcher Container */}
        <div className="pt-2">
          {/* Tab 1: Daily Sprint (All Subjects Combined in 10-Min Rapid Timer) */}
          {activeTab === 'sprint' && (
            <DailySprintView
              onSprintComplete={recordSprintCompletion}
              onGoToPractice={() => setActiveTab('maths')}
              playSound={{
                playCorrect,
                playIncorrect,
                playClick,
                playLevelUp,
                playFanfare,
                playTick
              }}
            />
          )}

          {/* Tab 2: KS2 Maths (Arithmetic Paper 1 & Reasoning Papers 2 & 3) */}
          {activeTab === 'maths' && (
            <SubjectPracticeView
              subjectType="maths"
              playSound={{
                playCorrect,
                playIncorrect,
                playClick,
                playLevelUp
              }}
              onAwardXp={handleAwardXp}
            />
          )}

          {/* Tab 3: KS2 English SPaG (Grammar, Punctuation & Spelling) */}
          {activeTab === 'spag' && (
            <SubjectPracticeView
              subjectType="spag"
              playSound={{
                playCorrect,
                playIncorrect,
                playClick,
                playLevelUp
              }}
              onAwardXp={handleAwardXp}
            />
          )}

          {/* Tab 4: KS2 English Reading Comprehension */}
          {activeTab === 'reading' && (
            <SubjectPracticeView
              subjectType="reading"
              playSound={{
                playCorrect,
                playIncorrect,
                playClick,
                playLevelUp
              }}
              onAwardXp={handleAwardXp}
            />
          )}

          {/* Tab 5: Mock Exam Simulator */}
          {activeTab === 'mock' && (
            <MockExamSimulatorView
              playSound={{
                playClick,
                playCorrect,
                playFanfare
              }}
            />
          )}

          {/* Tab 6: Parent & Sibling Diagnostic Portal */}
          {activeTab === 'parent' && (
            <ParentDashboardView
              stats={stats}
              onResetProgress={resetAllProgress}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500 dark:text-slate-400 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-indigo-700 dark:text-indigo-400">Saad's SATs Academy</span>
            <span>• UK Department for Education KS2 Curriculum</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500">
            <span>Offline PWA Ready</span>
            <span>•</span>
            <span>Maths</span>
            <span>•</span>
            <span>SPaG</span>
            <span>•</span>
            <span>Reading</span>
          </div>
        </div>
      </footer>

      {/* Badge Showcase Modal */}
      <BadgeModal
        isOpen={isBadgeModalOpen}
        onClose={() => setIsBadgeModalOpen(false)}
        badges={badges}
        xp={stats.xp}
      />
    </div>
  );
}
export default App;
