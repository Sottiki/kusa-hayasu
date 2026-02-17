import { beforeEach, describe, expect, it } from "vitest";
import type { Habit } from "@/types/habit";
import {
	addHabit,
	archiveHabit,
	deleteHabit,
	getHabits,
	saveHabits,
	updateHabit,
} from "./habit-store";

// インメモリStorageモック
function createMockStorage(): Storage {
	const store = new Map<string, string>();
	return {
		getItem: (key: string) => store.get(key) ?? null,
		setItem: (key: string, value: string) => store.set(key, value),
		removeItem: (key: string) => store.delete(key),
		clear: () => store.clear(),
		get length() {
			return store.size;
		},
		key: (index: number) => [...store.keys()][index] ?? null,
	};
}

describe("habit-store", () => {
	let storage: Storage;

	beforeEach(() => {
		storage = createMockStorage();
	});

	describe("getHabits / saveHabits", () => {
		it("空のストレージからは空配列を返す", () => {
			expect(getHabits(storage)).toEqual([]);
		});

		it("保存した習慣を取得できる", () => {
			const habits: Habit[] = [
				{
					id: "1",
					name: "読書",
					color: "#4CAF50",
					animationPattern: "festival",
					createdAt: "2026-01-01T00:00:00.000Z",
					order: 0,
				},
			];
			saveHabits(storage, habits);
			expect(getHabits(storage)).toEqual(habits);
		});
	});

	describe("addHabit", () => {
		it("新しい習慣を追加してIDとcreatedAtが自動設定される", () => {
			const habit = addHabit(storage, {
				name: "運動",
				color: "#2196F3",
				animationPattern: "toast",
			});

			expect(habit.id).toBeDefined();
			expect(habit.name).toBe("運動");
			expect(habit.color).toBe("#2196F3");
			expect(habit.animationPattern).toBe("toast");
			expect(habit.createdAt).toBeDefined();
			expect(habit.order).toBe(0);
			expect(habit.archivedAt).toBeUndefined();

			const all = getHabits(storage);
			expect(all).toHaveLength(1);
		});

		it("2つ目の習慣のorderは1になる", () => {
			addHabit(storage, {
				name: "読書",
				color: "#4CAF50",
				animationPattern: "festival",
			});
			const second = addHabit(storage, {
				name: "運動",
				color: "#2196F3",
				animationPattern: "toast",
			});

			expect(second.order).toBe(1);
			expect(getHabits(storage)).toHaveLength(2);
		});
	});

	describe("updateHabit", () => {
		it("習慣の名前を更新できる", () => {
			const habit = addHabit(storage, {
				name: "読書",
				color: "#4CAF50",
				animationPattern: "festival",
			});

			const updated = updateHabit(storage, habit.id, { name: "毎日読書" });
			expect(updated.name).toBe("毎日読書");
			expect(updated.color).toBe("#4CAF50"); // 変更なし
		});

		it("存在しないIDの場合はエラーを投げる", () => {
			expect(() =>
				updateHabit(storage, "nonexistent", { name: "test" }),
			).toThrow();
		});
	});

	describe("archiveHabit", () => {
		it("習慣をアーカイブできる", () => {
			const habit = addHabit(storage, {
				name: "読書",
				color: "#4CAF50",
				animationPattern: "festival",
			});

			archiveHabit(storage, habit.id);

			const all = getHabits(storage);
			expect(all[0].archivedAt).toBeDefined();
		});
	});

	describe("deleteHabit", () => {
		it("習慣を削除できる", () => {
			const habit = addHabit(storage, {
				name: "読書",
				color: "#4CAF50",
				animationPattern: "festival",
			});

			deleteHabit(storage, habit.id);
			expect(getHabits(storage)).toHaveLength(0);
		});

		it("他の習慣に影響しない", () => {
			const h1 = addHabit(storage, {
				name: "読書",
				color: "#4CAF50",
				animationPattern: "festival",
			});
			addHabit(storage, {
				name: "運動",
				color: "#2196F3",
				animationPattern: "toast",
			});

			deleteHabit(storage, h1.id);

			const remaining = getHabits(storage);
			expect(remaining).toHaveLength(1);
			expect(remaining[0].name).toBe("運動");
		});
	});
});
