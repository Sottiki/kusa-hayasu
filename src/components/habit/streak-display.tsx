type StreakDisplayProps = {
	streak: number;
	nextMilestone: number | null;
};

/** 連続日数と次のマイルストーンを表示する */
export function StreakDisplay({ streak, nextMilestone }: StreakDisplayProps) {
	return (
		<div className="flex flex-col items-center gap-1">
			<div className="flex items-baseline gap-1">
				<span className="text-4xl font-bold tabular-nums">{streak}</span>
				<span className="text-sm text-muted-foreground">日連続</span>
			</div>
			{nextMilestone !== null && (
				<p className="text-xs text-muted-foreground">
					次の目標: {nextMilestone}日
				</p>
			)}
		</div>
	);
}
