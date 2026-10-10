import { Question } from '../types/curriculum';

export const SPRINT_SAMPLE_QUESTIONS: Question[] = [
  // ==========================================
  // 5 ARITHMETIC QUESTIONS (KS2 Paper 1)
  // ==========================================
  {
    id: 'sprint-arith-1',
    subject: 'maths-arithmetic',
    topic: 'Decimals & Place Value',
    subtopic: 'Column Addition with Decimals',
    difficulty: 'Bronze',
    title: 'Decimal Column Addition',
    prompt: 'Calculate the exact value:',
    equationDisplay: '3.45 + 7.8 = [ ? ]',
    type: 'numeric',
    correctAnswer: '11.25',
    acceptableAlternatives: ['11.25', '11.250'],
    marks: 1,
    hints: [
      'Line up the decimal points directly underneath each other.',
      'Remember that 7.8 is the same as 7.80. Add a placeholder zero to avoid place value confusion!',
      'Add the hundredths (5 + 0 = 5), then tenths (4 + 8 = 12, carry 1), then units.'
    ],
    stepByStepExplanation: {
      methodName: 'Column Decimal Alignment',
      steps: [
        'Write 3.45 and 7.80 vertically, aligning the decimal point (.)',
        'Hundredths column: 5 + 0 = 5',
        'Tenths column: 4 + 8 = 12 (write 2 down, carry 1 into the units)',
        'Units column: 3 + 7 + 1 (carried) = 11',
        'Result: 11.25'
      ],
      keyTakeaway: 'Always align the decimal points and pad blank spaces with placeholder zeroes!'
    }
  },
  {
    id: 'sprint-arith-2',
    subject: 'maths-arithmetic',
    topic: 'Long Multiplication',
    subtopic: '3-digit by 2-digit multiplication',
    difficulty: 'Silver',
    title: 'Long Multiplication',
    prompt: 'Calculate the product:',
    equationDisplay: '436 × 24 = [ ? ]',
    type: 'numeric',
    correctAnswer: '10464',
    acceptableAlternatives: ['10464', '10,464'],
    marks: 2,
    hints: [
      'Break 24 into 20 and 4. First multiply 436 by 4.',
      'Before multiplying by 2 (the tens digit), remember to put down the placeholder zero (0)!',
      'Then add your two partial products together.'
    ],
    stepByStepExplanation: {
      methodName: 'Long Multiplication Two-Step Method',
      steps: [
        'Step 1: Multiply 436 × 4 (units): 6 × 4 = 24 (carry 2), 3 × 4 + 2 = 14 (carry 1), 4 × 4 + 1 = 17 -> Partial product = 1,744',
        'Step 2: Place down a placeholder "0" on the next line because you are multiplying by 20.',
        'Step 3: Multiply 436 × 2: 6 × 2 = 12 (carry 1), 3 × 2 + 1 = 7, 4 × 2 = 8 -> Partial product = 8,720',
        'Step 4: Add the two partial products: 1,744 + 8,720 = 10,464.'
      ],
      keyTakeaway: 'In SATs Paper 1, questions worth 2 marks award 1 mark for correct working even if a single addition slip occurs!'
    }
  },
  {
    id: 'sprint-arith-3',
    subject: 'maths-arithmetic',
    topic: 'Fractions',
    subtopic: 'Multiplying Proper Fractions',
    difficulty: 'Silver',
    title: 'Multiplying Fractions',
    prompt: 'Multiply these fractions. Give your answer in its simplest form:',
    equationDisplay: '3/4 × 2/5 = [ ? ]',
    type: 'multiple-choice',
    options: [
      { id: 'opt-1', label: '3/10', isCorrect: true },
      { id: 'opt-2', label: '6/20', isCorrect: false },
      { id: 'opt-3', label: '5/9', isCorrect: false },
      { id: 'opt-4', label: '8/15', isCorrect: false }
    ],
    correctAnswer: '3/10',
    marks: 1,
    hints: [
      'When multiplying fractions, multiply straight across: numerator × numerator, and denominator × denominator.',
      '3 × 2 = 6, and 4 × 5 = 20. That gives 6/20.',
      'Can you simplify 6/20 by dividing both top and bottom by their greatest common factor (2)?'
    ],
    stepByStepExplanation: {
      methodName: 'Multiply Across & Simplify',
      steps: [
        'Top numbers (numerators): 3 × 2 = 6',
        'Bottom numbers (denominators): 4 × 5 = 20',
        'Fraction is 6/20',
        'Simplify by dividing top and bottom by 2: 6 ÷ 2 = 3, and 20 ÷ 2 = 10 -> 3/10'
      ],
      keyTakeaway: 'Always check if the fraction can be simplified to earn maximum SATs marks!'
    }
  },
  {
    id: 'sprint-arith-4',
    subject: 'maths-arithmetic',
    topic: 'Short Division',
    subtopic: 'Bus-Stop Division with 4-digit numbers',
    difficulty: 'Bronze',
    title: 'Bus-Stop Short Division',
    prompt: 'Calculate the quotient:',
    equationDisplay: '3,816 ÷ 6 = [ ? ]',
    type: 'numeric',
    correctAnswer: '636',
    acceptableAlternatives: ['636'],
    marks: 1,
    hints: [
      'Set up the bus stop: 6 on the outside, 3816 inside.',
      'How many 6s go into 3? (0, carry 3 to make 38). How many 6s in 38? (6 remainder 2).',
      'Now carry 2 over to the 1 to make 21, and continue!'
    ],
    stepByStepExplanation: {
      methodName: 'Bus-Stop Division',
      steps: [
        '6 into 3: 0 times, remainder 3 (move to next digit -> 38)',
        '6 into 38: 6 times (since 6 × 6 = 36), remainder 2 (move to next digit -> 21)',
        '6 into 21: 3 times (since 6 × 3 = 18), remainder 3 (move to next digit -> 36)',
        '6 into 36: exactly 6 times (since 6 × 6 = 36), no remainder',
        'Final answer = 636'
      ],
      keyTakeaway: 'Keep your carried remainder numbers small and neat above the line!'
    }
  },
  {
    id: 'sprint-arith-5',
    subject: 'maths-arithmetic',
    topic: 'Percentages',
    subtopic: 'Finding 35% of an amount',
    difficulty: 'Gold',
    title: 'Percentage of an Amount',
    prompt: 'Find the percentage value:',
    equationDisplay: '35% of 420 = [ ? ]',
    type: 'numeric',
    correctAnswer: '147',
    acceptableAlternatives: ['147'],
    marks: 1,
    hints: [
      'Deconstruct 35% into easier building blocks: (10% × 3) + 5%.',
      'To find 10% of 420, divide by 10 = 42.',
      'To find 5%, halve your 10% value: 42 ÷ 2 = 21.',
      'Add them up: 3 × 42 + 21.'
    ],
    stepByStepExplanation: {
      methodName: 'Mental Percentages Building Blocks',
      steps: [
        '10% of 420 = 420 ÷ 10 = 42',
        '30% = 42 × 3 = 126',
        '5% = Half of 10% = 42 ÷ 2 = 21',
        '35% = 30% + 5% = 126 + 21 = 147'
      ],
      keyTakeaway: 'Breaking down percentages into 10%, 5%, and 1% makes even complex calculations lightning fast without a calculator!'
    }
  },

  // ==========================================
  // 5 SPaG QUESTIONS (KS2 English Grammar)
  // ==========================================
  {
    id: 'sprint-spag-1',
    subject: 'english-spag',
    topic: 'Word Classes',
    subtopic: 'Modal Verbs',
    difficulty: 'Bronze',
    title: 'Identify the Modal Verb',
    prompt: 'Which word in the sentence below is a modal verb expressing possibility?',
    contextPassage: '"The weather forecast said that it might snow heavily over the weekend."',
    type: 'multiple-choice',
    options: [
      { id: 'opt-1', label: 'said', isCorrect: false },
      { id: 'opt-2', label: 'might', isCorrect: true },
      { id: 'opt-3', label: 'heavily', isCorrect: false },
      { id: 'opt-4', label: 'over', isCorrect: false }
    ],
    correctAnswer: 'might',
    marks: 1,
    hints: [
      'Modal verbs are helper verbs that show possibility, necessity, or permission (e.g. can, could, may, might, must, should, would).',
      'Look for the word that tells us if the snow is possible rather than definite.'
    ],
    stepByStepExplanation: {
      methodName: 'Modal Verb Recognition',
      steps: [
        '"said" is a past-tense reporting verb.',
        '"heavily" is an adverb of manner modifying the verb snow.',
        '"might" is a modal auxiliary verb indicating possibility or probability.',
        'Therefore, "might" is the correct modal verb.'
      ],
      keyTakeaway: 'The 9 core KS2 modal verbs to memorise are: can, could, may, might, shall, should, will, would, must.'
    }
  },
  {
    id: 'sprint-spag-2',
    subject: 'english-spag',
    topic: 'Punctuation',
    subtopic: 'Colons and Semi-Colons',
    difficulty: 'Silver',
    title: 'Using Semi-Colons between Independent Clauses',
    prompt: 'Which sentence uses a semi-colon correctly to link two closely related independent clauses?',
    type: 'multiple-choice',
    options: [
      {
        id: 'opt-1',
        label: 'The train was delayed; we arrived just in time for the ceremony.',
        isCorrect: true
      },
      {
        id: 'opt-2',
        label: 'Because the train was delayed; we arrived late.',
        isCorrect: false
      },
      {
        id: 'opt-3',
        label: 'We packed our bags; tents, and sleeping bags.',
        isCorrect: false
      },
      {
        id: 'opt-4',
        label: 'The conductor shouted; "All aboard!"',
        isCorrect: false
      }
    ],
    correctAnswer: 'The train was delayed; we arrived just in time for the ceremony.',
    marks: 1,
    hints: [
      'A semi-colon joins two complete independent clauses that could each stand alone as their own sentence.',
      'Check if both sides of the semi-colon make a complete sentence on their own without a coordinating conjunction (like and/but).'
    ],
    stepByStepExplanation: {
      methodName: 'Semi-Colon Clause Test',
      steps: [
        'Test clause 1: "The train was delayed." (Complete sentence)',
        'Test clause 2: "We arrived just in time for the ceremony." (Complete sentence)',
        'Both clauses are closely linked in meaning and do not need "and" or "so".',
        'Option 2 has a subordinate clause "Because...", so a comma is needed instead.'
      ],
      keyTakeaway: 'A semi-colon connects two independent clauses that could each stand alone as complete sentences.'
    }
  },
  {
    id: 'sprint-spag-3',
    subject: 'english-spag',
    topic: 'Sentence Grammar',
    subtopic: 'Active and Passive Voice',
    difficulty: 'Silver',
    title: 'Recognising Passive Voice',
    prompt: 'Which of the sentences below is written in the passive voice?',
    type: 'multiple-choice',
    options: [
      {
        id: 'opt-1',
        label: 'The archaeologist carefully brushed the fragile pottery.',
        isCorrect: false
      },
      {
        id: 'opt-2',
        label: 'The ancient scroll was discovered by the explorer.',
        isCorrect: true
      },
      {
        id: 'opt-3',
        label: 'Curious visitors filled the museum corridors.',
        isCorrect: false
      },
      {
        id: 'opt-4',
        label: 'The museum curator unlocked the heavy oak doors.',
        isCorrect: false
      }
    ],
    correctAnswer: 'The ancient scroll was discovered by the explorer.',
    marks: 1,
    hints: [
      'In active voice, the subject performs the action (e.g., "The cat chased the mouse").',
      'In passive voice, the subject receives the action, often with a form of the verb "to be" + past participle and often followed by "by..." (e.g., "The mouse was chased by the cat").'
    ],
    stepByStepExplanation: {
      methodName: 'Active vs. Passive Test',
      steps: [
        'Sentence: "The ancient scroll was discovered by the explorer."',
        'The subject is "The ancient scroll", but it did not do the discovering—it was acted upon.',
        'It uses the auxiliary verb "was" + past participle "discovered" + agent preposition phrase "by the explorer".',
        'Therefore, it is in the passive voice.'
      ],
      keyTakeaway: 'Look for: [Object as Subject] + [form of "be"] + [past participle] + [optional "by ..."].'
    }
  },
  {
    id: 'sprint-spag-4',
    subject: 'english-spag',
    topic: 'Sentence Grammar',
    subtopic: 'Subjunctive Form',
    difficulty: 'Gold',
    title: 'The Subjunctive Form',
    prompt: 'Which sentence correctly uses the subjunctive form for a hypothetical wish/condition?',
    type: 'multiple-choice',
    options: [
      {
        id: 'opt-1',
        label: 'If I was the Prime Minister, I would increase the science budget.',
        isCorrect: false
      },
      {
        id: 'opt-2',
        label: 'If I were the Prime Minister, I would increase the science budget.',
        isCorrect: true
      },
      {
        id: 'opt-3',
        label: 'If I am the Prime Minister, I will increase the science budget.',
        isCorrect: false
      },
      {
        id: 'opt-4',
        label: 'If I could be the Prime Minister, I was increasing the budget.',
        isCorrect: false
      }
    ],
    correctAnswer: 'If I were the Prime Minister, I would increase the science budget.',
    marks: 1,
    hints: [
      'The subjunctive form is used for hypothetical conditions (things that are not actually true) or formal demands.',
      'In standard KS2 English, we use "were" instead of "was" with "I", "he", and "she" in hypothetical "If..." statements.'
    ],
    stepByStepExplanation: {
      methodName: 'Subjunctive Mood Rule',
      steps: [
        'The speaker is imagining an unreal or hypothetical scenario ("If I...").',
        'In the subjunctive form of the verb "to be", the singular past form changes from "was" to "were" for all subjects.',
        'Hence: "If I were..." is the grammatically correct formal standard English required for SATs.'
      ],
      keyTakeaway: 'For hypothetical unreal conditions, always use "If I were..." or "If he/she were...", not "was"!'
    }
  },
  {
    id: 'sprint-spag-5',
    subject: 'english-spag',
    topic: 'Statutory Spellings',
    subtopic: 'Year 5 and 6 Statutory Word List',
    difficulty: 'Gold',
    title: 'Statutory Year 5/6 Spelling',
    prompt: 'Choose the sentence that correctly spells the statutory Year 5/6 word:',
    type: 'multiple-choice',
    options: [
      {
        id: 'opt-1',
        label: 'The hotel was able to acomodate all thirty students.',
        isCorrect: false
      },
      {
        id: 'opt-2',
        label: 'The hotel was able to accommodate all thirty students.',
        isCorrect: true
      },
      {
        id: 'opt-3',
        label: 'The hotel was able to accomadate all thirty students.',
        isCorrect: false
      },
      {
        id: 'opt-4',
        label: 'The hotel was able to acommodate all thirty students.',
        isCorrect: false
      }
    ],
    correctAnswer: 'The hotel was able to accommodate all thirty students.',
    marks: 1,
    hints: [
      'This tricky word has double "c" and double "m".',
      'Mnemonic tip: "A double Coach with double Music can ACCOMMODATE everyone!"'
    ],
    stepByStepExplanation: {
      methodName: 'Double Consonant Rule',
      steps: [
        'The root word comes from Latin "accommodare".',
        'It has two "c"s: a-c-c',
        'It has two "m"s: o-m-m-o-d-a-t-e',
        'Correct statutory spelling: a-c-c-o-m-m-o-d-a-t-e (accommodate).'
      ],
      keyTakeaway: '"Accommodate" has 2 Cs and 2 Ms. Remember: 2 Cots and 2 Mattresses!'
    }
  }
];
