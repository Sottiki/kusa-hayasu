"use client";

import { useCallback, useMemo } from "react";
import { getToday } from "@/lib/date-utils";
import { calculateStreak } from "@/lib/grass-utils";
import type { HabitRecord } from "@/types/habit";
import { useLocalStorage } from "./use-local-storage";

const STORAGE_KEY = "kusa-hayasu:records";

/** 指定した習慣の記録操作を提供するフック */
export function useRecords(habitId: string) {
	const [allRecords, setAllRecords] = useLocalStorage<HabitRecord[]>(
		STORAGE_KEY,
		[],
	);

	// この習慣のレコードのみ
	const records = useMemo(
		() => allRecords.filter((r) => r.habitId === habitId),
		[allRecords, habitId],
	);

	// 連続日数
	const streak = useMemo(
		() => calculateStreak(records, getToday()),
		[records],
	);

	const toggleRecord = useCallback(
		(date: string) => {
			setAllRecords((prev) => {
				const index = prev.findIndex(
					(r) => r.habitId === habitId && r.date === date,
				);
				if (index === -1) {
					// 新規作成
					const record: HabitRecord = {
						id: crypto.randomUUID(),
						habitId,
						date,
						completed: true,
						createdAt: new Date().toISOString(),
					};
					return [...prev, record];
				}
				// トグル
				return prev.map((r, i) =>
					i === index ? { ...r, completed: !r.completed } : r,
				);
			});
		},
		[habitId, setAllRecords],
	);

	const isCompletedOn = useCallback(
		(date: string) => {
			const record = records.find((r) => r.date === date);
			return record?.completed ?? false;
		},
		[records],
	);

	return { records, streak, toggleRecord, isCompletedOn };
}
