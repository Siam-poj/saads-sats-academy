import React, { useState } from 'react';
import {
  BookOpen,
  Filter,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Sparkles,
  PenTool,
  RotateCcw,
  Divide,
  Cpu,
  Layers,
  Search,
  Compass
} from 'lucide-react';
import { Question, Difficulty } from '../types/curriculum';
import { SPRINT_SAMPLE_QUESTIONS } from '../data/sprintQuestions';
import { PRACTICE_EXTRA_QUESTIONS } from '../data/practiceQuestions';
import { ScratchpadCanvas } from './ScratchpadCanvas';

export type SubjectViewType = 'maths' | 'spag' | 'reading';

interface SubjectPracticeViewProps {
  subjectType: SubjectViewType;
  playSound: {
    playCorrect: () => void;
    playIncorrect: () => void;
    playClick: () => void;
    playLevelUp: () => void;
  };
  onAwardXp: (amount: number) => void;
  onRecordAnswer?: (topic: string, isCorrect: boolean, xp: number) => void;
}

export const SubjectPracticeView: React.FC<SubjectPracticeViewProps> = ({
  subjectType,
  playSound,
  onAwardXp,
  onRecordAnswer
}) => {
  const allQuestions = [...SPRINT_SAMPLE_QUESTIONS, ...PRACTICE_EXTRA_QUESTIONS];

  // Filter questions for this specific subject
  const subjectQuestions = allQuestions.filter((q) => {
    if (subjectType === 'maths') {
      return q.subject === 'maths-arithmetic' || q.subject === 'maths-reasoning';
    }
    if (subjectType === 'spag') {
      return q.subject === 'english-spag';
    }
    if (subjectType === 'reading') {
      return q.subject === 'english-reading';
    }
    return true;
  });

  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');
  const [activeQuestionId, setActiveQuestionId] = useState<string>(subjectQuestions[0]?.id || '');
  const [showScratchpad, setShowScratchpad] = useState<boolean>(subjectType === 'maths');

  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submittedStatus, setSubmittedStatus] = useState<Record<string, boolean>>({});
  const [correctnessStatus, setCorrectnessStatus] = useState<Record<string, boolean>>({});
  const [hintLevels, setHintLevels] = useState<Record<string, number>>({});
  const [numericInputs, setNumericInputs] = useState<Record<string, string>>({});

  // Unique topics for this subject
  const topics = Array.from(new Set(subjectQuestions.map((q) => q.topic)));

  const filteredQuestions = subjectQuestions.filter((q) => {
    if (selectedTopic !== 'all' && q.topic !== selectedTopic) return false;
    if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const activeQuestion =
    subjectQuestions.find((q) => q.id === activeQuestionId) ||
    filteredQuestions[0] ||
    subjectQuestions[0];

  const isSubmitted = activeQuestion ? submittedStatus[activeQuestion.id] : false;
  const isCorrect = activeQuestion ? correctnessStatus[activeQuestion.id] : false;
  const currentHint = activeQuestion ? hintLevels[activeQuestion.id] || 0 : 0;
  const currentNumeric = activeQuestion ? numericInputs[activeQuestion.id] || '' : '';

  const checkAnswer = (q: Question, answer: string): boolean => {
    const cleanedUser = answer.trim().toLowerCase().replace(/,/g, '');
    const cleanedCorrect = String(q.correctAnswer).trim().toLowerCase().replace(/,/g, '');
    if (cleanedUser === cleanedCorrect) return true;
    if (q.acceptableAlternatives) {
      return q.acceptableAlternatives.some(
        (alt) => alt.trim().toLowerCase().replace(/,/g, '') === cleanedUser
      );
    }
    return false;
  };

  const handleCheck = (answerOverride?: string) => {
    if (!activeQuestion) return;
    const ans = answerOverride !== undefined ? answerOverride : currentNumeric;
    if (!ans.trim()) return;

    playSound.playClick();
    const correct = checkAnswer(activeQuestion, ans);

    setUserAnswers((prev) => ({ ...prev, [activeQuestion.id]: ans }));
    setSubmittedStatus((prev) => ({ ...prev, [activeQuestion.id]: true }));
    setCorrectnessStatus((prev) => ({ ...prev, [activeQuestion.id]: correct }));

    if (correct) {
      playSound.playCorrect();
      onAwardXp(20);
    } else {
      playSound.playIncorrect();
    }

    if (onRecordAnswer) {
      onRecordAnswer(activeQuestion.topic, correct, 20);
    }
  };

  const handleRevealHint = () => {
    if (!activeQuestion) return;
    playSound.playClick();
    setHintLevels((prev) => {
      const current = prev[activeQuestion.id] || 0;
      const next = Math.min(current + 1, activeQuestion.hints.length);
      return { ...prev, [activeQuestion.id]: next };
    });
  };

  const handleResetCurrent = () => {
    if (!activeQuestion) return;
    playSound.playClick();
    setSubmittedStatus((prev) => ({ ...prev, [activeQuestion.id]: false }));
    setCorrectnessStatus((prev) => ({ ...prev, [activeQuestion.id]: false }));
    setUserAnswers((prev) => ({ ...prev, [activeQuestion.id]: '' }));
    setNumericInputs((prev) => ({ ...prev, [activeQuestion.id]: '' }));
  };

  // Header configs per subject
  const subjectMetadata = {
    maths: {
      title: 'KS2 Mathematics Masterclass',
      subtitle: 'Paper 1 (Arithmetic) & Papers 2 & 3 (Reasoning)',
      description: 'Master column methods, bus-stop division, fractions, percentages, and multi-step word problems.',
      badgeText: '📐 Mathematics Curriculum',
      icon: <Divide className="w-4 h-4 text-emerald-500" />
    },
    spag: {
      title: 'KS2 English SPaG Hub',
      subtitle: 'Paper 1 (Grammar & Punctuation) & Paper 2 (Spelling)',
      description: 'Word classes, colons, semi-colons, active/passive voice, subjunctive mood, and statutory Year 5/6 spellings.',
      badgeText: '📖 SPaG Curriculum',
      icon: <Layers className="w-4 h-4 text-indigo-500" />
    },
    reading: {
      title: 'KS2 Reading Comprehension',
      subtitle: 'Retrieval, Inference, Vocabulary & Authorial Intent',
      description: 'Read engaging narrative and non-fiction texts with official SATs question stems.',
      badgeText: '📚 Reading Paper',
      icon: <BookOpen className="w-4 h-4 text-purple-500" />
    }
  }[subjectType];

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      {/* Subject Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wide mb-2">
            {subjectMetadata.icon}
            <span>{subjectMetadata.badgeText}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {subjectMetadata.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {subjectMetadata.description}
          </p>
        </div>

        {subjectType === 'maths' && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowScratchpad(!showScratchpad)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 border transition-all ${
                showScratchpad
                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <PenTool className="w-4 h-4" />
              <span>{showScratchpad ? 'Hide Scratchpad' : 'Open Scratchpad'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Filter Toolbar: Topics & Tiers */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-800 mb-6 flex flex-wrap items-center justify-between gap-3 text-xs transition-colors">
        {/* Topics Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedTopic('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
              selectedTopic === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            All Topics
          </button>
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTopic(t)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
                selectedTopic === t
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-semibold">Difficulty:</span>
          {(['all', 'Bronze', 'Silver', 'Gold'] as const).map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                selectedDifficulty === diff
                  ? diff === 'Gold'
                    ? 'bg-amber-500 text-white'
                    : diff === 'Silver'
                    ? 'bg-slate-600 text-white'
                    : diff === 'Bronze'
                    ? 'bg-amber-800 text-white'
                    : 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Main Workspace Layout: Question Sidebar + Interactive Card + Optional Scratchpad */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List of Questions */}
        <div className="lg:col-span-4 space-y-2 max-h-[600px] overflow-y-auto pr-1">
          {filteredQuestions.map((q) => {
            const isSelected = q.id === activeQuestion?.id;
            const sub = submittedStatus[q.id];
            const corr = correctnessStatus[q.id];

            return (
              <div
                key={q.id}
                onClick={() => {
                  playSound.playClick();
                  setActiveQuestionId(q.id);
                }}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/60 dark:bg-slate-800 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-850'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
                    {q.topic}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        q.difficulty === 'Gold'
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                          : q.difficulty === 'Silver'
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          : 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-400'
                      }`}
                    >
                      {q.difficulty}
                    </span>
                    {sub && (
                      corr ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                      )
                    )}
                  </div>
                </div>

                <div className="font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-200 line-clamp-2">
                  {q.title}
                </div>
              </div>
            );
          })}
        </div>

        {/* Center / Right: Question Card & Scratchpad */}
        <div className="lg:col-span-8 space-y-4">
          {activeQuestion ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 relative transition-colors">
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-xl text-xs font-black bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300">
                    {activeQuestion.topic}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {activeQuestion.subtopic || activeQuestion.subject}
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-400">{activeQuestion.marks} mark</span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                {activeQuestion.prompt}
              </h2>

              {/* Equation Display (Maths) */}
              {activeQuestion.equationDisplay && (
                <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 text-center mb-5 font-mono text-xl font-bold text-indigo-950 dark:text-indigo-200">
                  {activeQuestion.equationDisplay}
                </div>
              )}

              {/* Context Passage (Reading & SPaG) */}
              {activeQuestion.contextPassage && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm italic text-slate-700 dark:text-slate-300 mb-5 leading-relaxed">
                  {activeQuestion.contextPassage}
                </div>
              )}

              {/* Inputs */}
              {activeQuestion.type === 'multiple-choice' && activeQuestion.options && (
                <div className="space-y-2 mb-6">
                  {activeQuestion.options.map((opt) => {
                    const isUserPick = userAnswers[activeQuestion.id] === opt.label;
                    let style =
                      'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 hover:border-indigo-300 dark:hover:border-indigo-500 hover:bg-indigo-50/30 text-slate-800 dark:text-slate-200';

                    if (isSubmitted) {
                      if (opt.isCorrect) {
                        style =
                          'border-emerald-500 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 font-bold';
                      } else if (isUserPick && !opt.isCorrect) {
                        style =
                          'border-rose-400 dark:border-rose-700 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-300 line-through';
                      }
                    } else if (isUserPick) {
                      style =
                        'border-indigo-600 dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-950 dark:text-indigo-200 font-bold';
                    }

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        disabled={isSubmitted}
                        onClick={() => {
                          setUserAnswers((prev) => ({ ...prev, [activeQuestion.id]: opt.label }));
                          handleCheck(opt.label);
                        }}
                        className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${style}`}
                      >
                        <span>{opt.label}</span>
                        {isSubmitted && opt.isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        )}
                        {isSubmitted && isUserPick && !opt.isCorrect && (
                          <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {activeQuestion.type === 'numeric' && (
                <div className="mb-6">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      disabled={isSubmitted}
                      value={currentNumeric}
                      onChange={(e) =>
                        setNumericInputs((prev) => ({
                          ...prev,
                          [activeQuestion.id]: e.target.value
                        }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !isSubmitted) {
                          handleCheck();
                        }
                      }}
                      placeholder="Enter answer..."
                      className="flex-1 px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base font-bold outline-none focus:border-indigo-600 dark:focus:border-indigo-400"
                    />
                    {!isSubmitted ? (
                      <button
                        onClick={() => handleCheck()}
                        className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-sm"
                      >
                        Check
                      </button>
                    ) : (
                      <button
                        onClick={handleResetCurrent}
                        className="p-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Retry</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Hints & Retry */}
              <div className="flex items-center justify-between gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={handleRevealHint}
                  disabled={currentHint >= activeQuestion.hints.length}
                  className="px-3.5 py-1.5 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-bold flex items-center gap-1.5 disabled:opacity-40"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>
                    {currentHint === 0
                      ? 'Socratic Hint'
                      : `Hint (${currentHint}/${activeQuestion.hints.length})`}
                  </span>
                </button>

                {isSubmitted && (
                  <button
                    onClick={handleResetCurrent}
                    className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Try Again</span>
                  </button>
                )}
              </div>

              {/* Revealed Hints */}
              {currentHint > 0 && (
                <div className="mt-4 p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs space-y-1.5">
                  <span className="font-bold text-amber-900 dark:text-amber-300 block">
                    Socratic Hint:
                  </span>
                  {activeQuestion.hints.slice(0, currentHint).map((h, i) => (
                    <p key={i} className="text-amber-950 dark:text-amber-200 font-medium pl-2 border-l-2 border-amber-400">
                      {h}
                    </p>
                  ))}
                </div>
              )}

              {/* Step-by-Step Mark Scheme Breakdown */}
              {isSubmitted && (
                <div className="mt-4 p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 text-xs space-y-2">
                  <div className="font-extrabold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5 text-sm">
                    <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>Method: {activeQuestion.stepByStepExplanation.methodName}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 pl-1">
                    {activeQuestion.stepByStepExplanation.steps.map((st, sIdx) => (
                      <li key={sIdx}>{st}</li>
                    ))}
                  </ul>
                  <div className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-indigo-100 dark:border-slate-700 text-indigo-950 dark:text-indigo-200 font-semibold">
                    📌 <strong>SATs Key Takeaway:</strong> {activeQuestion.stepByStepExplanation.keyTakeaway}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 text-center text-slate-400">
              No questions found for this topic filter.
            </div>
          )}

          {/* Interactive Scratchpad for Maths */}
          {subjectType === 'maths' && showScratchpad && (
            <div className="h-96">
              <ScratchpadCanvas isOpen={true} className="h-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
