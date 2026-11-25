import type {
  Badge,
  Coupon,
  NotificationItem,
  QuizQuestion,
  RankingUser,
  VisitRecord,
} from '../types';

// 初期ユーザー設定
export const INITIAL_USER_PROFILE = {
  memberId: 'OSHU-2026-0514',
  name: '星野 太郎',
  gradeLabel: '小学5年生',
  initialPoints: 90,
  goldThreshold: 100,
  initialStreak: 4,
  initialCorrectTotal: 42,
  challengeGoal: 100,
  initialStamps: 3,
  maxStamps: 5,
};

// 初期デジタルバッジ一覧（獲得済2個・未獲得3個）
export const INITIAL_BADGES: Badge[] = [
  {
    id: 'first-study',
    name: 'はじめての宇宙学習',
    description: '最初の宇宙クイズに挑戦して正解した記念バッジ！',
    unlockCondition: '宇宙クイズに1問正解する',
    iconKey: 'rocket',
    accentColor: 'cyan',
    unlocked: true,
    unlockedAt: '2026年10月12日',
  },
  {
    id: 'constellation-beginner',
    name: '星座ビギナー',
    description: '季節の星座のひみつを見つけた星見の第一歩！',
    unlockCondition: '星座ジャンルのクイズに正解する',
    iconKey: 'sparkles',
    accentColor: 'purple',
    unlocked: true,
    unlockedAt: '2026年11月3日',
  },
  {
    id: 'rainy-master',
    name: '雨の日来館マスター',
    description: '雨の日でも宇宙の冒険にやってきた熱心な探検家！',
    unlockCondition: '雨の日ボーナスデーに遊学館へチェックインする',
    iconKey: 'rain',
    accentColor: 'sky',
    unlocked: false,
  },
  {
    id: 'qr-hunter',
    name: '展示QRハンター',
    description: '館内の展示パネルに隠されたQRクイズを見事クリア！',
    unlockCondition: '館内展示QRスキャンで解放される特別クイズに正解する',
    iconKey: 'qr',
    accentColor: 'amber',
    unlocked: false,
  },
  {
    id: 'solar-master',
    name: '太陽系博士',
    description: '太陽や惑星のしくみをマスターした宇宙博士の証！',
    unlockCondition: '太陽系・惑星に関するクイズ（難易度★★以上）に正解する',
    iconKey: 'globe',
    accentColor: 'emerald',
    unlocked: false,
  },
];

// 初期お気に入りバッジID（会員証に飾る用・最大3つ）
export const INITIAL_FAVORITE_BADGE_IDS: string[] = [
  'first-study',
  'constellation-beginner',
];

// 初期来館履歴
export const INITIAL_VISIT_HISTORY: VisitRecord[] = [
  {
    id: 'visit-2',
    date: '2026年11月3日',
    label: '2回目来館（文化の日 特別プラネタリウム）',
    pointsEarned: 15,
  },
  {
    id: 'visit-1',
    date: '2026年10月12日',
    label: '初回来館（新規会員登録ボーナス）',
    pointsEarned: 30,
  },
];

// 初期クーポン＆ポイント交換特典
export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'coupon-first-install',
    title: '入館料 20%OFF クーポン（親子利用可）',
    subtitle: '初回インストール特典',
    description:
      '受付でスタッフにこの画面を見せると、ご本人様と同伴のご家族の入館料が20%割引になります。',
    costPoints: 0,
    code: 'OSHU-WELCOME-20',
    isFirstInstall: true,
    isOwned: true,
    isUsed: false,
  },
  {
    id: 'coupon-postcard',
    title: 'オリジナル宇宙ポストカード引換券',
    subtitle: '50 pt で交換できる特典',
    description:
      '奥州宇宙遊学館オリジナルの美しい星空・銀河ポストカード（非売品）1枚と交換できます。',
    costPoints: 50,
    code: 'OSHU-CARD-050',
    isOwned: false,
    isUsed: false,
  },
  {
    id: 'coupon-planetarium',
    title: 'プラネタリウム特別観覧 割引券',
    subtitle: '100 pt で交換できる特典',
    description:
      '週末やイベント時の特別投映プログラムの観覧料が半額になるスペシャルチケットです。',
    costPoints: 100,
    code: 'OSHU-PLANET-100',
    isOwned: false,
    isUsed: false,
  },
  {
    id: 'coupon-keyholder',
    title: '電波望遠鏡 ミニキーホルダー引換券',
    subtitle: '150 pt で交換できる特典',
    description:
      '国立天文台水沢の電波望遠鏡をモチーフにした限定グッズを受付でお渡しします。',
    costPoints: 150,
    code: 'OSHU-VERA-150',
    isOwned: false,
    isUsed: false,
  },
];

// 館内ユーザー正解数ランキング（星野 太郎以外はライバルユーザー）
export const INITIAL_RIVAL_USERS: RankingUser[] = [
  { id: 'u1', name: 'あかり（中1）', grade: '中学1年生', correctCount: 68 },
  { id: 'u2', name: 'こうき（小6）', grade: '小学6年生', correctCount: 54 },
  { id: 'u3', name: 'みなと（小5）', grade: '小学5年生', correctCount: 43 },
  { id: 'u4', name: 'ゆい（小4）', grade: '小学4年生', correctCount: 36 },
];

// お知らせ・イベント通知（初期状態：未読2件・既読2件）
export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: '【今週末開催】ペルセウス座流星群 特別観望会＆限定クイズ配信中！',
    summary: '大きな望遠鏡で流れ星を探そう！参加前の予習にイベント限定クイズを公開中。',
    body: '今週末の土曜日19:00から、奥州宇宙遊学館の屋上広場で「ペルセウス座流星群 特別観望会」を開催します！曇りや雨の日はプラネタリウム室で「流れ星のひみつ解説」を実施。いまアプリではイベント限定クイズを配信中です。予習してクリアすると特別ポイント10ptがもらえます！',
    date: '2026年11月25日 10:00',
    category: 'イベント',
    isRead: false,
    actionLabel: 'イベント限定クイズに挑戦する',
    targetTab: 'quiz',
    targetGenreFilter: 'イベント限定',
    targetQuizId: 'q-event-perseids',
  },
  {
    id: 'notif-2',
    title: '☔ 本日は雨の日ポイント2倍デー！遊学館へ遊びに行こう',
    summary: '雨の日に来館チェックインすると通常10ptのところ20pt＋限定バッジがもらえる！',
    body: '今日はあいにくの雨模様ですが、奥州宇宙遊学館の中はワクワクする宇宙の展示でいっぱい！本日中に受付でデジタル会員証をスキャンすると、雨の日ボーナスで来館ポイントが2倍（+20pt）になり、さらに限定デジタルバッジ「雨の日来館マスター」が手に入ります！',
    date: '2026年11月25日 09:00',
    category: 'お得情報',
    isRead: false,
    actionLabel: 'デジタル会員証でチェックインする',
    targetTab: 'card',
  },
  {
    id: 'notif-3',
    title: '🔥 連続学習記録が4日目に到達しました！あと1日でボーナスポイント',
    summary: '5問連続正解するとボーナス+10ptをプレゼント！今日のクイズにチャレンジしよう。',
    body: '星野 太郎さん、素晴らしいペースです！現在4問連続でクイズに正解しています。あと1問連続で正解すると「5問連続ボーナス」として+10ptがすぐにもらえます。学校の理科の復習も兼ねて挑戦してみよう！',
    date: '2026年11月24日 17:30',
    category: '学習記録',
    isRead: true,
    actionLabel: 'クイズ画面へ移動する',
    targetTab: 'quiz',
  },
  {
    id: 'notif-4',
    title: '🎓 理科の予習に！「小学4年・月と星／小学6年・月と太陽」の新作クイズを追加しました',
    summary: '授業で習う月の満ち欠けや星座の動きをクイズで楽しくチェックできます。',
    body: '学校で習う理科単元に連動した新しい4択クイズを追加しました！「月が光って見える理由」や「星の色と温度の関係」など、遊学館の展示とつながる問題ばかりです。学年フィルターを使って自分の学年や気になる単元を選んでみてね！',
    date: '2026年11月20日 12:00',
    category: '新着クイズ',
    isRead: true,
    actionLabel: '小学4年・6年のクイズを見る',
    targetTab: 'quiz',
    targetGradeFilter: '小学4年（月と星）',
  },
];

// クイズデータ（通常6問 + イベント限定1問 + 館内QR限定2問 = 合計9問）
export const QUIZ_DATA: QuizQuestion[] = [
  {
    id: 'q-1',
    question:
      '太陽系の中で、いちばん大きい惑星（太陽のまわりを回る星）は次のうちどれでしょう？',
    options: ['土星（どせい）', '木星（もくせい）', '火星（かせい）', '地球（ちきゅう）'],
    correctIndex: 1,
    explanation:
      '正解は「木星（もくせい）」です！木星の大きさは地球の約11倍もあり、太陽系の惑星の中でダントツの1位。ほとんどがガスでできていて、表面に「大赤斑（だいせきはん）」という巨大な台風のようなうずまきがあります。',
    glossaryNote: '惑星（わくせい）：太陽などの恒星のまわりを回っている星のこと。',
    grade: '小学6年（月と太陽）',
    genre: '宇宙',
    difficulty: 2,
    exhibitArea: '2階 太陽系・惑星コーナー',
    exhibitTip:
      '『実物大・惑星重さ体験』と惑星モデルを見比べて、地球と木星の大きさや重力の違いを体感しよう！',
    points: 5,
    badgeRewardId: 'solar-master',
  },
  {
    id: 'q-2',
    question:
      '夜空に光る星にはいろいろな色がありますが、温度がいちばん高い星は何色に光って見えるでしょう？',
    options: ['赤色', '黄色', '青白色（あおしろいろ）', '緑色'],
    correctIndex: 2,
    explanation:
      '正解は「青白色（あおしろいろ）」です！ガスコンロの炎を思い出してみよう。赤い炎よりも青い炎の方がずっと高温なのと同じで、星も温度が高いほど青白く、温度が低いと赤っぽく光ります。',
    glossaryNote: '表面温度：青白い星は1万℃以上、太陽のような黄色い星は約6,000℃、赤い星は約3,000℃です。',
    grade: '小学4年（月と星）',
    genre: '星座',
    difficulty: 1,
    exhibitArea: '1階 プラネタリウム・星空シアター',
    exhibitTip:
      '冬の星座オリオン座の「リゲル（青白）」と「ベテルギウス（赤）」の色をプラネタリウムの星空で探し比べてみよう！',
    points: 5,
  },
  {
    id: 'q-3',
    question:
      '月が太陽と同じように明るく光って見えるのは、なぜでしょう？',
    options: [
      '月自身が太陽のように燃えて光っているから',
      '太陽の光を反射（はんしゃ）して光っているから',
      '地球の電気の明かりが月に当たっているから',
      '月の表面の氷が自分で発光しているから',
    ],
    correctIndex: 1,
    explanation:
      '正解は「太陽の光を反射して光っているから」です！月は自分では光を出していません。太陽に照らされた半分だけが明るく見え、地球から見る角度が変わることで三日月や満月などの「満ち欠け」が起きます。',
    glossaryNote: '満ち欠け（みちかけ）：地球のまわりを月が回ることで、光って見える形が変わること。',
    grade: '小学6年（月と太陽）',
    genre: '宇宙',
    difficulty: 1,
    exhibitArea: '2階 月と地球のサイエンスエリア',
    exhibitTip:
      '『月の満ち欠けモデル』のハンドルを回して、太陽・地球・月の位置で形がどう変わるか実験してみよう！',
    points: 5,
  },
  {
    id: 'q-4',
    question:
      '北の空でほとんど動かずにじっと同じ場所に見える、方角を知るための目印になる星はどれでしょう？',
    options: ['シリウス', 'ベガ（おりひめ星）', '北極星（ほっきょくせい）', 'アルタイル（ひこ星）'],
    correctIndex: 2,
    explanation:
      '正解は「北極星（ほっきょくせい）」です！地球がまわる軸（地軸）のちょうど延長線上に北極星があるため、他の星が時間とともに動いて見える中でも、北極星だけはほとんど動かず真北を示してくれます。',
    glossaryNote: '日周運動（にっしゅううんどう）：地球の自転によって、星が1日に1回転して見える動き。',
    grade: '小学4年（月と星）',
    genre: '星座',
    difficulty: 2,
    exhibitArea: '1階 星座早見・天体ドーム前',
    exhibitTip:
      'カシオペヤ座や北斗七星から北極星を見つける『星座探しタッチパネル』にチャレンジしてみよう！',
    points: 5,
  },
  {
    id: 'q-5',
    question:
      '天の川銀河の中心などにもあり、光さえも外に出られないほど強い重力（引きよせる力）をもつ天体を何というでしょう？',
    options: ['ブラックホール', 'ホワイトドワーフ', '流星群', '人工衛星'],
    correctIndex: 0,
    explanation:
      '正解は「ブラックホール」です！とても重い星が一生を終えるときなどに誕生し、まわりにあるガスや光までも飲みこんでしまいます。実は奥州の電波望遠鏡「VERA（ベラ）」も参加した国際チームが、史上初めてブラックホールの撮影に成功しました！',
    glossaryNote: '重力（じゅうりょく）：ものどうしが引き合う力。星が重く小さくぎゅっと縮むと重力はとてつもなく強くなります。',
    grade: '中学3年（地球と宇宙）',
    genre: '科学',
    difficulty: 3,
    exhibitArea: '2階 奥州と電波天文学・VERAコーナー',
    exhibitTip:
      '世界で初めて撮影されたブラックホールの画像展示と、奥州の電波望遠鏡模型を見てみよう！',
    points: 5,
  },
  {
    id: 'q-6',
    question:
      '奥州宇宙遊学館の敷地にある旧緯度観測所で、初代所長の木村栄（きむら ひさし）博士が発見した地球のゆれを表す有名な数式項は何でしょう？',
    options: ['X項（エックスこう）', 'Z項（ゼットこう）', 'Ω項（オメガこう）', 'α項（アルファこう）'],
    correctIndex: 1,
    explanation:
      '正解は「Z項（ゼットこう）」です！今から120年以上前、明治時代の岩手県水沢（今の奥州市）で天体観測を続けた木村栄博士は、世界の科学者が不思議がっていた観測データのズレを説明する「Z項」を発見し、世界中の天文学者を驚かせました！',
    glossaryNote: '緯度観測所（いどかんそくじょ）：地球の回転軸のわずかなふらつきを星の位置から精密に測るための施設。',
    grade: '中学3年（地球と宇宙）',
    genre: '科学',
    difficulty: 3,
    exhibitArea: '1階 木村栄博士・緯度観測所メモリアルホール',
    exhibitTip:
      '木村博士が実際に使っていた歴史的な望遠鏡や直筆ノートを1階の展示室で見学しよう！',
    points: 5,
  },
  {
    id: 'q-event-perseids',
    question:
      '【観望会イベント限定】ペルセウス座流星群の「流れ星」は、宇宙に漂う小さなチリが地球の何にぶつかって光っているでしょう？',
    options: [
      '地球の海の水',
      '地球の大気（空気の層）',
      '月の重力波',
      '人工衛星のソーラーパネル',
    ],
    correctIndex: 1,
    explanation:
      '正解は「地球の大気（空気の層）」です！すい星がまき散らした数ミリほどの小さなチリが、ものすごいスピードで地球の空気の層に飛びこむと、空気とすれ合って高温になり、一瞬で輝きを放って「流れ星」として見えます！',
    glossaryNote: '流星群（りゅうせいぐん）：決まった時期にたくさんの流れ星が1つの星座の方向から飛び出すように見える現象。',
    grade: '小学4年（月と星）',
    genre: 'イベント限定',
    difficulty: 2,
    exhibitArea: '屋上天体観測広場 ＆ 1階 プラネタリウム',
    exhibitTip:
      '今週末の「ペルセウス座流星群 特別観望会」に参加して、本物の夜空とプラネタリウムの両方で流れ星を観察しよう！',
    points: 10,
  },
  {
    id: 'q-qr-1',
    question:
      '【館内QR限定スペシャル】国立天文台水沢の電波望遠鏡「VERA（ベラ）」は、日本の4か所の望遠鏡をつなぐことで直径およそ何kmの巨大な望遠鏡と同じ視力（解像度）を出しているでしょう？',
    options: ['約20 km', '約200 km', '約2,300 km', '約38万 km'],
    correctIndex: 2,
    explanation:
      '大正解！！答えは「約2,300 km」です！岩手（水沢）・東京（小笠原）・鹿児島（入来）・沖縄（石垣島）の4か所にある直径20mの望遠鏡を同時につなぐ「VLBI」という技術で、なんと北海道から沖縄までの距離に匹敵する超視力を実現しています！',
    glossaryNote: '超長基線電波干渉法（VLBI）：離れた場所の電波望遠鏡を連動させ、1つの巨大望遠鏡のように精密観測する技術。',
    grade: '中学3年（地球と宇宙）',
    genre: '科学',
    difficulty: 3,
    exhibitArea: '2階 国立天文台水沢・VERA電波望遠鏡ギャラリー',
    exhibitTip:
      '展示パネル横にある実物写真と「視力600万！（月から1円玉が見えるレベル）」の解説ボードをチェックしよう！',
    isQrSpecial: true,
    points: 20,
    badgeRewardId: 'qr-hunter',
  },
  {
    id: 'q-qr-2',
    question:
      '【館内QR限定スペシャル】月の重さは地球の約6分の1です。もし地球で体重が30kgの小学生が月に行くと、体重計の針は何kgを指すでしょう？',
    options: ['約5 kg', '約15 kg', '約30 kg', '約180 kg'],
    correctIndex: 0,
    explanation:
      '大正解！！答えは「約5 kg」です！月の重力は地球の約6分の1なので、30kg ÷ 6 ＝ 約5kg の軽さに感じます。そのため月面では地球の6倍近く高くジャンプできるんですよ！',
    glossaryNote: '質量と重さ：体そのものの量（質量）は変わりませんが、星が引く力（重さ）は星ごとに変わります。',
    grade: '小学6年（月と太陽）',
    genre: '宇宙',
    difficulty: 2,
    exhibitArea: '2階 太陽系・惑星コーナー『惑星重さ体験ブース』',
    exhibitTip:
      '目の前にある「木星・火星・月のペットボトル重さ体験」を持ち上げて、5kgと地球の30kgの違いを腕で感じてみよう！',
    isQrSpecial: true,
    points: 20,
    badgeRewardId: 'qr-hunter',
  },
];
