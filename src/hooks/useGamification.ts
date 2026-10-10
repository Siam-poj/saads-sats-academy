import { useState, useEffect, useCallback } from 'react';
import { UserStats, SprintResult, Badge } from '../types/curriculum';
import { INITIAL_BADGES } from '../data/badges';

const STATS_STORAGE_KEY = 'saad_sats_user_stats';
const BADGES_STORAGE_KEY = 'saad_sats_badges';

export const LEVEL_TITLES = [
  { level: 1, title: 'SATs Apprentice', minXp: 0, maxXp: 300 },
  { level: 2, title: 'Junior Scholar', minXp: 300, maxXp: 750 },
  { level: 3, title: 'Grammar & Maths Striker', minXp: 750, maxXp: 1400 },
  { level: 4, title: 'Year 6 Prodigy', minXp: 1400, maxXp: 2200 },
  { level: 5, title: 'SATs Master 🎓', minXp: 2200, maxXp: 3500 },
];

export function getLevelInfo(xp: number) {
  let current = LEVEL_TITLES[0];
  for (const tier of LEVEL_TITLES) {
    if (xp >= tier.minXp) {
      current = tier;
    }
  }
  const nextTier = LEVEL_TITLES.find((t) => t.level === current.level + 1);
  const nextLevelXp = nextTier ? nextTier.minXp : current.maxXp;
  const currentTierBase = current.minXp;
  const progressPercent = nextTier
    ? Math.min(100, Math.max(0, Math.round(((xp - currentTierBase) / (nextLevelXp - currentTierBase)) * 100)))
    : 100;

  return {
    ...current,
    nextLevelXp,
    progressPercent,
    isMaxLevel: !nextTier
  };
}

export function useGamification() {
  const [stats, setStats] = useState<UserStats>(() => {
    const raw = localStorage.getItem(STATS_STORAGE_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        // Fallback
      }
    }
    const today = new Date().toISOString().split('T')[0];
    return {
      learnerName: 'Saad',
      level: 1,
      xp: 140, // Nice initial boost for Year 5 momentum
      streakDays: 3,
      lastActiveDate: today,
      completedQuestionsCount: 15,
      correctQuestionsCount: 13,
      sprintsCompleted: 2,
      badgesUnlocked: ['first-sprint'],
      topicMastery: {
        'Decimals & Place Value': { total: 4, correct: 4 },
        'Long Multiplication': { total: 3, correct: 2 },
        'Fractions': { total: 4, correct: 3 },
        'Word Classes': { total: 3, correct: 3 },
        'Punctuation': { total: 3, correct: 2 },
      },
      history: []
    };
  });

  const [badges, setBadges] = useState<Badge[]>(() => {
    const raw = localStorage.getItem(BADGES_STORAGE_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        // Fallback
      }
    }
    return INITIAL_BADGES.map((b) =>
      b.id === 'first-sprint' ? { ...b, isUnlocked: true, unlockedAt: new Date().toISOString() } : b
    );
  });

  const [newlyUnlockedBadge, setNewlyUnlockedBadge] = useState<Badge | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem(BADGES_STORAGE_KEY, JSON.stringify(badges));
  }, [badges]);

  // Check and maintain streaks
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (stats.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      setStats((prev) => {
        let newStreak = prev.streakDays;
        if (prev.lastActiveDate === yesterday) {
          newStreak = prev.streakDays + 1;
        } else if (prev.lastActiveDate < yesterday) {
          newStreak = 1; // streak reset
        }
        return {
          ...prev,
          lastActiveDate: today,
          streakDays: newStreak
        };
      });
    }
  }, [stats.lastActiveDate]);

  const unlockBadge = useCallback((badgeId: string) => {
    setBadges((prevBadges) => {
      const target = prevBadges.find((b) => b.id === badgeId);
      if (!target || target.isUnlocked) return prevBadges;

      const updated = prevBadges.map((b) =>
        b.id === badgeId ? { ...b, isUnlocked: true, unlockedAt: new Date().toISOString() } : b
      );

      const newlyUnlocked = updated.find((b) => b.id === badgeId);
      if (newlyUnlocked) {
        setNewlyUnlockedBadge(newlyUnlocked);
        // Award XP
        setStats((prev) => ({
          ...prev,
          xp: prev.xp + newlyUnlocked.xpReward,
          badgesUnlocked: [...prev.badgesUnlocked, badgeId]
        }));
      }

      return updated;
    });
  }, []);

  const clearNewBadge = useCallback(() => {
    setNewlyUnlockedBadge(null);
  }, []);

  const recordSprintCompletion = useCallback((result: SprintResult) => {
    setStats((prev) => {
      const newXp = prev.xp + result.xpEarned;
      const levelInfo = getLevelInfo(newXp);

      // Update topic masteries
      const updatedTopicMastery = { ...prev.topicMastery };
      result.answers.forEach((ans) => {
        const topic = ans.questionId.includes('arith') ? 'Maths Arithmetic' : 'English SPaG';
        if (!updatedTopicMastery[topic]) {
          updatedTopicMastery[topic] = { total: 0, correct: 0 };
        }
        updatedTopicMastery[topic].total += 1;
        if (ans.isCorrect) {
          updatedTopicMastery[topic].correct += 1;
        }
      });

      return {
        ...prev,
        xp: newXp,
        level: levelInfo.level,
        completedQuestionsCount: prev.completedQuestionsCount + result.totalQuestions,
        correctQuestionsCount: prev.correctQuestionsCount + result.score,
        sprintsCompleted: prev.sprintsCompleted + 1,
        topicMastery: updatedTopicMastery,
        history: [result, ...prev.history].slice(0, 30) // keep last 30 sprints
      };
    });

    // Check milestone badge awards
    unlockBadge('first-sprint');
    if (result.score === result.totalQuestions) {
      unlockBadge('arithmetic-ace');
    }
    if (result.timeSpentSeconds < 420) { // under 7 mins
      unlockBadge('speed-demon');
    }
  }, [unlockBadge]);

  const levelInfo = getLevelInfo(stats.xp);

  const resetAllProgress = useCallback(() => {
    const fresh: UserStats = {
      learnerName: 'Saad',
      level: 1,
      xp: 0,
      streakDays: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      completedQuestionsCount: 0,
      correctQuestionsCount: 0,
      sprintsCompleted: 0,
      badgesUnlocked: [],
      topicMastery: {},
      history: []
    };
    setStats(fresh);
    setBadges(INITIAL_BADGES);
    localStorage.removeItem(STATS_STORAGE_KEY);
    localStorage.removeItem(BADGES_STORAGE_KEY);
  }, []);

  return {
    stats,
    badges,
    levelInfo,
    newlyUnlockedBadge,
    clearNewBadge,
    unlockBadge,
    recordSprintCompletion,
    resetAllProgress
  };
}
