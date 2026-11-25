import React from 'react';
import {
  Award,
  Bell,
  Compass,
  CreditCard,
  Crown,
  RotateCcw,
  Sparkles,
  Telescope,
} from 'lucide-react';
import type { Rank, TabId } from '../types';

interface HeaderProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
  unreadCount: number;
  userName: string;
  gradeLabel: string;
  rank: Rank;
  points: number;
  onResetDemo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  unreadCount,
  userName,
  gradeLabel,
  rank,
  points,
  onResetDemo,
}) => {
  const isGold = rank === 'ゴールド';

  const navItems: {
    id: TabId;
    label: string;
    icon: React.ReactNode;
    badge?: number;
  }[] = [
    {
      id: 'quiz',
      label: 'クイズに挑戦（学習・展示連動）',
      icon: <Compass className="h-5 w-5" />,
    },
    {
      id: 'card',
      label: 'デジタル会員証・バッジ',
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      id: 'notifications',
      label: 'お知らせ・イベント通知',
      icon: <Bell className="h-5 w-5" />,
      badge: unreadCount,
    },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-700/70 bg-[#0B0F19]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-5 py-3.5 lg:px-8">
        {/* アプリロゴ＆タイトル */}
        <div className="flex items-center gap-3.5">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-indigo-500 to-purple-600 p-0.5 shadow-[0_0_24px_rgba(56,189,248,0.35)]">
            <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#0B0F19]/85">
              <Telescope className="h-6 w-6 text-sky-300" />
            </div>
            <Sparkles className="absolute -top-1.5 -right-1.5 h-4 w-4 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider text-sky-400">
                OSHU SPACE LEARNING PORTAL
              </span>
              <button
                type="button"
                onClick={onResetDemo}
                title="デモを初期状態（90pt・シルバー）に戻す"
                className="inline-flex items-center gap-1 rounded-md border border-slate-700 bg-slate-800/70 px-1.5 py-0.5 text-[11px] text-slate-400 transition hover:border-slate-500 hover:text-slate-200"
              >
                <RotateCcw className="h-3 w-3" />
                <span>初期化</span>
              </button>
            </div>
            <h1 className="text-lg font-extrabold tracking-tight text-white xl:text-xl">
              奥州宇宙遊学館 学習＆会員ポータル
            </h1>
          </div>
        </div>

        {/* ナビゲーションタブ（3画面切り替え） */}
        <nav
          aria-label="メインナビゲーション"
          className="order-3 flex w-full flex-wrap items-center gap-2 lg:order-2 lg:w-auto"
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`relative flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all lg:flex-initial xl:text-base ${
                  isActive
                    ? 'bg-gradient-to-r from-sky-500/25 via-indigo-500/25 to-purple-500/25 text-white ring-2 ring-sky-400/70 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                    : 'bg-[#1E293B]/60 text-slate-300 hover:bg-[#1E293B] hover:text-white'
                }`}
              >
                <span className={isActive ? 'text-sky-300' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span className="whitespace-nowrap">{item.label}</span>
                {typeof item.badge === 'number' && item.badge > 0 && (
                  <span className="ml-1 inline-flex min-w-[24px] items-center justify-center rounded-full bg-rose-500 px-1.5 py-0.5 text-xs font-extrabold text-white shadow-[0_0_12px_rgba(244,63,94,0.65)]">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* 右端：ユーザー簡易ステータス */}
        <div className="order-2 flex items-center gap-3 rounded-2xl border border-slate-700/80 bg-[#1E293B]/85 px-4 py-2 shadow-lg lg:order-3">
          <div className="text-right">
            <div className="text-sm font-bold text-white">
              {userName}{' '}
              <span className="text-xs font-medium text-slate-300">
                / {gradeLabel}
              </span>
            </div>
            <div className="mt-0.5 flex items-center justify-end gap-2">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-extrabold transition-all ${
                  isGold
                    ? 'bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-slate-950 shadow-[0_0_14px_rgba(251,191,36,0.55)]'
                    : 'bg-gradient-to-r from-slate-200 to-slate-400 text-slate-900'
                }`}
              >
                {isGold ? (
                  <Crown className="h-3.5 w-3.5" />
                ) : (
                  <Award className="h-3.5 w-3.5" />
                )}
                {rank}ランク
              </span>
              <span className="text-sm font-extrabold text-sky-300 tabular-nums">
                {points} <span className="text-xs font-bold">pt</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
