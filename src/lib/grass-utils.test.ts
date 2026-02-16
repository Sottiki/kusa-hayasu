import { describe, expect, it } from "vitest";
import type { HabitRecord } from "@/types/habit";
import { buildGrassGrid, calculateStreak, getGrassLevel } from "./grass-utils";

// テスト用レコード生成ヘルパー
function makeRecord(
	date: string,
	completed = true,
	habitId = "habit-1",
): HabitRecord {
	return {
		id: `record-${date}`,
		habitId,
		date,
		completed,
		createdAt: new Date().toISOString(),
	};
}

describe("calculateStreak", () => {
	it("連続した達成日数を返す", () => {
		const records = [
			makeRecord("2026-02-14"),
			makeRecord("2026-02-15"),
			makeRecord("2026-02-16"),
		];
		expect(calculateStreak(records, "2026-02-16")).toBe(3);
	});

	it("記録がない場合は0を返す", () => {
		expect(calculateStreak([], "2026-02-16")).toBe(0);
	});

	it("今日が未達成でも昨日までの連続を返す（脅迫的にならない設計）", () => {
		const records = [
			makeRecord("2026-02-13"),
			makeRecord("2026-02-14"),
			makeRecord("2026-02-15"),
		];
		// 今日（2/16）は未達成だが、昨日までの連続3日を返す
		expect(calculateStreak(records, "2026-02-16")).toBe(3);
	});

	it("途中に未達成がある場合はそこで途切れる", () => {
		const records = [
			makeRecord("2026-02-12"),
			makeRecord("2026-02-13"),
			// 2/14 は記録なし
			makeRecord("2026-02-15"),
			makeRecord("2026-02-16"),
		];
		expect(calculateStreak(records, "2026-02-16")).toBe(2);
	});

	it("completed=false のレコードは連続に含めない", () => {
		const records = [
			makeRecord("2026-02-14"),
			makeRecord("2026-02-15", false), // 取り消し済み
			makeRecord("2026-02-16"),
		];
		expect(calculateStreak(records, "2026-02-16")).toBe(1);
	});

	it("取り消し（completed=false）があっても過去の連続は保持される", () => {
		// 2/13, 2/14, 2/15 達成後に 2/15 を取り消し
		const records = [
			makeRecord("2026-02-13"),
			makeRecord("2026-02-14"),
			makeRecord("2026-02-15", false),
		];
		// 2/14までの連続2日を返す（脅迫的にならない設計）
		expect(calculateStreak(records, "2026-02-15")).toBe(2);
	});
});

describe("getGrassLevel", () => {
	it("達成済みなら1を返す", () => {
		expect(getGrassLevel(true)).toBe(1);
	});

	it("未達成なら0を返す", () => {
		expect(getGrassLevel(false)).toBe(0);
	});
});

describe("buildGrassGrid", () => {
	it("日付配列とレコードからグリッドデータを生成する", () => {
		const dates = ["2026-02-14", "2026-02-15", "2026-02-16"];
		const records = [makeRecord("2026-02-15"), makeRecord("2026-02-16")];
		const grid = buildGrassGrid(dates, records);

		expect(grid).toHaveLength(3);
		expect(grid[0]).toEqual({ date: "2026-02-14", level: 0 });
		expect(grid[1]).toEqual({ date: "2026-02-15", level: 1 });
		expect(grid[2]).toEqual({ date: "2026-02-16", level: 1 });
	});

	it("空の日付配列の場合は空配列を返す", () => {
		expect(buildGrassGrid([], [])).toEqual([]);
	});

	it("completed=false のレコードはlevel 0になる", () => {
		const dates = ["2026-02-16"];
		const records = [makeRecord("2026-02-16", false)];
		const grid = buildGrassGrid(dates, records);

		expect(grid[0]).toEqual({ date: "2026-02-16", level: 0 });
	});
});