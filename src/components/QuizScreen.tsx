import React from 'react';
import {
  ArrowRight,
  Award,
  Bookmark,
  Camera,
  CheckCircle2,
  Compass,
  Flame,
  Lock,
  QrCode,
  Sparkles,
  Star,
  Telescope,
  Ticket,
  Trophy,
  XCircle,
} from 'lucide-react';
import type {
  Coupon,
  GenreFilter,
  GradeFilter,
  QuizQuestion,
  Rank,
  RankingUser,
} from '../types';

interface QuizScreenProps {
  questions: QuizQuestion[];
  gradeFilter: GradeFilter;
  genreFilter: GenreFilter;
  bookmarkOnly: boolean;
  onChangeGradeFilter: (grade: GradeFilter) => void;
  onChangeGenreFilter: (genre: GenreFilter) => void;
  onToggleBookmarkOnly: () => void;
  selectedQuizId: string;
  onSelectQuizId: (id: string) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  answeredResults: Record<
    string,
    { selectedIndex: number; isCorrect: boolean }
  >;
  onAnswerQuiz: (quiz: QuizQuestion, selectedIndex: number) => void;
  qrUnlocked: boolean;
  onOpenQrScanner: () => void;
  firstInstallCoupon: Coupon | undefined;
  onOpenCoupon: (coupon: Coupon) => void;
  points: number;
  goldThreshold: number;
  rank: Rank;
  streak: number;
  correctTotal: number;
  challengeGoal: number;
  ranking: RankingUser[];
}

const GRADE_OPTIONS: GradeFilter[] = [
  'すべて',
  '小学4年（月と星）',
  '小学6年（月と太陽）',
  '中学3年（地球と宇宙）',
];

const GENRE_OPTIONS: GenreFilter[] = [
  'すべて',
  '宇宙',
  '星座',
  '科学',
  'イベント限定',
];

export const QuizScreen: React.FC<QuizScreenProps> = ({
  questions,
  gradeFilter,
  genreFilter,
  bookmarkOnly,
  onChangeGradeFilter,
  onChangeGenreFilter,
  onToggleBookmarkOnly,
  selectedQuizId,
  onSelectQuizId,
  bookmarkedIds,
  onToggleBookmark,
  answeredResults,
  onAnswerQuiz,
  qrUnlocked,
  onOpenQrScanner,
  firstInstallCoupon,
  onOpenCoupon,
  points,
  goldThreshold,
  rank,
  streak,
  correctTotal,
  challengeGoal,
  ranking,
}) => {
  // フィルター条件に一致するクイズを抽出（QR未解放の特別クイズはロック状態として扱うか非表示にし、解放後に表示）
  const visibleQuestions = questions.filter((q) => {
    if (q.isQrSpecial && !qrUnlocked) return false;
    if (gradeFilter !== 'すべて' && q.grade !== gradeFilter) return false;
    if (genreFilter !== 'すべて' && q.genre !== genreFilter) return false;
    if (bookmarkOnly && !bookmarkedIds.includes(q.id)) return false;
    return true;
  });

  const currentQuiz =
    visibleQuestions.find((q) => q.id === selectedQuizId) ??
    visibleQuestions[0] ??
    null;

  const currentResult = currentQuiz
    ? answeredResults[currentQuiz.id]
    : undefined;
  const isBookmarked = currentQuiz
    ? bookmarkedIds.includes(currentQuiz.id)
    : false;

  const currentIdx = currentQuiz
    ? visibleQuestions.findIndex((q) => q.id === currentQuiz.id)
    : -1;
  const nextQuiz =
    currentIdx >= 0 && visibleQuestions.length > 1
      ? visibleQuestions[(currentIdx + 1) % visibleQuestions.length]
      : null;

  const pointsToGold = Math.max(0, goldThreshold - points);
  const goldProgressPct = Math.min(
    100,
    Math.round((points / goldThreshold) * 100)
  );
  const challengePct = Math.min(
    100,
    Math.round((correctTotal / challengeGoal) * 100)
  );
  const streakMod = streak % 5 === 0 && streak > 0 ? 5 : streak % 5;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* 左2/3：メインエリア（クイズ機能） */}
      <section className="space-y-5 lg:col-span-8">
        {/* デモ用：館内QRクイズ擬似体験バナー（目立つ枠線・バッジ付き） */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-amber-400/75 bg-gradient-to-r from-[#1E293B]/95 via-[#1E293B]/90 to-amber-950/35 p-4 shadow-[0_0_28px_rgba(251,191,36,0.14)]">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-400/20 text-amber-300 ring-1 ring-amber-400/50">
                <QrCode className="h-7 w-7" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-amber-400 px-2 py-0.5 text-[11px] font-black tracking-wide text-slate-950">
                    DEMO GIMMICK
                  </span>
                  <span className="text-xs font-bold text-amber-200">
                    展示連動 O2O 体験
                  </span>
                  {qrUnlocked ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-300">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      館内限定クイズ解放中！
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-bold text-slate-300">
                      <Lock className="h-3 w-3 text-amber-300" />
                      特別クイズ2問がロック中
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm font-bold text-white">
                  遊学館の展示パネルにあるQRコードを読み取って、特別クイズ（+20pt＆限定バッジ）に挑戦しよう！
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenQrScanner}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 px-5 py-3 text-sm font-black text-slate-950 shadow-[0_0_20px_rgba(251,191,36,0.45)] transition hover:scale-[1.02] hover:brightness-105 active:scale-[0.99]"
            >
              <Camera className="h-5 w-5" />
              <span>📷 館内展示のQRコードをスキャン（デモ用）</span>
            </button>
          </div>
        </div>

        {/* 上部フィルター機能 */}
        <div className="rounded-2xl border border-slate-700/70 bg-[#1E293B]/80 p-5 backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-base font-extrabold text-white">
              <Compass className="h-5 w-5 text-sky-400" />
              <span>クイズをさがす・しぼりこむ</span>
            </h2>
            <button
              type="button"
              onClick={onToggleBookmarkOnly}
              className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-bold transition ${
                bookmarkOnly
                  ? 'border-amber-400 bg-amber-400/20 text-amber-200 shadow-[0_0_14px_rgba(251,191,36,0.25)]'
                  : 'border-slate-600 bg-slate-800/80 text-slate-300 hover:border-slate-500 hover:text-white'
              }`}
            >
              <Star
                className={`h-4 w-4 ${
                  bookmarkOnly
                    ? 'fill-amber-300 text-amber-300'
                    : 'text-slate-400'
                }`}
              />
              <span>ブックマークのみ表示（{bookmarkedIds.length}）</span>
            </button>
          </div>

          {/* 学年フィルター */}
          <div className="mt-4 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-24 shrink-0 text-xs font-bold text-slate-400">
                学年・単元：
              </span>
              <div className="flex flex-wrap gap-2">
                {GRADE_OPTIONS.map((grade) => {
                  const active = gradeFilter === grade;
                  return (
                    <button
                      key={grade}
                      type="button"
                      onClick={() => onChangeGradeFilter(grade)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold transition sm:text-sm ${
                        active
                          ? 'bg-sky-500 text-slate-950 shadow-[0_0_12px_rgba(56,189,248,0.45)]'
                          : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      {grade}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ジャンルフィルター */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-24 shrink-0 text-xs font-bold text-slate-400">
                ジャンル：
              </span>
              <div className="flex flex-wrap gap-2">
                {GENRE_OPTIONS.map((genre) => {
                  const active = genreFilter === genre;
                  return (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => onChangeGenreFilter(genre)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold transition sm:text-sm ${
                        active
                          ? 'bg-purple-500 text-white shadow-[0_0_12px_rgba(168,85,247,0.45)]'
                          : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      {genre}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* クイズ切り替えチップ一覧 */}
          {visibleQuestions.length > 0 && (
            <div className="mt-4 border-t border-slate-700/70 pt-3.5">
              <div className="mb-2 text-xs font-bold text-slate-400">
                問題リスト（{visibleQuestions.length}問）— クリックで切り替え：
              </div>
              <div className="flex flex-wrap gap-2">
                {visibleQuestions.map((q, index) => {
                  const isCurrent = currentQuiz?.id === q.id;
                  const result = answeredResults[q.id];
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => onSelectQuizId(q.id)}
                      className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition ${
                        isCurrent
                          ? 'border-sky-400 bg-sky-500/25 text-white ring-1 ring-sky-400/50'
                          : 'border-slate-700 bg-slate-800/70 text-slate-300 hover:border-slate-500 hover:text-white'
                      }`}
                    >
                      <span>Q{index + 1}</span>
                      {q.isQrSpecial && (
                        <span className="rounded bg-amber-400/20 px-1.5 py-0.5 text-[10px] font-black text-amber-300">
                          QR限定
                        </span>
                      )}
                      {q.genre === 'イベント限定' && (
                        <span className="rounded bg-purple-400/25 px-1.5 py-0.5 text-[10px] font-black text-purple-200">
                          イベント
                        </span>
                      )}
                      {result?.isCorrect && (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      )}
                      {result && !result.isCorrect && (
                        <XCircle className="h-3.5 w-3.5 text-rose-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* クイズ出題カード */}
        {currentQuiz ? (
          <div className="rounded-3xl border border-slate-700/80 bg-[#1E293B]/85 p-6 shadow-2xl backdrop-blur-md sm:p-7">
            {/* メタ情報ヘッダー */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {currentQuiz.isQrSpecial && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-3 py-1 text-xs font-black text-slate-950">
                    <QrCode className="h-3.5 w-3.5" />
                    館内QR限定スペシャル
                  </span>
                )}
                <span className="rounded-full border border-sky-400/40 bg-sky-500/15 px-3 py-1 text-xs font-bold text-sky-200">
                  {currentQuiz.grade}
                </span>
                <span className="rounded-full border border-purple-400/40 bg-purple-500/15 px-3 py-1 text-xs font-bold text-purple-200">
                  {currentQuiz.genre}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-slate-600 bg-slate-800 px-3 py-1 text-xs font-bold text-amber-300">
                  難易度：{'★'.repeat(currentQuiz.difficulty)}
                  {'☆'.repeat(3 - currentQuiz.difficulty)}
                </span>
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-extrabold text-emerald-300">
                  正解で +{currentQuiz.points} pt
                </span>
              </div>

              {/* ブックマークボタン */}
              <button
                type="button"
                onClick={() => onToggleBookmark(currentQuiz.id)}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-sm font-bold transition ${
                  isBookmarked
                    ? 'border-amber-400/70 bg-amber-400/20 text-amber-200'
                    : 'border-slate-600 bg-slate-800/80 text-slate-300 hover:border-slate-500 hover:text-white'
                }`}
              >
                <Bookmark
                  className={`h-4 w-4 ${
                    isBookmarked
                      ? 'fill-amber-300 text-amber-300'
                      : 'text-slate-400'
                  }`}
                />
                <span>{isBookmarked ? '保存済み' : 'ブックマーク'}</span>
              </button>
            </div>

            {/* 問題文 */}
            <h3 className="mt-5 text-xl leading-relaxed font-extrabold text-white sm:text-2xl">
              {currentQuiz.question}
            </h3>

            {/* 4択の選択肢ボタン */}
            <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {currentQuiz.options.map((option, idx) => {
                const labels = ['A', 'B', 'C', 'D'];
                const isAnswered = Boolean(currentResult);
                const isSelected = currentResult?.selectedIndex === idx;
                const isCorrectOption = currentQuiz.correctIndex === idx;

                let buttonStyle =
                  'border-slate-600/90 bg-slate-800/80 text-slate-100 hover:border-sky-400 hover:bg-sky-500/15 hover:shadow-[0_0_16px_rgba(56,189,248,0.2)]';

                if (isAnswered) {
                  if (isCorrectOption) {
                    buttonStyle =
                      'border-emerald-400 bg-emerald-500/20 text-emerald-100 ring-2 ring-emerald-400/50';
                  } else if (isSelected && !isCorrectOption) {
                    buttonStyle =
                      'border-rose-400 bg-rose-500/20 text-rose-100 ring-2 ring-rose-400/50';
                  } else {
                    buttonStyle =
                      'border-slate-700/70 bg-slate-900/50 text-slate-400 opacity-70';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => onAnswerQuiz(currentQuiz, idx)}
                    className={`flex items-center gap-3.5 rounded-2xl border-2 px-5 py-4 text-left text-base font-bold transition-all sm:text-lg ${buttonStyle}`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-black ${
                        isAnswered && isCorrectOption
                          ? 'bg-emerald-400 text-slate-950'
                          : isAnswered && isSelected && !isCorrectOption
                            ? 'bg-rose-400 text-slate-950'
                            : 'bg-slate-700 text-sky-300'
                      }`}
                    >
                      {labels[idx]}
                    </span>
                    <span className="flex-1">{option}</span>
                    {isAnswered && isCorrectOption && (
                      <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-400" />
                    )}
                    {isAnswered && isSelected && !isCorrectOption && (
                      <XCircle className="h-6 w-6 shrink-0 text-rose-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* 解答後の解説＆O2O展示誘導エリア */}
            {currentResult && (
              <div className="animate-pop-in mt-6 space-y-4 border-t border-slate-700/80 pt-6">
                {/* 判定＆解説ボックス */}
                <div
                  className={`rounded-2xl border p-5 ${
                    currentResult.isCorrect
                      ? 'border-emerald-400/60 bg-emerald-500/10'
                      : 'border-rose-400/60 bg-rose-500/10'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      {currentResult.isCorrect ? (
                        <CheckCircle2 className="h-7 w-7 text-emerald-400" />
                      ) : (
                        <XCircle className="h-7 w-7 text-rose-400" />
                      )}
                      <span
                        className={`text-xl font-black ${
                          currentResult.isCorrect
                            ? 'text-emerald-300'
                            : 'text-rose-300'
                        }`}
                      >
                        {currentResult.isCorrect
                          ? `大正解！ +${currentQuiz.points} pt ゲット！`
                          : 'おしい！解説を読んでみよう'}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/80 px-3.5 py-1.5 text-sm font-bold text-amber-300">
                      <Flame className="h-4 w-4 text-orange-400" />
                      <span>連続正解：{streak} 問中</span>
                    </div>
                  </div>

                  <p className="mt-3 text-base leading-relaxed text-slate-100">
                    {currentQuiz.explanation}
                  </p>

                  {currentQuiz.glossaryNote && (
                    <div className="mt-3 rounded-xl border border-slate-700/80 bg-slate-900/70 px-4 py-2.5 text-sm text-sky-200">
                      <span className="font-extrabold text-sky-300">
                        💡 わかりやすいことばメモ：
                      </span>
                      {currentQuiz.glossaryNote}
                    </div>
                  )}
                </div>

                {/* 【館内展示エリア誘導ボックス】 */}
                <div className="relative overflow-hidden rounded-2xl border-2 border-sky-400/70 bg-gradient-to-r from-sky-950/75 via-indigo-950/70 to-purple-950/75 p-5 shadow-[0_0_24px_rgba(56,189,248,0.2)]">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-400/20 text-sky-300 ring-1 ring-sky-400/50">
                      <Telescope className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-base font-black text-sky-300">
                          🔭 実際の展示を見に行こう！
                        </span>
                        <span className="rounded-full bg-purple-500/30 px-2.5 py-0.5 text-xs font-bold text-purple-200">
                          場所：{currentQuiz.exhibitArea}
                        </span>
                      </div>
                      <p className="mt-1.5 text-base font-bold text-white">
                        {currentQuiz.exhibitTip}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 次の問題ボタン */}
                {nextQuiz && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => onSelectQuizId(nextQuiz.id)}
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 px-6 py-3 text-base font-black text-slate-950 shadow-lg transition hover:brightness-110"
                    >
                      <span>次のクイズへすすむ</span>
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-700 bg-[#1E293B]/80 p-10 text-center">
            <p className="text-lg font-bold text-slate-300">
              条件にあうクイズがありませんでした。フィルターを変更してみてね！
            </p>
          </div>
        )}
      </section>

      {/* 右1/3：サイドバー（モチベーション・集客導線） */}
      <aside className="space-y-5 lg:col-span-4">
        {/* 初回特典バナー */}
        {firstInstallCoupon && (
          <div className="relative overflow-hidden rounded-2xl border border-amber-400/60 bg-gradient-to-br from-amber-500/20 via-[#1E293B] to-purple-900/30 p-5 shadow-lg">
            <div className="flex items-center gap-2 text-xs font-extrabold text-amber-300">
              <Sparkles className="h-4 w-4" />
              <span>初回インストール特典クーポン保有中</span>
            </div>
            <h3 className="mt-1.5 text-lg font-black text-white">
              {firstInstallCoupon.title}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-300">
              保護者の方もいっしょにお得に入館できます！受付でバーコードを提示してね。
            </p>
            <button
              type="button"
              onClick={() => onOpenCoupon(firstInstallCoupon)}
              className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-black transition ${
                firstInstallCoupon.isUsed
                  ? 'border border-slate-600 bg-slate-800 text-slate-300 hover:bg-slate-700'
                  : 'bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 shadow-[0_0_18px_rgba(251,191,36,0.4)] hover:brightness-105'
              }`}
            >
              <Ticket className="h-5 w-5" />
              <span>
                {firstInstallCoupon.isUsed
                  ? 'クーポン提示（使用済み）'
                  : '初回インストール特典：入館割引クーポンを提示する'}
              </span>
            </button>
          </div>
        )}

        {/* 目標達成プログレス */}
        <div className="rounded-2xl border border-slate-700/80 bg-[#1E293B]/85 p-5 backdrop-blur-md">
          <h3 className="flex items-center gap-2 text-base font-extrabold text-white">
            <Award className="h-5 w-5 text-amber-300" />
            <span>目標達成プログレス</span>
          </h3>

          {/* ランク昇格プログレス */}
          <div className="mt-4 rounded-xl border border-slate-700/80 bg-slate-900/60 p-4">
            <div className="flex items-center justify-between text-sm font-bold">
              <span className="text-slate-200">
                {rank === 'ゴールド' ? (
                  <span className="text-amber-300">
                    🎉 ゴールドランク達成！
                  </span>
                ) : (
                  <>
                    ゴールドランクまであと{' '}
                    <span className="text-lg font-black text-amber-300">
                      {pointsToGold} pt
                    </span>
                  </>
                )}
              </span>
              <span className="text-xs font-bold text-slate-400">
                {points} / {goldThreshold} pt
              </span>
            </div>
            <div className="mt-2.5 h-3 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-400 via-amber-300 to-amber-400 transition-all duration-500"
                style={{ width: `${goldProgressPct}%` }}
              />
            </div>
          </div>

          {/* 100問正解チャレンジ */}
          <div className="mt-3 rounded-xl border border-slate-700/80 bg-slate-900/60 p-4">
            <div className="flex items-center justify-between text-sm font-bold">
              <span className="text-slate-200">100問正解チャレンジ</span>
              <span className="text-sm font-black text-sky-300 tabular-nums">
                {correctTotal} / {challengeGoal} 問
              </span>
            </div>
            <div className="mt-2.5 h-3 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-400 to-purple-500 transition-all duration-500"
                style={{ width: `${challengePct}%` }}
              />
            </div>
          </div>

          {/* 連続正解ボーナス状況 */}
          <div className="mt-3 flex items-center justify-between rounded-xl border border-orange-400/30 bg-orange-500/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-400" />
              <div className="text-xs font-bold text-orange-100">
                <div>ただいま {streak} 問連続正解中！</div>
                <div className="text-[11px] text-orange-300/90">
                  5問連続ごとにボーナス +10 pt
                </div>
              </div>
            </div>
            <span className="rounded-lg bg-orange-500/20 px-2.5 py-1 text-xs font-black text-orange-300">
              {streakMod} / 5
            </span>
          </div>
        </div>

        {/* 正解数ランキング */}
        <div className="rounded-2xl border border-slate-700/80 bg-[#1E293B]/85 p-5 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-base font-extrabold text-white">
              <Trophy className="h-5 w-5 text-amber-300" />
              <span>館内 正解数ランキング</span>
            </h3>
            <span className="text-xs font-bold text-slate-400">今月のTOP5</span>
          </div>

          <ul className="mt-4 space-y-2.5">
            {ranking.map((user, idx) => {
              const place = idx + 1;
              const badgeColor =
                place === 1
                  ? 'bg-amber-400 text-slate-950'
                  : place === 2
                    ? 'bg-slate-300 text-slate-950'
                    : place === 3
                      ? 'bg-amber-700 text-amber-100'
                      : 'bg-slate-700 text-slate-200';

              return (
                <li
                  key={user.id}
                  className={`flex items-center justify-between rounded-xl border px-3.5 py-2.5 transition-all ${
                    user.isMe
                      ? 'border-sky-400/80 bg-sky-500/20 shadow-[0_0_16px_rgba(56,189,248,0.25)]'
                      : 'border-slate-700/70 bg-slate-900/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-black ${badgeColor}`}
                    >
                      {place}
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5 text-sm font-extrabold text-white">
                        <span>{user.name}</span>
                        {user.isMe && (
                          <span className="rounded bg-sky-400 px-1.5 py-0.5 text-[10px] font-black text-slate-950">
                            あなた
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {user.grade}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-black text-sky-300 tabular-nums">
                    {user.correctCount} 問
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </div>
  );
};
