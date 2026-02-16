import { addDays, format, parse, subDays, subMonths, subYears } from "date-fns";
import type { ViewPeriod } from "@/types/habit";

/** DateをYYYY-MM-DD形式の文字列に変換する */
export function formatDateKey(date: Date): string {
	return format(date, "yyyy-MM-dd");
}

/** 今日の日付をYYYY-MM-DD形式で返す */
export function getToday(): string {
	return formatDateKey(new Date());
}

/** YYYY-MM-DD文字列をDateオブジェクトに変換する */
export function parseDate(dateKey: string): Date {
	return parse(dateKey, "yyyy-MM-dd", new Date());
}

/** 開始日から終了日までの日付キー配列を返す（両端含む） */
export function getDatesInRange(start: Date, end: Date): string[] {
	const dates: string[] = [];
	let current = start;
	while (current <= end) {
		dates.push(formatDateKey(current));
		current = addDays(current, 1);
	}
	return dates;
}

/** 表示期間に対応する開始日・終了日を計算する */
export function getViewPeriodRange(
	period: ViewPeriod,
	referenceDate?: Date,
): { start: Date; end: Date } {
	const end = referenceDate ?? new Date();

	const periodToStart: Record<ViewPeriod, () => Date> = {
		"1d": () => end,
		"7d": () => subDays(end, 6),
		"14d": () => subDays(end, 13),
		"31d": () => subDays(end, 30),
		"3mo": () => subMonths(end, 3),
		"6mo": () => subMonths(end, 6),
		"1yr": () => subYears(end, 1),
	};

	return { start: periodToStart[period](), end };
}
