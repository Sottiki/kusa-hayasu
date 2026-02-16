import { describe, expect, it } from "vitest";
import {
	formatDateKey,
	getDatesInRange,
	getToday,
	getViewPeriodRange,
	parseDate,
} from "./date-utils";

describe("formatDateKey", () => {
	it("日付をYYYY-MM-DD形式に変換する", () => {
		expect(formatDateKey(new Date(2026, 0, 5))).toBe("2026-01-05");
		expect(formatDateKey(new Date(2026, 11, 31))).toBe("2026-12-31");
	});

	it("1桁の月日をゼロ埋めする", () => {
		expect(formatDateKey(new Date(2026, 0, 1))).toBe("2026-01-01");
	});
});

describe("getToday", () => {
	it("今日の日付をYYYY-MM-DD形式で返す", () => {
		const today = getToday();
		expect(today).toMatch(/^\d{4}-\d{2}-\d{2}$/);
	});
});

describe("parseDate", () => {
	it("YYYY-MM-DD文字列をDateオブジェクトに変換する", () => {
		const date = parseDate("2026-03-15");
		expect(date.getFullYear()).toBe(2026);
		expect(date.getMonth()).toBe(2); // 0-indexed
		expect(date.getDate()).toBe(15);
	});
});

describe("getDatesInRange", () => {
	it("開始日から終了日までの日付キー配列を返す", () => {
		const result = getDatesInRange(
			new Date(2026, 0, 1),
			new Date(2026, 0, 3),
		);
		expect(result).toEqual(["2026-01-01", "2026-01-02", "2026-01-03"]);
	});

	it("同じ日付の場合は1要素の配列を返す", () => {
		const result = getDatesInRange(
			new Date(2026, 0, 1),
			new Date(2026, 0, 1),
		);
		expect(result).toEqual(["2026-01-01"]);
	});

	it("月をまたぐ範囲を正しく処理する", () => {
		const result = getDatesInRange(
			new Date(2026, 0, 30),
			new Date(2026, 1, 2),
		);
		expect(result).toEqual([
			"2026-01-30",
			"2026-01-31",
			"2026-02-01",
			"2026-02-02",
		]);
	});
});

describe("getViewPeriodRange", () => {
	const reference = new Date(2026, 1, 16); // 2026-02-16

	it("1dの場合は今日のみ", () => {
		const { start, end } = getViewPeriodRange("1d", reference);
		expect(formatDateKey(start)).toBe("2026-02-16");
		expect(formatDateKey(end)).toBe("2026-02-16");
	});

	it("7dの場合は過去7日間", () => {
		const { start, end } = getViewPeriodRange("7d", reference);
		expect(formatDateKey(start)).toBe("2026-02-10");
		expect(formatDateKey(end)).toBe("2026-02-16");
	});

	it("14dの場合は過去14日間", () => {
		const { start, end } = getViewPeriodRange("14d", reference);
		expect(formatDateKey(start)).toBe("2026-02-03");
		expect(formatDateKey(end)).toBe("2026-02-16");
	});

	it("31dの場合は過去31日間", () => {
		const { start, end } = getViewPeriodRange("31d", reference);
		expect(formatDateKey(start)).toBe("2026-01-17");
		expect(formatDateKey(end)).toBe("2026-02-16");
	});

	it("3moの場合は過去3ヶ月", () => {
		const { start, end } = getViewPeriodRange("3mo", reference);
		expect(formatDateKey(start)).toBe("2025-11-16");
		expect(formatDateKey(end)).toBe("2026-02-16");
	});

	it("6moの場合は過去6ヶ月", () => {
		const { start, end } = getViewPeriodRange("6mo", reference);
		expect(formatDateKey(start)).toBe("2025-08-16");
		expect(formatDateKey(end)).toBe("2026-02-16");
	});

	it("1yrの場合は過去1年", () => {
		const { start, end } = getViewPeriodRange("1yr", reference);
		expect(formatDateKey(start)).toBe("2025-02-16");
		expect(formatDateKey(end)).toBe("2026-02-16");
	});
});
