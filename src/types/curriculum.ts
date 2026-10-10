export type Subject = 'maths-arithmetic' | 'maths-reasoning' | 'english-spag' | 'english-reading';

export type Difficulty = 'Bronze' | 'Silver' | 'Gold';

export interface QuestionOption {
  id: string;
  label: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  subject: Subject;
  topic: string;
  subtopic?: string;
  difficulty: Difficulty;
  title: string;
  prompt: string;
  contextPassage?: string; // For reading comprehension or sentence excerpts
  equationDisplay?: string; // For math formulas e.g. "456 × 23 = [ ? ]"
  type: 'multiple-choice' | 'numeric' | 'fill-blank' | 'reorder';
  options?: QuestionOption[];
  correctAnswer: string | number; // Acceptable answer string or number
  acceptableAlternatives?: string[]; // E.g. "1/2", "0.5", "50%"
  unit?: string; // E.g. "cm²", "%", "marks"
  marks: number;
  hints: string[]; // Progressive Socratic hints
  stepByStepExplanation: {
    methodName: string;
    steps: string[];
    keyTakeaway: string;
  };
}

export interface SprintResult {
  date: string;
  score: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  xpEarned: number;
  answers: {
    questionId: string;
    userAnswer: string;
    isCorrect: boolean;
    timeTakenSeconds: number;
  }[];
}

export interface UserStats {
  learnerName: string;
  level: number;
  xp: number;
  streakDays: number;
  lastActiveDate: string;
  completedQuestionsCount: number;
  correctQuestionsCount: number;
  sprintsCompleted: number;
  badgesUnlocked: string[];
  topicMastery: Record<string, { total: number; correct: number }>;
  history: SprintResult[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: 'sprint' | 'maths' | 'spag' | 'streak' | 'general';
  xpReward: number;
  isUnlocked: boolean;
  unlockedAt?: string;
}
