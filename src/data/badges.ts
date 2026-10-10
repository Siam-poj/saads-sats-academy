import { Badge } from '../types/curriculum';

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'first-sprint',
    title: 'First Sprint Finisher',
    description: 'Completed your very first 10-Minute SATs Sprint!',
    iconName: 'Zap',
    category: 'sprint',
    xpReward: 100,
    isUnlocked: false
  },
  {
    id: 'arithmetic-ace',
    title: 'Arithmetic Ace',
    description: 'Scored 100% on Maths Arithmetic questions in a Sprint.',
    iconName: 'Divide',
    category: 'maths',
    xpReward: 150,
    isUnlocked: false
  },
  {
    id: 'grammar-detective',
    title: 'Grammar Detective',
    description: 'Got all SPaG questions correct without using hints.',
    iconName: 'Search',
    category: 'spag',
    xpReward: 150,
    isUnlocked: false
  },
  {
    id: 'speed-demon',
    title: 'Speed Demon',
    description: 'Finished the 10-Minute Sprint with more than 3 minutes remaining on the clock!',
    iconName: 'Timer',
    category: 'sprint',
    xpReward: 200,
    isUnlocked: false
  },
  {
    id: 'scratchpad-scholar',
    title: 'Scratchpad Scholar',
    description: 'Used the interactive working scratchpad to solve long arithmetic problems.',
    iconName: 'Edit3',
    category: 'maths',
    xpReward: 75,
    isUnlocked: false
  },
  {
    id: 'streak-champion',
    title: '3-Day Streak Legend',
    description: 'Practiced 3 consecutive days for your SATs.',
    iconName: 'Flame',
    category: 'streak',
    xpReward: 250,
    isUnlocked: false
  },
  {
    id: 'fraction-master',
    title: 'Fraction Master',
    description: 'Mastered fraction multiplication and simplified to lowest terms.',
    iconName: 'PieChart',
    category: 'maths',
    xpReward: 120,
    isUnlocked: false
  },
  {
    id: 'sats-master',
    title: 'SATs Master',
    description: 'Reached Level 5 and unlocked true Year 6 mastery.',
    iconName: 'Award',
    category: 'general',
    xpReward: 500,
    isUnlocked: false
  }
];
