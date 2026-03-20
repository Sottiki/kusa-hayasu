import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useLocalStorage } from "./use-local-storage";
import { useRecordsAll } from "./use-records-all";

const STORAGE_KEY = "kusa-hayasu:records";

describe("useRecordsAll", () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it("初期状態では空配列を返す", () => {
		const { result } = renderHook(() => useRecordsAll());
		expect(result.current.records).toEqual([]);
	});

	it("ストレージにレコードがある場合にそれを返す", () => {
		// useLocalStorage を通じてデータを事前にセットする
		const { result: writer } = renderHook(() =>
			useLocalStorage(STORAGE_KEY, []),
		);

		act(() => {
			writer.current[1]([
				{
					id: "r1",
					habitId: "h1",
					date: "2026-01-01",
					completed: true,
					createdAt: "2026-01-01T00:00:00Z",
				},
			]);
		});

		const { result } = renderHook(() => useRecordsAll());
		expect(result.current.records).toHaveLength(1);
		expect(result.current.records[0].habitId).toBe("h1");
	});
});
