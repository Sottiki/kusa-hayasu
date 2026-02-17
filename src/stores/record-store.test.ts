import { beforeEach, describe, expect, it } from "vitest";
import { getAllRecords, getRecords, toggleRecord } from "./record-store";

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

describe("record-store", () => {
	let storage: Storage;

	beforeEach(() => {
		storage = createMockStorage();
	});

	describe("getRecords", () => {
		it("空のストレージからは空配列を返す", () => {
			expect(getRecords(storage, "habit-1")).toEqual([]);
		});
	});

	describe("toggleRecord", () => {
		it("新しい記録を作成する（completed=true）", () => {
			const record = toggleRecord(storage, "habit-1", "2026-02-16");

			expect(record.habitId).toBe("habit-1");
			expect(record.date).toBe("2026-02-16");
			expect(record.completed).toBe(true);
			expect(record.id).toBeDefined();
		});

		it("既存の記録をトグルする（true→false）", () => {
			toggleRecord(storage, "habit-1", "2026-02-16");
			const toggled = toggleRecord(storage, "habit-1", "2026-02-16");

			expect(toggled.completed).toBe(false);
		});

		it("取り消し後に再度トグルで復帰する（false→true）", () => {
			toggleRecord(storage, "habit-1", "2026-02-16");
			toggleRecord(storage, "habit-1", "2026-02-16"); // false
			const restored = toggleRecord(storage, "habit-1", "2026-02-16"); // true

			expect(restored.completed).toBe(true);
		});

		it("異なる日付は独立して記録される", () => {
			toggleRecord(storage, "habit-1", "2026-02-15");
			toggleRecord(storage, "habit-1", "2026-02-16");

			const records = getRecords(storage, "habit-1");
			expect(records).toHaveLength(2);
		});

		it("異なる習慣は独立して記録される", () => {
			toggleRecord(storage, "habit-1", "2026-02-16");
			toggleRecord(storage, "habit-2", "2026-02-16");

			expect(getRecords(storage, "habit-1")).toHaveLength(1);
			expect(getRecords(storage, "habit-2")).toHaveLength(1);
		});
	});

	describe("getAllRecords", () => {
		it("全習慣のレコードを取得する", () => {
			toggleRecord(storage, "habit-1", "2026-02-16");
			toggleRecord(storage, "habit-2", "2026-02-16");

			expect(getAllRecords(storage)).toHaveLength(2);
		});
	});
});
