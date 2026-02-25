"use client";

import { useCallback, useRef } from "react";

type UseSwipeOptions = {
	onSwipeLeft?: () => void;
	onSwipeRight?: () => void;
	onSwipeUp?: () => void;
	onSwipeDown?: () => void;
	/** スワイプと認識する最小移動距離（px）。デフォルト: 50 */
	threshold?: number;
};

type UseSwipeResult = {
	onTouchStart: (e: React.TouchEvent) => void;
	onTouchEnd: (e: React.TouchEvent) => void;
};

/**
 * スワイプジェスチャーを検出するフック。
 * atan2 による角度判定で縦横スワイプを正確に区別する（斜め誤認識防止）。
 */
export function useSwipe({
	onSwipeLeft,
	onSwipeRight,
	onSwipeUp,
	onSwipeDown,
	threshold = 50,
}: UseSwipeOptions): UseSwipeResult {
	const touchStart = useRef<{ x: number; y: number } | null>(null);

	const onTouchStart = useCallback((e: React.TouchEvent) => {
		const touch = e.touches[0];
		touchStart.current = { x: touch.clientX, y: touch.clientY };
	}, []);

	const onTouchEnd = useCallback(
		(e: React.TouchEvent) => {
			if (!touchStart.current) return;

			const touch = e.changedTouches[0];
			const dx = touch.clientX - touchStart.current.x;
			const dy = touch.clientY - touchStart.current.y;
			touchStart.current = null;

			const distance = Math.sqrt(dx * dx + dy * dy);
			if (distance < threshold) return;

			// 水平軸からの絶対角度（0°〜90°）で縦横を判定
			const angle = Math.atan2(Math.abs(dy), Math.abs(dx)) * (180 / Math.PI);

			if (angle < 45) {
				// 水平スワイプ
				if (dx > 0) onSwipeRight?.();
				else onSwipeLeft?.();
			} else {
				// 垂直スワイプ
				if (dy > 0) onSwipeDown?.();
				else onSwipeUp?.();
			}
		},
		[threshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown],
	);

	return { onTouchStart, onTouchEnd };
}
