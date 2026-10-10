import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Lightbulb,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Zap,
  PenTool,
  Trophy,
  Flame,
  ChevronRight,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { Question, SprintResult } from '../types/curriculum';
import { SPRINT_SAMPLE_QUESTIONS } from '../data/sprintQuestions';
import { ScratchpadCanvas } from './ScratchpadCanvas';
import { MascotCompanion } from './MascotCompanion';

interface DailySprintViewProps {
  onSprintComplete: (result: SprintResult) => void;
  onGoToPractice: () => void;
  playSound: {
    playCorrect: () => void;
    playIncorrect: () => void;
    playClick: () => void;
    playLevelUp: () => void;
    playFanfare: () => void;
    playTick: () => void;
  };
}

export const DailySprintView: React.FC<DailySprintViewProps> = ({
  onSprintComplete,
  onGoToPractice,
  playSound
}) => {
  const TOTAL_TIME = 600; // 10 minutes (600 seconds)
  const [timeLeft, setTimeLeft] = useState<number>(TOTAL_TIME);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // User answers mapping: questionId -> string
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  // Question submission status: questionId -> boolean (true if submitted)
  const [submittedStatus, setSubmittedStatus] = useState<Record<string, boolean>>({});
  // Question correctness: questionId -> boolean
  const [correctnessStatus, setCorrectnessStatus] = useState<Record<string, boolean>>({});

  // Current numeric input state for numeric questions
  const [numericInput, setNumericInput] = useState<string>('');

  // Progressive hints count: questionId -> number of hints revealed
  const [hintLevel, setHintLevel] = useState<Record<string, number>>({});

  // Scratchpad toggle
  const [showScratchpad, setShowScratchpad] = useState<boolean>(false);

  // Finished state
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [finalResult, setFinalResult] = useState<SprintResult | null>(null);

  const timerRef = useRef<number | null>(null);
  const questions = SPRINT_SAMPLE_QUESTIONS;
  const currentQ = questions[currentIndex];

  // Mascot feedback state
  const [mascotMood, setMascotMood] = useState<'greeting' | 'thinking' | 'correct' | 'incorrect' | 'streak'>('greeting');

  // Timer effect
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleAutoFinish();
            return 0;
          }
          if (prev <= 60 && prev % 10 === 0) {
            playSound.playTick();
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft]);

  // Keep numericInput in sync when changing question
  useEffect(() => {
    if (currentQ) {
      setNumericInput(userAnswers[currentQ.id] || '');
      if (currentQ.subject === 'maths-arithmetic' && !submittedStatus[currentQ.id]) {
        setShowScratchpad(true);
      }
    }
  }, [currentIndex, currentQ]);

  const handleStartSprint = () => {
    playSound.playClick();
    setHasStarted(true);
    setIsRunning(true);
    setMascotMood('thinking');
  };

  const handleTogglePause = () => {
    playSound.playClick();
    setIsRunning((prev) => !prev);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Evaluate single question
  const checkAnswer = (q: Question, answer: string): boolean => {
    const cleanedUser = answer.trim().toLowerCase().replace(/,/g, '');
    const cleanedCorrect = String(q.correctAnswer).trim().toLowerCase().replace(/,/g, '');

    if (cleanedUser === cleanedCorrect) return true;

    if (q.acceptableAlternatives) {
      const match = q.acceptableAlternatives.some(
        (alt) => alt.trim().toLowerCase().replace(/,/g, '') === cleanedUser
      );
      if (match) return true;
    }
    return false;
  };

  const handleSubmitCurrent = (answerOverride?: string) => {
    const answerToEvaluate = answerOverride !== undefined ? answerOverride : numericInput;
    if (!answerToEvaluate.trim()) return;

    playSound.playClick();

    const isCorrect = checkAnswer(currentQ, answerToEvaluate);

    setUserAnswers((prev) => ({ ...prev, [currentQ.id]: answerToEvaluate }));
    setSubmittedStatus((prev) => ({ ...prev, [currentQ.id]: true }));
    setCorrectnessStatus((prev) => ({ ...prev, [currentQ.id]: isCorrect }));

    if (isCorrect) {
      playSound.playCorrect();
      setMascotMood('correct');
    } else {
      playSound.playIncorrect();
      setMascotMood('incorrect');
    }
  };

  const handleRevealHint = () => {
    playSound.playClick();
    setHintLevel((prev) => {
      const current = prev[currentQ.id] || 0;
      const next = Math.min(current + 1, currentQ.hints.length);
      return { ...prev, [currentQ.id]: next };
    });
  };

  const handleFinishSprint = useCallback(() => {
    setIsRunning(false);
    setIsFinished(true);
    const timeSpent = TOTAL_TIME - timeLeft;

    let score = 0;
    const answerSummary = questions.map((q) => {
      const ans = userAnswers[q.id] || '';
      const isCorrect = checkAnswer(q, ans);
      if (isCorrect) score += 1;
      return {
        questionId: q.id,
        userAnswer: ans,
        isCorrect,
        timeTakenSeconds: Math.round(timeSpent / questions.length)
      };
    });

    const xpEarned = score * 20 + 50 + (timeLeft > 180 ? 30 : 0);

    const result: SprintResult = {
      date: new Date().toISOString(),
      score,
      totalQuestions: questions.length,
      timeSpentSeconds: timeSpent,
      xpEarned,
      answers: answerSummary
    };

    setFinalResult(result);
    onSprintComplete(result);

    // Confetti
    if (score >= 7) {
      playSound.playFanfare();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 300);
    } else {
      playSound.playLevelUp();
    }
  }, [timeLeft, questions, userAnswers, onSprintComplete, playSound]);

  const handleAutoFinish = () => {
    handleFinishSprint();
  };

  const handleResetSprint = () => {
    playSound.playClick();
    setTimeLeft(TOTAL_TIME);
    setIsRunning(false);
    setHasStarted(false);
    setCurrentIndex(0);
    setUserAnswers({});
    setSubmittedStatus({});
    setCorrectnessStatus({});
    setNumericInput('');
    setHintLevel({});
    setIsFinished(false);
    setFinalResult(null);
    setMascotMood('greeting');
  };

  // Pre-Start Banner View
  if (!hasStarted) {
    return (
      <div className="max-w-4xl mx-auto py-6 sm:py-10 px-4">
        <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-950 dark:from-indigo-950 dark:via-slate-900 dark:to-slate-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-indigo-500/20">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
                <Zap className="w-3.5 h-3.5 fill-amber-300" />
                Daily SATs Challenge
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
                Daily 10-Minute SATs Sprint
              </h1>
              <p className="text-indigo-200 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
                Ready, Saad? Test your speed and precision under real UK KS2 SATs exam conditions!
                10 targeted questions across all subjects:
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8 max-w-md">
                <div className="bg-white/10 dark:bg-slate-800/60 rounded-2xl p-3 border border-white/10 dark:border-slate-700/60 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/30 flex items-center justify-center text-emerald-300 font-bold">
                    5
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-white">Maths Arithmetic</div>
                    <div className="text-[10px] text-indigo-200">Paper 1 Core Methods</div>
                  </div>
                </div>

                <div className="bg-white/10 dark:bg-slate-800/60 rounded-2xl p-3 border border-white/10 dark:border-slate-700/60 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/30 flex items-center justify-center text-purple-300 font-bold">
                    5
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-white">English SPaG</div>
                    <div className="text-[10px] text-indigo-200">Grammar & Punctuation</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
                <button
                  onClick={handleStartSprint}
                  className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-indigo-950 font-black text-base rounded-2xl shadow-lg shadow-amber-500/20 transform transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <Play className="w-5 h-5 fill-indigo-950" />
                  <span>Start 10-Min Sprint</span>
                </button>

                <div className="flex items-center gap-2 text-indigo-200 text-xs">
                  <Timer className="w-4 h-4 text-amber-400" />
                  <span>10 Minutes • Scratchpad Included</span>
                </div>
              </div>
            </div>

            {/* Mascot Visual */}
            <div className="w-48 sm:w-56 flex-shrink-0 flex flex-col items-center">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-indigo-800/80 dark:bg-indigo-950/80 border-2 border-indigo-400/30 flex items-center justify-center text-6xl sm:text-7xl shadow-2xl relative">
                🦉
                <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wider shadow">
                  Ready!
                </div>
              </div>
              <div className="mt-3 text-center">
                <span className="text-xs font-bold text-amber-300">Pip the SATs Coach</span>
                <p className="text-[11px] text-indigo-300">"Let's beat your personal best!"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Finished Results Screen
  if (isFinished && finalResult) {
    const accuracy = Math.round((finalResult.score / finalResult.totalQuestions) * 100);
    const minutes = Math.floor(finalResult.timeSpentSeconds / 60);
    const seconds = finalResult.timeSpentSeconds % 60;

    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-indigo-100 dark:border-slate-800 p-6 sm:p-10 text-center transition-colors">
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-300 shadow-xl mb-4 text-4xl sm:text-5xl animate-bounce-short">
            🏆
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            Fantastic Effort, Saad!
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-8">
            You've completed your Daily SATs Sprint. Here is your official performance breakdown:
          </p>

          {/* Key Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
            <div className="bg-indigo-50 dark:bg-slate-800/80 border border-indigo-100 dark:border-slate-700 rounded-2xl p-4 text-center">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1">
                Score
              </span>
              <span className="text-2xl sm:text-3xl font-black text-indigo-950 dark:text-white">
                {finalResult.score} / {finalResult.totalQuestions}
              </span>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800/50 rounded-2xl p-4 text-center">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                Accuracy
              </span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-950 dark:text-emerald-200">
                {accuracy}%
              </span>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-800/50 rounded-2xl p-4 text-center">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-1">
                Time Taken
              </span>
              <span className="text-2xl sm:text-3xl font-black text-amber-950 dark:text-amber-200">
                {minutes}m {seconds}s
              </span>
            </div>

            <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-800/50 rounded-2xl p-4 text-center">
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider block mb-1">
                XP Earned
              </span>
              <span className="text-2xl sm:text-3xl font-black text-purple-950 dark:text-purple-200 flex items-center justify-center gap-1">
                <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                +{finalResult.xpEarned}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
            <button
              onClick={handleResetSprint}
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Sprint</span>
            </button>

            <button
              onClick={onGoToPractice}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Practice Weak Topics</span>
            </button>
          </div>

          {/* Question Review Drawer */}
          <div className="text-left border-t border-slate-200 dark:border-slate-800 pt-8">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Detailed Mark Scheme & Explanation Review
            </h3>

            <div className="space-y-4">
              {questions.map((q, idx) => {
                const ans = finalResult.answers.find((a) => a.questionId === q.id);
                const isCorrect = ans?.isCorrect ?? false;

                return (
                  <div
                    key={q.id}
                    className={`rounded-2xl p-4 sm:p-5 border transition-all ${
                      isCorrect
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40'
                        : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                          {q.topic} • {q.subject === 'maths-arithmetic' ? 'Paper 1 Arithmetic' : 'SPaG'}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{q.marks} mark</span>
                    </div>

                    <p className="font-semibold text-sm sm:text-base text-slate-800 dark:text-slate-100 mb-2">
                      {q.prompt}
                    </p>

                    {q.equationDisplay && (
                      <div className="font-mono text-base font-bold bg-white/80 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 inline-block mb-3 text-indigo-900 dark:text-indigo-300">
                        {q.equationDisplay}
                      </div>
                    )}

                    {q.contextPassage && (
                      <blockquote className="italic text-xs sm:text-sm text-slate-600 dark:text-slate-300 border-l-2 border-indigo-300 dark:border-indigo-600 pl-3 mb-3">
                        {q.contextPassage}
                      </blockquote>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                      <div className="bg-white dark:bg-slate-800 rounded-xl p-2.5 border border-slate-200 dark:border-slate-700">
                        <span className="text-slate-400 dark:text-slate-400 block font-medium">Saad's Answer:</span>
                        <span className={`font-bold ${isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                          {ans?.userAnswer || '(Blank / Not answered)'}
                        </span>
                      </div>

                      <div className="bg-white dark:bg-slate-800 rounded-xl p-2.5 border border-slate-200 dark:border-slate-700">
                        <span className="text-slate-400 dark:text-slate-400 block font-medium">Correct SATs Answer:</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          {q.correctAnswer} {q.unit || ''}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-200 dark:border-slate-700 text-xs">
                      <div className="font-bold text-indigo-700 dark:text-indigo-400 mb-1 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        {q.stepByStepExplanation.methodName}
                      </div>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-600 dark:text-slate-300 pl-1 mb-2">
                        {q.stepByStepExplanation.steps.map((step, sIdx) => (
                          <li key={sIdx}>{step}</li>
                        ))}
                      </ul>
                      <div className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 rounded-lg p-2 font-medium">
                        💡 <strong>SATs Key Takeaway:</strong> {q.stepByStepExplanation.keyTakeaway}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active Sprint
  const isQuestionSubmitted = submittedStatus[currentQ.id];
  const isQuestionCorrect = correctnessStatus[currentQ.id];
  const currentHintLevel = hintLevel[currentQ.id] || 0;

  return (
    <div className="max-w-6xl mx-auto py-4 sm:py-6 px-4">
      {/* Top Sprint Control Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-3 sm:p-4 mb-4 flex flex-wrap items-center justify-between gap-3 transition-colors">
        {/* Timer */}
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono font-bold text-sm sm:text-base border ${
              timeLeft < 120
                ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 animate-pulse'
                : 'bg-indigo-50 dark:bg-slate-800 border-indigo-200 dark:border-slate-700 text-indigo-900 dark:text-indigo-300'
            }`}
          >
            <Timer className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>{formatTime(timeLeft)}</span>
          </div>

          <button
            onClick={handleTogglePause}
            className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1"
            title={isRunning ? 'Pause Sprint' : 'Resume Sprint'}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-slate-700 dark:fill-slate-300" />}
            <span className="hidden sm:inline">{isRunning ? 'Pause' : 'Resume'}</span>
          </button>
        </div>

        {/* Question Switcher Tabs */}
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto pb-1 max-w-full">
          {questions.map((q, idx) => {
            const isCurr = idx === currentIndex;
            const isSub = submittedStatus[q.id];
            const isCorr = correctnessStatus[q.id];

            let badgeClass = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700';
            if (isSub) {
              badgeClass = isCorr
                ? 'bg-emerald-500 text-white border-emerald-600 font-bold'
                : 'bg-rose-500 text-white border-rose-600 font-bold';
            } else if (isCurr) {
              badgeClass = 'bg-indigo-600 text-white border-indigo-700 ring-2 ring-indigo-300 dark:ring-indigo-700 font-bold';
            }

            return (
              <button
                key={q.id}
                onClick={() => {
                  playSound.playClick();
                  setCurrentIndex(idx);
                }}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs flex items-center justify-center border transition-all ${badgeClass}`}
                title={`Question ${idx + 1}: ${q.topic}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Scratchpad Toggle & Finish Sprint */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowScratchpad(!showScratchpad)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
              showScratchpad
                ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Scratchpad</span>
          </button>

          <button
            onClick={handleFinishSprint}
            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-indigo-950 font-bold text-xs rounded-xl shadow-xs transition-transform active:scale-95"
          >
            Finish Sprint
          </button>
        </div>
      </div>

      {/* Mascot Companion Inline Reaction */}
      <div className="mb-4">
        <MascotCompanion mood={mascotMood} learnerName="Saad" />
      </div>

      {/* Main Grid: Question Card + Scratchpad */}
      <div className={`grid gap-4 ${showScratchpad ? 'lg:grid-cols-12' : 'grid-cols-1'}`}>
        {/* Left Column: Question Area */}
        <div className={showScratchpad ? 'lg:col-span-7' : 'w-full'}>
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-5 sm:p-7 relative transition-colors">
            {/* Header tags */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {currentQ.subject === 'maths-arithmetic' ? '📐 Maths Paper 1' : '📖 English SPaG'}
                </span>
                <span className="hidden sm:inline px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                  {currentQ.topic}
                </span>
              </div>
              <span className="text-xs font-bold text-slate-400">{currentQ.marks} mark</span>
            </div>

            {/* Question Prompt */}
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3 leading-snug">
              {currentQ.prompt}
            </h3>

            {/* Context passage */}
            {currentQ.contextPassage && (
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-sm font-medium text-slate-800 dark:text-slate-200 italic mb-4">
                {currentQ.contextPassage}
              </div>
            )}

            {/* Math Equation Formula Display */}
            {currentQ.equationDisplay && (
              <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 text-center mb-5">
                <span className="font-mono text-xl sm:text-2xl font-black text-indigo-950 dark:text-indigo-200 tracking-wider">
                  {currentQ.equationDisplay}
                </span>
              </div>
            )}

            {/* Inputs */}
            {currentQ.type === 'multiple-choice' && currentQ.options && (
              <div className="space-y-2.5 mb-6">
                {currentQ.options.map((opt) => {
                  const isSelected = userAnswers[currentQ.id] === opt.label;
                  let optStyle =
                    'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 hover:border-indigo-300 dark:hover:border-indigo-500 hover:bg-indigo-50/30 text-slate-800 dark:text-slate-200';

                  if (isQuestionSubmitted) {
                    if (opt.isCorrect) {
                      optStyle = 'border-emerald-500 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold';
                    } else if (isSelected && !opt.isCorrect) {
                      optStyle = 'border-rose-400 dark:border-rose-700 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-300 line-through';
                    }
                  } else if (isSelected) {
                    optStyle = 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/50 text-indigo-900 dark:text-indigo-200 font-semibold shadow-xs';
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={isQuestionSubmitted}
                      onClick={() => {
                        setUserAnswers((prev) => ({ ...prev, [currentQ.id]: opt.label }));
                        if (!isQuestionSubmitted) {
                          handleSubmitCurrent(opt.label);
                        }
                      }}
                      className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${optStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold text-xs uppercase">
                          {opt.id.replace('opt-', '')}
                        </span>
                        <span>{opt.label}</span>
                      </div>

                      {isQuestionSubmitted && opt.isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      )}
                      {isQuestionSubmitted && isSelected && !opt.isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {currentQ.type === 'numeric' && (
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">
                  Your Answer:
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      disabled={isQuestionSubmitted}
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !isQuestionSubmitted) {
                          handleSubmitCurrent();
                        }
                      }}
                      placeholder="Type your calculated answer..."
                      className={`w-full px-4 py-3 rounded-2xl border text-base font-bold font-mono outline-none transition-all ${
                        isQuestionSubmitted
                          ? isQuestionCorrect
                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200'
                            : 'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200'
                          : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-indigo-600 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-950'
                      }`}
                    />
                    {currentQ.unit && (
                      <span className="absolute right-4 top-3 text-sm font-bold text-slate-400">
                        {currentQ.unit}
                      </span>
                    )}
                  </div>

                  {!isQuestionSubmitted ? (
                    <button
                      type="button"
                      onClick={() => handleSubmitCurrent()}
                      disabled={!numericInput.trim()}
                      className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-sm shadow-md transition-all active:scale-95"
                    >
                      Check
                    </button>
                  ) : (
                    <div className="px-3 py-3 flex items-center gap-1.5 text-xs font-bold">
                      {isQuestionCorrect ? (
                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-5 h-5" /> Correct
                        </span>
                      ) : (
                        <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
                          <XCircle className="w-5 h-5" /> Answer: {currentQ.correctAnswer}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Hint & Navigation Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRevealHint}
                  disabled={currentHintLevel >= currentQ.hints.length}
                  className="px-3 py-1.5 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold flex items-center gap-1.5 disabled:opacity-40 transition-colors"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>
                    {currentHintLevel === 0
                      ? 'Need a Hint?'
                      : currentHintLevel < currentQ.hints.length
                      ? `Next Hint (${currentHintLevel}/${currentQ.hints.length})`
                      : 'All Hints Revealed'}
                  </span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={() => {
                    playSound.playClick();
                    setCurrentIndex((prev) => Math.max(0, prev - 1));
                  }}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold disabled:opacity-40"
                >
                  Previous
                </button>

                {currentIndex < questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => {
                      playSound.playClick();
                      setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1));
                    }}
                    className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-transform active:scale-95"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleFinishSprint}
                    className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs"
                  >
                    <span>Finish Sprint</span>
                    <Trophy className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Revealed Hints Drawer */}
            {currentHintLevel > 0 && (
              <div className="mt-4 p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs space-y-2 animate-fadeIn">
                <div className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Socratic Coaching Hints:</span>
                </div>
                {currentQ.hints.slice(0, currentHintLevel).map((hint, hIdx) => (
                  <p key={hIdx} className="text-amber-950 dark:text-amber-200 font-medium pl-3 border-l-2 border-amber-400">
                    <strong>Step {hIdx + 1}:</strong> {hint}
                  </p>
                ))}
              </div>
            )}

            {/* Submitted Feedback: Method and Mark Scheme Breakdown */}
            {isQuestionSubmitted && (
              <div className="mt-4 p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 text-xs text-slate-700 dark:text-slate-300 space-y-2">
                <div className="font-extrabold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5 text-sm">
                  <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>SATs Mark Scheme: {currentQ.stepByStepExplanation.methodName}</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 pl-1">
                  {currentQ.stepByStepExplanation.steps.map((st, sIdx) => (
                    <li key={sIdx}>{st}</li>
                  ))}
                </ul>
                <div className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-indigo-100 dark:border-slate-700 text-indigo-950 dark:text-indigo-200 font-semibold">
                  📌 <strong>Takeaway:</strong> {currentQ.stepByStepExplanation.keyTakeaway}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Working Scratchpad */}
        {showScratchpad && (
          <div className="lg:col-span-5 h-[420px] lg:h-auto">
            <ScratchpadCanvas
              isOpen={true}
              className="h-full min-h-[380px]"
            />
          </div>
        )}
      </div>
    </div>
  );
};
