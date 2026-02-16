// 習慣データの型定義

/** お祝いアニメーションのパターン */
export type AnimationPattern = "festival" | "toast" | "grass-burst";

/** 草グラフの表示期間 */
export type ViewPeriod = "1d" | "7d" | "14d" | "31d" | "3mo" | "6mo" | "1yr";

/** 習慣 */
export type Habit = {
	id: string;
	name: string;
	color: string;
	animationPattern: AnimationPattern;
	createdAt: string;
	archivedAt?: string;
	order: number;
};

/** 習慣の記録 */
export type HabitRecord = {
	id: string;
	habitId: string;
	date: string; // YYYY-MM-DD
	completed: boolean;
	createdAt: string;
};

/** マイルストーン達成チェック */
export type MilestoneCheck = {
	habitId: string;
	milestone: number;
	celebratedAt: string;
};