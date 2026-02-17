import type { HabitRecord } from "@/types/habit";

/** 草グラフの1セルのデータ */
export type GrassCell = {
	date: string;
	level: number; // Phase 1 では 0（未達成）または 1（達成）
};

/**
 * 現在の連続達成日数を計算する。
 * 脅迫的にならない設計: 今日が未達成でも昨日までの連続を返す。
 * completed=false のレコードは連続に含めない。
 */
export function calculateStreak(
	records: HabitRecord[],
	referenceDate: string,
): number {
	// 達成済みの日付をSetに変換（高速検索用）
	const completedDates = new Set(
		records.filter((r) => r.completed).map((r) => r.date),
	);

	// 基準日から遡って連続日数を数える
	// 基準日が未達成の場合は1日前から開始（脅迫的にならない設計）
	const [year, month, day] = referenceDate.split("-").map(Number);
	let current = new Date(year, month - 1, day);

	if (!completedDates.has(referenceDate)) {
		current = new Date(current.getTime() - 86400000); // 1日前
	}

	let streak = 0;
	while (true) {
		const key = formatKey(current);
		if (!completedDates.has(key)) {
			break;
		}
		streak++;
		current = new Date(current.getTime() - 86400000); // 1日前
	}

	return streak;
}

/** 達成状態から草レベルを返す（Phase 1 は 0 or 1） */
export function getGrassLevel(completed: boolean): number {
	return completed ? 1 : 0;
}

/** 日付配列とレコードからグリッドデータを生成する */
export function buildGrassGrid(
	dates: string[],
	records: HabitRecord[],
): GrassCell[] {
	// 日付 → 達成状態のマップを作成
	const recordMap = new Map<string, boolean>();
	for (const record of records) {
		recordMap.set(record.date, record.completed);
	}

	return dates.map((date) => ({
		date,
		level: getGrassLevel(recordMap.get(date) ?? false),
	}));
}

/** DateオブジェクトをYYYY-MM-DD形式に変換（内部用） */
function formatKey(date: Date): string {
	const y = date.getFullYear();
	const m = String(date.getMonth() + 1).padStart(2, "0");
	const d = String(date.getDate()).padStart(2, "0");
	return `${y}-${m}-${d}`;
}
