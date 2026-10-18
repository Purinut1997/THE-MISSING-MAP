/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { CompassHeading, DetectiveRank, LMSPayload, PlayerProfile, SkillCategory } from '../types/game.ts';

/**
 * Calculates Detective Rank based on XP and completed levels.
 */
export function calculateDetectiveRank(totalXP: number, completedLevelsCount: number): DetectiveRank {
  if (completedLevelsCount >= 6 || totalXP >= 650) {
    return 'Master Detective';
  }
  if (completedLevelsCount >= 4 || totalXP >= 450) {
    return 'Expert Detective';
  }
  if (completedLevelsCount >= 3 || totalXP >= 300) {
    return 'Field Detective';
  }
  if (completedLevelsCount >= 1 || totalXP >= 120) {
    return 'Junior Detective';
  }
  return 'Rookie Detective';
}

/**
 * Calculates the new compass heading when turning relative to current heading.
 * Heading: N (North), E (East), S (South), W (West)
 */
export function calculateRelativeTurn(currentHeading: CompassHeading, turn: 'left' | 'right'): CompassHeading {
  const directions: CompassHeading[] = ['N', 'E', 'S', 'W'];
  const currentIndex = directions.indexOf(currentHeading);
  if (currentIndex === -1) return currentHeading;

  if (turn === 'left') {
    return directions[(currentIndex + 3) % 4];
  } else {
    return directions[(currentIndex + 1) % 4];
  }
}

/**
 * Validates whether a relative turn command matches the intended directional transition.
 */
export function isTurnCorrect(
  currentHeading: CompassHeading,
  relativeCommand: 'left' | 'right',
  targetHeading: CompassHeading
): boolean {
  return calculateRelativeTurn(currentHeading, relativeCommand) === targetHeading;
}

/**
 * Calculates percentage mastery with 0-100 rounding.
 */
export function calculateMasteryPercentage(correct: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(100, Math.round((correct / total) * 100));
}

/**
 * Checks whether a level satisfies the >= 80% mastery threshold.
 */
export function isLevelMastered(correctCount: number, totalChallenges: number, minPercent = 80): boolean {
  if (totalChallenges === 0) return false;
  return calculateMasteryPercentage(correctCount, totalChallenges) >= minPercent;
}

/**
 * Calculates XP awarded for answering a challenge.
 * Base: 10 XP for comprehension answer + 10 XP for evidence proof + 5 XP bonus.
 * Hints gently reduce bonus XP without docking core points.
 */
export function calculateChallengeXP(
  isAnswerCorrect: boolean,
  isEvidenceCorrect: boolean,
  hintsUsed: number,
  baseXP = 25
): number {
  if (!isAnswerCorrect) return 0;
  let score = 10; // Comprehension correct
  if (isEvidenceCorrect) {
    score += 10; // Evidence proof correct
  }
  // Bonus: up to 5 XP, reduced by 1 XP per hint used (minimum 0)
  const bonus = Math.max(0, 5 - hintsUsed * 1.5);
  return Math.round(score + (isEvidenceCorrect ? bonus : 0));
}

/**
 * Calculates game score, mastery percentage, and pass status based on player profile.
 */
export function calculateGameScore(profile: PlayerProfile): {
  score: number;
  maxScore: number;
  percentScore: number;
  passed: boolean;
} {
  const completedCount = profile.completedLevels.length;
  const totalLevels = 6;
  const isFinalVictory = completedCount >= totalLevels;

  // Calculate overall reading accuracy from skill scores
  let totalCorrect = 0;
  let totalAttempts = 0;
  if (profile.skillScores) {
    Object.values(profile.skillScores).forEach((stat) => {
      totalCorrect += stat.correct || 0;
      totalAttempts += stat.total || 0;
    });
  }

  const accuracy = totalAttempts > 0 ? totalCorrect / totalAttempts : 0.85;

  let score = 0;
  if (isFinalVictory) {
    // When all 6 levels are finished, grant a high score (85-100) based on accuracy
    score = Math.max(85, Math.min(100, Math.round(75 + accuracy * 25)));
  } else {
    // Midway progress: scaled by completed levels (0-80)
    score = Math.min(80, Math.round((completedCount / totalLevels) * 100));
  }

  const passed = isFinalVictory || score >= 80;

  return {
    score,
    maxScore: 100,
    percentScore: score,
    passed
  };
}

/**
 * Generates external LMS PostMessage payload.
 */
export function createLMSPayload(params: {
  studentId: string;
  studentName: string;
  studentCode?: string;
  lessonId: string;
  itemId: string;
  courseId?: string;
  score: number;
  maxScore?: number;
  percentScore?: number;
  totalXP: number;
  rank: DetectiveRank;
  evidenceKeysCount: number;
  passed?: boolean;
  completedLevelsCount?: number;
  totalLevelsCount?: number;
  isFinalVictory?: boolean;
}): LMSPayload {
  const maxScore = params.maxScore || 100;
  const score = Math.min(maxScore, Math.max(0, params.score));
  const percentScore =
    typeof params.percentScore === 'number'
      ? params.percentScore
      : maxScore > 0
        ? Math.round((score / maxScore) * 100)
        : score;
  const passed =
    typeof params.passed === 'boolean' ? params.passed : percentScore >= 80;

  return {
    type: 'ACTIVITY_COMPLETED',
    studentId: params.studentId || 'guest_student',
    studentName: params.studentName || 'Guest Detective',
    studentCode: params.studentCode || '',
    lessonId: params.lessonId || 'ONET_ENG_GR6_01',
    itemId: params.itemId || 'THE_MISSING_MAP',
    courseId: params.courseId || '',
    score,
    maxScore,
    percentScore,
    xpEarned: params.totalXP,
    masteryRank: params.rank,
    evidenceKeys: params.evidenceKeysCount,
    passed,
    gameTitle: 'THE MISSING MAP',
    completedLevels: params.completedLevelsCount,
    totalLevels: params.totalLevelsCount || 6,
    isFinalVictory: params.isFinalVictory,
    timestamp: new Date().toISOString()
  };
}

/**
 * Safely dispatches the LMS payload to all parent/opener contexts (iframe and popup).
 */
export function dispatchLMSMessage(payload: LMSPayload): { sent: boolean; targets: string[] } {
  const targets: string[] = [];

  if (typeof window === 'undefined') {
    return { sent: false, targets };
  }

  // 1. Dispatch to parent window (if embedded in LMS iframe)
  if (window.parent && window.parent !== window) {
    try {
      window.parent.postMessage(payload, '*');
      targets.push('window.parent');
    } catch (err) {
      console.warn('[THE MISSING MAP] Failed to postMessage to parent window:', err);
    }
  }

  // 2. Dispatch to opener window (if opened in a new browser tab/window)
  if (window.opener && !window.opener.closed) {
    try {
      window.opener.postMessage(payload, '*');
      targets.push('window.opener');
    } catch (err) {
      console.warn('[THE MISSING MAP] Failed to postMessage to opener window:', err);
    }
  }

  // 3. Dispatch in-window CustomEvent for debugging and testing
  try {
    window.dispatchEvent(new CustomEvent('the_missing_map:lms_dispatch', { detail: payload }));
  } catch (err) {}

  console.log('[THE MISSING MAP] LMS payload dispatched:', {
    targets,
    payload
  });

  return {
    sent: targets.length > 0,
    targets
  };
}

/**
 * Safely parses URL search query parameters for LMS integration.
 */
export function parseQueryParams(search: string) {
  const params = new URLSearchParams(search);
  return {
    studentId: params.get('studentId') || '',
    studentName: params.get('studentName') || '',
    studentCode: params.get('studentCode') || '',
    lessonId: params.get('lessonId') || '',
    itemId: params.get('itemId') || '',
    courseId: params.get('courseId') || '',
    autostart: params.get('autostart') === '1'
  };
}
