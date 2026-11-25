// アプリケーション全体で使用する型定義

export type TabId = 'quiz' | 'card' | 'notifications';

export type GradeFilter =
  | 'すべて'
  | '小学4年（月と星）'
  | '小学6年（月と太陽）'
  | '中学3年（地球と宇宙）';

export type GenreFilter =
  | 'すべて'
  | '宇宙'
  | '星座'
  | '科学'
  | 'イベント限定';

export type Rank = 'シルバー' | 'ゴールド';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  glossaryNote?: string;
  grade: Exclude<GradeFilter, 'すべて'>;
  genre: Exclude<GenreFilter, 'すべて'>;
  difficulty: 1 | 2 | 3;
  exhibitArea: string;
  exhibitTip: string;
  isQrSpecial?: boolean;
  points: number;
  badgeRewardId?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  unlockCondition: string;
  iconKey: 'rocket' | 'sparkles' | 'rain' | 'qr' | 'globe';
  accentColor: 'cyan' | 'purple' | 'sky' | 'amber' | 'emerald';
  unlocked: boolean;
  unlockedAt?: string;
}

export interface VisitRecord {
  id: string;
  date: string;
  label: string;
  pointsEarned: number;
  isRainyDay?: boolean;
}

export interface Coupon {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  costPoints: number;
  code: string;
  isFirstInstall?: boolean;
  isOwned: boolean;
  isUsed: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  summary: string;
  body: string;
  date: string;
  category: 'イベント' | 'お得情報' | '学習記録' | '新着クイズ';
  isRead: boolean;
  actionLabel: string;
  targetTab: TabId;
  targetGradeFilter?: GradeFilter;
  targetGenreFilter?: GenreFilter;
  targetQuizId?: string;
}

export interface RankingUser {
  id: string;
  name: string;
  grade: string;
  correctCount: number;
  isMe?: boolean;
}

export interface CelebrationPayload {
  title: string;
  subtitle: string;
  pointsAdded?: number;
  newTotalPoints?: number;
  rankUpTo?: Rank;
  unlockedBadges?: Badge[];
  stampProgress?: {
    current: number;
    max: number;
  };
  extraNote?: string;
}
