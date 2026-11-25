import { useMemo, useState } from 'react';
import { CelebrationModal } from './components/CelebrationModal';
import { CouponModal } from './components/CouponModal';
import { Header } from './components/Header';
import { MemberCardScreen } from './components/MemberCardScreen';
import { NotificationsScreen } from './components/NotificationsScreen';
import { QrScannerModal } from './components/QrScannerModal';
import { QuizScreen } from './components/QuizScreen';
import { StarfieldBackground } from './components/StarfieldBackground';
import {
  INITIAL_BADGES,
  INITIAL_COUPONS,
  INITIAL_FAVORITE_BADGE_IDS,
  INITIAL_NOTIFICATIONS,
  INITIAL_RIVAL_USERS,
  INITIAL_USER_PROFILE,
  INITIAL_VISIT_HISTORY,
  QUIZ_DATA,
} from './data/mockData';
import type {
  Badge,
  CelebrationPayload,
  Coupon,
  GenreFilter,
  GradeFilter,
  NotificationItem,
  QuizQuestion,
  Rank,
  RankingUser,
  TabId,
  VisitRecord,
} from './types';

export function App() {
  // 画面タブ状態
  const [activeTab, setActiveTab] = useState<TabId>('quiz');

  // ユーザー基本ステータス
  const [points, setPoints] = useState<number>(
    INITIAL_USER_PROFILE.initialPoints
  );
  const [hasReachedGold, setHasReachedGold] = useState<boolean>(false);
  const [streak, setStreak] = useState<number>(
    INITIAL_USER_PROFILE.initialStreak
  );
  const [correctTotal, setCorrectTotal] = useState<number>(
    INITIAL_USER_PROFILE.initialCorrectTotal
  );
  const [stamps, setStamps] = useState<number>(
    INITIAL_USER_PROFILE.initialStamps
  );

  // バッジ・お気に入り・履歴・クーポン・通知
  const [badges, setBadges] = useState<Badge[]>(INITIAL_BADGES);
  const [favoriteBadgeIds, setFavoriteBadgeIds] = useState<string[]>(
    INITIAL_FAVORITE_BADGE_IDS
  );
  const [visitHistory, setVisitHistory] = useState<VisitRecord[]>(
    INITIAL_VISIT_HISTORY
  );
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    INITIAL_NOTIFICATIONS
  );
  const [selectedNotificationId, setSelectedNotificationId] = useState<string>(
    INITIAL_NOTIFICATIONS[0].id
  );

  // クイズ関連状態
  const [gradeFilter, setGradeFilter] = useState<GradeFilter>('すべて');
  const [genreFilter, setGenreFilter] = useState<GenreFilter>('すべて');
  const [bookmarkOnly, setBookmarkOnly] = useState<boolean>(false);
  const [selectedQuizId, setSelectedQuizId] = useState<string>(QUIZ_DATA[0].id);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['q-1']);
  const [answeredResults, setAnsweredResults] = useState<
    Record<string, { selectedIndex: number; isCorrect: boolean }>
  >({});
  const [qrUnlocked, setQrUnlocked] = useState<boolean>(false);
  const [hasCheckedInToday, setHasCheckedInToday] = useState<boolean>(false);

  // モーダル状態
  const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false);
  const [activeCouponModalId, setActiveCouponModalId] = useState<string | null>(
    null
  );
  const [celebration, setCelebration] = useState<CelebrationPayload | null>(
    null
  );

  // 現在のランク（100pt到達でゴールド、一度昇格したら降格しない）
  const rank: Rank =
    hasReachedGold || points >= INITIAL_USER_PROFILE.goldThreshold
      ? 'ゴールド'
      : 'シルバー';

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications]
  );

  // リアルタイム順位計算（星野 太郎の正解数に応じて自動ソート）
  const ranking: RankingUser[] = useMemo(() => {
    const me: RankingUser = {
      id: 'me',
      name: `${INITIAL_USER_PROFILE.name}（小5）`,
      grade: INITIAL_USER_PROFILE.gradeLabel,
      correctCount: correctTotal,
      isMe: true,
    };
    return [...INITIAL_RIVAL_USERS, me].sort(
      (a, b) => b.correctCount - a.correctCount
    );
  }, [correctTotal]);

  const activeCouponModal = useMemo(
    () => coupons.find((c) => c.id === activeCouponModalId) ?? null,
    [coupons, activeCouponModalId]
  );

  const firstInstallCoupon = useMemo(
    () => coupons.find((c) => c.isFirstInstall),
    [coupons]
  );

  // デモ初期化（発表時のリハーサルや再演用）
  const handleResetDemo = () => {
    setActiveTab('quiz');
    setPoints(INITIAL_USER_PROFILE.initialPoints);
    setHasReachedGold(false);
    setStreak(INITIAL_USER_PROFILE.initialStreak);
    setCorrectTotal(INITIAL_USER_PROFILE.initialCorrectTotal);
    setStamps(INITIAL_USER_PROFILE.initialStamps);
    setBadges(INITIAL_BADGES);
    setFavoriteBadgeIds(INITIAL_FAVORITE_BADGE_IDS);
    setVisitHistory(INITIAL_VISIT_HISTORY);
    setCoupons(INITIAL_COUPONS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setSelectedNotificationId(INITIAL_NOTIFICATIONS[0].id);
    setGradeFilter('すべて');
    setGenreFilter('すべて');
    setBookmarkOnly(false);
    setSelectedQuizId(QUIZ_DATA[0].id);
    setBookmarkedIds(['q-1']);
    setAnsweredResults({});
    setQrUnlocked(false);
    setHasCheckedInToday(false);
    setCelebration(null);
    setActiveCouponModalId(null);
    setIsQrModalOpen(false);
  };

  // ブックマーク切り替え
  const handleToggleBookmark = (quizId: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(quizId)
        ? prev.filter((id) => id !== quizId)
        : [...prev, quizId]
    );
  };

  // クイズ解答処理
  const handleAnswerQuiz = (quiz: QuizQuestion, selectedIndex: number) => {
    if (answeredResults[quiz.id]) return;

    const isCorrect = quiz.correctIndex === selectedIndex;
    setAnsweredResults((prev) => ({
      ...prev,
      [quiz.id]: { selectedIndex, isCorrect },
    }));

    if (!isCorrect) {
      setStreak(0);
      return;
    }

    const nextStreak = streak + 1;
    const isStreakBonus = nextStreak > 0 && nextStreak % 5 === 0;
    const bonusPoints = isStreakBonus ? 10 : 0;
    const earnedPoints = quiz.points + bonusPoints;
    const nextPoints = points + earnedPoints;
    const willRankUp =
      rank === 'シルバー' && nextPoints >= INITIAL_USER_PROFILE.goldThreshold;

    setStreak(nextStreak);
    setCorrectTotal((prev) => prev + 1);
    setPoints(nextPoints);
    if (willRankUp) {
      setHasReachedGold(true);
    }

    // バッジ解放チェック
    const newlyUnlockedBadges: Badge[] = [];
    if (quiz.badgeRewardId) {
      setBadges((prev) =>
        prev.map((b) => {
          if (b.id === quiz.badgeRewardId && !b.unlocked) {
            const updated: Badge = {
              ...b,
              unlocked: true,
              unlockedAt: '2026年11月25日',
            };
            newlyUnlockedBadges.push(updated);
            return updated;
          }
          return b;
        })
      );
    }

    // 特別演出条件（5問連続ボーナス / 新規バッジ / ランク昇格 / QR限定正解）
    if (
      isStreakBonus ||
      willRankUp ||
      newlyUnlockedBadges.length > 0 ||
      quiz.isQrSpecial
    ) {
      setCelebration({
        title: willRankUp
          ? 'ゴールドランクへ昇格おめでとう！'
          : isStreakBonus
            ? `${nextStreak}問連続正解ボーナス達成！`
            : 'スペシャルミッション達成！',
        subtitle: quiz.isQrSpecial
          ? '館内QR限定スペシャルクイズを見事クリアしました！'
          : isStreakBonus
            ? '連続学習の努力が実り、ボーナスポイントをゲット！'
            : '新しいデジタルバッジを手に入れました！',
        pointsAdded: earnedPoints,
        newTotalPoints: nextPoints,
        rankUpTo: willRankUp ? 'ゴールド' : undefined,
        unlockedBadges:
          newlyUnlockedBadges.length > 0 ? newlyUnlockedBadges : undefined,
        extraNote: isStreakBonus
          ? `🔥 ${nextStreak}問連続正解達成ボーナス（+10 pt）が含まれています！`
          : undefined,
      });
    }
  };

  // QRスキャン完了時：特別クイズを解放して即出題
  const handleQrScanComplete = () => {
    setIsQrModalOpen(false);
    setQrUnlocked(true);
    setGradeFilter('すべて');
    setGenreFilter('すべて');
    setBookmarkOnly(false);
    setSelectedQuizId('q-qr-1');
  };

  // クーポン使用済み処理
  const handleUseCoupon = (couponId: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === couponId ? { ...c, isUsed: true } : c))
    );
  };

  // ポイント交換処理
  const handleExchangeCoupon = (couponId: string) => {
    const target = coupons.find((c) => c.id === couponId);
    if (!target || target.isOwned || points < target.costPoints) return;

    setPoints((prev) => prev - target.costPoints);
    setCoupons((prev) =>
      prev.map((c) => (c.id === couponId ? { ...c, isOwned: true } : c))
    );
    setActiveCouponModalId(couponId);
  };

  // お気に入りバッジ（最大3つ）の切り替え
  const handleToggleFavoriteBadge = (badgeId: string) => {
    setFavoriteBadgeIds((prev) => {
      if (prev.includes(badgeId)) {
        return prev.filter((id) => id !== badgeId);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), badgeId];
      }
      return [...prev, badgeId];
    });
  };

  // 【デモ用ギミック】受付で入館スキャン（雨の日来館デモ）
  const handleRainyDayCheckIn = () => {
    if (hasCheckedInToday) {
      const rainyBadge = badges.find((b) => b.id === 'rainy-master');
      setCelebration({
        title: '本日の入館チェックイン確認！',
        subtitle: '雨の日ボーナスはすでに受け取り済みです。',
        newTotalPoints: points,
        unlockedBadges: rainyBadge ? [rainyBadge] : undefined,
        stampProgress: {
          current: stamps,
          max: INITIAL_USER_PROFILE.maxStamps,
        },
        extraNote: '本日（2026年11月25日・雨の日ボーナス）の来館記録は登録済みです。',
      });
      return;
    }

    const bonusPt = 20;
    const nextPoints = points + bonusPt;
    const nextStamps = Math.min(INITIAL_USER_PROFILE.maxStamps, stamps + 1);
    const willRankUp =
      rank === 'シルバー' && nextPoints >= INITIAL_USER_PROFILE.goldThreshold;

    setHasCheckedInToday(true);
    setPoints(nextPoints);
    setStamps(nextStamps);
    if (willRankUp) {
      setHasReachedGold(true);
    }

    let unlockedRainyBadge: Badge | undefined;
    setBadges((prev) =>
      prev.map((b) => {
        if (b.id === 'rainy-master') {
          const updated: Badge = {
            ...b,
            unlocked: true,
            unlockedAt: '2026年11月25日',
          };
          unlockedRainyBadge = updated;
          return updated;
        }
        return b;
      })
    );

    setVisitHistory((prev) => [
      {
        id: 'visit-today-rainy',
        date: '2026年11月25日',
        label: '3回目来館（雨の日ボーナス・ポイント2倍）',
        pointsEarned: bonusPt,
        isRainyDay: true,
      },
      ...prev,
    ]);

    setCelebration({
      title: willRankUp
        ? '雨の日チェックイン＆ゴールドランク昇格！'
        : '雨の日チェックイン完了！',
      subtitle:
        '奥州宇宙遊学館へようこそ！雨の日ボーナス特典をすべて獲得しました！',
      pointsAdded: bonusPt,
      newTotalPoints: nextPoints,
      rankUpTo: willRankUp ? 'ゴールド' : undefined,
      unlockedBadges: unlockedRainyBadge ? [unlockedRainyBadge] : undefined,
      stampProgress: {
        current: nextStamps,
        max: INITIAL_USER_PROFILE.maxStamps,
      },
      extraNote:
        '📅 来館履歴に「2026年11月25日・雨の日ボーナス」を追加しました！',
    });
  };

  // 通知の選択（既読化）
  const handleSelectNotification = (id: string) => {
    setSelectedNotificationId(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  // すべて既読にする
  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  // 通知詳細から関連画面へワンクリック遷移
  const handleNavigateFromNotification = (item: NotificationItem) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, isRead: true } : n))
    );
    setActiveTab(item.targetTab);

    if (item.targetTab === 'quiz') {
      setGradeFilter(item.targetGradeFilter ?? 'すべて');
      setGenreFilter(item.targetGenreFilter ?? 'すべて');
      setBookmarkOnly(false);
      if (item.targetQuizId) {
        setSelectedQuizId(item.targetQuizId);
      }
    }
  };

  return (
    <div className="relative min-h-screen text-slate-100">
      <StarfieldBackground />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          unreadCount={unreadCount}
          userName={INITIAL_USER_PROFILE.name}
          gradeLabel={INITIAL_USER_PROFILE.gradeLabel}
          rank={rank}
          points={points}
          onResetDemo={handleResetDemo}
        />

        <main className="mx-auto w-full max-w-[1440px] flex-1 px-5 py-6 lg:px-8">
          {activeTab === 'quiz' && (
            <QuizScreen
              questions={QUIZ_DATA}
              gradeFilter={gradeFilter}
              genreFilter={genreFilter}
              bookmarkOnly={bookmarkOnly}
              onChangeGradeFilter={(grade) => {
                setGradeFilter(grade);
              }}
              onChangeGenreFilter={(genre) => {
                setGenreFilter(genre);
              }}
              onToggleBookmarkOnly={() => setBookmarkOnly((prev) => !prev)}
              selectedQuizId={selectedQuizId}
              onSelectQuizId={setSelectedQuizId}
              bookmarkedIds={bookmarkedIds}
              onToggleBookmark={handleToggleBookmark}
              answeredResults={answeredResults}
              onAnswerQuiz={handleAnswerQuiz}
              qrUnlocked={qrUnlocked}
              onOpenQrScanner={() => setIsQrModalOpen(true)}
              firstInstallCoupon={firstInstallCoupon}
              onOpenCoupon={(coupon) => setActiveCouponModalId(coupon.id)}
              points={points}
              goldThreshold={INITIAL_USER_PROFILE.goldThreshold}
              rank={rank}
              streak={streak}
              correctTotal={correctTotal}
              challengeGoal={INITIAL_USER_PROFILE.challengeGoal}
              ranking={ranking}
            />
          )}

          {activeTab === 'card' && (
            <MemberCardScreen
              memberId={INITIAL_USER_PROFILE.memberId}
              userName={INITIAL_USER_PROFILE.name}
              gradeLabel={INITIAL_USER_PROFILE.gradeLabel}
              rank={rank}
              points={points}
              stamps={stamps}
              maxStamps={INITIAL_USER_PROFILE.maxStamps}
              badges={badges}
              favoriteBadgeIds={favoriteBadgeIds}
              onToggleFavoriteBadge={handleToggleFavoriteBadge}
              coupons={coupons}
              onExchangeCoupon={handleExchangeCoupon}
              onOpenCoupon={(coupon) => setActiveCouponModalId(coupon.id)}
              visitHistory={visitHistory}
              hasCheckedInToday={hasCheckedInToday}
              onRainyDayCheckIn={handleRainyDayCheckIn}
            />
          )}

          {activeTab === 'notifications' && (
            <NotificationsScreen
              notifications={notifications}
              selectedId={selectedNotificationId}
              onSelectNotification={handleSelectNotification}
              onMarkAllRead={handleMarkAllRead}
              onNavigateFromNotification={handleNavigateFromNotification}
            />
          )}
        </main>
      </div>

      {/* 各種モーダル */}
      <QrScannerModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        onScanComplete={handleQrScanComplete}
      />

      <CouponModal
        coupon={activeCouponModal}
        onClose={() => setActiveCouponModalId(null)}
        onUseCoupon={handleUseCoupon}
      />

      <CelebrationModal
        payload={celebration}
        onClose={() => setCelebration(null)}
      />
    </div>
  );
}

export default App;
