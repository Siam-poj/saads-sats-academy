import React, { useState } from 'react';
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

  const { isDark, toggleTheme } = useTheme();

  const {
    stats,
    badges,
    recordSprintCompletion,
    recordPracticeAnswer,
    resetAllProgress,
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

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-150">
      {/* Sleek, Single Consolidated Header */}
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

      {/* Main Content Workspace */}
      <main className="flex-1 pb-12 pt-2">
        {/* Tab 1: Daily Sprint (Combined All Subjects 10-Min Rapid Timer) */}
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

        {/* Tab 2: KS2 Maths */}
        {activeTab === 'maths' && (
          <SubjectPracticeView
            subjectType="maths"
            playSound={{
              playCorrect,
              playIncorrect,
              playClick,
              playLevelUp
            }}
            onAwardXp={() => {}}
            onRecordAnswer={recordPracticeAnswer}
          />
        )}

        {/* Tab 3: KS2 English SPaG */}
        {activeTab === 'spag' && (
          <SubjectPracticeView
            subjectType="spag"
            playSound={{
              playCorrect,
              playIncorrect,
              playClick,
              playLevelUp
            }}
            onAwardXp={() => {}}
            onRecordAnswer={recordPracticeAnswer}
          />
        )}

        {/* Tab 4: KS2 English Reading */}
        {activeTab === 'reading' && (
          <SubjectPracticeView
            subjectType="reading"
            playSound={{
              playCorrect,
              playIncorrect,
              playClick,
              playLevelUp
            }}
            onAwardXp={() => {}}
            onRecordAnswer={recordPracticeAnswer}
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

        {/* Tab 6: Parent Portal */}
        {activeTab === 'parent' && (
          <ParentDashboardView
            stats={stats}
            onResetProgress={resetAllProgress}
          />
        )}
      </main>

      {/* Clean Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-4 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-indigo-700 dark:text-indigo-400">Saad's SATs Academy</span>
            <span>• Key Stage 2 Year 6 Preparation</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500">
            <span>Offline Ready</span>
            <span>•</span>
            <span>Maths</span>
            <span>•</span>
            <span>SPaG</span>
            <span>•</span>
            <span>Reading</span>
          </div>
        </div>
      </footer>

      {/* Badges Cabinet Modal */}
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
