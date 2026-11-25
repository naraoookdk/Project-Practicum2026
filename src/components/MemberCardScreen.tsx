import React from 'react';
import {
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  CloudRain,
  Crown,
  Gift,
  Lock,
  Sparkles,
  Stamp,
  Star,
  Ticket,
} from 'lucide-react';
import type { Badge, Coupon, Rank, VisitRecord } from '../types';
import { BADGE_COLOR_CLASSES, BadgeIcon } from './BadgeIcon';

interface MemberCardScreenProps {
  memberId: string;
  userName: string;
  gradeLabel: string;
  rank: Rank;
  points: number;
  stamps: number;
  maxStamps: number;
  badges: Badge[];
  favoriteBadgeIds: string[];
  onToggleFavoriteBadge: (badgeId: string) => void;
  coupons: Coupon[];
  onExchangeCoupon: (couponId: string) => void;
  onOpenCoupon: (coupon: Coupon) => void;
  visitHistory: VisitRecord[];
  hasCheckedInToday: boolean;
  onRainyDayCheckIn: () => void;
}

// 受付用QRコード風SVGパターン（会員番号と連動した見た目）
const MemberQrSvg: React.FC = () => {
  const cells = [
    1, 1, 1, 0, 1, 0, 1, 1, 1,
    1, 0, 1, 1, 0, 1, 1, 0, 1,
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    0, 1, 0, 1, 1, 0, 0, 1, 0,
    1, 0, 1, 0, 1, 1, 1, 0, 1,
    0, 1, 1, 1, 0, 0, 1, 1, 0,
    1, 1, 1, 0, 1, 0, 1, 0, 1,
    1, 0, 1, 1, 0, 1, 0, 1, 1,
    1, 1, 1, 0, 1, 1, 1, 1, 0,
  ];
  return (
    <svg
      viewBox="0 0 90 90"
      className="h-20 w-20 rounded-lg bg-white p-1.5 shadow-inner"
      aria-label="入館受付用QRコード"
    >
      {cells.map((filled, idx) => {
        if (!filled) return null;
        const x = (idx % 9) * 10;
        const y = Math.floor(idx / 9) * 10;
        return (
          <rect
            key={idx}
            x={x}
            y={y}
            width="8.5"
            height="8.5"
            rx="1.5"
            fill="#0F172A"
          />
        );
      })}
    </svg>
  );
};

export const MemberCardScreen: React.FC<MemberCardScreenProps> = ({
  memberId,
  userName,
  gradeLabel,
  rank,
  points,
  stamps,
  maxStamps,
  badges,
  favoriteBadgeIds,
  onToggleFavoriteBadge,
  coupons,
  onExchangeCoupon,
  onOpenCoupon,
  visitHistory,
  hasCheckedInToday,
  onRainyDayCheckIn,
}) => {
  const isGold = rank === 'ゴールド';
  const favoriteBadges = favoriteBadgeIds
    .map((id) => badges.find((b) => b.id === id && b.unlocked))
    .filter((b): b is Badge => Boolean(b));

  return (
    <div className="space-y-7">
      {/* 上部：デジタル会員証カード＆チェックインデモ */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* デジタル会員証カード（左7カラム） */}
        <div className="lg:col-span-7">
          <div
            className={`relative overflow-hidden rounded-3xl p-6 transition-all duration-700 sm:p-7 ${
              isGold
                ? 'animate-shimmer border-2 border-amber-300/90 bg-gradient-to-br from-amber-300/95 via-yellow-100 to-amber-500/95 text-slate-950 shadow-[0_0_50px_rgba(251,191,36,0.4)]'
                : 'border-2 border-slate-300/70 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-400 text-slate-900 shadow-[0_0_40px_rgba(148,163,184,0.28)]'
            }`}
          >
            {/* カード上の光沢装飾 */}
            <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-white/35 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-sky-400/20 blur-2xl" />

            <div className="relative z-10 flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-extrabold tracking-widest text-slate-700 uppercase">
                  <span>OSHU SPACE MUSEUM MEMBER CARD</span>
                </div>
                <div className="mt-1 flex items-center gap-2.5">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black shadow-sm ${
                      isGold
                        ? 'bg-slate-950 text-amber-300'
                        : 'bg-slate-800 text-slate-100'
                    }`}
                  >
                    {isGold ? (
                      <Crown className="h-4 w-4 text-amber-300" />
                    ) : (
                      <Award className="h-4 w-4 text-slate-300" />
                    )}
                    {rank}会員
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-700">
                    NO. {memberId}
                  </span>
                </div>

                <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                  {userName}{' '}
                  <span className="text-base font-bold text-slate-700">
                    （{gradeLabel}）
                  </span>
                </h2>
              </div>

              {/* 受付スキャン用QR＆保有ポイント */}
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-xs font-extrabold text-slate-700">
                    保有ポイント
                  </div>
                  <div className="text-3xl font-black text-slate-950 tabular-nums">
                    {points} <span className="text-base font-extrabold">pt</span>
                  </div>
                </div>
                <MemberQrSvg />
              </div>
            </div>

            {/* お気に入りバッジ表示エリア（最大3つ） */}
            <div className="relative z-10 mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-slate-900/15 pt-4">
              <div>
                <div className="text-xs font-extrabold text-slate-700">
                  お気に入りバッジ（プロフィール展示中）
                </div>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  {favoriteBadges.length > 0 ? (
                    favoriteBadges.map((badge) => (
                      <span
                        key={badge.id}
                        className="inline-flex items-center gap-1.5 rounded-full bg-slate-950/85 px-3 py-1 text-xs font-bold text-white shadow"
                      >
                        <BadgeIcon
                          iconKey={badge.iconKey}
                          className="h-3.5 w-3.5 text-amber-300"
                        />
                        {badge.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs font-bold text-slate-700">
                      下のコレクションから最大3つまで飾れます
                    </span>
                  )}
                </div>
              </div>

              {/* 受付バーコード風飾り */}
              <div className="rounded-xl bg-white/85 px-3 py-1.5 text-center shadow-sm">
                <div className="flex h-6 items-stretch justify-center gap-[2px]">
                  {[2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 2, 3, 1, 2, 1, 2, 1, 3].map(
                    (w, i) => (
                      <span
                        key={i}
                        className="bg-slate-900"
                        style={{ width: `${w * 1.5}px` }}
                      />
                    )
                  )}
                </div>
                <div className="mt-0.5 font-mono text-[10px] font-bold text-slate-700">
                  {memberId}
                </div>
              </div>
            </div>

            {/* 来館スタンプカード（5個で特典交換） */}
            <div className="relative z-10 mt-5 rounded-2xl bg-slate-950/85 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-extrabold">
                  <Stamp className="h-4 w-4 text-amber-300" />
                  <span>来館スタンプカード（5個で特別記念品と交換！）</span>
                </div>
                <span className="text-sm font-black text-amber-300">
                  {stamps} / {maxStamps} 個
                </span>
              </div>
              <div className="mt-3 grid grid-cols-5 gap-2.5">
                {Array.from({ length: maxStamps }).map((_, idx) => {
                  const stamped = idx < stamps;
                  return (
                    <div
                      key={idx}
                      className={`flex h-12 items-center justify-center rounded-xl border-2 transition-all ${
                        stamped
                          ? 'border-amber-400 bg-gradient-to-br from-amber-400/30 to-orange-500/30 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                          : 'border-dashed border-slate-600 bg-slate-900/70 text-slate-600'
                      }`}
                    >
                      {stamped ? (
                        <div className="flex flex-col items-center">
                          <Star className="h-5 w-5 fill-amber-300 text-amber-300" />
                          <span className="text-[10px] font-black">済</span>
                        </div>
                      ) : (
                        <span className="text-xs font-bold">{idx + 1}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 右5カラム：【デモ用ギミック】受付で入館スキャン */}
        <div className="lg:col-span-5">
          <div className="flex h-full flex-col justify-between rounded-3xl border-2 border-dashed border-sky-400/80 bg-gradient-to-b from-[#1E293B]/95 to-sky-950/45 p-6 shadow-[0_0_32px_rgba(56,189,248,0.18)]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-sky-400 px-2.5 py-0.5 text-xs font-black text-slate-950">
                  DEMO ACTION
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/20 px-2.5 py-0.5 text-xs font-bold text-cyan-200">
                  <CloudRain className="h-3.5 w-3.5" />
                  本日は雨の日ボーナスデー！
                </span>
              </div>

              <h3 className="mt-3 text-xl font-black text-white">
                遊学館 受付チェックイン体験
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                遊学館の入口でデジタル会員証をスキャンしたときの動きを体験できます。今日は雨の日なのでポイント2倍＆限定バッジのチャンス！
              </p>

              <ul className="mt-4 space-y-2 rounded-2xl border border-slate-700/80 bg-slate-900/65 p-4 text-sm font-bold text-slate-200">
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 shrink-0 text-amber-300" />
                  <span>来館ポイント +20 pt（雨の日2倍！）</span>
                </li>
                <li className="flex items-center gap-2">
                  <Crown className="h-4 w-4 shrink-0 text-amber-300" />
                  <span>100 pt 到達で「ゴールドランク」へ昇格！</span>
                </li>
                <li className="flex items-center gap-2">
                  <Stamp className="h-4 w-4 shrink-0 text-purple-300" />
                  <span>来館スタンプ +1個 押印</span>
                </li>
                <li className="flex items-center gap-2">
                  <CloudRain className="h-4 w-4 shrink-0 text-sky-300" />
                  <span>限定「☔ 雨の日来館マスター」バッジ獲得</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={onRainyDayCheckIn}
              className={`mt-5 flex w-full items-center justify-center gap-2.5 rounded-2xl px-5 py-4 text-base font-black transition-all ${
                hasCheckedInToday
                  ? 'border border-emerald-400/60 bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30'
                  : 'bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 text-slate-950 shadow-[0_0_26px_rgba(56,189,248,0.5)] hover:scale-[1.02] hover:brightness-105 active:scale-[0.99]'
              }`}
            >
              <Building2 className="h-5 w-5" />
              <span>
                {hasCheckedInToday
                  ? '✅ 本日の雨の日チェックイン完了！（演出を再表示）'
                  : '🏛️ 受付で入館スキャン（雨の日来館デモ）'}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 中部：デジタルバッジコレクション（お気に入りバッジ展示） */}
      <section className="rounded-3xl border border-slate-700/80 bg-[#1E293B]/85 p-6 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="flex items-center gap-2 text-xl font-black text-white">
              <Sparkles className="h-6 w-6 text-purple-400" />
              <span>デジタルバッジコレクション</span>
            </h3>
            <p className="mt-1 text-sm text-slate-300">
              獲得したバッジをクリックすると、会員証カードに飾る「お気に入りバッジ（最大3つ）」に設定できます。
            </p>
          </div>
          <span className="rounded-full border border-purple-400/40 bg-purple-500/15 px-3.5 py-1.5 text-xs font-extrabold text-purple-200">
            飾っているバッジ：{favoriteBadgeIds.length} / 3
          </span>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {badges.map((badge) => {
            const colors = BADGE_COLOR_CLASSES[badge.accentColor];
            const isFavorite = favoriteBadgeIds.includes(badge.id);

            return (
              <button
                key={badge.id}
                type="button"
                disabled={!badge.unlocked}
                onClick={() => onToggleFavoriteBadge(badge.id)}
                className={`relative flex flex-col items-start rounded-2xl border p-4 text-left transition-all ${
                  badge.unlocked
                    ? isFavorite
                      ? `${colors.bg} ${colors.border} ${colors.glow} ring-2 ring-amber-300/70`
                      : `border-slate-600/80 bg-slate-900/70 hover:border-slate-400`
                    : 'cursor-not-allowed border-slate-800 bg-slate-900/40 opacity-65'
                }`}
              >
                {badge.unlocked && isFavorite && (
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-black text-slate-950">
                    <Star className="h-3 w-3 fill-slate-950" />
                    展示中
                  </span>
                )}

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${
                    badge.unlocked
                      ? `${colors.bg} ${colors.border} ${colors.text}`
                      : 'border-slate-700 bg-slate-800/80 text-slate-500'
                  }`}
                >
                  {badge.unlocked ? (
                    <BadgeIcon iconKey={badge.iconKey} className="h-6 w-6" />
                  ) : (
                    <Lock className="h-5 w-5" />
                  )}
                </div>

                <h4 className="mt-3 text-base font-black text-white">
                  {badge.name}
                </h4>

                {badge.unlocked ? (
                  <>
                    <p className="mt-1 text-xs leading-relaxed text-slate-300">
                      {badge.description}
                    </p>
                    <div className="mt-auto pt-3 text-[11px] font-bold text-sky-300">
                      獲得日：{badge.unlockedAt}
                    </div>
                  </>
                ) : (
                  <div className="mt-2 rounded-xl border border-slate-700/80 bg-slate-950/60 p-2.5 text-xs text-slate-300">
                    <span className="font-bold text-amber-300">
                      獲得条件：
                    </span>
                    {badge.unlockCondition}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* 下部：ポイント交換・特典クーポン一覧 ＆ 来館履歴リスト */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* ポイント交換・特典クーポン一覧（左7カラム） */}
        <div className="rounded-3xl border border-slate-700/80 bg-[#1E293B]/85 p-6 backdrop-blur-md lg:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="flex items-center gap-2 text-xl font-black text-white">
              <Gift className="h-6 w-6 text-amber-300" />
              <span>ポイント交換・特典クーポン</span>
            </h3>
            <span className="rounded-full bg-sky-500/20 px-3 py-1 text-xs font-extrabold text-sky-300">
              つかえるポイント：{points} pt
            </span>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {coupons.map((coupon) => {
              const canAfford = points >= coupon.costPoints;
              return (
                <div
                  key={coupon.id}
                  className="flex flex-col justify-between rounded-2xl border border-slate-700/80 bg-slate-900/70 p-4"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-md bg-purple-500/20 px-2 py-0.5 text-[11px] font-bold text-purple-200">
                        {coupon.subtitle}
                      </span>
                      {coupon.isOwned && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-300">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          {coupon.isUsed ? '使用済み' : '保有中'}
                        </span>
                      )}
                    </div>
                    <h4 className="mt-2 text-base font-black text-white">
                      {coupon.title}
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-slate-300">
                      {coupon.description}
                    </p>
                  </div>

                  <div className="mt-4">
                    {coupon.isOwned ? (
                      <button
                        type="button"
                        onClick={() => onOpenCoupon(coupon)}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-sky-400/60 bg-sky-500/20 py-2.5 text-sm font-extrabold text-sky-200 transition hover:bg-sky-500/30"
                      >
                        <Ticket className="h-4 w-4" />
                        <span>
                          {coupon.isUsed
                            ? 'クーポンを表示（使用済）'
                            : 'クーポンを提示する'}
                        </span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={!canAfford}
                        onClick={() => onExchangeCoupon(coupon.id)}
                        className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-black transition ${
                          canAfford
                            ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 shadow hover:brightness-105'
                            : 'cursor-not-allowed border border-slate-700 bg-slate-800 text-slate-500'
                        }`}
                      >
                        <Gift className="h-4 w-4" />
                        <span>
                          {canAfford
                            ? `${coupon.costPoints} pt で交換する`
                            : `あと ${coupon.costPoints - points} pt 必要`}
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 来館履歴リスト（右5カラム） */}
        <div className="rounded-3xl border border-slate-700/80 bg-[#1E293B]/85 p-6 backdrop-blur-md lg:col-span-5">
          <h3 className="flex items-center gap-2 text-xl font-black text-white">
            <Calendar className="h-6 w-6 text-sky-400" />
            <span>来館履歴</span>
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            遊学館に遊びに来た記録と獲得ポイントの一覧です。
          </p>

          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900/60">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-700/80 bg-slate-800/80 text-xs font-bold text-slate-300">
                <tr>
                  <th className="px-4 py-3">来館日</th>
                  <th className="px-4 py-3">内容</th>
                  <th className="px-4 py-3 text-right">獲得pt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {visitHistory.map((record) => (
                  <tr
                    key={record.id}
                    className={
                      record.isRainyDay ? 'bg-sky-500/10' : 'hover:bg-slate-800/40'
                    }
                  >
                    <td className="px-4 py-3 font-bold whitespace-nowrap text-slate-200">
                      {record.date}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-300">
                      {record.label}
                    </td>
                    <td className="px-4 py-3 text-right font-black whitespace-nowrap text-amber-300">
                      +{record.pointsEarned} pt
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
