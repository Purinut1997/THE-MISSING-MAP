/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HintItem } from '../types/game.ts';
import { HelpCircle, Key, Lightbulb, Lock, Sparkles, X } from 'lucide-react';

interface HintModalProps {
  hints: HintItem[];
  isOpen: boolean;
  onClose: () => void;
  onUseHint: (level: number) => void;
  unlockedHintLevel: number;
}

export const HintModal: React.FC<HintModalProps> = ({
  hints,
  isOpen,
  onClose,
  onUseHint,
  unlockedHintLevel
}) => {
  const [activeTab, setActiveTab] = useState<number>(Math.max(1, unlockedHintLevel));

  if (!isOpen) return null;

  const currentHint = hints.find(h => h.level === activeTab) || hints[0];

  const handleUnlockLevel = (lvl: number) => {
    setActiveTab(lvl);
    if (lvl > unlockedHintLevel) {
      onUseHint(lvl);
    }
  };

  const getTabLabel = (type: string) => {
    switch (type) {
      case 'Vocabulary':
        return 'คำศัพท์ (Vocab)';
      case 'Evidence':
        return 'จุดสังเกต (Evidence)';
      case 'Reasoning':
        return 'วิธีคิด (Reasoning)';
      default:
        return type;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150 font-sans">
      <div className="w-full max-w-lg bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl p-5 text-slate-100 relative">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-amber-200">
                ระบบตัวช่วยสืบเบาะแส (Detective Clue Assistant)
              </h3>
              <p className="text-[11px] text-amber-200/80">
                คำใบ้ 3 ระดับ (ไวยากรณ์ · จุดสังเกต · การคิดวิเคราะห์)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="ปิดหน้าต่างคำใบ้ (Close)"
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 3-Level Hint Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 my-4">
          {hints.map((hint) => {
            const isUnlocked = hint.level <= unlockedHintLevel;
            const isSelected = activeTab === hint.level;
            return (
              <button
                key={hint.level}
                onClick={() => handleUnlockLevel(hint.level)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-md ring-1 ring-amber-400'
                    : isUnlocked
                    ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                    : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider font-detective">
                    ระดับ {hint.level}
                  </span>
                  {isUnlocked ? (
                    <Sparkles className="w-3 h-3 text-amber-400" />
                  ) : (
                    <Lock className="w-3 h-3 text-slate-500" />
                  )}
                </div>
                <div className="text-xs font-semibold truncate font-sans">
                  {getTabLabel(hint.type)}
                </div>
              </button>
            );
          })}
        </div>

        {/* Current Hint Content Card */}
        {currentHint && (
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Key className="w-3.5 h-3.5" />
              <span>{currentHint.title}</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              {currentHint.content}
            </p>

            <div className="pt-2 border-t border-slate-800/80">
              <span className="text-[11px] font-semibold text-amber-300 block mb-0.5">
                💡 คำอธิบายภาษาไทย:
              </span>
              <p className="text-xs text-amber-200/90 leading-relaxed">
                {currentHint.thaiContent}
              </p>
            </div>
          </div>
        )}

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>* การเปิดคำใบ้ช่วยให้เรียนรู้ได้ง่ายขึ้นโดยไม่ถูกตัดสิทธิ์</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
          >
            เข้าใจแล้ว (Got It)
          </button>
        </div>
      </div>
    </div>
  );
};
