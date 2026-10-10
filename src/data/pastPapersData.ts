export interface PrintableQuestion {
  id: string;
  number: number;
  prompt: string;
  type: 'arithmetic-grid' | 'multiple-choice' | 'lines' | 'tick-box' | 'spelling-gap' | 'table';
  equation?: string;
  options?: string[];
  linesCount?: number;
  marks: number;
  markScheme: {
    answer: string;
    guidance?: string;
    acceptable?: string[];
  };
}

export interface PastPaper {
  id: string;
  year: string;
  subject: 'maths' | 'spag' | 'reading';
  paperCode: string;
  title: string;
  timeAllowed: string;
  totalMarks: number;
  subtitle: string;
  instructions: string[];
  equipmentNeeded: string[];
  readingTextPassage?: {
    title: string;
    genre: string;
    content: string[];
  };
  teacherSpellingScript?: {
    wordNumber: number;
    targetWord: string;
    sentenceWithGap: string;
    fullSentenceToRead: string;
  }[];
  questions: PrintableQuestion[];
}

export const PAST_PAPERS: PastPaper[] = [
  // ==========================================
  // MATHS PAPER 1: ARITHMETIC
  // ==========================================
  {
    id: 'maths-2024-p1',
    year: '2024 / 2025 Series',
    subject: 'maths',
    paperCode: 'Paper 1',
    title: 'Mathematics Paper 1: Arithmetic',
    subtitle: 'Standard National Curriculum Key Stage 2 Assessment',
    timeAllowed: '30 minutes',
    totalMarks: 40,
    equipmentNeeded: ['Blue or black pen', 'Pencil', 'Ruler (No calculator allowed)'],
    instructions: [
      'You have 30 minutes to complete this paper.',
      'Work as quickly and as carefully as you can.',
      'All working out should be written in the squared boxes provided.',
      'For questions with 2 marks, you can get 1 mark for showing a formal written method even if the final answer has an error.',
      'Write your final answers clearly in the answer box provided.'
    ],
    questions: [
      {
        id: 'm1-q1',
        number: 1,
        prompt: 'Calculate:',
        type: 'arithmetic-grid',
        equation: '97 + 10 =',
        marks: 1,
        markScheme: { answer: '107' }
      },
      {
        id: 'm1-q2',
        number: 2,
        prompt: 'Calculate:',
        type: 'arithmetic-grid',
        equation: '348 - 100 =',
        marks: 1,
        markScheme: { answer: '248' }
      },
      {
        id: 'm1-q3',
        number: 3,
        prompt: 'Calculate:',
        type: 'arithmetic-grid',
        equation: '6.4 + 0.9 =',
        marks: 1,
        markScheme: { answer: '7.3' }
      },
      {
        id: 'm1-q4',
        number: 4,
        prompt: 'Calculate:',
        type: 'arithmetic-grid',
        equation: '7 × 9 =',
        marks: 1,
        markScheme: { answer: '63' }
      },
      {
        id: 'm1-q5',
        number: 5,
        prompt: 'Calculate:',
        type: 'arithmetic-grid',
        equation: '432 × 0 =',
        marks: 1,
        markScheme: { answer: '0' }
      },
      {
        id: 'm1-q6',
        number: 6,
        prompt: 'Calculate:',
        type: 'arithmetic-grid',
        equation: '6,432 + 2,875 =',
        marks: 1,
        markScheme: { answer: '9,307' }
      },
      {
        id: 'm1-q7',
        number: 7,
        prompt: 'Calculate:',
        type: 'arithmetic-grid',
        equation: '5,000 - 1,462 =',
        marks: 1,
        markScheme: { answer: '3,538' }
      },
      {
        id: 'm1-q8',
        number: 8,
        prompt: 'Calculate:',
        type: 'arithmetic-grid',
        equation: '3/7 + 2/7 =',
        marks: 1,
        markScheme: { answer: '5/7' }
      },
      {
        id: 'm1-q9',
        number: 9,
        prompt: 'Calculate:',
        type: 'arithmetic-grid',
        equation: '4.08 × 100 =',
        marks: 1,
        markScheme: { answer: '408' }
      },
      {
        id: 'm1-q10',
        number: 10,
        prompt: 'Calculate:',
        type: 'arithmetic-grid',
        equation: '72 ÷ 8 =',
        marks: 1,
        markScheme: { answer: '9' }
      },
      {
        id: 'm1-q11',
        number: 11,
        prompt: 'Calculate:',
        type: 'arithmetic-grid',
        equation: '3² + 4² =',
        marks: 1,
        markScheme: { answer: '25', guidance: '3² = 9, 4² = 16, 9 + 16 = 25' }
      },
      {
        id: 'm1-q12',
        number: 12,
        prompt: 'Calculate:',
        type: 'arithmetic-grid',
        equation: '1/4 + 3/8 =',
        marks: 1,
        markScheme: { answer: '5/8', guidance: 'Convert 1/4 to 2/8. 2/8 + 3/8 = 5/8' }
      },
      {
        id: 'm1-q13',
        number: 13,
        prompt: 'Calculate:',
        type: 'arithmetic-grid',
        equation: '45% of 360 =',
        marks: 1,
        markScheme: { answer: '162', guidance: '10% = 36. 40% = 144. 5% = 18. 144 + 18 = 162' }
      },
      {
        id: 'm1-q14',
        number: 14,
        prompt: 'Calculate:',
        type: 'arithmetic-grid',
        equation: '5 - 3.24 =',
        marks: 1,
        markScheme: { answer: '1.76' }
      },
      {
        id: 'm1-q15',
        number: 15,
        prompt: 'Calculate using formal method:',
        type: 'arithmetic-grid',
        equation: '738 × 6 =',
        marks: 1,
        markScheme: { answer: '4,428' }
      },
      {
        id: 'm1-q16',
        number: 16,
        prompt: 'Calculate using formal long multiplication (Show your method):',
        type: 'arithmetic-grid',
        equation: '542 × 37 =',
        marks: 2,
        markScheme: {
          answer: '20,054',
          guidance: 'Award 2 marks for correct answer. Award 1 mark for correct formal method with at most 1 arithmetic slip (542 × 30 = 16,260 and 542 × 7 = 3,794).'
        }
      },
      {
        id: 'm1-q17',
        number: 17,
        prompt: 'Calculate using formal division (Show your method):',
        type: 'arithmetic-grid',
        equation: '1,848 ÷ 14 =',
        marks: 2,
        markScheme: {
          answer: '132',
          guidance: 'Award 2 marks for correct answer. Award 1 mark for correct formal bus-stop or long division method with at most 1 calculation slip.'
        }
      },
      {
        id: 'm1-q18',
        number: 18,
        prompt: 'Calculate:',
        type: 'arithmetic-grid',
        equation: '2/5 × 3/4 =',
        marks: 1,
        markScheme: { answer: '6/20 (or simplified 3/10)' }
      },
      {
        id: 'm1-q19',
        number: 19,
        prompt: 'Calculate:',
        type: 'arithmetic-grid',
        equation: '3/8 ÷ 2 =',
        marks: 1,
        markScheme: { answer: '3/16' }
      },
      {
        id: 'm1-q20',
        number: 20,
        prompt: 'Calculate (Apply BODMAS/BIDMAS):',
        type: 'arithmetic-grid',
        equation: '50 - 6 × 7 =',
        marks: 1,
        markScheme: { answer: '8', guidance: 'Multiplication first: 6 × 7 = 42. Then 50 - 42 = 8.' }
      }
    ]
  },

  // ==========================================
  // MATHS PAPER 2: REASONING
  // ==========================================
  {
    id: 'maths-2024-p2',
    year: '2024 / 2025 Series',
    subject: 'maths',
    paperCode: 'Paper 2',
    title: 'Mathematics Paper 2: Reasoning',
    subtitle: 'Standard National Curriculum Key Stage 2 Assessment',
    timeAllowed: '40 minutes',
    totalMarks: 35,
    equipmentNeeded: ['Blue or black pen', 'Pencil', 'Ruler', 'Angle measurer / Protractor (No calculator allowed)'],
    instructions: [
      'You have 40 minutes to complete this paper.',
      'Follow the instructions for each question carefully.',
      'If you need to do working out, use the space on the page.',
      'For questions carrying 2 marks, you can get 1 mark for showing a clear, correct method even if the final answer is wrong.',
      'Check your answers carefully before finishing.'
    ],
    questions: [
      {
        id: 'm2-q1',
        number: 1,
        prompt: 'Write the number twenty-six thousand, four hundred and eight in digits.',
        type: 'lines',
        linesCount: 1,
        marks: 1,
        markScheme: { answer: '26,408' }
      },
      {
        id: 'm2-q2',
        number: 2,
        prompt: 'Round 74,582 to the nearest thousand and to the nearest hundred.',
        type: 'lines',
        linesCount: 2,
        marks: 2,
        markScheme: {
          answer: 'Nearest thousand: 75,000 | Nearest hundred: 74,600',
          guidance: 'Award 1 mark for each correctly rounded value.'
        }
      },
      {
        id: 'm2-q3',
        number: 3,
        prompt: 'Saad has 3 bags of marbles. Bag A has 24 marbles. Bag B has twice as many marbles as Bag A. Bag C has 15 fewer marbles than Bag B. How many marbles are in Bag C?',
        type: 'lines',
        linesCount: 3,
        marks: 2,
        markScheme: {
          answer: '33 marbles',
          guidance: 'Bag B = 24 × 2 = 48. Bag C = 48 - 15 = 33. Award 1 mark for calculating Bag B = 48 with correct method.'
        }
      },
      {
        id: 'm2-q4',
        number: 4,
        prompt: 'A rectangle has a length of 14 cm and a perimeter of 40 cm. What is the area of the rectangle? Show your working.',
        type: 'lines',
        linesCount: 4,
        marks: 2,
        markScheme: {
          answer: '84 cm²',
          guidance: 'Width = (40 - 28) ÷ 2 = 6 cm. Area = 14 × 6 = 84 cm². Award 1 mark for finding width = 6 cm.'
        }
      },
      {
        id: 'm2-q5',
        number: 5,
        prompt: 'In a class of 30 pupils, 2/5 of the pupils walk to school and 30% take the bus. The rest cycle. How many pupils cycle to school?',
        type: 'lines',
        linesCount: 4,
        marks: 2,
        markScheme: {
          answer: '9 pupils',
          guidance: 'Walk: 2/5 of 30 = 12. Bus: 30% of 30 = 9. Total walk + bus = 21. Cycle = 30 - 21 = 9 pupils. Award 1 mark for finding both walk (12) and bus (9).'
        }
      },
      {
        id: 'm2-q6',
        number: 6,
        prompt: 'The temperature in London is 6°C. In Montreal, the temperature is 14°C colder. What is the temperature in Montreal?',
        type: 'lines',
        linesCount: 1,
        marks: 1,
        markScheme: { answer: '-8°C' }
      },
      {
        id: 'm2-q7',
        number: 7,
        prompt: 'Here are three coordinates of a parallelogram: (1, 2), (4, 2), (6, 6). What are the coordinates of the fourth vertex?',
        type: 'lines',
        linesCount: 2,
        marks: 1,
        markScheme: { answer: '(3, 6)', acceptable: ['3, 6', '(3,6)'] }
      },
      {
        id: 'm2-q8',
        number: 8,
        prompt: 'A train departs Leeds at 14:38 and arrives in London King\'s Cross at 16:53. How long did the journey take in hours and minutes?',
        type: 'lines',
        linesCount: 2,
        marks: 1,
        markScheme: { answer: '2 hours and 15 minutes', acceptable: ['2 hours 15 mins', '135 minutes'] }
      }
    ]
  },

  // ==========================================
  // ENGLISH SPAG PAPER 1: QUESTIONS
  // ==========================================
  {
    id: 'spag-2024-p1',
    year: '2024 / 2025 Series',
    subject: 'spag',
    paperCode: 'Paper 1',
    title: 'English SPaG Paper 1: Questions',
    subtitle: 'Grammar, Punctuation and Vocabulary Assessment',
    timeAllowed: '45 minutes',
    totalMarks: 50,
    equipmentNeeded: ['Blue or black pen'],
    instructions: [
      'You have 45 minutes to complete this paper.',
      'Pay particular attention to punctuation, capital letters, and clear handwriting.',
      'Tick or write your answer clearly in the space provided.'
    ],
    questions: [
      {
        id: 'spag-q1',
        number: 1,
        prompt: 'What is the word class of the underlined word in the sentence below?\n"The majestic owl soared gracefully through the moonlit canopy."',
        type: 'multiple-choice',
        options: ['Adjective', 'Adverb', 'Noun', 'Verb'],
        marks: 1,
        markScheme: { answer: 'Adverb', guidance: '"gracefully" describes how the owl soared.' }
      },
      {
        id: 'spag-q2',
        number: 2,
        prompt: 'Tick the sentence that must end with a question mark:',
        type: 'tick-box',
        options: [
          'Saad asked whether he could borrow the dictionary',
          'I wonder what time the school gate opens',
          'Would you like another slice of watermelon',
          'Tell me when you have finished your arithmetic'
        ],
        marks: 1,
        markScheme: { answer: 'Would you like another slice of watermelon' }
      },
      {
        id: 'spag-q3',
        number: 3,
        prompt: 'Insert a colon in the correct position in the sentence below:\n"Saad packed all the equipment he needed for the expedition a compass, a warm sleeping bag and a sturdy flashlight."',
        type: 'lines',
        linesCount: 2,
        marks: 1,
        markScheme: {
          answer: '"...expedition: a compass, a warm sleeping bag and a sturdy flashlight."',
          guidance: 'Colon must be placed between "expedition" and "a compass" to introduce the list.'
        }
      },
      {
        id: 'spag-q4',
        number: 4,
        prompt: 'Rewrite the active sentence into the passive voice:\n"The headteacher presented the academic achievement award to Saad."',
        type: 'lines',
        linesCount: 2,
        marks: 1,
        markScheme: {
          answer: 'The academic achievement award was presented to Saad by the headteacher.',
          guidance: 'Must contain "was presented" and retain capital letter and full stop.'
        }
      },
      {
        id: 'spag-q5',
        number: 5,
        prompt: 'Which sentence uses a fronted adverbial punctuated with a comma correctly?',
        type: 'tick-box',
        options: [
          'Without making a single sound, the leopard crept toward its prey.',
          'Without making a single sound the leopard crept, toward its prey.',
          'The leopard crept toward, its prey without making a single sound.',
          'Without, making a single sound the leopard crept toward its prey.'
        ],
        marks: 1,
        markScheme: { answer: 'Without making a single sound, the leopard crept toward its prey.' }
      },
      {
        id: 'spag-q6',
        number: 6,
        prompt: 'Which word in the sentence below is a relative pronoun?\n"The ancient oak tree that stands beside the library was planted over three centuries ago."',
        type: 'lines',
        linesCount: 1,
        marks: 1,
        markScheme: { answer: 'that' }
      },
      {
        id: 'spag-q7',
        number: 7,
        prompt: 'Add hyphens to make the meaning unambiguous:\n"There were twenty four hour libraries open across the city during exam week."',
        type: 'lines',
        linesCount: 2,
        marks: 1,
        markScheme: {
          answer: '"twenty four-hour libraries" (meaning libraries open 24 hours) OR "twenty-four hour-libraries"',
          guidance: 'Hyphen between "twenty-four" or "four-hour".'
        }
      },
      {
        id: 'spag-q8',
        number: 8,
        prompt: 'Complete the sentence with the subjunctive form of the verb "to be":\n"If Saad ________ the captain of the squad, he would lead the team to victory."',
        type: 'lines',
        linesCount: 1,
        marks: 1,
        markScheme: { answer: 'were', guidance: 'Subjunctive mood requires "were", not "was".' }
      }
    ]
  },

  // ==========================================
  // ENGLISH SPAG PAPER 2: SPELLING SCRIPT
  // ==========================================
  {
    id: 'spag-2024-p2',
    year: '2024 / 2025 Series',
    subject: 'spag',
    paperCode: 'Paper 2',
    title: 'English SPaG Paper 2: Spelling',
    subtitle: 'Statutory Year 5 & 6 Spelling Curriculum Test & Teacher Script',
    timeAllowed: '15 minutes',
    totalMarks: 20,
    equipmentNeeded: ['Blue or black pen', 'Parent/Teacher script to read aloud'],
    instructions: [
      'The examiner or parent reads each sentence aloud twice.',
      'The pupil writes the missing target word in their booklet.',
      'Check all letter formations, silent letters, and suffix spellings.'
    ],
    teacherSpellingScript: [
      {
        wordNumber: 1,
        targetWord: 'accommodate',
        sentenceWithGap: 'The hotel can ___________ up to four hundred guests.',
        fullSentenceToRead: 'The word is accommodate. The hotel can accommodate up to four hundred guests. The word is accommodate.'
      },
      {
        wordNumber: 2,
        targetWord: 'curiosity',
        sentenceWithGap: 'Saad investigated the mysterious drawer with growing ___________.',
        fullSentenceToRead: 'The word is curiosity. Saad investigated the mysterious drawer with growing curiosity. The word is curiosity.'
      },
      {
        wordNumber: 3,
        targetWord: 'embarrass',
        sentenceWithGap: 'He did not want to ___________ his younger sister in front of her friends.',
        fullSentenceToRead: 'The word is embarrass. He did not want to embarrass his younger sister in front of her friends. The word is embarrass.'
      },
      {
        wordNumber: 4,
        targetWord: 'guarantee',
        sentenceWithGap: 'The new calculator comes with a two-year ___________ against faults.',
        fullSentenceToRead: 'The word is guarantee. The new calculator comes with a two-year guarantee against faults. The word is guarantee.'
      },
      {
        wordNumber: 5,
        targetWord: 'mischievous',
        sentenceWithGap: 'The ___________ kitten climbed to the top of the curtain rail.',
        fullSentenceToRead: 'The word is mischievous. The mischievous kitten climbed to the top of the curtain rail. The word is mischievous.'
      },
      {
        wordNumber: 6,
        targetWord: 'parliament',
        sentenceWithGap: 'The members of ___________ gathered in London to debate the new law.',
        fullSentenceToRead: 'The word is parliament. The members of parliament gathered in London to debate the new law. The word is parliament.'
      },
      {
        wordNumber: 7,
        targetWord: 'rhythm',
        sentenceWithGap: 'The drummer maintained a steady ___________ throughout the concert.',
        fullSentenceToRead: 'The word is rhythm. The drummer maintained a steady rhythm throughout the concert. The word is rhythm.'
      },
      {
        wordNumber: 8,
        targetWord: 'sincerely',
        sentenceWithGap: 'Saad signed the formal letter "Yours ___________".',
        fullSentenceToRead: 'The word is sincerely. Saad signed the formal letter Yours sincerely. The word is sincerely.'
      },
      {
        wordNumber: 9,
        targetWord: 'thorough',
        sentenceWithGap: 'She carried out a ___________ inspection of the science laboratory.',
        fullSentenceToRead: 'The word is thorough. She carried out a thorough inspection of the science laboratory. The word is thorough.'
      },
      {
        wordNumber: 10,
        targetWord: 'yacht',
        sentenceWithGap: 'A luxurious white ___________ sailed gracefully into the harbour.',
        fullSentenceToRead: 'The word is yacht. A luxurious white yacht sailed gracefully into the harbour. The word is yacht.'
      }
    ],
    questions: [
      {
        id: 'spell-q1',
        number: 1,
        prompt: 'The hotel can ____________________ up to four hundred guests. (Word: accommodate)',
        type: 'spelling-gap',
        marks: 1,
        markScheme: { answer: 'accommodate', guidance: 'Must have double c and double m.' }
      },
      {
        id: 'spell-q2',
        number: 2,
        prompt: 'Saad investigated the mysterious drawer with growing ____________________. (Word: curiosity)',
        type: 'spelling-gap',
        marks: 1,
        markScheme: { answer: 'curiosity', guidance: 'Notice -osity, no "u" after o.' }
      },
      {
        id: 'spell-q3',
        number: 3,
        prompt: 'He did not want to ____________________ his younger sister. (Word: embarrass)',
        type: 'spelling-gap',
        marks: 1,
        markScheme: { answer: 'embarrass', guidance: 'Double r and double s.' }
      },
      {
        id: 'spell-q4',
        number: 4,
        prompt: 'The new calculator comes with a two-year ____________________. (Word: guarantee)',
        type: 'spelling-gap',
        marks: 1,
        markScheme: { answer: 'guarantee', guidance: 'Begins with gua-, ends with -ee.' }
      },
      {
        id: 'spell-q5',
        number: 5,
        prompt: 'The ____________________ kitten climbed to the top of the curtain rail. (Word: mischievous)',
        type: 'spelling-gap',
        marks: 1,
        markScheme: { answer: 'mischievous', guidance: 'Ends with -vous, not -vious.' }
      },
      {
        id: 'spell-q6',
        number: 6,
        prompt: 'The members of ____________________ gathered in London. (Word: parliament)',
        type: 'spelling-gap',
        marks: 1,
        markScheme: { answer: 'parliament', guidance: 'Notice the silent "i": par-lia-ment.' }
      },
      {
        id: 'spell-q7',
        number: 7,
        prompt: 'The drummer maintained a steady ____________________. (Word: rhythm)',
        type: 'spelling-gap',
        marks: 1,
        markScheme: { answer: 'rhythm', guidance: 'r-h-y-t-h-m.' }
      },
      {
        id: 'spell-q8',
        number: 8,
        prompt: 'Saad signed the formal letter "Yours ____________________". (Word: sincerely)',
        type: 'spelling-gap',
        marks: 1,
        markScheme: { answer: 'sincerely', guidance: 'sin-cere-ly.' }
      },
      {
        id: 'spell-q9',
        number: 9,
        prompt: 'She carried out a ____________________ inspection. (Word: thorough)',
        type: 'spelling-gap',
        marks: 1,
        markScheme: { answer: 'thorough', guidance: 'tho-rough.' }
      },
      {
        id: 'spell-q10',
        number: 10,
        prompt: 'A luxurious white ____________________ sailed into the harbour. (Word: yacht)',
        type: 'spelling-gap',
        marks: 1,
        markScheme: { answer: 'yacht', guidance: 'y-a-c-h-t.' }
      }
    ]
  },

  // ==========================================
  // ENGLISH READING COMPREHENSION
  // ==========================================
  {
    id: 'reading-2024-p1',
    year: '2024 / 2025 Series',
    subject: 'reading',
    paperCode: 'Reading Paper',
    title: 'English Reading Comprehension',
    subtitle: 'Official Key Stage 2 Reading Booklet & Answer Booklet',
    timeAllowed: '60 minutes',
    totalMarks: 50,
    equipmentNeeded: ['Blue or black pen'],
    instructions: [
      'You have 60 minutes to read the text and answer all the questions.',
      'Read the passage carefully before you begin answering.',
      'Check how many marks are available for each question: 1, 2, or 3 marks.',
      'Where 2 or 3 marks are given, explain your point using evidence (quotations) from the text.'
    ],
    readingTextPassage: {
      title: 'The Clockmaker of Prague',
      genre: 'Historical Narrative Fiction',
      content: [
        'High above the cobbled alleys of the Old Town, master horologist Jan Novák worked in near darkness. Only a flickering beeswax candle illuminated the intricate bronze cogs spread across his workbench like scattered constellations.',
        'Tonight was not an ordinary evening. The Great Astronomical Clock—a marvel of engineering that had charted the celestial movements of the sun, moon, and zodiac since 1410—had suddenly frozen mid-strike at the stroke of twelve.',
        'Outside in the bitter winter wind, a nervous crowd had gathered. Whispers circulated among the townspeople: a silent clock was an ominous omen. Yet Jan felt neither dread nor superstition. He knew every wheel, escapement, and counterweight inside the medieval tower as intimately as the veins in his own weathered hands.',
        'Climbing the rickety spiral staircase to the belfry, Jan reached the heart of the mechanism. There, lodged firmly between the zodiac dial and the hourly chimes, was not a broken tooth or a snapped spring, but an ornate brass key wrapped in centuries-old parchment.',
        'With trembling fingers, Jan slipped the key into his pocket and freed the brass escapement. Slowly, with a deep resonant clunk that vibrated through the stones of the tower, the pendulum swung. Below, a cheer erupted from the cobbled square as the twelve brass apostles resumed their hourly dance.'
      ]
    },
    questions: [
      {
        id: 'r-q1',
        number: 1,
        prompt: 'At what exact time did the Great Astronomical Clock freeze? (Look at paragraph 2)',
        type: 'lines',
        linesCount: 1,
        marks: 1,
        markScheme: { answer: 'At the stroke of twelve (midnight)', guidance: 'Accept "twelve" or "midnight".' }
      },
      {
        id: 'r-q2',
        number: 2,
        prompt: 'Find and copy one word from paragraph 1 that means "detailed and complicated".',
        type: 'lines',
        linesCount: 1,
        marks: 1,
        markScheme: { answer: 'intricate' }
      },
      {
        id: 'r-q3',
        number: 3,
        prompt: 'How did Jan feel about the clock stopping, compared to the townspeople outside? Use evidence from the text to support your answer. [2 marks]',
        type: 'lines',
        linesCount: 4,
        marks: 2,
        markScheme: {
          answer: 'The townspeople were superstitious and frightened (believing it was an "ominous omen"), whereas Jan felt calm and knowledgeable ("felt neither dread nor superstition") because he knew the clock intimately.',
          guidance: 'Award 1 mark for identifying the contrast in feelings, and 1 mark for quoting or referencing evidence from paragraph 3.'
        }
      },
      {
        id: 'r-q4',
        number: 4,
        prompt: 'What had actually caused the clock mechanism to jam?',
        type: 'lines',
        linesCount: 2,
        marks: 1,
        markScheme: {
          answer: 'An ornate brass key wrapped in parchment was lodged between the gears.',
          guidance: 'Accept brass key or parchment lodged in the mechanism.'
        }
      },
      {
        id: 'r-q5',
        number: 5,
        prompt: 'Explain how the author creates a sense of drama and relief in the final paragraph. [3 marks]',
        type: 'lines',
        linesCount: 5,
        marks: 3,
        markScheme: {
          answer: 'Drama is created by physical suspense ("trembling fingers", "deep resonant clunk"). Relief is shown through movement ("pendulum swung", "twelve brass apostles resumed their dance") and the reaction of the crowd ("a cheer erupted from the cobbled square").',
          guidance: 'Award 1 mark for identifying sound/suspense imagery, 1 mark for crowd relief, 1 mark for quotes.'
        }
      }
    ]
  }
];
