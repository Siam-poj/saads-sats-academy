import { Question } from '../types/curriculum';

export const PRACTICE_EXTRA_QUESTIONS: Question[] = [
  // ==========================================
  // MATHS REASONING & ARITHMETIC
  // ==========================================
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
    satsPaperReference: '2024 KS2 SATs Paper 2: Reasoning Q7',
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
    satsPaperReference: '2023 KS2 SATs Paper 3: Reasoning Q14',
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
    satsPaperReference: '2024 KS2 SATs Paper 3: Reasoning Q19',
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
  {
    id: 'maths-area-1',
    subject: 'maths-reasoning',
    topic: 'Angles, Perimeter, Area & Volume',
    subtopic: 'Compound Area of Shapes',
    difficulty: 'Silver',
    title: 'Area of a Rectilinear Compound Shape',
    prompt: 'A playground is made of two joined rectangles: Rectangle A measures 8m by 5m, and Rectangle B measures 4m by 3m. What is the total area of the playground?',
    type: 'numeric',
    correctAnswer: '52',
    acceptableAlternatives: ['52', '52m²', '52 m2'],
    unit: 'm²',
    marks: 2,
    satsPaperReference: '2023 KS2 SATs Paper 2: Reasoning Q16',
    hints: [
      'Area of a rectangle = length × width.',
      'Find the area of Rectangle A: 8 × 5.',
      'Find the area of Rectangle B: 4 × 3.',
      'Add the two areas together.'
    ],
    stepByStepExplanation: {
      methodName: 'Compound Area Splitting',
      steps: [
        'Rectangle A: 8m × 5m = 40 m²',
        'Rectangle B: 4m × 3m = 12 m²',
        'Total area = 40 + 12 = 52 m²'
      ],
      keyTakeaway: 'Break composite rectilinear shapes into simple rectangles and sum their areas!'
    }
  },
  {
    id: 'maths-ratio-1',
    subject: 'maths-reasoning',
    topic: 'Algebra Basics & Ratio/Proportion',
    subtopic: 'Scaling Recipes & Direct Proportion',
    difficulty: 'Bronze',
    title: 'Baking Recipe Ratio Scaling',
    prompt: 'A flapjack recipe for 8 people needs 240g of rolled oats. Saad wants to make enough for 12 people. How many grams of oats does he need?',
    type: 'numeric',
    correctAnswer: '360',
    acceptableAlternatives: ['360', '360g'],
    unit: 'g',
    marks: 2,
    satsPaperReference: '2022 KS2 SATs Paper 3: Reasoning Q11',
    hints: [
      'Find how much oats are needed for 1 person (unitary method): 240g ÷ 8.',
      'Then multiply that answer by 12 people.'
    ],
    stepByStepExplanation: {
      methodName: 'The Unitary Ratio Method',
      steps: [
        'Oats for 1 person: 240g ÷ 8 = 30g per person',
        'Oats for 12 people: 30g × 12 = 360g'
      ],
      keyTakeaway: 'Always find the amount for 1 unit first (divide), then multiply by the new target!'
    }
  },

  // ==========================================
  // ENGLISH SPaG
  // ==========================================
  {
    id: 'spag-relative-1',
    subject: 'english-spag',
    topic: 'Sentence Grammar',
    subtopic: 'Relative Clauses',
    difficulty: 'Silver',
    title: 'Identifying Relative Pronouns',
    prompt: 'Which relative pronoun correctly completes the sentence below?',
    contextPassage: '"The Victorian engineer ________ designed the suspension bridge was Isambard Kingdom Brunel."',
    type: 'multiple-choice',
    options: [
      { id: 'opt-1', label: 'which', isCorrect: false },
      { id: 'opt-2', label: 'who', isCorrect: true },
      { id: 'opt-3', label: 'where', isCorrect: false },
      { id: 'opt-4', label: 'whose', isCorrect: false }
    ],
    correctAnswer: 'who',
    marks: 1,
    satsPaperReference: '2024 KS2 SATs SPaG Paper 1 Q19',
    hints: [
      'Brunel is a person, not an object or a place.',
      'We use "who" for people, and "which" for objects or animals.'
    ],
    stepByStepExplanation: {
      methodName: 'Relative Pronoun Selection Rule',
      steps: [
        'The antecedent is "The Victorian engineer" (a human person).',
        'Use "who" when referring to people.',
        '"which" is used for things and animals; "where" is used for locations.',
        'Correct relative clause: "...who designed the suspension bridge..."'
      ],
      keyTakeaway: 'Use "who" for people and "which" or "that" for objects and animals!'
    }
  },
  {
    id: 'spag-parenthesis-1',
    subject: 'english-spag',
    topic: 'Punctuation',
    subtopic: 'Parenthesis (Dashes, Brackets, Commas)',
    difficulty: 'Bronze',
    title: 'Recognising Punctuation for Parenthesis',
    prompt: 'Which pair of punctuation marks is used to show parenthesis in the sentence below?',
    contextPassage: '"Mount Everest – the highest mountain above sea level – attracts hundreds of climbers each spring."',
    type: 'multiple-choice',
    options: [
      { id: 'opt-1', label: 'Hyphens', isCorrect: false },
      { id: 'opt-2', label: 'Dashes', isCorrect: true },
      { id: 'opt-3', label: 'Inverted commas', isCorrect: false },
      { id: 'opt-4', label: 'Colons', isCorrect: false }
    ],
    correctAnswer: 'Dashes',
    marks: 1,
    satsPaperReference: '2023 KS2 SATs SPaG Paper 1 Q28',
    hints: [
      'Notice the longer lines with spaces around "the highest mountain above sea level".',
      'Hyphens join words together (like sister-in-law); dashes separate parenthetical information.'
    ],
    stepByStepExplanation: {
      methodName: 'Dash vs. Hyphen Identification',
      steps: [
        'A pair of dashes (– ... –) is used to insert extra parenthetical information that can be removed without breaking the sentence.',
        'Hyphens (-) do not have spaces and join compound words.',
        'Therefore, the marks used here are dashes.'
      ],
      keyTakeaway: 'Parenthesis can be marked with brackets ( ), commas , ,, or dashes – –!'
    }
  },
  {
    id: 'spag-spelling-2',
    subject: 'english-spag',
    topic: 'Statutory Spellings',
    subtopic: 'Year 5/6 Statutory Word List',
    difficulty: 'Gold',
    title: 'Statutory Word: Necessary',
    prompt: 'Which sentence uses the correct spelling of the statutory Year 5/6 word?',
    type: 'multiple-choice',
    options: [
      { id: 'opt-1', label: 'It is neccessary to bring a waterproof coat.', isCorrect: false },
      { id: 'opt-2', label: 'It is necessary to bring a waterproof coat.', isCorrect: true },
      { id: 'opt-3', label: 'It is necessery to bring a waterproof coat.', isCorrect: false },
      { id: 'opt-4', label: 'It is necesary to bring a waterproof coat.', isCorrect: false }
    ],
    correctAnswer: 'It is necessary to bring a waterproof coat.',
    marks: 1,
    satsPaperReference: '2024 KS2 SATs SPaG Paper 2 (Spelling) Q14',
    hints: [
      'Think of a shirt: 1 Collar and 2 Sleeves.',
      'That means: 1 "c" and 2 "s"s!'
    ],
    stepByStepExplanation: {
      methodName: 'Mnemonic: One Collar, Two Sleeves',
      steps: [
        'Mnemonic: Never forget that a shirt has 1 Collar (1 C) and 2 Sleeves (2 S’s).',
        'n - e - c - e - s - s - a - r - y.',
        'Correct statutory spelling: necessary.'
      ],
      keyTakeaway: '"Necessary" has one C and two S’s!'
    }
  },
  {
    id: 'spag-conjunction-1',
    subject: 'english-spag',
    topic: 'Sentence Grammar',
    subtopic: 'Subordinating Conjunctions',
    difficulty: 'Silver',
    title: 'Subordinating Conjunction Identification',
    prompt: 'Which word in the sentence below is a subordinating conjunction?',
    contextPassage: '"Although it was freezing outside, the children continued to build their snowman enthusiastically."',
    type: 'multiple-choice',
    options: [
      { id: 'opt-1', label: 'Although', isCorrect: true },
      { id: 'opt-2', label: 'outside', isCorrect: false },
      { id: 'opt-3', label: 'their', isCorrect: false },
      { id: 'opt-4', label: 'enthusiastically', isCorrect: false }
    ],
    correctAnswer: 'Although',
    marks: 1,
    satsPaperReference: '2024 KS2 SATs SPaG Paper 1 Q31',
    hints: [
      'Look for the conjunction that introduces a subordinate clause (an incomplete thought on its own).',
      'Remember the "ISAWAWABUB" mnemonic (If, Since, As, When, Although, While, After, Before, Until, Because).'
    ],
    stepByStepExplanation: {
      methodName: 'Subordinating Conjunction Test',
      steps: [
        '"Although it was freezing outside" cannot stand alone as a complete sentence; it is a subordinate clause.',
        '"Although" connects the subordinate clause to the main clause.',
        'Therefore, "Although" is the subordinating conjunction.'
      ],
      keyTakeaway: 'Subordinating conjunctions link subordinate clauses to main clauses (e.g. although, because, since, while)!'
    }
  },

  // ==========================================
  // ENGLISH READING COMPREHENSION
  // ==========================================
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
    satsPaperReference: '2024 KS2 SATs Reading Paper Q4',
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
    satsPaperReference: '2023 KS2 SATs Reading Paper Q17',
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
  },
  {
    id: 'reading-3',
    subject: 'english-reading',
    topic: 'Reading: Retrieval & Inference',
    subtopic: 'Authorial Technique & Atmosphere',
    difficulty: 'Gold',
    title: 'The Whispering Lighthouse - Author Intent',
    prompt: 'How does the author create a sense of mystery and suspense in the opening sentence?',
    contextPassage: '"The beam of the lighthouse swung across the jagged black rocks like a ghostly pendulum, illuminating for a fleeting second the silhouette of a vessel that should not have been there."',
    type: 'multiple-choice',
    options: [
      { id: 'opt-1', label: 'By describing the happy cheerful sunshine over the ocean.', isCorrect: false },
      { id: 'opt-2', label: 'By using eerie imagery ("ghostly pendulum", "jagged black rocks") and an unexpected silhouette.', isCorrect: true },
      { id: 'opt-3', label: 'By explaining the technical mechanics of lighthouse lamps.', isCorrect: false },
      { id: 'opt-4', label: 'By listing the names of all the sailors on board.', isCorrect: false }
    ],
    correctAnswer: 'By using eerie imagery ("ghostly pendulum", "jagged black rocks") and an unexpected silhouette.',
    marks: 1,
    satsPaperReference: '2022 KS2 SATs Reading Paper Q28',
    hints: [
      'Look at the figurative language: "like a ghostly pendulum".',
      'Notice the sinister words: "jagged black rocks", "vessel that should not have been there".'
    ],
    stepByStepExplanation: {
      methodName: 'Atmosphere and Figurative Language Analysis',
      steps: [
        'Simile: "like a ghostly pendulum" introduces an uncanny, supernatural tone.',
        'Sensory detail: "jagged black rocks" hints at impending danger.',
        'Foreshadowing: "a vessel that should not have been there" triggers tension and curiosity in the reader.'
      ],
      keyTakeaway: 'In Year 6 reading papers, look for figurative language (similes, metaphors) to explain how an author builds tension!'
    }
  },
  {
    id: 'reading-4',
    subject: 'english-reading',
    topic: 'Reading: Retrieval & Inference',
    subtopic: 'Authorial Vocabulary & Comparison',
    difficulty: 'Silver',
    title: 'The Lost Arctic Expedition',
    prompt: 'Look at the sentence: "The pack ice groaned under colossal pressure, trapping the wooden hull in an unyielding vice." What does the phrase "unyielding vice" mean in this context?',
    contextPassage: '"The pack ice groaned under colossal pressure, trapping the wooden hull in an unyielding vice. Captain Harris tapped the barometer with a furrowed brow; temperatures were plunging rapidly into the negatives."',
    type: 'multiple-choice',
    options: [
      { id: 'opt-1', label: 'A loose, soft blanket of snow', isCorrect: false },
      { id: 'opt-2', label: 'A rigid, unbreakable grip that would not let go', isCorrect: true },
      { id: 'opt-3', label: 'A mechanical tool used by the ship carpenter', isCorrect: false },
      { id: 'opt-4', label: 'A peaceful, calm winter harbour', isCorrect: false }
    ],
    correctAnswer: 'A rigid, unbreakable grip that would not let go',
    marks: 1,
    satsPaperReference: '2024 KS2 SATs Reading Paper Q12',
    hints: [
      'A vice is a workshop tool used to grip things tightly so they cannot move.',
      '"Unyielding" means stubborn or refusing to bend or soften.'
    ],
    stepByStepExplanation: {
      methodName: 'Metaphor Analysis',
      steps: [
        'The author compares the enclosing sea ice to a vice (a heavy clamp tool).',
        '"Unyielding" means rigid, refusing to give way or soften.',
        'Together, "unyielding vice" emphasizes the ship being trapped tightly and inescapably.'
      ],
      keyTakeaway: 'Metaphors compare one object to another to describe intensity or sensory experience without using "like" or "as"!'
    }
  }
];
