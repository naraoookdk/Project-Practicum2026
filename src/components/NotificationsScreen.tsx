import React from 'react';
import {
  ArrowRight,
  Bell,
  CalendarClock,
  CheckCheck,
  CloudRain,
  Flame,
  GraduationCap,
  MailOpen,
  Sparkles,
} from 'lucide-react';
import type { NotificationItem } from '../types';

interface NotificationsScreenProps {
  notifications: NotificationItem[];
  selectedId: string;
  onSelectNotification: (id: string) => void;
  onMarkAllRead: () => void;
  onNavigateFromNotification: (item: NotificationItem) => void;
}

const getCategoryBadge = (category: NotificationItem['category']) => {
  switch (category) {
    case 'イベント':
      return {
        style: 'bg-purple-500/20 text-purple-200 border-purple-400/40',
        icon: <Sparkles className="h-3.5 w-3.5" />,
      };
    case 'お得情報':
      return {
        style: 'bg-sky-500/20 text-sky-200 border-sky-400/40',
        icon: <CloudRain className="h-3.5 w-3.5" />,
      };
    case '学習記録':
      return {
        style: 'bg-orange-500/20 text-orange-200 border-orange-400/40',
        icon: <Flame className="h-3.5 w-3.5" />,
      };
    case '新着クイズ':
      return {
        style: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40',
        icon: <GraduationCap className="h-3.5 w-3.5" />,
      };
  }
};

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  notifications,
  selectedId,
  onSelectNotification,
  onMarkAllRead,
  onNavigateFromNotification,
}) => {
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const selectedItem =
    notifications.find((n) => n.id === selectedId) ?? notifications[0];

  return (
    <div className="space-y-5">
      {/* ヘッダーバー */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-700/80 bg-[#1E293B]/85 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/20 text-sky-300">
            <Bell className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">
              お知らせ・イベント通知ボックス
            </h2>
            <p className="text-xs text-slate-300">
              観望会イベントや雨の日ポイント2倍デーなど、来館がもっと楽しくなる情報をお届けします。
            </p>
          </div>
        </div>

        <button
          type="button"
          disabled={unreadCount === 0}
          onClick={onMarkAllRead}
          className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold transition ${
            unreadCount > 0
              ? 'border-sky-400/60 bg-sky-500/20 text-sky-200 hover:bg-sky-500/30'
              : 'cursor-not-allowed border-slate-700 bg-slate-800/60 text-slate-500'
          }`}
        >
          <CheckCheck className="h-4 w-4" />
          <span>すべて既読にする（未読 {unreadCount}件）</span>
        </button>
      </div>

      {/* 2カラム：左リスト / 右詳細 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* 通知リスト（左5カラム） */}
        <div className="space-y-3 lg:col-span-5">
          {notifications.map((item) => {
            const isSelected = selectedItem?.id === item.id;
            const cat = getCategoryBadge(item.category);

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectNotification(item.id)}
                className={`w-full rounded-2xl border p-4 text-left transition-all ${
                  isSelected
                    ? 'border-sky-400 bg-sky-500/15 ring-2 ring-sky-400/40'
                    : item.isRead
                      ? 'border-slate-700/70 bg-[#1E293B]/65 hover:border-slate-500'
                      : 'border-amber-400/60 bg-[#1E293B]/95 shadow-[0_0_20px_rgba(251,191,36,0.12)] hover:border-amber-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${cat.style}`}
                  >
                    {cat.icon}
                    {item.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">
                      {item.date}
                    </span>
                    {!item.isRead && (
                      <span className="inline-flex items-center rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-black text-white">
                        未読
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="mt-2 text-base font-extrabold text-white">
                  {item.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs text-slate-300">
                  {item.summary}
                </p>
              </button>
            );
          })}
        </div>

        {/* 通知詳細エリア（右7カラム） */}
        <div className="lg:col-span-7">
          {selectedItem ? (
            <div className="flex h-full flex-col justify-between rounded-3xl border border-slate-700/80 bg-[#1E293B]/85 p-7 shadow-xl backdrop-blur-md">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${
                      getCategoryBadge(selectedItem.category).style
                    }`}
                  >
                    {getCategoryBadge(selectedItem.category).icon}
                    {selectedItem.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400">
                    <CalendarClock className="h-4 w-4" />
                    {selectedItem.date}
                  </span>
                </div>

                <h3 className="mt-4 text-2xl leading-snug font-black text-white">
                  {selectedItem.title}
                </h3>

                <div className="mt-5 rounded-2xl border border-slate-700/80 bg-slate-900/60 p-5 text-base leading-relaxed text-slate-200">
                  {selectedItem.body}
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-slate-700/80 pt-5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                  <MailOpen className="h-4 w-4 text-emerald-400" />
                  <span>既読になりました</span>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigateFromNotification(selectedItem)}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-400 via-cyan-400 to-indigo-500 px-6 py-3.5 text-base font-black text-slate-950 shadow-[0_0_24px_rgba(56,189,248,0.4)] transition hover:scale-[1.02] hover:brightness-105"
                >
                  <span>{selectedItem.actionLabel}</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
