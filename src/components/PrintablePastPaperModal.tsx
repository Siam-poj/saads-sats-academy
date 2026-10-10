import React, { useState } from 'react';
import {
  Printer,
  X,
  FileText,
  CheckCircle2,
  BookOpen,
  Calendar,
  Clock,
  Award,
  Sparkles,
  Download,
  AlertCircle
} from 'lucide-react';
import { PastPaper, PAST_PAPERS } from '../data/pastPapersData';

interface PrintablePastPaperModalProps {
  isOpen: boolean;
  initialPaperId?: string;
  initialSubject?: 'maths' | 'spag' | 'reading';
  onClose: () => void;
}

export const PrintablePastPaperModal: React.FC<PrintablePastPaperModalProps> = ({
  isOpen,
  initialPaperId,
  initialSubject,
  onClose
}) => {
  const [selectedPaperId, setSelectedPaperId] = useState<string>(() => {
    if (initialPaperId) return initialPaperId;
    if (initialSubject) {
      const match = PAST_PAPERS.find((p) => p.subject === initialSubject);
      if (match) return match.id;
    }
    return PAST_PAPERS[0].id;
  });

  const [mode, setMode] = useState<'paper' | 'markScheme' | 'script'>('paper');

  if (!isOpen) return null;

  const currentPaper = PAST_PAPERS.find((p) => p.id === selectedPaperId) || PAST_PAPERS[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 animate-fadeIn print:static print:inset-auto print:p-0 print:m-0 print:bg-white print:block print:w-full print:h-auto">
      {/* Container - on print this becomes full document */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-5xl w-full h-[92vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors print:static print:h-auto print:max-h-none print:w-full print:max-w-none print:shadow-none print:border-none print:overflow-visible print:rounded-none">
        
        {/* Modal Top Control Bar (Screen only, hidden on print) */}
        <div className="no-print p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Official KS2 SATs Past Paper Printable</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  Print Ready (A4)
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                UK Standards & Testing Agency (STA) Specification • Printable on any home or school printer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print Paper (A4 / PDF)</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Paper Selector & Mode Toggles (Screen only, hidden on print) */}
        <div className="no-print px-4 sm:px-6 py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-wrap items-center justify-between gap-3">
          {/* Select Paper */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap">
              Select Paper:
            </span>
            {PAST_PAPERS.map((p) => {
              const isSelected = p.id === currentPaper.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPaperId(p.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {p.paperCode}: {p.title.split(':')[1] || p.title}
                </button>
              );
            })}
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setMode('paper')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                mode === 'paper'
                  ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Pupil Exam Booklet
            </button>
            <button
              onClick={() => setMode('markScheme')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                mode === 'markScheme'
                  ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Mark Scheme & Answers
            </button>
            {currentPaper.teacherSpellingScript && (
              <button
                onClick={() => setMode('script')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  mode === 'script'
                    ? 'bg-white dark:bg-slate-900 text-amber-700 dark:text-amber-300 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Teacher Script
              </button>
            )}
          </div>
        </div>

        {/* Printable Paper Document (Scrollable on screen, Paginated on print) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-100 dark:bg-slate-950 print:bg-white print:p-0 print:overflow-visible print:h-auto print:w-full print:block print:m-0">
          
          <div
            id="sats-print-paper-content"
            className="max-w-4xl mx-auto bg-white text-slate-950 p-8 sm:p-12 rounded-2xl shadow-md border border-slate-200 print:shadow-none print:border-none print:p-0 print:max-w-none print:w-full print:block print:m-0"
          >
            
            {/* =================================================== */}
            {/* MODE 1: PUPIL EXAM BOOKLET                          */}
            {/* =================================================== */}
            {mode === 'paper' && (
              <div className="space-y-8">
                {/* Official Exam Cover Page Header */}
                <div className="border-4 border-slate-950 p-6 sm:p-8 rounded-lg mb-8">
                  <div className="flex justify-between items-start border-b-2 border-slate-950 pb-4 mb-6">
                    <div>
                      <div className="text-xs font-black tracking-widest uppercase text-slate-600">
                        Standards & Testing Agency • Key Stage 2
                      </div>
                      <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 mt-1">
                        {currentPaper.title}
                      </h1>
                      <div className="text-sm font-semibold text-slate-700 mt-1">
                        {currentPaper.subtitle} • {currentPaper.year}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="inline-block bg-slate-950 text-white font-black text-sm px-3 py-1 rounded">
                        {currentPaper.paperCode}
                      </div>
                    </div>
                  </div>

                  {/* Pupil Details Form */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 border-2 border-slate-300 rounded mb-6 text-xs">
                    <div>
                      <span className="font-bold text-slate-500 block mb-1">First name:</span>
                      <div className="border-b-2 border-slate-400 h-6"></div>
                    </div>
                    <div>
                      <span className="font-bold text-slate-500 block mb-1">Last name:</span>
                      <div className="border-b-2 border-slate-400 h-6"></div>
                    </div>
                    <div>
                      <span className="font-bold text-slate-500 block mb-1">Class / Year:</span>
                      <div className="border-b-2 border-slate-400 h-6"></div>
                    </div>
                  </div>

                  {/* Test Specifications */}
                  <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-bold border-t-2 border-slate-200 pt-4 text-slate-800">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" /> Time allowed: {currentPaper.timeAllowed}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Award className="w-4 h-4" /> Total marks: {currentPaper.totalMarks} marks
                    </span>
                    <span>Equipment: {currentPaper.equipmentNeeded.join(', ')}</span>
                  </div>

                  {/* Instructions */}
                  <div className="mt-6 pt-4 border-t border-slate-300">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2">
                      Instructions & Advice
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-700">
                      {currentPaper.instructions.map((ins, i) => (
                        <li key={i}>{ins}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Optional Reading Text Extract (For Reading Papers) */}
                {currentPaper.readingTextPassage && (
                  <div className="p-6 border-2 border-slate-800 rounded-lg bg-amber-50/40 mb-8 avoid-break-inside">
                    <div className="text-[11px] font-black uppercase tracking-widest text-indigo-700 mb-1">
                      Reading Text Extract • {currentPaper.readingTextPassage.genre}
                    </div>
                    <h2 className="text-xl font-black text-slate-950 mb-4 font-serif">
                      {currentPaper.readingTextPassage.title}
                    </h2>
                    <div className="space-y-3 font-serif text-sm leading-relaxed text-slate-800">
                      {currentPaper.readingTextPassage.content.map((paragraph, idx) => (
                        <p key={idx} className="indent-4 first:indent-0">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Printable Exam Questions */}
                <div className="space-y-8">
                  {currentPaper.questions.map((q) => (
                    <div
                      key={q.id}
                      className="border-2 border-slate-300 rounded-lg p-5 avoid-break-inside bg-white"
                    >
                      {/* Question Header & Marks */}
                      <div className="flex justify-between items-start mb-3">
                        <span className="font-black text-base text-slate-950">
                          {q.number}.
                        </span>
                        <span className="border-2 border-slate-950 px-2 py-0.5 text-xs font-black text-slate-950 rounded">
                          {q.marks} {q.marks === 1 ? 'mark' : 'marks'}
                        </span>
                      </div>

                      {/* Prompt */}
                      <div className="text-sm font-semibold text-slate-900 mb-4 whitespace-pre-line">
                        {q.prompt}
                      </div>

                      {/* Question Content / Answer Layout */}
                      {/* 1. Arithmetic with Squared Grid */}
                      {q.type === 'arithmetic-grid' && (
                        <div>
                          {q.equation && (
                            <div className="text-xl font-mono font-bold text-slate-950 mb-3 bg-slate-100 p-3 rounded text-center border border-slate-300">
                              {q.equation}
                            </div>
                          )}
                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                            <div className="sm:col-span-8 h-28 border-2 border-dashed border-slate-300 rounded sats-grid-paper flex items-center justify-center text-slate-400 text-xs">
                              <span className="bg-white/80 px-2 py-1 rounded">Working area</span>
                            </div>
                            <div className="sm:col-span-4 h-28 border-2 border-slate-950 rounded flex flex-col justify-end p-2 bg-slate-50">
                              <span className="text-[10px] font-bold text-slate-500 uppercase">Answer</span>
                              <div className="h-10 border-b-2 border-slate-950"></div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 2. Multiple Choice Options */}
                      {q.type === 'multiple-choice' && q.options && (
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          {q.options.map((opt, i) => (
                            <div
                              key={i}
                              className="border border-slate-300 p-2.5 rounded flex items-center gap-2 text-xs font-medium"
                            >
                              <div className="w-4 h-4 rounded-full border-2 border-slate-400"></div>
                              <span>{opt}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* 3. Tick Box */}
                      {q.type === 'tick-box' && q.options && (
                        <div className="space-y-2 mt-3">
                          {q.options.map((opt, i) => (
                            <div
                              key={i}
                              className="border border-slate-300 p-2 rounded flex items-center justify-between text-xs font-medium"
                            >
                              <span>{opt}</span>
                              <div className="w-5 h-5 border-2 border-slate-950 rounded"></div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* 4. Ruled Answer Lines */}
                      {q.type === 'lines' && (
                        <div className="space-y-4 mt-4">
                          {Array.from({ length: q.linesCount || 2 }).map((_, i) => (
                            <div key={i} className="border-b-2 border-slate-300 h-6"></div>
                          ))}
                        </div>
                      )}

                      {/* 5. Spelling Gap */}
                      {q.type === 'spelling-gap' && (
                        <div className="mt-3">
                          <div className="border-b-2 border-slate-950 h-8 max-w-sm"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* End of test footer */}
                <div className="text-center py-8 border-t-2 border-slate-950 mt-12">
                  <div className="text-sm font-black tracking-widest uppercase text-slate-950">
                    END OF TEST
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    If you have time, review and check your answers.
                  </div>
                </div>
              </div>
            )}

            {/* =================================================== */}
            {/* MODE 2: OFFICIAL MARK SCHEME & ANSWERS             */}
            {/* =================================================== */}
            {mode === 'markScheme' && (
              <div className="space-y-6">
                <div className="border-4 border-emerald-800 p-6 rounded-lg bg-emerald-50/30 mb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-xs font-black uppercase text-emerald-800 tracking-wider">
                        Official Marking Criteria & Guidance
                      </div>
                      <h2 className="text-2xl font-black text-slate-950 mt-1">
                        {currentPaper.title} — Mark Scheme
                      </h2>
                    </div>
                    <div className="bg-emerald-800 text-white text-xs font-black px-3 py-1 rounded">
                      Total: {currentPaper.totalMarks} Marks
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mt-2">
                    For teachers, parents, and tutors. Use this guide to award method marks (M1) and accuracy marks (A1).
                  </p>
                </div>

                <div className="space-y-4">
                  {currentPaper.questions.map((q) => (
                    <div
                      key={q.id}
                      className="border-2 border-slate-200 rounded-lg p-4 avoid-break-inside bg-white"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-black text-sm text-slate-950">
                          Question {q.number} ({q.marks} {q.marks === 1 ? 'mark' : 'marks'})
                        </span>
                        <span className="bg-emerald-100 text-emerald-900 font-bold text-xs px-2 py-0.5 rounded">
                          {q.marks} Mark Max
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 mb-2 italic">
                        {q.prompt.length > 80 ? q.prompt.slice(0, 80) + '...' : q.prompt}
                      </div>

                      <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-md">
                        <div className="text-xs font-black text-emerald-950 flex items-center gap-1.5 mb-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Correct Answer: {q.markScheme.answer}</span>
                        </div>
                        {q.markScheme.guidance && (
                          <div className="text-xs text-slate-700 mt-1">
                            <strong>Guidance: </strong>{q.markScheme.guidance}
                          </div>
                        )}
                        {q.markScheme.acceptable && (
                          <div className="text-xs text-slate-700 mt-1">
                            <strong>Also accept: </strong>{q.markScheme.acceptable.join(', ')}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* =================================================== */}
            {/* MODE 3: TEACHER / PARENT SPELLING SCRIPT           */}
            {/* =================================================== */}
            {mode === 'script' && currentPaper.teacherSpellingScript && (
              <div className="space-y-6">
                <div className="border-4 border-amber-800 p-6 rounded-lg bg-amber-50/40 mb-6">
                  <div className="text-xs font-black uppercase text-amber-800 tracking-wider">
                    Examiner Instructions
                  </div>
                  <h2 className="text-2xl font-black text-slate-950 mt-1">
                    Spelling Paper 2 — Teacher / Parent Transcript
                  </h2>
                  <p className="text-xs text-slate-700 mt-2">
                    Read the target word, then read the complete sentence clearly, then repeat the target word.
                    Allow the pupil sufficient time to write the word before moving to the next item.
                  </p>
                </div>

                <div className="space-y-4">
                  {currentPaper.teacherSpellingScript.map((script) => (
                    <div
                      key={script.wordNumber}
                      className="border-2 border-slate-200 rounded-lg p-4 bg-white avoid-break-inside"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-black text-sm text-slate-950">
                          Word {script.wordNumber}:
                        </span>
                        <span className="bg-amber-100 text-amber-900 font-black text-xs px-2 py-0.5 rounded font-mono">
                          {script.targetWord}
                        </span>
                      </div>
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded font-serif text-sm text-slate-800">
                        "{script.fullSentenceToRead}"
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1.5">
                        Pupil booklet shows: <em>{script.sentenceWithGap}</em>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
