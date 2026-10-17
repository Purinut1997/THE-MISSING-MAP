/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TOWN_NODES, MAP_TEXT_DESCRIPTION } from '../data/mapData.ts';
import { TownNode, CompassHeading } from '../types/game.ts';
import {
  Compass,
  Info,
  MapPin,
  Navigation,
  X,
  Volume2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2
} from 'lucide-react';

interface TownMapProps {
  highlightNodeId?: string;
  activeNodeId?: string;
  playerHeading?: CompassHeading;
  onSelectNode?: (node: TownNode) => void;
  interactive?: boolean;
}

export const TownMap: React.FC<TownMapProps> = ({
  highlightNodeId,
  activeNodeId = 'clock_tower',
  playerHeading = 'N',
  onSelectNode,
  interactive = true
}) => {
  const [selectedNode, setSelectedNode] = useState<TownNode | null>(null);
  const [showAccessibleText, setShowAccessibleText] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const activeNode =
    TOWN_NODES.find((n) => n.id === (highlightNodeId || activeNodeId)) || TOWN_NODES[6];

  const handleNodeClick = (node: TownNode) => {
    if (!interactive) return;
    setSelectedNode(node);
    if (onSelectNode) onSelectNode(node);
  };

  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const getThaiHeading = (h: CompassHeading) => {
    switch (h) {
      case 'N':
        return 'เหนือ (North)';
      case 'E':
        return 'ตะวันออก (East)';
      case 'S':
        return 'ใต้ (South)';
      case 'W':
        return 'ตะวันตก (West)';
    }
  };

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(2.0, Math.max(0.8, Number((prev + delta).toFixed(2)))));
  };

  const resetZoom = () => setZoomLevel(1);

  // Helper rendering specific illustrated buildings
  const renderBuildingIllustration = (node: TownNode, cx: number, cy: number, isHighlighted: boolean, isSelected: boolean) => {
    switch (node.id) {
      case 'train_station':
        return (
          <g>
            {/* Victorian Train Depot with platform, tracks, and clock */}
            <rect x={cx - 36} y={cy - 20} width="72" height="42" rx="4" fill="#a0522d" stroke="#5c2c16" strokeWidth="2" />
            <polygon points={`${cx - 38},${cy - 20} ${cx},${cy - 36} ${cx + 38},${cy - 20}`} fill="#4a2511" stroke="#2d1508" strokeWidth="2" />
            {/* Clock Tower Cupola */}
            <rect x={cx - 9} y={cy - 45} width="18" height="12" fill="#d4af37" stroke="#8c7322" strokeWidth="1.5" />
            <polygon points={`${cx - 9},${cy - 45} ${cx},${cy - 54} ${cx + 9},${cy - 45}`} fill="#8c7322" />
            <circle cx={cx} cy={cy - 39} r="4" fill="#fdfbf7" stroke="#4a2511" strokeWidth="1" />
            {/* Tracks on left */}
            <line x1={cx - 34} y1={cy + 18} x2={cx - 10} y2={cy + 18} stroke="#475569" strokeWidth="2.5" />
            <line x1={cx - 34} y1={cy + 22} x2={cx - 10} y2={cy + 22} stroke="#475569" strokeWidth="2.5" />
            {/* Arched Station Doors */}
            <path d={`M ${cx - 14} ${cy + 22} L ${cx - 14} ${cy + 2} Q ${cx} ${cy - 4} ${cx + 14} ${cy + 2} L ${cx + 14} ${cy + 22} Z`} fill="#fef08a" opacity="0.9" stroke="#4a2511" strokeWidth="1.5" />
            <text x={cx} y={cy + 13} fontSize="9" fontWeight="bold" fill="#713f12" textAnchor="middle">🚆</text>
          </g>
        );

      case 'hospital':
        return (
          <g>
            {/* Historic Infirmary with Red Cross */}
            <rect x={cx - 38} y={cy - 22} width="76" height="44" rx="5" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
            <polygon points={`${cx - 40},${cy - 22} ${cx},${cy - 38} ${cx + 40},${cy - 22}`} fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
            {/* Prominent Red Cross Emblem */}
            <circle cx={cx} cy={cy - 24} r="10" fill="#ffffff" stroke="#b91c1c" strokeWidth="1.5" />
            <rect x={cx - 2} y={cy - 31} width="4" height="14" fill="#dc2626" rx="1" />
            <rect x={cx - 7} y={cy - 26} width="14" height="4" fill="#dc2626" rx="1" />
            {/* Front Arched Entrance */}
            <rect x={cx - 12} y={cy + 4} width="24" height="18" rx="3" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
            {/* Window Rows */}
            <rect x={cx - 30} y={cy - 8} width="10" height="10" rx="1" fill="#bae6fd" stroke="#475569" strokeWidth="1" />
            <rect x={cx + 20} y={cy - 8} width="10" height="10" rx="1" fill="#bae6fd" stroke="#475569" strokeWidth="1" />
            <rect x={cx - 30} y={cy + 6} width="10" height="10" rx="1" fill="#bae6fd" stroke="#475569" strokeWidth="1" />
            <rect x={cx + 20} y={cy + 6} width="10" height="10" rx="1" fill="#bae6fd" stroke="#475569" strokeWidth="1" />
          </g>
        );

      case 'school':
        return (
          <g>
            {/* Red Brick Schoolhouse with Bell Tower */}
            <rect x={cx - 38} y={cy - 22} width="76" height="44" rx="4" fill="#b91c1c" stroke="#7f1d1d" strokeWidth="2" />
            <polygon points={`${cx - 40},${cy - 22} ${cx},${cy - 36} ${cx + 40},${cy - 22}`} fill="#7f1d1d" stroke="#450a0a" strokeWidth="2" />
            {/* Bell Tower Cupola */}
            <rect x={cx - 8} y={cy - 48} width="16" height="14" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
            <polygon points={`${cx - 10},${cy - 48} ${cx},${cy - 58} ${cx + 10},${cy - 48}`} fill="#b45309" stroke="#78350f" strokeWidth="1" />
            <circle cx={cx} cy={cy - 41} r="3" fill="#f59e0b" />
            {/* Flagpole */}
            <line x1={cx} y1={cy - 58} x2={cx} y2={cy - 68} stroke="#d97706" strokeWidth="1.5" />
            <polygon points={`${cx},${cy - 68} ${cx + 8},${cy - 64} ${cx},${cy - 60}`} fill="#ef4444" />
            {/* Door & Blackboard Symbol */}
            <rect x={cx - 10} y={cy + 4} width="20" height="18" fill="#78350f" stroke="#451a03" strokeWidth="1" rx="1" />
            <text x={cx} y={cy - 4} fontSize="11" textAnchor="middle">🏫</text>
          </g>
        );

      case 'pharmacy':
        return (
          <g>
            {/* Apothecary Shop with Green Cross */}
            <rect x={cx - 36} y={cy - 20} width="72" height="42" rx="4" fill="#0d9488" stroke="#134e4a" strokeWidth="2" />
            <polygon points={`${cx - 38},${cy - 20} ${cx},${cy - 34} ${cx + 38},${cy - 20}`} fill="#115e59" stroke="#042f2e" strokeWidth="1.5" />
            <circle cx={cx} cy={cy - 23} r="9" fill="#f0fdf4" stroke="#0f766e" strokeWidth="1.5" />
            <rect x={cx - 2} y={cy - 29} width="4" height="12" fill="#0d9488" rx="1" />
            <rect x={cx - 6} y={cy - 25} width="12" height="4" fill="#0d9488" rx="1" />
            <rect x={cx - 10} y={cy + 4} width="20" height="18" rx="2" fill="#ccfbf1" stroke="#0f766e" strokeWidth="1" />
            <text x={cx} y={cy - 2} fontSize="10" textAnchor="middle">💊</text>
          </g>
        );

      case 'library':
        return (
          <g>
            {/* Classic Library with Columns and Pediment */}
            <rect x={cx - 38} y={cy - 20} width="76" height="42" rx="3" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
            <polygon points={`${cx - 40},${cy - 20} ${cx},${cy - 36} ${cx + 40},${cy - 20}`} fill="#92400e" stroke="#451a03" strokeWidth="2" />
            {/* Ionic Columns */}
            <line x1={cx - 24} y1={cy - 20} x2={cx - 24} y2={cy + 18} stroke="#78350f" strokeWidth="3" />
            <line x1={cx - 8} y1={cy - 20} x2={cx - 8} y2={cy + 18} stroke="#78350f" strokeWidth="3" />
            <line x1={cx + 8} y1={cy - 20} x2={cx + 8} y2={cy + 18} stroke="#78350f" strokeWidth="3" />
            <line x1={cx + 24} y1={cy - 20} x2={cx + 24} y2={cy + 18} stroke="#78350f" strokeWidth="3" />
            {/* Open Book Icon */}
            <text x={cx} y={cy + 2} fontSize="12" textAnchor="middle">📖</text>
          </g>
        );

      case 'bank':
        return (
          <g>
            {/* Grand Stone Bank with Vault Column */}
            <rect x={cx - 36} y={cy - 20} width="72" height="42" rx="4" fill="#64748b" stroke="#334155" strokeWidth="2" />
            <polygon points={`${cx - 38},${cy - 20} ${cx},${cy - 34} ${cx + 38},${cy - 20}`} fill="#475569" stroke="#1e293b" strokeWidth="2" />
            <rect x={cx - 12} y={cy + 4} width="24" height="18" fill="#1e293b" stroke="#0f172a" strokeWidth="1" rx="2" />
            <circle cx={cx} cy={cy + 12} r="4" fill="#fbbf24" />
            <text x={cx} y={cy - 4} fontSize="11" textAnchor="middle">🏦</text>
          </g>
        );

      case 'police_station':
        return (
          <g>
            {/* Precinct with Blue Shield & Siren */}
            <rect x={cx - 36} y={cy - 20} width="72" height="42" rx="4" fill="#1e3a8a" stroke="#172554" strokeWidth="2" />
            <polygon points={`${cx - 38},${cy - 20} ${cx},${cy - 34} ${cx + 38},${cy - 20}`} fill="#172554" stroke="#0f172a" strokeWidth="2" />
            {/* Police Star Badge */}
            <circle cx={cx} cy={cy - 22} r="8" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
            <rect x={cx - 10} y={cy + 4} width="20" height="18" fill="#bfdbfe" stroke="#1e3a8a" strokeWidth="1" rx="2" />
            <text x={cx} y={cy - 3} fontSize="11" textAnchor="middle">⭐</text>
          </g>
        );

      case 'clock_tower':
        return (
          <g>
            {/* Town Square Clock Tower (Historic Landmark) */}
            <rect x={cx - 24} y={cy - 32} width="48" height="54" rx="3" fill="#d97706" stroke="#92400e" strokeWidth="2" />
            <polygon points={`${cx - 27},${cy - 32} ${cx},${cy - 52} ${cx + 27},${cy - 32}`} fill="#b45309" stroke="#78350f" strokeWidth="2" />
            {/* Large Clock Face */}
            <circle cx={cx} cy={cy - 14} r="11" fill="#fef08a" stroke="#451a03" strokeWidth="1.5" />
            <line x1={cx} y1={cy - 14} x2={cx} y2={cy - 20} stroke="#451a03" strokeWidth="1.5" />
            <line x1={cx} y1={cy - 14} x2={cx + 6} y2={cy - 14} stroke="#451a03" strokeWidth="1.5" />
            <rect x={cx - 10} y={cy + 8} width="20" height="14" fill="#78350f" stroke="#451a03" strokeWidth="1" />
            <text x={cx} y={cy + 1} fontSize="10" textAnchor="middle">🕰️</text>
          </g>
        );

      case 'post_office':
        return (
          <g>
            {/* Post Office with Red Mailbox & Horn */}
            <rect x={cx - 36} y={cy - 20} width="72" height="42" rx="4" fill="#b91c1c" stroke="#7f1d1d" strokeWidth="2" />
            <polygon points={`${cx - 38},${cy - 20} ${cx},${cy - 34} ${cx + 38},${cy - 20}`} fill="#7f1d1d" stroke="#450a0a" strokeWidth="2" />
            <rect x={cx - 10} y={cy + 4} width="20" height="18" fill="#fef08a" stroke="#7f1d1d" strokeWidth="1" rx="1" />
            <text x={cx} y={cy - 4} fontSize="11" textAnchor="middle">📮</text>
          </g>
        );

      case 'restaurant':
        return (
          <g>
            {/* Cozy Diner with Awning */}
            <rect x={cx - 36} y={cy - 20} width="72" height="42" rx="4" fill="#ea580c" stroke="#9a3412" strokeWidth="2" />
            <polygon points={`${cx - 38},${cy - 20} ${cx},${cy - 34} ${cx + 38},${cy - 20}`} fill="#9a3412" stroke="#431407" strokeWidth="2" />
            {/* Striped Awning */}
            <path d={`M ${cx - 38} ${cy - 10} L ${cx + 38} ${cy - 10} L ${cx + 32} ${cy - 2} L ${cx - 32} ${cy - 2} Z`} fill="#fef08a" stroke="#78350f" strokeWidth="1" />
            <text x={cx} y={cy + 7} fontSize="12" textAnchor="middle">🍴</text>
          </g>
        );

      case 'bookshop':
        return (
          <g>
            {/* Antique Bookshop with Sign */}
            <rect x={cx - 36} y={cy - 20} width="72" height="42" rx="4" fill="#78350f" stroke="#451a03" strokeWidth="2" />
            <polygon points={`${cx - 38},${cy - 20} ${cx},${cy - 34} ${cx + 38},${cy - 20}`} fill="#451a03" stroke="#291102" strokeWidth="2" />
            <rect x={cx - 12} y={cy + 4} width="24" height="18" fill="#fef3c7" stroke="#78350f" strokeWidth="1" rx="1" />
            <text x={cx} y={cy - 3} fontSize="11" textAnchor="middle">📚</text>
          </g>
        );

      case 'bus_station':
        return (
          <g>
            {/* Bus Depot with Shelter */}
            <rect x={cx - 36} y={cy - 20} width="72" height="42" rx="4" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
            <polygon points={`${cx - 38},${cy - 20} ${cx},${cy - 34} ${cx + 38},${cy - 20}`} fill="#0369a1" stroke="#0c4a6e" strokeWidth="2" />
            <rect x={cx - 14} y={cy + 4} width="28" height="18" fill="#e0f2fe" stroke="#0369a1" strokeWidth="1" rx="2" />
            <text x={cx} y={cy - 3} fontSize="11" textAnchor="middle">🚌</text>
          </g>
        );

      case 'cinema':
        return (
          <g>
            {/* Vintage Cinema Marquee */}
            <rect x={cx - 36} y={cy - 20} width="72" height="42" rx="4" fill="#581c87" stroke="#3b0764" strokeWidth="2" />
            <polygon points={`${cx - 38},${cy - 20} ${cx},${cy - 34} ${cx + 38},${cy - 20}`} fill="#3b0764" stroke="#2e1065" strokeWidth="2" />
            <rect x={cx - 28} y={cy - 12} width="56" height="10" fill="#fef08a" stroke="#78350f" strokeWidth="1" rx="1" />
            <text x={cx} y={cy - 5} fontSize="8" fontWeight="bold" fill="#78350f" textAnchor="middle">CINEMA</text>
            <text x={cx} y={cy + 12} fontSize="11" textAnchor="middle">🎬</text>
          </g>
        );

      case 'central_park':
        return (
          <g>
            {/* Central Park Gazebo & Green Trees */}
            <circle cx={cx} cy={cy} r="34" fill="#15803d" opacity="0.4" stroke="#166534" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Gazebo Structure */}
            <circle cx={cx} cy={cy - 4} r="14" fill="#fef08a" stroke="#78350f" strokeWidth="1.5" />
            <polygon points={`${cx - 18},${cy - 10} ${cx},${cy - 24} ${cx + 18},${cy - 10}`} fill="#b45309" stroke="#451a03" strokeWidth="1.5" />
            <text x={cx} y={cy + 2} fontSize="11" textAnchor="middle">🌳</text>
          </g>
        );

      case 'museum':
        return (
          <g>
            {/* Ancient Museum with Columns */}
            <rect x={cx - 36} y={cy - 20} width="72" height="42" rx="4" fill="#713f12" stroke="#451a03" strokeWidth="2" />
            <polygon points={`${cx - 38},${cy - 20} ${cx},${cy - 34} ${cx + 38},${cy - 20}`} fill="#451a03" stroke="#291102" strokeWidth="2" />
            <line x1={cx - 16} y1={cy - 10} x2={cx - 16} y2={cy + 18} stroke="#fef3c7" strokeWidth="2.5" />
            <line x1={cx} y1={cy - 10} x2={cx} y2={cy + 18} stroke="#fef3c7" strokeWidth="2.5" />
            <line x1={cx + 16} y1={cy - 10} x2={cx + 16} y2={cy + 18} stroke="#fef3c7" strokeWidth="2.5" />
            <text x={cx} y={cy - 2} fontSize="11" textAnchor="middle">🏛️</text>
          </g>
        );

      case 'supermarket':
        return (
          <g>
            {/* Supermarket Store */}
            <rect x={cx - 36} y={cy - 20} width="72" height="42" rx="4" fill="#047857" stroke="#065f46" strokeWidth="2" />
            <polygon points={`${cx - 38},${cy - 20} ${cx},${cy - 34} ${cx + 38},${cy - 20}`} fill="#065f46" stroke="#022c22" strokeWidth="2" />
            <rect x={cx - 20} y={cy - 8} width="40" height="12" fill="#fef08a" stroke="#065f46" strokeWidth="1" rx="1" />
            <text x={cx} y={cy} fontSize="8" fontWeight="bold" fill="#065f46" textAnchor="middle">SUPERMARKET</text>
            <text x={cx} y={cy + 16} fontSize="10" textAnchor="middle">🛒</text>
          </g>
        );

      default:
        return (
          <g>
            <rect x={cx - 32} y={cy - 18} width="64" height="36" rx="4" fill="#d97706" stroke="#78350f" strokeWidth="2" />
            <text x={cx} y={cy + 4} fontSize="11" textAnchor="middle">🏠</text>
          </g>
        );
    }
  };

  const mapSvgContent = (
    <svg viewBox="0 0 1000 680" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Parchment Background Gradient & Texture */}
        <linearGradient id="parchmentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fdf6e2" />
          <stop offset="50%" stopColor="#f5e6cb" />
          <stop offset="100%" stopColor="#ebd3b3" />
        </linearGradient>

        <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
          <stop offset="60%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#4a2e18" stopOpacity="0.45" />
        </radialGradient>

        <linearGradient id="riverWatercolor" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.75" />
          <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0.8" />
        </linearGradient>

        <filter id="parchmentShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#3d2314" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Base Parchment Vellum */}
      <rect width="1000" height="680" fill="url(#parchmentGrad)" />
      <rect width="1000" height="680" fill="url(#vignette)" />

      {/* Decorative Antique Map Border Frames */}
      <rect x="15" y="15" width="970" height="650" fill="none" stroke="#7c5335" strokeWidth="5" rx="6" />
      <rect x="23" y="23" width="954" height="634" fill="none" stroke="#b08968" strokeWidth="1.5" strokeDasharray="6 4" rx="4" />

      {/* Compass Rose (Top Right) */}
      <g transform="translate(900, 95)" filter="url(#parchmentShadow)">
        <circle cx="0" cy="0" r="42" fill="#fdfbf7" stroke="#7c5335" strokeWidth="2.5" />
        <circle cx="0" cy="0" r="38" fill="none" stroke="#d4a373" strokeWidth="1" strokeDasharray="3 2" />
        {/* Cardinal points */}
        <polygon points="0,-36 5,-10 0,0" fill="#b91c1c" />
        <polygon points="0,-36 -5,-10 0,0" fill="#ef4444" />
        <polygon points="0,36 5,10 0,0" fill="#475569" />
        <polygon points="0,36 -5,10 0,0" fill="#64748b" />
        <polygon points="36,0 10,5 0,0" fill="#475569" />
        <polygon points="36,0 10,-5 0,0" fill="#64748b" />
        <polygon points="-36,0 -10,5 0,0" fill="#475569" />
        <polygon points="-36,0 -10,-5 0,0" fill="#64748b" />
        <circle cx="0" cy="0" r="5" fill="#7c5335" />
        <text x="0" y="-42" fontSize="10" fontWeight="bold" fill="#b91c1c" textAnchor="middle">N</text>
        <text x="0" y="46" fontSize="10" fontWeight="bold" fill="#334155" textAnchor="middle">S</text>
        <text x="44" y="3" fontSize="10" fontWeight="bold" fill="#334155" textAnchor="start">E</text>
        <text x="-46" y="3" fontSize="10" fontWeight="bold" fill="#334155" textAnchor="end">W</text>
      </g>

      {/* Town Title Cartouche (Top Left) */}
      <g transform="translate(30, 25)" filter="url(#parchmentShadow)">
        <rect x="0" y="0" width="310" height="52" rx="6" fill="#fefae0" stroke="#8b5a2b" strokeWidth="2" />
        <text x="155" y="21" fontSize="13" fontWeight="bold" fill="#78350f" textAnchor="middle" fontFamily="serif" letterSpacing="1">
          TOWN TREASURE MAP
        </text>
        <text x="155" y="39" fontSize="11" fontWeight="bold" fill="#b45309" textAnchor="middle" fontFamily="sans-serif">
          แผนที่เมืองภาษาอังกฤษ (Oakhaven)
        </text>
      </g>

      {/* Cobblestone Roads & Grids */}
      {/* 1. Maple Street (Horizontal Top) */}
      <g stroke="#d4b595" strokeWidth="48" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <line x1="80" y1="120" x2="920" y2="120" />
      </g>
      <g stroke="#b08968" strokeWidth="44" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6">
        <line x1="80" y1="120" x2="920" y2="120" strokeDasharray="12 8" />
      </g>
      <text x="500" y="108" fill="#78350f" fontSize="11" fontWeight="bold" textAnchor="middle" letterSpacing="2" fontFamily="serif">
        ~ MAPLE STREET (ถนนเมเปิล) ~
      </text>

      {/* 2. King Street (Horizontal Middle) */}
      <g stroke="#d4b595" strokeWidth="48" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <line x1="80" y1="310" x2="920" y2="310" />
      </g>
      <g stroke="#b08968" strokeWidth="44" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6">
        <line x1="80" y1="310" x2="920" y2="310" strokeDasharray="12 8" />
      </g>
      <text x="500" y="298" fill="#78350f" fontSize="11" fontWeight="bold" textAnchor="middle" letterSpacing="2" fontFamily="serif">
        ~ KING STREET (ถนนคิง) ~
      </text>

      {/* 3. River Road (Horizontal Lower) */}
      <g stroke="#d4b595" strokeWidth="44" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <line x1="80" y1="490" x2="920" y2="490" />
      </g>
      <g stroke="#b08968" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6">
        <line x1="80" y1="490" x2="920" y2="490" strokeDasharray="12 8" />
      </g>
      <text x="500" y="478" fill="#78350f" fontSize="11" fontWeight="bold" textAnchor="middle" letterSpacing="2" fontFamily="serif">
        ~ RIVER ROAD (ถนนริมแม่น้ำ) ~
      </text>

      {/* Vertical Avenues */}
      {/* A. Oak Street (Left) */}
      <g stroke="#d4b595" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <line x1="160" y1="100" x2="160" y2="510" />
      </g>
      <text x="142" y="310" fill="#78350f" fontSize="10" fontWeight="bold" textAnchor="middle" transform="rotate(-90 142 310)" letterSpacing="1" fontFamily="serif">
        OAK STREET
      </text>

      {/* B. High Street (Center) */}
      <g stroke="#d4b595" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <line x1="500" y1="100" x2="500" y2="510" />
      </g>
      <text x="482" y="310" fill="#78350f" fontSize="10" fontWeight="bold" textAnchor="middle" transform="rotate(-90 482 310)" letterSpacing="1" fontFamily="serif">
        HIGH STREET
      </text>

      {/* C. Pine Street (Right) */}
      <g stroke="#d4b595" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <line x1="840" y1="100" x2="840" y2="510" />
      </g>
      <text x="858" y="310" fill="#78350f" fontSize="10" fontWeight="bold" textAnchor="middle" transform="rotate(90 858 310)" letterSpacing="1" fontFamily="serif">
        PINE STREET
      </text>

      {/* River Thames Way (South Watercolor Channel) */}
      <path
        d="M 12 590 Q 250 560 500 595 T 988 580 L 988 668 L 12 668 Z"
        fill="url(#riverWatercolor)"
        stroke="#335c67"
        strokeWidth="2.5"
      />
      <path d="M 50 615 Q 120 610 190 618" fill="none" stroke="#e0f2fe" strokeWidth="1.5" opacity="0.7" />
      <path d="M 320 625 Q 400 620 480 628" fill="none" stroke="#e0f2fe" strokeWidth="1.5" opacity="0.7" />
      <path d="M 720 615 Q 800 610 880 620" fill="none" stroke="#e0f2fe" strokeWidth="1.5" opacity="0.7" />

      {/* River Label */}
      <text
        x="500"
        y="642"
        fill="#f8fafc"
        fontSize="13"
        fontStyle="italic"
        fontFamily="serif"
        textAnchor="middle"
        letterSpacing="3"
        className="select-none pointer-events-none drop-shadow"
      >
        ~ ~ ~ RIVER THAMES WAY (แม่น้ำสายใต้) ~ ~ ~
      </text>

      {/* Stone Arch Bridge crossing */}
      <g transform="translate(500, 582)">
        <ellipse cx="0" cy="0" rx="35" ry="12" fill="#d4b595" stroke="#78350f" strokeWidth="2" />
        <ellipse cx="0" cy="0" rx="26" ry="8" fill="#fdf6e2" />
        <text x="0" y="3" fontSize="9" fontWeight="bold" fill="#78350f" textAnchor="middle">🌉 Bridge</text>
      </g>

      {/* Town Nodes / Buildings */}
      {TOWN_NODES.map((node) => {
        const cx = (node.x / 100) * 1000;
        const cy = (node.y / 100) * 650;
        const isHighlighted = highlightNodeId === node.id;
        const isSelected = selectedNode?.id === node.id;

        return (
          <g
            key={node.id}
            onClick={() => handleNodeClick(node)}
            role="button"
            tabIndex={0}
            aria-label={`${node.name} (${node.thaiName})`}
            className="cursor-pointer group"
          >
            {/* Highlight golden marker beacon if needed */}
            {isHighlighted && (
              <circle
                cx={cx}
                cy={cy}
                r="46"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="3.5"
                strokeDasharray="6 4"
                opacity="0.9"
              />
            )}

            {/* Building Illustration */}
            <g filter="url(#parchmentShadow)">
              {renderBuildingIllustration(node, cx, cy, isHighlighted, isSelected)}
            </g>

            {/* Name Banner / Label underneath building */}
            <g transform={`translate(${cx}, ${cy + 26})`} filter="url(#parchmentShadow)">
              <rect
                x="-50"
                y="0"
                width="100"
                height="22"
                rx="4"
                fill={isSelected ? '#78350f' : isHighlighted ? '#b45309' : '#fefae0'}
                stroke={isSelected || isHighlighted ? '#fef08a' : '#8b5a2b'}
                strokeWidth={isSelected || isHighlighted ? '2' : '1.5'}
              />
              <text
                x="0"
                y="9"
                fontSize="9"
                fontWeight="bold"
                fill={isSelected || isHighlighted ? '#fef08a' : '#451a03'}
                textAnchor="middle"
                className="font-sans pointer-events-none"
              >
                {node.name}
              </text>
              <text
                x="0"
                y="19"
                fontSize="8"
                fill={isSelected || isHighlighted ? '#fef3c7' : '#78350f'}
                textAnchor="middle"
                className="font-sans pointer-events-none"
              >
                {node.thaiName}
              </text>
            </g>
          </g>
        );
      })}

      {/* Antique Brass Detective Token (YOU ARE HERE) */}
      {activeNode && (
        <g
          transform={`translate(${(activeNode.x / 100) * 1000}, ${(activeNode.y / 100) * 650 - 42})`}
          filter="url(#parchmentShadow)"
        >
          {/* Brass Magnifying Glass Frame */}
          <circle cx="0" cy="0" r="16" fill="rgba(254, 249, 195, 0.75)" stroke="#b45309" strokeWidth="3" />
          <circle cx="0" cy="0" r="14" fill="none" stroke="#fef08a" strokeWidth="1" />
          {/* Handle */}
          <line x1="11" y1="11" x2="22" y2="22" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
          <line x1="11" y1="11" x2="22" y2="22" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
          {/* Detective Icon inside Lens */}
          <text x="0" y="5" fontSize="13" textAnchor="middle">🕵️</text>
          {/* Antique Ribbon Label */}
          <rect
            x="-42"
            y="-22"
            width="84"
            height="16"
            rx="3"
            fill="#451a03"
            stroke="#f59e0b"
            strokeWidth="1.2"
          />
          <text
            x="0"
            y="-10"
            fontSize="8"
            fontWeight="bold"
            fontFamily="sans-serif"
            fill="#fef08a"
            textAnchor="middle"
            className="font-sans"
          >
            นักสืบ (YOU)
          </text>
        </g>
      )}
    </svg>
  );

  // Inspector Card Renderer (Shared between normal and modal views)
  const renderInspectorCard = () => {
    if (!selectedNode) return null;
    return (
      <div className="absolute bottom-2 left-2 right-2 sm:left-3 sm:right-auto sm:w-80 bg-[#fdfbf7] border-2 border-[#8b5a2b] rounded-xl p-3 shadow-2xl text-stone-900 text-xs font-sans z-30">
        <div className="flex items-start justify-between gap-2 mb-1.5 border-b border-[#d4be92] pb-1.5">
          <div>
            <h4 className="font-bold text-[#78350f] text-sm flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#b45309]" />
              {selectedNode.name}
            </h4>
            <p className="text-[#92400e] text-xs font-medium font-sans">
              {selectedNode.thaiName}
              {selectedNode.phonetic && (
                <span className="ml-1 text-stone-500 font-mono text-[10px]">
                  {selectedNode.phonetic}
                </span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => speakText(selectedNode.name)}
              aria-label={`Listen to ${selectedNode.name}`}
              className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
                isPlayingAudio
                  ? 'bg-amber-500 text-white border-amber-600'
                  : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300'
              }`}
              title="ฟังเสียงอ่านคำศัพท์ (Listen)"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold">ฟัง</span>
            </button>

            <button
              onClick={() => setSelectedNode(null)}
              aria-label="ปิด (Close)"
              className="text-stone-400 hover:text-stone-700 p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {selectedNode.street && (
          <p className="text-[11px] font-semibold text-[#854d0e] mb-1 flex items-center gap-1">
            <Navigation className="w-3 h-3 text-[#ca8a04]" />
            ถนน: {selectedNode.street}
          </p>
        )}

        {selectedNode.spatialRelations && (
          <div className="p-1.5 rounded-md bg-[#fefce8] border border-[#fef08a] text-[#713f12] text-[11px] mb-1.5 leading-snug">
            <span className="font-bold">พิกัดทิศทาง: </span>
            {selectedNode.spatialRelations}
          </div>
        )}

        <p className="text-stone-700 text-xs leading-relaxed mb-1.5">
          {selectedNode.description}
        </p>

        {selectedNode.clue && (
          <div className="p-1.5 rounded-lg bg-amber-100 border border-amber-300 text-amber-950 text-xs">
            <span className="font-semibold text-amber-800">เบาะแสในเมือง: </span>
            {selectedNode.clue}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative w-full rounded-2xl bg-[#1c1612] border-2 border-[#8b5a2b]/70 p-2 sm:p-3 shadow-2xl overflow-hidden font-sans">
      {/* Antique Header Banner */}
      <div className="flex items-center justify-between mb-2 px-1 text-xs">
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-amber-400" />
          <span className="font-bold text-amber-200 tracking-wide font-mystery">
            แผนที่เมืองภาษาอังกฤษ (Town Treasure Map)
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-950/80 border border-amber-500/40 text-[11px] text-amber-300 font-sans">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">ทิศ:</span>
            <span>{getThaiHeading(playerHeading)}</span>
          </div>

          <button
            onClick={() => handleZoom(0.2)}
            disabled={zoomLevel >= 2.0}
            className="p-1 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors disabled:opacity-40"
            title="ซูมเข้า (Zoom In)"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => handleZoom(-0.2)}
            disabled={zoomLevel <= 0.8}
            className="p-1 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors disabled:opacity-40"
            title="ซูมออก (Zoom Out)"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          {zoomLevel !== 1 && (
            <button
              onClick={resetZoom}
              className="p-1 rounded-md bg-amber-900/60 hover:bg-amber-800 text-amber-300 transition-colors"
              title="รีเซ็ตมุมมอง (Reset Zoom)"
              aria-label="Reset zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={() => setIsModalOpen(true)}
            className="p-1 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors"
            title="ขยายแผนที่เต็มจอ (Enlarge Map)"
            aria-label="Enlarge Map"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setShowAccessibleText(!showAccessibleText)}
            className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-300 text-[11px] transition-colors"
            title="ดูผังเมืองแบบข้อความ (Accessible Text Grid)"
          >
            <Info className="w-3 h-3 text-stone-400" />
            <span className="hidden md:inline">ผังข้อความ</span>
          </button>
        </div>
      </div>

      {/* Accessible Text Mode Drawer */}
      {showAccessibleText && (
        <div className="mb-3 p-3 rounded-xl bg-amber-950/90 border border-amber-600/40 text-xs text-amber-100 leading-relaxed max-h-48 overflow-y-auto">
          <div className="flex justify-between items-center mb-1 font-bold text-amber-300">
            <span>ตารางผังเมือง (Accessible Town Map Grid)</span>
            <button onClick={() => setShowAccessibleText(false)} className="text-amber-300 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <pre className="whitespace-pre-wrap font-sans text-[11px] text-amber-200">{MAP_TEXT_DESCRIPTION}</pre>
        </div>
      )}

      {/* Main Viewport Container */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-[#ebdcc3] rounded-xl border border-[#92623a] overflow-hidden select-none shadow-inner">
        <div
          className="w-full h-full transition-transform duration-300 ease-out origin-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {mapSvgContent}
        </div>

        {/* Inspector Card in Normal View */}
        {renderInspectorCard()}
      </div>

      {/* Fullscreen Map Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 font-sans"
        >
          <div className="relative w-full max-w-5xl bg-[#1c1612] border-2 border-amber-600/80 rounded-2xl shadow-2xl p-3 sm:p-4 flex flex-col max-h-[92vh]">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-amber-900/60">
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-amber-200 text-base sm:text-lg font-mystery">
                  THE MISSING MAP: แผนที่เมืองโบราณฉบับเต็ม (Full View)
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-950 border border-amber-500/40 text-xs text-amber-300">
                  <Compass className="w-4 h-4 text-amber-400" />
                  <span>{getThaiHeading(playerHeading)}</span>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="relative flex-1 min-h-0 bg-[#ebdcc3] rounded-xl border border-[#92623a] overflow-auto">
              <div className="w-full h-full min-h-[500px]">
                {mapSvgContent}
              </div>
              {/* Inspector Card in Fullscreen Modal View */}
              {renderInspectorCard()}
            </div>

            <div className="pt-2 mt-2 flex items-center justify-between text-xs text-amber-400/90 font-sans border-t border-amber-900/40">
              <span>💡 คลิกที่อาคารในแผนที่เพื่ออ่านชื่อภาษาอังกฤษและฟังเสียงคำอ่านได้ทุกหลัง</span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
              >
                ปิดหน้าต่าง (Close)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
