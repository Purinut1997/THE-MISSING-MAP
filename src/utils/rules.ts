/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { CompassHeading, DetectiveRank, LMSPayload, SkillCategory } from '../types/game.ts';

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
 * Generates external LMS PostMessage payload.
 */
export function createLMSPayload(params: {
  studentId: string;
  studentName: string;
  lessonId: string;
  itemId: string;
  score: number;
  totalXP: number;
  rank: DetectiveRank;
  evidenceKeysCount: number;
}): LMSPayload {
  return {
    type: 'ACTIVITY_COMPLETED',
    studentId: params.studentId || 'guest_student',
    studentName: params.studentName || 'Guest Detective',
    lessonId: params.lessonId || 'ONET_ENG_GR6_01',
    itemId: params.itemId || 'THE_MISSING_MAP',
    score: Math.min(100, Math.max(0, params.score)),
    maxScore: 100,
    xpEarned: params.totalXP,
    masteryRank: params.rank,
    evidenceKeys: params.evidenceKeysCount,
    passed: params.score >= 80,
    gameTitle: 'THE MISSING MAP'
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
    autostart: params.get('autostart') === '1'
  };
}
