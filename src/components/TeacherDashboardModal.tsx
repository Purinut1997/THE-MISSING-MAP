/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PlayerProfile, SkillCategory } from '../types/game.ts';
import { SAMPLE_LEADERBOARD } from '../data/missions.ts';
import {
  AlertTriangle,
  BarChart3,
  Download,
  RotateCcw,
  X
} from 'lucide-react';

interface TeacherDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PlayerProfile;
  onResetProgress: () => void;
}

export const TeacherDashboardModal: React.FC<TeacherDashboardModalProps> = ({
  isOpen,
  onClose,
  profile,
  onResetProgress
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'roster' | 'analytics'>('overview');

  if (!isOpen) return null;

  const getSkillAcc = (skill: SkillCategory) => {
    const s = profile.skillScores[skill] || { correct: 0, total: 0 };
    return s.total > 0 ? Math.round((s.correct / s.total) * 100) : 85;
  };

  const skillBreakdown = [
    { label: 'คำศัพท์สถานที่ (Places Vocabulary)', rate: getSkillAcc('vocabulary'), color: 'bg-amber-400' },
    { label: 'คำบุพบทบอกตำแหน่ง (Prepositions of Place)', rate: getSkillAcc('prepositions'), color: 'bg-sky-400' },
    { label: 'การบอกทิศทางและแผนที่ (Directions & Navigation)', rate: getSkillAcc('directions'), color: 'bg-emerald-400' },
    { label: 'บทสนทนาถามทาง (Everyday Dialogue)', rate: getSkillAcc('dialogue'), color: 'bg-indigo-400' },
    { label: 'การอ่านจับใจความ (Short Reading Comprehension)', rate: getSkillAcc('reading'), color: 'bg-purple-400' },
    { label: 'การหาหลักฐานยืนยัน (Evidence Citation)', rate: getSkillAcc('evidence'), color: 'bg-rose-400' }
  ];

  const handleExportCSV = () => {
    const headers = ['Student ID', 'Student Name', 'Rank', 'Total XP', 'Levels Completed', 'Vocabulary Acc %', 'Directions Acc %', 'Reading Acc %', 'Evidence Acc %', 'Status'];
    const rows = [
      [
        profile.studentId || 'N/A',
        profile.studentName || profile.nickname || 'Student',
        profile.rank,
        profile.totalXP,
        profile.completedLevels.length,
        getSkillAcc('vocabulary'),
        getSkillAcc('directions'),
        getSkillAcc('reading'),
        getSkillAcc('evidence'),
        profile.completedLevels.length >= 6 ? 'Passed Final Boss' : 'In Progress'
      ]
    ];

    SAMPLE_LEADERBOARD.forEach((s, idx) => {
      rows.push([
        `STU-00${idx + 2}`,
        s.nickname,
        s.detectiveRank,
        s.totalXP,
        s.levelsCompleted,
        s.readingAccuracy + 2,
        s.readingAccuracy - 3,
        s.readingAccuracy,
        s.evidenceAccuracy,
        s.levelsCompleted >= 6 ? 'Completed' : 'In Progress'
      ]);
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `the_missing_map_class_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150 font-sans">
      <div className="w-full max-w-3xl bg-slate-900 border border-indigo-500/40 rounded-2xl shadow-2xl p-4 sm:p-6 text-slate-100 relative max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white shadow-md">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-indigo-200">
                แดชบอร์ดคุณครู & ระบบวิเคราะห์ผลการเรียนรู้ (Teacher Analytics)
              </h3>
              <p className="text-[11px] text-indigo-300/80">
                วิเคราะห์ผลสัมฤทธิ์ภาษาอังกฤษ ป.6 เตรียมความพร้อม O-NET สำหรับผู้เริ่มต้น
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="ปิดแดชบอร์ด (Close)"
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between gap-2 py-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeTab === 'overview' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ภาพรวมชั้นเรียน (Overview)
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeTab === 'analytics' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ความเชี่ยวชาญทักษะ (Skill Mastery)
            </button>
            <button
              onClick={() => setActiveTab('roster')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeTab === 'roster' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              รายชื่อนักเรียน (Student Roster)
            </button>
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-xs font-semibold"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">ส่งออกรายงาน CSV</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto py-3 space-y-4 pr-1">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Metric Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">นักเรียนในห้อง (Students)</span>
                  <span className="text-xl font-extrabold text-indigo-300 font-mono">8 คน</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">ภารกิจที่สำเร็จ (Missions)</span>
                  <span className="text-xl font-extrabold text-emerald-400 font-mono">{profile.completedLevels.length}/6</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">คะแนนเฉลี่ย (Avg XP)</span>
                  <span className="text-xl font-extrabold text-amber-400 font-mono">512 XP</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">เกณฑ์ผ่าน (Target)</span>
                  <span className="text-xl font-extrabold text-purple-400 font-mono">≥ 80%</span>
                </div>
              </div>

              {/* Observed Common Mistakes & Pedagogical Recommendations */}
              <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/20 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>การวิเคราะห์จุดที่ผู้เรียนระดับเริ่มต้นมักสับสน & คำแนะนำในการสอน</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>
                    <strong>ทิศทางเลี้ยวซ้าย/ขวา (Turn left / Turn right):</strong> แนะนำให้ผู้เรียนหมุนทิศตามตัวละครนักสืบในแผนที่เพื่อความแม่นยำ
                  </li>
                  <li>
                    <strong>คำบอกตำแหน่ง (Prepositions):</strong> เน้นย้ำความแตกต่างระหว่าง "opposite" (อยู่ตรงข้ามข้ามถนน) กับ "next to" (อยู่ติดกัน)
                  </li>
                  <li>
                    <strong>การหาประโยคหลักฐาน (Evidence):</strong> ข้อความเบื้องต้นได้รับการออกแบบให้มีคำบ่งชี้ชัดเจน ช่วยสร้างความมั่นใจในการทำข้อสอบ O-NET
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                ระดับความเชี่ยวชาญตามมาตรฐานตัวชี้วัด (Competency Breakdown)
              </h4>
              <div className="space-y-2.5">
                {skillBreakdown.map((s, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
                      <span>{s.label}</span>
                      <span className="font-mono text-amber-300">{s.rate}% ผ่านเกณฑ์</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${s.color} transition-all duration-500 rounded-full`}
                        style={{ width: `${Math.min(100, s.rate)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'roster' && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide mb-2">
                รายชื่อและการติดตามความก้าวหน้ารายบุคคล
              </h4>
              <div className="space-y-1.5">
                {[
                  {
                    name: profile.studentName || profile.nickname || 'นักเรียนปัจจุบัน (You)',
                    id: profile.studentId || 'STU-001',
                    rank: profile.rank,
                    xp: profile.totalXP,
                    keys: profile.evidenceKeys.length,
                    status: 'Active Student'
                  },
                  ...SAMPLE_LEADERBOARD.map((s, i) => ({
                    name: s.nickname,
                    id: `STU-00${i + 2}`,
                    rank: s.detectiveRank,
                    xp: s.totalXP,
                    keys: s.levelsCompleted,
                    status: 'Active'
                  }))
                ].map((st, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                    <div>
                      <span className="font-bold text-slate-200">{st.name}</span>
                      <span className="text-slate-500 text-[11px] ml-2 font-mono">({st.id})</span>
                      <p className="text-[11px] text-amber-300/80">{st.rank}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-amber-400 block">{st.xp} XP</span>
                      <span className="text-purple-400 text-[11px]">{st.keys}/6 กุญแจ</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer & Reset Season Action */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs shrink-0">
          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="text-rose-400 hover:text-rose-300 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>รีเซ็ตคะแนนฤดูกาล (Reset Season)</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-rose-400 text-xs">ยืนยันการล้างข้อมูลในเครื่อง?</span>
              <button
                onClick={() => {
                  onResetProgress();
                  setShowResetConfirm(false);
                  onClose();
                }}
                className="px-2.5 py-1 rounded bg-rose-600 text-white font-bold text-[11px]"
              >
                ยืนยันรีเซ็ต
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-[11px]"
              >
                ยกเลิก
              </button>
            </div>
          )}

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
          >
            ปิดแดชบอร์ด (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
