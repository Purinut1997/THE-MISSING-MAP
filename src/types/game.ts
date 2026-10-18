/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type DetectiveRank =
  | 'Rookie Detective'
  | 'Junior Detective'
  | 'Field Detective'
  | 'Expert Detective'
  | 'Master Detective';

export type SkillCategory =
  | 'vocabulary'
  | 'prepositions'
  | 'directions'
  | 'dialogue'
  | 'reading'
  | 'evidence';

export type CompassHeading = 'N' | 'E' | 'S' | 'W';

export interface TownNode {
  id: string;
  name: string;
  thaiName: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  category: 'public' | 'service' | 'leisure' | 'commercial' | 'landmark';
  description: string;
  clue?: string;
  phonetic?: string;
  street?: string;
  spatialRelations?: string;
}

export interface TownStreet {
  id: string;
  name: string;
  fromNodeId: string;
  toNodeId: string;
  direction: 'horizontal' | 'vertical';
}

export interface HintItem {
  level: 1 | 2 | 3;
  type: 'Vocabulary' | 'Evidence' | 'Reasoning';
  title: string;
  content: string;
  thaiContent: string;
}

export interface Challenge {
  id: string;
  levelId: number;
  missionNumber: number;
  type: 'vocab' | 'spatial' | 'prep' | 'direction' | 'dialogue' | 'reading' | 'final' | 'final_boss';
  title: string;
  thaiTitle?: string;
  stimulusType: 'letter' | 'clue' | 'dialogue' | 'story' | 'passage' | 'map_instruction' | 'map_rule' | 'route_clue' | 'secret_scroll';
  stimulus: string;
  stimulusContext?: string; // background information or character name
  question: string;
  thaiQuestion?: string;
  options: string[];
  correctAnswer: number; // 0-based
  evidenceOptions: string[];
  correctEvidence: number; // 0-based
  explanation: string;
  thaiExplanation: string;
  hints: HintItem[];
  xpReward: number;
  skillCategory: SkillCategory;
  // Map specific features
  mapHighlightNodeId?: string;
  mapRouteSteps?: {
    fromNode: string;
    toNode: string;
    instruction: string;
    streetName: string;
  }[];
  hasErrorToSpot?: boolean;
  errorExplanation?: string;
  expectedFinalNode?: string;
}

export interface LevelConfig {
  id: number;
  code: string;
  title: string;
  thaiTitle: string;
  subtitle: string;
  storyScene: string;
  thaiStoryScene: string;
  evidenceKeyName: string;
  evidenceKeyDescription: string;
  requiredMasteryScore: number; // percentage e.g. 80
  challenges: Challenge[];
}

export interface PlayerProfile {
  studentId: string;
  studentName: string;
  studentCode: string;
  lessonId: string;
  itemId: string;
  courseId?: string;
  nickname: string;
  avatarId: string;
  totalXP: number;
  rank: DetectiveRank;
  unlockedLevel: number; // 1 to 6
  completedLevels: number[];
  evidenceKeys: string[];
  currentStreak: number;
  bestStreak: number;
  skillScores: Record<SkillCategory, { correct: number; total: number }>;
  completedChallengeIds: string[];
  lmsSynced: boolean;
  lastSyncTimestamp?: string;
}

export interface StudentAttempt {
  id: string;
  studentName: string;
  challengeId: string;
  levelId: number;
  answeredCorrectly: boolean;
  evidenceCorrect: boolean;
  hintsUsed: number;
  timestamp: string;
  skillCategory: SkillCategory;
}

export interface LeaderboardPlayer {
  id: string;
  rank: number;
  nickname: string;
  avatarId: string;
  totalXP: number;
  levelsCompleted: number;
  readingAccuracy: number; // percentage
  evidenceAccuracy: number; // percentage
  detectiveRank: DetectiveRank;
  isCurrentPlayer?: boolean;
}

export interface LMSPayload {
  type: 'ACTIVITY_COMPLETED';
  studentId: string;
  studentName: string;
  studentCode?: string;
  lessonId: string;
  itemId: string;
  courseId?: string;
  score: number;
  maxScore: number;
  percentScore: number;
  xpEarned: number;
  masteryRank: DetectiveRank;
  evidenceKeys: number;
  passed: boolean;
  gameTitle: string;
  completedLevels?: number;
  totalLevels?: number;
  isFinalVictory?: boolean;
  timestamp?: string;
}
