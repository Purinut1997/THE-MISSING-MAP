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
  Maximize2,
  Sparkles,
  Footprints
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
    const isFocus = isHighlighted || isSelected;

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
            {/* Timber-framed Apothecary with Green Cross */}
            <rect x={cx - 34} y={cy - 20} width="68" height="40" rx="4" fill="#fef3c7" stroke="#78350f" strokeWidth="2" />
            <polygon points={`${cx - 36},${cy - 20} ${cx},${cy - 34} ${cx + 36},${cy - 20}`} fill="#047857" stroke="#064e3b" strokeWidth="2" />
            {/* Green Apothecary Cross */}
            <circle cx={cx} cy={cy - 20} r="9" fill="#ffffff" stroke="#059669" strokeWidth="1.5" />
            <rect x={cx - 2} y={cy - 26} width="4" height="12" fill="#10b981" rx="1" />
            <rect x={cx - 6} y={cy - 22} width="12" height="4" fill="#10b981" rx="1" />
            {/* Apothecary Display Windows with medicine bottles */}
            <rect x={cx - 26} y={cy - 2} width="14" height="16" fill="#a7f3d0" stroke="#047857" strokeWidth="1" rx="2" />
            <rect x={cx + 12} y={cy - 2} width="14" height="16" fill="#a7f3d0" stroke="#047857" strokeWidth="1" rx="2" />
            <rect x={cx - 6} y={cy + 4} width="12" height="16" fill="#92400e" rx="1" />
            <text x={cx} y={cy + 13} fontSize="9" textAnchor="middle">💊</text>
          </g>
        );

      case 'library':
        return (
          <g>
            {/* Classic Library with arched columns and open book */}
            <rect x={cx - 36} y={cy - 20} width="72" height="42" rx="4" fill="#f8fafc" stroke="#475569" strokeWidth="2" />
            <polygon points={`${cx - 38},${cy - 20} ${cx},${cy - 36} ${cx + 38},${cy - 20}`} fill="#1e3a8a" stroke="#172554" strokeWidth="2" />
            {/* Stone Columns */}
            <line x1={cx - 26} y1={cy - 18} x2={cx - 26} y2={cy + 20} stroke="#94a3b8" strokeWidth="4" />
            <line x1={cx - 10} y1={cy - 18} x2={cx - 10} y2={cy + 20} stroke="#94a3b8" strokeWidth="4" />
            <line x1={cx + 10} y1={cy - 18} x2={cx + 10} y2={cy + 20} stroke="#94a3b8" strokeWidth="4" />
            <line x1={cx + 26} y1={cy - 18} x2={cx + 26} y2={cy + 20} stroke="#94a3b8" strokeWidth="4" />
            {/* Open Book Emblem on Pediment */}
            <polygon points={`${cx - 12},${cy - 22} ${cx},${cy - 26} ${cx + 12},${cy - 22} ${cx},${cy - 18}`} fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
            <text x={cx} y={cy + 10} fontSize="12" textAnchor="middle">📖</text>
          </g>
        );

      case 'police_station':
        return (
          <g>
            {/* Victorian Police Precinct with blue lamp and badge */}
            <rect x={cx - 36} y={cy - 22} width="72" height="44" rx="4" fill="#334155" stroke="#0f172a" strokeWidth="2" />
            <polygon points={`${cx - 38},${cy - 22} ${cx},${cy - 36} ${cx + 38},${cy - 22}`} fill="#1e293b" stroke="#020617" strokeWidth="2" />
            {/* Blue Police Lamp on Rooftop */}
            <circle cx={cx} cy={cy - 38} r="6" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" className="animate-pulse" />
            {/* Police Shield / Star */}
            <polygon points={`${cx},${cy - 20} ${cx + 8},${cy - 14} ${cx + 5},${cy - 4} ${cx},${cy} ${cx - 5},${cy - 4} ${cx - 8},${cy - 14}`} fill="#f59e0b" stroke="#b45309" strokeWidth="1" />
            {/* Iron Double Doors */}
            <rect x={cx - 10} y={cy + 6} width="20" height="16" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
            <text x={cx} y={cy - 8} fontSize="10" textAnchor="middle">⭐</text>
          </g>
        );

      case 'clock_tower':
        return (
          <g>
            {/* Central Masterpiece: Grand Victorian Clock Tower with Plaza */}
            {/* Cobblestone Plaza Base */}
            <circle cx={cx} cy={cy} r="46" fill="#eedcb5" stroke="#92400e" strokeWidth="2" strokeDasharray="3 3" />
            {/* Main Spire Tower */}
            <rect x={cx - 18} y={cy - 30} width="36" height="54" fill="#78350f" stroke="#451a03" strokeWidth="2" rx="3" />
            {/* Belfry & Clock Housing */}
            <rect x={cx - 22} y={cy - 52} width="44" height="24" fill="#b45309" stroke="#78350f" strokeWidth="2" rx="2" />
            {/* Pointed Roof Spire */}
            <polygon points={`${cx - 24},${cy - 52} ${cx},${cy - 80} ${cx + 24},${cy - 52}`} fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
            {/* Golden Weather Vane */}
            <line x1={cx} y1={cy - 80} x2={cx} y2={cy - 92} stroke="#f59e0b" strokeWidth="2" />
            <polygon points={`${cx},${cy - 92} ${cx + 7},${cy - 89} ${cx},${cy - 86}`} fill="#f59e0b" />
            {/* Glowing Clock Face with Hands */}
            <circle cx={cx} cy={cy - 40} r="10" fill="#fef9c3" stroke="#78350f" strokeWidth="2" />
            <line x1={cx} y1={cy - 40} x2={cx} y2={cy - 46} stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
            <line x1={cx} y1={cy - 40} x2={cx + 5} y2={cy - 40} stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
            {/* Archway Door */}
            <path d={`M ${cx - 8} ${cy + 24} L ${cx - 8} ${cy + 12} Q ${cx} ${cy + 6} ${cx + 8} ${cy + 12} L ${cx + 8} ${cy + 24} Z`} fill="#451a03" />
            {/* Streetlamps flanking plaza */}
            <circle cx={cx - 36} cy={cy + 10} r="3" fill="#fde047" stroke="#78350f" strokeWidth="1" />
            <line x1={cx - 36} y1={cy + 10} x2={cx - 36} y2={cy + 24} stroke="#78350f" strokeWidth="1.5" />
            <circle cx={cx + 36} cy={cy + 10} r="3" fill="#fde047" stroke="#78350f" strokeWidth="1" />
            <line x1={cx + 36} y1={cy + 10} x2={cx + 36} y2={cy + 24} stroke="#78350f" strokeWidth="1.5" />
          </g>
        );

      case 'bank':
        return (
          <g>
            {/* Neoclassical Bank with gold dollar/coin medallion */}
            <rect x={cx - 36} y={cy - 20} width="72" height="42" rx="4" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" />
            <polygon points={`${cx - 38},${cy - 20} ${cx},${cy - 36} ${cx + 38},${cy - 20}`} fill="#475569" stroke="#334155" strokeWidth="2" />
            {/* Marble Columns */}
            <line x1={cx - 24} y1={cy - 18} x2={cx - 24} y2={cy + 20} stroke="#cbd5e1" strokeWidth="5" />
            <line x1={cx - 8} y1={cy - 18} x2={cx - 8} y2={cy + 20} stroke="#cbd5e1" strokeWidth="5" />
            <line x1={cx + 8} y1={cy - 18} x2={cx + 8} y2={cy + 20} stroke="#cbd5e1" strokeWidth="5" />
            <line x1={cx + 24} y1={cy - 18} x2={cx + 24} y2={cy + 20} stroke="#cbd5e1" strokeWidth="5" />
            {/* Gold Medallion in Pediment */}
            <circle cx={cx} cy={cy - 25} r="6" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
            <text x={cx} y={cy - 22} fontSize="8" fontWeight="bold" fill="#78350f" textAnchor="middle">$</text>
            <text x={cx} y={cy + 10} fontSize="11" textAnchor="middle">🏦</text>
          </g>
        );

      case 'post_office':
        return (
          <g>
            {/* English Brick Post Office with Victorian Red Pillar Box */}
            <rect x={cx - 34} y={cy - 20} width="68" height="40" rx="4" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
            <polygon points={`${cx - 36},${cy - 20} ${cx},${cy - 32} ${cx + 36},${cy - 20}`} fill="#7f1d1d" stroke="#450a0a" strokeWidth="2" />
            {/* Post Horn / Envelope Emblem */}
            <rect x={cx - 10} y={cy - 16} width="20" height="12" rx="2" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
            <line x1={cx - 10} y1={cy - 16} x2={cx} y2={cy - 9} stroke="#ca8a04" strokeWidth="1" />
            <line x1={cx + 10} y1={cy - 16} x2={cx} y2={cy - 9} stroke="#ca8a04" strokeWidth="1" />
            {/* Red Pillar Mailbox outside */}
            <rect x={cx + 22} y={cy + 4} width="8" height="16" rx="4" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
            <line x1={cx + 23} y1={cy + 8} x2={cx + 29} y2={cy + 8} stroke="#ffffff" strokeWidth="1.2" />
            <text x={cx - 5} y={cy + 12} fontSize="11" textAnchor="middle">✉️</text>
          </g>
        );

      case 'restaurant':
        return (
          <g>
            {/* Cozy Tavern / Cafe with Striped Awning */}
            <rect x={cx - 36} y={cy - 20} width="72" height="42" rx="4" fill="#fef3c7" stroke="#92400e" strokeWidth="2" />
            <polygon points={`${cx - 38},${cy - 20} ${cx},${cy - 34} ${cx + 38},${cy - 20}`} fill="#78350f" stroke="#451a03" strokeWidth="2" />
            {/* Striped Awning (Red & Cream) */}
            <rect x={cx - 30} y={cy - 6} width="60" height="12" fill="#ef4444" rx="2" stroke="#b91c1c" strokeWidth="1" />
            <line x1={cx - 20} y1={cy - 6} x2={cx - 20} y2={cy + 6} stroke="#ffffff" strokeWidth="4" />
            <line x1={cx} y1={cy - 6} x2={cx} y2={cy + 6} stroke="#ffffff" strokeWidth="4" />
            <line x1={cx + 20} y1={cy - 6} x2={cx + 20} y2={cy + 6} stroke="#ffffff" strokeWidth="4" />
            {/* Chimney with Smoke */}
            <rect x={cx + 20} y={cy - 40} width="8" height="14" fill="#991b1b" stroke="#7f1d1d" strokeWidth="1" />
            <circle cx={cx + 24} cy={cy - 44} r="3" fill="#cbd5e1" opacity="0.6" />
            <circle cx={cx + 26} cy={cy - 50} r="4" fill="#cbd5e1" opacity="0.4" />
            {/* Fork & Spoon Sign */}
            <text x={cx} y={cy + 16} fontSize="10" textAnchor="middle">🍽️</text>
          </g>
        );

      case 'bookshop':
        return (
          <g>
            {/* Dark Green Timber Bookshop with Hanging Book Sign */}
            <rect x={cx - 34} y={cy - 20} width="68" height="40" rx="4" fill="#064e3b" stroke="#022c22" strokeWidth="2" />
            <polygon points={`${cx - 36},${cy - 20} ${cx},${cy - 34} ${cx + 36},${cy - 20}`} fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
            {/* Hanging Shop Sign */}
            <line x1={cx - 24} y1={cy - 12} x2={cx - 16} y2={cy - 12} stroke="#d97706" strokeWidth="2" />
            <rect x={cx - 26} y={cy - 10} width="16" height="12" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" rx="1" />
            <text x={cx - 18} y={cy - 2} fontSize="8" textAnchor="middle">📚</text>
            {/* Warm Shop Windows filled with Books */}
            <rect x={cx} y={cy} width="24" height="16" fill="#fef08a" stroke="#78350f" strokeWidth="1.5" rx="2" />
            <line x1={cx + 6} y1={cy + 4} x2={cx + 6} y2={cy + 14} stroke="#b91c1c" strokeWidth="3" />
            <line x1={cx + 12} y1={cy + 4} x2={cx + 12} y2={cy + 14} stroke="#1d4ed8" strokeWidth="3" />
            <line x1={cx + 18} y1={cy + 4} x2={cx + 18} y2={cy + 14} stroke="#047857" strokeWidth="3" />
            <text x={cx - 18} y={cy + 14} fontSize="9" textAnchor="middle">📖</text>
          </g>
        );

      case 'bus_station':
        return (
          <g>
            {/* Covered Transit Depot with Route Signpost and Bus */}
            <rect x={cx - 36} y={cy - 16} width="72" height="38" rx="4" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
            <polygon points={`${cx - 38},${cy - 16} ${cx},${cy - 28} ${cx + 38},${cy - 16}`} fill="#1e40af" stroke="#1e3a8a" strokeWidth="2" />
            {/* Bus Shelter & Bench */}
            <rect x={cx - 24} y={cy - 4} width="48" height="18" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1" rx="2" />
            <line x1={cx - 20} y1={cy + 8} x2={cx + 20} y2={cy + 8} stroke="#1e40af" strokeWidth="2" />
            {/* Bus Stop Pole */}
            <line x1={cx + 26} y1={cy - 2} x2={cx + 26} y2={cy + 22} stroke="#475569" strokeWidth="2" />
            <circle cx={cx + 26} cy={cy - 4} r="5" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.5" />
            <text x={cx} y={cy + 10} fontSize="11" textAnchor="middle">🚌</text>
          </g>
        );

      case 'cinema':
        return (
          <g>
            {/* Vintage Cinema with Glowing Bulb Marquee */}
            <rect x={cx - 36} y={cy - 22} width="72" height="44" rx="4" fill="#581c87" stroke="#3b0764" strokeWidth="2" />
            <polygon points={`${cx - 38},${cy - 22} ${cx},${cy - 34} ${cx + 38},${cy - 22}`} fill="#3b0764" stroke="#2e1065" strokeWidth="2" />
            {/* Glowing Bulb Marquee Banner */}
            <rect x={cx - 30} y={cy - 14} width="60" height="14" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" rx="2" />
            <text x={cx} y={cy - 3} fontSize="8" fontWeight="bold" fill="#713f12" textAnchor="middle" letterSpacing="1">
              CINEMA
            </text>
            {/* Marquee Bulbs */}
            <circle cx={cx - 26} cy={cy - 7} r="1.5" fill="#ffffff" />
            <circle cx={cx - 16} cy={cy - 7} r="1.5" fill="#ffffff" />
            <circle cx={cx + 16} cy={cy - 7} r="1.5" fill="#ffffff" />
            <circle cx={cx + 26} cy={cy - 7} r="1.5" fill="#ffffff" />
            {/* Ticket Booth & Film Reel */}
            <rect x={cx - 10} y={cy + 4} width="20" height="16" fill="#7e22ce" stroke="#fae8ff" strokeWidth="1" />
            <text x={cx} y={cy + 16} fontSize="10" textAnchor="middle">🎬</text>
          </g>
        );

      case 'park':
        return (
          <g>
            {/* Picturesque Central Park with Stone Fountain, Trees, and Pond */}
            <rect x={cx - 40} y={cy - 24} width="80" height="48" rx="8" fill="#15803d" stroke="#166534" strokeWidth="2" />
            {/* Stone Fountain in Center with Water Ripple */}
            <circle cx={cx} cy={cy - 2} r="14" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
            <circle cx={cx} cy={cy - 2} r="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
            <line x1={cx} y1={cy - 2} x2={cx} y2={cy - 12} stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            {/* Shady Oak Trees on corners */}
            <circle cx={cx - 26} cy={cy - 12} r="9" fill="#16a34a" stroke="#14532d" strokeWidth="1.5" />
            <circle cx={cx + 26} cy={cy - 12} r="9" fill="#16a34a" stroke="#14532d" strokeWidth="1.5" />
            <circle cx={cx - 26} cy={cy + 12} r="8" fill="#16a34a" stroke="#14532d" strokeWidth="1.5" />
            <circle cx={cx + 26} cy={cy + 12} r="8" fill="#16a34a" stroke="#14532d" strokeWidth="1.5" />
            {/* Park Bench */}
            <rect x={cx - 12} y={cy + 14} width="24" height="4" fill="#78350f" rx="1" />
          </g>
        );

      case 'museum':
        return (
          <g>
            {/* Classical Museum with Ionic Pillars and Urns */}
            <rect x={cx - 36} y={cy - 20} width="72" height="42" rx="4" fill="#f8fafc" stroke="#475569" strokeWidth="2" />
            <polygon points={`${cx - 38},${cy - 20} ${cx},${cy - 36} ${cx + 38},${cy - 20}`} fill="#334155" stroke="#1e293b" strokeWidth="2" />
            {/* Classical Greek Pillars */}
            <line x1={cx - 24} y1={cy - 18} x2={cx - 24} y2={cy + 20} stroke="#94a3b8" strokeWidth="4" />
            <line x1={cx - 8} y1={cy - 18} x2={cx - 8} y2={cy + 20} stroke="#94a3b8" strokeWidth="4" />
            <line x1={cx + 8} y1={cy - 18} x2={cx + 8} y2={cy + 20} stroke="#94a3b8" strokeWidth="4" />
            <line x1={cx + 24} y1={cy - 18} x2={cx + 24} y2={cy + 20} stroke="#94a3b8" strokeWidth="4" />
            <circle cx={cx} cy={cy - 25} r="5" fill="#f59e0b" stroke="#b45309" strokeWidth="1" />
            <text x={cx} y={cy + 11} fontSize="11" textAnchor="middle">🏛️</text>
          </g>
        );

      case 'supermarket':
        return (
          <g>
            {/* Market Hall with Produce Crates and Canvas Awning */}
            <rect x={cx - 36} y={cy - 20} width="72" height="42" rx="4" fill="#ea580c" stroke="#c2410c" strokeWidth="2" />
            <polygon points={`${cx - 38},${cy - 20} ${cx},${cy - 34} ${cx + 38},${cy - 20}`} fill="#9a3412" stroke="#7c2d12" strokeWidth="2" />
            {/* Yellow / White Market Awning */}
            <rect x={cx - 30} y={cy - 6} width="60" height="12" fill="#fbbf24" stroke="#d97706" strokeWidth="1" rx="2" />
            <line x1={cx - 18} y1={cy - 6} x2={cx - 18} y2={cy + 6} stroke="#ffffff" strokeWidth="4" />
            <line x1={cx - 2} y1={cy - 6} x2={cx - 2} y2={cy + 6} stroke="#ffffff" strokeWidth="4" />
            <line x1={cx + 14} y1={cy - 6} x2={cx + 14} y2={cy + 6} stroke="#ffffff" strokeWidth="4" />
            {/* Crates & Cart */}
            <text x={cx} y={cy + 16} fontSize="11" textAnchor="middle">🛒</text>
          </g>
        );

      default:
        return (
          <g>
            <rect x={cx - 34} y={cy - 20} width="68" height="40" rx="4" fill="#334155" stroke="#1e293b" strokeWidth="2" />
            <polygon points={`${cx - 36},${cy - 20} ${cx},${cy - 32} ${cx + 36},${cy - 20}`} fill="#1e293b" />
          </g>
        );
    }
  };

  const mapSvgContent = (
    <svg
      viewBox="0 0 1000 680"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
      aria-label="Hand-drawn Vintage Detective Map of English Town"
    >
      <defs>
        {/* Parchment Base Gradient */}
        <linearGradient id="parchmentBase" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fdfbf5" />
          <stop offset="50%" stopColor="#f5ebda" />
          <stop offset="100%" stopColor="#ecdcc3" />
        </linearGradient>

        {/* Vintage Edge Vignette Gradient */}
        <radialGradient id="parchmentVignette" cx="50%" cy="50%" r="50%">
          <stop offset="70%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#5c3818" stopOpacity="0.22" />
        </radialGradient>

        {/* River Watercolor Wash */}
        <linearGradient id="riverWatercolor" x1="0%" y1="0%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#75a3a1" />
          <stop offset="50%" stopColor="#5b8e90" />
          <stop offset="100%" stopColor="#48787c" />
        </linearGradient>

        {/* Cobblestone Street Fill */}
        <pattern id="cobblestones" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#ded0ba" />
          <circle cx="5" cy="5" r="3" fill="#d0be9f" opacity="0.5" />
          <circle cx="15" cy="15" r="3.5" fill="#c4b08f" opacity="0.6" />
          <path d="M 0 10 L 20 10 M 10 0 L 10 20" stroke="#bba480" strokeWidth="0.8" opacity="0.4" />
        </pattern>

        {/* Grass Terrain Pattern */}
        <pattern id="grassTerrain" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="#e8dac1" opacity="0.4" />
          <circle cx="12" cy="12" r="1.5" fill="#84a98c" opacity="0.3" />
          <circle cx="28" cy="24" r="1.8" fill="#52796f" opacity="0.25" />
        </pattern>

        {/* Soft Drop Shadow for Buildings */}
        <filter id="parchmentShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="2" dy="5" stdDeviation="4" floodColor="#4a2e16" floodOpacity="0.35" />
        </filter>

        {/* Golden Clue Beacon Glow */}
        <filter id="goldenAura" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#f59e0b" floodOpacity="0.9" />
        </filter>

        {/* Wax Seal Stamp Filter */}
        <radialGradient id="waxSealGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="60%" stopColor="#991b1b" />
          <stop offset="100%" stopColor="#450a0a" />
        </radialGradient>
      </defs>

      {/* 1. Base Parchment Canvas */}
      <rect width="1000" height="680" fill="url(#parchmentBase)" />
      <rect width="1000" height="680" fill="url(#grassTerrain)" />
      <rect width="1000" height="680" fill="url(#parchmentVignette)" />

      {/* 2. Antique Cartographic Borders & Flourishes */}
      <rect x="12" y="12" width="976" height="656" rx="8" fill="none" stroke="#78350f" strokeWidth="3" />
      <rect x="18" y="18" width="964" height="644" rx="6" fill="none" stroke="#b45309" strokeWidth="1.2" strokeDasharray="6 3" />

      {/* Corner Filigree Brackets */}
      {/* Top Left */}
      <path d="M 22 45 L 45 45 L 45 22" fill="none" stroke="#78350f" strokeWidth="2" />
      <circle cx="34" cy="34" r="3" fill="#b45309" />
      {/* Top Right */}
      <path d="M 978 45 L 955 45 L 955 22" fill="none" stroke="#78350f" strokeWidth="2" />
      <circle cx="966" cy="34" r="3" fill="#b45309" />
      {/* Bottom Left */}
      <path d="M 22 635 L 45 635 L 45 658" fill="none" stroke="#78350f" strokeWidth="2" />
      <circle cx="34" cy="646" r="3" fill="#b45309" />
      {/* Bottom Right */}
      <path d="M 978 635 L 955 635 L 955 658" fill="none" stroke="#78350f" strokeWidth="2" />
      <circle cx="966" cy="646" r="3" fill="#b45309" />

      {/* 3. Rolling Hills & Pine Woodlands in Outskirts */}
      {/* Northwest Woods */}
      <g opacity="0.6">
        <path d="M 40 80 Q 90 40 140 85" fill="none" stroke="#8c6239" strokeWidth="1.5" />
        <path d="M 60 75 Q 85 50 110 75" fill="none" stroke="#8c6239" strokeWidth="1.2" />
        {/* Pine trees */}
        <polygon points="50,70 54,60 58,70" fill="#2d6a4f" />
        <polygon points="70,68 75,56 80,68" fill="#2d6a4f" />
        <polygon points="90,72 95,62 100,72" fill="#2d6a4f" />
      </g>
      {/* Northeast Hills */}
      <g opacity="0.6">
        <path d="M 860 85 Q 910 45 960 80" fill="none" stroke="#8c6239" strokeWidth="1.5" />
        <polygon points="880,72 885,60 890,72" fill="#2d6a4f" />
        <polygon points="905,68 910,55 915,68" fill="#2d6a4f" />
      </g>

      {/* 4. River Thames Way (South Watercolor Channel) */}
      <path
        d="M 12 590 Q 250 560 500 595 T 988 580 L 988 668 L 12 668 Z"
        fill="url(#riverWatercolor)"
        stroke="#335c67"
        strokeWidth="2.5"
      />
      {/* Gentle Water Ripple Lines */}
      <path d="M 50 615 Q 120 610 190 618" fill="none" stroke="#e0f2fe" strokeWidth="1.5" opacity="0.7" />
      <path d="M 320 625 Q 400 620 480 628" fill="none" stroke="#e0f2fe" strokeWidth="1.5" opacity="0.7" />
      <path d="M 720 615 Q 800 610 880 620" fill="none" stroke="#e0f2fe" strokeWidth="1.5" opacity="0.7" />

      {/* Vintage Sailboat on the River */}
      <g transform="translate(860, 622)">
        <path d="M -16 6 L 16 6 L 10 14 L -10 14 Z" fill="#78350f" stroke="#451a03" strokeWidth="1" />
        <line x1="0" y1="6" x2="0" y2="-16" stroke="#451a03" strokeWidth="1.5" />
        <polygon points="0,-15 12,2 0,2" fill="#fdfbf7" stroke="#92400e" strokeWidth="1" />
        <polygon points="-1,-12 -8,2 -1,2" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
      </g>

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
        opacity="0.9"
        className="select-none pointer-events-none drop-shadow"
      >
        ~ ~ ~ RIVER THAMES WAY (แม่น้ำสายใต้) ~ ~ ~
      </text>

      {/* Stone Arch Bridge crossing to Central Park / River Road */}
      <g transform="translate(500, 582)">
        <rect x="-26" y="-8" width="52" height="22" rx="3" fill="#bfa588" stroke="#6e4726" strokeWidth="2" />
        <line x1="-22" y1="-5" x2="22" y2="-5" stroke="#78350f" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="-22" y1="10" x2="22" y2="10" stroke="#78350f" strokeWidth="1" strokeDasharray="3 3" />
      </g>

      {/* 5. Main East-West Street Avenues */}
      {/* 1. Maple Street (Northern East-West) */}
      <line x1="60" y1="100" x2="940" y2="100" stroke="#6e4726" strokeWidth="34" strokeLinecap="round" />
      <line x1="60" y1="100" x2="940" y2="100" stroke="url(#cobblestones)" strokeWidth="30" strokeLinecap="round" />
      <line x1="60" y1="100" x2="940" y2="100" stroke="#92623a" strokeWidth="2" strokeDasharray="8 8" opacity="0.6" />

      {/* 2. King Street (Central East-West) */}
      <line x1="60" y1="325" x2="940" y2="325" stroke="#6e4726" strokeWidth="40" strokeLinecap="round" />
      <line x1="60" y1="325" x2="940" y2="325" stroke="url(#cobblestones)" strokeWidth="36" strokeLinecap="round" />
      <line x1="60" y1="325" x2="940" y2="325" stroke="#92623a" strokeWidth="2" strokeDasharray="10 8" opacity="0.7" />

      {/* 3. River Road (Southern East-West) */}
      <line x1="60" y1="560" x2="940" y2="560" stroke="#6e4726" strokeWidth="34" strokeLinecap="round" />
      <line x1="60" y1="560" x2="940" y2="560" stroke="url(#cobblestones)" strokeWidth="30" strokeLinecap="round" />
      <line x1="60" y1="560" x2="940" y2="560" stroke="#92623a" strokeWidth="2" strokeDasharray="8 8" opacity="0.6" />

      {/* 6. Main North-South Street Avenues */}
      {/* High Street (Western North-South) */}
      <line x1="180" y1="80" x2="180" y2="580" stroke="#6e4726" strokeWidth="32" strokeLinecap="round" />
      <line x1="180" y1="80" x2="180" y2="580" stroke="url(#cobblestones)" strokeWidth="28" strokeLinecap="round" />
      <line x1="180" y1="80" x2="180" y2="580" stroke="#92623a" strokeWidth="2" strokeDasharray="8 8" opacity="0.6" />

      {/* Park Avenue (Central North-South) */}
      <line x1="500" y1="80" x2="500" y2="580" stroke="#6e4726" strokeWidth="34" strokeLinecap="round" />
      <line x1="500" y1="80" x2="500" y2="580" stroke="url(#cobblestones)" strokeWidth="30" strokeLinecap="round" />
      <line x1="500" y1="80" x2="500" y2="580" stroke="#92623a" strokeWidth="2" strokeDasharray="8 8" opacity="0.6" />

      {/* Oak Lane (Eastern North-South) */}
      <line x1="820" y1="80" x2="820" y2="580" stroke="#6e4726" strokeWidth="32" strokeLinecap="round" />
      <line x1="820" y1="80" x2="820" y2="580" stroke="url(#cobblestones)" strokeWidth="28" strokeLinecap="round" />
      <line x1="820" y1="80" x2="820" y2="580" stroke="#92623a" strokeWidth="2" strokeDasharray="8 8" opacity="0.6" />

      {/* 7. Stone Pedestrian Crosswalks (Zebra Crossings) at Major Intersections */}
      {/* High St & Maple St */}
      <g opacity="0.8">
        <line x1="168" y1="120" x2="192" y2="120" stroke="#fefce8" strokeWidth="2.5" />
        <line x1="168" y1="125" x2="192" y2="125" stroke="#fefce8" strokeWidth="2.5" />
        <line x1="168" y1="130" x2="192" y2="130" stroke="#fefce8" strokeWidth="2.5" />
      </g>
      {/* High St & King St */}
      <g opacity="0.8">
        <line x1="166" y1="350" x2="194" y2="350" stroke="#fefce8" strokeWidth="2.5" />
        <line x1="166" y1="355" x2="194" y2="355" stroke="#fefce8" strokeWidth="2.5" />
        <line x1="166" y1="360" x2="194" y2="360" stroke="#fefce8" strokeWidth="2.5" />
      </g>
      {/* Park Ave & Maple St */}
      <g opacity="0.8">
        <line x1="486" y1="120" x2="514" y2="120" stroke="#fefce8" strokeWidth="2.5" />
        <line x1="486" y1="125" x2="514" y2="125" stroke="#fefce8" strokeWidth="2.5" />
        <line x1="486" y1="130" x2="514" y2="130" stroke="#fefce8" strokeWidth="2.5" />
      </g>
      {/* Park Ave & King St (Central Crossroads) */}
      <g opacity="0.85">
        <line x1="485" y1="352" x2="515" y2="352" stroke="#fefce8" strokeWidth="2.5" />
        <line x1="485" y1="358" x2="515" y2="358" stroke="#fefce8" strokeWidth="2.5" />
        <line x1="485" y1="364" x2="515" y2="364" stroke="#fefce8" strokeWidth="2.5" />
        <line x1="524" y1="315" x2="524" y2="335" stroke="#fefce8" strokeWidth="2.5" />
        <line x1="530" y1="315" x2="530" y2="335" stroke="#fefce8" strokeWidth="2.5" />
        <line x1="536" y1="315" x2="536" y2="335" stroke="#fefce8" strokeWidth="2.5" />
      </g>
      {/* Oak Lane & Maple St */}
      <g opacity="0.8">
        <line x1="808" y1="120" x2="832" y2="120" stroke="#fefce8" strokeWidth="2.5" />
        <line x1="808" y1="125" x2="832" y2="125" stroke="#fefce8" strokeWidth="2.5" />
        <line x1="808" y1="130" x2="832" y2="130" stroke="#fefce8" strokeWidth="2.5" />
      </g>
      {/* Oak Lane & King St */}
      <g opacity="0.8">
        <line x1="806" y1="350" x2="834" y2="350" stroke="#fefce8" strokeWidth="2.5" />
        <line x1="806" y1="355" x2="834" y2="355" stroke="#fefce8" strokeWidth="2.5" />
        <line x1="806" y1="360" x2="834" y2="360" stroke="#fefce8" strokeWidth="2.5" />
      </g>

      {/* 8. Antique Street Signs (Ribbons) */}
      {/* Maple Street Banner */}
      <g transform="translate(340, 93)">
        <rect x="-95" y="-12" width="190" height="20" rx="3" fill="#fefae0" stroke="#78350f" strokeWidth="1.2" />
        <text x="0" y="2" fontSize="10" fontWeight="bold" fontFamily="serif" fill="#451a03" textAnchor="middle" letterSpacing="1">
          MAPLE STREET (เหนือ)
        </text>
      </g>

      {/* King Street Banner */}
      <g transform="translate(330, 317)">
        <rect x="-95" y="-12" width="190" height="20" rx="3" fill="#fefae0" stroke="#78350f" strokeWidth="1.2" />
        <text x="0" y="2" fontSize="10" fontWeight="bold" fontFamily="serif" fill="#451a03" textAnchor="middle" letterSpacing="1">
          KING STREET (สายกลาง)
        </text>
      </g>

      {/* River Road Banner */}
      <g transform="translate(340, 552)">
        <rect x="-95" y="-12" width="190" height="20" rx="3" fill="#fefae0" stroke="#78350f" strokeWidth="1.2" />
        <text x="0" y="2" fontSize="10" fontWeight="bold" fontFamily="serif" fill="#451a03" textAnchor="middle" letterSpacing="1">
          RIVER ROAD (สายใต้)
        </text>
      </g>

      {/* High Street Vertical Banner */}
      <g transform="translate(156, 235) rotate(-90)">
        <rect x="-85" y="-10" width="170" height="18" rx="3" fill="#fefae0" stroke="#78350f" strokeWidth="1.2" />
        <text x="0" y="3" fontSize="9" fontWeight="bold" fontFamily="serif" fill="#451a03" textAnchor="middle" letterSpacing="1">
          HIGH STREET (ตะวันตก)
        </text>
      </g>

      {/* Park Avenue Vertical Banner */}
      <g transform="translate(476, 235) rotate(-90)">
        <rect x="-85" y="-10" width="170" height="18" rx="3" fill="#fefae0" stroke="#78350f" strokeWidth="1.2" />
        <text x="0" y="3" fontSize="9" fontWeight="bold" fontFamily="serif" fill="#451a03" textAnchor="middle" letterSpacing="1">
          PARK AVENUE (กลางเมือง)
        </text>
      </g>

      {/* Oak Lane Vertical Banner */}
      <g transform="translate(796, 235) rotate(-90)">
        <rect x="-85" y="-10" width="170" height="18" rx="3" fill="#fefae0" stroke="#78350f" strokeWidth="1.2" />
        <text x="0" y="3" fontSize="9" fontWeight="bold" fontFamily="serif" fill="#451a03" textAnchor="middle" letterSpacing="1">
          OAK LANE (ตะวันออก)
        </text>
      </g>

      {/* 9. Vintage Compass Rose (North, South, East, West) */}
      <g transform="translate(925, 80)">
        {/* Outer Ring */}
        <circle cx="0" cy="0" r="34" fill="#fdf8ed" stroke="#78350f" strokeWidth="2.5" />
        <circle cx="0" cy="0" r="30" fill="none" stroke="#b45309" strokeWidth="1" strokeDasharray="3 2" />
        <circle cx="0" cy="0" r="12" fill="#eedcb5" stroke="#78350f" strokeWidth="1.5" />

        {/* 16-point Vintage Compass Points */}
        {/* Cardinal North Pointer (Crimson) */}
        <polygon points="0,-28 6,-5 0,-8 -6,-5" fill="#dc2626" stroke="#991b1b" strokeWidth="1" />
        {/* Fleur-de-lis on North Needle */}
        <path d="M -4 -25 Q 0 -34 4 -25 Q 0 -29 -4 -25 Z" fill="#b91c1c" />

        {/* Cardinal South (Dark Brown) */}
        <polygon points="0,28 6,5 0,8 -6,5" fill="#78350f" stroke="#451a03" strokeWidth="1" />
        {/* Cardinal West */}
        <polygon points="-28,0 -5,-6 -8,0 -5,6" fill="#78350f" stroke="#451a03" strokeWidth="1" />
        {/* Cardinal East */}
        <polygon points="28,0 5,-6 8,0 5,6" fill="#78350f" stroke="#451a03" strokeWidth="1" />

        {/* Intermediate 45° Points */}
        <polygon points="19,-19 4,-2 2,-4" fill="#ca8a04" />
        <polygon points="-19,-19 -4,-2 -2,-4" fill="#ca8a04" />
        <polygon points="19,19 4,2 2,4" fill="#ca8a04" />
        <polygon points="-19,19 -4,2 -2,4" fill="#ca8a04" />

        {/* Cardinal Labels */}
        <text x="0" y="-13" fontSize="10" fontWeight="bold" fontFamily="serif" fill="#dc2626" textAnchor="middle">N</text>
        <text x="0" y="23" fontSize="9" fontWeight="bold" fontFamily="serif" fill="#78350f" textAnchor="middle">S</text>
        <text x="-19" y="3" fontSize="9" fontWeight="bold" fontFamily="serif" fill="#78350f" textAnchor="middle">W</text>
        <text x="19" y="3" fontSize="9" fontWeight="bold" fontFamily="serif" fill="#78350f" textAnchor="middle">E</text>

        <circle cx="0" cy="0" r="3" fill="#f59e0b" stroke="#78350f" strokeWidth="1" />
      </g>

      {/* 10. Render All 16 Hand-Drawn Illustrated Town Buildings */}
      {TOWN_NODES.map((node) => {
        const cx = (node.x / 100) * 1000;
        const cy = (node.y / 100) * 650;
        const isHighlighted = node.id === highlightNodeId;
        const isSelected = selectedNode?.id === node.id;
        const isPlayerHere = activeNode?.id === node.id;

        return (
          <g
            key={node.id}
            onClick={() => handleNodeClick(node)}
            className="cursor-pointer transition-transform duration-200 hover:scale-105 group"
            tabIndex={0}
            role="button"
            aria-label={`${node.name} (${node.thaiName})`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleNodeClick(node);
              }
            }}
          >
            {/* Clue Highlight Golden Beacon */}
            {(isHighlighted || isSelected) && (
              <g pointerEvents="none">
                <circle
                  cx={cx}
                  cy={cy}
                  r="48"
                  fill="rgba(245, 158, 11, 0.2)"
                  filter="url(#goldenAura)"
                  opacity="0.7"
                />
                <circle
                  cx={cx}
                  cy={cy}
                  r="44"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  opacity="0.85"
                />
              </g>
            )}

            {/* Building Illustrated Art */}
            <g filter="url(#parchmentShadow)">
              {renderBuildingIllustration(node, cx, cy, isHighlighted, isSelected)}
            </g>

            {/* Building Name Tag Ribbon below */}
            <g transform={`translate(${cx}, ${cy + 30})`}>
              <rect
                x="-46"
                y="-9"
                width="92"
                height="18"
                rx="3"
                fill={isHighlighted ? '#fef08a' : isSelected ? '#fed7aa' : '#ffffff'}
                stroke={isHighlighted ? '#b45309' : isSelected ? '#c2410c' : '#78350f'}
                strokeWidth={isHighlighted || isSelected ? '1.8' : '1.2'}
                filter="url(#parchmentShadow)"
                className="transition-colors group-hover:fill-amber-100"
              />
              <text
                x="0"
                y="3.5"
                fontSize="8.5"
                fontWeight="bold"
                fontFamily="sans-serif"
                fill={isHighlighted ? '#78350f' : '#1c1917'}
                textAnchor="middle"
                className="pointer-events-none select-none font-sans"
              >
                {node.name.length > 13 ? node.name.slice(0, 12) + '..' : node.name}
              </text>
            </g>

            {/* Wax Seal Stamp on Solved/Highlighted Nodes */}
            {isHighlighted && (
              <g transform={`translate(${cx + 34}, ${cy - 26})`}>
                <circle cx="0" cy="0" r="11" fill="url(#waxSealGrad)" stroke="#7f1d1d" strokeWidth="1" filter="url(#parchmentShadow)" />
                <circle cx="0" cy="0" r="8" fill="none" stroke="#fca5a5" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.8" />
                <text x="0" y="3.5" fontSize="8" fontWeight="bold" fill="#fef2f2" textAnchor="middle">★</text>
              </g>
            )}
          </g>
        );
      })}

      {/* 11. Antique Brass Detective Token (YOU ARE HERE) */}
      {activeNode && (
        <g
          transform={`translate(${(activeNode.x / 100) * 1000}, ${(activeNode.y / 100) * 650 - 42})`}
          filter="url(#parchmentShadow)"
        >
          {/* Animated Target Ping */}
          <circle cx="0" cy="0" r="20" fill="rgba(217, 119, 6, 0.25)" className="animate-ping" />

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
          {/* Heading Orientation Badge */}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-950/80 border border-amber-500/40 text-[11px] text-amber-300 font-sans">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">ทิศ:</span>
            <span>{getThaiHeading(playerHeading)}</span>
          </div>

          {/* Zoom In Button */}
          <button
            onClick={() => handleZoom(0.2)}
            disabled={zoomLevel >= 2.0}
            className="p-1 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors disabled:opacity-40"
            title="ซูมเข้า (Zoom In)"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          {/* Zoom Out Button */}
          <button
            onClick={() => handleZoom(-0.2)}
            disabled={zoomLevel <= 0.8}
            className="p-1 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors disabled:opacity-40"
            title="ซูมออก (Zoom Out)"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          {/* Reset Zoom */}
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

          {/* Expand Fullscreen Modal Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-1 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors"
            title="ขยายแผนที่เต็มจอ (Enlarge Map)"
            aria-label="Enlarge Map"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          {/* Text Description Grid Toggle */}
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

        {/* Selected Building Detective Inspector Scroll */}
        {selectedNode && (
          <div className="absolute bottom-2 left-2 right-2 sm:left-3 sm:right-auto sm:w-80 bg-[#fdfbf7] border-2 border-[#8b5a2b] rounded-xl p-3 shadow-2xl text-stone-900 text-xs animate-in fade-in slide-in-from-bottom-2 duration-150 font-sans z-20">
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
                {/* Audio speech button */}
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

            {/* Street & Spatial Clues */}
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
        )}
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
