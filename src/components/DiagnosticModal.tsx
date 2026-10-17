/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DIAGNOSTIC_QUESTIONS } from '../data/missions.ts';
import { CheckCircle2, Compass, Sparkles, X } from 'lucide-react';

interface DiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteDiagnostic: (score: number, levelRecommendation: number) => void;
}

export const DiagnosticModal: React.FC<DiagnosticModalProps> = ({
  isOpen,
  onClose,
  onCompleteDiagnostic
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  const currentQ = DIAGNOSTIC_QUESTIONS[currentQuestionIndex];

  const handleSelect = (idx: number) => {
    const updated = [...selectedAnswers];
    updated[currentQuestionIndex] = idx;
    setSelectedAnswers(updated);
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < DIAGNOSTIC_QUESTIONS.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      let correct = 0;
      DIAGNOSTIC_QUESTIONS.forEach((q, i) => {
        if (selectedAnswers[i] === q.correctAnswer) correct++;
      });
      const scorePct = Math.round((correct / DIAGNOSTIC_QUESTIONS.length) * 100);
      setIsFinished(true);
      onCompleteDiagnostic(scorePct, scorePct >= 75 ? 3 : 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150 font-sans">
      <div className="w-full max-w-lg bg-slate-900 border border-sky-500/40 rounded-2xl shadow-2xl p-5 text-slate-100 relative">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-sky-400" />
            <div>
              <h3 className="font-bold text-sm sm:text-base text-sky-200">
                แบบประเมินวัดระดับความรู้เบื้องต้น (Diagnostic Placement Check)
              </h3>
              <p className="text-[11px] text-sky-300/80">
                4 ข้อสั้นๆ สำหรับผู้เริ่มต้นเรียนรู้ภาษาอังกฤษ
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

        {!isFinished ? (
          <div className="py-4 space-y-4">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
              <span>คำถามข้อที่ {currentQuestionIndex + 1} จาก {DIAGNOSTIC_QUESTIONS.length}</span>
              <span className="text-sky-400 uppercase">ทักษะ: {currentQ.skill}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <p className="text-sm font-medium text-slate-100 mb-1">{currentQ.question}</p>
              <p className="text-xs text-sky-200/90">💡 {currentQ.thaiQuestion}</p>
            </div>

            <div className="space-y-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedAnswers[currentQuestionIndex] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-sky-500/20 border-sky-400 text-sky-100 ring-1 ring-sky-400'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{opt}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-sky-400" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestionIndex] === undefined}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold ${
                  selectedAnswers[currentQuestionIndex] !== undefined
                    ? 'bg-sky-500 hover:bg-sky-400 text-slate-950'
                    : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                }`}
              >
                {currentQuestionIndex + 1 === DIAGNOSTIC_QUESTIONS.length ? 'เสร็จสิ้นการประเมิน (Finish)' : 'ข้อถัดไป (Next)'}
              </button>
            </div>
          </div>
        ) : (
          <div className="py-6 text-center space-y-3">
            <Sparkles className="w-10 h-10 text-amber-400 mx-auto" />
            <h4 className="text-lg font-bold text-amber-300">ประเมินผลเรียบร้อยแล้ว! (Ready to Learn!)</h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
              ยอดเยี่ยมมาก! ระบบได้ปรับระดับความยากให้เหมาะสำหรับผู้เริ่มต้น โดยเริ่มจาก <strong>ด่านที่ 1: นักล่าคำศัพท์ (Level 1: Vocabulary Hunter)</strong> เพื่อสะสมกุญแจหลักฐานและคะแนน XP
            </p>
            <div className="pt-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm"
              >
                เริ่มการผจญภัย (Begin Adventure)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
