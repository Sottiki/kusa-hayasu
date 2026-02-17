import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useHabits } from "./use-habits";

describe("useHabits", () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it("初期状態では空の配列を返す", () => {
		const { result } = renderHook(() => useHabits());
		expect(result.current.habits).toEqual([]);
		expect(result.current.archivedHabits).toEqual([]);
	});

	it("習慣を追加できる", () => {
		const { result } = renderHook(() => useHabits());

		act(() => {
			result.current.addHabit({
				name: "読書",
				color: "#4CAF50",
				animationPattern: "festival",
			});
		});

		expect(result.current.habits).toHaveLength(1);
		expect(result.current.habits[0].name).toBe("読書");
	});

	it("習慣を更新できる", () => {
		const { result } = renderHook(() => useHabits());

		act(() => {
			result.current.addHabit({
				name: "読書",
				color: "#4CAF50",
				animationPattern: "festival",
			});
		});

		const habitId = result.current.habits[0].id;

		act(() => {
			result.current.updateHabit(habitId, { name: "毎日読書" });
		});

		expect(result.current.habits[0].name).toBe("毎日読書");
	});

	it("習慣をアーカイブするとarchivedHabitsに移動する", () => {
		const { result } = renderHook(() => useHabits());

		act(() => {
			result.current.addHabit({
				name: "読書",
				color: "#4CAF50",
				animationPattern: "festival",
			});
		});

		const habitId = result.current.habits[0].id;

		act(() => {
			result.current.archiveHabit(habitId);
		});

		expect(result.current.habits).toHaveLength(0);
		expect(result.current.archivedHabits).toHaveLength(1);
	});

	it("習慣を削除できる", () => {
		const { result } = renderHook(() => useHabits());

		act(() => {
			result.current.addHabit({
				name: "読書",
				color: "#4CAF50",
				animationPattern: "festival",
			});
		});

		const habitId = result.current.habits[0].id;

		act(() => {
			result.current.deleteHabit(habitId);
		});

		expect(result.current.habits).toHaveLength(0);
		expect(result.current.archivedHabits).toHaveLength(0);
	});
});
