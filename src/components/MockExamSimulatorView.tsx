import React, { useState } from 'react';
import {
  FileCheck,
  Timer,
  Award,
  Play,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Flag,
  PenTool
} from 'lucide-react';
import { Question } from '../types/curriculum';
import { SPRINT_SAMPLE_QUESTIONS } from '../data/sprintQuestions';
import { ScratchpadCanvas } from './ScratchpadCanvas';

interface MockExamSimulatorViewProps {
  playSound: {
    playClick: () => void;
    playCorrect: () => void;
    playFanfare: () => void;
  };
}

interface PaperSpec {
  id: string;
  title: string;
  subject: string;
  standardDurationMins: number;
  totalMarks: number;
  description: string;
  instructions: string[];
}

const AVAILABLE_PAPERS: PaperSpec[] = [
  {
    id: 'maths-p1',
    title: 'Paper 1: Arithmetic',
    subject: 'KS2 Mathematics',
    standardDurationMins: 30,
    totalMarks: 40,
    description: 'Rapid written calculations including long multiplication, division, fractions, and decimals.',
    instructions: [
      'You have 30 minutes to complete this test.',
      'Work as quickly and as carefully as you can.',
      'All working out should be written clearly on your scratchpad.',
      'You must not use a calculator for this paper.'
    ]
  },
  {
    id: 'maths-p2',
    title: 'Paper 2: Reasoning',
    subject: 'KS2 Mathematics',
    standardDurationMins: 40,
    totalMarks: 35,
    description: 'Multi-step mathematical reasoning, geometry, angles, statistics, and word problems.',
    instructions: [
      'You have 40 minutes to complete this paper.',
      'Follow the instructions for each question carefully.',
      'Show your method where 2 marks are available.'
    ]
  },
  {
    id: 'spag-p1',
    title: 'Paper 1: Questions (SPaG)',
    subject: 'KS2 English Grammar & Punctuation',
    standardDurationMins: 45,
    totalMarks: 50,
    description: 'Word classes, sentence grammar, complex punctuation, and active/passive voice.',
    instructions: [
      'You have 45 minutes to complete this paper.',
      'Pay particular attention to punctuation, capital letters, and clear handwriting.',
      'Tick or write your answer clearly in the space provided.'
    ]
  }
];

export const MockExamSimulatorView: React.FC<MockExamSimulatorViewProps> = ({
  playSound
}) => {
  const [selectedPaper, setSelectedPaper] = useState<PaperSpec>(AVAILABLE_PAPERS[0]);
  const [isExamActive, setIsExamActive] = useState<boolean>(false);
  const [showScratchpad, setShowScratchpad] = useState<boolean>(false);

  const [examTimeRemaining, setExamTimeRemaining] = useState<number>(30 * 60);
  const [currentExamIndex, setCurrentExamIndex] = useState<number>(0);
  const [examAnswers, setExamAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [isExamSubmitted, setIsExamSubmitted] = useState<boolean>(false);

  const mockQuestions = SPRINT_SAMPLE_QUESTIONS; // Mock questions set
  const currentQ = mockQuestions[currentExamIndex];

  const handleStartExam = () => {
    playSound.playClick();
    setExamTimeRemaining(selectedPaper.standardDurationMins * 60);
    setIsExamActive(true);
    setIsExamSubmitted(false);
    setExamAnswers({});
    setFlaggedQuestions({});
    setCurrentExamIndex(0);
  };

  const handleToggleFlag = (id: string) => {
    playSound.playClick();
    setFlaggedQuestions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmitExam = () => {
    playSound.playFanfare();
    setIsExamSubmitted(true);
  };

  if (!isExamActive) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wide mb-3">
            <FileCheck className="w-4 h-4" />
            <span>KS2 Mock Exam Simulator</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Simulate the Real Year 6 SATs Papers
          </h1>
          <p className="text-sm text-slate-600 mb-8">
            Experience realistic examination papers formatted strictly to Department for Education standards.
          </p>

          {/* Paper Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {AVAILABLE_PAPERS.map((paper) => {
              const isSelected = selectedPaper.id === paper.id;
              return (
                <div
                  key={paper.id}
                  onClick={() => {
                    playSound.playClick();
                    setSelectedPaper(paper);
                  }}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-2 ring-indigo-200'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="text-[11px] font-bold uppercase text-indigo-600 mb-1">
                    {paper.subject}
                  </div>
                  <h3 className="font-bold text-base text-slate-900 mb-2">{paper.title}</h3>
                  <p className="text-xs text-slate-500 mb-4">{paper.description}</p>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 pt-3 border-t border-slate-200">
                    <span className="flex items-center gap-1">
                      <Timer className="w-3.5 h-3.5 text-amber-500" />
                      {paper.standardDurationMins} Mins
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-indigo-500" />
                      {paper.totalMarks} Marks
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Official DfE Exam Cover Instructions */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8 text-left">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-indigo-600" />
              Examination Instructions for Saad:
            </h3>
            <ul className="space-y-2 text-xs text-slate-700 list-disc list-inside">
              {selectedPaper.instructions.map((inst, i) => (
                <li key={i}>{inst}</li>
              ))}
            </ul>
          </div>

          <div className="text-center">
            <button
              onClick={handleStartExam}
              className="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-md transition-transform hover:scale-105 active:scale-95 inline-flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Begin Official Mock Paper</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active Exam Simulator
  if (isExamSubmitted) {
    let score = 0;
    mockQuestions.forEach((q) => {
      const user = (examAnswers[q.id] || '').trim().toLowerCase().replace(/,/g, '');
      const corr = String(q.correctAnswer).trim().toLowerCase().replace(/,/g, '');
      if (user === corr) score += 1;
    });

    const scaledScore = Math.round(85 + (score / mockQuestions.length) * 35); // SATs scaled score range 80 - 120

    return (
      <div className="max-w-3xl mx-auto py-10 px-4 text-center">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl">
          <div className="text-5xl mb-3">🎓</div>
          <h2 className="text-2xl font-black text-slate-900 mb-1">Mock Exam Finished!</h2>
          <p className="text-xs text-slate-500 mb-6">{selectedPaper.title} • {selectedPaper.subject}</p>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-8">
            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100">
              <span className="text-[11px] font-bold text-indigo-600 uppercase block">Raw Score</span>
              <span className="text-3xl font-black text-indigo-950">{score} / {mockQuestions.length}</span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
              <span className="text-[11px] font-bold text-emerald-600 uppercase block">DfE Scaled Score</span>
              <span className="text-3xl font-black text-emerald-950">{scaledScore}</span>
              <span className="text-[10px] font-bold text-emerald-700 block mt-0.5">
                {scaledScore >= 100 ? 'Expected Standard Met! ✅' : 'Working Towards'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsExamActive(false)}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs"
          >
            Back to Simulator Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-6 px-4">
      {/* Top Exam Status Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 mb-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="font-bold text-sm text-indigo-300">
            {selectedPaper.title}
          </div>
          <span className="text-slate-500">|</span>
          <div className="flex items-center gap-1.5 text-amber-400 font-mono font-bold text-sm">
            <Timer className="w-4 h-4" />
            <span>28:45</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowScratchpad(!showScratchpad)}
            className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Working Pad</span>
          </button>

          <button
            onClick={handleSubmitExam}
            className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs shadow-sm"
          >
            Submit Paper
          </button>
        </div>
      </div>

      {/* Main Grid: Navigator + Exam Booklet */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Question Matrix */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-4 h-fit">
          <span className="text-xs font-bold text-slate-600 block mb-3">Question Palette:</span>
          <div className="grid grid-cols-5 gap-1.5">
            {mockQuestions.map((q, i) => {
              const isAnswered = !!examAnswers[q.id];
              const isFlagged = !!flaggedQuestions[q.id];
              const isCurr = i === currentExamIndex;

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    playSound.playClick();
                    setCurrentExamIndex(i);
                  }}
                  className={`w-9 h-9 rounded-lg text-xs font-bold flex items-center justify-center relative border ${
                    isCurr
                      ? 'bg-indigo-600 text-white border-indigo-700'
                      : isAnswered
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {i + 1}
                  {isFlagged && (
                    <span className="w-2 h-2 rounded-full bg-amber-500 absolute top-0.5 right-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Exam Booklet Layout */}
        <div className="lg:col-span-9 space-y-4">
          <div className="bg-white rounded-3xl border-2 border-slate-300 p-8 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <span className="text-xs font-bold text-slate-400">Question {currentExamIndex + 1}</span>
              <button
                onClick={() => handleToggleFlag(currentQ.id)}
                className={`text-xs font-bold flex items-center gap-1 ${
                  flaggedQuestions[currentQ.id] ? 'text-amber-600' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{flaggedQuestions[currentQ.id] ? 'Flagged for Review' : 'Flag Question'}</span>
              </button>
            </div>

            <p className="font-semibold text-slate-900 text-base mb-4">{currentQ.prompt}</p>

            {currentQ.equationDisplay && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xl font-bold text-slate-900 text-center mb-6">
                {currentQ.equationDisplay}
              </div>
            )}

            {currentQ.type === 'numeric' && (
              <div className="max-w-xs mb-6">
                <input
                  type="text"
                  value={examAnswers[currentQ.id] || ''}
                  onChange={(e) =>
                    setExamAnswers((prev) => ({ ...prev, [currentQ.id]: e.target.value }))
                  }
                  placeholder="Answer..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold outline-none focus:border-indigo-600"
                />
              </div>
            )}

            {currentQ.type === 'multiple-choice' && currentQ.options && (
              <div className="space-y-2 mb-6">
                {currentQ.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setExamAnswers((prev) => ({ ...prev, [currentQ.id]: opt.label }))}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs font-medium ${
                      examAnswers[currentQ.id] === opt.label
                        ? 'border-indigo-600 bg-indigo-50 font-bold text-indigo-950'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button
                disabled={currentExamIndex === 0}
                onClick={() => setCurrentExamIndex((p) => Math.max(0, p - 1))}
                className="px-4 py-2 border rounded-xl text-xs font-semibold disabled:opacity-40"
              >
                Previous
              </button>
              <button
                disabled={currentExamIndex === mockQuestions.length - 1}
                onClick={() => setCurrentExamIndex((p) => Math.min(mockQuestions.length - 1, p + 1))}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>

          {showScratchpad && (
            <div className="h-80">
              <ScratchpadCanvas isOpen={true} className="h-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
