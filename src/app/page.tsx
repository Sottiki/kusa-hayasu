"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CelebrationOverlay } from "@/components/celebration/celebration-overlay";
import { ButtonView } from "@/components/habit/button-view";
import { CalendarView } from "@/components/habit/calendar-view";
import { Button } from "@/components/ui/button";
import { useHabits } from "@/hooks/use-habits";
import { useMilestone } from "@/hooks/use-milestone";
import { useRecords } from "@/hooks/use-records";
import { useSwipe } from "@/hooks/use-swipe";
import { getToday } from "@/lib/date-utils";

type ViewMode = "button" | "calendar";

/** 習慣のドットインジケーター（複数習慣がある場合のみ表示） */
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

/** 習慣1件のビューをhookと接続するコンポーネント */
function HabitView({
	habitId,
	viewMode,
}: {
	habitId: string;
	viewMode: ViewMode;
}) {
	const { habits } = useHabits();
	const habit = habits.find((h) => h.id === habitId);
	const { records, streak, toggleRecord, isCompletedOn } = useRecords(habitId);
	const { currentMilestone, milestoneMessage, nextMilestone, celebrate } =
		useMilestone(habitId, streak);

	if (!habit) return null;

	const today = getToday();

	return (
		<>
			{viewMode === "calendar" ? (
				<CalendarView
					habitName={habit.name}
					color={habit.color}
					records={records}
					onToggle={toggleRecord}
				/>
			) : (
				<ButtonView
					habitName={habit.name}
					completed={isCompletedOn(today)}
					color={habit.color}
					streak={streak}
					nextMilestone={nextMilestone}
					onToggle={() => toggleRecord(today)}
				/>
			)}

			{/* マイルストーン達成時のお祝いオーバーレイ */}
			<CelebrationOverlay
				isOpen={currentMilestone !== null}
				pattern={habit.animationPattern}
				milestone={currentMilestone ?? 0}
				message={milestoneMessage ?? ""}
				color={habit.color}
				onClose={celebrate}
			/>
		</>
	);
}

export default function Home() {
	const { habits } = useHabits();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [viewMode, setViewMode] = useState<ViewMode>("button");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const safeIndex = Math.min(currentIndex, Math.max(habits.length - 1, 0));
	const currentHabit = habits[safeIndex];

	const { onTouchStart, onTouchEnd } = useSwipe({
		// 横スワイプ: 習慣切替
		onSwipeLeft: () =>
			setCurrentIndex((i) => Math.min(i + 1, habits.length - 1)),
		onSwipeRight: () => setCurrentIndex((i) => Math.max(i - 1, 0)),
		// 縦スワイプ: ボタン↔カレンダーのビュー切替
		onSwipeDown: () => setViewMode("button"),
		onSwipeUp: () => setViewMode("calendar"),
	});

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

	return (
		<main
			className="flex min-h-svh flex-col items-center justify-center gap-6 pb-20"
			onTouchStart={onTouchStart}
			onTouchEnd={onTouchEnd}
			style={
				{
					// 現在の習慣の色をCSS変数としてサブツリーに提供
					"--habit-color": currentHabit?.color,
				} as React.CSSProperties
			}
		>
			<HabitView habitId={habits[safeIndex].id} viewMode={viewMode} />
			<div className="flex flex-col items-center gap-3">
				{/* 矢印ボタン＋ドットナビゲーション（複数習慣がある場合のみ表示） */}
				{habits.length > 1 && (
					<div className="flex items-center gap-3">
						<button
							type="button"
							aria-label="前の習慣"
							disabled={safeIndex === 0}
							className="rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-20"
							onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
						>
							<ChevronLeft className="h-5 w-5" />
						</button>
						<HabitDots
							total={habits.length}
							current={safeIndex}
							onSelect={setCurrentIndex}
						/>
						<button
							type="button"
							aria-label="次の習慣"
							disabled={safeIndex === habits.length - 1}
							className="rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-20"
							onClick={() =>
								setCurrentIndex((i) => Math.min(i + 1, habits.length - 1))
							}
						>
							<ChevronRight className="h-5 w-5" />
						</button>
					</div>
				)}
				{viewMode === "button" ? (
					<button
						type="button"
						className="text-sm text-muted-foreground underline-offset-4 hover:underline"
						onClick={() => setViewMode("calendar")}
					>
						カレンダーを見る
					</button>
				) : (
					<button
						type="button"
						className="text-sm text-muted-foreground underline-offset-4 hover:underline"
						onClick={() => setViewMode("button")}
					>
						← 達成ボタンに戻る
					</button>
				)}
			</div>
		</main>
	);
}
