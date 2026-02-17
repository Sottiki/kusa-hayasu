"use client";

import { Check } from "lucide-react";

type AchievementButtonProps = {
	completed: boolean;
	color: string;
	onToggle: () => void;
};

/** 達成ボタン — 大きな丸ボタンで片手タップしやすいサイズ */
export function AchievementButton({
	completed,
	color,
	onToggle,
}: AchievementButtonProps) {
	return (
		<button
			type="button"
			onClick={onToggle}
			aria-label={completed ? "達成済み" : "達成！"}
			className={`flex h-32 w-32 items-center justify-center rounded-full border-4 text-2xl font-bold transition-all active:scale-95 ${
				completed
					? "border-[var(--habit-color)] bg-[var(--habit-color)] text-white"
					: "border-[var(--habit-color)] bg-transparent text-[var(--habit-color)]"
			}`}
			style={{ "--habit-color": color } as React.CSSProperties}
		>
			{completed ? <Check className="h-12 w-12" /> : "達成！"}
		</button>
	);
}
