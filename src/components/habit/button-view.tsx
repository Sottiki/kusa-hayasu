"use client";

import { AchievementButton } from "./achievement-button";
import { StreakDisplay } from "./streak-display";

type ButtonViewProps = {
	habitName: string;
	completed: boolean;
	color: string;
	streak: number;
	nextMilestone: number | null;
	onToggle: () => void;
};

/** ボタンビュー — 習慣名・達成ボタン・連続日数を縦に配置 */
export function ButtonView({
	habitName,
	completed,
	color,
	streak,
	nextMilestone,
	onToggle,
}: ButtonViewProps) {
	return (
		<div className="flex h-full flex-col items-center justify-center gap-8 px-4">
			<h1 className="text-xl font-semibold">{habitName}</h1>
			<AchievementButton
				completed={completed}
				color={color}
				onToggle={onToggle}
			/>
			<StreakDisplay streak={streak} nextMilestone={nextMilestone} />
		</div>
	);
}
