import React from 'react';
import { CheckCircle2, Ticket, X } from 'lucide-react';
import type { Coupon } from '../types';

interface CouponModalProps {
  coupon: Coupon | null;
  onClose: () => void;
  onUseCoupon: (couponId: string) => void;
}

// 受付提示用の擬似バーコード＆使用処理モーダル
export const CouponModal: React.FC<CouponModalProps> = ({
  coupon,
  onClose,
  onUseCoupon,
}) => {
  if (!coupon) return null;

  // バーコード風の線の幅パターン
  const bars = [
    3, 1, 2, 1, 4, 1, 2, 2, 1, 3, 1, 2, 4, 1, 1, 3, 2, 1, 2, 3, 1, 4, 1, 2, 1,
    3, 2, 1, 2, 1, 3,
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
    >
      <div className="animate-pop-in relative w-full max-w-md overflow-hidden rounded-3xl border border-sky-400/50 bg-[#1E293B] p-6 shadow-[0_0_50px_rgba(56,189,248,0.25)]">
        <button
          type="button"
          onClick={onClose}
          aria-label="閉じる"
          className="absolute top-4 right-4 rounded-full bg-slate-800 p-2 text-slate-300 transition hover:bg-slate-700 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/20 text-amber-300">
            <Ticket className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-sky-300">
              {coupon.subtitle}
            </span>
            <h3 className="text-xl font-black text-white">{coupon.title}</h3>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-300">
          {coupon.description}
        </p>

        {/* バーコード提示エリア */}
        <div className="mt-5 rounded-2xl bg-white p-5 text-center text-slate-900 shadow-inner">
          <div className="text-xs font-bold text-slate-500">
            受付スタッフにご提示ください
          </div>
          <div className="mt-3 flex h-16 items-stretch justify-center gap-[3px]">
            {bars.map((w, idx) => (
              <div
                key={idx}
                className="bg-slate-900"
                style={{
                  width: `${w * 2}px`,
                  opacity: idx % 2 === 0 ? 1 : 0.85,
                }}
              />
            ))}
          </div>
          <div className="mt-2 font-mono text-sm font-bold tracking-widest text-slate-800">
            {coupon.code}
          </div>

          {coupon.isUsed && (
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-extrabold text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
              使用済み
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-600 bg-slate-800 py-3 text-sm font-bold text-slate-200 transition hover:bg-slate-700"
          >
            閉じる
          </button>
          {!coupon.isUsed ? (
            <button
              type="button"
              onClick={() => onUseCoupon(coupon.id)}
              className="flex-[1.5] rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 py-3 text-sm font-black text-slate-950 shadow-lg transition hover:brightness-110"
            >
              スタッフ確認・使用済みにする
            </button>
          ) : (
            <div className="flex flex-[1.5] items-center justify-center gap-1.5 rounded-xl bg-slate-800/80 py-3 text-sm font-bold text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              利用完了しました
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
