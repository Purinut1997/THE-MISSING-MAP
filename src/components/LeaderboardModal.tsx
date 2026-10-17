/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LeaderboardPlayer, PlayerProfile } from '../types/game.ts';
import { SAMPLE_LEADERBOARD } from '../data/missions.ts';
import { Crown, Trophy, X } from 'lucide-react';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PlayerProfile;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  profile
}) => {
  const [activeTab, setActiveTab] = useState<'xp' | 'mastery'>('xp');

  if (!isOpen) return null;

  const readingStats = profile.skillScores.reading || { correct: 0, total: 0 };
  const evidenceStats = profile.skillScores.evidence || { correct: 0, total: 0 };
  const playerReadingAcc = readingStats.total > 0 ? Math.round((readingStats.correct / readingStats.total) * 100) : 85;
  const playerEvidenceAcc = evidenceStats.total > 0 ? Math.round((evidenceStats.correct / evidenceStats.total) * 100) : 85;

  const currentPlayerEntry: LeaderboardPlayer = {
    id: 'current_player',
    rank: 4,
    nickname: profile.nickname || profile.studentName || 'คุณ (You - Junior Detective)',
    avatarId: profile.avatarId || 'avatar_sherlock',
    totalXP: profile.totalXP,
    levelsCompleted: profile.completedLevels.length,
    readingAccuracy: playerReadingAcc,
    evidenceAccuracy: playerEvidenceAcc,
    detectiveRank: profile.rank,
    isCurrentPlayer: true
  };

  const allPlayers = [...SAMPLE_LEADERBOARD, currentPlayerEntry];
  const sortedPlayers = allPlayers.sort((a, b) => {
    if (activeTab === 'xp') {
      return b.totalXP - a.totalXP;
    } else {
      const scoreA = a.readingAccuracy * 0.6 + a.evidenceAccuracy * 0.4;
      const scoreB = b.readingAccuracy * 0.6 + b.evidenceAccuracy * 0.4;
      return scoreB - scoreA;
    }
  }).slice(0, 10);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150 font-sans">
      <div className="w-full max-w-2xl bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl p-4 sm:p-6 text-slate-100 relative max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-md">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-amber-300">
                ทำเนียบยอดนักสืบ (Detective Hall of Fame)
              </h3>
              <p className="text-[11px] text-amber-200/80">
                อันดับคะแนนและความแม่นยำในการอ่านภาษาอังกฤษ (O-NET English Grade 6)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="ปิดหน้าต่าง (Close)"
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center justify-between gap-2 py-3 shrink-0">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('xp')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeTab === 'xp'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              คะแนน XP รวม (Total XP)
            </button>
            <button
              onClick={() => setActiveTab('mastery')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeTab === 'mastery'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ความแม่นยำในการอ่าน (Mastery ≥80%)
            </button>
          </div>

          <div className="text-[10px] text-amber-300/80 bg-amber-950/40 border border-amber-500/20 px-2.5 py-1 rounded-lg hidden sm:block">
            {profile.lmsSynced ? 'เชื่อมต่อระบบห้องเรียน (LMS Synced)' : 'โหมดบันทึกในเครื่อง (Local Demo)'}
          </div>
        </div>

        {/* Leaderboard Table List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {sortedPlayers.map((player, idx) => {
            const actualRank = idx + 1;
            const isTop1 = actualRank === 1;
            const isTop2 = actualRank === 2;
            const isTop3 = actualRank === 3;
            const isCurrent = player.isCurrentPlayer;

            return (
              <div
                key={player.id}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-amber-500/15 border-amber-400 shadow-md ring-1 ring-amber-400'
                    : isTop1
                    ? 'bg-gradient-to-r from-amber-950/40 to-slate-900 border-amber-500/40'
                    : isTop2
                    ? 'bg-gradient-to-r from-slate-800/60 to-slate-900 border-slate-400/40'
                    : isTop3
                    ? 'bg-gradient-to-r from-amber-950/20 to-slate-900 border-amber-800/40'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Left: Rank & Nickname */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      isTop1
                        ? 'bg-amber-400 text-slate-950'
                        : isTop2
                        ? 'bg-slate-300 text-slate-950'
                        : isTop3
                        ? 'bg-amber-700 text-amber-100'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isTop1 ? <Crown className="w-4 h-4" /> : actualRank}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs sm:text-sm text-slate-100">
                        {player.nickname}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] bg-amber-400 text-slate-950 font-extrabold px-1.5 py-0.2 rounded font-sans">
                          คุณ (YOU)
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 font-sans">
                      {player.detectiveRank} · ผ่าน {player.levelsCompleted}/6 ด่าน
                    </span>
                  </div>
                </div>

                {/* Right: Scores */}
                <div className="flex items-center gap-4 text-right">
                  <div className="hidden sm:block">
                    <span className="text-[10px] text-slate-400 block font-sans">การอ่าน</span>
                    <span className="font-mono text-xs font-bold text-emerald-400">
                      {player.readingAccuracy}%
                    </span>
                  </div>

                  <div className="hidden sm:block">
                    <span className="text-[10px] text-slate-400 block font-sans">หลักฐาน</span>
                    <span className="font-mono text-xs font-bold text-purple-400">
                      {player.evidenceAccuracy}%
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-sans">คะแนน XP</span>
                    <span className="font-mono text-sm font-extrabold text-amber-300">
                      {player.totalXP}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-3 mt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 shrink-0">
          <span>* อันดับจะอัปเดตแบบเรียลไทม์เมื่อผ่านภารกิจ</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
          >
            ปิดทำเนียบยอดนักสืบ (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
