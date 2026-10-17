/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { PlayerProfile } from './types/game.ts';
import { LEVELS_CONFIG } from './data/missions.ts';
import { calculateDetectiveRank, parseQueryParams } from './utils/rules.ts';
import { Header } from './components/Header.tsx';
import { TownMap } from './components/TownMap.tsx';
import { ChallengeCard } from './components/ChallengeCard.tsx';
import { HintModal } from './components/HintModal.tsx';
import { DiagnosticModal } from './components/DiagnosticModal.tsx';
import { LeaderboardModal } from './components/LeaderboardModal.tsx';
import { TeacherDashboardModal } from './components/TeacherDashboardModal.tsx';
import { VictoryModal } from './components/VictoryModal.tsx';
import { PlayerProfileModal } from './components/PlayerProfileModal.tsx';
import {
  CheckCircle2,
  ChevronRight,
  Compass,
  Key,
  Lock,
  Play,
  RotateCcw
} from 'lucide-react';

const STORAGE_KEY = 'the_missing_map_progress_v1';

const INITIAL_PROFILE: PlayerProfile = {
  studentId: '',
  studentName: '',
  studentCode: '',
  lessonId: 'ONET_ENG_GR6_01',
  itemId: 'THE_MISSING_MAP',
  nickname: 'นักสืบฝึกหัด',
  avatarId: 'avatar_sherlock',
  totalXP: 0,
  rank: 'Rookie Detective',
  unlockedLevel: 1,
  completedLevels: [],
  evidenceKeys: [],
  currentStreak: 0,
  bestStreak: 0,
  skillScores: {
    vocabulary: { correct: 0, total: 0 },
    prepositions: { correct: 0, total: 0 },
    directions: { correct: 0, total: 0 },
    dialogue: { correct: 0, total: 0 },
    reading: { correct: 0, total: 0 },
    evidence: { correct: 0, total: 0 }
  },
  completedChallengeIds: [],
  lmsSynced: false
};

export default function App() {
  const [profile, setProfile] = useState<PlayerProfile>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return { ...INITIAL_PROFILE, ...parsed };
        }
      } catch (e) {
        console.error('Failed to parse saved profile', e);
      }
    }
    return INITIAL_PROFILE;
  });

  const [activeScreen, setActiveScreen] = useState<'title' | 'missions' | 'gameplay'>('title');
  const [currentLevelId, setCurrentLevelId] = useState<number>(1);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Modals state
  const [showHintModal, setShowHintModal] = useState<boolean>(false);
  const [unlockedHintLevel, setUnlockedHintLevel] = useState<number>(1);
  const [hintsUsedCount, setHintsUsedCount] = useState<number>(0);
  const [showDiagnosticModal, setShowDiagnosticModal] = useState<boolean>(false);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState<boolean>(false);
  const [showTeacherDashboardModal, setShowTeacherDashboardModal] = useState<boolean>(false);
  const [showVictoryModal, setShowVictoryModal] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);

  // Parse LMS Query parameters on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const query = parseQueryParams(window.location.search);
      setProfile(prev => {
        const updated = {
          ...prev,
          studentId: query.studentId || prev.studentId,
          studentName: query.studentName || prev.studentName,
          studentCode: query.studentCode || prev.studentCode,
          lessonId: query.lessonId || prev.lessonId,
          itemId: query.itemId || prev.itemId,
          lmsSynced: !!(query.studentId || query.lessonId)
        };
        if (query.studentName && (!prev.nickname || prev.nickname === 'นักสืบฝึกหัด')) {
          updated.nickname = query.studentName;
        }
        return updated;
      });

      if (query.autostart) {
        setActiveScreen('missions');
      }
    }
  }, []);

  // Save progress changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile', e);
    }
  }, [profile]);

  const playSound = (type: 'correct' | 'fanfare') => {
    if (!soundEnabled || typeof window === 'undefined' || !window.AudioContext) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'correct') {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'fanfare') {
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.setValueAtTime(554.37, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      }
    } catch (e) {}
  };

  const currentLevel = LEVELS_CONFIG.find(l => l.id === currentLevelId) || LEVELS_CONFIG[0];
  const currentChallenge = currentLevel.challenges[currentChallengeIndex] || currentLevel.challenges[0];

  const handleStartMission = (levelId: number) => {
    setCurrentLevelId(levelId);
    setCurrentChallengeIndex(0);
    setHintsUsedCount(0);
    setUnlockedHintLevel(1);
    setActiveScreen('gameplay');
  };

  const handleChallengeComplete = (success: boolean, xpEarned: number, evidenceSuccess: boolean) => {
    if (success) {
      playSound('correct');
    }

    setProfile(prev => {
      const alreadyDone = prev.completedChallengeIds.includes(currentChallenge.id);
      const newCompleted = alreadyDone ? prev.completedChallengeIds : [...prev.completedChallengeIds, currentChallenge.id];
      const newXP = alreadyDone ? prev.totalXP : prev.totalXP + xpEarned;

      const cat = currentChallenge.skillCategory;
      const currentCatScore = prev.skillScores[cat] || { correct: 0, total: 0 };
      const updatedSkillScores = {
        ...prev.skillScores,
        [cat]: {
          correct: currentCatScore.correct + (success ? 1 : 0),
          total: currentCatScore.total + 1
        }
      };

      const newRank = calculateDetectiveRank(newXP, prev.completedLevels.length);

      return {
        ...prev,
        totalXP: newXP,
        rank: newRank,
        completedChallengeIds: newCompleted,
        skillScores: updatedSkillScores
      };
    });
  };

  const handleNextChallenge = () => {
    if (currentChallengeIndex + 1 < currentLevel.challenges.length) {
      setCurrentChallengeIndex(currentChallengeIndex + 1);
      setHintsUsedCount(0);
      setUnlockedHintLevel(1);
    } else {
      playSound('fanfare');
      setProfile(prev => {
        const completedLevels = prev.completedLevels.includes(currentLevel.id)
          ? prev.completedLevels
          : [...prev.completedLevels, currentLevel.id];

        const evidenceKeys = prev.evidenceKeys.includes(currentLevel.evidenceKeyName)
          ? prev.evidenceKeys
          : [...prev.evidenceKeys, currentLevel.evidenceKeyName];

        const unlockedLevel = Math.max(prev.unlockedLevel, Math.min(6, currentLevel.id + 1));
        const newRank = calculateDetectiveRank(prev.totalXP, completedLevels.length);

        return {
          ...prev,
          completedLevels,
          evidenceKeys,
          unlockedLevel,
          rank: newRank
        };
      });

      if (currentLevel.id === 6) {
        setShowVictoryModal(true);
      } else {
        setActiveScreen('missions');
      }
    }
  };

  const handleResetProgress = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    setProfile(INITIAL_PROFILE);
    setCurrentLevelId(1);
    setCurrentChallengeIndex(0);
    setActiveScreen('title');
  };

  const getThaiRank = (rank: string) => {
    switch (rank) {
      case 'Master Detective':
        return 'ยอดนักสืบ (Master Detective)';
      case 'Expert Detective':
        return 'นักสืบผู้เชี่ยวชาญ (Expert Detective)';
      case 'Field Detective':
        return 'นักสืบภาคสนาม (Field Detective)';
      case 'Junior Detective':
        return 'นักสืบรุ่นเยาว์ (Junior Detective)';
      default:
        return 'นักสืบฝึกหัด (Rookie Detective)';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Bar Header */}
      <Header
        profile={profile}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        onOpenLeaderboard={() => setShowLeaderboardModal(true)}
        onOpenTeacherDashboard={() => setShowTeacherDashboardModal(true)}
        onOpenProfile={() => setShowProfileModal(true)}
        onOpenDiagnostic={() => setShowDiagnosticModal(true)}
      />

      {/* Main View Router */}
      <main className="flex-1 flex flex-col">
        {/* 1. TITLE / OPENING SCREEN */}
        {activeScreen === 'title' && (
          <div className="flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10">
            {/* Hero Card */}
            <div className="relative rounded-3xl overflow-hidden border border-amber-900/50 shadow-2xl bg-gradient-to-b from-slate-900 to-slate-950">
              <div className="relative h-64 sm:h-96 w-full overflow-hidden">
                <img
                  src="/images/hero_missing_map_1792231830152.jpg"
                  alt="English Town Detective Mystery Illustration"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent flex items-end p-4 sm:p-8">
                  <div className="space-y-2 max-w-2xl">
                    <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider font-sans">
                      ภาษาอังกฤษ ป.6 เตรียมสอบ O-NET (ระดับเริ่มต้น · Beginner Friendly)
                    </span>
                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-amber-300 font-mystery tracking-wide leading-tight">
                      THE MISSING MAP
                    </h1>
                    <p className="text-base sm:text-xl text-amber-100 font-bold font-sans">
                      แผนที่ปริศนาเมืองภาษาอังกฤษ
                    </p>
                    <p className="text-xs sm:text-sm text-amber-200/90 font-sans">
                      อ่านเบาะแส ไขปริศนา พิชิตเมืองภาษาอังกฤษ · Every Clue Matters. Every Word Leads the Way.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons Strip */}
              <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-200">
                      ยินดีต้อนรับ, {profile.nickname || profile.studentName || 'นักสืบฝึกหัด'}!
                    </h2>
                    <p className="text-xs text-slate-400 font-sans">
                      ระดับ: <span className="text-amber-300 font-semibold">{getThaiRank(profile.rank)}</span> · {profile.totalXP} คะแนน XP
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto font-sans">
                  <button
                    onClick={() => setActiveScreen('missions')}
                    className="touch-target flex-1 sm:flex-none px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-950/60 transition-transform active:scale-95"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>{profile.completedLevels.length > 0 ? 'สืบสวนต่อ (Resume Case)' : 'เริ่มภารกิจสืบสวน (Start Adventure)'}</span>
                  </button>

                  <button
                    onClick={() => setShowDiagnosticModal(true)}
                    className="touch-target px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 text-xs sm:text-sm font-semibold border border-slate-700 whitespace-nowrap"
                  >
                    วัดระดับพื้นฐาน (Skill Check)
                  </button>
                </div>
              </div>
            </div>

            {/* Core 4-Step Methodology Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 font-sans">
              {[
                { step: '1. READ', desc: 'อ่านเบาะแสสั้นๆ', eng: 'Read Easy Clues' },
                { step: '2. THINK', desc: 'คิดหาคำตอบ', eng: 'Think & Answer' },
                { step: '3. PROVE', desc: 'ชี้หลักฐานยืนยัน', eng: 'Prove Evidence' },
                { step: '4. UNLOCK', desc: 'ปลดล็อกกุญแจสมบัติ', eng: 'Unlock Treasure Key' }
              ].map((m, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
                  <span className="font-extrabold text-xs sm:text-sm text-amber-300 block mb-0.5">
                    {m.step}
                  </span>
                  <p className="text-[11px] text-slate-200 font-medium">{m.desc}</p>
                  <p className="text-[10px] text-slate-400">{m.eng}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. MISSION HUB / LEVEL SELECTION SCREEN */}
        {activeScreen === 'missions' && (
          <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-4 sm:py-8 space-y-6 font-sans">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-amber-300">
                  บันทึกภารกิจสืบสวน (Detective Mission Log)
                </h2>
                <p className="text-xs text-amber-200/90">
                  ตอบถูกอย่างน้อย 80% เพื่อสะสมกุญแจหลักฐานและปลดล็อกด่านถัดไป (ออกแบบสำหรับผู้เริ่มต้น)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveScreen('title')}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold"
                >
                  ← กลับหน้าหลัก (Back to HQ)
                </button>
              </div>
            </div>

            {/* 6 Progressive Level Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {LEVELS_CONFIG.map((lvl) => {
                const isUnlocked = lvl.id <= profile.unlockedLevel;
                const isCompleted = profile.completedLevels.includes(lvl.id);

                return (
                  <div
                    key={lvl.id}
                    className={`rounded-2xl border p-4 sm:p-5 transition-all relative overflow-hidden ${
                      isCompleted
                        ? 'bg-slate-900/90 border-emerald-500/40 shadow-lg'
                        : isUnlocked
                        ? 'bg-slate-900 border-amber-500/40 shadow-md hover:border-amber-400'
                        : 'bg-slate-950/60 border-slate-800/80 opacity-75'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase font-sans block">
                          ภารกิจด่านที่ {lvl.id} (MISSION {lvl.id})
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                          {lvl.thaiTitle}
                        </h3>
                        <p className="text-xs text-amber-200/80 font-serif italic">
                          {lvl.title}
                        </p>
                      </div>

                      <div className="shrink-0">
                        {isCompleted ? (
                          <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                        ) : isUnlocked ? (
                          <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                            <Compass className="w-4 h-4" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500">
                            <Lock className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      {lvl.subtitle}
                    </p>

                    {/* Reward Key Preview */}
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/90 flex items-center justify-between text-xs mb-4">
                      <div className="flex items-center gap-2">
                        <Key className={`w-3.5 h-3.5 ${isCompleted ? 'text-amber-400' : 'text-slate-500'}`} />
                        <span className="text-[11px] font-medium text-slate-300">
                          {lvl.evidenceKeyName}
                        </span>
                      </div>
                      <span className="text-[10px] text-amber-400/80 font-sans">5 คำใบ้ (Clues)</span>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => handleStartMission(lvl.id)}
                      disabled={!isUnlocked}
                      className={`touch-target w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                        isCompleted
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                          : isUnlocked
                          ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-950/40 active:scale-98'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                      }`}
                    >
                      {isCompleted ? (
                        <>
                          <span>ทบทวนบทเรียน (Review & Practice)</span>
                          <RotateCcw className="w-4 h-4" />
                        </>
                      ) : isUnlocked ? (
                        <>
                          <span>เริ่มการสืบสวน (Start Investigation)</span>
                          <ChevronRight className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          <span>ยังไม่ปลดล็อก (ต้องผ่านด่าน {lvl.id - 1})</span>
                          <Lock className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. ACTIVE GAMEPLAY SCREEN */}
        {activeScreen === 'gameplay' && (
          <div className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 py-4 space-y-4 font-sans">
            {/* Top Mission Sub-bar */}
            <div className="flex items-center justify-between gap-3 bg-slate-900/80 border border-slate-800 p-2.5 sm:p-3 rounded-2xl text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveScreen('missions')}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  ← เลือกภารกิจ (Missions)
                </button>
                <span className="font-bold text-amber-300 text-xs sm:text-sm truncate">
                  {currentLevel.thaiTitle}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-400 font-sans">
                <span>เบาะแสข้อที่ {currentChallengeIndex + 1} จาก {currentLevel.challenges.length}</span>
              </div>
            </div>

            {/* Split Screen Layout: Map & Challenge Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
              {/* Left Column: Interactive Town Map (5 cols) */}
              <div className="lg:col-span-5 space-y-3">
                <TownMap
                  highlightNodeId={currentChallenge.mapHighlightNodeId}
                  activeNodeId={currentChallenge.expectedFinalNode || currentChallenge.mapHighlightNodeId || 'clock_tower'}
                  playerHeading="N"
                />
              </div>

              {/* Right Column: Challenge Card & Clue Engine (7 cols) */}
              <div className="lg:col-span-7">
                <ChallengeCard
                  challenge={currentChallenge}
                  challengeIndex={currentChallengeIndex}
                  totalChallenges={currentLevel.challenges.length}
                  hintsUsedCount={hintsUsedCount}
                  onOpenHint={() => setShowHintModal(true)}
                  onComplete={handleChallengeComplete}
                  onNextChallenge={handleNextChallenge}
                  isCompleted={profile.completedChallengeIds.includes(currentChallenge.id)}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Modals */}
      <HintModal
        hints={currentChallenge.hints}
        isOpen={showHintModal}
        onClose={() => setShowHintModal(false)}
        unlockedHintLevel={unlockedHintLevel}
        onUseHint={(lvl) => {
          setUnlockedHintLevel(lvl);
          setHintsUsedCount(prev => prev + 1);
        }}
      />

      <DiagnosticModal
        isOpen={showDiagnosticModal}
        onClose={() => setShowDiagnosticModal(false)}
        onCompleteDiagnostic={(score, rec) => {
          setProfile(prev => ({
            ...prev,
            totalXP: prev.totalXP + 25
          }));
        }}
      />

      <LeaderboardModal
        isOpen={showLeaderboardModal}
        onClose={() => setShowLeaderboardModal(false)}
        profile={profile}
      />

      <TeacherDashboardModal
        isOpen={showTeacherDashboardModal}
        onClose={() => setShowTeacherDashboardModal(false)}
        profile={profile}
        onResetProgress={handleResetProgress}
      />

      <VictoryModal
        isOpen={showVictoryModal}
        onClose={() => setShowVictoryModal(false)}
        profile={profile}
        onRestartGame={handleResetProgress}
      />

      <PlayerProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        profile={profile}
        onUpdateNickname={(newNick) => setProfile(prev => ({ ...prev, nickname: newNick }))}
      />
    </div>
  );
}
