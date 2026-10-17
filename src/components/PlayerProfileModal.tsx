/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PlayerProfile } from '../types/game.ts';
import { Compass, Edit3, User, X } from 'lucide-react';

interface PlayerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PlayerProfile;
  onUpdateNickname: (name: string) => void;
}

export const PlayerProfileModal: React.FC<PlayerProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateNickname
}) => {
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState(profile.nickname || profile.studentName || '');

  if (!isOpen) return null;

  const handleSave = () => {
    if (nameInput.trim()) {
      onUpdateNickname(nameInput.trim());
      setEditing(false);
    }
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150 font-sans">
      <div className="w-full max-w-md bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl p-5 text-slate-100 relative">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base text-amber-200">
              แฟ้มประวัตินักสืบ (Detective Dossier)
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="ปิดหน้าต่าง (Close)"
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-4 space-y-4">
          {/* Avatar and Name */}
          <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-md border border-amber-300">
              <Compass className="w-8 h-8" />
            </div>

            <div className="flex-1">
              {!editing ? (
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base text-amber-300">
                      {profile.nickname || profile.studentName || 'นักสืบฝึกหัด'}
                    </span>
                    <button
                      onClick={() => setEditing(true)}
                      aria-label="แก้ไขชื่อเล่น (Edit)"
                      className="text-slate-400 hover:text-amber-300"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-xs text-slate-400 block font-sans">
                    {getThaiRank(profile.rank)}
                  </span>
                  {profile.studentId && (
                    <span className="text-[10px] text-slate-500 font-mono">
                      รหัสประจำตัว: {profile.studentId}
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full px-2.5 py-1 text-xs rounded-lg bg-slate-800 border border-amber-500/50 text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                    placeholder="พิมพ์ชื่อหรือฉายาของคุณ"
                    maxLength={20}
                  />
                  <button
                    onClick={handleSave}
                    className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold"
                  >
                    บันทึก (Save)
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">คะแนน XP รวม</span>
              <span className="text-base font-bold text-amber-300 font-mono">{profile.totalXP}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">กุญแจหลักฐาน (Keys)</span>
              <span className="text-base font-bold text-purple-300 font-mono">{profile.evidenceKeys.length} / 6</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">ด่านที่ผ่าน (Levels)</span>
              <span className="text-base font-bold text-emerald-400 font-mono">{profile.completedLevels.length} / 6</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">สถานะห้องเรียน</span>
              <span className="text-xs font-semibold text-sky-400 block">
                {profile.lmsSynced ? 'เชื่อมต่อ LMS' : 'โหมดในเครื่อง'}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
          >
            ปิดหน้าต่าง (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
