"use client";

import { useMemo, useState } from "react";
import { GrassGraph } from "@/components/graph/grass-graph";
import { PeriodSelector } from "@/components/graph/period-selector";
import { getDatesInRange, getViewPeriodRange } from "@/lib/date-utils";
import { buildGrassGrid } from "@/lib/grass-utils";
import type { HabitRecord, ViewPeriod } from "@/types/habit";

type CalendarViewProps = {
	habitName: string;
	color: string;
	records: HabitRecord[];
	onToggle: (date: string) => void;
};

/** カレンダービュー — 草グラフと期間切替タブ */
export function CalendarView({
	habitName,
	color,
	records,
	onToggle,
}: CalendarViewProps) {
	const [period, setPeriod] = useState<ViewPeriod>("3mo");

	const cells = useMemo(() => {
		const { start, end } = getViewPeriodRange(period);
		const dates = getDatesInRange(start, end);
		return buildGrassGrid(dates, records);
	}, [period, records]);

	return (
		<div className="flex w-full flex-col items-center gap-6 px-4">
			<h1 className="text-xl font-semibold">{habitName}</h1>
			<GrassGraph cells={cells} color={color} onCellPress={onToggle} />
			<PeriodSelector value={period} onChange={setPeriod} />
		</div>
	);
}
