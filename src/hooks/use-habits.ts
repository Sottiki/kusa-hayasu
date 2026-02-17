"use client";

import { useCallback, useMemo } from "react";
import type { AnimationPattern, Habit } from "@/types/habit";
import { useLocalStorage } from "./use-local-storage";

const STORAGE_KEY = "kusa-hayasu:habits";

/** 習慣のCRUD操作を提供するフック */
export function useHabits() {
	const [allHabits, setAllHabits] = useLocalStorage<Habit[]>(
		STORAGE_KEY,
		[],
	);

	// アクティブな習慣（archivedAtがundefined）
	const habits = useMemo(
		() =>
			allHabits
				.filter((h) => !h.archivedAt)
				.sort((a, b) => a.order - b.order),
		[allHabits],
	);

	// アーカイブ済みの習慣
	const archivedHabits = useMemo(
		() => allHabits.filter((h) => h.archivedAt),
		[allHabits],
	);

	const addHabit = useCallback(
		(data: {
			name: string;
			color: string;
			animationPattern: AnimationPattern;
		}): Habit => {
			const maxOrder =
				allHabits.length > 0
					? Math.max(...allHabits.map((h) => h.order)) + 1
					: 0;
			const habit: Habit = {
				id: crypto.randomUUID(),
				name: data.name,
				color: data.color,
				animationPattern: data.animationPattern,
				createdAt: new Date().toISOString(),
				order: maxOrder,
			};
			setAllHabits((prev) => [...prev, habit]);
			return habit;
		},
		[allHabits, setAllHabits],
	);

	const updateHabit = useCallback(
		(
			id: string,
			updates: Partial<Pick<Habit, "name" | "color" | "animationPattern">>,
		) => {
			setAllHabits((prev) =>
				prev.map((h) => (h.id === id ? { ...h, ...updates } : h)),
			);
		},
		[setAllHabits],
	);

	const archiveHabit = useCallback(
		(id: string) => {
			setAllHabits((prev) =>
				prev.map((h) =>
					h.id === id
						? { ...h, archivedAt: new Date().toISOString() }
						: h,
				),
			);
		},
		[setAllHabits],
	);

	const deleteHabit = useCallback(
		(id: string) => {
			setAllHabits((prev) => prev.filter((h) => h.id !== id));
		},
		[setAllHabits],
	);

	return {
		habits,
		archivedHabits,
		addHabit,
		updateHabit,
		archiveHabit,
		deleteHabit,
	};
}
