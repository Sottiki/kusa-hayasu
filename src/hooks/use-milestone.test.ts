import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useMilestone } from "./use-milestone";

describe("useMilestone", () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it("streak 0 の場合はマイルストーン未達成", () => {
		const { result } = renderHook(() => useMilestone("habit-1", 0));
		expect(result.current.currentMilestone).toBeNull();
		expect(result.current.nextMilestone).toBe(3);
	});

	it("streak 3 で未祝いの場合はマイルストーン3を検出する", () => {
		const { result } = renderHook(() => useMilestone("habit-1", 3));
		expect(result.current.currentMilestone).toBe(3);
		expect(result.current.milestoneMessage).toBeTruthy();
	});

	it("celebrateを呼ぶとマイルストーンが祝い済みになる", () => {
		const { result } = renderHook(() => useMilestone("habit-1", 3));
		expect(result.current.currentMilestone).toBe(3);

		act(() => {
			result.current.celebrate();
		});

		expect(result.current.currentMilestone).toBeNull();
	});

	it("次のマイルストーンを返す", () => {
		const { result } = renderHook(() => useMilestone("habit-1", 5));
		expect(result.current.nextMilestone).toBe(7);
	});
});
