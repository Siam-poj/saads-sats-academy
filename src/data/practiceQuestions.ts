import { Question } from '../types/curriculum';

export const PRACTICE_EXTRA_QUESTIONS: Question[] = [
  // Maths Reasoning
  {
    id: 'reason-1',
    subject: 'maths-reasoning',
    topic: 'Multi-Step Word Problems',
    subtopic: 'Money & Change (RUCSAC)',
    difficulty: 'Bronze',
    title: 'School Stationery Word Problem',
    prompt: 'Saad buys 3 notebooks costing £2.45 each and a pack of highlighters for £3.80. He pays with a £20 note. How much change does he receive?',
    type: 'numeric',
    correctAnswer: '8.85',
    acceptableAlternatives: ['8.85', '£8.85', '8.85p'],
    unit: '£',
    marks: 2,
    hints: [
      'First calculate the total cost of the 3 notebooks: 3 × £2.45.',
      'Add the cost of the highlighters (£3.80) to find the grand total spent.',
      'Subtract that total from £20.00.'
    ],
    stepByStepExplanation: {
      methodName: 'Multi-Step Subtraction with Decimals',
      steps: [
        'Notebooks: 3 × £2.45 = £7.35',
        'Total spent: £7.35 + £3.80 = £11.15',
        'Change from £20: £20.00 - £11.15 = £8.85'
      ],
      keyTakeaway: 'Always write £20 as £20.00 to avoid decimal subtraction slip-ups!'
    }
  },
  {
    id: 'reason-2',
    subject: 'maths-reasoning',
    topic: 'Angles, Perimeter, Area & Volume',
    subtopic: 'Angles on a Straight Line & Triangles',
    difficulty: 'Silver',
    title: 'Missing Angle in an Isosceles Triangle',
    prompt: 'An isosceles triangle has one angle measuring 40°. What is the size of each of the two equal base angles?',
    type: 'numeric',
    correctAnswer: '70',
    acceptableAlternatives: ['70', '70°', '70 degrees'],
    unit: '°',
    marks: 1,
    hints: [
      'Angles in any triangle always add up to 180°.',
      'Subtract the given angle from 180°: 180° - 40° = 140°.',
      'Because it is an isosceles triangle, the remaining 140° is divided equally between the 2 base angles.'
    ],
    stepByStepExplanation: {
      methodName: 'Triangle Angle Sum Theorem',
      steps: [
        'Total degrees in triangle = 180°',
        '180° - 40° = 140° remaining for the two identical base angles',
        '140° ÷ 2 = 70° each'
      ],
      keyTakeaway: 'In an isosceles triangle, the angles opposite equal sides are always identical.'
    }
  },
  {
    id: 'reason-3',
    subject: 'maths-reasoning',
    topic: 'Algebra Basics & Ratio/Proportion',
    subtopic: 'Finding Missing Variables',
    difficulty: 'Gold',
    title: 'Simple Two-Step Equation',
    prompt: 'Solve for m:  4m + 7 = 35',
    type: 'numeric',
    correctAnswer: '7',
    acceptableAlternatives: ['7', 'm=7'],
    marks: 1,
    hints: [
      'First isolate the term with m by subtracting 7 from both sides.',
      '35 - 7 = 28.',
      'Now divide both sides by 4 to find m.'
    ],
    stepByStepExplanation: {
      methodName: 'Balancing Equations Method',
      steps: [
        '4m + 7 = 35',
        'Subtract 7 from both sides: 4m = 28',
        'Divide both sides by 4: m = 28 ÷ 4 = 7'
      ],
      keyTakeaway: 'Whatever operation you do to one side of the equals sign, do exactly the same to the other side!'
    }
  },

  // Reading Comprehension
  {
    id: 'reading-1',
    subject: 'english-reading',
    topic: 'Reading: Retrieval & Inference',
    subtopic: 'Retrieval from Non-Fiction Text',
    difficulty: 'Bronze',
    title: 'The Great Fire of London - Retrieval',
    prompt: 'According to the passage, where did the Great Fire of London begin?',
    contextPassage: '"In the early hours of Sunday 2 September 1666, a spark leaped from an oven in Thomas Farriner’s bakery on Pudding Lane. Driven by fierce easterly winds and parched timber houses after a scorching summer, the fire consumed thousands of homes over four dramatic days."',
    type: 'multiple-choice',
    options: [
      { id: 'opt-1', label: 'In a blacksmith shop on Fleet Street', isCorrect: false },
      { id: 'opt-2', label: 'In Thomas Farriner’s bakery on Pudding Lane', isCorrect: true },
      { id: 'opt-3', label: 'Near the docks on London Bridge', isCorrect: false },
      { id: 'opt-4', label: 'In the cellar of St Paul’s Cathedral', isCorrect: false }
    ],
    correctAnswer: 'In Thomas Farriner’s bakery on Pudding Lane',
    marks: 1,
    hints: [
      'Scan the text for the words "bakery" or "Lane".',
      'The exact sentence mentions Thomas Farriner.'
    ],
    stepByStepExplanation: {
      methodName: 'Direct Textual Retrieval',
      steps: [
        'Locate the key noun: "bakery"',
        'The passage states directly: "...in Thomas Farriner’s bakery on Pudding Lane."',
        'Select the option that matches the exact textual evidence.'
      ],
      keyTakeaway: 'For retrieval questions in SATs Reading, find the keywords directly in the passage—never guess!'
    }
  },
  {
    id: 'reading-2',
    subject: 'english-reading',
    topic: 'Reading: Retrieval & Inference',
    subtopic: 'Inference and Vocabulary in Context',
    difficulty: 'Silver',
    title: 'Character Emotion & Vocabulary',
    prompt: 'What does the word "apprehensive" suggest about Amir’s feelings in the passage?',
    contextPassage: '"Amir stood at the edge of the cavernous hall, clutching his script tightly. His palms were damp, and an apprehensive tremor ran through his voice as he prepared to step into the blinding stage lights."',
    type: 'multiple-choice',
    options: [
      { id: 'opt-1', label: 'He was confident and eager to begin.', isCorrect: false },
      { id: 'opt-2', label: 'He was nervous and fearful of what might happen.', isCorrect: true },
      { id: 'opt-3', label: 'He was bored and disinterested.', isCorrect: false },
      { id: 'opt-4', label: 'He was furious at the stage crew.', isCorrect: false }
    ],
    correctAnswer: 'He was nervous and fearful of what might happen.',
    marks: 1,
    hints: [
      'Notice the clues around it: "clutching his script tightly", "palms were damp", "tremor in his voice".',
      'These are physical symptoms of anxiety or stage fright.'
    ],
    stepByStepExplanation: {
      methodName: 'Contextual Clue Analysis',
      steps: [
        'The physical signs ("damp palms", "tremor") show high anxiety.',
        '"Apprehensive" means feeling anxious or fearful that something unpleasant or difficult will happen.',
        'Therefore, Amir is nervous and anxious about going on stage.'
      ],
      keyTakeaway: 'Use surrounding character actions and body language to deduce the meaning of unfamiliar vocabulary!'
    }
  }
];
