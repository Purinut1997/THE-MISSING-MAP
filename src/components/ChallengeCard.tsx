/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Challenge } from '../types/game.ts';
import { calculateChallengeXP } from '../utils/rules.ts';
import {
  CheckCircle2,
  HelpCircle,
  Volume2,
  Sparkles,
  ArrowRight,
  RotateCcw,
  BookOpen,
  FileText,
  Search,
  Check,
  AlertCircle
} from 'lucide-react';

interface ChallengeCardProps {
  challenge: Challenge;
  challengeIndex: number;
  totalChallenges: number;
  hintsUsedCount: number;
  onOpenHint: () => void;
  onComplete: (success: boolean, xpEarned: number, evidenceSuccess: boolean) => void;
  onNextChallenge: () => void;
  isCompleted: boolean;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challenge,
  challengeIndex,
  totalChallenges,
  hintsUsedCount,
  onOpenHint,
  onComplete,
  onNextChallenge,
  isCompleted
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [selectedEvidence, setSelectedEvidence] = useState<number | null>(null);
  const [step, setStep] = useState<'think' | 'prove' | 'result'>('think');
  const [hasEvaluated, setHasEvaluated] = useState<boolean>(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false);
  const [isEvidenceCorrect, setIsEvidenceCorrect] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Audio text-to-speech for English pronunciation
  const handleSpeakStimulus = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (isSpeaking) {
        setIsSpeaking(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(challenge.stimulus);
      utterance.lang = 'en-US';
      utterance.rate = 0.85; // slightly slower for beginners
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelectAnswer = (idx: number) => {
    if (step !== 'think') return;
    setSelectedAnswer(idx);
  };

  const handleProceedToProve = () => {
    if (selectedAnswer === null) return;
    setStep('prove');
  };

  const handleSelectEvidence = (idx: number) => {
    if (step !== 'prove') return;
    setSelectedEvidence(idx);
  };

  const handleEvaluate = () => {
    if (selectedAnswer === null || selectedEvidence === null) return;
    const ansCorrect = selectedAnswer === challenge.correctAnswer;
    const evCorrect = selectedEvidence === challenge.correctEvidence;

    setIsAnswerCorrect(ansCorrect);
    setIsEvidenceCorrect(evCorrect);
    setHasEvaluated(true);
    setStep('result');

    const xp = calculateChallengeXP(ansCorrect, evCorrect, hintsUsedCount, challenge.xpReward);
    onComplete(ansCorrect && evCorrect, xp, evCorrect);
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setSelectedEvidence(null);
    setStep('think');
    setHasEvaluated(false);
    setIsAnswerCorrect(false);
    setIsEvidenceCorrect(false);
  };

  return (
    <div className="w-full bg-slate-900 border border-amber-900/40 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden">
      {/* Step Progress Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-sans text-xs font-bold border border-amber-500/30">
            ภารกิจที่ {challengeIndex + 1}/{totalChallenges} (CLUE {challengeIndex + 1})
          </span>
          <span className="text-xs text-slate-400 font-sans">
            ทักษะ: <span className="text-amber-200 capitalize">{challenge.skillCategory}</span>
          </span>
        </div>

        {/* 4-Step Learning Indicator */}
        <div className="flex items-center gap-1 sm:gap-2 text-[11px] font-semibold font-sans">
          <span className="text-amber-400">1. อ่าน (READ)</span>
          <span className="text-slate-600">→</span>
          <span className={step === 'think' ? 'text-amber-400 font-bold underline' : 'text-slate-400'}>
            2. คิด (THINK)
          </span>
          <span className="text-slate-600">→</span>
          <span className={step === 'prove' ? 'text-amber-400 font-bold underline' : 'text-slate-400'}>
            3. พิสูจน์ (PROVE)
          </span>
          <span className="text-slate-600">→</span>
          <span className={step === 'result' ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
            4. ปลดล็อก (UNLOCK)
          </span>
        </div>
      </div>

      {/* STEP 1: READ - Meaningful Beginner English Stimulus */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wide font-sans">
              ขั้นตอนที่ 1: อ่านเบาะแสภาษาอังกฤษ (Step 1: Read the Clue)
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Listen Button */}
            <button
              onClick={handleSpeakStimulus}
              aria-label={isSpeaking ? 'หยุดเสียง (Stop)' : 'ฟังเสียงอ่านภาษาอังกฤษ (Listen)'}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-200 text-xs font-sans transition-colors"
            >
              <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'text-amber-400 animate-pulse' : 'text-slate-400'}`} />
              <span>{isSpeaking ? 'กำลังเล่นเสียง...' : 'ฟังเสียงอ่าน (Listen)'}</span>
            </button>

            {/* Hint Button */}
            <button
              onClick={onOpenHint}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-semibold font-sans transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>ขอคำใบ้ (Hint) {hintsUsedCount > 0 && `(${hintsUsedCount})`}</span>
            </button>
          </div>
        </div>

        {/* Parchment Reading Box */}
        <div className="parchment-bg rounded-xl p-4 sm:p-5 border-2 border-[#8c6b45]/40 shadow-inner text-slate-900">
          {challenge.stimulusContext && (
            <div className="text-[11px] font-bold text-[#784f23] uppercase tracking-wider mb-1.5 flex items-center gap-1.5 border-b border-[#c8aa80]/40 pb-1 font-sans">
              <FileText className="w-3.5 h-3.5" />
              <span>{challenge.stimulusContext}</span>
            </div>
          )}
          <p className="font-serif sm:text-lg text-base leading-relaxed whitespace-pre-wrap font-medium text-[#22170d]">
            {challenge.stimulus}
          </p>
        </div>
      </div>

      {/* STEP 2: THINK - Core Comprehension Question */}
      {step === 'think' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Search className="w-4 h-4 text-sky-400" />
              <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                Step 2: {challenge.question}
              </h3>
            </div>
            {challenge.thaiQuestion && (
              <p className="text-xs sm:text-sm text-amber-200/90 mb-3 ml-6 font-sans">
                💡 {challenge.thaiQuestion}
              </p>
            )}
          </div>

          {/* 4 Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {challenge.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(idx)}
                  className={`touch-target p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-400 text-amber-100 shadow-md shadow-amber-950/50 ring-1 ring-amber-400'
                      : 'bg-slate-800/80 border-slate-700/80 text-slate-200 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 font-sans ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-snug pt-0.5 font-sans">{option}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={handleProceedToProve}
              disabled={selectedAnswer === null}
              className={`touch-target px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all font-sans ${
                selectedAnswer !== null
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-950/60 hover:from-amber-400 hover:to-amber-500 active:scale-95'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              <span>ถัดไป: พิสูจน์หลักฐาน (Next: Prove)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: PROVE - Textual Evidence Verification */}
      {step === 'prove' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm sm:text-base font-bold text-white font-sans">
                ขั้นตอนที่ 3: พิสูจน์หลักฐาน! (Step 3: Prove It!)
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-purple-300/90 ml-6 font-sans">
              เลือกประโยคจากเนื้อเรื่องภาษาอังกฤษที่ยืนยันว่าคำตอบของคุณถูกต้อง:
            </p>
          </div>

          <div className="space-y-2">
            {challenge.evidenceOptions.map((evOption, idx) => {
              const isSelected = selectedEvidence === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectEvidence(idx)}
                  className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-serif italic transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-purple-950/50 border-purple-400 text-purple-100 ring-1 ring-purple-400 shadow-lg'
                      : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 font-sans not-italic ${
                      isSelected
                        ? 'bg-purple-400 text-slate-950'
                        : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{evOption}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 flex justify-between items-center font-sans">
            <button
              onClick={() => setStep('think')}
              className="touch-target px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              ← ย้อนกลับไปดูคำถาม (Back)
            </button>

            <button
              onClick={handleEvaluate}
              disabled={selectedEvidence === null}
              className={`touch-target px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
                selectedEvidence !== null
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-950/60 hover:from-purple-400 hover:to-indigo-500 active:scale-95'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>ตรวจคำตอบและปลดล็อก (Unlock & Verify)</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: RESULT & scaffolded explanation */}
      {step === 'result' && (
        <div className="space-y-4 animate-in zoom-in-95 duration-200">
          <div
            className={`p-4 rounded-xl border ${
              isAnswerCorrect && isEvidenceCorrect
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                : 'bg-amber-950/40 border-amber-500/40 text-amber-200'
            }`}
          >
            <div className="flex items-start gap-3">
              {isAnswerCorrect && isEvidenceCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className="font-bold text-base mb-1 font-sans">
                  {isAnswerCorrect && isEvidenceCorrect
                    ? '🎉 ยอดเยี่ยมมาก! ตรวจสอบหลักฐานถูกต้อง (Excellent Detective Work!)'
                    : '💡 ลองสังเกตคำใบ้อีกครั้งนะ (Review the Clue):'}
                </h4>
                <p className="text-xs sm:text-sm leading-relaxed mb-2 font-sans">
                  {challenge.explanation}
                </p>
                <p className="text-xs text-amber-300/90 font-sans border-t border-amber-500/20 pt-1.5">
                  คำอธิบายภาษาไทย: {challenge.thaiExplanation}
                </p>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 font-sans">
            {!isAnswerCorrect || !isEvidenceCorrect ? (
              <button
                onClick={handleRetry}
                className="touch-target px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs sm:text-sm font-semibold flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>ลองตอบใหม่อีกครั้ง (Retry Challenge)</span>
              </button>
            ) : (
              <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>+25 คะแนน XP และบันทึกหลักฐานเรียบร้อย!</span>
              </div>
            )}

            <button
              onClick={onNextChallenge}
              className="touch-target px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-950/60"
            >
              <span>{challengeIndex + 1 === totalChallenges ? 'สำเร็จภารกิจ (Complete Mission)' : 'เบาะแสถัดไป (Next Clue)'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
