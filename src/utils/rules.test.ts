/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateDetectiveRank,
  calculateRelativeTurn,
  isTurnCorrect,
  calculateMasteryPercentage,
  isLevelMastered,
  calculateChallengeXP,
  createLMSPayload,
  parseQueryParams
} from './rules.ts';

test('calculateDetectiveRank promotes according to levels and XP', () => {
  assert.equal(calculateDetectiveRank(0, 0), 'Rookie Detective');
  assert.equal(calculateDetectiveRank(120, 1), 'Junior Detective');
  assert.equal(calculateDetectiveRank(310, 3), 'Field Detective');
  assert.equal(calculateDetectiveRank(460, 4), 'Expert Detective');
  assert.equal(calculateDetectiveRank(700, 6), 'Master Detective');
});

test('calculateRelativeTurn computes relative left and right compass directions', () => {
  // Facing North: Left is West, Right is East
  assert.equal(calculateRelativeTurn('N', 'left'), 'W');
  assert.equal(calculateRelativeTurn('N', 'right'), 'E');

  // Facing East: Left is North, Right is South
  assert.equal(calculateRelativeTurn('E', 'left'), 'N');
  assert.equal(calculateRelativeTurn('E', 'right'), 'S');

  // Facing South: Left is East, Right is West
  assert.equal(calculateRelativeTurn('S', 'left'), 'E');
  assert.equal(calculateRelativeTurn('S', 'right'), 'W');

  // Facing West: Left is South, Right is North
  assert.equal(calculateRelativeTurn('W', 'left'), 'S');
  assert.equal(calculateRelativeTurn('W', 'right'), 'N');
});

test('isTurnCorrect validates direction of travel relative to heading', () => {
  assert.equal(isTurnCorrect('N', 'left', 'W'), true);
  assert.equal(isTurnCorrect('N', 'left', 'E'), false);
  assert.equal(isTurnCorrect('S', 'right', 'W'), true);
});

test('mastery calculations require >= 80% to pass', () => {
  assert.equal(calculateMasteryPercentage(4, 5), 80);
  assert.equal(isLevelMastered(4, 5), true);

  assert.equal(calculateMasteryPercentage(3, 5), 60);
  assert.equal(isLevelMastered(3, 5), false);

  assert.equal(isLevelMastered(5, 5), true);
});

test('calculateChallengeXP properly rewards comprehension and evidence', () => {
  // Incorrect answer = 0 XP
  assert.equal(calculateChallengeXP(false, false, 0), 0);

  // Comprehension only, no evidence
  assert.equal(calculateChallengeXP(true, false, 0), 10);

  // Full correct without hints = 25 XP
  assert.equal(calculateChallengeXP(true, true, 0), 25);

  // Full correct with 1 hint = 24 XP
  assert.equal(calculateChallengeXP(true, true, 1), 24);
});

test('createLMSPayload produces expected parent window message structure', () => {
  const payload = createLMSPayload({
    studentId: 'STU101',
    studentName: 'Nong Somchai',
    lessonId: 'UNIT_MAPS_06',
    itemId: 'MAP_CHALLENGE',
    score: 85,
    totalXP: 350,
    rank: 'Field Detective',
    evidenceKeysCount: 3
  });

  assert.equal(payload.type, 'ACTIVITY_COMPLETED');
  assert.equal(payload.studentId, 'STU101');
  assert.equal(payload.studentName, 'Nong Somchai');
  assert.equal(payload.score, 85);
  assert.equal(payload.passed, true);
  assert.equal(payload.gameTitle, 'THE MISSING MAP');
});

test('parseQueryParams retrieves query parameters gracefully', () => {
  const query = '?studentId=999&studentName=Lin&lessonId=L1&itemId=M1&autostart=1';
  const parsed = parseQueryParams(query);
  assert.equal(parsed.studentId, '999');
  assert.equal(parsed.studentName, 'Lin');
  assert.equal(parsed.autostart, true);

  const empty = parseQueryParams('');
  assert.equal(empty.studentId, '');
  assert.equal(empty.studentName, '');
  assert.equal(empty.autostart, false);
});
