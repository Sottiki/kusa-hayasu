import { beforeEach, describe, expect, it } from "vitest";
import { getMilestoneChecks, saveMilestoneCheck } from "./milestone-store";

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

describe("milestone-store", () => {
	let storage: Storage;

	beforeEach(() => {
		storage = createMockStorage();
	});

	describe("getMilestoneChecks", () => {
		it("空のストレージからは空配列を返す", () => {
			expect(getMilestoneChecks(storage, "habit-1")).toEqual([]);
		});
	});

	describe("saveMilestoneCheck", () => {
		it("マイルストーンチェックを保存できる", () => {
			saveMilestoneCheck(storage, {
				habitId: "habit-1",
				milestone: 7,
				celebratedAt: "2026-02-16T00:00:00.000Z",
			});

			const checks = getMilestoneChecks(storage, "habit-1");
			expect(checks).toHaveLength(1);
			expect(checks[0].milestone).toBe(7);
		});

		it("複数のマイルストーンを保存できる", () => {
			saveMilestoneCheck(storage, {
				habitId: "habit-1",
				milestone: 3,
				celebratedAt: "2026-02-10T00:00:00.000Z",
			});
			saveMilestoneCheck(storage, {
				habitId: "habit-1",
				milestone: 7,
				celebratedAt: "2026-02-16T00:00:00.000Z",
			});

			expect(getMilestoneChecks(storage, "habit-1")).toHaveLength(2);
		});

		it("習慣IDでフィルタリングされる", () => {
			saveMilestoneCheck(storage, {
				habitId: "habit-1",
				milestone: 7,
				celebratedAt: "2026-02-16T00:00:00.000Z",
			});
			saveMilestoneCheck(storage, {
				habitId: "habit-2",
				milestone: 3,
				celebratedAt: "2026-02-10T00:00:00.000Z",
			});

			expect(getMilestoneChecks(storage, "habit-1")).toHaveLength(1);
			expect(getMilestoneChecks(storage, "habit-2")).toHaveLength(1);
		});
	});
});
