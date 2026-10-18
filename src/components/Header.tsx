/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PlayerProfile } from '../types/game.ts';
import { Award, Compass, Key, Trophy, Users, Volume2, VolumeX, Shield } from 'lucide-react';

interface HeaderProps {
  profile: PlayerProfile;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenLeaderboard: () => void;
  onOpenTeacherDashboard: () => void;
  onOpenProfile: () => void;
  onOpenDiagnostic: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  soundEnabled,
  onToggleSound,
  onOpenLeaderboard,
  onOpenTeacherDashboard,
  onOpenProfile,
  onOpenDiagnostic
}) => {
  const getThaiRank = (rank: string) => {
    switch (rank) {
      case 'Master Detective':
        return 'ยอดนักสืบ (Master)';
      case 'Expert Detective':
        return 'นักสืบผู้เชี่ยวชาญ (Expert)';
      case 'Field Detective':
        return 'นักสืบภาคสนาม (Field)';
      case 'Junior Detective':
        return 'นักสืบรุ่นเยาว์ (Junior)';
      default:
        return 'นักสืบฝึกหัด (Rookie)';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-amber-900/30 px-3 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-6">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 text-left group transition-transform active:scale-95"
            aria-label="ดูโปรไฟล์นักสืบ (View Detective Profile)"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-950/40 text-slate-950 font-bold border border-amber-300/40">
              <Compass className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <span className="text-sm sm:text-base font-extrabold tracking-wide text-amber-300 font-mystery whitespace-nowrap block leading-tight">
                THE MISSING MAP
              </span>
              <span className="text-[10px] text-amber-200/90 block leading-none font-sans font-medium">
                {profile.nickname || profile.studentName || 'นักสืบฝึกหัด'} · แผนที่ปริศนา (Adventure)
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Stats & Badges */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-1 scrollbar-none text-xs">
          {/* Rank Badge */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-amber-500/20 text-amber-200 whitespace-nowrap hover:bg-slate-800 transition-colors"
          >
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-[11px]">{getThaiRank(profile.rank)}</span>
          </button>

          {/* XP Counter */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 whitespace-nowrap font-sans">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold font-mono text-[12px]">{profile.totalXP}</span>
            <span className="text-[10px] text-amber-400/80 font-sans">XP</span>
          </div>

          {/* Evidence Keys */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 whitespace-nowrap">
            <Key className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-bold text-[11px]">{profile.evidenceKeys.length}/6</span>
            <span className="hidden sm:inline text-[10px] text-purple-300/80">กุญแจ (Keys)</span>
          </div>

          {/* LMS Connection Status Pill */}
          {profile.lmsSynced && (
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 whitespace-nowrap text-[11px] hover:bg-emerald-900/60 transition-colors"
              title="เชื่อมต่อระบบห้องเรียนออนไลน์เรียบร้อยแล้ว"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold text-[10px]">LMS ONLINE</span>
            </button>
          )}

          {/* Diagnostic Button */}
          <button
            onClick={onOpenDiagnostic}
            className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-950/40 border border-sky-500/30 text-sky-300 hover:bg-sky-900/40 transition-colors text-[11px] whitespace-nowrap font-medium"
          >
            วัดระดับพื้นฐาน (Skill Check)
          </button>
        </div>

        {/* Zone 3: Navigation Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'ปิดเสียง (Mute)' : 'เปิดเสียง (Sound)'}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/60 flex items-center justify-center text-slate-300 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          <button
            onClick={onOpenLeaderboard}
            aria-label="ดูทำเนียบยอดนักสืบ (Hall of Fame)"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 text-xs font-semibold whitespace-nowrap transition-colors"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">ทำเนียบยอดนักสืบ (Leaderboard)</span>
          </button>

          <button
            onClick={onOpenTeacherDashboard}
            aria-label="แดชบอร์ดคุณครู (Teacher Report)"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-400/30 text-indigo-200 text-xs font-semibold whitespace-nowrap transition-colors"
          >
            <Users className="w-4 h-4 text-indigo-400" />
            <span className="hidden md:inline">รายงานคุณครู (Teacher)</span>
          </button>
        </div>
      </div>
    </header>
  );
};
