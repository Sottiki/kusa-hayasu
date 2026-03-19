"use client";

import { useMemo } from "react";
import { MiniGraph } from "@/components/graph/mini-graph";
import {
	getDatesInRange,
	getToday,
	getViewPeriodRange,
} from "@/lib/date-utils";
import { buildGrassGrid, calculateStreak } from "@/lib/grass-utils";
import type { Habit, HabitRecord } from "@/types/habit";

type ActivityListProps = {
	habits: Habit[];
	records: HabitRecord[];
	today?: string;
};

type HabitActivity = {
	habit: Habit;
	streak: number;
	cells: ReturnType<typeof buildGrassGrid>;
};

/** アクティビティ一覧 — 全習慣のミニグラフと連続日数を表示 */
export function ActivityList({ habits, records, today }: ActivityListProps) {
	const referenceDate = today ?? getToday();

	const activities: HabitActivity[] = useMemo(() => {
		const refDate = new Date(referenceDate);
		const { start } = getViewPeriodRange("31d", refDate);
		const dates = getDatesInRange(start, refDate);

		return habits.map((habit) => {
			const habitRecords = records.filter((r) => r.habitId === habit.id);
			return {
				habit,
				streak: calculateStreak(habitRecords, referenceDate),
				cells: buildGrassGrid(dates, habitRecords),
			};
		});
	}, [habits, records, referenceDate]);

	if (habits.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
				<p>習慣がありません</p>
				<p className="mt-1 text-sm">「管理」から習慣を追加してください</p>
			</div>
		);
	}

	return (
		<ul className="divide-y">
			{activities.map(({ habit, streak, cells }) => (
				<li key={habit.id} className="flex items-center gap-3 px-4 py-3">
					{/* ミニグラフ */}
					<div className="flex-1 overflow-hidden">
						<MiniGraph cells={cells} color={habit.color} />
					</div>
					{/* 習慣情報 */}
					<div className="w-28 shrink-0">
						<p className="truncate font-medium text-sm">{habit.name}</p>
						<p className="text-muted-foreground text-xs">
							{streak > 0 ? `${streak}日連続` : "記録なし"}
						</p>
					</div>
					{/* カラーインジケーター */}
					<div
						className="h-3 w-3 shrink-0 rounded-full"
						style={{ backgroundColor: habit.color }}
					/>
				</li>
			))}
		</ul>
	);
}
