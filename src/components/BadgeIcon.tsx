import React from 'react';
import { CloudRain, Globe, QrCode, Rocket, Sparkles } from 'lucide-react';
import type { Badge } from '../types';

interface BadgeIconProps {
  iconKey: Badge['iconKey'];
  className?: string;
}

// バッジ種別ごとのアイコン描画ヘルパー
export const BadgeIcon: React.FC<BadgeIconProps> = ({
  iconKey,
  className = 'h-6 w-6',
}) => {
  switch (iconKey) {
    case 'rocket':
      return <Rocket className={className} />;
    case 'sparkles':
      return <Sparkles className={className} />;
    case 'rain':
      return <CloudRain className={className} />;
    case 'qr':
      return <QrCode className={className} />;
    case 'globe':
      return <Globe className={className} />;
  }
};

// バッジのアクセントカラー定義を統一管理
export const BADGE_COLOR_CLASSES: Record<
  Badge['accentColor'],
  {
    bg: string;
    border: string;
    text: string;
    glow: string;
    chip: string;
  }
> = {
  cyan: {
    bg: 'bg-sky-500/20',
    border: 'border-sky-400/50',
    text: 'text-sky-300',
    glow: 'shadow-[0_0_20px_rgba(56,189,248,0.28)]',
    chip: 'bg-sky-500/20 text-sky-200 border-sky-400/40',
  },
  purple: {
    bg: 'bg-purple-500/20',
    border: 'border-purple-400/50',
    text: 'text-purple-300',
    glow: 'shadow-[0_0_20px_rgba(168,85,247,0.28)]',
    chip: 'bg-purple-500/20 text-purple-200 border-purple-400/40',
  },
  sky: {
    bg: 'bg-cyan-500/20',
    border: 'border-cyan-400/50',
    text: 'text-cyan-300',
    glow: 'shadow-[0_0_20px_rgba(34,211,238,0.3)]',
    chip: 'bg-cyan-500/20 text-cyan-200 border-cyan-400/40',
  },
  amber: {
    bg: 'bg-amber-500/20',
    border: 'border-amber-400/50',
    text: 'text-amber-300',
    glow: 'shadow-[0_0_20px_rgba(251,191,36,0.32)]',
    chip: 'bg-amber-500/20 text-amber-200 border-amber-400/40',
  },
  emerald: {
    bg: 'bg-emerald-500/20',
    border: 'border-emerald-400/50',
    text: 'text-emerald-300',
    glow: 'shadow-[0_0_20px_rgba(52,211,153,0.28)]',
    chip: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40',
  },
};
