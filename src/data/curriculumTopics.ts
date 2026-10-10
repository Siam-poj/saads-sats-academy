import { Subject, Difficulty } from '../types/curriculum';

export interface TopicInfo {
  id: string;
  subject: Subject;
  title: string;
  description: string;
  ks2Paper: string;
  icon: string;
  totalQuestions: number;
  tags: string[];
}

export const KS2_TOPICS: TopicInfo[] = [
  // Maths Arithmetic
  {
    id: 'arith-calc',
    subject: 'maths-arithmetic',
    title: 'Column Addition & Subtraction',
    description: 'Master multi-digit and decimal additions and regrouping subtractions.',
    ks2Paper: 'Paper 1: Arithmetic',
    icon: 'PlusCircle',
    totalQuestions: 15,
    tags: ['Decimals', 'Regrouping', 'Speed']
  },
  {
    id: 'arith-mult-div',
    subject: 'maths-arithmetic',
    title: 'Long Multiplication & Bus-Stop',
    description: 'Formal written methods for 4-digit by 2-digit multiplication and short/long division.',
    ks2Paper: 'Paper 1: Arithmetic',
    icon: 'Divide',
    totalQuestions: 20,
    tags: ['4-digit', 'Placeholders', 'Remainders']
  },
  {
    id: 'arith-fractions',
    subject: 'maths-arithmetic',
    title: 'Fractions, Decimals & Percentages',
    description: 'Adding, subtracting, multiplying and dividing fractions with unlike denominators.',
    ks2Paper: 'Paper 1: Arithmetic',
    icon: 'PieChart',
    totalQuestions: 25,
    tags: ['Simplifying', 'Mixed Numbers', 'FDP Conversions']
  },

  // Maths Reasoning
  {
    id: 'reason-word-problems',
    subject: 'maths-reasoning',
    title: 'Multi-Step Word Problems',
    description: 'Decipher real-world scenarios, identify key operations, and eliminate distractors.',
    ks2Paper: 'Papers 2 & 3: Reasoning',
    icon: 'HelpCircle',
    totalQuestions: 18,
    tags: ['2-Mark', 'Real World', 'RUCSAC']
  },
  {
    id: 'reason-geometry',
    subject: 'maths-reasoning',
    title: 'Angles, Perimeter, Area & Volume',
    description: 'Calculate missing angles on straight lines and points, composite shape areas, and cube volumes.',
    ks2Paper: 'Papers 2 & 3: Reasoning',
    icon: 'Compass',
    totalQuestions: 16,
    tags: ['360° Rules', 'Compound Shapes', 'Formulae']
  },
  {
    id: 'reason-algebra-ratio',
    subject: 'maths-reasoning',
    title: 'Algebra Basics & Ratio/Proportion',
    description: 'Find missing variables in one-step and two-step equations and scale recipes.',
    ks2Paper: 'Papers 2 & 3: Reasoning',
    icon: 'TrendingUp',
    totalQuestions: 14,
    tags: ['Variables', 'Scaling', 'Formulas']
  },

  // English SPaG
  {
    id: 'spag-word-classes',
    subject: 'english-spag',
    title: 'Word Classes & Functions',
    description: 'Nouns, modal verbs, adverbs, prepositions, conjunctions, and relative pronouns.',
    ks2Paper: 'Paper 1: Questions',
    icon: 'Layers',
    totalQuestions: 22,
    tags: ['Modal Verbs', 'Prepositions', 'Pronouns']
  },
  {
    id: 'spag-punctuation',
    subject: 'english-spag',
    title: 'Punctuation Power',
    description: 'Colons, semi-colons, dashes, hyphens, inverted commas, and parenthetical brackets.',
    ks2Paper: 'Paper 1: Questions',
    icon: 'FileText',
    totalQuestions: 20,
    tags: ['Colons', 'Semi-Colons', 'Parenthesis']
  },
  {
    id: 'spag-sentence-grammar',
    subject: 'english-spag',
    title: 'Sentence Grammar & Voice',
    description: 'Active and passive voice, subjunctive mood, relative clauses, and fronted adverbials.',
    ks2Paper: 'Paper 1: Questions',
    icon: 'Cpu',
    totalQuestions: 18,
    tags: ['Passive Voice', 'Subjunctive', 'Relative Clauses']
  },
  {
    id: 'spag-statutory-spelling',
    subject: 'english-spag',
    title: 'Year 5/6 Statutory Spelling',
    description: 'High-frequency trick words, silent letters, -cious/-tious, and homophones.',
    ks2Paper: 'Paper 2: Spelling',
    icon: 'BookOpen',
    totalQuestions: 30,
    tags: ['DfE Word List', 'Mnemonics', 'Homophones']
  },

  // English Reading Comprehension
  {
    id: 'reading-retrieval-inference',
    subject: 'english-reading',
    title: 'Reading: Retrieval & Inference',
    description: 'Finding exact textual evidence and reading between the lines for character motives.',
    ks2Paper: 'Reading Paper',
    icon: 'Search',
    totalQuestions: 12,
    tags: ['Evidence', 'Authorial Intent', 'Vocabulary in Context']
  }
];
