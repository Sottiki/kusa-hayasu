"use client";

import { useEffect } from "react";
import { ButtonView } from "@/components/habit/button-view";
import { useHabits } from "@/hooks/use-habits";
import { useMilestone } from "@/hooks/use-milestone";
import { useRecords } from "@/hooks/use-records";
import { getToday } from "@/lib/date-utils";

/** 習慣が0件ならデモ用を自動作成する */
function useEnsureDemoHabit() {
	const { habits, addHabit } = useHabits();

	useEffect(() => {
		if (habits.length === 0) {
			addHabit({
				name: "サンプル習慣",
				color: "#22c55e",
				animationPattern: "festival",
			});
		}
	}, [habits.length, addHabit]);

	return habits[0] ?? null;
}

export default function Home() {
	const habit = useEnsureDemoHabit();
	const { streak, toggleRecord, isCompletedOn } = useRecords(habit?.id ?? "");
	const { nextMilestone } = useMilestone(habit?.id ?? "", streak);

	// hydration 前またはデモ作成待ち
	if (!habit) {
		return null;
	}

	const today = getToday();
	const completed = isCompletedOn(today);

	return (
		<main className="flex min-h-svh items-center justify-center">
			<ButtonView
				habitName={habit.name}
				completed={completed}
				color={habit.color}
				streak={streak}
				nextMilestone={nextMilestone}
				onToggle={() => toggleRecord(today)}
			/>
		</main>
	);
}
