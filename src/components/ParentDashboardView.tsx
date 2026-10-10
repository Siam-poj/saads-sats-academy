import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Unlock,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  BarChart,
  Target,
  RefreshCw
} from 'lucide-react';
import { UserStats } from '../types/curriculum';

interface ParentDashboardViewProps {
  stats: UserStats;
  onResetProgress: () => void;
}

export const ParentDashboardView: React.FC<ParentDashboardViewProps> = ({
  stats,
  onResetProgress
}) => {
  const [pin, setPin] = useState<string>('');
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [pinError, setPinError] = useState<boolean>(false);

  const CORRECT_PIN = '2026';

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === CORRECT_PIN || pin === '') {
      setIsUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  // Diagnostic calculations
  const totalCompleted = stats.completedQuestionsCount || 1;
  const overallAccuracy = Math.round(
    ((stats.correctQuestionsCount || 0) / totalCompleted) * 100
  );

  const topicEntries = Object.entries(stats.topicMastery);
  const weakTopics = topicEntries.filter(
    ([_, data]) => (data.correct / Math.max(1, data.total)) < 0.75
  );
  const strongTopics = topicEntries.filter(
    ([_, data]) => (data.correct / Math.max(1, data.total)) >= 0.75
  );

  if (!isUnlocked) {
    return (
      <div className="max-w-md mx-auto py-12 px-4">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto mb-4 text-indigo-600">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 mb-2">
            Sibling & Parent Portal
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            Enter the 4-digit PIN to access Saad's detailed diagnostic progress, weak spot analysis, and revision insights.
          </p>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <input
                type="password"
                maxLength={4}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setPinError(false);
                }}
                placeholder="Default PIN: 2026"
                className="w-full text-center tracking-widest text-xl font-bold py-3 px-4 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none"
              />
              {pinError && (
                <p className="text-rose-500 text-xs font-semibold mt-1">
                  Incorrect PIN. Hint: 2026
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Dashboard</span>
            </button>

            <button
              type="button"
              onClick={() => setIsUnlocked(true)}
              className="text-xs text-slate-400 hover:text-indigo-600 font-semibold block mx-auto underline pt-1"
            >
              Quick Preview (Skip PIN)
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wide mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Sibling & Parent Diagnostic Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Saad's Revision & Mastery Report
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time analytics benchmarked against UK KS2 SATs expected standards.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsUnlocked(false)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Lock Portal</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-wide block mb-1">
            Overall Accuracy
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-indigo-950">{overallAccuracy}%</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> KS2 on track
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-wide block mb-1">
            Sprints Completed
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-indigo-950">{stats.sprintsCompleted}</span>
            <span className="text-xs font-bold text-slate-500">runs</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-wide block mb-1">
            Active Streak
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-orange-600">{stats.streakDays}</span>
            <span className="text-xs font-bold text-orange-500">days in a row 🔥</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-wide block mb-1">
            Questions Mastered
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-700">{stats.correctQuestionsCount}</span>
            <span className="text-xs text-slate-400">/ {stats.completedQuestionsCount}</span>
          </div>
        </div>
      </div>

      {/* Actionable Weak Spots & Strengths Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Priority Revision Areas (Weak Spots) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">Priority Revision Targets</h3>
              <p className="text-xs text-slate-500">Topics where Saad scored under 75%</p>
            </div>
          </div>

          <div className="space-y-3">
            {weakTopics.length > 0 ? (
              weakTopics.map(([topic, data]) => {
                const percent = Math.round((data.correct / data.total) * 100);
                return (
                  <div key={topic} className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200">
                    <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                      <span>{topic}</span>
                      <span className="text-amber-800 font-extrabold">{percent}% Accuracy</span>
                    </div>
                    <div className="w-full bg-amber-200/50 rounded-full h-2 overflow-hidden mb-2">
                      <div
                        className="bg-amber-500 h-2 rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-amber-900 font-medium">
                      💡 Recommendation: Practice 3 more questions using the column placeholder zero method.
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-900 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>All tested topics are currently meeting or exceeding Year 6 targets!</span>
              </div>
            )}
          </div>
        </div>

        {/* Mastered Strengths */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">Mastered Curriculum Areas</h3>
              <p className="text-xs text-slate-500">High confidence topics (75%+)</p>
            </div>
          </div>

          <div className="space-y-3">
            {strongTopics.map(([topic, data]) => {
              const percent = Math.round((data.correct / data.total) * 100);
              return (
                <div key={topic} className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-200">
                  <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                    <span>{topic}</span>
                    <span className="text-emerald-700 font-extrabold">{percent}%</span>
                  </div>
                  <div className="w-full bg-emerald-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-2 rounded-full"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sprints History Log */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs mb-8">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-indigo-600" />
          Recent Sprint History
        </h3>

        {stats.history && stats.history.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wide">
                  <th className="py-2.5 font-bold">Date</th>
                  <th className="py-2.5 font-bold">Score</th>
                  <th className="py-2.5 font-bold">Accuracy</th>
                  <th className="py-2.5 font-bold">Time Spent</th>
                  <th className="py-2.5 font-bold">XP Earned</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stats.history.map((h, i) => (
                  <tr key={i} className="hover:bg-slate-50/80">
                    <td className="py-3 font-semibold text-slate-700">
                      {new Date(h.date).toLocaleDateString()} {new Date(h.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3 font-bold text-indigo-950">
                      {h.score} / {h.totalQuestions}
                    </td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {Math.round((h.score / h.totalQuestions) * 100)}%
                      </span>
                    </td>
                    <td className="py-3 text-slate-500">
                      {Math.floor(h.timeSpentSeconds / 60)}m {h.timeSpentSeconds % 60}s
                    </td>
                    <td className="py-3 font-bold text-purple-600">+{h.xpEarned} XP</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-slate-500 py-3 italic">
            No completed sprints recorded yet. Complete a 10-Minute Sprint to see history!
          </p>
        )}
      </div>

      {/* Admin Actions */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-600">
          Want to clear progress for a clean test run?
        </span>
        <button
          onClick={onResetProgress}
          className="px-3.5 py-1.5 rounded-xl border border-rose-300 bg-white text-rose-600 hover:bg-rose-50 text-xs font-bold flex items-center gap-1.5 shadow-2xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Demo Progress</span>
        </button>
      </div>
    </div>
  );
};
