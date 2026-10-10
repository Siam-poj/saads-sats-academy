import React from 'react';
import {
  Award,
  X,
  Lock,
  Sparkles,
  Zap,
  Divide,
  Search,
  Timer,
  Edit3,
  Flame,
  PieChart
} from 'lucide-react';
import { Badge } from '../types/curriculum';

interface BadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  badges: Badge[];
  xp: number;
}

export const BadgeModal: React.FC<BadgeModalProps> = ({
  isOpen,
  onClose,
  badges,
  xp
}) => {
  if (!isOpen) return null;

  const getIcon = (name: string) => {
    switch (name) {
      case 'Zap':
        return <Zap className="w-6 h-6" />;
      case 'Divide':
        return <Divide className="w-6 h-6" />;
      case 'Search':
        return <Search className="w-6 h-6" />;
      case 'Timer':
        return <Timer className="w-6 h-6" />;
      case 'Edit3':
        return <Edit3 className="w-6 h-6" />;
      case 'Flame':
        return <Flame className="w-6 h-6" />;
      case 'PieChart':
        return <PieChart className="w-6 h-6" />;
      default:
        return <Award className="w-6 h-6" />;
    }
  };

  const unlockedCount = badges.filter((b) => b.isUnlocked).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-indigo-100 dark:border-slate-800 max-h-[90vh] overflow-y-auto transition-colors">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-700 dark:text-amber-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Saad's Trophy Cabinet
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Unlocked {unlockedCount} of {badges.length} SATs Mastery Badges
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                b.isUnlocked
                  ? 'bg-gradient-to-br from-amber-50/50 to-indigo-50/30 dark:from-amber-950/20 dark:to-indigo-950/20 border-amber-200 dark:border-amber-900/60 shadow-2xs'
                  : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 opacity-60'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                  b.isUnlocked
                    ? 'bg-amber-400 text-indigo-950 shadow-md'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                }`}
              >
                {b.isUnlocked ? getIcon(b.iconName) : <Lock className="w-5 h-5" />}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
                    {b.title}
                  </h4>
                  <span className="text-[10px] font-extrabold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5" />
                    +{b.xpReward} XP
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">{b.description}</p>
                {b.isUnlocked && b.unlockedAt && (
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block mt-1.5">
                    ✓ Unlocked
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
