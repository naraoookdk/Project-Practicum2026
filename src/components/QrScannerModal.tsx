import React, { useEffect, useState } from 'react';
import { Camera, CheckCircle2, QrCode, Sparkles, X } from 'lucide-react';

interface QrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanComplete: () => void;
}

// 館内展示QRスキャンを擬似体験するカメラアニメーションモーダル
export const QrScannerModal: React.FC<QrScannerModalProps> = ({
  isOpen,
  onClose,
  onScanComplete,
}) => {
  const [phase, setPhase] = useState<'scanning' | 'detected'>('scanning');

  useEffect(() => {
    if (!isOpen) {
      setPhase('scanning');
      return;
    }
    setPhase('scanning');

    const detectTimer = window.setTimeout(() => {
      setPhase('detected');
    }, 1450);

    const completeTimer = window.setTimeout(() => {
      onScanComplete();
    }, 2350);

    return () => {
      window.clearTimeout(detectTimer);
      window.clearTimeout(completeTimer);
    };
  }, [isOpen, onScanComplete]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
    >
      <div className="animate-pop-in relative w-full max-w-md overflow-hidden rounded-3xl border border-sky-400/50 bg-[#0F172A] p-6 text-center shadow-[0_0_50px_rgba(56,189,248,0.35)]">
        <button
          type="button"
          onClick={onClose}
          aria-label="閉じる"
          className="absolute top-4 right-4 rounded-full bg-slate-800 p-2 text-slate-300 transition hover:bg-slate-700 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/20 px-3 py-1 text-xs font-bold text-sky-300">
          <Camera className="h-4 w-4" />
          館内展示QRスキャン（デモモード）
        </div>
        <h3 className="mt-3 text-xl font-black text-white">
          展示パネルのQRコードを読み取り中…
        </h3>

        {/* カメラファインダー風エリア */}
        <div className="relative mx-auto mt-5 flex h-64 w-64 items-center justify-center overflow-hidden rounded-2xl border border-slate-700 bg-[#050811]">
          {/* 四隅のターゲット枠 */}
          <div className="absolute top-4 left-4 h-7 w-7 rounded-tl-lg border-t-4 border-l-4 border-sky-400" />
          <div className="absolute top-4 right-4 h-7 w-7 rounded-tr-lg border-t-4 border-r-4 border-sky-400" />
          <div className="absolute bottom-4 left-4 h-7 w-7 rounded-bl-lg border-b-4 border-l-4 border-sky-400" />
          <div className="absolute right-4 bottom-4 h-7 w-7 rounded-br-lg border-r-4 border-b-4 border-sky-400" />

          {phase === 'scanning' ? (
            <>
              <QrCode className="h-32 w-32 text-slate-500/75" />
              {/* スキャンライン */}
              <div className="animate-scanline absolute right-5 left-5 h-1 rounded-full bg-gradient-to-r from-transparent via-sky-400 to-transparent shadow-[0_0_16px_rgba(56,189,248,0.95)]" />
            </>
          ) : (
            <div className="animate-pop-in flex flex-col items-center gap-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 ring-2 ring-emerald-400/60">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <span className="flex items-center gap-1 text-base font-black text-emerald-300">
                <Sparkles className="h-4 w-4" />
                展示QRを認識しました！
              </span>
            </div>
          )}
        </div>

        <p className="mt-4 text-sm text-slate-300">
          {phase === 'scanning'
            ? '2階「VERA電波望遠鏡・惑星重さ体験」パネルに合わせています…'
            : '館内限定スペシャルクイズを解放します！'}
        </p>
      </div>
    </div>
  );
};
