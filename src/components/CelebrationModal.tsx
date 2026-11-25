import React from 'react';
import { Award, CheckCircle2, Crown, Sparkles, Stamp, X } from 'lucide-react';
import type { CelebrationPayload } from '../types';
import { BADGE_COLOR_CLASSES, BadgeIcon } from './BadgeIcon';

interface CelebrationModalProps {
  payload: CelebrationPayload | null;
  onClose: () => void;
}

// ランク昇格・バッジ獲得・ボーナス達成時に表示する華やかな祝福モーダル
export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  payload,
  onClose,
}) => {
  if (!payload) return null;

  const isRankUp = Boolean(payload.rankUpTo);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
    >
      <div className="animate-pop-in relative w-full max-w-xl overflow-hidden rounded-3xl border-2 border-amber-400/60 bg-gradient-to-b from-[#1E293B] via-[#131C31] to-[#0B0F19] p-7 text-center shadow-[0_0_60px_rgba(251,191,36,0.3)]">
        {/* 背景の光の輪 */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-amber-400/20 blur-3xl" />

        <button
          type="button"
          onClick={onClose}
          aria-label="閉じる"
          className="absolute top-4 right-4 rounded-full bg-slate-800/80 p-2 text-slate-300 transition hover:bg-slate-700 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* トップアイコン演出 */}
        <div className="relative mx-auto mb-4 flex h-24 w-24 items-center justify-center">
          <div className="animate-spin-slow absolute inset-0 rounded-full border-2 border-dashed border-amber-300/60" />
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500 text-slate-950 shadow-[0_0_30px_rgba(251,191,36,0.65)]">
            {isRankUp ? (
              <Crown className="h-10 w-10" />
            ) : (
              <Sparkles className="h-10 w-10" />
            )}
          </div>
        </div>

        <p className="text-xs font-extrabold tracking-widest text-amber-300 uppercase">
          CONGRATULATIONS!
        </p>
        <h2 className="mt-1 text-2xl font-black text-white sm:text-3xl">
          {payload.title}
        </h2>
        <p className="mt-2 text-base text-slate-300">{payload.subtitle}</p>

        {/* 獲得項目カード */}
        <div className="mt-6 space-y-3 text-left">
          {typeof payload.pointsAdded === 'number' && payload.pointsAdded > 0 && (
            <div className="flex items-center justify-between rounded-2xl border border-sky-400/40 bg-sky-500/15 px-5 py-3.5">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-sky-300" />
                <div>
                  <div className="text-sm font-bold text-sky-200">
                    ポイント獲得！
                  </div>
                  {typeof payload.newTotalPoints === 'number' && (
                    <div className="text-xs text-slate-300">
                      現在の保有ポイント：{payload.newTotalPoints} pt
                    </div>
                  )}
                </div>
              </div>
              <span className="text-2xl font-black text-sky-300">
                +{payload.pointsAdded} pt
              </span>
            </div>
          )}

          {payload.rankUpTo && (
            <div className="flex items-center justify-between rounded-2xl border-2 border-amber-400/70 bg-gradient-to-r from-amber-500/25 via-yellow-500/20 to-amber-500/25 px-5 py-4 shadow-[0_0_24px_rgba(251,191,36,0.25)]">
              <div className="flex items-center gap-3">
                <Crown className="h-7 w-7 text-amber-300" />
                <div>
                  <div className="text-xs font-bold text-amber-200">
                    RANK UP!
                  </div>
                  <div className="text-lg font-black text-white">
                    シルバー →{' '}
                    <span className="text-amber-300">
                      {payload.rankUpTo}ランク
                    </span>{' '}
                    に昇格！
                  </div>
                </div>
              </div>
              <Award className="h-7 w-7 text-amber-300" />
            </div>
          )}

          {payload.stampProgress && (
            <div className="flex items-center justify-between rounded-2xl border border-purple-400/40 bg-purple-500/15 px-5 py-3.5">
              <div className="flex items-center gap-3">
                <Stamp className="h-6 w-6 text-purple-300" />
                <div className="text-sm font-bold text-purple-100">
                  来館スタンプが1つ増えました！
                </div>
              </div>
              <span className="text-lg font-extrabold text-purple-200">
                {payload.stampProgress.current} / {payload.stampProgress.max} 個
              </span>
            </div>
          )}

          {payload.unlockedBadges && payload.unlockedBadges.length > 0 && (
            <div className="space-y-2">
              {payload.unlockedBadges.map((badge) => {
                const colors = BADGE_COLOR_CLASSES[badge.accentColor];
                return (
                  <div
                    key={badge.id}
                    className={`flex items-center gap-4 rounded-2xl border px-5 py-3.5 ${colors.bg} ${colors.border} ${colors.glow}`}
                  >
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${colors.bg} ${colors.border} ${colors.text}`}
                    >
                      <BadgeIcon iconKey={badge.iconKey} className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-amber-300">
                        NEW デジタルバッジ獲得！
                      </div>
                      <div className="text-base font-black text-white">
                        {badge.name}
                      </div>
                      <div className="text-xs text-slate-300">
                        {badge.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {payload.extraNote && (
            <div className="rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-2.5 text-center text-sm font-medium text-slate-200">
              {payload.extraNote}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-7 w-full rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 py-3.5 text-lg font-black text-slate-950 shadow-[0_0_25px_rgba(251,191,36,0.45)] transition hover:brightness-105 active:scale-[0.99]"
        >
          やったね！確認してつづける
        </button>
      </div>
    </div>
  );
};
