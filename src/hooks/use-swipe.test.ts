import { renderHook } from "@testing-library/react";
import { act } from "react";
import { describe, expect, it, vi } from "vitest";
import { useSwipe } from "./use-swipe";

/** タッチイベントのモックを作成するヘルパー */
function makeTouchStart(x: number, y: number) {
	return {
		touches: [{ clientX: x, clientY: y }],
	} as unknown as React.TouchEvent;
}

function makeTouchEnd(x: number, y: number) {
	return {
		changedTouches: [{ clientX: x, clientY: y }],
	} as unknown as React.TouchEvent;
}

describe("useSwipe", () => {
	it("左スワイプでonSwipeLeftが呼ばれる", () => {
		const onSwipeLeft = vi.fn();
		const { result } = renderHook(() => useSwipe({ onSwipeLeft }));

		act(() => {
			result.current.onTouchStart(makeTouchStart(200, 100));
			result.current.onTouchEnd(makeTouchEnd(100, 103)); // dx=-100, dy=3 → 水平
		});

		expect(onSwipeLeft).toHaveBeenCalledOnce();
	});

	it("右スワイプでonSwipeRightが呼ばれる", () => {
		const onSwipeRight = vi.fn();
		const { result } = renderHook(() => useSwipe({ onSwipeRight }));

		act(() => {
			result.current.onTouchStart(makeTouchStart(100, 100));
			result.current.onTouchEnd(makeTouchEnd(200, 103)); // dx=+100, dy=3 → 水平
		});

		expect(onSwipeRight).toHaveBeenCalledOnce();
	});

	it("下スワイプでonSwipeDownが呼ばれる", () => {
		const onSwipeDown = vi.fn();
		const { result } = renderHook(() => useSwipe({ onSwipeDown }));

		act(() => {
			result.current.onTouchStart(makeTouchStart(100, 100));
			result.current.onTouchEnd(makeTouchEnd(103, 200)); // dx=3, dy=+100 → 垂直
		});

		expect(onSwipeDown).toHaveBeenCalledOnce();
	});

	it("上スワイプでonSwipeUpが呼ばれる", () => {
		const onSwipeUp = vi.fn();
		const { result } = renderHook(() => useSwipe({ onSwipeUp }));

		act(() => {
			result.current.onTouchStart(makeTouchStart(100, 200));
			result.current.onTouchEnd(makeTouchEnd(103, 100)); // dx=3, dy=-100 → 垂直
		});

		expect(onSwipeUp).toHaveBeenCalledOnce();
	});

	it("閾値未満のスワイプは無視される", () => {
		const onSwipeLeft = vi.fn();
		const { result } = renderHook(() =>
			useSwipe({ onSwipeLeft, threshold: 50 }),
		);

		act(() => {
			result.current.onTouchStart(makeTouchStart(100, 100));
			result.current.onTouchEnd(makeTouchEnd(70, 100)); // dx=-30 < threshold=50
		});

		expect(onSwipeLeft).not.toHaveBeenCalled();
	});

	it("斜め45度以上のスワイプは垂直方向に判定される", () => {
		const onSwipeDown = vi.fn();
		const onSwipeLeft = vi.fn();
		const { result } = renderHook(() => useSwipe({ onSwipeDown, onSwipeLeft }));

		act(() => {
			result.current.onTouchStart(makeTouchStart(100, 100));
			// dx=-60, dy=+80 → distance=100 > threshold, angle=atan2(80,60)≈53.1° > 45° → 垂直
			result.current.onTouchEnd(makeTouchEnd(40, 180));
		});

		expect(onSwipeDown).toHaveBeenCalledOnce();
		expect(onSwipeLeft).not.toHaveBeenCalled();
	});

	it("斜め45度未満のスワイプは水平方向に判定される", () => {
		const onSwipeLeft = vi.fn();
		const onSwipeDown = vi.fn();
		const { result } = renderHook(() => useSwipe({ onSwipeLeft, onSwipeDown }));

		act(() => {
			result.current.onTouchStart(makeTouchStart(200, 100));
			// dx=-80, dy=+60 → distance=100 > threshold, angle=atan2(60,80)≈36.9° < 45° → 水平
			result.current.onTouchEnd(makeTouchEnd(120, 160));
		});

		expect(onSwipeLeft).toHaveBeenCalledOnce();
		expect(onSwipeDown).not.toHaveBeenCalled();
	});
});
