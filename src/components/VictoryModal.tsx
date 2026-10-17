/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { PlayerProfile } from '../types/game.ts';
import { createLMSPayload } from '../utils/rules.ts';
import {
  Award,
  Crown,
  Key,
  RotateCcw,
  ShieldCheck,
  Trophy,
  X
} from 'lucide-react';

interface VictoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PlayerProfile;
  onRestartGame: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  onClose,
  profile,
  onRestartGame
}) => {
  const [lmsDispatched, setLmsDispatched] = useState(false);

  useEffect(() => {
    if (isOpen && !lmsDispatched) {
      const finalScore = 100;
      const payload = createLMSPayload({
        studentId: profile.studentId,
        studentName: profile.studentName || profile.nickname,
        lessonId: profile.lessonId,
        itemId: profile.itemId,
        score: finalScore,
        totalXP: profile.totalXP,
        rank: profile.rank,
        evidenceKeysCount: profile.evidenceKeys.length
      });

      if (typeof window !== 'undefined' && window.parent) {
        window.parent.postMessage(payload, '*');
      }
      setLmsDispatched(true);
    }
  }, [isOpen, lmsDispatched, profile]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in zoom-in-95 duration-200 font-sans">
      <div className="w-full max-w-2xl bg-slate-900 border-2 border-amber-500/60 rounded-3xl shadow-2xl p-4 sm:p-6 text-slate-100 relative max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="ปิดหน้าต่าง (Close)"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Celebration Header */}
        <div className="text-center space-y-2 mb-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 text-slate-950 shadow-xl shadow-amber-950/50 mx-auto">
            <Crown className="w-9 h-9" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-amber-300 font-mystery uppercase tracking-wide">
            กอบกู้แผนที่สมบัติสำเร็จ!
          </h2>
          <p className="text-sm text-amber-100 font-bold">
            THE MISSING MAP RECOVERED!
          </p>
          <p className="text-xs sm:text-sm text-amber-200/90 max-w-md mx-auto">
            ยินดีด้วย! คุณผ่านการทดสอบระดับยอดนักสืบ (Master Detective) และพิชิตโจทย์ภาษาอังกฤษเพื่อเตรียมสอบ O-NET สำเร็จ!
          </p>
        </div>

        {/* Reassuring LMS Sync Banner */}
        <div className="mb-4 p-3.5 rounded-2xl bg-emerald-950/50 border border-emerald-500/50 text-emerald-200 flex items-center gap-3 shadow-lg">
          <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <span className="font-bold block text-sm text-emerald-300">
              บันทึกคะแนนส่งกลับระบบห้องเรียนเรียบร้อยแล้ว (LMS Synced!)
            </span>
            <span>
              คะแนนเต็ม (100%), {profile.totalXP} คะแนน XP และกุญแจหลักฐานครบ 6 ดอก ได้รับการส่งต่อและบันทึกในบัญชีเรียนของ {profile.studentName || profile.nickname || 'นักสืบ'} เรียบร้อยแล้ว
            </span>
          </div>
        </div>

        {/* Parchment Treasure Map Visual Artifact */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-amber-600/40 shadow-inner mb-4">
          <img
            src="/images/treasure_map_1792231831028.jpg"
            alt="The Recovered Ancient Treasure Map of English Town"
            className="w-full h-48 sm:h-64 object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end p-4">
            <div className="text-white">
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest block font-sans">
                สมบัติที่แท้จริงคือความรู้ภาษาอังกฤษ (OFFICIAL ARTIFACT)
              </span>
              <p className="text-xs sm:text-sm font-serif italic text-amber-100">
                "Good English reading and thinking are the greatest treasures of English Town."
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2.5 mb-5 text-center">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <Award className="w-5 h-5 text-amber-400 mx-auto mb-1" />
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">คะแนน XP ทั้งหมด</span>
            <span className="text-base sm:text-lg font-bold text-amber-300 font-mono">{profile.totalXP}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <Key className="w-5 h-5 text-purple-400 mx-auto mb-1" />
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">กุญแจหลักฐาน</span>
            <span className="text-base sm:text-lg font-bold text-purple-300 font-mono">{profile.evidenceKeys.length}/6</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <Trophy className="w-5 h-5 text-sky-400 mx-auto mb-1" />
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">ระดับขั้นสุดท้าย</span>
            <span className="text-xs sm:text-sm font-bold text-sky-300 block truncate font-sans">
              ยอดนักสืบ (Master)
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
          <button
            onClick={onClose}
            className="touch-target px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-xl shadow-amber-950/60 transition-transform active:scale-95"
          >
            กลับสู่สถาบันและดูแผนที่เมือง (Town Map)
          </button>
          <button
            onClick={() => {
              onRestartGame();
              onClose();
            }}
            className="touch-target px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm flex items-center justify-center gap-2 border border-slate-700"
          >
            <RotateCcw className="w-4 h-4" />
            <span>เริ่มเล่นใหม่อีกครั้ง (Play Again)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
