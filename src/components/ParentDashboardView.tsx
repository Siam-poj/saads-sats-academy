import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Lock,
  Unlock,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Sparkles,
  RefreshCw,
  Search,
  BookOpen,
  Award,
  FileText,
  ChevronDown,
  ChevronUp,
  RotateCcw
} from 'lucide-react';
import { UserStats } from '../types/curriculum';
import { PAST_PAPERS } from '../data/pastPapersData';
import { SPRINT_SAMPLE_QUESTIONS } from '../data/sprintQuestions';
import { PRACTICE_EXTRA_QUESTIONS } from '../data/practiceQuestions';

interface ParentDashboardViewProps {
  stats: UserStats;
  onResetProgress: () => void;
  onResetMasteredQuestions?: () => void;
}

export const ParentDashboardView: React.FC<ParentDashboardViewProps> = ({
  stats,
  onResetProgress,
  onResetMasteredQuestions
}) => {
  const [pin, setPin] = useState<string>('');
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [pinError, setPinError] = useState<boolean>(false);

  // Active view tab inside parent portal
  const [parentTab, setParentTab] = useState<'analytics' | 'mark-schemes' | 'mastery'>('analytics');

  // Mark scheme search and filters
  const [markSchemeSearch, setMarkSchemeSearch] = useState<string>('');
  const [markSchemeSubject, setMarkSchemeSubject] = useState<'all' | 'maths' | 'spag' | 'reading'>('all');
  const [expandedPaperId, setExpandedPaperId] = useState<string | null>(PAST_PAPERS[0]?.id || null);

  const CORRECT_PIN = '25012011';

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === CORRECT_PIN) {
      setIsUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

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

  const masteredIds = stats.masteredQuestionIds || [];
  const allBankQuestions = useMemo(() => [...SPRINT_SAMPLE_QUESTIONS, ...PRACTICE_EXTRA_QUESTIONS], []);

  // Filtered mark schemes
  const filteredPapers = useMemo(() => {
    return PAST_PAPERS.filter((paper) => {
      if (markSchemeSubject !== 'all' && paper.subject !== markSchemeSubject) return false;
      if (!markSchemeSearch.trim()) return true;
      const q = markSchemeSearch.toLowerCase();
      const matchTitle = paper.title.toLowerCase().includes(q) || paper.paperCode.toLowerCase().includes(q);
      const matchQuestions = paper.questions.some(
        (qst) =>
          qst.prompt.toLowerCase().includes(q) ||
          qst.markScheme.answer.toLowerCase().includes(q) ||
          (qst.equation && qst.equation.toLowerCase().includes(q))
      );
      return matchTitle || matchQuestions;
    });
  }, [markSchemeSubject, markSchemeSearch]);

  const filteredBankQuestions = useMemo(() => {
    return allBankQuestions.filter((q) => {
      if (markSchemeSubject === 'maths' && !q.subject.includes('maths')) return false;
      if (markSchemeSubject === 'spag' && q.subject !== 'english-spag') return false;
      if (markSchemeSubject === 'reading' && q.subject !== 'english-reading') return false;

      if (!markSchemeSearch.trim()) return true;
      const term = markSchemeSearch.toLowerCase();
      return (
        q.title.toLowerCase().includes(term) ||
        q.prompt.toLowerCase().includes(term) ||
        String(q.correctAnswer).toLowerCase().includes(term) ||
        (q.satsPaperReference && q.satsPaperReference.toLowerCase().includes(term)) ||
        q.stepByStepExplanation.methodName.toLowerCase().includes(term)
      );
    });
  }, [allBankQuestions, markSchemeSubject, markSchemeSearch]);

  if (!isUnlocked) {
    return (
      <div className="max-w-md mx-auto py-12 px-4">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl text-center transition-colors">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 flex items-center justify-center mx-auto mb-4 text-indigo-600 dark:text-indigo-400">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">
            Sibling & Parent Portal
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
            Enter the Parent PIN to access official KS2 SATs mark schemes, diagnostic reports, and question mastery settings.
          </p>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <input
                type="password"
                maxLength={12}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setPinError(false);
                }}
                placeholder="Enter PIN"
                className="w-full text-center tracking-widest text-xl font-bold py-3.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-indigo-600 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-950 outline-none transition-all"
                autoFocus
              />
              {pinError && (
                <p className="text-rose-500 text-xs font-semibold mt-2">
                  Incorrect PIN. Please enter the valid parent PIN.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Parent Dashboard</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1680px] mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4 transition-colors">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wide mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Sibling & Parent Diagnostic Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Saad's Revision, Mark Schemes & Mastery
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Official Key Stage 2 SATs mark schemes, question retirement tracking, and diagnostic performance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsUnlocked(false)}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Lock Portal</span>
          </button>
        </div>
      </div>

      {/* Internal Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 mb-6 overflow-x-auto">
        <button
          onClick={() => setParentTab('analytics')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
            parentTab === 'analytics'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Diagnostic Analytics</span>
        </button>

        <button
          onClick={() => setParentTab('mark-schemes')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
            parentTab === 'mark-schemes'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Official SATs Mark Schemes</span>
        </button>

        <button
          onClick={() => setParentTab('mastery')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
            parentTab === 'mastery'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Mastered Questions ({masteredIds.length})</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: DIAGNOSTIC ANALYTICS                              */}
      {/* ======================================================== */}
      {parentTab === 'analytics' && (
        <>
          {/* Summary KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
              <span className="text-slate-400 dark:text-slate-400 text-xs font-bold uppercase tracking-wide block mb-1">
                Overall Accuracy
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-indigo-950 dark:text-white">{overallAccuracy}%</span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" /> KS2 on track
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
              <span className="text-slate-400 dark:text-slate-400 text-xs font-bold uppercase tracking-wide block mb-1">
                Sprints Completed
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-indigo-950 dark:text-white">{stats.sprintsCompleted}</span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">runs</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
              <span className="text-slate-400 dark:text-slate-400 text-xs font-bold uppercase tracking-wide block mb-1">
                Active Streak
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-orange-600 dark:text-orange-400">{stats.streakDays}</span>
                <span className="text-xs font-bold text-orange-500 dark:text-orange-400">day{stats.streakDays === 1 ? '' : 's'} 🔥</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
              <span className="text-slate-400 dark:text-slate-400 text-xs font-bold uppercase tracking-wide block mb-1">
                Questions Mastered
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-emerald-700 dark:text-emerald-400">{masteredIds.length}</span>
                <span className="text-xs text-slate-400 dark:text-slate-500">retired</span>
              </div>
            </div>
          </div>

          {/* Actionable Weak Spots & Strengths Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Priority Revision Areas */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">Priority Revision Targets</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Topics where Saad scored under 75%</p>
                </div>
              </div>

              <div className="space-y-3">
                {weakTopics.length > 0 ? (
                  weakTopics.map(([topic, data]) => {
                    const percent = Math.round((data.correct / data.total) * 100);
                    return (
                      <div key={topic} className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50">
                        <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                          <span>{topic}</span>
                          <span className="text-amber-800 dark:text-amber-300 font-extrabold">{percent}% Accuracy</span>
                        </div>
                        <div className="w-full bg-amber-200/50 dark:bg-amber-950/50 rounded-full h-2 overflow-hidden mb-2">
                          <div
                            className="bg-amber-500 h-2 rounded-full"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-amber-900 dark:text-amber-300 font-medium">
                          💡 Recommendation: Check the Mark Scheme tab for step-by-step methods and acceptable answers.
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2 border border-emerald-200 dark:border-emerald-800/40">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span>All tested topics are currently meeting or exceeding Year 6 targets!</span>
                  </div>
                )}
              </div>
            </div>

            {/* Mastered Strengths */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">Mastered Curriculum Areas</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">High confidence topics (75%+)</p>
                </div>
              </div>

              <div className="space-y-3">
                {strongTopics.map(([topic, data]) => {
                  const percent = Math.round((data.correct / data.total) * 100);
                  return (
                    <div key={topic} className="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/50">
                      <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                        <span>{topic}</span>
                        <span className="text-emerald-700 dark:text-emerald-300 font-extrabold">{percent}%</span>
                      </div>
                      <div className="w-full bg-emerald-100 dark:bg-emerald-950/50 rounded-full h-2 overflow-hidden">
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
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs mb-8 transition-colors">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Recent Sprint History
            </h3>

            {stats.history && stats.history.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wide">
                      <th className="py-2.5 font-bold">Date</th>
                      <th className="py-2.5 font-bold">Score</th>
                      <th className="py-2.5 font-bold">Accuracy</th>
                      <th className="py-2.5 font-bold">Time Spent</th>
                      <th className="py-2.5 font-bold">XP Earned</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {stats.history.map((h, i) => (
                      <tr key={i} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50">
                        <td className="py-3 font-semibold text-slate-700 dark:text-slate-300">
                          {new Date(h.date).toLocaleDateString()} {new Date(h.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="py-3 font-bold text-indigo-950 dark:text-white">
                          {h.score} / {h.totalQuestions}
                        </td>
                        <td className="py-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                            {Math.round((h.score / h.totalQuestions) * 100)}%
                          </span>
                        </td>
                        <td className="py-3 text-slate-500 dark:text-slate-400">
                          {Math.floor(h.timeSpentSeconds / 60)}m {h.timeSpentSeconds % 60}s
                        </td>
                        <td className="py-3 font-bold text-purple-600 dark:text-purple-400">+{h.xpEarned} XP</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-slate-500 dark:text-slate-400 py-3 italic">
                No completed sprints recorded yet. Complete a 10-Minute Sprint to see history!
              </p>
            )}
          </div>
        </>
      )}

      {/* ======================================================== */}
      {/* TAB 2: OFFICIAL SATS MARK SCHEMES & ANSWERS REFERENCE   */}
      {/* ======================================================== */}
      {parentTab === 'mark-schemes' && (
        <div className="space-y-6 mb-8">
          {/* Search & Subject Bar */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={markSchemeSearch}
                onChange={(e) => setMarkSchemeSearch(e.target.value)}
                placeholder="Search question, answer, topic, formula..."
                className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-indigo-600"
              />
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
              {(['all', 'maths', 'spag', 'reading'] as const).map((sub) => (
                <button
                  key={sub}
                  onClick={() => setMarkSchemeSubject(sub)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                    markSchemeSubject === sub
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {sub === 'all' ? 'All Subjects' : sub}
                </button>
              ))}
            </div>
          </div>

          {/* Section 1: Official Past Papers Mark Schemes */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Official Past Exam Papers Mark Schemes ({filteredPapers.length})
              </h2>
            </div>

            <div className="space-y-4">
              {filteredPapers.map((paper) => {
                const isExpanded = expandedPaperId === paper.id;
                return (
                  <div
                    key={paper.id}
                    className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs transition-colors"
                  >
                    <div
                      onClick={() => setExpandedPaperId(isExpanded ? null : paper.id)}
                      className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-xs">
                          {paper.paperCode}
                        </div>
                        <div>
                          <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                            {paper.title}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {paper.year} • {paper.timeAllowed} • {paper.totalMarks} Total Marks
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hidden sm:inline">
                          {isExpanded ? 'Hide Mark Scheme' : `View Mark Scheme (${paper.questions.length} questions)`}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-3">
                        {paper.questions.map((q) => (
                          <div
                            key={q.id}
                            className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs space-y-1.5"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-extrabold text-indigo-700 dark:text-indigo-400">
                                Question {q.number}:
                              </span>
                              <span className="font-bold text-slate-400">{q.marks} mark{q.marks > 1 ? 's' : ''}</span>
                            </div>

                            <p className="font-medium text-slate-800 dark:text-slate-200">
                              {q.prompt} {q.equation && <span className="font-mono font-bold text-indigo-900 dark:text-indigo-200">"{q.equation}"</span>}
                            </p>

                            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 mt-2">
                              <span className="font-bold text-emerald-900 dark:text-emerald-300 block mb-0.5">
                                ✅ Correct Answer: <span className="font-mono text-sm">{q.markScheme.answer}</span>
                              </span>
                              {q.markScheme.acceptable && q.markScheme.acceptable.length > 0 && (
                                <p className="text-[11px] text-emerald-800 dark:text-emerald-400">
                                  Acceptable alternatives: {q.markScheme.acceptable.join(', ')}
                                </p>
                              )}
                              {q.markScheme.guidance && (
                                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 italic">
                                  Marking Guidance: {q.markScheme.guidance}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Online Practice Bank Questions Mark Schemes */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Interactive Practice & Sprint Questions Mark Key ({filteredBankQuestions.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredBankQuestions.map((q) => (
                <div
                  key={q.id}
                  className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 text-xs space-y-2 shadow-xs transition-colors"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded-lg text-[10px] font-extrabold uppercase bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                      {q.topic}
                    </span>
                    {q.satsPaperReference && (
                      <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800/60">
                        {q.satsPaperReference}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    {q.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    {q.prompt}
                  </p>
                  {q.equationDisplay && (
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-center font-mono font-bold text-indigo-900 dark:text-indigo-200">
                      {q.equationDisplay}
                    </div>
                  )}

                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60">
                    <span className="font-bold text-emerald-900 dark:text-emerald-300 block">
                      Answer: <span className="font-mono text-sm">{String(q.correctAnswer)}</span>
                    </span>
                    {q.acceptableAlternatives && (
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block mt-0.5">
                        Accepts: {q.acceptableAlternatives.join(', ')}
                      </span>
                    )}
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                    <span className="font-extrabold text-indigo-900 dark:text-indigo-300 block">
                      Method: {q.stepByStepExplanation.methodName}
                    </span>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">
                      Takeaway: {q.stepByStepExplanation.keyTakeaway}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: QUESTION MASTERY MANAGER                          */}
      {/* ======================================================== */}
      {parentTab === 'mastery' && (
        <div className="space-y-6 mb-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Never-Repeat Mastery System
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  When Saad answers a question correctly, it is recorded here and permanently retired from future daily sprints and subject practice queues.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {onResetMasteredQuestions && (
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to reset Saad's mastered questions? All retired questions will reappear in his practice pool.")) {
                        onResetMasteredQuestions();
                      }
                    }}
                    className="px-4 py-2.5 rounded-xl border border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 hover:bg-rose-100 text-xs font-bold flex items-center gap-2 transition-all active:scale-95"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Mastered Questions ({masteredIds.length})</span>
                  </button>
                )}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900 mb-6 text-xs text-indigo-950 dark:text-indigo-200">
              📊 <strong>Current Status:</strong> {masteredIds.length} questions mastered. Saad will not see any of these {masteredIds.length} questions again during practice or sprints.
            </div>

            {masteredIds.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {masteredIds.map((id) => {
                  const match = allBankQuestions.find((q) => q.id === id);
                  return (
                    <div
                      key={id}
                      className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Mastered
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">{id}</span>
                      </div>
                      <div className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                        {match ? match.title : id}
                      </div>
                      {match?.satsPaperReference && (
                        <div className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold truncate">
                          {match.satsPaperReference}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs">
                No questions have been mastered yet. As Saad answers questions correctly, they will be registered here and retired.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Admin Actions */}
      <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
          Need to wipe all analytics, streak, and XP for a clean fresh start?
        </span>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to completely reset all progress and start fresh from Day 1?")) {
              onResetProgress();
            }
          }}
          className="px-4 py-2 rounded-xl border border-rose-300 dark:border-rose-800 bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all active:scale-95 whitespace-nowrap"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset All Progress</span>
        </button>
      </div>
    </div>
  );
};
