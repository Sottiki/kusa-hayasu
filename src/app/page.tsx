"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ButtonView } from "@/components/habit/button-view";
import { Button } from "@/components/ui/button";
import { useHabits } from "@/hooks/use-habits";
import { useMilestone } from "@/hooks/use-milestone";
import { useRecords } from "@/hooks/use-records";
import { getToday } from "@/lib/date-utils";

/** 習慣のドットインジケーター（複数習慣がある場合に表示） */
function HabitDots({
	total,
	current,
	onSelect,
}: {
	total: number;
	current: number;
	onSelect: (index: number) => void;
}) {
	if (total <= 1) return null;
	return (
		<div className="flex gap-2">
			{Array.from({ length: total }).map((_, i) => (
				<button
					// biome-ignore lint/suspicious/noArrayIndexKey: インデックスが一意のキーとして適切
					key={i}
					type="button"
					aria-label={`習慣 ${i + 1}`}
					className={`h-2 w-2 rounded-full transition-all ${
						i === current ? "scale-125 bg-foreground" : "bg-muted-foreground/40"
					}`}
					onClick={() => onSelect(i)}
				/>
			))}
		</div>
	);
}

/** 指定習慣のボタンビュー */
function HabitButtonView({ habitId }: { habitId: string }) {
	const { habits } = useHabits();
	const habit = habits.find((h) => h.id === habitId);
	const { streak, toggleRecord, isCompletedOn } = useRecords(habitId);
	const { nextMilestone } = useMilestone(habitId, streak);

	if (!habit) return null;

	const today = getToday();
	const completed = isCompletedOn(today);

	return (
		<ButtonView
			habitName={habit.name}
			completed={completed}
			color={habit.color}
			streak={streak}
			nextMilestone={nextMilestone}
			onToggle={() => toggleRecord(today)}
		/>
	);
}

export default function Home() {
	const { habits } = useHabits();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	// hydration 前はレンダリングしない（localStorage との mismatch を防止）
	if (!mounted) return null;

	if (habits.length === 0) {
		return (
			<main className="flex min-h-svh flex-col items-center justify-center gap-6 px-4 pb-20">
				<div className="space-y-2 text-center">
					<h1 className="text-2xl font-bold">kusa-hayasu</h1>
					<p className="text-muted-foreground">習慣を記録して、草を生やそう</p>
				</div>
				<Button asChild>
					<Link href="/manage">最初の習慣を作成する</Link>
				</Button>
			</main>
		);
	}

	const safeIndex = Math.min(currentIndex, habits.length - 1);
	const currentHabit = habits[safeIndex];

	return (
		<main className="flex min-h-svh flex-col items-center justify-center gap-6 pb-20">
			<HabitButtonView habitId={currentHabit.id} />
			<HabitDots
				total={habits.length}
				current={safeIndex}
				onSelect={setCurrentIndex}
			/>
		</main>
	);
}
