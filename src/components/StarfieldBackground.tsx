import React from 'react';

// プロジェクター投影でも文字の視認性を損なわない落ち着いた星空背景
const STARS = [
  { top: '8%', left: '12%', size: 2, duration: '3.6s', delay: '0s' },
  { top: '14%', left: '78%', size: 3, duration: '4.4s', delay: '0.8s' },
  { top: '22%', left: '35%', size: 2, duration: '5.1s', delay: '1.2s' },
  { top: '28%', left: '91%', size: 2, duration: '3.9s', delay: '0.4s' },
  { top: '39%', left: '7%', size: 3, duration: '4.8s', delay: '1.6s' },
  { top: '46%', left: '62%', size: 2, duration: '3.5s', delay: '0.3s' },
  { top: '54%', left: '24%', size: 2, duration: '4.2s', delay: '1.1s' },
  { top: '63%', left: '84%', size: 3, duration: '5.3s', delay: '0.7s' },
  { top: '71%', left: '48%', size: 2, duration: '3.8s', delay: '1.9s' },
  { top: '79%', left: '15%', size: 2, duration: '4.6s', delay: '0.5s' },
  { top: '86%', left: '72%', size: 3, duration: '4.1s', delay: '1.4s' },
  { top: '92%', left: '38%', size: 2, duration: '5.0s', delay: '0.2s' },
  { top: '18%', left: '53%', size: 2, duration: '4.5s', delay: '2.1s' },
  { top: '66%', left: '5%', size: 2, duration: '3.7s', delay: '0.9s' },
  { top: '34%', left: '44%', size: 2, duration: '5.4s', delay: '1.5s' },
];

export const StarfieldBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-gradient-to-b from-[#0B0F19] via-[#0F1629] to-[#111827]"
    >
      {/* 星雲の柔らかな光のグラデーション */}
      <div className="absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full bg-sky-500/10 blur-[130px]" />
      <div className="absolute top-1/3 -right-40 h-[560px] w-[560px] rounded-full bg-purple-600/12 blur-[140px]" />
      <div className="absolute -bottom-48 left-1/3 h-[480px] w-[480px] rounded-full bg-amber-500/6 blur-[130px]" />

      {/* 瞬く星々 */}
      {STARS.map((star, idx) => (
        <span
          key={idx}
          className="animate-twinkle absolute rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.65)]"
          style={
            {
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              '--twinkle-duration': star.duration,
              animationDelay: star.delay,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};
